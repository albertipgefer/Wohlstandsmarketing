/**
 * /angebot — Angebote-Liste (login-geschützt) im Finanz-Modul-Rahmen.
 * Editor liegt unter /angebot/neu (neu) bzw. /angebot/neu?id=… (bearbeiten).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote, dbReady, type AngebotStatus } from "@/lib/angebot/db";
import { eur, deDate } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Angebote",
  robots: { index: false, follow: false },
};

const STATUS_STYLE: Record<AngebotStatus, { bg: string; fg: string; label: string }> = {
  entwurf: { bg: "#f4f4f5", fg: "#52525b", label: "Entwurf" },
  gesendet: { bg: "#eff6ff", fg: "#1663de", label: "Abgesendet" },
  angesehen: { bg: "#fff7ed", fg: "#c2410c", label: "Angesehen" },
  angenommen: { bg: "#ecfdf3", fg: "#027a48", label: "Bestätigt" },
  abgelehnt: { bg: "#fef3f2", fg: "#b42318", label: "Abgelehnt" },
};

export default async function AngebotDashboard() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const angebote = await listAngebote();

  const action = (
    <Link href="/angebot/neu" style={S.newBtn}>+ Neues Angebot</Link>
  );

  return (
    <FinanzShell active="angebote" title="Angebote" action={action}>
      {!dbReady() && (
        <div style={S.warn}>
          ⚠️ Datenbank nicht verbunden (Env-Vars <code>ANGEBOT_SUPABASE_URL</code> /
          <code>ANGEBOT_SUPABASE_SERVICE_KEY</code> fehlen).
        </div>
      )}

      {angebote.length === 0 ? (
        <div style={S.empty}>
          Noch keine Angebote. Klick auf <strong>+ Neues Angebot</strong>, um loszulegen.
        </div>
      ) : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Nr.", "Kunde", "Betrag", "Status", "Fällig", "Erstellt", ""].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {angebote.map((a) => {
                const st = STATUS_STYLE[a.status] || STATUS_STYLE.entwurf;
                return (
                  <tr key={a.id} style={S.tr}>
                    <td style={S.td}>{a.nummer || "—"}</td>
                    <td style={S.td}>
                      <div style={{ fontWeight: 600 }}>{a.kunde_firma || "—"}</div>
                      <div style={{ fontSize: 12, color: "#a3a3a3" }}>{a.kunde_email || ""}</div>
                    </td>
                    <td style={S.td}>{eur(a.brutto)}</td>
                    <td style={S.td}>
                      <span style={{ ...S.badge, background: st.bg, color: st.fg }}>{st.label}</span>
                    </td>
                    <td style={S.td}>{a.gueltig_bis ? deDate(a.gueltig_bis) : "—"}</td>
                    <td style={S.td}>{deDate(a.created_at)}</td>
                    <td style={{ ...S.td, textAlign: "right", whiteSpace: "nowrap" }}>
                      <Link href={`/angebot/neu?id=${a.id}`} style={S.link}>Bearbeiten</Link>
                      {a.public_token && (
                        <a href={`/angebot/a/${a.public_token}`} target="_blank" rel="noreferrer" style={{ ...S.link, marginLeft: 12 }}>
                          Ansicht
                        </a>
                      )}
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
  newBtn: { background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700 },
  warn: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", borderRadius: 10, padding: "12px 16px", fontSize: 13.5, marginBottom: 20, lineHeight: 1.5 },
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15 },
  tableWrap: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "14px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
};
