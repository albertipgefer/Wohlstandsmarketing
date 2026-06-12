/**
 * GET /api/cron/finanzen — täglicher Finanz-Lauf (Vercel-Cron).
 * 1) Offene Rechnungen, deren Fälligkeit überschritten ist → Status "überfällig".
 * 2) Auto-Mahnlauf: überfällige Rechnungen gestaffelt anmahnen
 *    (Stufe 1 ab 3 Tagen überfällig, danach alle 10 Tage, max. Stufe 3).
 * 3) Wiederkehrende Rechnungen fällig? → Entwurf erzeugen.
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
import { sendTelegramMessage } from "@/lib/telegram";

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
    if ((r.mahnstufe || 0) >= 3) continue;

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

  // Report
  if (markedOverdue || mahnungen || wiederkehrend || fehler.length) {
    try {
      await sendTelegramMessage(
        `🧾 <b>Finanz-Lauf</b>\n` +
          `Überfällig markiert: ${markedOverdue}\n` +
          `Mahnungen gesendet: ${mahnungen}\n` +
          `Neue wiederkehrende Rechnungen: ${wiederkehrend}` +
          (fehler.length ? `\n⚠️ ${fehler.slice(0, 5).join("; ")}` : ""),
      );
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json({ ok: true, markedOverdue, mahnungen, wiederkehrend, fehler });
}
