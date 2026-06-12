/**
 * POST /api/finanzen/ausgabe/save — Ausgabe anlegen/aktualisieren (login-geschützt).
 * Body: { id?, datum, lieferant, beschreibung, kategorie, betragNetto, ustSatz, bezahlt, notiz }
 * USt wird aus Netto * ustSatz berechnet (reine Erfassung, keine Steuerlogik).
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { insertAusgabe, updateAusgabe, dbReady, type AusgabeInput } from "@/lib/finanzen/ausgaben";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string } & Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const netto = Math.round((Number(body.betragNetto) || 0) * 100) / 100;
  const ustSatz = Number(body.ustSatz);
  const ust = Math.round(netto * ((Number.isFinite(ustSatz) ? ustSatz : 19) / 100) * 100) / 100;
  const brutto = Math.round((netto + ust) * 100) / 100;

  if (netto <= 0) return NextResponse.json({ ok: false, error: "betrag_pflicht" }, { status: 400 });

  const fields: AusgabeInput = {
    datum: (body.datum as string) || new Date().toISOString().slice(0, 10),
    lieferant: (body.lieferant as string) || null,
    beschreibung: (body.beschreibung as string) || null,
    kategorie: (body.kategorie as string) || null,
    betrag_netto: netto,
    ust,
    betrag_brutto: brutto,
    bezahlt: body.bezahlt === false ? false : true,
    notiz: (body.notiz as string) || null,
  };

  const saved = body.id ? await updateAusgabe(body.id, fields) : await insertAusgabe(fields);
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: saved.id });
}
