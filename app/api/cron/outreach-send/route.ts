/**
 * GET /api/cron/outreach-send — Versand-Engine der Cold-Outreach-Sequenz.
 *
 * Läuft als Vercel-Cron (mehrmals werktags). Pro Lauf:
 *   - Sende-Fenster prüfen (Di–Do, 9–11 & 14–16), außer ?force=1
 *   - Kill-Switch: Bounce-Quote > 5 % → pausieren + Telegram
 *   - fällige Prospects holen, Postfach mit freier Tages-Kapazität rotieren
 *   - Mail 1 aus DB (individuell) bzw. Follow-up-Template (als Re:) senden
 *   - sequence_step/next_send_at fortschreiben, Event loggen
 *   - ?dryrun=1 zeigt den geplanten Versand ohne zu senden
 *
 * Auth: Authorization: Bearer ${CRON_SECRET}
 * Required ENV: CRON_SECRET, SUPABASE_URL, SUPABASE_SERVICE_KEY,
 *   OUTREACH_UNSUB_SECRET, OUTBOUND_INBOXES (JSON), TELEGRAM_* (optional)
 */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getDueProspects, updateProspect, logEvent,
  sentTodayByInbox, recentBounceRate, type Prospect,
} from "@/lib/outreach-db";
import { createUnsubToken } from "@/lib/outreach-token";
import { sendOutreachTelegram } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://wohlstandsmarketing.de";
// Abstände in Tagen NACH Versand von Schritt s (0→1, 1→2, …). Sequenz 0/3/10/24/52.
const NEXT_OFFSET_DAYS = [3, 7, 14, 28];
const KILL_BOUNCE_RATE = 0.1; // harter Stopp = Alarm-Schwelle (10 %)

type Inbox = {
  host: string; port: number; user: string; pass: string;
  fromName: string; fromEmail: string; dailyCap: number;
};

function loadInboxes(): Inbox[] {
  try {
    return JSON.parse(process.env.OUTBOUND_INBOXES || "[]");
  } catch {
    return [];
  }
}

/** Sende-Fenster Di–Do, 9–11 & 14–16 Uhr in echter Europe/Berlin-Zeit
 *  (unabhängig von der UTC-Serverzeit auf Vercel). */
function inWindow(d = new Date()): boolean {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", hour12: false,
    }).formatToParts(d).map((p) => [p.type, p.value]),
  );
  const isMidWeek = ["Tue", "Wed", "Thu"].includes(parts.weekday);
  const h = parseInt(parts.hour, 10);
  return isMidWeek && ((h >= 9 && h < 11) || (h >= 14 && h < 16));
}

function footer(email: string): string {
  let unsub = `${SITE}/api/outreach/unsubscribe`;
  try {
    unsub += `?token=${createUnsubToken(email)}`;
  } catch {
    /* Secret fehlt → Link ohne Token (Feinschliff) */
  }
  return (
    `\n\n--\nAlbert Ipgefer · Wohlstandsmarketing\n` +
    `+49 176 227 87 559 · wohlstandsmarketing.de\n\n` +
    `Wohlstandsmarketing · Vor der Loos 4e · 56130 Bad Ems · Deutschland\n` +
    `Kein Interesse? Hier abmelden: ${unsub}`
  );
}

function greeting(p: Prospect): string {
  return p.salutation ? `Hallo ${p.salutation}` : `Guten Tag`;
}

