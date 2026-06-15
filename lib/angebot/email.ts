/**
 * E-Mail-Versand für das Angebots-System (Resend über fetch, Muster wie
 * app/api/angebot/route.ts). WSM-Branding-HTML, kein Storage.
 *
 * Required ENV:
 *   RESEND_API_KEY      — Resend-API-Key (geteilt mit bestehenden Mails)
 *   ANGEBOT_FROM_EMAIL  — Absender NUR fürs Angebot (z.B. angebot@wohlstandsmarketing.de);
 *                         Fallback auf RESEND_FROM_EMAIL, damit bestehende Mails unberührt bleiben.
 *   ANGEBOT_BASE_URL    — Basis-URL für Kunden-Links (Default: https://wohlstandsmarketing.de)
 */
import { ANBIETER } from "./stammdaten";
import { eur, deDate } from "./format";
import type { Angebot } from "./db";

export function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function baseUrl(): string {
  return (process.env.ANGEBOT_BASE_URL || "https://wohlstandsmarketing.de").replace(/\/$/, "");
}

export function publicLink(token: string): string {
  return `${baseUrl()}/angebot/a/${token}`;
}

/** Resend-Versand. Gibt {ok, error?} zurück, wirft nie. */
export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  /** Optionale Anhänge (z. B. PDF). content = base64-String. */
  attachments?: { filename: string; content: string }[];
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ANGEBOT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return { ok: false, error: "missing_resend_env" };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Wohlstandsmarketing <${from}>`,
        to: [opts.to],
        reply_to: opts.replyTo || ANBIETER.email,
        subject: opts.subject,
        html: opts.html,
        ...(opts.attachments && opts.attachments.length
          ? { attachments: opts.attachments }
          : {}),
      }),
    });
    if (!r.ok) return { ok: false, error: `resend_${r.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "send_failed" };
  }
}

const SHELL = (inner: string) => `<!DOCTYPE html><html lang="de"><body style="margin:0;background:#f4f5f7;padding:24px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">
<tr><td style="padding:24px 32px 0;"><img src="${baseUrl()}/icon.png" width="40" height="40" alt="Wohlstandsmarketing" style="display:block;border:0;border-radius:9px;"></td></tr>
${inner}
<tr><td style="padding:20px 32px 28px;border-top:1px solid #f0f0f1;font-size:12px;color:#a3a3a3;line-height:1.6;">
${escapeHtml(ANBIETER.name)} · ${escapeHtml(ANBIETER.strasse)} · ${escapeHtml(ANBIETER.plzOrt)}<br>
${escapeHtml(ANBIETER.email)} · ${escapeHtml(ANBIETER.website)}
</td></tr>
</table></td></tr></table></body></html>`;

/** Angebots-Mail an den Kunden (mit Link zur Web-Ansicht). */
export function offerEmailHtml(a: Angebot, link: string): string {
  const anrede = a.kunde_ansprech?.trim()
    ? `Hallo ${escapeHtml(a.kunde_ansprech.trim())},`
    : a.kunde_firma?.trim()
      ? `Hallo Team ${escapeHtml(a.kunde_firma.trim())},`
      : "Hallo,";
  return SHELL(`
<tr><td style="padding:24px 32px 0;">
<h1 style="font-size:22px;font-weight:800;margin:0 0 12px;">Ihr Angebot von Wohlstandsmarketing</h1>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${anrede}</p>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">vielen Dank für Ihr Interesse. Ihr persönliches Angebot ist fertig — Sie können es bequem online einsehen und als PDF herunterladen.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;background:#f4f7fc;border-radius:10px;width:100%;">
<tr><td style="padding:14px 18px;font-size:14px;color:#52525b;">Angebot ${escapeHtml(a.nummer || "")}</td>
<td style="padding:14px 18px;font-size:16px;font-weight:800;color:#1663de;text-align:right;">${escapeHtml(eur(a.brutto))}</td></tr>
</table>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr><td style="border-radius:10px;background:#1663de;">
<a href="${escapeHtml(link)}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Angebot einsehen →</a>
</td></tr></table>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 4px;">Gültig bis ${escapeHtml(deDate(a.gueltig_bis))}. Bei Fragen einfach auf diese Mail antworten.</p>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Herzliche Grüße<br>${escapeHtml(ANBIETER.name)} · Wohlstandsmarketing</p>
</td></tr>`);
}

