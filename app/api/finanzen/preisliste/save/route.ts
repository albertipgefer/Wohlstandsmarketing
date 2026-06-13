/**
 * POST /api/finanzen/preisliste/save — Preislisten-Position anlegen/aktualisieren
 * (login-geschützt). Body: { id?, bezeichnung, beschreibung, preis_netto, ust_satz, einheit, aktiv }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { insertPreisposition, updatePreisposition, dbReady, type PreispositionInput } from "@/lib/finanzen/preisliste";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string } & Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const bezeichnung = String(body.bezeichnung || "").trim();
  if (!bezeichnung) return NextResponse.json({ ok: false, error: "bezeichnung_pflicht" }, { status: 400 });

  const fields: PreispositionInput = {
    bezeichnung,
    beschreibung: (body.beschreibung as string) || null,
    preis_netto: Math.round((Number(body.preis_netto) || 0) * 100) / 100,
    ust_satz: Number.isFinite(Number(body.ust_satz)) ? Number(body.ust_satz) : 19,
    einheit: (body.einheit as string) === "pro Monat" ? "pro Monat" : "einmalig",
    aktiv: body.aktiv === false ? false : true,
  };

  const saved = body.id ? await updatePreisposition(body.id, fields) : await insertPreisposition(fields);
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: saved.id });
}
