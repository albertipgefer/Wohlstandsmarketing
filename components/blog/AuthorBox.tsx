import Link from "next/link";

/**
 * Author box rendered at the end of every blog article.
 * Builds E-E-A-T signals (Experience, Expertise, Authority, Trust) by:
 *   - linking the author entity to the global Person schema via itemRef
 *   - exposing external profile URLs (LinkedIn, Instagram, TikTok) as `sameAs`
 *   - keeping the bio specific, factual, niche-relevant
 *
 * NOTE: LinkedIn URL is the public profile; verify and adjust the slug if needed.
 */

const LINKEDIN_URL = "https://www.linkedin.com/in/albertipgefer/";
const INSTAGRAM_URL = "https://www.instagram.com/journeywithalbert/";
const TIKTOK_URL = "https://www.tiktok.com/@journeywithalbert";

export default function AuthorBox() {
  return (
    <section
      aria-labelledby="author-heading"
      className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-16"
      // schema.org Person link: this section *is* the author entity for the article
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Über den Autor
        </p>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
          <div className="flex h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)] sm:h-24 sm:w-24">
            <img
              src="/albert-portrait.jpg"
              alt="Albert Ipgefer — Gründer Wohlstandsmarketing"
              className="h-full w-full object-cover object-[50%_30%]"
              itemProp="image"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="author-heading"
              className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)]"
              itemProp="name"
            >
              Albert Ipgefer
            </h2>
            <p
              className="mt-1 text-[13px] uppercase tracking-[0.18em] text-[var(--text-subtle)]"
              itemProp="jobTitle"
            >
              Gründer · Wohlstandsmarketing
            </p>
            <p
              className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)]"
              itemProp="description"
            >
              Albert baut seit 2025 mit{" "}
              <Link
                href="/"
                className="text-[var(--accent)] hover:underline"
                itemProp="worksFor"
              >
                Wohlstandsmarketing
              </Link>{" "}
              Webseiten + KI-Sichtbarkeit für DACH-Mittelstand. Spezialisiert auf
              die 90-Tage-WSM-Methode: konvertierende Webseite live in 7 Tagen,
              danach 83 Tage konstante Optimierung für Google, ChatGPT,
              Perplexity und Claude. Sitz in Bad Ems, betreut Kunden in der
              gesamten DACH-Region.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer me"
                itemProp="sameAs"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--accent)] hover:text-white"
              >
                <span aria-hidden>in</span> LinkedIn
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer me"
                itemProp="sameAs"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--accent)] hover:text-white"
              >
                <span aria-hidden>◐</span> Instagram
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer me"
                itemProp="sameAs"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-medium text-[var(--text)] transition hover:border-transparent hover:bg-[var(--accent)] hover:text-white"
              >
                <span aria-hidden>♪</span> TikTok
              </a>
              <Link
                href="/"
                itemProp="url"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--text)] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[var(--accent)]"
              >
                Mehr über mich →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
