/**
 * POST /api/angebot/login/verify — zweiter 2FA-Schritt.
 * Prüft den per Telegram gesendeten Einmal-Code gegen das Challenge-Cookie.
 * Erfolg → Session-Cookie setzen, Challenge löschen.
 * Body: { code }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  SESSION_COOKIE,
  TWOFA_COOKIE,
  verify2faChallenge,
} from "@/lib/angebot/auth";

export async function POST(req: NextRequest) {
  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const token = req.cookies.get(TWOFA_COOKIE)?.value;
  const result = verify2faChallenge(token, (body.code || "").trim());

  if (result.ok) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, createSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    res.cookies.delete(TWOFA_COOKIE);
    return res;
  }

  if (result.expired || result.tooMany) {
    const res = NextResponse.json(
      { ok: false, error: result.tooMany ? "too_many" : "expired" },
      { status: 401 },
    );
    res.cookies.delete(TWOFA_COOKIE);
    return res;
  }

  // Falscher Code, aber Challenge noch gültig → Versuchszähler im Cookie erhöhen.
  const res = NextResponse.json({ ok: false, error: "wrong_code" }, { status: 401 });
  if (result.refreshed) {
    res.cookies.set(TWOFA_COOKIE, result.refreshed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 5 * 60,
    });
  }
  return res;
}
