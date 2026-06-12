/**
 * Finanz-Modul-Rahmen im Accountable-Stil: Sidebar-Nav (Desktop) bzw. Top-Nav
 * (mobil) + Content. Responsive über app/finanzen/finanzen.css. Server-tauglich
 * (nur Links); Logout-Button ist client-seitig.
 */
import Link from "next/link";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/angebot/LogoutButton";
import "@/app/finanzen/finanzen.css";

export type FinanzTab = "uebersicht" | "angebote" | "rechnungen" | "wiederkehrend" | "ausgaben" | "kunden";

const NAV: { key: FinanzTab; label: string; href: string; icon: string }[] = [
  { key: "uebersicht", label: "Übersicht", href: "/finanzen", icon: "▦" },
  { key: "angebote", label: "Angebote", href: "/angebot", icon: "✎" },
  { key: "rechnungen", label: "Rechnungen", href: "/finanzen/rechnungen", icon: "₂" },
  { key: "wiederkehrend", label: "Wiederkehrend", href: "/finanzen/wiederkehrend", icon: "↻" },
  { key: "ausgaben", label: "Ausgaben", href: "/finanzen/ausgaben", icon: "↧" },
  { key: "kunden", label: "Kunden", href: "/finanzen/kunden", icon: "☺" },
];

export default function FinanzShell({
  active,
  title,
  action,
  children,
}: {
  active: FinanzTab;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="fin-root">
      <aside className="fin-sidebar">
        <div style={S.brandRow}>
          <Logo size={30} withWordmark={false} />
          <span className="fin-brandtext" style={S.brandText}>Finanzen</span>
        </div>
        <nav className="fin-nav">
          {NAV.map((n) => {
            const on = n.key === active;
            return (
              <Link key={n.key} href={n.href} style={{ ...S.navItem, ...(on ? S.navItemOn : {}) }}>
                <span style={S.navIcon}>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="fin-sidebar-footer">
          <Link href="/" style={S.footerLink}>← Zur Website</Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="fin-main">
        <header className="fin-header">
          <h1 className="fin-h1">{title}</h1>
          {action ? <div>{action}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
}

const ACCENT = "#1663de";
const S: Record<string, React.CSSProperties> = {
  brandRow: { display: "flex", alignItems: "center", gap: 10, padding: "4px 8px" },
  brandText: { fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px" },
  navItem: { display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, fontSize: 14.5, fontWeight: 600, color: "#3f3f46", textDecoration: "none" },
  navItemOn: { background: "#eef3fd", color: ACCENT },
  navIcon: { width: 18, textAlign: "center", fontSize: 14, opacity: 0.85 },
  footerLink: { fontSize: 13, color: "#71717a", textDecoration: "none", padding: "2px 8px" },
};
