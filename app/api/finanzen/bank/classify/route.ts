/**
 * POST /api/finanzen/bank/classify — Banktransaktion klassifizieren + abgleichen.
 * Body: { txId, als, rechnungId? }
 *  - als="einnahme" + rechnungId → Rechnung als bezahlt markieren, Tx verknüpfen
 *  - als="ausgabe"               → Ausgabe aus der Transaktion erzeugen, Tx verknüpfen
 *  - als="privat" | "ignoriert"  → nur klassifizieren
 * Login-geschützt.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listTransaktionen, updateTransaktion } from "@/lib/finanzen/bank";
import { getRechnungById, updateRechnung } from "@/lib/finanzen/db";
import { insertAusgabe } from "@/lib/finanzen/ausgaben";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { txId?: string; als?: string; rechnungId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const { txId, als, rechnungId } = body;
  if (!txId || !als) return NextResponse.json({ ok: false, error: "param_fehlt" }, { status: 400 });

  const tx = (await listTransaktionen(500)).find((t) => t.id === txId);
  if (!tx) return NextResponse.json({ ok: false, error: "tx_nicht_gefunden" }, { status: 404 });

  if (als === "einnahme" && rechnungId) {
    const r = await getRechnungById(rechnungId);
    if (r) {
      await updateRechnung(rechnungId, { status: "bezahlt", bezahlt_am: tx.datum ? new Date(tx.datum).toISOString() : new Date().toISOString() });
      await updateTransaktion(txId, { klassifiziert_als: "einnahme", rechnung_id: rechnungId });
      return NextResponse.json({ ok: true });
    }
  }

  if (als === "ausgabe") {
    const brutto = Math.abs(tx.betrag);
    const netto = Math.round((brutto / 1.19) * 100) / 100;
    const ust = Math.round((brutto - netto) * 100) / 100;
    const saved = await insertAusgabe({
      datum: tx.datum || new Date().toISOString().slice(0, 10),
      lieferant: tx.gegenname || null,
      beschreibung: tx.verwendungszweck || null,
      kategorie: "Sonstiges",
      betrag_netto: netto,
      ust,
      betrag_brutto: brutto,
      bezahlt: true,
    });
    await updateTransaktion(txId, { klassifiziert_als: "ausgabe", ausgabe_id: saved?.id || null });
    return NextResponse.json({ ok: true });
  }

  await updateTransaktion(txId, { klassifiziert_als: als });
  return NextResponse.json({ ok: true });
}