/**
 * Erinnerungs-Mail an den Kunden bei noch nicht angenommenem Angebot.
 * Stufe 1 (Tag 5) freundlich-nachhörend, Stufe 2 (Tag 12) mit Ablauf-Dringlichkeit.
 * Verlinkt nur die bestehende Online-Ansicht — kein Annehmen/Ablehnen-Button.
 */
export function reminderEmailHtml(a: Angebot, link: string, stufe: number): string {
  const anrede = a.kunde_ansprech?.trim()
    ? `Hallo ${escapeHtml(a.kunde_ansprech.trim())},`
    : a.kunde_firma?.trim()
      ? `Hallo Team ${escapeHtml(a.kunde_firma.trim())},`
      : "Hallo,";
  const gueltig = a.gueltig_bis ? deDate(a.gueltig_bis) : "";
  const cta = (label: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr><td style="border-radius:10px;background:#1663de;">
<a href="${escapeHtml(link)}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">${label}</a>
</td></tr></table>`;
  const gruss = `<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Herzliche Grüße<br>${escapeHtml(ANBIETER.name)} · Wohlstandsmarketing</p>`;

  if (stufe <= 1) {
    return SHELL(`
<tr><td style="padding:24px 32px 0;">
<h1 style="font-size:22px;font-weight:800;margin:0 0 12px;">Kurze Erinnerung an Ihr Angebot</h1>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${anrede}</p>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">wir wollten kurz nachhören, ob unser Angebot ${escapeHtml(a.nummer || "")} (${escapeHtml(eur(a.brutto))}) alle Ihre Fragen beantwortet. Gerne können Sie es jederzeit bequem online einsehen:</p>
${cta("Angebot ansehen →")}
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">Falls etwas unklar ist oder Sie einzelne Punkte anpassen möchten, antworten Sie einfach auf diese Mail — wir finden gemeinsam die passende Lösung.</p>
${gueltig ? `<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 4px;">Das Angebot ist noch bis ${escapeHtml(gueltig)} gültig.</p>` : ""}
${gruss}
</td></tr>`);
  }

  return SHELL(`
<tr><td style="padding:24px 32px 0;">
<h1 style="font-size:22px;font-weight:800;margin:0 0 12px;">Ihr Angebot läuft bald aus</h1>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${anrede}</p>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">wir möchten sichergehen, dass Ihnen unser Angebot ${escapeHtml(a.nummer || "")} (${escapeHtml(eur(a.brutto))}) nicht entgeht.${gueltig ? ` Die Gültigkeit endet am ${escapeHtml(gueltig)}.` : ""} Damit Sie sich Konditionen und Startzeitpunkt sichern, genügt ein Klick:</p>
${cta("Angebot jetzt sichern →")}
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">Haben Sie noch offene Punkte? Schreiben Sie uns kurz zurück — wir melden uns umgehend.</p>
${gruss}
</td></tr>`);
}

/** Bestätigungs-Mail an den Kunden nach Annahme. */
export function acceptedCustomerEmailHtml(a: Angebot): string {
  const anrede = a.kunde_ansprech?.trim()
    ? `Hallo ${escapeHtml(a.kunde_ansprech.trim())},`
    : "Hallo,";
  return SHELL(`
<tr><td style="padding:24px 32px 0;">
<h1 style="font-size:22px;font-weight:800;margin:0 0 12px;">Vielen Dank — Angebot angenommen ✓</h1>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${anrede}</p>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">vielen Dank für Ihre Zusage zu Angebot <strong>${escapeHtml(a.nummer || "")}</strong> (${escapeHtml(eur(a.brutto))}). Wir freuen uns auf die Zusammenarbeit und melden uns in Kürze mit den nächsten Schritten zum Start.</p>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Herzliche Grüße<br>${escapeHtml(ANBIETER.name)} · Wohlstandsmarketing</p>
</td></tr>`);
}
