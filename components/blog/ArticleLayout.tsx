"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/content/blog/types";
import PostCover from "./PostCover";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function ArticleLayout({
  meta,
  children,
  related,
}: {
  meta: PostMeta;
  children: ReactNode;
  related: { slug: string; title: string; category: string }[];
}) {
  return (
    <article className="relative">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
      />

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 md:px-12 md:pt-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          ← Alle Artikel
        </Link>
        <div className="mt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
          <span className="rounded-full bg-[var(--accent-glow-soft)] px-3 py-1 text-[var(--accent)]">
            {meta.category}
          </span>
          <span>{meta.readingTime}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(meta.date)}</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {meta.highlight ? (
            <Highlighted text={meta.title} highlight={meta.highlight} />
          ) : (
            meta.title
          )}
        </motion.h1>

        {meta.subtitle && (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl">
            {meta.subtitle}
          </p>
        )}

        {/* Author Row */}
        <div className="mt-8 flex items-center gap-3 border-t border-[var(--border)] pt-6">
          <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)]">
            <img
              src="/albert-portrait.jpg"
              alt=""
              className="h-full w-full object-cover object-[50%_30%]"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[var(--text)]">
              Albert Ipgefer
            </p>
            <p className="text-[12px] text-[var(--text-muted)]">
              Gründer · Wohlstandsmarketing
            </p>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 md:px-12">
        <PostCover meta={meta} size="hero" />
      </div>

      {/* Body + TOC */}
      <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-4 pb-20 sm:px-6 md:px-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        {/* Body */}
        <div className="prose-blog min-w-0">{children}</div>

        {/* TOC: collapsible on mobile, sticky on desktop */}
        <aside className="order-first lg:order-last">
          {/* Mobile: collapsible */}
          <details className="rounded-2xl border border-[var(--border)] bg-white p-4 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Inhalt ({meta.toc.length} Abschnitte)
              <span className="text-[14px] text-[var(--text)] transition-transform [details[open]_&]:rotate-180">
                ⌄
              </span>
            </summary>
            <ol className="mt-4 space-y-2.5 text-[14px]">
              {meta.toc.map((entry, i) => (
                <li key={entry.id} className="flex gap-3">
                  <span className="font-[family-name:var(--font-serif)] italic text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${entry.id}`}
                    className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          {/* Desktop: sticky */}
          <div className="hidden lg:sticky lg:top-24 lg:block">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Inhalt
            </p>
            <ol className="space-y-2.5 text-[14px]">
              {meta.toc.map((entry, i) => (
                <li key={entry.id} className="flex gap-3">
                  <span className="font-[family-name:var(--font-serif)] italic text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${entry.id}`}
                    className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      {/* FAQ */}
      {meta.faq.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              FAQ
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              Häufige Fragen zu diesem Thema
            </h2>
            <div className="mt-10 divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
              {meta.faq.map((f) => (
                <details key={f.q} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="font-[family-name:var(--font-display)] text-[16px] font-semibold tracking-tight text-[var(--text)] sm:text-lg">
                      {f.q}
                    </span>
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[12px] text-[var(--text)] transition group-open:rotate-45 group-open:bg-[var(--text)] group-open:text-white">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-10 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[var(--border)] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Das könnte dich auch interessieren
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Weitere Artikel zum Thema
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(22,99,222,0.25)]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                    {r.category}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)]">
                    {r.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2">
                    Artikel lesen →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA — Erstgespräch */}
      <section className="relative overflow-hidden border-t border-[var(--border)] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(55%_60%_at_50%_0%,rgba(22,99,222,0.16)_0%,rgba(22,99,222,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 md:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Nächster Schritt
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Bereit für deine{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              KI-Sichtbarkeit
            </span>
            ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            15-Minuten-Erstgespräch mit Albert. Kostenfrei, ehrlich, mit
            konkretem Plan — auch wenn wir nicht zusammenarbeiten.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/#strategie"
              className="group relative inline-flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-9 py-5 text-base font-semibold text-white shadow-[0_14px_40px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_18px_50px_-10px_rgba(22,99,222,0.8)] sm:w-auto"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">Erstgespräch sichern</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              15-Min · Kostenfrei · Albert Ipgefer persönlich
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

/* Highlight the first occurrence of `highlight` in `text` as Playfair italic + underline */
function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="relative inline-block">
        <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
          {highlight}
        </span>
        <svg
          className="absolute -bottom-1 left-0 w-full"
          height="10"
          viewBox="0 0 200 10"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M2 7C 50 1, 100 9, 150 4 S 195 6, 198 3"
            stroke="#db6f16"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </span>
      {after}
    </>
  );
}
