/**
 * GET /api/cron/outreach-digest — KPI-Report + Postfach-Wächter (Telegram).
 *
 * Zwei Modi über ?period:
 *   - period=day  (Default) → Tagesreport (letzte 24 h), abends. Anti-Spam:
 *                  ohne Aktivität KEIN leerer Report — nur der Wächter läuft.
 *   - period=week → Wochenreport (letzte 7 Tage) inkl. A/B-Vergleich, läuft immer.
 *
 * Wächter (in beiden Modi, vor dem Report):
 *   - SMTP-Login-Test je Postfach (verify) → Sperre/Block früh erkennen → Alarm.
 *   - Bounce-Quote über Limit → Alarm (zusätzlich zum Kill-Switch im Versand-Cron).
 *
 * Auth: Authorization: Bearer ${CRON_SECRET}
 * ENV: CRON_SECRET, SUPABASE_*, TELEGRAM_* (sonst still), OUTBOUND_INBOXES (für Wächter).
 */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  statusCounts, eventCountsSince, recentBounceRate,
} from "@/lib/outreach-db";
import { sendOutreachTelegram } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WARN_BOUNCE_RATE = 0.06;
const ALERT_BOUNCE_RATE = 0.1;

type Inbox = { host: string; port: number; user: string; pass: string };

function loadInboxes(): Inbox[] {
  try {
    return JSON.parse(process.env.OUTBOUND_INBOXES || "[]");
  } catch {
    return [];
  }
}

/** SMTP-Login je Postfach prüfen. Meldet jedes nicht erreichbare Postfach sofort. */
async function guardInboxes(): Promise<number> {
  const inboxes = loadInboxes();
  let failed = 0;
  for (const ib of inboxes) {
    const tx = nodemailer.createTransport({
      host: ib.host, port: ib.port, secure: ib.port === 465,
      auth: { user: ib.user, pass: ib.pass },
      connectionTimeout: 15000, greetingTimeout: 15000,
    });
    try {
      await tx.verify();
    } catch (e) {
      failed++;
      const msg = e instanceof Error ? e.message : String(e);
      await sendOutreachTelegram(
        `🛑 <b>Postfach nicht erreichbar!</b>\n\n` +
          `📮 ${ib.user}\n` +
          `Grund: ${msg.slice(0, 160)}\n\n` +
          `Mögliche Ursache: Postfach gesperrt/blockiert, App-Passwort ungültig oder ` +
          `SMTP deaktiviert. Bitte prüfen — über dieses Postfach geht aktuell nichts raus.`,
      );
    } finally {
      tx.close();
    }
  }
  return failed;
}

function n(o: Record<string, number>, k: string): number {
  return o[k] || 0;
}

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const period = req.nextUrl.searchParams.get("period") === "week" ? "week" : "day";

  // 1) Wächter zuerst — Postfächer + Bounce-Quote
  const inboxesFailed = await guardInboxes();
  const bounceRate = await recentBounceRate();
  if (bounceRate >= ALERT_BOUNCE_RATE) {
    await sendOutreachTelegram(
      `🛑 <b>Bounce-Quote kritisch: ${(bounceRate * 100).toFixed(1)} %</b>\n` +
        `Über dem Limit (${(ALERT_BOUNCE_RATE * 100).toFixed(0)} %). Der Versand-Cron pausiert beim nächsten Lauf. Bitte Liste/Postfächer prüfen.`,
    );
  } else if (bounceRate >= WARN_BOUNCE_RATE) {
    await sendOutreachTelegram(
      `⚠️ <b>Bounce-Quote erhöht: ${(bounceRate * 100).toFixed(1)} %</b>\n` +
        `Noch unter dem Stopp-Limit (${(ALERT_BOUNCE_RATE * 100).toFixed(0)} %), aber im Auge behalten.`,
    );
  }

  // 2) Kennzahlen im Zeitfenster
  const hours = period === "week" ? 7 * 24 : 24;
  const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();
  const ev = await eventCountsSince(since);
  const status = await statusCounts();

  const sent = n(ev.byType, "sent");
  const replies = n(ev.byType, "reply");
  const conversions = n(ev.byType, "conversion");
  const bounces = n(ev.byType, "bounce");
  const unsubs = n(ev.byType, "unsubscribe");
  const clicks = n(ev.byType, "click");

  // Anti-Spam: Tagesreport ohne jede Aktivität nicht senden (Wächter ist trotzdem gelaufen)
  if (period === "day" && ev.total === 0) {
    return NextResponse.json({
      ok: true, period, skipped: "no_activity", inboxesFailed, bounceRate,
    });
  }

  const label = period === "week" ? "Wochenreport (letzte 7 Tage)" : "Tagesreport (letzte 24 h)";
  const bounceFlag = bounceRate >= ALERT_BOUNCE_RATE ? "🛑" : bounceRate >= WARN_BOUNCE_RATE ? "⚠️" : "✅";

  const lines: string[] = [
    `📊 <b>Cold-Outreach — ${label}</b>`,
    ``,
    `✉️ Versendet: <b>${sent}</b>` + (clicks ? ` · 🔗 Klicks: ${clicks}` : ""),
    `↩️ Antworten: <b>${replies}</b> · 🔥 Conversions (KI-Check): <b>${conversions}</b>`,
    `📉 Bounces: ${bounces} · 🚫 Abmeldungen: ${unsubs}`,
    ``,
    `📂 <b>Bestand:</b> ${n(status, "active")} aktiv · ${n(status, "converted")} konvertiert · ` +
      `${n(status, "replied")} geantwortet · ${n(status, "bounced")} bounced · ` +
      `${n(status, "unsubscribed")} abgemeldet · ${n(status, "exhausted")} ausgereizt`,
    `${bounceFlag} Bounce-Quote (Stichprobe): ${(bounceRate * 100).toFixed(1)} %`,
  ];

  if (period === "week") {
    const arm = (a: "link" | "reply", k: string) => n(ev.byArm[a] || {}, k);
    lines.push(
      ``,
      `🆎 <b>A/B-Vergleich</b> (Versand · Antwort · Conversion):`,
      `  🔗 Link:  ${arm("link", "sent")} · ${arm("link", "reply")} · ${arm("link", "conversion")}`,
      `  💬 Reply: ${arm("reply", "sent")} · ${arm("reply", "reply")} · ${arm("reply", "conversion")}`,
    );
  }

  if (inboxesFailed > 0) {
    lines.push(``, `🛑 ${inboxesFailed} Postfach/Postfächer aktuell nicht erreichbar (separater Alarm oben).`);
  }

  await sendOutreachTelegram(lines.join("\n"));

  return NextResponse.json({
    ok: true, period, sent, replies, conversions, bounces, unsubs,
    bounceRate, inboxesFailed,
  });
}
