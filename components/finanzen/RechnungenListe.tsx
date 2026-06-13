"use client";
/** Rechnungsliste mit Suche + Status-Tabs (Accountable-Stil). Reine Client-Filterung. */
import { useMemo, useState } from "react";
import Link from "next/link";
import RechnungActions from "@/components/finanzen/RechnungActions";

export type RechnungZeile = {
  id: string;
  nummer: string | null;
  typ: string;
  kunde_firma: string | null;
  kunde_email: string | null;
  brutto: number;
  rest: number; // offener Restbetrag (bei Teilzahlung)
  datum: string | null;
  status: string; // effektiver Status
  faellig_am: string | null;
  mahnstufe: number;
  public_token: string | null;
};

const eur = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);
const deDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("de-DE") : "—");

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  entwurf: { bg: "#f4f4f5", fg: "#52525b", label: "Entwurf" },
  offen: { bg: "#eff6ff", fg: "#1663de", label: "Offen" },
  teilbezahlt: { bg: "#fef9e7", fg: "#a16207", label: "Teilbezahlt" },
  bezahlt: { bg: "#ecfdf3", fg: "#027a48", label: "Bezahlt" },
  ueberfaellig: { bg: "#fef3f2", fg: "#b42318", label: "Überfällig" },
  storniert: { bg: "#f4f4f5", fg: "#a1a1aa", label: "Storniert" },
};

const TABS: { key: string; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "entwurf", label: "Entwürfe" },
  { key: "offen", label: "Offen" },
  { key: "teilbezahlt", label: "Teilbezahlt" },
  { key: "ueberfaellig", label: "Überfällig" },
  { key: "bezahlt", label: "Bezahlt" },
];

export default function RechnungenListe({ rechnungen }: { rechnungen: RechnungZeile[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("alle");

  const counts = useMemo(() => {
    const c: Record<string, number> = { alle: rechnungen.length };
    for (const r of rechnungen) c[r.status] = (c[r.status] || 0) + 1;
    return c;
  }, [rechnungen]);

  const gefiltert = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rechnungen.filter((r) => {
      if (tab !== "alle" && r.status !== tab) return false;
      if (!needle) return true;
      return [r.nummer, r.kunde_firma, r.kunde_email].some((v) => (v || "").toLowerCase().includes(needle));
    });
  }, [rechnungen, q, tab]);

  return (
    <>
      <div style={S.toolbar}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechnungen durchsuchen …" style={S.search} />
        <div style={S.tabs}>
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ ...S.tab, ...(t.key === tab ? S.tabOn : {}) }}>
              {t.label}{counts[t.key] ? <span style={S.tabCount}>{counts[t.key]}</span> : null}
            </button>
          ))}
        </div>
      </div>

      {gefiltert.length === 0 ? (
        <div style={S.empty}>Keine Rechnungen für diese Auswahl.</div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead>
              <tr>{["Name des Kunden", "Typ", "Nummer", "Datum", "Status", "Gesamtbetrag", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {gefiltert.map((r) => {
                const st = STATUS_STYLE[r.status] || STATUS_STYLE.entwurf;
                return (
                  <tr key={r.id} style={S.tr}>
                    <td style={S.td}>
                      <div style={{ fontWeight: 600 }}>{r.kunde_firma || r.kunde_email || "—"}</div>
                      {r.kunde_firma && r.kunde_email && <div style={{ fontSize: 12, color: "#a3a3a3" }}>{r.kunde_email}</div>}
                    </td>
                    <td style={S.td}>{r.typ}</td>
                    <td style={S.td}>{r.nummer || <span style={{ color: "#a1a1aa" }}>Entwurf</span>}</td>
                    <td style={S.td}>{deDate(r.datum)}</td>
                    <td style={S.td}>
                      <span style={{ ...S.badge, background: st.bg, color: st.fg }}>{st.label}</span>
                      {r.mahnstufe > 0 && (
                        <span style={{ ...S.badge, background: "#fff7ed", color: "#c2410c", marginLeft: 6 }}>Mahnstufe {r.mahnstufe}</span>
                      )}
                      {r.status === "teilbezahlt" && r.rest > 0 && (
                        <div style={{ fontSize: 11.5, color: "#a16207", marginTop: 3 }}>Rest {eur(r.rest)}</div>
                      )}
                    </td>
                    <td style={{ ...S.td, fontWeight: 700 }}>{eur(r.brutto)}</td>
                    <td style={{ ...S.td, textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginBottom: 6 }}>
                        {r.status === "entwurf" && <Link href={`/finanzen/rechnungen/neu?id=${r.id}`} style={S.link}>Bearbeiten</Link>}
                        <a href={`/api/finanzen/pdf?rechnung=${r.id}`} target="_blank" rel="noreferrer" style={S.link}>PDF</a>
                        {r.public_token && <a href={`/finanzen/r/${r.public_token}`} target="_blank" rel="noreferrer" style={S.link}>Ansicht</a>}
                      </div>
                      <RechnungActions id={r.id} status={r.status as never} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const S: Record<string, React.CSSProperties> = {
  toolbar: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" },
  search: { flex: 1, minWidth: 200, border: "1px solid #e4e4e7", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none" },
  tabs: { display: "inline-flex", gap: 2, background: "#f4f4f5", borderRadius: 10, padding: 3 },
  tab: { border: "none", background: "transparent", borderRadius: 8, padding: "7px 12px", fontSize: 13, fontWeight: 600, color: "#71717a", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 },
  tabOn: { background: "#fff", color: "#0a0a0a", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" },
  tabCount: { fontSize: 11, background: "#e4e4e7", color: "#52525b", borderRadius: 999, padding: "1px 6px" },
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
};
