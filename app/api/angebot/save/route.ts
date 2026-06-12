/**
 * POST /api/angebot/save — Angebot als Entwurf anlegen/aktualisieren (login-geschützt).
 * Body: { id?, nummer, titel, untertitel, kunde_*, einleitung, positionen, anmerkungen,
 *         bedingungen, netto, ust, brutto, gueltig_bis }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { insertAngebot, updateAngebot, dbReady, type AngebotInput } from "@/lib/angebot/db";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string } & AngebotInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { id, ...rest } = body;
  // Nur erlaubte Felder übernehmen (kein status/token-Override von außen).
  const fields: AngebotInput = {
    nummer: rest.nummer,
    titel: rest.titel,
    untertitel: rest.untertitel,
    kunde_firma: rest.kunde_firma,
    kunde_ansprech: rest.kunde_ansprech,
    kunde_strasse: rest.kunde_strasse,
    kunde_plz_ort: rest.kunde_plz_ort,
    kunde_land: rest.kunde_land,
    kunde_email: rest.kunde_email,
    einleitung: rest.einleitung,
    positionen: rest.positionen,
    anmerkungen: rest.anmerkungen,
    bedingungen: rest.bedingungen,
    netto: rest.netto,
    ust: rest.ust,
    brutto: rest.brutto,
    gueltig_bis: rest.gueltig_bis || null,
  };

  const saved = id ? await updateAngebot(id, fields) : await insertAngebot(fields);
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: saved.id });
}
