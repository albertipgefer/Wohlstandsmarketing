import Link from "next/link";
import type { PostMeta } from "@/content/blog/types";
import PostCover from "./PostCover";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PostCard({
  meta,
  featured = false,
}: {
  meta: PostMeta;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${meta.slug}`}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(22,99,222,0.25)] ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div className={featured ? "md:w-1/2" : ""}>
        <PostCover meta={meta} size={featured ? "hero" : "card"} />
      </div>
      <div
        className={`flex flex-1 flex-col gap-4 p-6 sm:p-7 ${
          featured ? "md:p-10" : ""
        }`}
      >
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
          {featured && (
            <span className="rounded-full bg-[var(--gold-glow-soft)] px-2.5 py-1 text-[var(--gold)]">
              Beliebter Artikel
            </span>
          )}
          <span>{meta.category}</span>
          <span aria-hidden>·</span>
          <span>{meta.readingTime}</span>
        </div>

        <h3
          className={`font-[family-name:var(--font-display)] font-bold leading-tight tracking-tight text-[var(--text)] ${
            featured
              ? "text-2xl sm:text-3xl md:text-4xl"
              : "text-xl sm:text-2xl"
          }`}
        >
          {meta.title}
        </h3>

        <p
          className={`text-[var(--text-muted)] ${
            featured ? "text-base leading-relaxed" : "text-[14px] leading-snug"
          }`}
        >
          {meta.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-3">
          <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)]">
            {/* Albert avatar */}
            <img
              src="/albert-portrait.jpg"
              alt=""
              className="h-full w-full object-cover object-[50%_30%]"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[var(--text)]">
              Albert Ipgefer
            </p>
            <p className="text-[11px] text-[var(--text-subtle)]">
              {formatDate(meta.date)}
            </p>
          </div>
          <span className="text-[var(--accent)] transition group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
