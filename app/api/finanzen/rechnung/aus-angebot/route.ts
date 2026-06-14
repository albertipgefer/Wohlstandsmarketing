/**
 * POST /api/finanzen/rechnung/aus-angebot — aus einem Angebot manuell einen
 * Rechnungs-Entwurf erzeugen (login-geschützt). Verhindert Doppel-Erzeugung.
 * Body: { angebotId }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getAngebotById } from "@/lib/angebot/db";
import {
  getRechnungByAngebotId,
  insertRechnung,
  rechnungFromAngebot,
  dbReady,
} from "@/lib/finanzen/db";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { angebotId?: string; abschlagProzent?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body.angebotId) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });

  const a = await getAngebotById(body.angebotId);
  if (!a) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  const prozent = Number(body.abschlagProzent);
  const istAbschlag = prozent > 0 && prozent < 100;

  // Doppel-Erzeugung nur bei der Voll-Rechnung verhindern; Abschlagsrechnungen
  // dürfen mehrfach existieren (z. B. mehrere Teilbeträge).
  if (!istAbschlag) {
    const existing = await getRechnungByAngebotId(a.id);
    if (existing) return NextResponse.json({ ok: true, id: existing.id, already: true });
  }

  const created = await insertRechnung(
    rechnungFromAngebot(a, { status: "entwurf", abschlagProzent: istAbschlag ? prozent : undefined }),
  );
  if (!created) return NextResponse.json({ ok: false, error: "create_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: created.id });
}
