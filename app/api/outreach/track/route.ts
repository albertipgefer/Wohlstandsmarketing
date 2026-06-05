/**
 * POST /api/outreach/track?pid=<uuid> — loggt einen Klick aus der Cold-Mail
 * (UTM-Landung auf /sichtbarkeits-check?src=outreach&pid=…). Kein Link-Wrapping,
 * zustellungs-schonend. Conversion wird separat in /api/ki-check/report erfasst.
 */
import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/outreach-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const pid = req.nextUrl.searchParams.get("pid") || "";
  if (UUID.test(pid)) await logEvent(pid, "click", {});
  return NextResponse.json({ ok: true });
}
