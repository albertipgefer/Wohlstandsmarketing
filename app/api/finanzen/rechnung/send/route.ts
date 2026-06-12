/**
 * POST /api/finanzen/rechnung/send — Rechnung an den Kunden senden (login-geschützt).
 * Vergibt bei Bedarf die Rechnungsnummer, setzt Status 'offen', mailt sie via Resend,
 * informiert Albert per Telegram. Body: { id }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import {
  getRechnungById,
  updateRechnung,
  nextRechnungsnummer,
  dbReady,
} from "@/lib/finanzen/db";
import { sendMail, rechnungEmailHtml } from "@/lib/finanzen/email";
import { sendTelegramMessage } from "@/lib/telegram";
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
  if (!r.kunde_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.kunde_email))
    return NextResponse.json({ ok: false, error: "invalid_customer_email" }, { status: 400 });

  // Nummer einmalig vergeben (stabil ab Versand).
  const nummer = r.nummer || (await nextRechnungsnummer(new Date().getFullYear()));
  const merged = { ...r, nummer };

  const mail = await sendMail({
    to: r.kunde_email,
    subject: `Ihre Rechnung von Wohlstandsmarketing — ${nummer}`,
    html: rechnungEmailHtml(merged),
  });
  if (!mail.ok) return NextResponse.json({ ok: false, error: `mail_failed:${mail.error}` }, { status: 502 });

  const updated = await updateRechnung(r.id, {
    nummer,
    status: "offen",
    sent_at: new Date().toISOString(),
  });
  if (!updated) return NextResponse.json({ ok: false, error: "status_update_failed" }, { status: 500 });

  try {
    await sendTelegramMessage(
      `🧾 <b>Rechnung gesendet</b>\n${r.kunde_firma || r.kunde_email} · ${eur(r.brutto)}\nNr. ${nummer} · fällig ${r.faellig_am || "—"}`,
    );
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true, nummer });
}
