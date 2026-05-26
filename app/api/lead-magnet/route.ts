/**
 * POST /api/lead-magnet
 *
 * Lead-Magnet-Anmeldung „Die 11 teuersten Marketing-Fehler".
 *
 * Flow:
 *   1. Honeypot-Check (`botcheck`) — Bots: silent success.
 *   2. Pflichtfelder Vorname + E-Mail validieren.
 *   3. (Optional) Kontakt in Resend-Audience aufnehmen, falls
 *      RESEND_AUDIENCE_ID gesetzt — sonst wird der Schritt
 *      stillschweigend übersprungen und der Lead trotzdem
 *      bedient (E-Mail mit PDF geht raus, Albert wird informiert).
 *   4. Welcome-Mail mit PDF-Download-Link an Lead.
 *   5. Internal Notification an info@wohlstandsmarketing.de.
 *
 * Required ENV:
 *   RESEND_API_KEY        — wie bei /api/contact (re_...)
 *   RESEND_FROM_EMAIL     — verifizierter Sender (z. B. hello@wohlstandsmarketing.de)
 *
 * Optional ENV:
 *   RESEND_AUDIENCE_ID    — Resend-Audience-ID für den Lead-Magnet-Funnel.
 *                           Wenn gesetzt, wird der Lead per API
 *                           in die Audience gepusht (für 7-Tage-Automation).
 */
export const runtime = "nodejs";

