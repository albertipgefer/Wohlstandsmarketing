/**
 * GET /api/cron/traffic-alert — täglicher Wächter für Traffic-Einbrüche.
 *
 * Vergleicht die gestrigen Seitenaufrufe (PostHog, live) mit dem Tages-
 * durchschnitt der 7 Tage davor. Bricht der Traffic stark ein (< 50 % des
 * Schnitts, erst ab sinnvoller Basis), gibt es eine Telegram-Sofortmeldung —
 * sonst bleibt es still (Anti-Spam).
 *
 * Schedule: täglich ~08:00 UTC (siehe vercel.json). Versand über den Haupt-Bot.
 * Auth: Header `Authorization: Bearer ${CRON_SECRET}`. Test: ?dryrun=1.
 *
 * Required ENV: CRON_SECRET, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, POSTHOG_*.
 */
import { sendTelegramMessage } from "@/lib/telegram";
import { getDailyTrafficCheck } from "@/lib/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const DROP_THRESHOLD = 0.5; // Alarm, wenn gestern < 50 % des Schnitts
const MIN_BASE = 10; // erst ab sinnvoller Traffic-Basis alarmieren

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }
  const dryrun = new URL(req.url).searchParams.get("dryrun") === "1";

  const data = await getDailyTrafficCheck();
  if (!data) {
    return Response.json({ ok: false, reason: "posthog_not_configured" });
  }
  const { yesterday, avg7 } = data;
  const alert = avg7 >= MIN_BASE && yesterday < avg7 * DROP_THRESHOLD;

  if (dryrun) {
    return Response.json({
      ok: true,
      mode: "dryrun",
      yesterday,
      avg7: Math.round(avg7 * 10) / 10,
      wouldAlert: alert,
    });
  }

  if (!alert) {
    return Response.json({ ok: true, alert: false }); // still — kein Spam
  }

  const pctDown = Math.round((1 - yesterday / avg7) * 100);
  const text =
    `⚠️ <b>Traffic-Einbruch erkannt</b>\n\n` +
    `Gestern nur <b>${yesterday}</b> Seitenaufrufe — ${pctDown} % unter dem ` +
    `7-Tage-Schnitt (${Math.round(avg7)}/Tag).\n\n` +
    `➡️ <a href="https://wohlstandsmarketing.de/analytics">Dashboard öffnen</a>`;
  const sent = await sendTelegramMessage(text);
  return Response.json({ ok: true, alert: true, sent });
}
