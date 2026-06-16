"use client";

/**
 * Testimonial-Sektion — zwei Modi:
 *
 *   <Testimonials variant="compact" />  → 3 Karten mit gekürzten Zitaten
 *   <Testimonials variant="full" />     → alle Reviews mit vollem Text
 *
 * Daten aus content/testimonials.ts. Quellen: Google Business Profile
 * + Trustpilot (ipgefer-performance.de). Bei neuen Reviews einfach dort
 * eintragen — Source-Badge + Link-Ziel kommen automatisch.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  testimonials,
  featuredTestimonials,
  REVIEW_PROFILE_URLS,
  SOURCE_LABELS,
  type Testimonial,
  type TestimonialSource,
} from "@/content/testimonials";

const GOOGLE_LOGO_SVG = (
  <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden>
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.62z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.47-.8 5.95-2.18l-2.9-2.26c-.81.54-1.83.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z"
    />
    <path
      fill="#FBBC04"
      d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.57-2.57A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
    />
  </svg>
);

// Trustpilot-Markenfarbe #00B67A — stilisierter Stern im Quadrat
const TRUSTPILOT_LOGO_SVG = (
  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
    <rect width="20" height="20" rx="3" fill="#00B67A" />
    <path
      d="M10 3.2l1.92 3.89 4.3.62-3.11 3.03.73 4.28L10 13l-3.84 2.02.73-4.28-3.11-3.03 4.3-.62L10 3.2z"
      fill="#fff"
    />
  </svg>
);

function SourceLogo({ source }: { source: TestimonialSource }) {
  return source === "trustpilot" ? TRUSTPILOT_LOGO_SVG : GOOGLE_LOGO_SVG;
}

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#db6f16" aria-hidden>
          <path d="M10 1.5l2.7 5.47 6.05.88-4.38 4.27 1.04 6.03L10 15.27l-5.41 2.84 1.04-6.03L1.25 7.85l6.05-.88L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[#0b4ab8] text-[13px] font-semibold text-white"
      aria-hidden
    >
      {initials}
    </div>
  );
}

function CompactCard({ t }: { t: Testimonial }) {
  const href = REVIEW_PROFILE_URLS[t.source];
  const label = SOURCE_LABELS[t.source];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_24px_-12px_rgba(10,10,10,0.08)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_14px_40px_-12px_rgba(22,99,222,0.18)] sm:p-7"
    >
      <div className="flex items-center justify-between">
        <Stars count={t.rating} />
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-subtle)]">
          <SourceLogo source={t.source} /> <span>{label}</span>
        </span>
      </div>
      <p className="flex-1 text-[14.5px] leading-relaxed text-[var(--text)] sm:text-[15px]">
        „{t.short}"
      </p>
      <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
        <InitialsAvatar name={t.name} />
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-[var(--text)]">{t.name}</p>
          <p className="text-[11.5px] text-[var(--text-subtle)]">
            {formatDate(t.date)} · Verifizierte {label}-Bewertung
          </p>
        </div>
      </div>
    </a>
  );
}

function FullCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  // Grober Schwellenwert: lange Reviews werden eingeklappt (line-clamp) +
  // bekommen den "komplett lesen"-Toggle. Kurze Reviews zeigen den vollen Text.
  const isLong = t.full.length > 360;
  const label = SOURCE_LABELS[t.source];
  return (
    <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_4px_24px_-12px_rgba(10,10,10,0.08)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <InitialsAvatar name={t.name} />
          <div className="leading-tight">
            <p className="text-[14px] font-semibold text-[var(--text)]">{t.name}</p>
            <p className="text-[12px] text-[var(--text-subtle)]">{formatDate(t.date)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Stars count={t.rating} />
          <a
            href={REVIEW_PROFILE_URLS[t.source]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-subtle)] transition hover:text-[var(--text)]"
          >
            <SourceLogo source={t.source} /> {label}
          </a>
        </div>
      </div>
      <p
        className={`mt-5 flex-1 whitespace-pre-line text-[14.5px] leading-relaxed text-[var(--text)] sm:text-[15px] ${
          isLong && !expanded ? "line-clamp-[8]" : ""
        }`}
      >
        {t.full}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 inline-flex shrink-0 items-center gap-1 self-start text-[12.5px] font-semibold text-[var(--accent)] transition hover:underline"
        >
          {expanded ? "Weniger anzeigen" : "Bewertung komplett lesen"}
          <span aria-hidden className={`transition-transform ${expanded ? "rotate-180" : ""}`}>↓</span>
        </button>
      )}
    </div>
  );
}

interface Props {
  variant?: "compact" | "full";
  heading?: string;
  eyebrow?: string;
  subline?: string;
  className?: string;
}

export default function Testimonials({
  variant = "compact",
  heading,
  eyebrow = "Was Kunden sagen",
  subline,
  className = "",
}: Props) {
  const isCompact = variant === "compact";
  const items = isCompact ? featuredTestimonials.slice(0, 3) : testimonials;
  const title =
    heading ??
    (isCompact
      ? "Über 100 % der bisherigen Kunden empfehlen weiter."
      : "Alle Bewertungen für Wohlstandsmarketing.");
  const sub =
    subline ??
    (isCompact
      ? "Echte Bewertungen von Google und Trustpilot. Klick auf eine Karte führt direkt zur Quelle — verifiziert und unbearbeitet."
      : "Ungekürzt. Verifiziert. Direkt aus dem Google Business Profile und Trustpilot.");

  return (
    <section className={`relative isolate w-full bg-[var(--bg)] py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-3xl text-center sm:mb-14 lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            {eyebrow}
          </span>
          <h2
            className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.08] tracking-[-0.03em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">{sub}</p>
        </motion.div>

        {isCompact ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {items.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CompactCard t={t} />
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[12.5px] font-medium text-[var(--text-muted)] lg:justify-start">
              <a
                href={REVIEW_PROFILE_URLS.google}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] transition hover:shadow-[0_10px_30px_-10px_rgba(10,10,10,0.18)]"
              >
                {GOOGLE_LOGO_SVG}
                <span>Bewertungen auf Google</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={REVIEW_PROFILE_URLS.trustpilot}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] transition hover:shadow-[0_10px_30px_-10px_rgba(10,10,10,0.18)]"
              >
                {TRUSTPILOT_LOGO_SVG}
                <span>Bewertungen auf Trustpilot</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </>
        ) : (
          <div className="grid auto-rows-fr items-stretch gap-5 md:grid-cols-2 lg:gap-6">
            {items.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <FullCard t={t} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
