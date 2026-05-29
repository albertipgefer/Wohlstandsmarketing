/**
 * ReviewBadges — kleines Plattform-Trust-Signal mit Google + Trustpilot nebeneinander.
 *
 * Stil identisch zum alten GoogleReviewsBadge (pill, weiß, weicher Schatten, Hover-Akzent).
 * Wird auf Hero, /preise, /sichtbarkeits-check, /standorte, /blog und im Footer verwendet,
 * damit überall einheitlich Google + Trustpilot sichtbar sind.
 *
 * Varianten:
 *   - "pill"   (Default): zwei separate Pills nebeneinander mit Sternen-Reihe
 *   - "compact": nur Logos + "5,0" — für Footer / dichte Areas
 *   - "light"  : dezenter, für dunkle/Akzent-Hintergründe (z.B. Hero)
 */

import {
  REVIEW_PROFILE_URLS,
  testimonials,
  type TestimonialSource,
} from "@/content/testimonials";

interface Props {
  variant?: "pill" | "compact" | "light";
  className?: string;
  align?: "left" | "center";
  /**
   * Wenn true: auf Mobile/iPad (< lg) mittig, ab lg links.
   * Verwendet in Hero und in den Unterseiten-Heros, die unter `lg` zentriert sind.
   */
  centerOnMobile?: boolean;
}

function Stars({ light = false, size = 12 }: { light?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={light ? "rgba(255,255,255,0.92)" : "#db6f16"}
        >
          <path d="M10 1.5l2.7 5.47 6.05.88-4.38 4.27 1.04 6.03L10 15.27l-5.41 2.84 1.04-6.03L1.25 7.85l6.05-.88L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

const GOOGLE_LOGO = (
  <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden>
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.57 2.69-3.88 2.69-6.62z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.95-2.18l-2.9-2.26c-.81.54-1.83.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z" />
    <path fill="#FBBC04" d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z" />
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.57-2.57A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
  </svg>
);

const TRUSTPILOT_LOGO = (
  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
    <rect width="20" height="20" rx="3" fill="#00B67A" />
    <path d="M10 3.2l1.92 3.89 4.3.62-3.11 3.03.73 4.28L10 13l-3.84 2.02.73-4.28-3.11-3.03 4.3-.62L10 3.2z" fill="#fff" />
  </svg>
);

function Pill({
  source,
  light,
}: {
  source: TestimonialSource;
  light?: boolean;
}) {
  const href = REVIEW_PROFILE_URLS[source];
  const name = source === "google" ? "Google" : "Trustpilot";
  const logo = source === "google" ? GOOGLE_LOGO : TRUSTPILOT_LOGO;
  const label = "5,0 auf " + name;
  const baseClass = light
    ? "group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur transition hover:bg-white/15 hover:text-white"
    : "group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[var(--text-muted)] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] transition hover:border-[var(--accent)] hover:text-[var(--text)]";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={baseClass}
    >
      {logo}
      <Stars light={light} />
      <span className={light ? "font-semibold text-white" : "font-semibold text-[var(--text)]"}>{name}</span>
      <span aria-hidden className="text-[10px] opacity-60 transition group-hover:opacity-100">↗</span>
    </a>
  );
}

function CompactPill({ source }: { source: TestimonialSource }) {
  const href = REVIEW_PROFILE_URLS[source];
  const name = source === "google" ? "Google" : "Trustpilot";
  const logo = source === "google" ? GOOGLE_LOGO : TRUSTPILOT_LOGO;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`5,0 auf ${name}`}
      className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
    >
      {logo}
      <Stars size={10} />
      <span className="text-[var(--text-subtle)] group-hover:text-[var(--text)]">{name}</span>
    </a>
  );
}

export default function ReviewBadges({
  variant = "pill",
  className = "",
  align = "left",
  centerOnMobile = false,
}: Props) {
  // Wenn centerOnMobile: bis lg voll-breit + zentriert, ab lg auf intrinsisch + linksbündig.
  // Sonst: einfacher justify-start/center je nach `align`.
  const alignmentClass = centerOnMobile
    ? "w-full justify-center lg:w-auto lg:justify-start"
    : align === "center"
    ? "justify-center"
    : "justify-start";

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${alignmentClass} ${className}`}>
        <CompactPill source="google" />
        <CompactPill source="trustpilot" />
      </div>
    );
  }

  const light = variant === "light";
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${alignmentClass} ${className}`}>
      <Pill source="google" light={light} />
      <Pill source="trustpilot" light={light} />
    </div>
  );
}

/** Anzahl-Helper für Stellen, die "X Bewertungen" anzeigen wollen (nicht im Default-Badge). */
export function getReviewCounts() {
  return {
    google: testimonials.filter((t) => t.source === "google").length,
    trustpilot: testimonials.filter((t) => t.source === "trustpilot").length,
  };
}
