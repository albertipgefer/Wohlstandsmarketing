/**
 * POST /api/finanzen/wiederkehrend/save — wiederkehrende Rechnung (Retainer)
 * anlegen/aktualisieren (login-geschützt). v1: eine Betragszeile pro Periode.
 * Body: { id?, bezeichnung, kunde_*, titel, betragNetto, ustSatz, intervall,
 *         naechste_faelligkeit, zahlungsziel_tage, aktiv, anmerkungen }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import {
  insertWiederkehrend,
  updateWiederkehrend,
  dbReady,
  type Intervall,
  type WiederkehrendInput,
} from "@/lib/finanzen/recurring";

const INTERVALLE: Intervall[] = ["monatlich", "quartalsweise", "jaehrlich"];

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const betragNetto = Number(body.betragNetto) || 0;
  const ustSatz = Number(body.ustSatz) || 19;
  const titel = (body.titel as string) || "Leistung";
  const netto = Math.round(betragNetto * 100) / 100;
  const ust = Math.round(betragNetto * (ustSatz / 100) * 100) / 100;
  const brutto = Math.round((netto + ust) * 100) / 100;

  const naechste = (body.naechste_faelligkeit as string) || new Date().toISOString().slice(0, 10);
  const intervall = INTERVALLE.includes(body.intervall as Intervall)
    ? (body.intervall as Intervall)
    : "monatlich";

  const fields: WiederkehrendInput = {
    bezeichnung: (body.bezeichnung as string) || null,
    kunde_firma: (body.kunde_firma as string) || null,
    kunde_ansprech: (body.kunde_ansprech as string) || null,
    kunde_strasse: (body.kunde_strasse as string) || null,
    kunde_plz_ort: (body.kunde_plz_ort as string) || null,
    kunde_land: (body.kunde_land as string) || null,
    kunde_email: (body.kunde_email as string) || null,
    titel,
    einleitung: (body.einleitung as string) || null,
    positionen: [
      {
        uid: "wk1",
        titel,
        beschreibung: (body.beschreibung as string) || "",
        leistungen: [],
        preisNetto: betragNetto,
        einheit: intervall === "monatlich" ? "pro Monat" : "einmalig",
        menge: 1,
        ustSatz,
      },
    ],
    anmerkungen: (body.anmerkungen as string) || null,
    netto,
    ust,
    brutto,
    intervall,
    zahlungsziel_tage: Number(body.zahlungsziel_tage) || 7,
    naechste_faelligkeit: naechste,
    enddatum: (body.enddatum as string) || null,
    abschlag_modus: body.abschlag_modus === true,
    abschlag_gesamt: body.abschlag_gesamt != null ? Number(body.abschlag_gesamt) : null,
    aktiv: body.aktiv === false ? false : true,
  };

  const saved = body.id
    ? await updateWiederkehrend(body.id as string, fields)
    : await insertWiederkehrend(fields);
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: saved.id });
}
