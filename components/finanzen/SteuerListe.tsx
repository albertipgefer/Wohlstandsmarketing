"use client";
/**
 * Steuer-Verpflichtungen als Karten-Grid, gruppiert nach Quartal + Jahresabschluss
 * (Accountable-Layout, WSM-Stil). Mit Suche. Karten verlinken auf die Detailansicht.
 */
import { useMemo, useState } from "react";
import Link from "next/link";

export type SteuerKarte = {
  id: string;
  title: string;
  betrag: number | null;
  faelligISO: string | null;
  href: string;
};
export type SteuerGruppe = { titel: string; karten: SteuerKarte[] };

const eur = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);
const deDate = (iso: string) => new Date(iso).toLocaleDateString("de-DE");

function badge(faelligISO: string | null): { text: string; bg: string; fg: string } {
  if (!faelligISO) return { text: "siehe Steuerbescheid", bg: "#f4f4f5", fg: "#71717a" };
  const tage = Math.round((new Date(faelligISO).getTime() - Date.now()) / 86400000);
  if (tage < 0) return { text: `fällig war ${deDate(faelligISO)}`, bg: "#fef3f2", fg: "#b42318" };
  if (tage <= 30) return { text: `${tage} Tage verbleibend`, bg: "#fff7ed", fg: "#c2410c" };
  return { text: `Fällig am ${deDate(faelligISO)}`, bg: "#ecfdf3", fg: "#027a48" };
}

export default function SteuerListe({ gruppen }: { gruppen: SteuerGruppe[] }) {
  const [q, setQ] = useState("");

  const gefiltert = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return gruppen;
    return gruppen
      .map((g) => ({ ...g, karten: g.karten.filter((k) => k.title.toLowerCase().includes(n)) }))
      .filter((g) => g.karten.length > 0);
  }, [gruppen, q]);

  return (
    <>
      <div style={S.toolbar} className="no-print">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suche in Steuerverpflichtungen …" style={S.search} />
      </div>

      <div style={S.statusBar}>✓ Sehr gut — deine Steuern sind automatisch auf dem neuesten Stand.</div>

      {gefiltert.map((g) => (
        <section key={g.titel} style={S.group}>
          <div style={S.groupTitle}>{g.titel}</div>
          <div style={S.grid}>
            {g.karten.map((k) => {
              const b = badge(k.faelligISO);
              return (
                <div key={k.id} style={S.card}>
                  <div style={S.cardTop}>
                    <span style={{ ...S.badge, background: b.bg, color: b.fg }}>{b.text}</span>
                  </div>
                  <div style={S.cardTitle}>{k.title}</div>
                  {k.betrag !== null && <div style={S.cardAmount}>{eur(k.betrag)}</div>}
                  <Link href={k.href} style={S.cardBtn}>Überprüfen</Link>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

const S: Record<string, React.CSSProperties> = {
  toolbar: { marginBottom: 14 },
  search: { width: "100%", maxWidth: 420, border: "1px solid #e4e4e7", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none" },
  statusBar: { background: "#ecfdf3", border: "1px solid #c7f0d6", color: "#027a48", borderRadius: 10, padding: "11px 16px", fontSize: 13.5, fontWeight: 600, marginBottom: 20 },
  group: { background: "#f6f7f9", border: "1px solid #ececf0", borderRadius: 16, padding: "16px 18px", marginBottom: 16 },
  groupTitle: { fontSize: 15, fontWeight: 800, color: "#27272a", marginBottom: 12, letterSpacing: "-0.2px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 },
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 8, minHeight: 150 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  badge: { display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 700 },
  cardTitle: { fontSize: 14, fontWeight: 600, color: "#27272a", marginTop: 4 },
  cardAmount: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#0a0a0a" },
  cardBtn: { marginTop: "auto", textAlign: "center", background: "#f4f4f5", color: "#27272a", textDecoration: "none", borderRadius: 9, padding: "9px 12px", fontSize: 13.5, fontWeight: 700 },
};
