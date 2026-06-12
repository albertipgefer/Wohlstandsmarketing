/**
 * E-Mail-Vorlagen fürs Finanz-Modul (Rechnung + Mahnung), Resend über fetch.
 * Nutzt die geteilten Helfer aus lib/angebot/email (sendMail/escapeHtml/baseUrl).
 */
import { sendMail, escapeHtml, baseUrl } from "@/lib/angebot/email";
import { ANBIETER } from "@/lib/angebot/stammdaten";
import { eur, deDate } from "@/lib/angebot/format";
import type { Rechnung } from "@/lib/finanzen/db";

export { sendMail };

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

function anrede(r: Rechnung): string {
  if (r.kunde_ansprech?.trim()) return `Hallo ${escapeHtml(r.kunde_ansprech.trim())},`;
  if (r.kunde_firma?.trim()) return `Hallo Team ${escapeHtml(r.kunde_firma.trim())},`;
  return "Hallo,";
}

function betragBox(r: Rechnung): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;background:#f4f7fc;border-radius:10px;width:100%;">
<tr><td style="padding:14px 18px;font-size:14px;color:#52525b;">Rechnung ${escapeHtml(r.nummer || "")}</td>
<td style="padding:14px 18px;font-size:16px;font-weight:800;color:#1663de;text-align:right;">${escapeHtml(eur(r.brutto))}</td></tr>
</table>`;
}

/** Rechnungs-Mail an den Kunden. `link` = öffentliche Online-Ansicht (optional). */
export function rechnungEmailHtml(r: Rechnung, link?: string): string {
  const linkBtn = link
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 18px;"><tr><td style="border-radius:10px;background:#1663de;">
<a href="${escapeHtml(link)}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Rechnung online ansehen &amp; PDF →</a>
</td></tr></table>`
    : "";
  return SHELL(`
<tr><td style="padding:24px 32px 0;">
<h1 style="font-size:22px;font-weight:800;margin:0 0 12px;">Ihre Rechnung von Wohlstandsmarketing</h1>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${anrede(r)}</p>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">anbei Ihre Rechnung ${escapeHtml(r.nummer || "")} (auch als PDF im Anhang). Bitte begleichen Sie den Betrag bis zum <strong>${escapeHtml(deDate(r.faellig_am))}</strong>.</p>
${betragBox(r)}
${linkBtn}
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Bei Fragen einfach auf diese Mail antworten.</p>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Herzliche Grüße<br>${escapeHtml(ANBIETER.name)} · Wohlstandsmarketing</p>
</td></tr>`);
}

/** Mahnung an den Kunden (Stufe 1 = Zahlungserinnerung, 2/3 = Mahnung). */
export function mahnungEmailHtml(r: Rechnung, stufe: number): string {
  const titel = stufe <= 1 ? "Zahlungserinnerung" : `${stufe}. Mahnung`;
  const ton =
    stufe <= 1
      ? "vermutlich ist es Ihrer Aufmerksamkeit entgangen — die folgende Rechnung ist noch offen:"
      : "trotz unserer Erinnerung ist die folgende Rechnung weiterhin offen:";
  return SHELL(`
<tr><td style="padding:24px 32px 0;">
<h1 style="font-size:22px;font-weight:800;margin:0 0 12px;">${escapeHtml(titel)}</h1>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${anrede(r)}</p>
<p style="font-size:15px;line-height:1.6;color:#27272a;margin:0 0 16px;">${ton}</p>
${betragBox(r)}
<p style="font-size:14px;line-height:1.6;color:#27272a;margin:0 0 16px;">Ursprünglich fällig am <strong>${escapeHtml(deDate(r.faellig_am))}</strong>. Wir bitten um Begleichung innerhalb der nächsten 7 Tage.</p>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Sollte sich Ihre Zahlung überschnitten haben, betrachten Sie diese Nachricht als gegenstandslos.</p>
<p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 8px;">Herzliche Grüße<br>${escapeHtml(ANBIETER.name)} · Wohlstandsmarketing</p>
</td></tr>`);
}
