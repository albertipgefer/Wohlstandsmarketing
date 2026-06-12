/**
 * /finanzen/rechnungen — Rechnungsliste (login-geschützt). Zeigt alle Rechnungen
 * mit Status, Fälligkeit, Betrag + Aktionen (Senden / Bezahlt / Mahnung).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listRechnungen, type RechnungStatus } from "@/lib/finanzen/db";
import { eur, deDate } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import RechnungActions from "@/components/finanzen/RechnungActions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Rechnungen",
  robots: { index: false, follow: false },
};

function effektiverStatus(status: RechnungStatus, faellig: string | null, heute: string): RechnungStatus {
  if (status === "offen" && faellig !== null && faellig < heute) return "ueberfaellig";
  return status;
}

const STATUS_STYLE: Record<RechnungStatus, { bg: string; fg: string; label: string }> = {
  entwurf: { bg: "#f4f4f5", fg: "#52525b", label: "Entwurf" },
  offen: { bg: "#eff6ff", fg: "#1663de", label: "Offen" },
  bezahlt: { bg: "#ecfdf3", fg: "#027a48", label: "Bezahlt" },
  ueberfaellig: { bg: "#fef3f2", fg: "#b42318", label: "Überfällig" },
  storniert: { bg: "#f4f4f5", fg: "#a1a1aa", label: "Storniert" },
};

export default async function RechnungenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const heute = new Date().toISOString().slice(0, 10);
  const rechnungen = await listRechnungen();

  const action = (
    <Link href="/finanzen/rechnungen/neu" style={S.newBtn}>+ Neue Rechnung</Link>
  );

  return (
    <FinanzShell active="rechnungen" title="Rechnungen" action={action}>
      {rechnungen.length === 0 ? (
        <div style={S.empty}>
          Noch keine Rechnungen. Sobald ein Angebot angenommen wird, entsteht hier
          automatisch ein <strong>Rechnungs-Entwurf</strong>.
        </div>
      ) : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Nr.", "Kunde", "Betrag", "Status", "Fällig", "Aktionen"].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rechnungen.map((r) => {
                const eff = effektiverStatus(r.status, r.faellig_am, heute);
                const st = STATUS_STYLE[eff] || STATUS_STYLE.entwurf;
                return (
                  <tr key={r.id} style={S.tr}>
                    <td style={S.td}>{r.nummer || <span style={{ color: "#a1a1aa" }}>Entwurf</span>}</td>
                    <td style={S.td}>
                      <div style={{ fontWeight: 600 }}>{r.kunde_firma || "—"}</div>
                      <div style={{ fontSize: 12, color: "#a3a3a3" }}>{r.kunde_email || ""}</div>
                    </td>
                    <td style={S.td}>{eur(r.brutto)}</td>
                    <td style={S.td}>
                      <span style={{ ...S.badge, background: st.bg, color: st.fg }}>{st.label}</span>
                      {r.mahnstufe > 0 && (
                        <span style={{ ...S.badge, background: "#fff7ed", color: "#c2410c", marginLeft: 6 }}>
                          Mahnstufe {r.mahnstufe}
                        </span>
                      )}
                    </td>
                    <td style={S.td}>{r.faellig_am ? deDate(r.faellig_am) : "—"}</td>
                    <td style={{ ...S.td, textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginBottom: 6 }}>
                        {r.status === "entwurf" && (
                          <Link href={`/finanzen/rechnungen/neu?id=${r.id}`} style={S.link}>Bearbeiten</Link>
                        )}
                        <a href={`/api/finanzen/pdf?rechnung=${r.id}`} target="_blank" rel="noreferrer" style={S.link}>PDF</a>
                        {r.public_token && (
                          <a href={`/finanzen/r/${r.public_token}`} target="_blank" rel="noreferrer" style={S.link}>Ansicht</a>
                        )}
                      </div>
                      <RechnungActions id={r.id} status={eff} />
                    </td>
                  </tr>
                );
              })}
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
