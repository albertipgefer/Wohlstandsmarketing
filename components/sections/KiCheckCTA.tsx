import Link from "next/link";

/**
 * CTA-Sektion auf der Startseite, die zum Free-Tool /sichtbarkeits-check leitet.
 * Lead-Magnet-Hook: schneller, kostenloser Mehrwert.
 */
export default function KiCheckCTA() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--text)] py-20 md:py-28">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(22,99,222,0.30)_0%,rgba(22,99,222,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(219,111,22,0.22)_0%,rgba(219,111,22,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 md:px-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          <span className="font-semibold text-[var(--gold)]">Free Tool</span>
          <span className="text-white/40">·</span>
          Kostenlos · Keine Anmeldung
        </span>

        <h2
          className="mt-7 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Wird deine Webseite von{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--gold)]">
              ChatGPT
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
                opacity="0.95"
              />
            </svg>
          </span>{" "}
          empfohlen?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-[17px]">
          Der 60-Sekunden-Check zeigt dir, wie sichtbar deine Seite für ChatGPT,
          Claude, Perplexity und Google ist — inkl. Score und 3 konkreter Hebel
          zum Sofort-Umsetzen.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sichtbarkeits-check"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-[var(--text)] transition hover:text-white"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark,_#0a4bb8)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Kostenlosen Check starten</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <span className="text-[12px] text-white/40">
            Dauer ~60 Sekunden · Keine Anmeldung nötig
          </span>
        </div>

        {/* Mini-Trust-Row */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> 20+ Prüfpunkte
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Echte Live-Analyse
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Lighthouse + Schema + robots.txt
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Score 0–100
          </span>
        </div>
      </div>
    </section>
  );
}
