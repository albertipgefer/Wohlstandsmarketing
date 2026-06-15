"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReviewBadges from "@/components/ReviewBadges";
import BlogNav from "@/components/blog/BlogNav";

export default function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY, visible: true });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  // LCP-kritisch: Hero-Content muss im SSR-HTML sofort sichtbar sein (opacity:1),
  // sonst bleibt die Headline bis zur JS-Hydration unsichtbar → LCP-Killer auf Mobile.
  // Entrance bleibt als dezenter Slide (y) erhalten; nur das paint-blockierende Fade entfällt.
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.11, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 1, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--bg)]">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[860px] bg-[radial-gradient(55%_55%_at_30%_0%,rgba(22,99,222,0.14)_0%,rgba(22,99,222,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 z-0 h-[640px] w-[640px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-60 [background-image:linear-gradient(rgba(10,10,10,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      {/* Cursor-Glow desktop */}
      {mounted && cursor.visible && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[60] hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,99,222,0.10)_0%,rgba(22,99,222,0)_70%)] blur-2xl lg:block"
          style={{ left: cursor.x, top: cursor.y }}
        />
      )}

      <BlogNav />

      {/* ═══════════════════════════════════════════════════════
          HERO LAYOUT — Akquise-Style
          - Mobile / Tablet: Foto OBEN (full width), Content darunter
          - Desktop (lg+): Foto RECHTS (Split), Content links
          Foto-Fades sind via CSS-Masken, sanfter Übergang zum Text.
         ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 sm:px-6 sm:pt-28 md:px-12 lg:pt-32">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:min-h-[calc(100vh-8rem)]">
          {/* ─── DESKTOP-ONLY PHOTO (right column) — 4-side fade via gradient overlays ─── */}
          <motion.div
            initial={false}
            className="relative order-2 mx-auto hidden aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-3xl lg:block"
          >
            <Image
              src="/albert-portrait.jpg"
              alt="Albert Ipgefer, Gründer von Wohlstandsmarketing – Agentur für Webdesign, SEO und KI-Sichtbarkeit"
              fill
              priority
              fetchPriority="high"
              quality={85}
              sizes="480px"
              className="object-cover object-[50%_35%]"
            />
            {/* 4-side fade gradients fading to background colour */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[var(--bg)] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg)] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg)] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg)] to-transparent"
            />
          </motion.div>

          {/* ─── CONTENT (mobile/iPad: zentriert, single col with inline photo; desktop: links) ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-1 flex flex-col items-center text-center lg:items-start lg:text-left lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div
              variants={item}
              className="mb-7 inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] bg-white px-3 py-1.5 shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)] sm:gap-2.5 sm:px-4"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--gold)]" />
              </span>
              <span className="truncate text-[10.5px] font-medium tracking-wide text-[var(--text-muted)] sm:text-[12px]">
                <span className="font-semibold text-[var(--gold-text)]">Neu</span>
                <span className="mx-1.5 text-[var(--text-subtle)] sm:mx-2">·</span>
                <span className="hidden sm:inline">
                  Die WSM-Methode: Webdesign &amp; KI-Sichtbarkeit
                </span>
                <span className="sm:hidden">
                  WSM-Methode · Webdesign + KI-SEO
                </span>
              </span>
            </motion.div>

            {/* Headline — max 3 lines on every viewport.
                Mobile: explicit break after "zu" → 3 lines.
                Desktop: no break after "zu" → "Von unsichtbar zu Nummer 1" naturally
                wraps based on column width, plus forced break before "innerhalb…". */}
            <motion.h1
              variants={item}
              className="font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.04em] text-[var(--text)]"
              style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}
            >
              Von unsichtbar zu
              <br className="lg:hidden" />{" "}
              <span className="relative inline-block">
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  Nummer 1
                </span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full sm:-bottom-2"
                  height="14"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C 60 2, 130 12, 200 6 S 290 8, 298 5"
                    stroke="#db6f16"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </svg>
              </span>
              <br />
              innerhalb von 90 Tagen.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:mt-8 sm:text-lg"
            >
              Wir holen dich aus der Unsichtbarkeit und machen dich{" "}
              <span className="font-semibold text-[var(--text)]">
                innerhalb von 90 Tagen zur Nummer 1 in deiner Region
              </span>{" "}
              — empfohlen von Google, ChatGPT, Perplexity und Claude.
            </motion.p>

            {/* MOBILE / iPad ONLY: portrait photo (different crop), centered, no fade */}
            <motion.div
              variants={item}
              className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden"
            >
              <Image
                src="/albert-portrait.jpg"
                alt="Albert Ipgefer, Gründer von Wohlstandsmarketing – Agentur für Webdesign, SEO und KI-Sichtbarkeit"
                width={1226}
                height={1300}
                priority
                fetchPriority="high"
                quality={75}
                sizes="(max-width: 640px) 360px, 480px"
                className="h-auto w-full"
              />
            </motion.div>

            {/* CTA Buttons — immer untereinander (Desktop hat schmalere Spalte), zentriert auf mobile */}
            <motion.div
              variants={item}
              className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 lg:mx-0"
            >
              <a
                href="/sichtbarkeits-check"
                aria-label="Kostenlosen KI-Sichtbarkeits-Check starten"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
              >
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">Kostenlosen KI-Check machen</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kostenloses Erstgespräch buchen"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent"
              >
                <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors group-hover:text-white">
                  Kostenloses Erstgespräch buchen
                </span>
              </a>
            </motion.div>

            {/* Sekundärer CTA: KI-Check als Lead-Magnet — nur Desktop (auf Mobile/iPad versteckt) */}
            <motion.a
              variants={item}
              href="#methode"
              className="group mx-auto mt-5 hidden items-center gap-2 text-[13px] font-semibold text-[var(--text-muted)] transition hover:text-[var(--accent)] lg:mx-0 lg:inline-flex"
            >
              <span aria-hidden className="text-[var(--accent)]">↓</span>
              <span className="underline-offset-4 group-hover:underline">
                So funktioniert die WSM-Methode
              </span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            {/* Hint */}
            <motion.p
              variants={item}
              className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]"
            >
              15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich
            </motion.p>

            {/* Bewertungen Trust-Signal: Google + Trustpilot — Mobile/iPad zentriert, Desktop links */}
            <motion.div variants={item} className="mt-5 w-full">
              <ReviewBadges variant="pill" centerOnMobile />
            </motion.div>

            {/* USP-Bullets im Baulig-Stil — nur Mobile/iPad, vertikal, linksbündig im zentrierten Block */}
            <motion.ul
              variants={item}
              className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 text-left text-[13.5px] leading-relaxed text-[var(--text)] sm:text-[14.5px] lg:hidden"
            >
              <li className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold">Erhalte Klarheit</strong>, wie du als lokaler Experte in deinem Markt sichtbar wirst — auf Google und in ChatGPT.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold">Nutze die WSM-Methode</strong>, um planbar qualifizierte Anfragen zu gewinnen — statt auf Empfehlungen zu hoffen.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold">Erfahre</strong>, wie deine Webseite zur echten Lead-Maschine wird — und nicht nur digitale Visitenkarte bleibt.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span aria-hidden className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold">Verstehe</strong>, wieso du kein riesiges Werbebudget brauchst, um nachhaltig planbar zu wachsen.
                </span>
              </li>
            </motion.ul>

            {/* CTA-Wiederholung — nur Mobile/iPad, nach den Bullets */}
            <motion.div
              variants={item}
              className="mx-auto mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 lg:hidden"
            >
              <a
                href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
              >
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">Kostenloses Erstgespräch buchen</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                15-Min · Kostenfrei · Albert persönlich
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom spacing on mobile so content has room before next section */}
        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
}
