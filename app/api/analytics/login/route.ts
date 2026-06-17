/**
 * POST /api/traffic/login — Passwort prüfen, Session-Cookie setzen.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSession, SESSION_COOKIE } from "@/lib/traffic/auth";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!checkPassword((body.password || "").trim())) {
    return NextResponse.json({ ok: false, error: "wrong_password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}
