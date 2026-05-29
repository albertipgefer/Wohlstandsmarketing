"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import ReviewBadges from "@/components/ReviewBadges";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

function CTAButton({ href, label, size = "md" }: {
  href: string;
  label: string;
  size?: "md" | "lg";
}) {
  const padCls = size === "lg" ? "px-7 py-4 text-[15px] sm:text-base" : "px-6 py-3.5 text-sm sm:text-[15px]";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[var(--text)] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.5)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.75)] ${padCls}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#1663de] to-[#0f4cb3] transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {label}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
          <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

function PriceBox({ product, large = false }: { product: Product; large?: boolean }) {
  const ctaHref = product.digistoreUrl ?? "#";
  const ctaLabel = "Jetzt zum Einführungspreis sichern!";

  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${large ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
      <div className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--text-subtle)]">
        Einführungspreis
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className={`font-extrabold tracking-tight text-[#db6f16] ${large ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
          {product.priceNow}
        </span>
        <span className={`font-semibold text-[var(--text-subtle)] line-through ${large ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
          {product.priceStrike}
        </span>
      </div>
      <div className="mt-5">
        <CTAButton href={ctaHref} label={ctaLabel} size={large ? "lg" : "md"} />
      </div>
      <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
        Sofort-Auslieferung per E-Mail · Lebenslanger Zugang
      </p>
    </div>
  );
}

export default function ProductPage({ product }: { product: Product }) {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      {/* ───── HERO ───── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pt-8 pb-10 sm:pt-12 sm:pb-14"
      >
        {/* Back-Link */}
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

        {/* Eyebrow — kürzer, nur Phase */}
        <motion.div
          variants={fadeUp}
          className="mb-4 inline-block rounded-full border border-[#1663de]/30 bg-[#1663de]/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[#1663de]"
        >
          {product.phase}
        </motion.div>

        {/* Headline — KEIN Italic-Akzent mehr, glatt fett */}
        <motion.h1
          variants={fadeUp}
          className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-[var(--text)] sm:text-4xl md:text-[44px]"
        >
          {product.longTitle}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          {product.subtitle}
        </motion.p>

        {/* Review-Badges direkt unter Subline (Trust-Signal früh) */}
        <motion.div variants={fadeUp} className="mt-5">
          <div className="flex justify-start">
            <ReviewBadges />
          </div>
        </motion.div>

        {/* Hero-Mockup */}
        <motion.div
          variants={fadeUp}
          className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1663de]/[0.04] to-[#db6f16]/[0.04]"
        >
          <Image
            src={product.mockup}
            alt={`${product.shortName} — Produktbild`}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Erste Preis-Box + CTA #1 */}
        <motion.div variants={fadeUp} className="mt-8">
          <PriceBox product={product} large />
        </motion.div>
      </motion.section>

      {/* ───── WAS DU BEKOMMST ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pb-10 sm:pb-14"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl"
        >
          Was du bekommst
        </motion.h2>
        <ul className="flex flex-col gap-4">
          {product.bullets.map((b, i) => (
            <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[13px] font-bold text-emerald-600"
              >
                ✓
              </span>
              <span className="text-[15px] leading-relaxed text-[var(--text)] sm:text-base">
                {b}
              </span>
            </motion.li>
          ))}
        </ul>
        {/* CTA #2 — mitten im Content */}
        <motion.div variants={fadeUp} className="mt-8">
          <PriceBox product={product} />
        </motion.div>
      </motion.section>

      {/* ───── WIE ES ABLÄUFT ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pb-10 sm:pb-14"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl"
        >
          Wie es abläuft
        </motion.h2>
        <ol className="flex flex-col gap-3">
          {product.steps.map((step, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1663de] text-sm font-extrabold text-white">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-[var(--text)]">{step.title}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">{step.body}</div>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* ───── FÜR WEN ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pb-10 sm:pb-14"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl"
        >
          Für wen ist das?
        </motion.h2>
        <ul className="flex flex-col gap-4">
          {product.forWhom.map((b, i) => (
            <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[13px] font-bold text-emerald-600"
              >
                ✓
              </span>
              <span className="text-[15px] leading-relaxed text-[var(--text)] sm:text-base">
                {b}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ───── FAQ ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pb-10 sm:pb-14"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl"
        >
          Häufige Fragen
        </motion.h2>
        <div className="flex flex-col gap-3">
          {product.faq.map((q, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[#1663de]/30 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-[15px] font-bold text-[var(--text)] sm:text-base">{q.q}</span>
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] transition-transform group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">{q.a}</p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* ───── FINAL CTA (3. CTA) ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto w-full max-w-[760px] px-5 pb-14"
      >
        <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#1663de]/[0.06] to-[#db6f16]/[0.06] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            Bereit zu starten?
          </h2>
          <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
            Sicher dir <span className="font-semibold text-[var(--text)]">{product.shortName}</span> zum Einführungspreis und leg sofort los.
          </p>
          <div className="mt-6">
            <PriceBox product={product} large />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
            Sichere Zahlung über CopeCart · MwSt automatisch
          </p>
        </div>
      </motion.section>

      {/* ───── FOOTER ───── */}
      <footer className="mx-auto w-full max-w-[760px] border-t border-[var(--border)] px-5 py-6 text-center text-xs text-[var(--text-subtle)]">
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
