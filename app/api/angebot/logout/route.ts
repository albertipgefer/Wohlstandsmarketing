/**
 * POST /api/angebot/logout — Session-Cookie löschen.
 */
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/angebot/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
