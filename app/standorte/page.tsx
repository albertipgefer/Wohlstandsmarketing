import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/content/cities";
import BlogNav from "@/components/blog/BlogNav";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/sections/Footer";

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  title: "Standorte — Webdesign + KI-Sichtbarkeit für DACH",
  description:
    "Webseiten mit KI-Sichtbarkeit für Mittelstand in DACH — Bad Ems, Koblenz, Frankfurt, Mainz, Wiesbaden, Köln, Düsseldorf, Aachen und mehr. Online & remote.",
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE },
      { "@type": "ListItem", position: 2, name: "Standorte", item: `${SITE}/standorte` },
    ],
  };

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogNav />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-[12px] text-[var(--text-subtle)]"
          >
            <Link href="/" className="hover:text-[var(--text)]">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-[var(--text)]">Standorte</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--gold)]">Standorte</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Webdesign + KI-Sichtbarkeit in DACH
          </div>

          <h1
            className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            Online &amp; remote{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                für ganz DACH
              </span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="12"
                viewBox="0 0 360 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8C 90 2, 180 10, 270 5 S 350 7, 358 4"
                  stroke="#db6f16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Unser Sitz ist in Bad Ems — gearbeitet wird ausschließlich online und
            remote. Klare Prozesse, Google Meet und WhatsApp ersetzen Vor-Ort-Termine.
            Aktiv für Mittelstand in <strong>{cities.length} Regionen</strong> — von
            Rheinland-Pfalz und Hessen über NRW bis ins Saarland und Baden-Württemberg.
          </p>
        </div>
      </section>

      {/* ── STÄDTE-GRID ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/webdesign/${city.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(22,99,222,0.25)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    {city.state}
                  </span>
                  {city.distanceFromHq === 0 && (
                    <span className="rounded-full bg-[var(--accent-glow-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--accent)]">
                      Hauptsitz
                    </span>
                  )}
                </div>

                <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
                  {city.name}
                </h2>
                <p className="mt-1 text-[12px] text-[var(--text-subtle)]">
                  {city.region}
                </p>

                <p className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                  {city.intro}
                </p>

                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    Branchen-Schwerpunkte
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {city.industries.slice(0, 3).map((ind) => (
                      <span
                        key={ind}
                        className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--text-muted)]"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2">
                  Webdesign in {city.name}
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer-CTA — konsistenter Stil mit Blog-Artikeln und Stadt-Pages */}
      <PreFooterCTA
        variant="erstgespraech"
        headline={
          <>
            Lass uns über deine <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">Sichtbarkeit</span> sprechen.
          </>
        }
        subline="Egal ob deine Stadt oben aufgeführt ist oder nicht — wir prüfen gemeinsam die Passung. 15-Minuten-Erstgespräch, kostenfrei, mit konkretem Plan."
      />

      <Footer />
    </main>
  );
}
