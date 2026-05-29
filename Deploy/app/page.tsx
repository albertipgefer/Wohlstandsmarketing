"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS, BUNDLE, STRATEGIEGESPRAECH_URL } from "@/lib/products";
import ReviewBadges from "@/components/ReviewBadges";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function BioPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      {/* ───── HERO ───── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto w-full max-w-[640px] px-5 pt-10 pb-6 sm:pt-14 sm:pb-8"
      >
        {/* Foto */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-[#1663de] shadow-[0_0_0_3px_rgba(22,99,222,0.08),0_20px_40px_-20px_rgba(22,99,222,0.4)] sm:h-32 sm:w-32"
        >
          <Image
            src="/images/albert-rooftop.jpg"
            alt="Albert Ipgefer"
            width={256}
            height={256}
            priority
            className="h-full w-full object-cover object-[center_28%]"
          />
        </motion.div>

        {/* Name + Handle */}
        <motion.div variants={fadeUp} className="text-center">
          <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            Albert Ipgefer
          </h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[2px] text-[var(--text-subtle)]">
            @journeywithalbert
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base"
        >
          So würde ich selbst aus dem Tagesjob raus in die ortsunabhängige Selbstständigkeit kommen — die <span className="font-semibold text-[var(--text)]">5 Phasen</span>, die ich heute gehen würde, wenn ich bei <span className="font-display italic font-normal text-[#1663de]">Null</span> wäre.
        </motion.p>

        {/* Review-Badges (Google + Trustpilot) */}
        <motion.div variants={fadeUp} className="mt-6">
          <ReviewBadges />
        </motion.div>
      </motion.section>

      {/* ───── BUNDLE-HERO-CARD (Empfohlen, No-Brainer) ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 pb-2 pt-2"
      >
        <motion.div variants={fadeUp} className="relative">
          {/* Badge — schwebt oben rechts */}
          <div className="absolute -top-3 right-4 z-10 rotate-3 rounded-full bg-gradient-to-r from-[#db6f16] to-[#f59e0b] px-3 py-1.5 text-[10px] font-black uppercase tracking-[1.5px] text-white shadow-[0_8px_20px_-4px_rgba(219,111,22,0.5)]">
            Empfohlen · No-Brainer
          </div>
          <Link
            href={`/${BUNDLE.slug}`}
            className="group block rounded-2xl border-2 border-[#1663de]/40 bg-gradient-to-br from-white via-[#f6f8fc] to-[#eef2f9] p-4 shadow-[0_16px_36px_-18px_rgba(22,99,222,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de] hover:shadow-[0_24px_44px_-16px_rgba(22,99,222,0.45)] sm:p-5"
          >
            {/* Mockup oben über volle Breite */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] ring-1 ring-black/5">
              <Image
                src={BUNDLE.mockup}
                alt={BUNDLE.shortName}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                priority
                className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02] sm:p-2"
              />
            </div>

            {/* Text */}
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

              {/* Preis-Block */}
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#db6f16] sm:text-3xl">
                    {BUNDLE.priceNow}
                  </span>
                  <span className="text-sm text-[var(--text-subtle)] line-through sm:text-base">
                    {BUNDLE.priceStrike}
                  </span>
                  <span className="ml-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 sm:text-xs">
                    spar {BUNDLE.savings}
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

      {/* ───── EINZEL-PRODUKT-KARTEN ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 pb-6 pt-6"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-center text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]"
        >
          Oder einzeln — die 5 Phasen separat
        </motion.h2>
        <div className="flex flex-col gap-3">
          {PRODUCTS.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <Link
                href={`/${p.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de]/40 hover:shadow-[0_12px_28px_-12px_rgba(22,99,222,0.3)] sm:gap-4 sm:p-4"
              >
                {/* Mockup-Thumbnail */}
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] ring-1 ring-black/5 sm:w-40">
                  <Image
                    src={p.mockup}
                    alt={p.shortName}
                    fill
                    sizes="(max-width: 640px) 112px, 160px"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105 sm:p-2"
                  />
                </div>

                {/* Text */}
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

                {/* Arrow */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] transition-all duration-300 group-hover:bg-[#1663de] group-hover:text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12h14m-7-7l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───── STRATEGIEGESPRÄCH-CTA (Mobile-optimiert, 49 € nicht mehr im 2-Zeilen-Wrap) ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto w-full max-w-[640px] px-5 pb-10"
      >
        <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]">
          Festgefahren? Hol dir 1:1 Hilfe
        </h2>
        <a
          href={STRATEGIEGESPRAECH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#1663de]/[0.06] to-[#db6f16]/[0.06] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de]/40 hover:shadow-[0_12px_28px_-12px_rgba(22,99,222,0.3)] sm:p-5"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1663de] text-white shadow-[0_8px_20px_-8px_rgba(22,99,222,0.6)] sm:h-12 sm:w-12">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#1663de]">
                90-Min-Deep-Dive · 1:1 mit Albert
              </div>
              <h3 className="text-[15px] font-bold leading-tight text-[var(--text)] sm:text-base">
                Strategiegespräch buchen
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#db6f16] sm:text-2xl">49 €</span>
              <span className="text-[11px] text-[var(--text-subtle)] sm:text-xs">einmalig · 90 Min · Google Meet</span>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--text-muted)] shadow-sm transition-all group-hover:bg-[#1663de] group-hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </a>
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
        <p className="mt-3 text-[10px]">
          © {new Date().getFullYear()} Albert Ipgefer ·{" "}
          <a href="https://wohlstandsmarketing.de/impressum" className="hover:text-[#1663de]">Impressum</a>{" · "}
          <a href="https://wohlstandsmarketing.de/datenschutz" className="hover:text-[#1663de]">Datenschutz</a>
        </p>
      </footer>
    </main>
  );
}
