/**
 * GET /api/cron/weekly-briefing
 *
 * Wöchentliches Co-Pilot-Briefing als Telegram-Digest. Aggregiert die letzten
 * 7 Tage aus drei Quellen und schickt Albert eine kompakte Nachricht:
 *   - Close:  neue Leads, davon HOT (= "Sofort anrufen"-Tasks), Aufschlüsselung nach Formular
 *   - Resend: neue Newsletter-Kontakte + wie viele aktuell in der Drip-Sequenz sind
 *   - GSC:    Klicks/Impressionen (+ Vorwochenvergleich), Top-Suchanfragen, Top-Seiten, indexierte Seiten
 *
 * Schedule: Montag ~08:00 deutscher Zeit (siehe vercel.json, 06:00 UTC ≈ 08:00 CEST).
 * Auth: Header `Authorization: Bearer ${CRON_SECRET}` (von Vercel-Cron gesetzt).
 *
 * Manuell testbar: ?dryrun=1 (baut den Digest, sendet aber NICHT).
 *
 * Required ENV: CRON_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * Optional ENV: CLOSE_API_KEY, RESEND_API_KEY, RESEND_AUDIENCE_ID, GSC_* (siehe lib/gsc.ts)
 */
import { sendTelegramMessage } from "@/lib/telegram";
import { getGscSummary } from "@/lib/gsc";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CLOSE_BASE = "https://api.close.com/api/v1";
// Custom Field "Website-Formular" (siehe lib/close.ts) — für die Quellen-Aufschlüsselung.
const CF_WEBSITE_FORMULAR = "cf_SiThXrPoJTtQcagNHJgpYYLfede46t7lctVbsNaKR2y";

const WINDOW_DAYS = 7;

function nf(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}

function closeAuth(apiKey: string): string {
  return "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
}

/* ─── Close: neue Leads (letzte 7 Tage) + Aufschlüsselung nach Formular ───
 * Hinweis: Close honoriert `_order_by=-date_created` auf /lead/ NICHT zuverlässig
 * (Reihenfolge gemischt). Darum filtern wir per Such-Query nach Erstelldatum. */
async function getCloseLeadStats(
  apiKey: string,
  sinceMs: number,
): Promise<{ total: number; bySource: Record<string, number> }> {
  const sinceDate = new Date(sinceMs).toISOString().slice(0, 10); // YYYY-MM-DD
  const query = encodeURIComponent(`date_created >= "${sinceDate}"`);
  const bySource: Record<string, number> = {};
  let total = 0;
  for (let skip = 0; skip < 1000; skip += 100) {
    const r = await fetch(
      `${CLOSE_BASE}/lead/?query=${query}&_limit=100&_skip=${skip}`,
      { headers: { Authorization: closeAuth(apiKey) } },
    );
    if (!r.ok) break;
    const data = (await r.json()) as {
      data?: Array<Record<string, unknown>>;
      has_more?: boolean;
    };
    const leads = data.data ?? [];
    for (const lead of leads) {
      total += 1; // Query filtert bereits aufs Fenster → alle zählen
      const formular = lead[`custom.${CF_WEBSITE_FORMULAR}`];
      const values = Array.isArray(formular)
        ? (formular as string[])
        : typeof formular === "string" && formular
          ? [formular]
          : ["(ohne Formular)"];
      for (const v of values) bySource[v] = (bySource[v] || 0) + 1;
    }
    if (!data.has_more || leads.length === 0) break;
  }
  return { total, bySource };
}

/* ─── Close: HOT-Leads = "HOT-Lead — sofort anrufen"-Tasks der letzten 7 Tage ─── */
async function getHotTaskCount(apiKey: string, sinceMs: number): Promise<number> {
  const sinceIso = new Date(sinceMs).toISOString();
  let count = 0;
  for (let skip = 0; skip < 1000; skip += 100) {
    const r = await fetch(
      `${CLOSE_BASE}/task/?_type=lead&date_created__gt=${encodeURIComponent(sinceIso)}&_limit=100&_skip=${skip}`,
      { headers: { Authorization: closeAuth(apiKey) } },
    );
    if (!r.ok) break;
    const data = (await r.json()) as {
      data?: Array<Record<string, unknown>>;
      has_more?: boolean;
    };
    const tasks = data.data ?? [];
    for (const t of tasks) {
      if (String(t.text || "").toLowerCase().includes("hot-lead")) count += 1;
    }
    if (!data.has_more || tasks.length === 0) break;
  }
  return count;
}

