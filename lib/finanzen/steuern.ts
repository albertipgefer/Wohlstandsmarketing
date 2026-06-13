/**
 * Steuer-Berechnungen (Regelbesteuerung, 19 % USt) — reine Funktionen über die
 * vorhandenen Rechnungen + Ausgaben. KEINE ELSTER-Einreichung (separate Phase),
 * nur Berechnung + Report-Kennzahlen.
 *
 * Annahmen:
 *  - Ist-Besteuerung: USt entsteht bei Zahlungseingang (bezahlte Rechnungen).
 *  - Vorsteuer aus erfassten Ausgaben (ust-Feld) im Zeitraum.
 *  - Gewinnermittlung als EÜR (Einnahmen-Überschuss-Rechnung), netto.
 */
import type { Rechnung } from "@/lib/finanzen/db";
import type { Ausgabe } from "@/lib/finanzen/ausgaben";

function inRange(iso: string | null, von: string, bis: string): boolean {
  if (!iso) return false;
  const d = iso.slice(0, 10);
  return d >= von && d <= bis;
}

/** Stichtag für USt (Ist): bezahlt_am, sonst rechnungsdatum. */
function ustDatum(r: Rechnung): string | null {
  return (r.bezahlt_am || r.rechnungsdatum || r.created_at) ?? null;
}

export type UStVoranmeldung = {
  von: string;
  bis: string;
  umsatzNetto: number;     // Bemessungsgrundlage 19 %
  ustEingenommen: number;  // Umsatzsteuer (Kz 81 → 66 grob)
  vorsteuer: number;       // abziehbare Vorsteuer
  zahllast: number;        // ustEingenommen - vorsteuer (negativ = Erstattung)
};

/** USt-Voranmeldung für einen Zeitraum (Ist-Besteuerung). */
export function ustVoranmeldung(rechnungen: Rechnung[], ausgaben: Ausgabe[], von: string, bis: string): UStVoranmeldung {
  let umsatzNetto = 0;
  let ustEingenommen = 0;
  for (const r of rechnungen) {
    if (r.status !== "bezahlt") continue;
    if (!inRange(ustDatum(r), von, bis)) continue;
    umsatzNetto += r.netto;
    ustEingenommen += r.ust;
  }
  let vorsteuer = 0;
  for (const a of ausgaben) {
    if (!inRange(a.datum, von, bis)) continue;
    vorsteuer += a.ust;
  }
  umsatzNetto = round2(umsatzNetto);
  ustEingenommen = round2(ustEingenommen);
  vorsteuer = round2(vorsteuer);
  return { von, bis, umsatzNetto, ustEingenommen, vorsteuer, zahllast: round2(ustEingenommen - vorsteuer) };
}

export type Euer = {
  jahr: number;
  einnahmenNetto: number;
  ausgabenNetto: number;
  gewinn: number;
  einnahmenMonat: number[]; // 12
  ausgabenMonat: number[];  // 12
};

/** Einnahmen-Überschuss-Rechnung (EÜR), netto, für ein Jahr (Ist). */
export function euer(rechnungen: Rechnung[], ausgaben: Ausgabe[], jahr: number): Euer {
  const einnahmenMonat = new Array(12).fill(0) as number[];
  const ausgabenMonat = new Array(12).fill(0) as number[];
  for (const r of rechnungen) {
    if (r.status !== "bezahlt") continue;
    const d = ustDatum(r);
    if (!d) continue;
    const dt = new Date(d);
    if (dt.getFullYear() !== jahr) continue;
    einnahmenMonat[dt.getMonth()] += r.netto;
  }
  for (const a of ausgaben) {
    const dt = new Date(a.datum);
    if (Number.isNaN(dt.getTime()) || dt.getFullYear() !== jahr) continue;
    ausgabenMonat[dt.getMonth()] += a.betrag_netto;
  }
  const einnahmenNetto = round2(einnahmenMonat.reduce((s, v) => s + v, 0));
  const ausgabenNetto = round2(ausgabenMonat.reduce((s, v) => s + v, 0));
  return { jahr, einnahmenNetto, ausgabenNetto, gewinn: round2(einnahmenNetto - ausgabenNetto), einnahmenMonat, ausgabenMonat };
}

/**
 * Deutsche Einkommensteuer (Grundtarif) — Näherung nach §32a EStG 2025.
 * Nur als grobe Rücklagen-Empfehlung; kein Steuerbescheid.
 */
export function einkommensteuer2025(zve: number): number {
  const x = Math.max(0, Math.floor(zve));
  if (x <= 12096) return 0;
  if (x <= 17443) {
    const y = (x - 12096) / 10000;
    return round2((932.3 * y + 1400) * y);
  }
  if (x <= 68480) {
    const z = (x - 17443) / 10000;
    return round2((176.64 * z + 2397) * z + 1015.13);
  }
  if (x <= 277825) return round2(0.42 * x - 10911.92);
  return round2(0.45 * x - 19246.67);
}

export type Ruecklage = {
  gewinn: number;
  einkommensteuerSchaetzung: number;
  durchschnittssatz: number; // % vom Gewinn
  empfohleneRuecklage: number;
};

/**
 * Rücklagen-Empfehlung: geschätzte Einkommensteuer auf den Gewinn (vereinfacht,
 * ohne weitere Einkünfte/Abzüge). Bewusst konservativ als Orientierung.
 */
export function ruecklageEmpfehlung(gewinn: number): Ruecklage {
  const g = Math.max(0, gewinn);
  const est = einkommensteuer2025(g);
  const satz = g > 0 ? round2((est / g) * 100) : 0;
  return { gewinn: round2(gewinn), einkommensteuerSchaetzung: est, durchschnittssatz: satz, empfohleneRuecklage: est };
}

/** Zeitraum-Grenzen für Jahr + (optional) Quartal/Monat. */
export function zeitraum(jahr: number, modus: "jahr" | "q1" | "q2" | "q3" | "q4" | string): { von: string; bis: string; label: string } {
  const p2 = (n: number) => String(n).padStart(2, "0");
  const last = (y: number, m: number) => new Date(y, m, 0).getDate(); // m=1..12
  if (modus === "jahr") return { von: `${jahr}-01-01`, bis: `${jahr}-12-31`, label: `Jahr ${jahr}` };
  const qMap: Record<string, [number, number]> = { q1: [1, 3], q2: [4, 6], q3: [7, 9], q4: [10, 12] };
  if (qMap[modus]) {
    const [a, b] = qMap[modus];
    return { von: `${jahr}-${p2(a)}-01`, bis: `${jahr}-${p2(b)}-${p2(last(jahr, b))}`, label: `${modus.toUpperCase()} ${jahr}` };
  }
  // Monat "m01".."m12"
  const m = Number(String(modus).replace("m", ""));
  if (m >= 1 && m <= 12) return { von: `${jahr}-${p2(m)}-01`, bis: `${jahr}-${p2(m)}-${p2(last(jahr, m))}`, label: `${p2(m)}/${jahr}` };
  return { von: `${jahr}-01-01`, bis: `${jahr}-12-31`, label: `Jahr ${jahr}` };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
