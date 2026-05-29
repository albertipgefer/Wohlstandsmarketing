import Link from "next/link";
import { cities } from "@/content/cities";

/**
 * Internal-linking block on every blog article: surfaces all 6 city money-pages
 * + the Standorte hub. Lifts topical authority for the city pages (which get
 * very few inbound links from external sites) and gives Google a clear cluster
 * signal: "content articles ↔ commercial location pages, all by the same brand".
 */
export default function RegionLinks() {
  return (
    <section
      aria-labelledby="region-links-heading"
      className="border-t border-[var(--border)] py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
          Webdesign + KI-Sichtbarkeit in deiner Region
        </p>
        <h2
          id="region-links-heading"
          className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl"
        >
          Vor Ort für DACH-Mittelstand
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
          Aktiv in {cities.length} Städten — Sitz in Bad Ems, Termine vor Ort
          oder remote.
        </p>

        <div className="mt-7 flex flex-col items-start gap-2.5 lg:flex-row lg:flex-wrap lg:items-center">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/webdesign/${c.slug}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Webdesign in {c.name}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          ))}
          <Link
            href="/standorte"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-[var(--accent)] hover:underline"
          >
            Alle Standorte →
          </Link>
        </div>
      </div>
    </section>
  );
}
