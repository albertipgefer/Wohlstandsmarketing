import Logo from "@/components/Logo";
import ReviewBadges from "@/components/ReviewBadges";
import LeadMagnetTrigger from "@/components/LeadMagnetTrigger";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface-2)]/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:px-12 md:py-18">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_0.9fr] lg:gap-12">
          {/* Brand — nur Logo, kein Schriftzug */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              aria-label="Wohlstandsmarketing Startseite"
              className="inline-flex items-center transition hover:opacity-80"
            >
              <Logo size={40} withWordmark={false} />
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[var(--text-muted)]">
              Webseiten, SEO, KI-Sichtbarkeit & Marketing — für planbar mehr
              Anfragen im Mittelstand.
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Albert Ipgefer · Raum Koblenz
            </p>
            <div className="mt-5">
              <ReviewBadges variant="compact" />
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Leistungen
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li><a href="/webdesign" className="transition hover:text-[var(--text)]">Webdesign</a></li>
              <li><a href="/seo" className="transition hover:text-[var(--text)]">SEO-Optimierung</a></li>
              <li><a href="/ki-sichtbarkeit" className="transition hover:text-[var(--text)]">KI-Sichtbarkeit</a></li>
              <li><a href="/content-marketing" className="transition hover:text-[var(--text)]">Content-Marketing</a></li>
              <li><a href="/e-mail-marketing" className="transition hover:text-[var(--text)]">E-Mail-Marketing</a></li>
              <li><a href="/ki-optimierung" className="transition hover:text-[var(--text)]">KI-Optimierung</a></li>
              <li><a href="/web-apps" className="transition hover:text-[var(--text)]">Web-Apps & Automatisierung</a></li>
              <li>
                <a href="/leistungen" className="font-semibold text-[var(--accent)] transition hover:opacity-80">
                  Alle Leistungen →
                </a>
              </li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Unternehmen
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li><a href="/#methode" className="transition hover:text-[var(--text)]">Methode</a></li>
              <li><a href="/branchen" className="transition hover:text-[var(--text)]">Branchen</a></li>
              <li><a href="/standorte" className="transition hover:text-[var(--text)]">Standorte</a></li>
              <li><a href="/blog" className="transition hover:text-[var(--text)]">Blog</a></li>
              <li><a href="/bewertungen" className="transition hover:text-[var(--text)]">Bewertungen</a></li>
              <li><a href="/preise" className="transition hover:text-[var(--text)]">Angebot</a></li>
              <li><a href="/#faq" className="transition hover:text-[var(--text)]">FAQ</a></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Kontakt
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                {/* Sitewide NAP — konsistent zu Schema + Impressum (lokales SEO / KI-Suche) */}
                <address className="not-italic leading-relaxed">
                  Wohlstandsmarketing
                  <br />
                  Vor der Loos 4e
                  <br />
                  56130 Bad Ems
                </address>
              </li>
              <li><a href="tel:+4917622787559" className="transition hover:text-[var(--text)]">+49 176 227 87 559</a></li>
              <li><a href="mailto:info@wohlstandsmarketing.de" className="break-all transition hover:text-[var(--text)]">info@wohlstandsmarketing.de</a></li>
              <li>
                <a href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2" className="transition hover:text-[var(--text)]">
                  Erstgespräch buchen
                </a>
              </li>
              <li>
                <a href="https://kundenbereich.wohlstandsmarketing.de/" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--text)]">
                  Kundenbereich ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Ressourcen + Rechtliches */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Ressourcen
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li><a href="/sichtbarkeits-check" className="transition hover:text-[var(--text)]">KI-Check</a></li>
              <li>
                <LeadMagnetTrigger source="footer" className="cursor-pointer text-left transition hover:text-[var(--text)]">
                  11 Marketing-Fehler (PDF) →
                </LeadMagnetTrigger>
              </li>
            </ul>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Rechtliches
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li><a href="/impressum" className="transition hover:text-[var(--text)]">Impressum</a></li>
              <li><a href="/datenschutz" className="transition hover:text-[var(--text)]">Datenschutz</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-[11px] text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
          <p>© {year} Wohlstandsmarketing · Albert Ipgefer</p>
          <p>Raum Koblenz · Made with ♥</p>
        </div>
      </div>
    </footer>
  );
}
