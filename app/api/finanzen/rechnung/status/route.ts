/**
 * POST /api/finanzen/rechnung/status — Status einer Rechnung setzen (login-geschützt).
 * Body: { id, status }  status ∈ offen | bezahlt | ueberfaellig | storniert
 * Bei 'bezahlt' wird bezahlt_am gesetzt (bzw. bei Wechsel weg von 'bezahlt' geleert).
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getRechnungById, updateRechnung, dbReady, type RechnungStatus } from "@/lib/finanzen/db";

const ERLAUBT: RechnungStatus[] = ["offen", "bezahlt", "ueberfaellig", "storniert"];

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string; status?: RechnungStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  if (!body.status || !ERLAUBT.includes(body.status))
    return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 400 });

  const r = await getRechnungById(body.id);
  if (!r) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  const updated = await updateRechnung(r.id, {
    status: body.status,
    bezahlt_am: body.status === "bezahlt" ? new Date().toISOString() : null,
    // Bei "Bezahlt" die Mahnstufe entfernen (Status soll dann sauber sein).
    ...(body.status === "bezahlt" ? { mahnstufe: 0, last_mahnung_at: null } : {}),
  });
  if (!updated) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
