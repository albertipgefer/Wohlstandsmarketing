"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  ["Methode", "#methode"],
  ["Standorte", "/standorte"],
  ["Blog", "/blog"],
  ["FAQ", "#faq"],
] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.11, delayChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
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

      {/* Sticky Pill Nav */}
      <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-2 rounded-full border border-[var(--border)] bg-white/80 px-3 py-2.5 shadow-[0_10px_40px_-12px_rgba(10,10,10,0.18)] backdrop-blur-xl sm:px-4 sm:py-3">
            <a href="#" className="flex items-center pl-1">
              <Logo size={36} />
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://kundenbereich.wohlstandsmarketing.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full px-3 py-2 text-[13px] font-medium text-[var(--text-muted)] transition hover:text-[var(--text)] md:inline-flex"
              >
                Kundenbereich ↗
              </a>
              <a
                href="#strategie"
                className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white md:inline-flex"
              >
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">Erstgespräch</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--text)] text-white md:hidden"
              >
                <span
                  className={`absolute h-[1.5px] w-4 bg-white transition-transform ${
                    menuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 bg-white transition-opacity ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 bg-white transition-transform ${
                    menuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-5 px-6 pt-16">
              {NAV_ITEMS.map(([label, href], i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text)]"
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="https://kundenbereich.wohlstandsmarketing.de/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base font-medium text-[var(--text-muted)]"
              >
                Kundenbereich ↗
              </motion.a>
              <motion.a
                href="#strategie"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_40px_-10px_rgba(22,99,222,0.5)]"
              >
                Erstgespräch sichern →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 mx-auto hidden aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-3xl lg:block"
          >
            <Image
              src="/albert-portrait.jpg"
              alt="Albert Ipgefer, Gründer von Wohlstandsmarketing"
              fill
              priority
              quality={88}
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
                <span className="font-semibold text-[var(--gold)]">Neu</span>
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
              Ein neuer Auftritt für dein Unternehmen, der nicht nur gut aussieht
              — sondern von Google, ChatGPT, Perplexity und Claude als{" "}
              <span className="font-semibold text-[var(--text)]">
                erste Wahl in deiner Region
              </span>{" "}
              empfohlen wird.
            </motion.p>

            {/* MOBILE / iPad ONLY: portrait photo (different crop), centered, no fade */}
            <motion.div
              variants={item}
              className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl lg:hidden"
            >
              <Image
                src="/albert-portrait.jpg"
                alt="Albert Ipgefer, Gründer von Wohlstandsmarketing"
                width={1226}
                height={1300}
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 540px"
                className="h-auto w-full"
              />
            </motion.div>

            {/* CTA Buttons — immer untereinander (Desktop hat schmalere Spalte), zentriert auf mobile */}
            <motion.div
              variants={item}
              className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 lg:mx-0"
            >
              <a
                href="#strategie"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)]"
              >
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">Erstgespräch sichern</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#methode"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-strong)] bg-white/70 px-7 py-4 text-[15px] font-medium text-[var(--text)] backdrop-blur transition hover:border-transparent"
              >
                <span className="absolute inset-0 -z-0 translate-x-[-101%] bg-[var(--text)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors group-hover:text-white">
                  So funktioniert die WSM-Methode
                </span>
              </a>
            </motion.div>

            {/* Hint */}
            <motion.p
              variants={item}
              className="mt-7 text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]"
            >
              15-Min Erstgespräch · Kostenfrei · Albert Ipgefer persönlich
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom spacing on mobile so content has room before next section */}
        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
}
