/**
 * HMAC-signierte Abmelde-Tokens für Cold-Outreach (kein Storage nötig).
 * Payload: { email, exp }. Encoding: base64url(JSON).base64url(HMAC-SHA256).
 *
 * Required ENV: OUTREACH_UNSUB_SECRET  (openssl rand -hex 32)
 */
import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_SECONDS = 365 * 24 * 60 * 60; // 1 Jahr — Abmeldelinks dürfen lange gelten

function b64u(buf: Buffer): string {
  return buf.toString("base64url");
}
function sign(data: string, secret: string): string {
  return b64u(createHmac("sha256", secret).update(data).digest());
}

export function createUnsubToken(email: string): string {
  const secret = process.env.OUTREACH_UNSUB_SECRET;
  if (!secret) throw new Error("OUTREACH_UNSUB_SECRET not configured");
  const payload = b64u(
    Buffer.from(
      JSON.stringify({
        email: email.toLowerCase().trim(),
        exp: Math.floor(Date.now() / 1000) + TTL_SECONDS,
      }),
      "utf-8",
    ),
  );
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyUnsubToken(token: string): string | null {
  const secret = process.env.OUTREACH_UNSUB_SECRET;
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = sign(payload, secret);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (typeof pl.exp !== "number" || pl.exp < Math.floor(Date.now() / 1000)) return null;
    return typeof pl.email === "string" ? pl.email : null;
  } catch {
    return null;
  }
}
