/**
 * Gemeinsame Helfer für die Einnahmen-Tabs: Umsatz-KPIs (Jahr + aktuelles
 * Quartal, netto, aus bezahlten Rechnungen), Quartals-Label und der dunkle
 * "+ … hinzufügen"-Button-Stil im Accountable-Look.
 */
import type { Rechnung } from "@/lib/finanzen/db";

export function umsatzKpis(rechnungen: Rechnung[], now: Date): { jahr: number; quartal: number } {
  const jahr = now.getFullYear();
  const q = Math.floor(now.getMonth() / 3);
  let jahrSum = 0;
  let quartalSum = 0;
  for (const r of rechnungen) {
    if (r.status !== "bezahlt") continue;
    const d = new Date(r.bezahlt_am || r.rechnungsdatum || r.created_at || "");
    if (Number.isNaN(d.getTime()) || d.getFullYear() !== jahr) continue;
    jahrSum += r.netto;
    if (Math.floor(d.getMonth() / 3) === q) quartalSum += r.netto;
  }
  return { jahr: jahrSum, quartal: quartalSum };
}

export function quartalLabel(now: Date): string {
  return `Q${Math.floor(now.getMonth() / 3) + 1} ${now.getFullYear()}`;
}

export const bannerAction: React.CSSProperties = {
  background: "#14361f",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 10,
  padding: "11px 18px",
  fontSize: 14,
  fontWeight: 700,
  whiteSpace: "nowrap",
};
