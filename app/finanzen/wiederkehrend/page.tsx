/**
 * /finanzen/wiederkehrend — wiederkehrende Rechnungen (Retainer) verwalten.
 * Der Finanz-Cron erzeugt ab "nächste Rechnung am" automatisch Rechnungs-Entwürfe.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listWiederkehrend } from "@/lib/finanzen/recurring";
import { eur, deDate } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Wiederkehrend",
  robots: { index: false, follow: false },
};

const INTERVALL_LABEL: Record<string, string> = {
  monatlich: "monatlich",
  quartalsweise: "quartalsweise",
  jaehrlich: "jährlich",
};

export default async function WiederkehrendSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const items = await listWiederkehrend();

  const action = <Link href="/finanzen/wiederkehrend/neu" style={S.newBtn}>+ Neue Vorlage</Link>;

  return (
    <FinanzShell active="wiederkehrend" title="Wiederkehrende Rechnungen" action={action}>
      {items.length === 0 ? (
        <div style={S.empty}>
          Noch keine wiederkehrenden Rechnungen. Lege eine Vorlage an (z. B. Retainer) —
          der tägliche Finanz-Lauf erzeugt daraus automatisch Rechnungs-Entwürfe.
        </div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead>
              <tr>{["Bezeichnung", "Kunde", "Betrag", "Intervall", "Nächste", "Status", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {items.map((w) => (
                <tr key={w.id} style={S.tr}>
                  <td style={S.td}>{w.bezeichnung || "—"}</td>
                  <td style={S.td}>
                    <div style={{ fontWeight: 600 }}>{w.kunde_firma || "—"}</div>
                    <div style={{ fontSize: 12, color: "#a3a3a3" }}>{w.kunde_email || ""}</div>
                  </td>
                  <td style={S.td}>{eur(w.brutto)}</td>
                  <td style={S.td}>{INTERVALL_LABEL[w.intervall] || w.intervall}</td>
                  <td style={S.td}>{deDate(w.naechste_faelligkeit)}</td>
                  <td style={S.td}>
                    <span style={{ ...S.badge, ...(w.aktiv ? { background: "#ecfdf3", color: "#027a48" } : { background: "#f4f4f5", color: "#a1a1aa" }) }}>
                      {w.aktiv ? "aktiv" : "pausiert"}
                    </span>
                  </td>
                  <td style={{ ...S.td, textAlign: "right" }}>
                    <Link href={`/finanzen/wiederkehrend/neu?id=${w.id}`} style={S.link}>Bearbeiten</Link>
                  </td>
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
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15, lineHeight: 1.6 },
  tableWrap: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
  newBtn: { background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700 },
};
