import Link from "next/link";
import ReviewBadges from "@/components/ReviewBadges";

type Crumb = { label: string; href?: string };

/**
 * Zentrierter Hero für alle Branchen-Seiten — orientiert am Stil der Preise-/KI-Check-Seite:
 * auf Mobile + iPad zentriert (items-center/text-center), ab lg linksbündig.
 * Trust-Bullets-Reihe + ReviewBadges, kein Foto.
 */
export default function BranchenHero({
  breadcrumb,
  eyebrowAccent,
  eyebrowRest,
  h1Lead,
  h1Accent,
  h1Tail,
  subline,
  secondaryHref,
  secondaryLabel,
}: {
  breadcrumb: Crumb[];
  eyebrowAccent: string;
  eyebrowRest: string;
  h1Lead: string;
  h1Accent: string;
  h1Tail: string;
  subline: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  const trust = [
    "In 7 Tagen live",
    "Google + ChatGPT",
    "Ergebnis-Garantie",
    "Albert persönlich",
  ];
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 md:px-12 lg:items-start lg:text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-2 text-[12px] text-[var(--text-subtle)] lg:justify-start">
          {breadcrumb.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-[var(--text)]">{c.label}</Link>
              ) : (
                <span className="text-[var(--text)]">{c.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="font-semibold text-[var(--accent)]">{eyebrowAccent}</span>
          <span className="text-[var(--text-subtle)]">·</span>
          {eyebrowRest}
        </div>

        {/* H1 */}
        <h1
          className="mt-6 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.04] tracking-[-0.04em] text-[var(--text)]"
          style={{ fontSize: "clamp(2rem, 5.2vw, 3.5rem)" }}
        >
          {h1Lead}{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              {h1Accent}
            </span>
            <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none" aria-hidden>
              <path d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4" stroke="#db6f16" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            </svg>
          </span>{" "}
          {h1Tail}
        </h1>

        {/* Subline */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          {subline}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3">
          <Link
            href="/#strategie"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Erstgespräch sichern</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={secondaryHref}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent"
          >
            <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors group-hover:text-white">{secondaryLabel}</span>
          </Link>
        </div>

        {/* Hint */}
        <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">
          15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich
        </p>

        {/* Trust-Bullets-Reihe */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[var(--text-muted)] lg:justify-start">
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> {t}
            </span>
          ))}
        </div>

        {/* Trust-Badges (Google + Trustpilot) */}
        <div className="mt-5 w-full">
          <ReviewBadges variant="pill" centerOnMobile />
        </div>
      </div>
    </section>
  );
}
