import Link from "next/link";
import { cities } from "@/content/cities";

/**
 * Standorte-Sektion auf der Startseite.
 * SEO-Zweck: Verlinkt prominent auf alle 6 Stadt-Pages aus dem Content
 * (nicht nur Footer) — verteilt Link-Power von der Top-Page auf die
 * lokalen Geld-Seiten mit keyword-starken Anchor-Texten.
 */
export default function StandorteSektion() {
  return (
    <section
      id="standorte"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] py-24 md:py-32"
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(22,99,222,0.10)_0%,rgba(22,99,222,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] bg-[radial-gradient(circle,rgba(219,111,22,0.08)_0%,rgba(219,111,22,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-semibold text-[var(--accent)]">Standorte</span>
              <span className="text-[var(--text-subtle)]">·</span>
              Regional verankert · Bundesweit aktiv
            </span>
            <h2
              className="mt-6 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
              style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)" }}
            >
              Webdesign &amp; KI-Sichtbarkeit{" "}
              <span className="relative inline-block">
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  in deiner Region
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8C 50 2, 100 10, 150 5 S 195 7, 198 4"
                    stroke="#db6f16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </svg>
              </span>
              .
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[16px]">
              Unser Sitz liegt in Bad Ems — wir betreuen Mittelstand in der
              gesamten Rhein-Lahn-, Mittelrhein- und Rhein-Main-Region. Klicke
              auf deine Stadt für lokale Cases, Branchen und Preise.
            </p>
          </div>
          <div className="hidden flex-col items-end gap-3 md:flex">
            <Link
              href="/webdesign"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[var(--accent)]"
            >
              Zur Service-Seite Webdesign
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/standorte"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
            >
              Alle Standorte
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>

        {/* Grid — auf der Startseite nur die ersten 6 Städte (HQ-Region).
            Alle Standorte sieht der User auf /standorte. */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-3">
          {cities.slice(0, 6).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/webdesign/${c.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_10px_36px_-10px_rgba(22,99,222,0.25)] md:p-7"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {c.region}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-[var(--text)] md:text-[26px]">
                    Webdesign {c.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                    {c.intro.length > 130 ? c.intro.slice(0, 127) + "…" : c.intro}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[13px] font-semibold text-[var(--accent)]">
                  <span>Zur Stadt-Seite</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── KI-SICHTBARKEIT × STADT — neuronale Verlinkung ───────── */}
        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/40 p-6 sm:p-8 md:mt-16">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Auch verfügbar
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl">
                KI-Sichtbarkeit in deiner Stadt
              </h3>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)]">
                Auf ChatGPT, Perplexity, Claude und Google AI Overviews als erste
                Wahl empfohlen — lokal verankert in deiner Region:
              </p>
            </div>
            <Link
              href="/ki-sichtbarkeit"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent)]"
            >
              Zur Service-Seite
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {cities.slice(0, 6).map((c) => (
              <Link
                key={`ki-pill-${c.slug}`}
                href={`/ki-sichtbarkeit/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
              >
                KI-Sichtbarkeit in {c.name}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
            <Link
              href="/standorte"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              Alle {cities.length} Standorte →
            </Link>
          </div>
        </div>

        {/* ── SEO × STADT — neuronale Verlinkung ───────────────────── */}
        <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/40 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-text)]">
                Auch verfügbar
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl">
                SEO-Optimierung in deiner Stadt
              </h3>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-muted)]">
                Technisches SEO, lokales SEO und Content-Cluster — in 90 Tagen
                sichtbar für die Money-Keywords deiner Region:
              </p>
            </div>
            <Link
              href="/seo"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent)]"
            >
              Zur Service-Seite
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {cities.slice(0, 6).map((c) => (
              <Link
                key={`seo-pill-${c.slug}`}
                href={`/seo/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
              >
                SEO in {c.name}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
            <Link
              href="/standorte"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              Alle {cities.length} Standorte →
            </Link>
          </div>
        </div>

        {/* Mobile-only link */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/standorte"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
          >
            Alle Standorte ansehen
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
