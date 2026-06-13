/**
 * POST /api/finanzen/ki — Finanz-KI (login-geschützt). Body: { messages: [{role, content}] }
 * Antwort: { ok, reply }. Aktionen nur nach Bestätigung des Nutzers (siehe lib/finanzen/ki.ts).
 */
export const runtime = "nodejs";
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { askKi, type KiMessage } from "@/lib/finanzen/ki";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: { messages?: KiMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: KiMessage[] = raw
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))
    .slice(-12);

  if (messages.length === 0) return NextResponse.json({ ok: false, error: "keine_nachricht" }, { status: 400 });

  try {
    const reply = await askKi(messages);
    return NextResponse.json({ ok: true, reply });
  } catch {
    return NextResponse.json({ ok: true, reply: "Es gab gerade ein Problem bei der KI-Anfrage. Bitte versuch es gleich nochmal." });
  }
}
