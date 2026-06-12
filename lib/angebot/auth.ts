/**
 * Login-Session für den internen Angebots-Generator (/angebot).
 * HMAC-signiertes Cookie (Muster wie lib/lead-magnet-token.ts) — kein Storage.
 *
 * Ablauf: Passwort gegen ANGEBOT_PASSWORD → createSession() → httpOnly-Cookie.
 * Seiten/APIs prüfen mit verifySession().
 *
 * Required ENV:
 *   ANGEBOT_PASSWORD        — das Login-Passwort
 *   ANGEBOT_SESSION_SECRET  — HMAC-Secret (openssl rand -hex 32);
 *                             Fallback auf ANGEBOT_PASSWORD, falls nicht gesetzt.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ag_session";
const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 Tage

function secret(): string {
  return (
    process.env.ANGEBOT_SESSION_SECRET ||
    process.env.ANGEBOT_PASSWORD ||
    "ag-dev-secret"
  );
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

/** Signierten Session-Token erzeugen (Wert fürs Cookie). */
export function createSession(): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = `ag.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** Token-String prüfen (Signatur + Ablauf). */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [prefix, expStr, sig] = parts;
  if (prefix !== "ag") return false;
  const payload = `${prefix}.${expStr}`;
  const expected = sign(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const exp = parseInt(expStr, 10);
  if (!exp || exp < Math.floor(Date.now() / 1000)) return false;
  return true;
}

/** Passwort prüfen (gegen ANGEBOT_PASSWORD, timing-safe). */
export function checkPassword(pw: string): boolean {
  const expected = process.env.ANGEBOT_PASSWORD;
  if (!expected || !pw) return false;
  try {
    const a = Buffer.from(pw);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Server-seitig: ist die aktuelle Anfrage eingeloggt? (liest das Cookie) */
export async function isLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
