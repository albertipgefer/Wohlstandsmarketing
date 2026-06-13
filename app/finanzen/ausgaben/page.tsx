/**
 * /finanzen/ausgaben — Betriebsausgaben erfassen & verwalten (für die
 * Gewinn-Übersicht). Schnelle Erfassung oben, Liste darunter (mit Löschen).
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAusgaben, ausgabenJahr } from "@/lib/finanzen/ausgaben";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import AusgabenManager, { type AusgabeZeile } from "@/components/finanzen/AusgabenManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Ausgaben",
  robots: { index: false, follow: false },
};

export default async function AusgabenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const now = new Date();
  const jahr = now.getFullYear();
  const q = Math.floor(now.getMonth() / 3);
  const ausgaben = await listAusgaben();
  const { netto } = ausgabenJahr(ausgaben, jahr);
  let quartalNetto = 0;
  for (const a of ausgaben) {
    const d = new Date(a.datum);
    if (!Number.isNaN(d.getTime()) && d.getFullYear() === jahr && Math.floor(d.getMonth() / 3) === q) quartalNetto += a.betrag_netto;
  }

  const zeilen: AusgabeZeile[] = ausgaben.map((a) => ({
    id: a.id,
    datum: a.datum,
    lieferant: a.lieferant,
    beschreibung: a.beschreibung,
    kategorie: a.kategorie,
    betrag_netto: a.betrag_netto,
    betrag_brutto: a.betrag_brutto,
    ust_satz: a.betrag_netto > 0 ? Math.round((a.ust / a.betrag_netto) * 100) : 19,
    bezahlt: a.bezahlt,
    beleg_url: a.beleg_url,
  }));

  const banner = (
    <div style={S.band}>
      <div style={S.title}>Ausgaben</div>
      <div style={S.kpis}>
        <div>
          <div style={S.kpiLabel}>Abzugsfähige Kosten {jahr}</div>
          <div style={S.kpiValue}>{eur(netto)}</div>
        </div>
        <div>
          <div style={S.kpiLabel}>Q{q + 1} {jahr}</div>
          <div style={S.kpiValue}>{eur(quartalNetto)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <FinanzShell section="ausgaben" title="Ausgaben" banner={banner}>
      <AusgabenManager ausgaben={zeilen} />
    </FinanzShell>
  );
}

const S: Record<string, React.CSSProperties> = {
  band: { background: "linear-gradient(90deg,#fde8e4,#fdeee9)", border: "1px solid #f5d3c9", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" },
  title: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", color: "#5a241b" },
  kpis: { display: "flex", gap: 36, flexWrap: "wrap" },
  kpiLabel: { fontSize: 12.5, color: "#7a4034", fontWeight: 600 },
  kpiValue: { fontSize: 22, fontWeight: 800, color: "#5a241b", marginTop: 2 },
};
