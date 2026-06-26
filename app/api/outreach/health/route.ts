/**
 * GET /api/outreach/health — unabhängiger Lebenspuls des Cold-Outreach-Versands.
 *
 * Hängt BEWUSST NICHT am CRON_SECRET (das war die Bruchstelle, die den Ausfall
 * verschwiegen hat). Liefert nur Metadaten (keine PII). Ein externer Wächter
 * (launchd auf dem Mac) ruft diese Route auf und schlägt Alarm, wenn an einem
 * Werktag im Sende-Fenster nichts rausging.
 */
import { NextResponse } from "next/server";
import { sentTodayByInbox, recentBounceRate } from "@/lib/outreach-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const byInbox = await sentTodayByInbox();
  const sentToday = Object.values(byInbox).reduce((a, b) => a + b, 0);
  const bounceRate = await recentBounceRate();

  // letzten Sende-Zeitpunkt holen (best effort)
  let lastSentAt: string | null = null;
  try {
    const r = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/outreach_events?select=created_at&type=eq.sent&order=created_at.desc&limit=1`,
      { headers: { apikey: process.env.SUPABASE_SERVICE_KEY || "", Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY || ""}` } },
    );
    if (r.ok) lastSentAt = ((await r.json()) as { created_at: string }[])[0]?.created_at ?? null;
  } catch {
    /* egal */
  }

  return NextResponse.json({
    ok: true,
    sendEnabled: process.env.OUTREACH_SEND_ENABLED === "1",
    sentToday,
    byInbox,
    lastSentAt,
    bounceRate: Number(bounceRate.toFixed(4)),
  });
}
