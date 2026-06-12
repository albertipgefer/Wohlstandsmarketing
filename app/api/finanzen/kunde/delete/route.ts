/**
 * POST /api/finanzen/kunde/delete — Kunde löschen (login-geschützt).
 * Entfernt nur den Stammdatensatz; vorhandene Angebote/Rechnungen bleiben erhalten.
 * Body: { id }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { deleteKunde, dbReady } from "@/lib/finanzen/kunden";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });

  const ok = await deleteKunde(body.id);
  if (!ok) return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
