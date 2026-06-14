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
import { newPublicToken } from "@/lib/angebot/db";
import { sendMail, rechnungEmailHtml } from "@/lib/finanzen/email";
import { renderDokumentPdf, rechnungToPdfDoc } from "@/lib/finanzen/pdf";
import { baseUrl } from "@/lib/angebot/email";
import { sendTelegramMessage } from "@/lib/telegram";
import { eur } from "@/lib/angebot/format";
import { freigabeFlowAktiv, createFreigabe } from "@/lib/finanzen/freigabe";

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

  // Nummer + öffentlichen Token einmalig vergeben (stabil ab Versand).
  const nummer = r.nummer || (await nextRechnungsnummer(new Date().getFullYear()));
  const token = r.public_token || newPublicToken();
  const merged = { ...r, nummer, public_token: token };

  // PDF rendern (gekapselt — bei Fehler trotzdem ohne Anhang senden).
  let attachments: { filename: string; content: string }[] | undefined;
  try {
    const buf = await renderDokumentPdf(rechnungToPdfDoc(merged));
    attachments = [{ filename: `Rechnung-${nummer}.pdf`, content: buf.toString("base64") }];
  } catch {
    attachments = undefined;
  }
  const link = `${baseUrl()}/finanzen/r/${token}`;
  const betreff = `Ihre Rechnung von Wohlstandsmarketing — ${nummer}`;
  const html = rechnungEmailHtml(merged, link);

  // Freigabe-Flow: nicht direkt senden, sondern Albert per Telegram zur
  // Genehmigung vorlegen. Nummer + Token werden stabil gesichert; Status
  // bleibt Entwurf bis zur Genehmigung (sendeFreigabe setzt dann "offen").
  if (freigabeFlowAktiv()) {
    await updateRechnung(r.id, { nummer, public_token: token });
    const created = await createFreigabe({
      typ: "rechnung",
      zielId: r.id,
      empfaenger: r.kunde_email,
      betreff,
      html,
    });
    if (!created) return NextResponse.json({ ok: false, error: "freigabe_failed" }, { status: 500 });
    return NextResponse.json({ ok: true, freigabe: true, nummer });
  }

  const mail = await sendMail({
    to: r.kunde_email,
    subject: betreff,
    html,
    attachments,
  });
  if (!mail.ok) return NextResponse.json({ ok: false, error: `mail_failed:${mail.error}` }, { status: 502 });

  const updated = await updateRechnung(r.id, {
    nummer,
    public_token: token,
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
