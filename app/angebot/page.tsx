/**
 * /angebot — Dashboard (login-geschützt): alle Angebote mit Status.
 * Editor liegt unter /angebot/neu (neu) bzw. /angebot/neu?id=… (bearbeiten).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote, dbReady, type AngebotStatus } from "@/lib/angebot/db";
import { eur, deDate } from "@/lib/angebot/format";
import LogoutButton from "@/components/angebot/LogoutButton";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Angebote — Dashboard",
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

  return (
    <main style={S.main}>
      <div style={S.wrap}>
        <header style={S.header}>
          <div>
            <Logo size={34} withWordmark={false} />
            <h1 style={S.h1}>Angebote</h1>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/angebot/neu" style={S.newBtn}>+ Neues Angebot</Link>
            <LogoutButton />
          </div>
        </header>

        {!dbReady() && (
          <div style={S.warn}>
            ⚠️ Datenbank nicht verbunden (Env-Vars <code>ANGEBOT_SUPABASE_URL</code> /
            <code>ANGEBOT_SUPABASE_SERVICE_KEY</code> fehlen). Speichern/Senden funktioniert
            erst, sobald sie gesetzt sind.
          </div>
        )}

        {angebote.length === 0 ? (
          <div style={S.empty}>
            Noch keine Angebote. Klick auf <strong>+ Neues Angebot</strong>, um loszulegen.
          </div>
        ) : (
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
        )}
      </div>
    </main>
  );
}

const S: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "#fafafa", fontFamily: "var(--font-inter), system-ui, sans-serif", color: "#0a0a0a", padding: "32px 24px" },
  wrap: { maxWidth: 1000, margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  brand: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.2px" },
  h1: { fontSize: 28, fontWeight: 800, margin: "6px 0 0" },
  newBtn: { background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700 },
  warn: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", borderRadius: 10, padding: "12px 16px", fontSize: 13.5, marginBottom: 20, lineHeight: 1.5 },
  empty: { background: "#fff", border: "1px solid #ececec", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15 },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #ececec", borderRadius: 14, overflow: "hidden" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "14px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
};