/** Follow-up-Texte (Schritt 1–4 = Mail 2–5), Link-CTA für beide Arme ab Follow-up. */
function followupBody(p: Prospect, step: number, checkLink: string): string {
  const g = greeting(p);
  const stadt = p.city || "Ihrer Region";
  const t: Record<number, string> = {
    1: `${g},\n\nkurzer Nachtrag zu meiner ChatGPT-Frage: Die drei Makler, die statt Ihnen genannt wurden, sind nicht größer als Sie. Sie sind für die KI nur besser „lesbar".\n\nWas Sie davon trennt, sehen Sie hier: ${checkLink}`,
    2: `${g},\n\ndas Überraschende: Es liegt nicht an Ihrer Bekanntheit. Ich kenne Makler mit Top-Ruf, die ChatGPT trotzdem komplett übergeht — weil ihre Seite für KI nicht lesbar ist.\n\nOb das bei Ihnen auch so ist, klärt der Check in 3 Minuten: ${checkLink}`,
    3: `${g},\n\nstellen Sie sich denselben Test in zwölf Monaten vor — dann fragen die meisten Eigentümer so nach ihrem Makler. Wer bis dahin sichtbar ist, gewinnt die Anfragen fast ohne Wettbewerb.\n\nWo Sie heute stehen: ${checkLink}`,
    4: `${g},\n\nich lasse die Sache mit dem ChatGPT-Test jetzt ruhen — letzte Mail dazu, versprochen.\n\nFalls es Sie doch interessiert, wer in ${stadt} genannt wird und wo Sie stehen: ${checkLink}\n\nIhnen weiterhin gute Abschlüsse.`,
  };
  return (t[step] || t[1]) + `\n\nBeste Grüße\nAlbert Ipgefer · Wohlstandsmarketing`;
}

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const dryrun = req.nextUrl.searchParams.get("dryrun") === "1";
  const force = req.nextUrl.searchParams.get("force") === "1";

  if (!force && !inWindow()) {
    return NextResponse.json({ ok: true, skipped: "outside_window" });
  }

  // Kill-Switch
  const bounceRate = await recentBounceRate();
  if (bounceRate > KILL_BOUNCE_RATE) {
    await sendOutreachTelegram(
      `🛑 <b>Cold-Outreach pausiert</b>\nBounce-Quote ${(bounceRate * 100).toFixed(1)} % über Limit. Versand gestoppt — bitte prüfen.`,
    );
    return NextResponse.json({ ok: false, halted: "bounce_rate", bounceRate });
  }

  const inboxes = loadInboxes();
  if (inboxes.length === 0) {
    return NextResponse.json({ ok: false, error: "no_inboxes_configured" });
  }

  const sentToday = await sentTodayByInbox();
  const capacity: Record<string, number> = {};
  for (const ib of inboxes) capacity[ib.user] = Math.max(0, ib.dailyCap - (sentToday[ib.user] || 0));

  const transporters: Record<string, nodemailer.Transporter> = {};
  const tx = (ib: Inbox) =>
    (transporters[ib.user] ??= nodemailer.createTransport({
      host: ib.host, port: ib.port, secure: ib.port === 465,
      auth: { user: ib.user, pass: ib.pass },
    }));

  const due = await getDueProspects(80);
  const results: { email: string; step: number; inbox?: string; sent: boolean }[] = [];
  const alertedInboxes = new Set<string>(); // pro Lauf max. 1 Sperr-Alarm je Postfach
  let rr = 0; // Round-Robin-Zeiger

  for (const p of due) {
    // Postfach mit freier Kapazität finden (Rotation)
    let chosen: Inbox | null = null;
    for (let k = 0; k < inboxes.length; k++) {
      const ib = inboxes[(rr + k) % inboxes.length];
      if (capacity[ib.user] > 0) { chosen = ib; rr = (rr + k + 1) % inboxes.length; break; }
    }
    if (!chosen) break; // alle Tageslimits erschöpft

    const step = p.sequence_step;
    const checkLink = `${SITE}/sichtbarkeits-check?src=outreach&pid=${p.id}`;
    const subject = step === 0
      ? p.mail1_subject || "Ihre Sichtbarkeit bei ChatGPT"
      : `Re: ${p.mail1_subject || "Ihre Sichtbarkeit bei ChatGPT"}`;
    const bodyCore = step === 0
      ? (p.mail1_body || "").replace("{{check_link}}", checkLink)
      : followupBody(p, step, checkLink);
    const text = bodyCore + footer(p.email);

    if (dryrun) {
      results.push({ email: p.email, step, inbox: chosen.user, sent: false });
      capacity[chosen.user]--;
      continue;
    }

    try {
      const info = await tx(chosen).sendMail({
        from: `"${chosen.fromName}" <${chosen.fromEmail}>`,
        to: p.email,
        subject,
        text,
        ...(step > 0 && p.thread_message_id
          ? { inReplyTo: p.thread_message_id, references: p.thread_message_id }
          : {}),
      });
      capacity[chosen.user]--;

      const nextOffset = NEXT_OFFSET_DAYS[step];
      const updates: Partial<Prospect> = {
        sequence_step: step + 1,
        last_sent_at: new Date().toISOString(),
        sent_from_inbox: chosen.user,
      };
      if (step === 0) updates.thread_message_id = info.messageId;
      if (nextOffset !== undefined) {
        updates.next_send_at = new Date(Date.now() + nextOffset * 86400000).toISOString();
      } else {
        updates.status = "exhausted";
      }
      await updateProspect(p.id, updates);
      await logEvent(p.id, "sent", { sequence_step: step, inbox: chosen.user, ab_arm: p.ab_arm });
      results.push({ email: p.email, step, inbox: chosen.user, sent: true });
    } catch (e) {
      results.push({ email: p.email, step, inbox: chosen.user, sent: false });
      console.warn("Send-Fehler", p.email, e);
      // Postfach gesperrt/blockiert? Auth-/Verbindungsfehler → einmaliger Sofort-Alarm.
      const err = e as { code?: string; responseCode?: number; message?: string };
      const isInboxDown =
        ["EAUTH", "ECONNECTION", "ESOCKET", "ETIMEDOUT", "EDNS"].includes(err.code || "") ||
        err.responseCode === 535 || err.responseCode === 534 ||
        /invalid login|authentication failed|account.*(disabled|suspended)|blocked/i.test(err.message || "");
      if (isInboxDown && !alertedInboxes.has(chosen.user)) {
        alertedInboxes.add(chosen.user);
        capacity[chosen.user] = 0; // restliche Sends in diesem Lauf auf andere Postfächer lenken
        await sendOutreachTelegram(
          `🛑 <b>Postfach blockiert — Versand gestört!</b>\n\n` +
            `📮 ${chosen.user}\n` +
            `Fehler: ${(err.message || err.code || "unbekannt").slice(0, 160)}\n\n` +
            `Über dieses Postfach geht gerade nichts raus. Bitte Sperre/App-Passwort prüfen.`,
        );
      }
    }
  }

  return NextResponse.json({
    ok: true, dryrun, bounceRate, processed: results.length, results: results.slice(0, 50),
  });
}