/* ─── Resend: neue Kontakte + aktuell in der Drip-Sequenz (Tag 0–14) ─── */
async function getResendStats(
  apiKey: string,
  audienceId: string,
  sinceMs: number,
): Promise<{ total: number; newContacts: number; inSequence: number } | null> {
  const r = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  if (!r.ok) return null;
  const data = (await r.json()) as {
    data?: Array<{ created_at?: string; unsubscribed?: boolean }>;
  };
  const contacts = data.data ?? [];
  const now = Date.now();
  let newContacts = 0;
  let inSequence = 0;
  for (const c of contacts) {
    if (c.unsubscribed) continue;
    const created = c.created_at ? new Date(c.created_at).getTime() : NaN;
    if (Number.isNaN(created)) continue;
    if (created >= sinceMs) newContacts += 1;
    const elapsedDays = Math.floor((now - created) / 86_400_000);
    if (elapsedDays >= 0 && elapsedDays <= 14) inSequence += 1;
  }
  return { total: contacts.length, newContacts, inSequence };
}

/* ─── Digest bauen ─────────────────────────────────────────────────── */
function shortenPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch {
    return url;
  }
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const dryrun = new URL(req.url).searchParams.get("dryrun") === "1";
  const sinceMs = Date.now() - WINDOW_DAYS * 86_400_000;

  const sections: string[] = [];

  // 1) Close
  const closeKey = process.env.CLOSE_API_KEY;
  if (closeKey) {
    try {
      const [leads, hot] = await Promise.all([
        getCloseLeadStats(closeKey, sinceMs),
        getHotTaskCount(closeKey, sinceMs),
      ]);
      const lines = [`💼 <b>Leads</b> (7 Tage)`, `• Neu gesamt: <b>${nf(leads.total)}</b>`];
      if (hot > 0) lines.push(`• Davon 🔥 HOT: <b>${nf(hot)}</b>`);
      const sources = Object.entries(leads.bySource).sort((a, b) => b[1] - a[1]);
      for (const [name, n] of sources) lines.push(`   · ${name}: ${nf(n)}`);
      sections.push(lines.join("\n"));
    } catch {
      sections.push(`💼 <b>Leads</b>: Daten konnten nicht geladen werden.`);
    }
  }

  // 2) Resend
  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (resendKey && audienceId) {
    try {
      const r = await getResendStats(resendKey, audienceId, sinceMs);
      if (r) {
        sections.push(
          [
            `📧 <b>Newsletter / Drip</b> (7 Tage)`,
            `• Neue Kontakte: <b>${nf(r.newContacts)}</b>`,
            `• Aktuell in Drip-Sequenz: <b>${nf(r.inSequence)}</b>`,
            `• Kontakte gesamt: ${nf(r.total)}`,
          ].join("\n"),
        );
      }
    } catch {
      /* Resend optional */
    }
  }

  // 3) GSC (nur wenn konfiguriert)
  const gsc = await getGscSummary();
  if (gsc) {
    const delta = gsc.clicks - gsc.prevClicks;
    const trend = delta > 0 ? `▲ +${nf(delta)}` : delta < 0 ? `▼ ${nf(delta)}` : "±0";
    const lines = [
      `🔍 <b>SEO / Google</b> (7 Tage)`,
      `• Klicks: <b>${nf(gsc.clicks)}</b> (${trend} vs. Vorwoche)`,
      `• Impressionen: <b>${nf(gsc.impressions)}</b>`,
    ];
    if (gsc.indexedPages != null) {
      lines.push(`• Indexierte Seiten: <b>${nf(gsc.indexedPages)}</b>`);
    }
    if (gsc.topQueries.length) {
      lines.push(`• Top-Suchanfragen:`);
      for (const q of gsc.topQueries.slice(0, 3)) {
        lines.push(`   · ${q.query} (${nf(q.clicks)})`);
      }
    }
    if (gsc.topPages.length) {
      lines.push(`• Top-Seiten:`);
      for (const p of gsc.topPages.slice(0, 3)) {
        lines.push(`   · ${shortenPath(p.page)} (${nf(p.clicks)})`);
      }
    }
    sections.push(lines.join("\n"));
  }

  if (sections.length === 0) {
    sections.push("Keine Datenquellen konfiguriert.");
  }

  const text =
    `📊 <b>Wochen-Briefing</b> — Wohlstandsmarketing\n` +
    `<i>Rückblick der letzten 7 Tage</i>\n\n` +
    sections.join("\n\n") +
    `\n\n➡️ <a href="https://app.close.com/">Close öffnen</a>`;

  if (dryrun) {
    return Response.json({ ok: true, mode: "dryrun", text });
  }

  const sent = await sendTelegramMessage(text);
  return Response.json({ ok: sent, mode: "sent", sectionsCount: sections.length });
}
