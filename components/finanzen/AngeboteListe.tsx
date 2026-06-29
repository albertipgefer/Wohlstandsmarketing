"use client";
/** Angebote-Liste mit Suche + Status-Tabs (Accountable-Stil). Reine Client-Filterung. */
import { useMemo, useState } from "react";
import Link from "next/link";
import RechnungAusAngebotButton from "@/components/finanzen/RechnungAusAngebotButton";
import DeleteButton from "@/components/finanzen/DeleteButton";

export type AngebotZeile = {
  id: string;
  nummer: string | null;
  kunde_firma: string | null;
  kunde_email: string | null;
  brutto: number;
  status: string;
  gueltig_bis: string | null;
  created_at: string | null;
  public_token: string | null;
  abrechenbar: boolean; // angenommen + noch keine Rechnung
};

const eur = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);
const deDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("de-DE") : "—");

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  entwurf: { bg: "#f4f4f5", fg: "#52525b", label: "Entwurf" },
  gesendet: { bg: "#eff6ff", fg: "#1663de", label: "Abgesendet" },
  angesehen: { bg: "#fff7ed", fg: "#c2410c", label: "Angesehen" },
  angenommen: { bg: "#ecfdf3", fg: "#027a48", label: "Bestätigt" },
  abgelehnt: { bg: "#fef3f2", fg: "#b42318", label: "Abgelehnt" },
};

const TABS: { key: string; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "entwurf", label: "Entwürfe" },
  { key: "gesendet", label: "Offen" },
  { key: "angenommen", label: "Bestätigt" },
  { key: "abgelehnt", label: "Abgelehnt" },
];

export default function AngeboteListe({ angebote }: { angebote: AngebotZeile[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("alle");

  const counts = useMemo(() => {
    const c: Record<string, number> = { alle: angebote.length };
    for (const a of angebote) {
      const k = a.status === "angesehen" ? "gesendet" : a.status;
      c[k] = (c[k] || 0) + 1;
    }
    return c;
  }, [angebote]);

  const gefiltert = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return angebote.filter((a) => {
      if (tab !== "alle") {
        const k = a.status === "angesehen" ? "gesendet" : a.status;
        if (k !== tab) return false;
      }
      if (!needle) return true;
      return [a.nummer, a.kunde_firma, a.kunde_email].some((v) => (v || "").toLowerCase().includes(needle));
    });
  }, [angebote, q, tab]);

  return (
    <>
      <div style={S.toolbar}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Angebote durchsuchen …" style={S.search} />
        <div style={S.tabs}>
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ ...S.tab, ...(t.key === tab ? S.tabOn : {}) }}>
              {t.label}{counts[t.key] ? <span style={S.tabCount}>{counts[t.key]}</span> : null}
            </button>
          ))}
        </div>
      </div>

      {gefiltert.length === 0 ? (
        <div style={S.empty}>Keine Angebote für diese Auswahl.</div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead>
              <tr>{["Kundenname", "Nummer", "Datum", "Status", "Gesamtbetrag", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {gefiltert.map((a) => {
                const st = STATUS_STYLE[a.status] || STATUS_STYLE.entwurf;
                return (
                  <tr key={a.id} style={S.tr}>
                    <td style={S.td}>
                      <div style={{ fontWeight: 600 }}>{a.kunde_firma || a.kunde_email || "—"}</div>
                      {a.kunde_firma && a.kunde_email && <div style={{ fontSize: 12, color: "#a3a3a3" }}>{a.kunde_email}</div>}
                    </td>
                    <td style={S.td}>{a.nummer || "—"}</td>
                    <td style={S.td}>{deDate(a.created_at)}</td>
                    <td style={S.td}><span style={{ ...S.badge, background: st.bg, color: st.fg }}>{st.label}</span></td>
                    <td style={{ ...S.td, fontWeight: 700 }}>{eur(a.brutto)}</td>
                    <td style={{ ...S.td, textAlign: "right", whiteSpace: "nowrap" }}>
                      <Link href={`/angebot/neu?id=${a.id}`} style={S.link}>Bearbeiten</Link>
                      <a href={`/angebot/${a.id}/print`} target="_blank" rel="noreferrer" style={{ ...S.link, marginLeft: 12 }}>PDF</a>
                      {a.public_token && <a href={`/angebot/a/${a.public_token}`} target="_blank" rel="noreferrer" style={{ ...S.link, marginLeft: 12 }}>Ansicht</a>}
                      {a.abrechenbar && <RechnungAusAngebotButton angebotId={a.id} />}
                      {a.abrechenbar && <RechnungAusAngebotButton angebotId={a.id} abschlag />}
                      {a.abrechenbar && (
                        <Link href={`/finanzen/wiederkehrend/neu?fromAngebot=${a.id}`} style={{ ...S.link, color: "#0ea5e9", marginLeft: 12 }} title="Wiederkehrende Rechnung / Retainer aus diesem Angebot">
                          → Retainer
                        </Link>
                      )}
                      <span style={{ marginLeft: 12 }}>
                        <DeleteButton
                          endpoint="/api/angebot/delete"
                          id={a.id}
                          confirmMsg={`Angebot ${a.nummer || ""} wirklich löschen? (Eine daraus erzeugte Rechnung bleibt erhalten.)`}
                        />
                      </span>
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
  td: { padding: "14px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
};
