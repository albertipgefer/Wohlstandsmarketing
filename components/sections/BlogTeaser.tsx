import Link from "next/link";
import { posts } from "@/content/blog";
import PostCard from "@/components/blog/PostCard";

export default function BlogTeaser() {
  // 6 Posts statt 3 — verteilt Link-Power von Startseite auf mehr Artikel.
  // Mix aus Top-Popularität + neuesten, dedupliziert.
  const byPopularity = [...posts]
    .sort((a, b) => (b.meta.popularity ?? 0) - (a.meta.popularity ?? 0))
    .slice(0, 3);
  const featuredSlugs = new Set(byPopularity.map((p) => p.meta.slug));
  const latestFill = posts
    .filter((p) => !featuredSlugs.has(p.meta.slug))
    .slice(0, 3);
  const latest = [...byPopularity, ...latestFill];
  return (
    <section
      id="blog"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] py-24 md:py-32"
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[460px] w-[460px] bg-[radial-gradient(circle,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-semibold text-[var(--accent)]">Blog</span>
              <span className="text-[var(--text-subtle)]">·</span>
              Wissen für planbare Sichtbarkeit
            </span>
            <h2
              className="mt-6 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
              style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)" }}
            >
              Lerne, wie KI dich{" "}
              <span className="relative inline-block">
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  empfiehlt
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
          </div>
          <Link
            href="/blog"
            className="group hidden items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white md:inline-flex"
          >
            Alle Artikel
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Grid: 1 featured + 2 columns on md+ */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-6">
          {latest.map((p) => (
            <PostCard key={p.meta.slug} meta={p.meta} featured={false} />
          ))}
        </div>

        {/* Mobile-only link */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--text)] transition hover:border-transparent hover:bg-[var(--text)] hover:text-white"
          >
            Alle Artikel ansehen
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
