import type { Metadata } from "next";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";
import KiCheckTool from "@/components/ki-check/KiCheckTool";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";

export const metadata: Metadata = {
  title: "KI-Sichtbarkeits-Check — kostenlos prüfen",
  description:
    "Kostenloser Check: Wie sichtbar ist deine Webseite für ChatGPT, Claude und Perplexity? Score 0–100 + die 3 wichtigsten Hebel direkt per Mail.",
  alternates: { canonical: "/sichtbarkeits-check" },
  openGraph: {
    title: "KI-Sichtbarkeits-Check — Wohlstandsmarketing",
    description:
      "Wird deine Webseite von ChatGPT, Claude & Perplexity empfohlen? Mach den kostenlosen Check.",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export default function SichtbarkeitsCheckPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      {/* HERO */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[640px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 md:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/80 px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-semibold text-[var(--accent)]">Free Tool</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Kostenlos · Keine Anmeldung
          </span>
          <h1
            className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.04] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.25rem)" }}
          >
            Wird deine Webseite von{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
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
                  opacity="0.9"
                />
              </svg>
            </span>{" "}
            empfohlen?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)] md:text-[17px]">
            Der 60-Sekunden-Check zeigt dir, wie gut deine Seite von ChatGPT,
            Claude, Perplexity und Google verstanden wird — inkl. Score und
            3 konkreten Hebeln zum Sofort-Umsetzen.
          </p>

          {/* Trust-Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> 20+ Prüfpunkte
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Echte Live-Analyse
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> Score 0–100
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> 100 % kostenlos
            </span>
          </div>

          {/* Google-Bewertungen */}
          <div className="mt-6 flex justify-center">
            <GoogleReviewsBadge variant="pill" />
          </div>
        </div>
      </section>

      {/* TOOL + HOW IT WORKS (How-It-Works ist im Tool integriert, verschwindet nach Check) */}
      <section className="relative px-4 pb-24 sm:px-6 md:px-12 md:pb-32">
        <KiCheckTool />
      </section>

      <Footer />
    </main>
  );
}
