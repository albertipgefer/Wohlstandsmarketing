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
 *   ANGEBOT_2FA=on          — optional: Zwei-Faktor-Login per Telegram-Code
 *                             aktivieren (Standard aus → nur Passwort).
 */
import { createHmac, timingSafeEqual, randomInt } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ag_session";
export const TWOFA_COOKIE = "ag_2fa";
const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 Tage
const TWOFA_TTL = 5 * 60; // 5 Minuten
const TWOFA_MAX_ATTEMPTS = 6;

function secret(): string {
  const s = process.env.ANGEBOT_SESSION_SECRET || process.env.ANGEBOT_PASSWORD;
  if (s) return s;
  // In Produktion niemals auf ein im Code stehendes Dev-Secret zurückfallen
  // (sonst könnte jeder gültige Session-/2FA-Tokens fälschen).
  if (process.env.NODE_ENV === "production") {
    throw new Error("ANGEBOT_SESSION_SECRET oder ANGEBOT_PASSWORD muss in Produktion gesetzt sein.");
  }
  return "ag-dev-secret";
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

// ───────────────────────── Zwei-Faktor (Telegram) ─────────────────────────
// Opt-in via ANGEBOT_2FA=on. Stateless: der Code wird NIE gespeichert, nur sein
// HMAC im kurzlebigen httpOnly-Cookie. Versuchszähler steckt signiert im Cookie.

/** Ist Telegram-2FA aktiviert? */
export function twofaEnabled(): boolean {
  return process.env.ANGEBOT_2FA === "on";
}

/** 8-stelligen Einmal-Code erzeugen (kryptografisch zufällig). */
export function generate2faCode(): string {
  return String(randomInt(0, 100_000_000)).padStart(8, "0");
}

function safeEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    return ba.length === bb.length && timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

/**
 * Challenge-Cookie-Wert für einen frisch erzeugten Code erstellen.
 * Format: `${exp}.${attempts}.${codeSig}.${tokenSig}` — alles signiert, der
 * Klartext-Code ist daraus NICHT rekonstruierbar.
 */
export function create2faChallenge(code: string): string {
  const exp = Math.floor(Date.now() / 1000) + TWOFA_TTL;
  return packChallenge(exp, 0, sign(`code:${exp}:${code}`));
}

function packChallenge(exp: number, attempts: number, codeSig: string): string {
  const payload = `${exp}.${attempts}.${codeSig}`;
  return `${payload}.${sign(payload)}`;
}

export type TwofaResult = {
  ok: boolean;
  expired?: boolean;
  tooMany?: boolean;
  /** Bei Fehlversuch: neuer Cookie-Wert mit erhöhtem Versuchszähler. */
  refreshed?: string;
};

/** Eingegebenen Code gegen das Challenge-Cookie prüfen (timing-safe). */
export function verify2faChallenge(token: string | undefined, code: string): TwofaResult {
  if (!token) return { ok: false, expired: true };
  const parts = token.split(".");
  if (parts.length !== 4) return { ok: false, expired: true };
  const [expStr, attemptsStr, codeSig, tokenSig] = parts;
  if (!safeEqual(tokenSig, sign(`${expStr}.${attemptsStr}.${codeSig}`))) {
    return { ok: false, expired: true };
  }
  const exp = parseInt(expStr, 10);
  if (!exp || exp < Math.floor(Date.now() / 1000)) return { ok: false, expired: true };
  const attempts = parseInt(attemptsStr, 10) || 0;
  if (attempts >= TWOFA_MAX_ATTEMPTS) return { ok: false, tooMany: true };

  if (safeEqual(codeSig, sign(`code:${exp}:${(code || "").trim()}`))) {
    return { ok: true };
  }
  return { ok: false, refreshed: packChallenge(exp, attempts + 1, codeSig) };
}
