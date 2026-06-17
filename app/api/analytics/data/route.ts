/**
 * GET /api/traffic/data?range=7|28|90 — Google-Search-Console-Daten fürs Dashboard.
 * Auth via Session-Cookie (isLoggedIn). Liefert getGscDashboard().
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/traffic/auth";
import { getGscDashboard } from "@/lib/gsc";

export async function GET(req: NextRequest) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const rangeParam = Number(req.nextUrl.searchParams.get("range")) || 28;
  const data = await getGscDashboard(rangeParam);
  if (!data) {
    return NextResponse.json(
      { ok: false, error: "gsc_not_configured" },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true, data });
}
