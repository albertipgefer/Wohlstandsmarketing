/**
 * POST /api/angebot/accept — Kunde nimmt das Angebot an (öffentlich, token-gated).
 * Body: { token, name }. Setzt Status 'angenommen', benachrichtigt Albert,
 * schickt dem Kunden eine Bestätigung, markiert den Kontakt in Close als "Kunde".
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getAngebotByToken, updateAngebot, dbReady } from "@/lib/angebot/db";
import { sendMail, acceptedCustomerEmailHtml, publicLink } from "@/lib/angebot/email";
import { sendTelegramMessage } from "@/lib/telegram";
import { markCloseLeadAsKunde } from "@/lib/angebot/close-kunde";
import { renderDokumentPdf, angebotToPdfDoc } from "@/lib/finanzen/pdf";
import {
  getRechnungByAngebotId,
  insertRechnung,
  rechnungFromAngebot,
} from "@/lib/finanzen/db";
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

  // Close: Kunde als "Kunde" markieren (kein HOT-Lead, keine Rückruf-Task,
  // keine zusätzliche Telegram — die Annahme-Telegram ist oben bereits raus).
  // Lead suchen → Status "Kunde"; nicht gefunden → als Kunde anlegen. Plus Notiz.
  if (a.kunde_email) {
    try {
      // Angebots-PDF rendern und an die Close-Notiz anhängen (best-effort).
      let pdf: { bytes: Uint8Array; filename: string } | undefined;
      try {
        const buf = await renderDokumentPdf(angebotToPdfDoc(a));
        pdf = { bytes: buf, filename: `Angebot-${a.nummer || "WSM"}.pdf` };
      } catch {
        /* PDF optional — Annahme nie blockieren */
      }
      await markCloseLeadAsKunde({
        email: a.kunde_email,
        company: a.kunde_firma,
        contactName: a.kunde_ansprech,
        noteLines: [
          `Angebot ${a.nummer || ""} angenommen (${eur(a.brutto)})`,
          `Angenommen von: ${name}`,
          a.public_token ? `Angebot ansehen: ${publicLink(a.public_token)}` : null,
        ],
        pdf,
      });
    } catch {
      /* ignore */
    }
  }

  // Finanzen: aus dem angenommenen Angebot automatisch einen Rechnungs-ENTWURF
  // erzeugen (sofern noch keiner existiert). Albert finalisiert/sendet ihn im
  // Finanz-Modul. Gekapselt — darf die Annahme nie blockieren.
  try {
    const existing = await getRechnungByAngebotId(a.id);
    if (!existing) {
      await insertRechnung(rechnungFromAngebot(a, { status: "entwurf" }));
    }
  } catch {
    /* ignore */
  }

  return NextResponse.json({ ok: true });
}
