/**
 * POST /api/angebot/accept — Kunde nimmt das Angebot an (öffentlich, token-gated).
 * Body: { token, name }. Setzt Status 'angenommen', benachrichtigt Albert,
 * schickt dem Kunden eine Bestätigung, legt HOT-Lead in Close an.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getAngebotByToken, updateAngebot, dbReady } from "@/lib/angebot/db";
import { sendMail, acceptedCustomerEmailHtml } from "@/lib/angebot/email";
import { sendTelegramMessage } from "@/lib/telegram";
import { syncLeadToClose } from "@/lib/close";
import { ANBIETER } from "@/lib/angebot/stammdaten";
import { eur } from "@/lib/angebot/format";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "";
}

export async function POST(req: NextRequest) {
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { token?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const token = (body.token || "").trim();
  const name = (body.name || "").trim().slice(0, 120);
  if (!token) return NextResponse.json({ ok: false, error: "missing_token" }, { status: 400 });
  if (name.length < 2) return NextResponse.json({ ok: false, error: "missing_name" }, { status: 400 });

  const a = await getAngebotByToken(token);
  if (!a) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (a.status === "angenommen")
    return NextResponse.json({ ok: true, already: true });
  if (a.status === "entwurf" || a.status === "abgelehnt")
    return NextResponse.json({ ok: false, error: "not_acceptable" }, { status: 409 });

  const updated = await updateAngebot(a.id, {
    status: "angenommen",
    accepted_at: new Date().toISOString(),
    accept_name: name,
    accept_ip: clientIp(req),
  });
  if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

  // Bestätigung an den Kunden (gekapselt).
  if (a.kunde_email) {
    try {
      await sendMail({
        to: a.kunde_email,
        subject: `Angebot ${a.nummer || ""} angenommen — vielen Dank`.trim(),
        html: acceptedCustomerEmailHtml(a),
      });
    } catch {
      /* ignore */
    }
  }

  // Albert: Telegram + E-Mail.
  try {
    await sendTelegramMessage(
      `✅ <b>ANGEBOT ANGENOMMEN</b>\n${a.kunde_firma || a.kunde_email} · ${eur(a.brutto)}\nNr. ${a.nummer || "—"} · angenommen von ${name}`,
    );
  } catch {
    /* ignore */
  }
  try {
    await sendMail({
      to: ANBIETER.email,
      subject: `✅ Angebot ${a.nummer || ""} angenommen — ${a.kunde_firma || ""}`.trim(),
      html: `<p>Angebot <b>${a.nummer || ""}</b> wurde angenommen.</p>
<p>Kunde: ${a.kunde_firma || "—"} (${a.kunde_email || "—"})<br>
Angenommen von: ${name}<br>
Betrag: ${eur(a.brutto)}</p>`,
    });
  } catch {
    /* ignore */
  }

  // HOT-Lead in Close (gekapselt; legt zugleich Rückruf-Aufgabe + eigene Telegram-Notiz an).
  try {
    await syncLeadToClose({
      source: "angebot",
      fullName: a.kunde_ansprech || undefined,
      email: a.kunde_email || "",
      company: a.kunde_firma || undefined,
      noteLines: [
        `Angebot ${a.nummer || ""} ANGENOMMEN (${eur(a.brutto)})`,
        `Angenommen von: ${name}`,
      ],
    });
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true });
}
