/**
 * Geteilte Formatierungs- und Rechen-Helfer für das Angebots-System.
 * Genutzt von Generator (Client), öffentlicher Ansicht (Server) und Routen.
 */
import type { AngebotPosition } from "./db";
import { BUNDLE_DISCOUNT, BUNDLE_MIN_ITEMS } from "@/content/pricing";

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

/**
 * Netto/USt./Brutto aus Positionen berechnen (Einheit „pro Monat" = preis × Monate).
 * Paket-Rabatt automatisch: ab BUNDLE_MIN_ITEMS Positionen → BUNDLE_DISCOUNT auf
 * netto + USt (identische Logik wie der Website-Konfigurator, content/pricing.ts).
 */
export function computeTotals(positionen: AngebotPosition[]) {
  let nettoRaw = 0;
  let ustRaw = 0;
  for (const p of positionen) {
    const gesamt = (p.preisNetto || 0) * (p.menge || 0);
    nettoRaw += gesamt;
    ustRaw += (gesamt * (p.ustSatz || 0)) / 100;
  }
  const hasPaket = positionen.length >= BUNDLE_MIN_ITEMS;
  const rabattRate = hasPaket ? BUNDLE_DISCOUNT : 0;
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const netto = nettoRaw * (1 - rabattRate);
  const ust = ustRaw * (1 - rabattRate);
  return {
    nettoRaw: r2(nettoRaw),
    netto: r2(netto),
    ust: r2(ust),
    brutto: r2(netto + ust),
    hasPaket,
    rabattRate,
    rabattBetrag: r2(nettoRaw - netto),
  };
}
