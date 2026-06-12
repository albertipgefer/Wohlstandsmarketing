/**
 * Finanz-Kennzahlen & Umsatz-Forecast — reine Funktionen über die geladenen
 * Datensätze (Angebote + Rechnungen). Keine DB-Calls hier → leicht testbar.
 *
 * Konvention wie Accountable: Headline-Umsatz = NETTO ("ohne USt").
 */
import type { Angebot } from "@/lib/angebot/db";
import type { Rechnung } from "@/lib/finanzen/db";

export type FinanzKpis = {
  /** Bezahlter Netto-Umsatz im laufenden Jahr. */
  umsatzJahrNetto: number;
  /** Bezahlter Netto-Umsatz im laufenden Quartal. */
  umsatzQuartalNetto: number;
  /** Offene (gestellte, noch nicht bezahlte) Rechnungen, netto. */
  offenNetto: number;
  /** Davon überfällig, netto. */
  ueberfaelligNetto: number;
  /**
   * Erwarteter nächster Umsatz (Pipeline), netto:
   *   offene Rechnungen + angenommene Angebote, zu denen noch keine Rechnung existiert.
   */
  naechsterUmsatzNetto: number;
  /** Anzahl offener Rechnungen. */
  offeneAnzahl: number;
  /** Netto-Umsatz je Monat (Index 0 = Januar) im laufenden Jahr, nur bezahlte. */
  monatlichNetto: number[];
};

function jahr(d: string | null): number | null {
  if (!d) return null;
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? null : t.getFullYear();
}

function monat(d: string | null): number | null {
  if (!d) return null;
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? null : t.getMonth();
}

function quartal(m: number): number {
  return Math.floor(m / 3);
}

/** Bezahldatum bevorzugt, sonst Rechnungsdatum, sonst created_at. */
function umsatzDatum(r: Rechnung): string | null {
  return r.bezahlt_am || r.rechnungsdatum || r.created_at || null;
}

export function computeKpis(
  angebote: Angebot[],
  rechnungen: Rechnung[],
  now: Date,
): FinanzKpis {
  const curYear = now.getFullYear();
  const curQuartal = quartal(now.getMonth());
  const heute = now.toISOString().slice(0, 10);

  let umsatzJahrNetto = 0;
  let umsatzQuartalNetto = 0;
  let offenNetto = 0;
  let ueberfaelligNetto = 0;
  let entwurfNetto = 0;
  let offeneAnzahl = 0;
  const monatlichNetto = new Array(12).fill(0) as number[];

  for (const r of rechnungen) {
    if (r.status === "storniert") continue;

    if (r.status === "bezahlt") {
      const d = umsatzDatum(r);
      const y = jahr(d);
      const m = monat(d);
      if (y === curYear && m !== null) {
        umsatzJahrNetto += r.netto;
        monatlichNetto[m] += r.netto;
        if (quartal(m) === curQuartal) umsatzQuartalNetto += r.netto;
      }
    } else if (r.status === "offen" || r.status === "ueberfaellig") {
      offenNetto += r.netto;
      offeneAnzahl += 1;
      const pastDue = r.faellig_am !== null && r.faellig_am < heute;
      if (r.status === "ueberfaellig" || pastDue) ueberfaelligNetto += r.netto;
    } else if (r.status === "entwurf") {
      entwurfNetto += r.netto;
    }
  }

  // Pipeline: angenommene Angebote ohne zugehörige Rechnung.
  const angebotIdsMitRechnung = new Set(
    rechnungen.map((r) => r.angebot_id).filter(Boolean) as string[],
  );
  let pipelineAngeboteNetto = 0;
  for (const a of angebote) {
    if (a.status === "angenommen" && !angebotIdsMitRechnung.has(a.id)) {
      pipelineAngeboteNetto += a.netto;
    }
  }

  // Erwarteter nächster Umsatz: gestellte offene + Entwurfs-Rechnungen
  // + angenommene Angebote, die noch keine Rechnung haben.
  const naechsterUmsatzNetto = offenNetto + entwurfNetto + pipelineAngeboteNetto;

  return {
    umsatzJahrNetto,
    umsatzQuartalNetto,
    offenNetto,
    ueberfaelligNetto,
    naechsterUmsatzNetto,
    offeneAnzahl,
    monatlichNetto,
  };
}

/**
 * Markiert fällige offene Rechnungen als überfällig (rein lesend → gibt die IDs
 * zurück, die der Aufrufer in der DB aktualisieren kann).
 */
export function ueberfaelligeIds(rechnungen: Rechnung[], now: Date): string[] {
  const heute = now.toISOString().slice(0, 10);
  return rechnungen
    .filter(
      (r) =>
        r.status === "offen" &&
        r.faellig_am !== null &&
        r.faellig_am < heute,
    )
    .map((r) => r.id);
}
