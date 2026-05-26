/**
 * POST /api/angebot
 * Sendet das individuelle Angebot per E-Mail an den User + Lead-Notification an Albert.
 */
import { NextRequest, NextResponse } from "next/server";
import { calcTotals, BUNDLE_DISCOUNT, services } from "@/content/pricing";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatEuro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const TIDYCAL_URL =
  "https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2";

function renderAngebotHtml(
  firstName: string,
  itemIds: string[],
  totals: ReturnType<typeof calcTotals>,
): string {
  const items = totals.selected
    .map(
      (s) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
        <div style="font-weight:600;color:#0A0A0A;font-size:15px;">${escapeHtml(s.name)}</div>
        <div style="color:#737373;font-size:12px;margin-top:3px;">${
          s.monthly ? `monatlich · ab ${s.durationMonths} Monaten` : "einmalig"
        }</div>
        <div style="color:#525252;font-size:13px;margin-top:8px;line-height:1.5;">${escapeHtml(s.short)}</div>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;text-align:right;vertical-align:top;">
        <div style="font-weight:700;font-size:15px;color:#0A0A0A;">${formatEuro(s.monthly ?? s.oneTime ?? 0)}${s.monthly ? '<span style="font-size:11px;color:#737373;">/Mo</span>' : ""}</div>
      </td>
    </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0A0A0A;">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:12px;color:#737373;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;">Wohlstandsmarketing</div>
      <h1 style="margin:8px 0 4px;font-size:28px;font-weight:900;letter-spacing:-0.02em;">Hallo ${escapeHtml(firstName)},</h1>
      <p style="margin:0;font-size:16px;color:#525252;">hier ist dein individuelles Angebot.</p>
    </div>

    <div style="background:#fff;border:1px solid #e5e5e5;border-radius:24px;padding:28px;">
      <p style="margin:0;font-size:13px;color:#1663DE;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;">Deine ausgewählten Leistungen</p>
      <table style="width:100%;border-collapse:collapse;margin-top:14px;">${items}</table>
    </div>

    ${
      totals.hasBundle
        ? `<div style="margin:20px 0 0;padding:18px;background:#ecfdf5;border-left:4px solid #16a34a;border-radius:12px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="font-size:20px;">🎁</div>
          <div>
            <div style="font-weight:700;font-size:14px;color:#065f46;">Bundle-Rabatt aktiv</div>
            <div style="color:#047857;font-size:13px;margin-top:4px;">Du sparst <strong>${formatEuro(totals.discountAmount)}</strong> · ${Math.round(BUNDLE_DISCOUNT * 100)} % auf alle Leistungen.</div>
          </div>
        </div>
      </div>`
        : ""
    }

    <div style="margin:24px 0 0;padding:28px;background:#fff;border:1px solid #e5e5e5;border-radius:24px;">
      <p style="margin:0;font-size:12px;color:#1663DE;font-weight:600;text-transform:uppercase;letter-spacing:0.18em;">Dein Investment</p>
      ${
        totals.oneTimeRaw > 0
          ? `<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:16px;padding-bottom:14px;border-bottom:1px solid #f0f0f0;">
        <div>
          <div style="font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.14em;">Einmalig</div>
          ${totals.hasBundle ? `<div style="font-size:12px;color:#a3a3a3;text-decoration:line-through;margin-top:4px;">${formatEuro(totals.oneTimeRaw)}</div>` : ""}
        </div>
        <div style="font-size:32px;font-weight:900;color:#0A0A0A;">${formatEuro(totals.oneTime)}</div>
      </div>`
          : ""
      }
      ${
        totals.monthlyRaw > 0
          ? `<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:16px;">
        <div>
          <div style="font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.14em;">Monatlich</div>
          ${totals.hasBundle ? `<div style="font-size:12px;color:#a3a3a3;text-decoration:line-through;margin-top:4px;">${formatEuro(totals.monthlyRaw)}/Mo</div>` : ""}
        </div>
        <div><span style="font-size:32px;font-weight:900;color:#0A0A0A;">${formatEuro(totals.monthly)}</span><span style="font-size:14px;color:#737373;">/Mo</span></div>
      </div>`
          : ""
      }
      <p style="margin:20px 0 0;font-size:11px;color:#a3a3a3;line-height:1.5;">Alle Preise zzgl. der gesetzlichen MwSt. Endgültige Konditionen werden im persönlichen Erstgespräch besprochen.</p>
    </div>

    <div style="margin:40px 0 24px;padding:32px;background:linear-gradient(135deg,#1663DE,#0a4bb8);border-radius:24px;color:#fff;text-align:center;">
      <h2 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Bereit, gemeinsam zu starten?</h2>
      <p style="margin:12px 0 20px;font-size:14px;opacity:0.9;line-height:1.6;">
        Buche dir jetzt dein kostenloses 15-Min-Erstgespräch. Ich bespreche persönlich
        mit dir den Zeitplan, die Umsetzung und beantworte alle deine Fragen.
      </p>
      <a href="${TIDYCAL_URL}" style="display:inline-block;background:#fff;color:#1663DE;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;">Erstgespräch buchen → 15 Min mit Albert</a>
    </div>

    <div style="text-align:center;color:#a3a3a3;font-size:12px;line-height:1.6;padding:24px 0;border-top:1px solid #e5e5e5;">
      Du erhältst diese Mail, weil du dein individuelles Angebot auf wohlstandsmarketing.de/preise angefordert hast.<br/>
      Wohlstandsmarketing · Albert Ipgefer · Vor der Loos 4e, 56130 Bad Ems<br/>
      <a href="https://wohlstandsmarketing.de/datenschutz" style="color:#a3a3a3;">Datenschutz</a> · <a href="https://wohlstandsmarketing.de/impressum" style="color:#a3a3a3;">Impressum</a>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  let body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    consent?: boolean;
    itemIds?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const firstName = (body.firstName || "").trim().slice(0, 80);
  const lastName = (body.lastName || "").trim().slice(0, 80);
  const email = (body.email || "").trim().slice(0, 160);
  const phone = (body.phone || "").trim().slice(0, 40);
  const consent = !!body.consent;
  const itemIds = Array.isArray(body.itemIds) ? body.itemIds.slice(0, 20) : [];

  if (!firstName || !lastName || !email || !phone || !consent) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!/^[+\d][\d\s()/-]{4,}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  // IDs gegen Whitelist validieren
  const validIds = new Set(services.map((s) => s.id));
  const cleanIds = itemIds.filter((id) => validIds.has(id));
  if (cleanIds.length === 0) {
    return NextResponse.json({ ok: false, error: "no_items" }, { status: 400 });
  }

  const totals = calcTotals(cleanIds);

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "missing_resend_key" }, { status: 503 });
  }

  // 1) Angebot an User
  const html = renderAngebotHtml(firstName, cleanIds, totals);
  const userMail = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Wohlstandsmarketing <${fromEmail}>`,
      to: [email],
      reply_to: "info@wohlstandsmarketing.de",
      subject: `${firstName}, dein individuelles Angebot — Wohlstandsmarketing`,
      html,
    }),
  });

  if (!userMail.ok) {
    const errText = await userMail.text();
    return NextResponse.json(
      { ok: false, error: "resend_user_error", detail: errText },
      { status: 500 },
    );
  }

  // 2) Lead-Notification an Albert
  const itemList = totals.selected
    .map(
      (s) =>
        `<li><strong>${escapeHtml(s.name)}</strong> — ${formatEuro(s.monthly ?? s.oneTime ?? 0)}${s.monthly ? "/Mo" : " einmalig"}</li>`,
    )
    .join("");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `WSM Lead-Bot <${fromEmail}>`,
      to: ["info@wohlstandsmarketing.de"],
      subject: `💼 Neuer Pricing-Lead: ${firstName} ${lastName} — ${formatEuro(totals.oneTime + totals.monthly)}${totals.monthly ? "/Mo" : ""}`,
      html: `
        <h2>Neuer Lead über Preis-Konfigurator</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Telefon:</strong> <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}">${escapeHtml(phone)}</a></p>
        <hr/>
        <p><strong>Ausgewählte Leistungen (${cleanIds.length}):</strong></p>
        <ul>${itemList}</ul>
        <hr/>
        <p><strong>Einmalig:</strong> ${formatEuro(totals.oneTime)}${totals.hasBundle ? ` <span style="color:#a3a3a3;text-decoration:line-through;">${formatEuro(totals.oneTimeRaw)}</span>` : ""}</p>
        <p><strong>Monatlich:</strong> ${formatEuro(totals.monthly)}${totals.hasBundle ? ` <span style="color:#a3a3a3;text-decoration:line-through;">${formatEuro(totals.monthlyRaw)}</span>` : ""}</p>
        ${totals.hasBundle ? `<p><strong>Bundle-Rabatt:</strong> ${Math.round(BUNDLE_DISCOUNT * 100)} % · gespart: ${formatEuro(totals.discountAmount)}</p>` : ""}
        <hr/>
        <p style="color:#737373;font-size:12px;">Angebot wurde dem Kunden bereits per E-Mail zugestellt.</p>
      `,
    }),
  });

  return NextResponse.json({ ok: true });
}
