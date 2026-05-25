/**
 * POST /api/contact
 * Sends the contact form to info@wohlstandsmarketing.de via Resend.
 *
 * Required ENV (set in .env.local, then deployed via Vercel):
 *   RESEND_API_KEY    — Resend API key (re_...)
 *   RESEND_FROM_EMAIL — verified sender e.g. hello@wohlstandsmarketing.de
 *
 * Without those, the route returns 503 and the frontend falls back to mailto:.
 */
export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    return Response.json(
      { ok: false, reason: "missing_resend_key" },
      { status: 503 }
    );
  }

  const data = await req.formData();
  const name = String(data.get("name") || "").slice(0, 200);
  const email = String(data.get("email") || "").slice(0, 200);
  const company = String(data.get("company") || "").slice(0, 200);
  const message = String(data.get("message") || "").slice(0, 5000);
  const honeypot = String(data.get("botcheck") || "");

  if (honeypot) {
    // Silent success for bots
    return Response.json({ ok: true });
  }
  if (!name || !email || !message) {
    return Response.json(
      { ok: false, reason: "missing_fields" },
      { status: 400 }
    );
  }

  const subject = `Neue Anfrage über wohlstandsmarketing.de — ${name}`;
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Unternehmen:</strong> ${escapeHtml(company)}</p>` : ""}
    <p><strong>Nachricht:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    <hr/>
    <p style="color:#888;font-size:12px">Gesendet über das Kontaktformular auf wohlstandsmarketing.de</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Wohlstandsmarketing <${fromEmail}>`,
      to: ["info@wohlstandsmarketing.de"],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return Response.json(
      { ok: false, reason: "resend_error", detail: errText },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
