import type { Metadata } from "next";
import { posts, CATEGORIES } from "@/content/blog";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogNav from "@/components/blog/BlogNav";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — KI-Sichtbarkeit, GEO & AEO · Wohlstandsmarketing",
  description:
    "Praxisartikel zu Webdesign, KI-Sichtbarkeit (GEO/AEO), ChatGPT-SEO und lokalem Marketing für DACH-Mittelstand. Von Albert Ipgefer.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const allMeta = posts.map((p) => p.meta);

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <BlogNav />

      {/* Hero strip */}
      <section className="relative overflow-hidden border-b border-[var(--border)] pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            <span className="font-semibold text-[var(--gold)]">Blog</span>
            <span className="text-[var(--text-subtle)]">·</span>
            Insights zu Webdesign &amp; KI-Sichtbarkeit
          </span>
          <h1
            className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            Wissen für{" "}
            <span className="relative inline-block">
              <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                planbare Sichtbarkeit
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
            </span>{" "}
            auf Google &amp; KI.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            Praxisartikel rund um Webdesign, KI-Sichtbarkeit, GEO/AEO und
            lokalen Mittelstand. Ohne Marketing-Bullshit, mit konkreten
            Hebeln und Beispielen.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
          <CategoryFilter posts={allMeta} categories={CATEGORIES} />
        </div>
      </section>

      {/* Newsletter / CTA strip */}
      <section className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
            Du willst nichts verpassen?
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Lieber direkt mit Albert sprechen?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            In 15 Minuten zeigen wir dir, wo du bei Google und KI heute
            stehst — und was die nächsten Schritte sind. Kostenfrei.
          </p>
          <Link
            href="/#strategie"
            className="group relative mt-8 inline-flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-9 py-5 text-base font-semibold text-white shadow-[0_14px_40px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_18px_50px_-10px_rgba(22,99,222,0.8)] sm:w-auto"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Erstgespräch sichern</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
