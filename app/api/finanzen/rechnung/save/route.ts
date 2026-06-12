/**
 * POST /api/finanzen/rechnung/save — Rechnung als Entwurf anlegen/aktualisieren
 * (login-geschützt). Summen werden serverseitig aus den Positionen berechnet.
 * Body: { id?, typ, kunde_*, titel, einleitung, positionen[], anmerkungen,
 *         bedingungen, rechnungsdatum, zahlungsziel_tage }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import {
  insertRechnung,
  updateRechnung,
  getRechnungById,
  dbReady,
  type RechnungInput,
  type RechnungTyp,
} from "@/lib/finanzen/db";
import type { AngebotPosition } from "@/lib/angebot/db";

function summen(positionen: AngebotPosition[]) {
  let netto = 0;
  let ust = 0;
  for (const p of positionen || []) {
    const zeile = (Number(p.preisNetto) || 0) * (Number(p.menge) || 1);
    netto += zeile;
    ust += zeile * ((Number(p.ustSatz) || 0) / 100);
  }
  netto = Math.round(netto * 100) / 100;
  ust = Math.round(ust * 100) / 100;
  return { netto, ust, brutto: Math.round((netto + ust) * 100) / 100 };
}

const TYPEN: RechnungTyp[] = ["rechnung", "abschlag", "schluss", "storno"];

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string } & Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const positionen = (Array.isArray(body.positionen) ? body.positionen : []) as AngebotPosition[];
  const { netto, ust, brutto } = summen(positionen);
  const typ = TYPEN.includes(body.typ as RechnungTyp) ? (body.typ as RechnungTyp) : "rechnung";
  const zielTage = Number(body.zahlungsziel_tage) || 14;

  // Fälligkeit: explizit gesetzt oder Rechnungsdatum + Zahlungsziel.
  const rechnungsdatum = (body.rechnungsdatum as string) || new Date().toISOString().slice(0, 10);
  const faellig =
    (body.faellig_am as string) ||
    new Date(new Date(rechnungsdatum).getTime() + zielTage * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

  const fields: RechnungInput = {
    typ,
    titel: (body.titel as string) || null,
    kunde_firma: (body.kunde_firma as string) || null,
    kunde_ansprech: (body.kunde_ansprech as string) || null,
    kunde_strasse: (body.kunde_strasse as string) || null,
    kunde_plz_ort: (body.kunde_plz_ort as string) || null,
    kunde_land: (body.kunde_land as string) || null,
    kunde_email: (body.kunde_email as string) || null,
    einleitung: (body.einleitung as string) || null,
    positionen,
    anmerkungen: (body.anmerkungen as string) || null,
    bedingungen: (body.bedingungen as string) || null,
    netto,
    ust,
    brutto,
    rechnungsdatum,
    faellig_am: faellig,
    zahlungsziel_tage: zielTage,
  };

  // Beim Update den Status NICHT überschreiben (bleibt z. B. 'offen').
  if (body.id) {
    const exists = await getRechnungById(body.id as string);
    if (!exists) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    const saved = await updateRechnung(body.id as string, fields);
    if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
    return NextResponse.json({ ok: true, id: saved.id });
  }

  const saved = await insertRechnung({ ...fields, status: "entwurf" });
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: saved.id });
}
