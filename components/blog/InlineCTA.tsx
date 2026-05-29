"use client";

/**
 * Inline-CTA-Box — Mittelstufen-CTA für Blog-Artikel + Stadt-Pages.
 *
 * Design: dezent, aber sichtbar. Schmalere Card als Startseiten-CTABlock,
 * gleicher visueller Code (Headline mit Playfair-Italic-Highlight,
 * schwarzer Pill-Button mit Hover-Gradient-Blau, Text bleibt immer weiß).
 *
 * WICHTIG — Stil-Vertrag des Buttons (gilt überall, wo dieser CTA verwendet wird):
 *   - Default:  bg = schwarz (var(--text))         · Text + Pfeil = weiß
 *   - Hover:    bg = Blau-Gradient (accent→accent-dark) · Text + Pfeil bleiben weiß
 *   - Kein Underline, kein Color-Override durch parent (z. B. prose-blog).
 *
 * Wird im ArticleLayout AUSSERHALB des prose-blog-Containers gerendert,
 * sonst überschreibt `.prose-blog a` den Button-Text auf blau + underline.
 */

import type { ReactNode } from "react";
import Link from "next/link";

interface Props {
  variant?: "erstgespraech" | "leadmagnet";
  context?: string;
  headline?: ReactNode;
  subline?: ReactNode;
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
        {children}
      </span>
      <svg
        className="absolute -bottom-1 left-0 w-full"
        height="8"
        viewBox="0 0 200 8"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M2 5C 50 1, 100 7, 150 3 S 195 5, 198 2"
          stroke="#db6f16"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

/**
 * Einheitlicher Button — schwarz mit weißem Text, Hover-Gradient blau,
 * Text bleibt immer weiß. `!text-white` + `no-underline` für Robustheit
 * gegen prose-blog `<a>`-Styles.
 */
const BUTTON_CLS =
  "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-8 py-4 text-[15px] font-semibold no-underline shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)] transition hover:shadow-[0_16px_44px_-12px_rgba(22,99,222,0.55)] sm:w-auto";

function ButtonInner({ label }: { label: string }) {
  return (
    <>
      <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
      <span className="relative z-10 !text-white">{label}</span>
      <span className="relative z-10 !text-white transition-transform group-hover:translate-x-1">→</span>
    </>
  );
}

export default function InlineCTA({
  variant = "erstgespraech",
  context,
  headline,
  subline,
}: Props) {
  const isLeadMagnet = variant === "leadmagnet";
  const href = isLeadMagnet ? "#leadmagnet" : "/#strategie";
  const buttonLabel = isLeadMagnet ? "Jetzt PDF holen" : "Erstgespräch sichern";
  const eyebrow = context ?? (isLeadMagnet ? "Gratis PDF · 12 Seiten" : "15 Min · Kostenfrei · Albert persönlich");

  const defaultHeadline = isLeadMagnet ? (
    <>
      Die <Highlight>11 teuersten</Highlight> Marketing-Fehler im Mittelstand
    </>
  ) : (
    <>
      Lieber direkt mit Albert <Highlight>sprechen</Highlight>?
    </>
  );
  const defaultSubline = isLeadMagnet
    ? "Hol dir die PDF — jeder Fehler mit konkreter Lösung und einer Profi-Checkliste am Ende."
    : "15-Minuten-Erstgespräch. Kostenfrei, ehrlich, mit konkretem nächsten Schritt — auch wenn wir nicht zusammenarbeiten.";

  return (
    <aside className="my-12 sm:my-16">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-gradient-to-br from-white via-white to-[var(--accent-glow-soft)] p-8 shadow-[0_18px_50px_-22px_rgba(22,99,222,0.28)] ring-1 ring-[var(--accent)]/5 sm:p-10 md:p-12">
        {/* Dünner Akzent-Streifen links — visueller Anker */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--gold)] opacity-80"
        />
        {/* Subtle radial Glow rechts oben */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-16 h-[280px] w-[280px] bg-[radial-gradient(circle,rgba(22,99,222,0.16)_0%,rgba(22,99,222,0)_65%)]"
        />
        {/* Orange Akzent unten links */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-10 h-[200px] w-[200px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
        />

        <div className="relative grid items-center gap-7 md:grid-cols-[1fr_auto] md:gap-10">
          <div className="text-center md:text-left">
            {/* Eyebrow mit Pulse-Dot — Live-Signal */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] shadow-[0_4px_14px_-6px_rgba(22,99,222,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              {eyebrow}
            </span>
            <h3
              className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.025em] text-[var(--text)]"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.125rem)" }}
            >
              {headline ?? defaultHeadline}
            </h3>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-[var(--text-muted)] sm:text-[15.5px]">
              {subline ?? defaultSubline}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-2 md:items-end">
            <Link href={href} className={BUTTON_CLS}>
              <ButtonInner label={buttonLabel} />
            </Link>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
              {isLeadMagnet ? "PDF · Sofort-Download" : "Antwort < 24 h"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
