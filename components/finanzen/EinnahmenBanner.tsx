/**
 * Grüner KPI-Header für die Einnahmen-Tabs (Accountable-Stil): Titel + Icon,
 * "Gesamtumsatz Jahr ohne USt." und aktuelles Quartal, rechts ein tab-spezifischer
 * "+ … hinzufügen"-Button. Wird als `banner` an FinanzShell übergeben.
 */
import { eur } from "@/lib/angebot/format";

export default function EinnahmenBanner({
  title,
  jahr,
  quartalLabel,
  umsatzJahrNetto,
  umsatzQuartalNetto,
  action,
}: {
  title: string;
  jahr: number;
  quartalLabel: string;
  umsatzJahrNetto: number;
  umsatzQuartalNetto: number;
  action?: React.ReactNode;
}) {
  return (
    <div style={S.band}>
      <div style={S.title}>{title}</div>
      <div style={S.kpis}>
        <div style={S.kpi}>
          <div style={S.kpiLabel}>Gesamtumsatz {jahr} ohne USt.</div>
          <div style={S.kpiValue}>{eur(umsatzJahrNetto)}</div>
        </div>
        <div style={S.kpi}>
          <div style={S.kpiLabel}>{quartalLabel} ohne USt.</div>
          <div style={S.kpiValue}>{eur(umsatzQuartalNetto)}</div>
        </div>
      </div>
      {action ? <div style={S.action}>{action}</div> : null}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  band: { background: "linear-gradient(90deg,#dff3d2,#e9f7e1)", border: "1px solid #cdeabb", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" },
  title: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", color: "#14361f" },
  kpis: { display: "flex", gap: 36, flexWrap: "wrap" },
  kpi: {},
  kpiLabel: { fontSize: 12.5, color: "#3f5c45", fontWeight: 600 },
  kpiValue: { fontSize: 22, fontWeight: 800, color: "#14361f", marginTop: 2 },
  action: { marginLeft: "auto" },
};
