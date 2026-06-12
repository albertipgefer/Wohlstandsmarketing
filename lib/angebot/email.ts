/**
 * E-Mail-Versand für das Angebots-System (Resend über fetch, Muster wie
 * app/api/angebot/route.ts). WSM-Branding-HTML, kein Storage.
 *
 * Required ENV:
 *   RESEND_API_KEY      — Resend-API-Key
 *   RESEND_FROM_EMAIL   — verifizierte Absender-Adresse (z.B. angebot@wohlstandsmarketing.de)
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
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
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
<tr><td style="padding:24px 32px 0;font-size:15px;font-weight:700;letter-spacing:-0.3px;">WOHLSTANDS<span style="color:#1663de;">MARKETING</span></td></tr>
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
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">vielen Dank für Ihr Interesse. Ihr persönliches Angebot ist fertig — Sie können es bequem online ansehen, als PDF herunterladen und direkt annehmen.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;background:#f4f7fc;border-radius:10px;width:100%;">
<tr><td style="padding:14px 18px;font-size:14px;color:#52525b;">Angebot ${escapeHtml(a.nummer || "")}</td>
<td style="padding:14px 18px;font-size:16px;font-weight:800;color:#1663de;text-align:right;">${escapeHtml(eur(a.brutto))}</td></tr>
</table>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr><td style="border-radius:10px;background:#1663de;">
<a href="${escapeHtml(link)}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Angebot ansehen &amp; annehmen →</a>
</td></tr></table>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 4px;">Gültig bis ${escapeHtml(deDate(a.gueltig_bis))}. Bei Fragen einfach auf diese Mail antworten.</p>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Herzliche Grüße<br>${escapeHtml(ANBIETER.name)} · Wohlstandsmarketing</p>
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
