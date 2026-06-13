/**
 * Finanz-Modul-Rahmen im Accountable-Stil — zweistufige Navigation:
 *  - Primär-Sidebar (Desktop) bzw. Top-Nav (mobil): Start · Bank · Einnahmen · Ausgaben · Steuern
 *  - Sub-Tabs unter "Einnahmen": Rechnungen · Angebote · Kunden · Wiederkehrend · Preisliste
 * Responsive über app/finanzen/finanzen.css. Server-tauglich (nur Links);
 * Logout-Button ist client-seitig.
 */
import Link from "next/link";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/angebot/LogoutButton";
import "@/app/finanzen/finanzen.css";

export type FinanzSection = "start" | "bank" | "einnahmen" | "ausgaben" | "steuern";
export type EinnahmenTab = "rechnungen" | "angebote" | "kunden" | "wiederkehrend" | "preisliste";

const NAV: { key: FinanzSection; label: string; href: string; icon: string }[] = [
  { key: "start", label: "Start", href: "/finanzen", icon: "⌂" },
  { key: "bank", label: "Bank", href: "/finanzen/bank", icon: "🏦" },
  { key: "einnahmen", label: "Einnahmen", href: "/finanzen/rechnungen", icon: "↗" },
  { key: "ausgaben", label: "Ausgaben", href: "/finanzen/ausgaben", icon: "↙" },
  { key: "steuern", label: "Steuern", href: "/finanzen/steuern", icon: "⚖" },
];

const EINNAHMEN_TABS: { key: EinnahmenTab; label: string; href: string }[] = [
  { key: "rechnungen", label: "Rechnungen", href: "/finanzen/rechnungen" },
  { key: "angebote", label: "Angebote", href: "/angebot" },
  { key: "kunden", label: "Kunden", href: "/finanzen/kunden" },
  { key: "wiederkehrend", label: "Wiederkehrende Rechnungen", href: "/finanzen/wiederkehrend" },
  { key: "preisliste", label: "Preisliste", href: "/finanzen/preisliste" },
];

export default function FinanzShell({
  section,
  subTab,
  title,
  action,
  banner,
  children,
}: {
  section: FinanzSection;
  subTab?: EinnahmenTab;
  title: string;
  action?: React.ReactNode;
  /** Optionaler Voll-Header (z.B. grüner KPI-Streifen auf den Einnahmen-Seiten). Ersetzt die Standard-Titelzeile. */
  banner?: React.ReactNode;
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
            const on = n.key === section;
            return (
              <Link key={n.key} href={n.href} style={{ ...S.navItem, ...(on ? S.navItemOn : {}) }}>
                <span style={S.navIcon}>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="fin-sidebar-footer">
          <Link href="/finanzen/konto" style={S.footerLink}>⚙ Konto</Link>
          <Link href="/" style={S.footerLink}>← Zur Website</Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="fin-main">
        {banner ? (
          <div className="fin-banner">{banner}</div>
        ) : (
          <header className="fin-header">
            <h1 className="fin-h1">{title}</h1>
            {action ? <div>{action}</div> : null}
          </header>
        )}

        {section === "einnahmen" && (
          <nav className="fin-subnav">
            {EINNAHMEN_TABS.map((t) => {
              const on = t.key === subTab;
              return (
                <Link key={t.key} href={t.href} className={on ? "fin-subtab on" : "fin-subtab"}>
                  {t.label}
                </Link>
              );
            })}
          </nav>
        )}

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
  navIcon: { width: 18, textAlign: "center", fontSize: 14, opacity: 0.95 },
  footerLink: { fontSize: 13, color: "#71717a", textDecoration: "none", padding: "2px 8px" },
};
