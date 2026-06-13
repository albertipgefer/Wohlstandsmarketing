/**
 * Login-Session für die interne Tool-Übersicht (/tools).
 * HMAC-signiertes Cookie (Muster wie lib/angebot/auth.ts) — kein Storage.
 *
 * Ablauf: Passwort gegen TOOLS_PASSWORD → createSession() → httpOnly-Cookie.
 * Seiten/APIs prüfen mit isLoggedIn().
 *
 * Required ENV:
 *   TOOLS_PASSWORD        — das Login-Passwort
 *   TOOLS_SESSION_SECRET  — HMAC-Secret (openssl rand -hex 32);
 *                           Fallback auf TOOLS_PASSWORD, falls nicht gesetzt.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "tl_session";
const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 Tage

function secret(): string {
  return (
    process.env.TOOLS_SESSION_SECRET ||
    process.env.TOOLS_PASSWORD ||
    "tl-dev-secret"
  );
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

/** Signierten Session-Token erzeugen (Wert fürs Cookie). */
export function createSession(): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = `tl.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** Token-String prüfen (Signatur + Ablauf). */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [prefix, expStr, sig] = parts;
  if (prefix !== "tl") return false;
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

/** Passwort prüfen (gegen TOOLS_PASSWORD, timing-safe). */
export function checkPassword(pw: string): boolean {
  const expected = process.env.TOOLS_PASSWORD;
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
