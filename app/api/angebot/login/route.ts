/**
 * POST /api/angebot/login — Passwort prüfen.
 * - Ohne 2FA: Session-Cookie direkt setzen.
 * - Mit 2FA (ANGEBOT_2FA=on): Einmal-Code an Telegram senden, kurzlebiges
 *   Challenge-Cookie setzen, { ok:false, twofa:true } zurückgeben. Der zweite
 *   Schritt läuft über /api/angebot/login/verify.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  checkPassword,
  createSession,
  SESSION_COOKIE,
  TWOFA_COOKIE,
  twofaEnabled,
  generate2faCode,
  create2faChallenge,
} from "@/lib/angebot/auth";
import { sendFinanzenTelegram } from "@/lib/telegram";

function setSession(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
}

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

  // Passwort korrekt — ohne 2FA direkt einloggen.
  if (!twofaEnabled()) {
    const res = NextResponse.json({ ok: true });
    setSession(res);
    return res;
  }

  // 2FA aktiv: Code erzeugen, per Telegram senden, Challenge-Cookie setzen.
  const code = generate2faCode();
  const sent = await sendFinanzenTelegram(
    `🔐 <b>Login-Code Finanzen</b>\n<code>${code}</code>\nGültig 5 Minuten.\n` +
      `Wenn du das gerade NICHT warst, hat jemand dein Passwort — bitte sofort ändern.`,
  );
  if (!sent) {
    // Telegram nicht erreichbar → kein 2FA-Login möglich; ehrlicher Fehler statt Aussperren ohne Hinweis.
    return NextResponse.json({ ok: false, error: "twofa_send_failed" }, { status: 500 });
  }
  const res = NextResponse.json({ ok: false, twofa: true });
  res.cookies.set(TWOFA_COOKIE, create2faChallenge(code), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 5 * 60,
  });
  return res;
}
