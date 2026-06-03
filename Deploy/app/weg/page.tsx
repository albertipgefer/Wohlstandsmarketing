"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS, BUNDLE } from "@/lib/products";
import ReviewBadges from "@/components/ReviewBadges";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function WegPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      {/* ───── HEADER ───── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 pt-8 pb-4 sm:pt-12"
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--text-subtle)] transition hover:text-[#1663de]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M19 12H5m7-7l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            zurück zur Übersicht
          </Link>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-[26px] font-extrabold leading-[1.1] tracking-tight text-[var(--text)] sm:text-[34px]"
        >
          Der gesamte Weg von <span className="font-display italic font-normal text-[#1663de]">0</span> bis zum ersten zahlenden Kunden
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base"
        >
          Die 5 Phasen, die ich heute gehen würde, wenn ich bei Null wäre — einzeln oder als Komplettpaket.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-5">
          <ReviewBadges />
        </motion.div>
      </motion.section>

      {/* ───── EINZEL-PRODUKT-KARTEN ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 pb-6 pt-4"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-center text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]"
        >
          Die 5 Phasen einzeln
        </motion.h2>
        <div className="flex flex-col gap-3">
          {PRODUCTS.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <Link
                href={`/${p.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de]/40 hover:shadow-[0_12px_28px_-12px_rgba(22,99,222,0.3)] sm:gap-4 sm:p-4"
              >
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] ring-1 ring-black/5 sm:w-40">
                  <Image
                    src={p.mockup}
                    alt={p.shortName}
                    fill
                    sizes="(max-width: 640px) 112px, 160px"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105 sm:p-2"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#1663de]">
                      {p.phase}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-bold leading-snug text-[var(--text)] sm:text-base">
                    {p.longTitle}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-[#db6f16] sm:text-lg">
                      {p.priceNow}
                    </span>
                    <span className="text-xs text-[var(--text-subtle)] line-through">
                      {p.priceStrike}
                    </span>
                  </div>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] transition-all duration-300 group-hover:bg-[#1663de] group-hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───── BUNDLE-HERO-CARD ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 pb-10 pt-2"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-center text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]"
        >
          Oder alles auf einmal — spar 234 €
        </motion.h2>
        <motion.div variants={fadeUp} className="relative">
          <div className="absolute -top-3 right-4 z-10 rotate-3 rounded-full bg-gradient-to-r from-[#db6f16] to-[#f59e0b] px-3 py-1.5 text-[10px] font-black uppercase tracking-[1.5px] text-white shadow-[0_8px_20px_-4px_rgba(219,111,22,0.5)]">
            Empfohlen · No-Brainer
          </div>
          <Link
            href={`/${BUNDLE.slug}`}
            className="group block rounded-2xl border-2 border-[#1663de]/40 bg-gradient-to-br from-white via-[#f6f8fc] to-[#eef2f9] p-4 shadow-[0_16px_36px_-18px_rgba(22,99,222,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de] hover:shadow-[0_24px_44px_-16px_rgba(22,99,222,0.45)] sm:p-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] ring-1 ring-black/5">
              <Image
                src={BUNDLE.mockup}
                alt={BUNDLE.shortName}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02] sm:p-2"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[1.8px] text-[#1663de]">
                  Komplettpaket · Alle 5 Phasen
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold leading-snug text-[var(--text)] sm:text-xl">
                Der gesamte Weg von 0 bis zum ersten Retainer-Kunden
              </h3>
              <p className="text-[13px] leading-relaxed text-[var(--text-muted)] sm:text-sm">
                Alle 5 Phasen in einem Paket. Statt 431 € einzeln zahlst du nur 197 € — und hast sofort den kompletten Fahrplan.
              </p>
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#db6f16] sm:text-3xl">
                      {BUNDLE.priceNow}
                    </span>
                    <span className="text-sm text-[var(--text-subtle)] line-through sm:text-base">
                      {BUNDLE.priceStrike}
                    </span>
                  </div>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 whitespace-nowrap sm:ml-1 sm:text-[11px]">
                    Spare {BUNDLE.savings}
                  </span>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1663de] text-white shadow-[0_8px_20px_-6px_rgba(22,99,222,0.5)] transition-all duration-300 group-hover:bg-[#0f4cb3] group-hover:shadow-[0_12px_24px_-6px_rgba(22,99,222,0.6)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      {/* ───── FOOTER ───── */}
      <footer className="mx-auto w-full max-w-[640px] border-t border-[var(--border)] px-5 py-6 text-center text-xs text-[var(--text-subtle)]">
        <p className="mb-1">
          <span className="font-semibold text-[var(--text-muted)]">Albert Ipgefer · Wohlstandsmarketing</span>
        </p>
        <p className="mb-3">Vor der Loos 4e · 56130 Bad Ems</p>
        <div className="flex items-center justify-center gap-3">
          <a href="https://www.instagram.com/journeywithalbert" target="_blank" rel="noopener noreferrer" className="hover:text-[#1663de]">Instagram</a>
          <span aria-hidden>·</span>
          <a href="https://www.tiktok.com/@journeywithalbert" target="_blank" rel="noopener noreferrer" className="hover:text-[#1663de]">TikTok</a>
          <span aria-hidden>·</span>
          <a href="https://wohlstandsmarketing.de" target="_blank" rel="noopener noreferrer" className="hover:text-[#1663de]">wohlstandsmarketing.de</a>
        </div>
      </footer>
    </main>
  );
}
