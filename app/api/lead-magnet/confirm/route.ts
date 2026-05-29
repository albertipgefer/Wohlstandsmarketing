/**
 * GET /api/lead-magnet/confirm?token=...
 *
 * Bestätigungs-Endpoint für den Lead-Magnet-Double-Opt-In:
 *   1. Token validieren (HMAC + Ablauf)
 *   2. Welcome-Mail mit PDF-Link an den User schicken
 *   3. WENN newsletter=true → Resend-Audience hinzufügen → Drip-Sequenz startet
 *   4. Internal Notification an info@wohlstandsmarketing.de
 *   5. Redirect auf /lead-magnet/danke
 *
 * Required ENV (siehe /api/lead-magnet):
 *   RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_AUDIENCE_ID, LEAD_MAGNET_SECRET
 */
export const runtime = "nodejs";

import { verifyToken } from "@/lib/lead-magnet-token";

const SITE = "https://wohlstandsmarketing.de";
const PDF_PATH = "/lead-magnet/11-marketing-fehler-mittelstand.pdf";

export async function GET(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey) {
    return errorRedirect("config");
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  if (!token) return errorRedirect("missing");

  const payload = verifyToken(token);
  if (!payload) return errorRedirect("invalid");

  const { email, firstName, newsletter } = payload;

  // 1) Audience-Push — nur wenn Newsletter-Opt-In gesetzt
  let audiencePushed = false;
  if (newsletter && audienceId) {
    try {
      const r = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            unsubscribed: false,
          }),
        }
      );
      audiencePushed = r.ok || r.status === 409;
    } catch (e) {
      console.warn("Resend audience push exception:", e);
    }
  }

  // 2) Welcome-Mail mit PDF
  const welcomeHtml = welcomeMailHtml({ firstName, newsletter });
  const welcomeText = welcomeMailText({ firstName, newsletter });

  const sendWelcome = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `lm-welcome-${email}`,
    },
    body: JSON.stringify({
      from: `Albert von Wohlstandsmarketing <${fromEmail}>`,
      to: [email],
      reply_to: "info@wohlstandsmarketing.de",
      subject: "Deine PDF: Die 11 teuersten Marketing-Fehler im Mittelstand",
      html: welcomeHtml,
      text: welcomeText,
      tags: [
        { name: "funnel", value: "lead-magnet" },
        { name: "step", value: "01-welcome" },
      ],
    }),
  });
  if (!sendWelcome.ok) {
    console.error("welcome send failed:", await sendWelcome.text());
  }

  // 3) Internal Notification
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Lead-Magnet <${fromEmail}>`,
      to: ["info@wohlstandsmarketing.de"],
      subject: `Lead bestätigt — ${firstName} <${email}> ${newsletter ? "(+Newsletter)" : "(nur PDF)"}`,
      html: `
        <p>Neuer bestätigter Lead über den Lead-Magnet-Funnel:</p>
        <ul>
          <li><strong>Vorname:</strong> ${escapeHtml(firstName)}</li>
          <li><strong>E-Mail:</strong> ${escapeHtml(email)}</li>
          <li><strong>Newsletter-Opt-In:</strong> ${newsletter ? "✓ ja" : "nein"}</li>
          <li><strong>Audience-Push:</strong> ${audiencePushed ? "✓ erfolgreich" : newsletter ? "fehlgeschlagen" : "skipped"}</li>
        </ul>
        <p style="color:#888;font-size:12px">Welcome-Mail mit PDF-Link wurde verschickt.</p>
      `,
    }),
  });

  // 4) Redirect auf Danke-Seite
  const danke = new URL("/lead-magnet/danke", SITE);
  danke.searchParams.set("nl", newsletter ? "1" : "0");
  return Response.redirect(danke.toString(), 302);
}

function errorRedirect(reason: string) {
  const u = new URL("/lead-magnet/danke", SITE);
  u.searchParams.set("err", reason);
  return Response.redirect(u.toString(), 302);
}

/* ─── Welcome-Mail-Templates (nach Bestätigung) ─────────────────────── */

function welcomeMailHtml({
  firstName,
  newsletter,
}: {
  firstName: string;
  newsletter: boolean;
}) {
  const nlBlock = newsletter
    ? `<p style="margin:14px 0 0 0;color:#27272a;font-size:15px;line-height:1.6">In den nächsten Tagen schicke ich dir noch ein paar weitere Mails mit Vertiefungen und konkreten Beispielen — du hast den Newsletter angekreuzt, daher kommen die. Abmelden geht jederzeit per Klick am Ende jeder Mail.</p>`
    : `<p style="margin:14px 0 0 0;color:#27272a;font-size:15px;line-height:1.6">Du bekommst keine weiteren Mails von mir, weil du den Newsletter nicht angekreuzt hast.</p>`;

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
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#1663de">Deine PDF ist da</p>
        <h1 style="margin:10px 0 0 0;font-size:26px;line-height:1.2;letter-spacing:-0.5px;font-weight:900">Hi ${escapeHtml(firstName)} — danke fürs Bestätigen.</h1>
      </td></tr>
      <tr><td style="padding:18px 32px 0 32px">
        <p style="margin:0;color:#27272a;font-size:15px;line-height:1.6">Hier ist deine PDF: <strong>„Die 11 teuersten Marketing-Fehler im deutschen Mittelstand"</strong> — mit konkreter Lösung pro Fehler und einer 30-Tage-Profi-Checkliste am Ende.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px 0"><tr><td>
          <a href="${SITE}${PDF_PATH}" target="_blank" style="display:inline-block;background:#0a0a0a;color:#ffffff !important;text-decoration:none;padding:16px 30px;border-radius:999px;font-weight:700;font-size:15px;">PDF jetzt herunterladen →</a>
        </td></tr></table>
        <p style="margin:14px 0 0 0;font-size:13px;color:#71717a">Falls der Button nicht funktioniert, hier der direkte Link:<br/><a href="${SITE}${PDF_PATH}" style="color:#1663de;word-break:break-all">${SITE}${PDF_PATH}</a></p>
      </td></tr>
      <tr><td style="padding:24px 32px 0 32px">
        <p style="margin:0;color:#27272a;font-size:15px;line-height:1.6"><strong>Mein Vorschlag:</strong> Geh die 11 Fehler einmal in Ruhe durch — und unterstreich die, die dich persönlich treffen. Erfahrungsgemäß sind es 3 bis 5. Genau diese sind dein Hebel für die nächsten 30 Tage.</p>
        ${nlBlock}
        <p style="margin:18px 0 0 0;font-size:15px;color:#27272a;line-height:1.6">Falls du Lust hast, direkt mit mir zu sprechen — buch gerne ein 15-Min-Erstgespräch:</p>
        <p style="margin:14px 0 0 0;font-size:15px"><a href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2" style="color:#1663de;font-weight:600">Termin buchen — 15-Min, kostenfrei →</a></p>
      </td></tr>
      <tr><td style="padding:28px 32px 32px 32px">
        <p style="margin:0;color:#27272a;font-size:15px;line-height:1.6">Bis gleich,<br/><strong>Albert Ipgefer</strong><br/><span style="color:#71717a;font-size:13px">Gründer · Wohlstandsmarketing</span></p>
        <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0 16px 0"/>
        <p style="margin:0;color:#a1a1aa;font-size:11px;line-height:1.5">Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function welcomeMailText({
  firstName,
  newsletter,
}: {
  firstName: string;
  newsletter: boolean;
}) {
  const nlLine = newsletter
    ? "\nIn den nächsten Tagen schicke ich dir noch ein paar Mails mit Vertiefungen. Abmelden geht jederzeit per Klick.\n"
    : "\nDu bekommst keine weiteren Mails von mir, weil du den Newsletter nicht angekreuzt hast.\n";

  return `Hi ${firstName} — danke fürs Bestätigen.

Hier ist deine PDF: „Die 11 teuersten Marketing-Fehler im deutschen Mittelstand"
→ ${SITE}${PDF_PATH}

Mein Vorschlag: Geh die 11 Fehler einmal in Ruhe durch und unterstreich die, die dich persönlich treffen.
${nlLine}
Falls du Lust hast, direkt mit mir zu sprechen, buch gerne ein 15-Min-Erstgespräch:
https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2

Bis gleich,
Albert Ipgefer
Gründer · Wohlstandsmarketing

---
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