const SITE = "https://wohlstandsmarketing.de";
const PDF_PATH = "/lead-magnet/11-marketing-fehler-mittelstand.pdf";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const audienceId = process.env.RESEND_AUDIENCE_ID; // optional

  if (!apiKey) {
    return Response.json({ ok: false, reason: "missing_resend_key" }, { status: 503 });
  }

  const form = await req.formData();
  const firstName = String(form.get("firstName") || "").trim().slice(0, 80);
  const email = String(form.get("email") || "").trim().toLowerCase().slice(0, 200);
  const honeypot = String(form.get("botcheck") || "");
  const source = String(form.get("source") || "unknown").slice(0, 80);

  // Bot — silent success.
  if (honeypot) return Response.json({ ok: true });

  // Validierung
  if (!firstName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, reason: "invalid_fields" }, { status: 400 });
  }

  // (1) Audience-Push — best effort
  let audiencePushed = false;
  if (audienceId) {
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
      audiencePushed = r.ok;
      // 409 (already exists) zählen wir als OK.
      if (!r.ok && r.status !== 409) {
        // nicht abbrechen — Mail trotzdem rausschicken
        console.warn("Resend audience push failed:", await r.text());
      }
    } catch (e) {
      console.warn("Resend audience push exception:", e);
    }
  }

  // (2) Welcome-Mail mit PDF-Link an den Lead
  const welcomeHtml = welcomeMailHtml({ firstName });
  const welcomeText = welcomeMailText({ firstName });

  const sendWelcome = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
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
    const err = await sendWelcome.text();
    return Response.json(
      { ok: false, reason: "resend_send_failed", detail: err },
      { status: 500 }
    );
  }

  // (3) Internal Notification an Albert
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Lead-Magnet <${fromEmail}>`,
      to: ["info@wohlstandsmarketing.de"],
      subject: `Neuer Lead-Magnet-Download — ${firstName} <${email}>`,
      html: `
        <p>Neuer Download über den Lead-Magnet-Funnel:</p>
        <ul>
          <li><strong>Vorname:</strong> ${escapeHtml(firstName)}</li>
          <li><strong>E-Mail:</strong> ${escapeHtml(email)}</li>
          <li><strong>Quelle:</strong> ${escapeHtml(source)}</li>
          <li><strong>Audience-Push:</strong> ${audiencePushed ? "✓" : audienceId ? "fehlgeschlagen" : "skipped (keine Audience-ID)"}</li>
        </ul>
        <p style="color:#888;font-size:12px">Welcome-Mail mit PDF-Link wurde an den Lead verschickt.</p>
      `,
    }),
  });

  return Response.json({
    ok: true,
    pdfUrl: PDF_PATH,
    audiencePushed,
  });
}

/* ─── E-Mail-Templates ─────────────────────────────────────────────── */

function welcomeMailHtml({ firstName }: { firstName: string }) {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e4e7;border-radius:24px;overflow:hidden">
        <tr><td style="padding:32px 32px 8px 32px">
          <table role="presentation" width="100%"><tr>
            <td style="vertical-align:middle">
              <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:#1663de;color:#fff;font-weight:900;font-size:22px;text-align:center;line-height:40px;position:relative">
                W<span style="position:absolute;right:5px;bottom:5px;width:7px;height:7px;border-radius:50%;background:#db6f16"></span>
              </div>
            </td>
            <td style="vertical-align:middle;padding-left:10px;font-weight:700;font-size:15px">Wohlstandsmarketing</td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:8px 32px 0 32px">
          <p style="margin:24px 0 0 0;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#1663de">Deine PDF ist da</p>
          <h1 style="margin:10px 0 0 0;font-size:26px;line-height:1.2;letter-spacing:-0.5px;font-weight:900">
            Hi ${escapeHtml(firstName)} — danke fürs Anfordern.
          </h1>
        </td></tr>

        <tr><td style="padding:18px 32px 0 32px">
          <p style="margin:0;color:#52525b;font-size:15px;line-height:1.6">
            Hier ist deine PDF: <strong>„Die 11 teuersten Marketing-Fehler im deutschen Mittelstand"</strong> — mit konkreter Lösung pro Fehler und einer 30-Tage-Profi-Checkliste am Ende.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px 0">
            <tr><td>
              <a href="${SITE}${PDF_PATH}" target="_blank"
                 style="display:inline-block;background:#0a0a0a;color:#ffffff !important;text-decoration:none;padding:16px 30px;border-radius:999px;font-weight:700;font-size:15px;">
                PDF jetzt herunterladen →
              </a>
            </td></tr>
          </table>

          <p style="margin:14px 0 0 0;font-size:13px;color:#71717a">
            Falls der Button nicht funktioniert, hier der direkte Link:<br/>
            <a href="${SITE}${PDF_PATH}" style="color:#1663de;word-break:break-all">${SITE}${PDF_PATH}</a>
          </p>
        </td></tr>

        <tr><td style="padding:24px 32px 0 32px">
          <p style="margin:0;color:#27272a;font-size:15px;line-height:1.6">
            <strong>Mein Vorschlag:</strong> Geh die 11 Fehler einmal in Ruhe durch — und unterstreich die, die dich persönlich treffen. Erfahrungsgemäß sind es 3 bis 5. Genau diese sind dein Hebel für die nächsten 30 Tage.
          </p>
          <p style="margin:14px 0 0 0;color:#27272a;font-size:15px;line-height:1.6">
            In den nächsten Tagen schicke ich dir noch ein paar weitere Mails mit Vertiefungen und konkreten Beispielen. Falls du danach das Gefühl hast, dass wir gut zusammenpassen — buch dir gerne ein 15-Min-Erstgespräch:
          </p>

          <p style="margin:18px 0 0 0;font-size:14px">
            <a href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
               style="color:#1663de;font-weight:600">Termin buchen — 15-Min, kostenfrei →</a>
          </p>
        </td></tr>

        <tr><td style="padding:28px 32px 32px 32px">
          <p style="margin:24px 0 0 0;color:#27272a;font-size:15px;line-height:1.6">
            Bis gleich,<br/>
            <strong>Albert Ipgefer</strong><br/>
            <span style="color:#71717a;font-size:13px">Gründer · Wohlstandsmarketing</span>
          </p>
        </td></tr>

        <tr><td style="padding:0 32px 28px 32px">
          <hr style="border:none;border-top:1px solid #e4e4e7;margin:8px 0 16px 0"/>
          <p style="margin:0;color:#a1a1aa;font-size:11px;line-height:1.5">
            Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · info@wohlstandsmarketing.de<br/>
            Du erhältst diese Mail, weil du die PDF auf wohlstandsmarketing.de angefordert hast.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function welcomeMailText({ firstName }: { firstName: string }) {
  return `Hi ${firstName},

danke fürs Anfordern! Hier ist deine PDF:

„Die 11 teuersten Marketing-Fehler im deutschen Mittelstand"
→ ${SITE}${PDF_PATH}

Mein Vorschlag: Geh die 11 Fehler einmal in Ruhe durch und unterstreich die, die dich persönlich treffen. Erfahrungsgemäß sind es 3-5. Genau die sind dein Hebel für die nächsten 30 Tage.

In den nächsten Tagen schicke ich dir noch ein paar Mails mit Vertiefungen. Falls du das Gefühl hast, dass wir gut zusammenpassen, buch gerne ein 15-Min-Erstgespräch:
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
