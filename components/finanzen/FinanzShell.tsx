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

const NAV: { key: FinanzSection; label: string; href: string }[] = [
  { key: "start", label: "Start", href: "/finanzen" },
  { key: "bank", label: "Bank", href: "/finanzen/bank" },
  { key: "einnahmen", label: "Einnahmen", href: "/finanzen/rechnungen" },
  { key: "ausgaben", label: "Ausgaben", href: "/finanzen/ausgaben" },
  { key: "steuern", label: "Steuern", href: "/finanzen/steuern" },
];

/** Einheitliche, monochrome Line-Icons (gleicher Stroke-Stil für alle Nav-Punkte). */
function NavIcon({ name }: { name: FinanzSection }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "start":
      return (<svg {...common}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>);
    case "bank":
      return (<svg {...common}><path d="M3 10l9-6 9 6" /><path d="M4 10h16" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" /><path d="M3 21h18" /></svg>);
    case "einnahmen":
      return (<svg {...common}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>);
    case "ausgaben":
      return (<svg {...common}><path d="M17 7L7 17" /><path d="M16 17H7V8" /></svg>);
    case "steuern":
      return (<svg {...common}><path d="M12 3v18" /><path d="M5 7h14" /><path d="M5 7l-2 6h4l-2-6z" /><path d="M19 7l-2 6h4l-2-6z" /><path d="M8 21h8" /></svg>);
  }
}

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
                <span style={S.navIcon}><NavIcon name={n.key} /></span>
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
  navIcon: { width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: 0.95 },
  footerLink: { fontSize: 13, color: "#71717a", textDecoration: "none", padding: "2px 8px" },
};
