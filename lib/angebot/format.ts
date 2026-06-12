/**
 * Geteilte Formatierungs- und Rechen-Helfer für das Angebots-System.
 * Genutzt von Generator (Client), öffentlicher Ansicht (Server) und Routen.
 */
import type { AngebotPosition } from "./db";

export const eur = (n: number) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " €";

export const deDate = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = iso.slice(0, 10).split("-");
  if (d.length !== 3) return iso;
  return `${d[2]}.${d[1]}.${d[0]}`;
};

export const isoToday = () => new Date().toISOString().slice(0, 10);

export const isoPlusDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

/** Netto/USt./Brutto aus Positionen berechnen (Einheit „pro Monat" = preis × Monate). */
export function computeTotals(positionen: AngebotPosition[]) {
  let netto = 0;
  let ust = 0;
  for (const p of positionen) {
    const gesamt = (p.preisNetto || 0) * (p.menge || 0);
    netto += gesamt;
    ust += (gesamt * (p.ustSatz || 0)) / 100;
  }
  return {
    netto: Math.round(netto * 100) / 100,
    ust: Math.round(ust * 100) / 100,
    brutto: Math.round((netto + ust) * 100) / 100,
  };
}
