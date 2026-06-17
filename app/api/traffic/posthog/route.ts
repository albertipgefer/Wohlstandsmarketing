/**
 * GET /api/traffic/posthog?range=7|28|90 — Live-/Verhaltensdaten aus PostHog.
 * Auth via Session-Cookie (isLoggedIn). Liefert getPosthogDashboard().
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/traffic/auth";
import { getPosthogDashboard } from "@/lib/posthog";

export async function GET(req: NextRequest) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const range = Number(req.nextUrl.searchParams.get("range")) || 28;
  const data = await getPosthogDashboard(range);
  if (!data) {
    return NextResponse.json(
      { ok: false, error: "posthog_not_configured" },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true, data });
}
