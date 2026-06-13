/**
 * POST /api/finanzen/zahlung/save — Teilzahlung zu einer Rechnung erfassen
 * (login-geschützt). Body: { rechnungId, betrag, datum? }. Setzt den Rechnungs-
 * status automatisch: Summe ≥ Brutto → bezahlt, sonst teilbezahlt.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getRechnungById, updateRechnung } from "@/lib/finanzen/db";
import { insertZahlung, listZahlungenFor } from "@/lib/finanzen/zahlungen";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { rechnungId?: string; betrag?: number; datum?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const id = String(body.rechnungId || "");
  const betrag = Math.round((Number(body.betrag) || 0) * 100) / 100;
  if (!id || betrag <= 0) return NextResponse.json({ ok: false, error: "betrag_pflicht" }, { status: 400 });

  const r = await getRechnungById(id);
  if (!r) return NextResponse.json({ ok: false, error: "rechnung_nicht_gefunden" }, { status: 404 });

  const z = await insertZahlung({
    rechnung_id: id,
    betrag,
    datum: body.datum || new Date().toISOString().slice(0, 10),
    quelle: "manuell",
  });
  if (!z) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });

  const alle = await listZahlungenFor(id);
  const summe = alle.reduce((s, x) => s + x.betrag, 0);
  const rest = Math.round((r.brutto - summe) * 100) / 100;

  if (summe + 0.01 >= r.brutto) {
    await updateRechnung(id, { status: "bezahlt", bezahlt_am: new Date().toISOString() });
    return NextResponse.json({ ok: true, status: "bezahlt", rest: 0 });
  }
  if (r.status !== "storniert" && r.status !== "entwurf") {
    await updateRechnung(id, { status: "teilbezahlt" });
  }
  return NextResponse.json({ ok: true, status: "teilbezahlt", rest });
}
