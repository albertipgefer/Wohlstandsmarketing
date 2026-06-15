/**
 * POST /api/finanzen/rechnung/mahnung — Zahlungserinnerung / Mahnung senden
 * (login-geschützt). Erhöht die Mahnstufe, setzt Status 'ueberfaellig', mailt
 * die passende Stufe via Resend, informiert Albert per Telegram. Body: { id }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getRechnungById, updateRechnung, dbReady } from "@/lib/finanzen/db";
import { sendMail, mahnungEmailHtml } from "@/lib/finanzen/email";
import { sendFinanzenTelegram } from "@/lib/telegram";
import { eur } from "@/lib/angebot/format";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });

  const r = await getRechnungById(body.id);
  if (!r) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (r.status === "bezahlt" || r.status === "storniert")
    return NextResponse.json({ ok: false, error: "not_mahnbar" }, { status: 409 });
  if (!r.kunde_email)
    return NextResponse.json({ ok: false, error: "missing_customer_email" }, { status: 400 });

  // Maximal 2 Mahnungen an den Kunden. Danach KEINE weitere Kundenmail —
  // stattdessen interne Erinnerung: Fall ans Inkasso übergeben.
  if ((r.mahnstufe || 0) >= 2) {
    try {
      await sendFinanzenTelegram(
        `🟥 <b>Inkasso fällig</b>\n${r.kunde_firma || r.kunde_email} · ${eur(r.brutto)} · Nr. ${r.nummer || "—"}\n2. Mahnung ist raus — bitte den Fall jetzt ans Inkasso übergeben (keine weitere Mahnung an den Kunden).`,
      );
    } catch {
      /* ignore */
    }
    return NextResponse.json({ ok: true, stufe: 2, inkasso: true });
  }

  const stufe = (r.mahnstufe || 0) + 1;

  const mail = await sendMail({
    to: r.kunde_email,
    subject:
      stufe <= 1
        ? `Zahlungserinnerung — Rechnung ${r.nummer || ""}`.trim()
        : `${stufe}. Mahnung — Rechnung ${r.nummer || ""}`.trim(),
    html: mahnungEmailHtml(r, stufe),
  });
  if (!mail.ok) return NextResponse.json({ ok: false, error: `mail_failed:${mail.error}` }, { status: 502 });

  const updated = await updateRechnung(r.id, {
    status: "ueberfaellig",
    mahnstufe: stufe,
    last_mahnung_at: new Date().toISOString(),
  });
  if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

  try {
    await sendFinanzenTelegram(
      `⏰ <b>${stufe <= 1 ? "Zahlungserinnerung" : stufe + ". Mahnung"} gesendet</b>\n${r.kunde_firma || r.kunde_email} · ${eur(r.brutto)}\nNr. ${r.nummer || "—"}`,
    );
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true, stufe });
}
