/**
 * POST /api/ki-check/report
 * Sendet den ausführlichen KI-Sichtbarkeits-Bericht per E-Mail (Resend).
 * Body: { resultId, email, consent }
 */
import { NextRequest, NextResponse } from "next/server";
import type { KiCheckResult, PillarResult } from "@/lib/ki-check/types";
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

function pillarColor(score: number): string {
  if (score >= 19) return "#16a34a"; // grün
  if (score >= 10) return "#db6f16"; // gold
  return "#dc2626"; // rot
}

function scoreColor(score: number): string {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#1663DE";
  if (score >= 35) return "#db6f16";
  return "#dc2626";
}

function renderPillarHtml(p: PillarResult): string {
  const items = p.items
    .map((it) => {
      const icon = it.status === "pass" ? "✅" : it.status === "warn" ? "⚠️" : "🔴";
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
            <div style="font-weight:600;color:#0A0A0A;font-size:14px;">${icon} ${escapeHtml(it.label)}</div>
            <div style="color:#525252;font-size:13px;margin-top:4px;line-height:1.5;">${escapeHtml(it.detail)}</div>
            ${
              it.fix
                ? `<div style="color:#1663DE;font-size:13px;margin-top:6px;line-height:1.5;"><strong>Fix:</strong> ${escapeHtml(it.fix)}</div>`
                : ""
            }
          </td>
        </tr>`;
    })
    .join("");

  return `
    <div style="margin:28px 0;padding:24px;border:1px solid #e5e5e5;border-radius:16px;background:#fff;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px;">
        <div style="font-size:13px;font-weight:600;color:${pillarColor(p.score)};text-transform:uppercase;letter-spacing:0.08em;">
          ${escapeHtml(p.title)}
        </div>
        <div style="font-weight:800;color:${pillarColor(p.score)};font-size:18px;">${p.score}/25</div>
      </div>
      <div style="color:#525252;font-size:14px;margin-bottom:12px;line-height:1.6;">${escapeHtml(p.summary)}</div>
      <table style="width:100%;border-collapse:collapse;">${items}</table>
    </div>
  `;
}

function renderPagesTable(r: KiCheckResult): string {
  if (r.pages.length === 0) return "";
  const rows = r.pages
    .slice(0, 30)
    .map((p) => {
      const short = p.url.replace(r.normalizedUrl, "") || "/";
      const status =
        p.status === "ok"
          ? `<span style="color:#16a34a;font-weight:700;">${p.pageScore ?? "—"}</span>`
          : `<span style="color:#dc2626;font-weight:700;">${p.status === "timeout" ? "Timeout" : "Fehler"}</span>`;
      const issuesText =
        p.issues.length === 0
          ? '<span style="color:#16a34a;">✓ ok</span>'
          : p.issues
              .slice(0, 3)
              .map(
                (i) =>
                  `<span style="color:${i.status === "fail" ? "#dc2626" : "#db6f16"};">${escapeHtml(i.message)}</span>`,
              )
              .join("<br/>");
      const perf = p.performance != null ? `${p.performance}` : "—";
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-family:monospace;font-size:12px;color:#0A0A0A;word-break:break-all;">${escapeHtml(short)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:center;font-size:13px;">${status}</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:center;font-size:13px;color:#525252;">${perf}</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;line-height:1.5;">${issuesText}</td>
        </tr>`;
    })
    .join("");

  return `
    <div style="margin:14px 0 0;padding:20px;border:1px solid #e5e5e5;border-radius:16px;background:#fff;overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 0;border-bottom:2px solid #0A0A0A;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#737373;">URL</th>
            <th style="text-align:center;padding:8px 0;border-bottom:2px solid #0A0A0A;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#737373;">Score</th>
            <th style="text-align:center;padding:8px 0;border-bottom:2px solid #0A0A0A;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#737373;">Speed</th>
            <th style="text-align:left;padding:8px 0;border-bottom:2px solid #0A0A0A;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#737373;">Findings</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      ${r.pages.length > 30 ? `<p style="color:#737373;font-size:11px;margin:12px 0 0;">+ weitere ${r.pages.length - 30} Seiten geprüft</p>` : ""}
    </div>`;
}

function renderReportHtml(r: KiCheckResult, firstName: string): string {
  const recs = r.topRecommendations
    .map(
      (rec, i) => `
      <div style="margin:14px 0;padding:16px;background:#FAFAFA;border-left:4px solid #1663DE;border-radius:8px;">
        <div style="font-weight:700;color:#0A0A0A;font-size:14px;">#${i + 1} — ${escapeHtml(rec.title)}</div>
        <div style="color:#525252;font-size:13px;margin-top:6px;line-height:1.6;">${escapeHtml(rec.body)}</div>
      </div>
    `,
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
      <p style="margin:0;font-size:16px;color:#525252;">hier ist dein KI-Sichtbarkeits-Bericht.</p>
    </div>

    <div style="background:#fff;border:1px solid #e5e5e5;border-radius:24px;padding:32px;text-align:center;">
      <div style="font-size:13px;color:#737373;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;">Gesamtscore</div>
      <div style="font-size:64px;font-weight:900;color:${scoreColor(r.score)};line-height:1;margin:8px 0;">${r.score}<span style="font-size:24px;color:#737373;">/100</span></div>
      <div style="font-size:16px;color:${scoreColor(r.score)};font-weight:700;text-transform:capitalize;">${r.scoreLabel}</div>
      <div style="font-size:13px;color:#737373;margin-top:14px;">Geprüfte URL: <strong style="color:#0A0A0A;">${escapeHtml(r.normalizedUrl)}</strong></div>
    </div>

    ${
      r.score < 80
        ? `
    <div style="margin:24px 0 0;padding:24px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:16px;">
      <div style="display:flex;align-items:flex-start;gap:14px;">
        <div style="font-size:24px;line-height:1;">⚠️</div>
        <div>
          <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#b91c1c;">Handlungsbedarf erkannt</div>
          <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#7f1d1d;">
            Wir haben ${
              r.score < 35
                ? "<strong>kritische Schwachstellen</strong>"
                : r.score < 60
                  ? "<strong>deutliche Lücken</strong>"
                  : "<strong>klare Optimierungs-Hebel</strong>"
            } gefunden. <strong>Wir empfehlen dringend, dieses Thema gemeinsam mit einem Experten anzugehen</strong> —
            KI-Crawler und Google verlieren sonst Vertrauen in deine Seite, und du verschenkst Reichweite
            an Wettbewerber, die diese Punkte bereits umgesetzt haben.
          </p>
          <p style="margin:14px 0 0;font-size:13px;color:#7f1d1d;">
            👉 Buche dir ein <a href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2" style="color:#b91c1c;font-weight:700;">kostenloses 15-Min-Erstgespräch mit Albert</a> — wir zeigen dir, wie du diese Lücken am schnellsten schließt.
          </p>
        </div>
      </div>
    </div>`
        : ""
    }

    <h2 style="margin:40px 0 8px;font-size:22px;font-weight:800;">Deine 3 wichtigsten Hebel</h2>
    <p style="color:#525252;font-size:14px;margin:0;">Wenn du diese drei Punkte anpackst, springt dein Score am stärksten nach oben.</p>
    ${recs}

    <h2 style="margin:40px 0 8px;font-size:22px;font-weight:800;">Geprüfte Seiten — Übersicht</h2>
    <p style="color:#525252;font-size:14px;margin:0 0 12px;">Wir haben <strong>${r.stats.pagesScanned} URLs</strong> deiner Seite analysiert (${r.stats.pagesOk} erfolgreich, ${r.stats.pagesFailed} nicht erreichbar) und <strong>${r.stats.totalCheckpoints} Einzel-Checkpoints</strong> ausgewertet.</p>
    ${renderPagesTable(r)}

    <h2 style="margin:40px 0 8px;font-size:22px;font-weight:800;">Detailbericht — 4 Säulen</h2>
    <p style="color:#525252;font-size:14px;margin:0 0 8px;">Alle ${r.pillars.reduce((s, p) => s + p.items.length, 0)} geprüften Säulen-Punkte im Detail:</p>
    ${r.pillars.map(renderPillarHtml).join("")}

    <div style="margin:48px 0 24px;padding:32px;background:linear-gradient(135deg,#1663DE,#0a4bb8);border-radius:24px;color:#fff;text-align:center;">
      <h2 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Bereit, deine Sichtbarkeit auf das nächste Level zu heben?</h2>
      <p style="margin:12px 0 20px;font-size:14px;opacity:0.9;line-height:1.6;">
        In einem 15-minütigen Erstgespräch zeige ich dir persönlich, wie wir deine Webseite in 90 Tagen auf Google, ChatGPT und Perplexity nach vorne bringen.
      </p>
      <a href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2" style="display:inline-block;background:#fff;color:#1663DE;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;">Erstgespräch buchen → 15 Min mit Albert</a>
    </div>

    <div style="text-align:center;color:#a3a3a3;font-size:12px;line-height:1.6;padding:24px 0;border-top:1px solid #e5e5e5;">
      Du erhältst diese Mail, weil du den KI-Sichtbarkeits-Check auf wohlstandsmarketing.de angefordert hast.<br/>
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
    result?: KiCheckResult;
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
  const { consent, result } = body;

  if (!firstName || !lastName || !email || !phone || !consent || !result) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }
  // Telefon-Mini-Validierung: mind. 5 Zeichen, erlaubte Zeichen
  if (!/^[+\d][\d\s()/-]{4,}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "invalid_phone" },
      { status: 400 },
    );
  }
  if (
    typeof result.score !== "number" ||
    !Array.isArray(result.pillars) ||
    !result.normalizedUrl
  ) {
    return NextResponse.json(
      { ok: false, error: "invalid_result" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "missing_resend_key" },
      { status: 503 },
    );
  }

  const html = renderReportHtml(result, firstName);

  // 1) Bericht an User
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
      subject: `${firstName}, dein KI-Sichtbarkeits-Bericht — Score ${result.score}/100`,
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
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `WSM Lead-Bot <${fromEmail}>`,
      to: ["info@wohlstandsmarketing.de"],
      subject: `🎯 Neuer KI-Check-Lead: ${firstName} ${lastName} (Score ${result.score})`,
      html: `
        <h2>Neuer Lead über KI-Sichtbarkeits-Check</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Telefon:</strong> <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}">${escapeHtml(phone)}</a></p>
        <hr/>
        <p><strong>Geprüfte URL:</strong> <a href="${escapeHtml(result.normalizedUrl)}">${escapeHtml(result.normalizedUrl)}</a></p>
        <p><strong>Score:</strong> ${result.score}/100 (${result.scoreLabel})</p>
        <p><strong>Stadt:</strong> ${escapeHtml(result.answers.city || "—")}</p>
        <p><strong>Hauptziel:</strong> ${escapeHtml(result.answers.goal || "—")}</p>
        <p><strong>Geprüft am:</strong> ${escapeHtml(result.fetchedAt)}</p>
      `,
    }),
  });

  // 3) Lead automatisch in Close CRM anlegen (gelabelt: Webseite + Lead Magnet).
  //    Gekapselt: Ein Close-Fehler darf den bereits versendeten Report nie blockieren.
  try {
    const sync = await syncLeadToClose({
      source: "ki-check",
      firstName,
      lastName,
      email,
      phone,
      noteLines: [
        `Score: ${result.score}/100 (${result.scoreLabel})`,
        `Geprüfte URL: ${result.normalizedUrl}`,
        result.answers.city ? `Stadt: ${result.answers.city}` : null,
        result.answers.goal ? `Hauptziel: ${result.answers.goal}` : null,
      ],
    });
    if (!sync.ok) {
      console.warn("Close-Sync fehlgeschlagen:", sync.reason);
    }
  } catch (e) {
    console.warn("Close-Sync Exception:", e);
  }

  return NextResponse.json({ ok: true });
}
