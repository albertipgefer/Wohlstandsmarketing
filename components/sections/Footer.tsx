import Link from "next/link";
import Logo from "@/components/Logo";
import ReviewBadges from "@/components/ReviewBadges";
import LeadMagnetTrigger from "@/components/LeadMagnetTrigger";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface-2)]/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Wohlstandsmarketing Startseite"
              className="inline-flex items-center transition hover:opacity-80"
            >
              <Logo size={36} />
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[var(--text-muted)]">
              Die WSM-Methode: Webdesign &amp; KI-Sichtbarkeit als ein
              untrennbares Paket. Für lokalen Mittelstand in DACH.
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Albert Ipgefer · Raum Koblenz
            </p>

            {/* Bewertungen Trust-Signal: Google + Trustpilot */}
            <div className="mt-5">
              <ReviewBadges variant="compact" />
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Seite
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a
                  href="/#methode"
                  className="transition hover:text-[var(--text)]"
                >
                  Methode
                </a>
              </li>
              <li>
                <a href="/#cases" className="transition hover:text-[var(--text)]">
                  Cases
                </a>
              </li>
              <li>
                <a
                  href="/#leistungen"
                  className="transition hover:text-[var(--text)]"
                >
                  Leistungen
                </a>
              </li>
              <li>
                <a href="/blog" className="transition hover:text-[var(--text)]">
                  Blog
                </a>
              </li>
              <li>
                <a href="/bewertungen" className="transition hover:text-[var(--text)]">
                  Bewertungen
                </a>
              </li>
              <li>
                <a href="/#faq" className="transition hover:text-[var(--text)]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Leistungen — Service-Hubs */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Leistungen
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a href="/webdesign" className="transition hover:text-[var(--text)]">
                  Webdesign
                </a>
              </li>
              <li>
                <a href="/ki-sichtbarkeit" className="transition hover:text-[var(--text)]">
                  KI-Sichtbarkeit
                </a>
              </li>
              <li>
                <a href="/seo" className="transition hover:text-[var(--text)]">
                  SEO-Optimierung
                </a>
              </li>
              <li>
                <a href="/relaunch" className="transition hover:text-[var(--text)]">
                  Webseiten-Relaunch
                </a>
              </li>
              <li>
                <a href="/preise" className="transition hover:text-[var(--text)]">
                  Preise & Pakete
                </a>
              </li>
              <li>
                <a href="/standorte" className="transition hover:text-[var(--text)]">
                  Standorte
                </a>
              </li>
            </ul>

            {/* Vergleiche — Bottom-of-Funnel-Entscheidungshilfen */}
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Vergleiche
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a href="/vergleich/seo-vs-ki-sichtbarkeit" className="transition hover:text-[var(--text)]">
                  SEO vs. KI-Sichtbarkeit
                </a>
              </li>
              <li>
                <a href="/vergleich/landingpage-vs-unternehmenswebsite" className="transition hover:text-[var(--text)]">
                  Landingpage vs. Website
                </a>
              </li>
              <li>
                <a href="/vergleich/relaunch-vs-neue-webseite" className="transition hover:text-[var(--text)]">
                  Relaunch vs. Neubau
                </a>
              </li>
              <li>
                <a href="/vergleich/agentur-vs-inhouse-seo" className="transition hover:text-[var(--text)]">
                  SEO: selbst vs. Agentur
                </a>
              </li>
            </ul>
          </div>

          {/* Assets — kostenlose Tools + Lead-Magnets */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Assets
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a
                  href="/sichtbarkeits-check"
                  className="transition hover:text-[var(--text)]"
                >
                  KI-Sichtbarkeits-Check
                </a>
              </li>
              <li>
                <LeadMagnetTrigger
                  source="footer"
                  className="cursor-pointer text-left transition hover:text-[var(--text)]"
                >
                  11 Marketing-Fehler (PDF) →
                </LeadMagnetTrigger>
              </li>
              <li>
                <a
                  href="/blog"
                  className="transition hover:text-[var(--text)]"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Kontakt
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a
                  href="mailto:info@wohlstandsmarketing.de"
                  className="transition hover:text-[var(--text)]"
                >
                  info@wohlstandsmarketing.de
                </a>
              </li>
              <li>
                <a
                  href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
                  className="transition hover:text-[var(--text)]"
                >
                  Erstgespräch buchen
                </a>
              </li>
              <li>
                <a
                  href="https://wohlstandsmarketing.de"
                  className="transition hover:text-[var(--text)]"
                >
                  Hauptseite
                </a>
              </li>
              <li>
                <a
                  href="https://kundenbereich.wohlstandsmarketing.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[var(--text)]"
                >
                  Kundenbereich ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Standorte */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Standorte
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a href="/webdesign/bad-ems" className="transition hover:text-[var(--text)]">
                  Bad Ems
                </a>
              </li>
              <li>
                <a href="/webdesign/koblenz" className="transition hover:text-[var(--text)]">
                  Koblenz
                </a>
              </li>
              <li>
                <a href="/webdesign/montabaur" className="transition hover:text-[var(--text)]">
                  Montabaur
                </a>
              </li>
              <li>
                <a href="/webdesign/frankfurt" className="transition hover:text-[var(--text)]">
                  Frankfurt
                </a>
              </li>
              <li>
                <a href="/webdesign/bonn" className="transition hover:text-[var(--text)]">
                  Bonn
                </a>
              </li>
              <li>
                <a href="/webdesign/koeln" className="transition hover:text-[var(--text)]">
                  Köln
                </a>
              </li>
              <li>
                <a href="/standorte" className="font-semibold text-[var(--accent)] transition hover:opacity-80">
                  Alle Standorte →
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Rechtliches
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[var(--text-muted)]">
              <li>
                <a
                  href="/impressum"
                  className="transition hover:text-[var(--text)]"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="transition hover:text-[var(--text)]"
                >
                  Datenschutz
                </a>
              </li>
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
