/**
 * GET /api/cron/finanzen — täglicher Finanz-Lauf (Vercel-Cron).
 * 1) Offene Rechnungen, deren Fälligkeit überschritten ist → Status "überfällig".
 * 2) Auto-Mahnlauf: überfällige Rechnungen gestaffelt anmahnen
 *    (Stufe 1 ab 3 Tagen überfällig, danach alle 10 Tage, max. Stufe 3).
 * 3) Wiederkehrende Rechnungen fällig? → Entwurf erzeugen.
 * 3b) Angebots-Follow-up: nicht angenommene Angebote nachfassen (Tag 5 + 12,
 *     je als Telegram-Freigabe — Kundenmail erst auf Albert-Klick).
 * Abschluss: Telegram-Report an Albert.
 *
 * Auth: Header `Authorization: Bearer ${CRON_SECRET}`.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  listRechnungen,
  updateRechnung,
  insertRechnung,
  nextRechnungsnummer,
  dbReady,
} from "@/lib/finanzen/db";
import {
  listFaelligeWiederkehrend,
  rechnungAusWiederkehrend,
  vorrueckenWiederkehrend,
} from "@/lib/finanzen/recurring";
import { sendMail, mahnungEmailHtml } from "@/lib/finanzen/email";
import { syncAlleKonten, listKonten } from "@/lib/finanzen/bank";
import { verarbeiteReminderLauf } from "@/lib/angebot/reminder";
import { sendFinanzenTelegram } from "@/lib/telegram";

const TAG = 24 * 60 * 60 * 1000;

function tageSeit(iso: string | null, now: number): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.floor((now - t) / TAG);
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  const now = Date.now();
  const heute = new Date(now).toISOString().slice(0, 10);

  let markedOverdue = 0;
  let mahnungen = 0;
  let wiederkehrend = 0;
  const fehler: string[] = [];
  const inkassoReif: string[] = []; // Rechnungen, die jetzt die letzte Mahnstufe (2) erreicht haben

  const rechnungen = await listRechnungen(1000);

  // 1) Überfällig markieren
  for (const r of rechnungen) {
    if (r.status === "offen" && r.faellig_am && r.faellig_am < heute) {
      const u = await updateRechnung(r.id, { status: "ueberfaellig" });
      if (u) { markedOverdue++; r.status = "ueberfaellig"; }
    }
  }

  // 2) Auto-Mahnlauf (max. 25 Sendungen pro Lauf als Sicherung)
  for (const r of rechnungen) {
    if (mahnungen >= 25) break;
    if (r.status !== "ueberfaellig" || !r.kunde_email) continue;
    if ((r.mahnstufe || 0) >= 2) continue; // max. Mahnstufe 2 — danach Inkasso (keine weitere Kunden-Mail)

    const ueberfaelligTage = tageSeit(r.faellig_am, now);
    const seitLetzterMahnung = tageSeit(r.last_mahnung_at, now);
    const ersteMahnung = !r.last_mahnung_at;

    const faellig =
      (ersteMahnung && ueberfaelligTage !== null && ueberfaelligTage >= 3) ||
      (!ersteMahnung && seitLetzterMahnung !== null && seitLetzterMahnung >= 10);
    if (!faellig) continue;

    const stufe = (r.mahnstufe || 0) + 1;
    const mail = await sendMail({
      to: r.kunde_email,
      subject:
        stufe <= 1
          ? `Zahlungserinnerung — Rechnung ${r.nummer || ""}`.trim()
          : `${stufe}. Mahnung — Rechnung ${r.nummer || ""}`.trim(),
      html: mahnungEmailHtml(r, stufe),
    });
    if (mail.ok) {
      await updateRechnung(r.id, { mahnstufe: stufe, last_mahnung_at: new Date(now).toISOString() });
      mahnungen++;
      // Letzte Mahnstufe erreicht → einmalige interne Inkasso-Erinnerung (kein Spam:
      // triggert nur in dem Lauf, in dem Stufe 2 gesendet wurde).
      if (stufe >= 2) {
        inkassoReif.push(`${r.nummer || "—"} · ${r.kunde_firma || r.kunde_email || ""} · ${(r.brutto || 0).toFixed(2)} €`);
      }
    } else {
      fehler.push(`Mahnung ${r.nummer}: ${mail.error}`);
    }
  }

  // 3) Wiederkehrende Rechnungen fällig → Entwurf
  try {
    const faellige = await listFaelligeWiederkehrend(heute);
    for (const w of faellige) {
      const nummer = await nextRechnungsnummer(new Date(now).getFullYear());
      const ins = await insertRechnung(rechnungAusWiederkehrend(w, nummer, now));
      if (ins) {
        await vorrueckenWiederkehrend(w, now);
        wiederkehrend++;
      }
    }
  } catch (e) {
    fehler.push(`Wiederkehrend: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // 3b) Angebots-Follow-up: nicht angenommene Angebote nachfassen (Tag 5 + 12).
  //     Legt nur Telegram-Freigaben an — die Kundenmail geht erst auf Albert-Klick raus.
  let reminderAngefragt = 0;
  try {
    const rem = await verarbeiteReminderLauf(now);
    reminderAngefragt = rem.angefragt;
    if (rem.fehler.length) fehler.push(...rem.fehler);
  } catch (e) {
    fehler.push(`Angebot-Reminder: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // 4) Bank-Sync (N26 via GoCardless) + 90-Tage-Reauth-Reminder
  let bankNeu = 0;
  const bankHinweise: string[] = [];
  try {
    const sync = await syncAlleKonten();
    bankNeu = sync.neu;
    const konten = await listKonten();
    for (const k of konten) {
      // Reauth-Reminder, wenn Freigabe in <= 7 Tagen abläuft oder Konto abgelaufen ist
      if (k.status === "abgelaufen") bankHinweise.push(`${k.name || "Bank"}: Freigabe abgelaufen — bitte neu verbinden.`);
      else if (k.consent_expires_at) {
        const rest = Math.floor((new Date(k.consent_expires_at).getTime() - now) / TAG);
        if (rest <= 7) bankHinweise.push(`${k.name || "Bank"}: Freigabe läuft in ${rest} Tag(en) ab — bitte erneuern.`);
      }
    }
  } catch (e) {
    fehler.push(`Bank-Sync: ${e instanceof Error ? e.message : "unknown"}`);
  }

  // Report
  if (markedOverdue || mahnungen || wiederkehrend || reminderAngefragt || bankNeu || bankHinweise.length || inkassoReif.length || fehler.length) {
    try {
      await sendFinanzenTelegram(
        `🧾 <b>Finanz-Lauf</b>\n` +
          `Überfällig markiert: ${markedOverdue}\n` +
          `Mahnungen gesendet: ${mahnungen}\n` +
          `Angebots-Erinnerungen vorgelegt: ${reminderAngefragt}\n` +
          `Neue wiederkehrende Rechnungen: ${wiederkehrend}\n` +
          `Neue Bank-Umsätze: ${bankNeu}` +
          (inkassoReif.length
            ? `\n\n🔴 <b>Letzte Mahnung verschickt — Inkasso prüfen:</b>\n${inkassoReif.join("\n")}`
            : "") +
          (bankHinweise.length ? `\n🏦 ${bankHinweise.join("; ")}` : "") +
          (fehler.length ? `\n⚠️ ${fehler.slice(0, 5).join("; ")}` : ""),
      );
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json({ ok: true, markedOverdue, mahnungen, reminderAngefragt, wiederkehrend, bankNeu, bankHinweise, inkassoReif, fehler });
}
