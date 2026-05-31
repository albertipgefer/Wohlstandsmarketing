/**
 * POST /api/angebot
 * Sendet das individuelle Angebot per E-Mail an den User + Lead-Notification an Albert.
 */
import { NextRequest, NextResponse } from "next/server";
import {
  calcTotals,
  decodeSelections,
  BUNDLE_DISCOUNT,
  type ResolvedSelection,
} from "@/content/pricing";
import { syncLeadToClose } from "@/lib/close";

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
  "https://tidycal.com/albertipgefer/strategiegespraech-mit-wohlstandsmarketing";

function describeSelection(r: ResolvedSelection): string {
  const parts: string[] = [];
  if (r.service.multiplyByQuantity && r.selection.quantity && r.selection.quantity > 1) {
    parts.push(`${r.selection.quantity}× Landingpage`);
  }
  if (r.service.extraPageOption) {
    const inc = r.service.extraPageOption.included;
    const extra = r.selection.extraPages ?? 0;
    parts.push(extra > 0 ? `${inc} inkl. + ${extra} Extra-Seiten` : `${inc} Unterseiten inkl.`);
  }
  if (r.service.monthly && r.effectiveDuration) {
    parts.push(`${r.effectiveDuration} Monate Laufzeit`);
  } else if (r.service.monthly) {
    parts.push("monatlich");
  } else if (!r.service.multiplyByQuantity && !r.service.extraPageOption) {
    parts.push("einmalig");
  }
  return parts.join(" · ");
}

function renderAngebotHtml(
  firstName: string,
  totals: ReturnType<typeof calcTotals>,
): string {
  const items = totals.selected
    .map(
      (r) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
        <div style="font-weight:600;color:#0A0A0A;font-size:15px;">${escapeHtml(r.service.name)}</div>
        <div style="color:#737373;font-size:12px;margin-top:3px;">${escapeHtml(describeSelection(r))}</div>
        <div style="color:#525252;font-size:13px;margin-top:8px;line-height:1.5;">${escapeHtml(r.service.short)}</div>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;text-align:right;vertical-align:top;">
        <div style="font-weight:700;font-size:15px;color:#0A0A0A;">${
          r.oneTimeSum > 0
            ? formatEuro(r.oneTimeSum)
            : `${formatEuro(r.monthlySum)}<span style="font-size:11px;color:#737373;">/Mo</span>`
        }</div>
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
      <p style="margin:20px 0 0;font-size:11px;color:#a3a3a3;line-height:1.5;">Alle Preise zzgl. der gesetzlichen MwSt. Endgültige Konditionen werden im persönlichen Strategiegespräch besprochen.</p>
    </div>

    <div style="margin:40px 0 24px;padding:32px;background:linear-gradient(135deg,#1663DE,#0a4bb8);border-radius:24px;color:#fff;text-align:center;">
      <h2 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Lass uns dein Angebot durchsprechen</h2>
      <p style="margin:12px 0 20px;font-size:14px;opacity:0.9;line-height:1.6;">
        Buche dir jetzt dein Strategiegespräch zu deinem Angebot. Ich bespreche persönlich
        mit dir Zeitplan, Umsetzung und beantworte alle deine offenen Fragen.
      </p>
      <a href="${TIDYCAL_URL}" style="display:inline-block;background:#fff;color:#1663DE;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;">Strategiegespräch zum Angebot buchen</a>
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
    selections?: string;
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
  const encoded = (body.selections || "").slice(0, 2000);

  if (!firstName || !lastName || !email || !phone || !consent || !encoded) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!/^[+\d][\d\s()/-]{4,}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const selections = decodeSelections(encoded);
  if (selections.length === 0) {
    return NextResponse.json({ ok: false, error: "no_items" }, { status: 400 });
  }

  const totals = calcTotals(selections);

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "missing_resend_key" }, { status: 503 });
  }

  // 1) Angebot an User
  const html = renderAngebotHtml(firstName, totals);
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

  // 2) Lead-Notification an Albert (mit Detail-Auswahl)
  const itemList = totals.selected
    .map(
      (r) =>
        `<li><strong>${escapeHtml(r.service.name)}</strong> — ${escapeHtml(describeSelection(r))} — ${
          r.oneTimeSum > 0
            ? formatEuro(r.oneTimeSum)
            : `${formatEuro(r.monthlySum)}/Mo`
        }</li>`,
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
        <p><strong>Ausgewählte Leistungen (${selections.length}):</strong></p>
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

  // Lead automatisch in Close CRM anlegen (gelabelt: Webseite). Gekapselt.
  try {
    const sync = await syncLeadToClose({
      source: "angebot",
      firstName,
      lastName,
      email,
      phone,
      noteLines: [
        `Angebot konfiguriert: ${selections.length} Leistung(en)`,
        ...totals.selected.map(
          (r) =>
            `· ${r.service.name} — ${describeSelection(r)} — ${
              r.oneTimeSum > 0 ? formatEuro(r.oneTimeSum) : `${formatEuro(r.monthlySum)}/Mo`
            }`,
        ),
        `Summe einmalig: ${formatEuro(totals.oneTime)}`,
        totals.monthly > 0 ? `Summe monatlich: ${formatEuro(totals.monthly)}/Mo` : null,
      ],
    });
    if (!sync.ok) console.warn("Close-Sync (Angebot) fehlgeschlagen:", sync.reason);
  } catch (e) {
    console.warn("Close-Sync (Angebot) Exception:", e);
  }

  return NextResponse.json({ ok: true });
}
