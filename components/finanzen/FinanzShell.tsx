/**
 * Finanz-Modul-Rahmen im Accountable-Stil: helle Sidebar links mit Navigation,
 * Content rechts. Wird von allen /finanzen-Seiten (und vom Angebote-Dashboard)
 * genutzt, damit das Modul wie EIN Produkt wirkt.
 *
 * Server-Component-tauglich (nur Links); der Logout-Button ist client-seitig.
 */
import Link from "next/link";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/angebot/LogoutButton";

export type FinanzTab = "uebersicht" | "angebote" | "rechnungen" | "wiederkehrend" | "kunden";

const NAV: { key: FinanzTab; label: string; href: string; icon: string }[] = [
  { key: "uebersicht", label: "Übersicht", href: "/finanzen", icon: "▦" },
  { key: "angebote", label: "Angebote", href: "/angebot", icon: "✎" },
  { key: "rechnungen", label: "Rechnungen", href: "/finanzen/rechnungen", icon: "₂" },
  { key: "wiederkehrend", label: "Wiederkehrend", href: "/finanzen/wiederkehrend", icon: "↻" },
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
    <div style={S.root}>
      <aside style={S.sidebar}>
        <div style={S.brandRow}>
          <Logo size={30} withWordmark={false} />
          <span style={S.brandText}>Finanzen</span>
        </div>
        <nav style={S.nav}>
          {NAV.map((n) => {
            const on = n.key === active;
            return (
              <Link
                key={n.key}
                href={n.href}
                style={{ ...S.navItem, ...(on ? S.navItemOn : {}) }}
              >
                <span style={S.navIcon}>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div style={S.sidebarFooter}>
          <Link href="/" style={S.footerLink}>← Zur Website</Link>
          <LogoutButton />
        </div>
      </aside>

      <main style={S.main}>
        <header style={S.header}>
          <h1 style={S.h1}>{title}</h1>
          {action ? <div>{action}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
}

const ACCENT = "#1663de";

const S: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "232px 1fr",
    background: "#f6f7f9",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    color: "#0a0a0a",
  },
  sidebar: {
    borderRight: "1px solid #ececf0",
    background: "#fff",
    padding: "22px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  brandRow: { display: "flex", alignItems: "center", gap: 10, padding: "4px 8px" },
  brandText: { fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px" },
  nav: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 14.5,
    fontWeight: 600,
    color: "#3f3f46",
    textDecoration: "none",
  },
  navItemOn: { background: "#eef3fd", color: ACCENT },
  navIcon: { width: 18, textAlign: "center", fontSize: 14, opacity: 0.85 },
  sidebarFooter: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 14,
    borderTop: "1px solid #f0f0f2",
  },
  footerLink: { fontSize: 13, color: "#71717a", textDecoration: "none", padding: "2px 8px" },
  main: { padding: "28px 32px", maxWidth: 1180, width: "100%" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  h1: { fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" },
};
