/**
 * HMAC-signierte Tokens für den Lead-Magnet-Double-Opt-In.
 *
 * Payload: { email, firstName, newsletter, exp (unix-seconds) }
 * Encoding: base64url(JSON) + "." + base64url(HMAC-SHA256(JSON, secret))
 *
 * Kein Storage nötig — alles im Token. Server validiert Signatur + Ablauf.
 * Token-Lifetime: 7 Tage (Sicherheits-Standard).
 *
 * Required ENV:
 *   LEAD_MAGNET_SECRET — beliebige Hex-Zeichenkette, generieren mit:
 *                        `openssl rand -hex 32`
 */

import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 Tage

export interface LeadMagnetPayload {
  email: string;
  firstName: string;
  /** Hat der User den Newsletter-Opt-In angekreuzt? */
  newsletter: boolean;
  /** Unix-Sekunden Ablauf */
  exp: number;
}

function b64UrlEncode(buf: Buffer): string {
  return buf.toString("base64url");
}

function b64UrlDecode(str: string): Buffer {
  return Buffer.from(str, "base64url");
}

function sign(data: string, secret: string): string {
  return b64UrlEncode(createHmac("sha256", secret).update(data).digest());
}

export function createToken(input: {
  email: string;
  firstName: string;
  newsletter: boolean;
}): string {
  const secret = process.env.LEAD_MAGNET_SECRET;
  if (!secret) throw new Error("LEAD_MAGNET_SECRET not configured");

  const payload: LeadMagnetPayload = {
    email: input.email.toLowerCase().trim(),
    firstName: input.firstName.trim().slice(0, 80),
    newsletter: !!input.newsletter,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  const payloadStr = b64UrlEncode(Buffer.from(JSON.stringify(payload), "utf-8"));
  const sig = sign(payloadStr, secret);
  return `${payloadStr}.${sig}`;
}

export function verifyToken(token: string): LeadMagnetPayload | null {
  const secret = process.env.LEAD_MAGNET_SECRET;
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadStr, sig] = parts;

  const expected = sign(payloadStr, secret);
  let validSig = false;
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    validSig = a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return null;
  }
  if (!validSig) return null;

  let payload: LeadMagnetPayload;
  try {
    payload = JSON.parse(b64UrlDecode(payloadStr).toString("utf-8"));
  } catch {
    return null;
  }
  if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  if (!payload.email || typeof payload.email !== "string") return null;
  return payload;
}
