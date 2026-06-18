/**
 * GET /api/cron/analytics-report — Wöchentlicher Analytics-Report als Telegram-Nachricht.
 *
 * Aggregiert die letzten 7 Tage und schickt Albert eine kompakte Übersicht:
 *   - Google-Suche (GSC): Klicks/Impressionen (+ Vorwoche), Ø-Position,
 *     Top-Suchanfragen, Top-Keyword-Chancen
 *   - Live & Verhalten (PostHog): Besucher/Seitenaufrufe (+ Vorwoche), Conversions
 *
 * Schedule: Montag ~07:00 UTC (siehe vercel.json). Versand über den Haupt-Bot.
 * Auth: Header `Authorization: Bearer ${CRON_SECRET}` (von Vercel-Cron gesetzt).
 * Manuell testbar: ?dryrun=1 (baut die Nachricht, sendet aber NICHT).
 *
 * Required ENV: CRON_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID; GSC_* / POSTHOG_*.
 */
import { sendTelegramMessage } from "@/lib/telegram";
import { getGscDashboard } from "@/lib/gsc";
import { getPosthogDashboard } from "@/lib/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function nf(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}
function dec(n: number): string {
  return n.toFixed(1).replace(".", ",");
}
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/** Veränderung gegenüber Vorperiode als Pfeil-Suffix. */
function arrow(cur: number, prev: number): string {
  if (!prev) return "";
  const d = Math.round(((cur - prev) / prev) * 100);
  if (d === 0) return " (±0 %)";
  return d > 0 ? ` (▲ ${d} %)` : ` (▼ ${Math.abs(d)} %)`;
}

const EVENT_LABEL: Record<string, string> = {
  erstgespraech_geklickt: "Erstgespräch geklickt",
  kontaktformular_gesendet: "Kontaktformular",
  ki_check_gestartet: "KI-Check gestartet",
  ki_check_abgeschlossen: "KI-Check abgeschlossen",
  lead_magnet_download: "PDF-Download",
  anruf_klick: "Anruf-Klick",
  email_klick: "E-Mail-Klick",
  preise_konfiguriert: "Preise konfiguriert",
};

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }
  const dryrun = new URL(req.url).searchParams.get("dryrun") === "1";

  const [gsc, ph] = await Promise.all([
    getGscDashboard(7),
    getPosthogDashboard(7),
  ]);

  const lines: string[] = [
    "📊 <b>WSM Analytics — Wochenrückblick (7 Tage)</b>",
    "",
  ];

  // Google-Suche
  if (gsc) {
    lines.push("<b>🔍 Google-Suche</b>");
    lines.push(
      `• Klicks: ${nf(gsc.current.clicks)}${arrow(gsc.current.clicks, gsc.previous.clicks)}`,
    );
    lines.push(
      `• Impressionen: ${nf(gsc.current.impressions)}${arrow(gsc.current.impressions, gsc.previous.impressions)}`,
    );
    lines.push(`• Ø-Position: ${dec(gsc.current.position)}`);
    if (gsc.topQueries.length) {
      lines.push("", "<b>Top-Suchanfragen</b>");
      gsc.topQueries
        .slice(0, 5)
        .forEach((q) => lines.push(`• ${esc(q.key)} — ${nf(q.clicks)} Klicks`));
    }
    if (gsc.opportunities.length) {
      lines.push("", "<b>Keyword-Chancen (Pos. 4–20)</b>");
      gsc.opportunities
        .slice(0, 5)
        .forEach((o) =>
          lines.push(`• ${esc(o.key)} — Pos ${dec(o.position)}, +${nf(o.potential)} Potenzial`),
        );
    }
  } else {
    lines.push("<i>🔍 Google-Suche: keine Daten verfügbar.</i>");
  }

  lines.push("");

  // Live & Verhalten
  if (ph) {
    lines.push("<b>📡 Live &amp; Verhalten</b>");
    lines.push(
      `• Besucher: ${nf(ph.visitors)}${arrow(ph.visitors, ph.prevVisitors)}`,
    );
    lines.push(
      `• Seitenaufrufe: ${nf(ph.pageviews)}${arrow(ph.pageviews, ph.prevPageviews)}`,
    );
    const conv = ph.conversions.filter((c) => c.count > 0);
    if (conv.length) {
      lines.push("", "<b>Conversions</b>");
      conv
        .slice(0, 8)
        .forEach((c) =>
          lines.push(`• ${EVENT_LABEL[c.event] || esc(c.event)}: ${nf(c.count)}`),
        );
    } else {
      lines.push("• noch keine Conversions im Zeitraum");
    }
  } else {
    lines.push("<i>📡 Live &amp; Verhalten: noch nicht verbunden.</i>");
  }

  lines.push(
    "",
    `➡️ <a href="https://wohlstandsmarketing.de/analytics">Volles Dashboard öffnen</a>`,
  );

  const text = lines.join("\n");

  if (dryrun) {
    return Response.json({ ok: true, mode: "dryrun", text });
  }

  const sent = await sendTelegramMessage(text);
  return Response.json({ ok: true, sent });
}
