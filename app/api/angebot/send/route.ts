/**
 * POST /api/angebot/send — Angebot an den Kunden senden (login-geschützt).
 * Erzeugt public_token, mailt den Link via Resend, setzt Status 'gesendet'.
 * Body: { id }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getAngebotById, updateAngebot, newPublicToken, dbReady } from "@/lib/angebot/db";
import { sendMail, offerEmailHtml, publicLink } from "@/lib/angebot/email";
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

  const a = await getAngebotById(body.id);
  if (!a) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (!a.kunde_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.kunde_email))
    return NextResponse.json({ ok: false, error: "invalid_customer_email" }, { status: 400 });

  // Token sicherstellen (einmal vergeben, danach stabil).
  const token = a.public_token || newPublicToken();
  const link = publicLink(token);

  const mail = await sendMail({
    to: a.kunde_email,
    subject: a.nummer
      ? `Ihr Angebot von Wohlstandsmarketing — ${a.nummer}`
      : "Ihr Angebot von Wohlstandsmarketing",
    html: offerEmailHtml({ ...a, public_token: token }, link),
  });
  if (!mail.ok) return NextResponse.json({ ok: false, error: `mail_failed:${mail.error}` }, { status: 502 });

  const updated = await updateAngebot(a.id, {
    public_token: token,
    status: "gesendet",
    sent_at: new Date().toISOString(),
  });
  if (!updated) return NextResponse.json({ ok: false, error: "status_update_failed" }, { status: 500 });

  // Telegram-Info (gekapselt — blockiert nicht).
  try {
    await sendTelegramMessage(
      `📤 <b>Angebot gesendet</b>\n${a.kunde_firma || a.kunde_email} · ${eur(a.brutto)}\nNr. ${a.nummer || "—"}`,
    );
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true, link });
}
