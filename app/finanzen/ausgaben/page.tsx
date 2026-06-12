/**
 * /finanzen/ausgaben — Betriebsausgaben erfassen & verwalten (für die
 * Gewinn-Übersicht). Schnelle Erfassung oben, Liste darunter (mit Löschen).
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAusgaben, ausgabenJahr } from "@/lib/finanzen/ausgaben";
import { eur, deDate } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import AusgabeForm from "@/components/finanzen/AusgabeForm";
import AusgabeDeleteButton from "@/components/finanzen/AusgabeDeleteButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Ausgaben",
  robots: { index: false, follow: false },
};

export default async function AusgabenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const jahr = new Date().getFullYear();
  const ausgaben = await listAusgaben();
  const { netto } = ausgabenJahr(ausgaben, jahr);

  return (
    <FinanzShell active="ausgaben" title="Ausgaben">
      <div style={{ marginBottom: 14, fontSize: 14, color: "#52525b" }}>
        Ausgaben {jahr} (netto): <strong style={{ color: "#0a0a0a" }}>{eur(netto)}</strong>
      </div>
      <AusgabeForm />

      {ausgaben.length === 0 ? (
        <div style={S.empty}>Noch keine Ausgaben erfasst.</div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead>
              <tr>{["Datum", "Lieferant", "Kategorie", "Beschreibung", "Netto", "Brutto", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {ausgaben.map((a) => (
                <tr key={a.id} style={S.tr}>
                  <td style={S.td}>{deDate(a.datum)}</td>
                  <td style={S.td}>{a.lieferant || "—"}</td>
                  <td style={S.td}>{a.kategorie || "—"}</td>
                  <td style={S.td}>{a.beschreibung || "—"}</td>
                  <td style={S.td}>{eur(a.betrag_netto)}</td>
                  <td style={S.td}>{eur(a.betrag_brutto)}</td>
                  <td style={{ ...S.td, textAlign: "right" }}><AusgabeDeleteButton id={a.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </FinanzShell>
  );
}

const S: Record<string, React.CSSProperties> = {
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15, marginTop: 16 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
};
