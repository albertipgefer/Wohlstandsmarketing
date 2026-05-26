/**
 * POST /api/lead-magnet
 *
 * Lead-Magnet-Anmeldung — Schritt 1 (Double-Opt-In):
 *
 *   1. Honeypot
 *   2. Pflichtfelder: Vorname + E-Mail
 *   3. Newsletter-Flag (optional, default false)
 *   4. HMAC-signierten Token erstellen (7 Tage gültig)
 *   5. Bestätigungs-Mail an den User schicken — KEIN PDF, KEIN Audience-Push.
 *      Erst nach Klick auf Bestätigungs-Link in /api/lead-magnet/confirm
 *      bekommt der User die PDF und (falls Newsletter angekreuzt)
 *      wird der Audience hinzugefügt.
 *
 * Required ENV:
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL
 *   LEAD_MAGNET_SECRET
 */
export const runtime = "nodejs";

import { createToken } from "@/lib/lead-magnet-token";

const SITE = "https://wohlstandsmarketing.de";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const secret = process.env.LEAD_MAGNET_SECRET;

  if (!apiKey || !secret) {
    return Response.json(
      { ok: false, reason: "missing_env" },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const firstName = String(form.get("firstName") || "").trim().slice(0, 80);
  const email = String(form.get("email") || "").trim().toLowerCase().slice(0, 200);
  const newsletter = String(form.get("newsletter") || "") === "on";
  const honeypot = String(form.get("botcheck") || "");
  const source = String(form.get("source") || "unknown").slice(0, 80);

  if (honeypot) return Response.json({ ok: true });
  if (!firstName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, reason: "invalid_fields" }, { status: 400 });
  }

  const token = createToken({ email, firstName, newsletter });
  const confirmUrl = `${SITE}/api/lead-magnet/confirm?token=${encodeURIComponent(token)}`;

  const html = confirmMailHtml({ firstName, confirmUrl, newsletter });
  const text = confirmMailText({ firstName, confirmUrl, newsletter });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Albert von Wohlstandsmarketing <${fromEmail}>`,
      to: [email],
      reply_to: "info@wohlstandsmarketing.de",
      subject: "Bitte bestätige deine E-Mail-Adresse",
      html,
      text,
      tags: [
        { name: "funnel", value: "lead-magnet" },
        { name: "step", value: "00-doi" },
        { name: "source", value: source.slice(0, 60) },
      ],
    }),
  });
  if (!r.ok) {
    return Response.json(
      { ok: false, reason: "resend_send_failed", detail: await r.text() },
      { status: 500 }
    );
  }

  return Response.json({ ok: true, doi: true });
}

function confirmMailHtml({
  firstName,
  confirmUrl,
  newsletter,
}: {
  firstName: string;
  confirmUrl: string;
  newsletter: boolean;
}) {
  const newsletterBlock = newsletter
    ? `<p style="margin:14px 0 0 0;color:#52525b;font-size:14px;line-height:1.6">Außerdem hast du angegeben, dass du in den nächsten Wochen Marketing-Mails von mir bekommen möchtest. Darauf freue ich mich. Abmelden geht jederzeit per Klick.</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="de"><body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e4e7;border-radius:24px;overflow:hidden">
      <tr><td style="padding:32px 32px 0 32px">
        <table role="presentation" width="100%"><tr>
          <td style="vertical-align:middle">
            <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:#1663de;color:#fff;font-weight:900;font-size:22px;text-align:center;line-height:40px;position:relative">W<span style="position:absolute;right:5px;bottom:5px;width:7px;height:7px;border-radius:50%;background:#db6f16"></span></div>
          </td>
          <td style="vertical-align:middle;padding-left:10px;font-weight:700;font-size:15px">Wohlstandsmarketing</td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:24px 32px 0 32px">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#1663de">Ein Schritt fehlt noch</p>
        <h1 style="margin:10px 0 0 0;font-size:24px;line-height:1.25;letter-spacing:-0.5px;font-weight:900">Hi ${escapeHtml(firstName)} — bitte bestätige deine E-Mail-Adresse</h1>
      </td></tr>
      <tr><td style="padding:18px 32px 0 32px">
        <p style="margin:0;color:#27272a;font-size:15px;line-height:1.6">Danke, dass du dir die PDF „Die 11 teuersten Marketing-Fehler im deutschen Mittelstand" geholt hast.</p>
        <p style="margin:14px 0 0 0;color:#27272a;font-size:15px;line-height:1.6">Damit niemand mit deiner Mail-Adresse Schindluder treiben kann, brauche ich noch eine kurze Bestätigung — ein Klick:</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px 0"><tr><td>
          <a href="${confirmUrl}" target="_blank" style="display:inline-block;background:#0a0a0a;color:#ffffff !important;text-decoration:none;padding:16px 30px;border-radius:999px;font-weight:700;font-size:15px;">E-Mail jetzt bestätigen →</a>
        </td></tr></table>
        <p style="margin:14px 0 0 0;font-size:12.5px;color:#71717a">Falls der Button nicht funktioniert, kopier diesen Link in den Browser:<br/><a href="${confirmUrl}" style="color:#1663de;word-break:break-all">${confirmUrl}</a></p>
        ${newsletterBlock}
      </td></tr>
      <tr><td style="padding:24px 32px 0 32px">
        <p style="margin:0;color:#27272a;font-size:15px;line-height:1.6">Nach dem Klick bekommst du die PDF direkt in dein Postfach.</p>
        <p style="margin:18px 0 0 0;color:#27272a;font-size:15px;line-height:1.6">Bis gleich,<br/><strong>Albert Ipgefer</strong><br/><span style="color:#71717a;font-size:13px">Gründer · Wohlstandsmarketing</span></p>
      </td></tr>
      <tr><td style="padding:28px 32px 32px 32px">
        <hr style="border:none;border-top:1px solid #e4e4e7;margin:8px 0 16px 0"/>
        <p style="margin:0;color:#a1a1aa;font-size:11px;line-height:1.55">Der Bestätigungs-Link ist 7 Tage gültig.<br/>Wenn du die PDF nicht angefordert hast, ignorier diese Mail einfach — ohne Bestätigung passiert nichts.<br/><br/>Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function confirmMailText({
  firstName,
  confirmUrl,
  newsletter,
}: {
  firstName: string;
  confirmUrl: string;
  newsletter: boolean;
}) {
  return `Hi ${firstName},

danke, dass du dir die PDF „Die 11 teuersten Marketing-Fehler im deutschen Mittelstand" geholt hast.

Bitte bestätige kurz, dass du diese Mail-Adresse wirklich bist — damit niemand mit deiner E-Mail Schindluder treiben kann.

E-Mail jetzt bestätigen:
${confirmUrl}

Nach dem Klick bekommst du die PDF direkt in dein Postfach.
${newsletter ? "\nAußerdem hast du angegeben, dass du in den nächsten Wochen Marketing-Mails von mir bekommen möchtest. Abmelden geht jederzeit per Klick.\n" : ""}
Bis gleich,
Albert Ipgefer
Gründer · Wohlstandsmarketing

---
Der Bestätigungs-Link ist 7 Tage gültig.
Wenn du die PDF nicht angefordert hast, ignorier diese Mail einfach.

Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems
info@wohlstandsmarketing.de
`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
