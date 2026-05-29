"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BUNDLE } from "@/lib/products";
import ReviewBadges from "@/components/ReviewBadges";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

function CTAButton({ size = "md" }: { size?: "md" | "lg" }) {
  const padCls = size === "lg" ? "px-7 py-4 text-sm sm:text-[15px]" : "px-6 py-3.5 text-[13px] sm:text-sm";
  const ctaHref = BUNDLE.digistoreUrl ?? "#";
  const ctaLabel = "Jetzt sichern";
  return (
    <a
      href={ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1663de] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.8)] ${padCls}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#0f4cb3] to-[#0a3a82] transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {ctaLabel}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
          <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

function PriceBox({ large = false }: { large?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 border-[#1663de]/30 bg-gradient-to-br from-white via-[#f6f8fc] to-[#eef2f9] ${large ? "p-5 sm:p-6" : "p-4 sm:p-5"} shadow-[0_12px_28px_-14px_rgba(22,99,222,0.35)]`}>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--text-subtle)]">
          Komplettpaket-Preis
        </div>
        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-bold text-emerald-600 whitespace-nowrap">
          Spare {BUNDLE.savings}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className={`font-extrabold tracking-tight text-[#db6f16] ${large ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
          {BUNDLE.priceNow}
        </span>
        <span className={`font-semibold text-[var(--text-subtle)] line-through ${large ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
          {BUNDLE.priceStrike}
        </span>
      </div>
      <div className="mt-5">
        <CTAButton size={large ? "lg" : "md"} />
      </div>
      <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
        Sofort-Auslieferung per E-Mail · Lebenslanger Zugang
      </p>
    </div>
  );
}

export default function BundlePage() {
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

        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-[#db6f16] to-[#f59e0b] px-3 py-1.5 text-[10px] font-black uppercase tracking-[1.8px] text-white shadow-[0_8px_20px_-4px_rgba(219,111,22,0.5)]">
            Empfohlen · No-Brainer
          </span>
          <span className="rounded-full border border-[#1663de]/30 bg-[#1663de]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.8px] text-[#1663de]">
            Alle 5 Phasen
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-[var(--text)] sm:text-4xl md:text-[44px]"
        >
          {BUNDLE.longTitle}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          {BUNDLE.subtitle}
        </motion.p>

        {/* Review-Badges */}
        <motion.div variants={fadeUp} className="mt-5">
          <div className="flex justify-start">
            <ReviewBadges />
          </div>
        </motion.div>

        {/* Hero-Mockup */}
        <motion.div
          variants={fadeUp}
          className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1663de]/[0.04] to-[#db6f16]/[0.04] ring-1 ring-black/5"
        >
          <Image
            src={BUNDLE.mockup}
            alt={`${BUNDLE.shortName} — alle 5 Phasen`}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Erste Preis-Box */}
        <motion.div variants={fadeUp} className="mt-8">
          <PriceBox large />
        </motion.div>
      </motion.section>

      {/* ───── PREIS-VERGLEICHSTABELLE ───── */}
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
          Einzeln vs. Komplettpaket
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        >
          <table className="w-full text-left">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-2)]/50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-[1.5px] text-[var(--text-subtle)] sm:px-5">
                  Phase
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-[1.5px] text-[var(--text-subtle)] sm:px-5">
                  Einzelpreis
                </th>
              </tr>
            </thead>
            <tbody>
              {BUNDLE.includedPhases.map((p) => (
                <tr key={p.phase} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 sm:px-5">
                    <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#1663de]">
                      {p.phase}
                    </div>
                    <div className="mt-0.5 text-[14px] font-semibold text-[var(--text)] sm:text-[15px]">
                      {p.shortName}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right sm:px-5">
                    <span className="text-[15px] font-bold text-[var(--text-muted)] line-through sm:text-base">
                      {p.originalPrice}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[var(--surface-2)]/40">
                <td className="px-4 py-3 sm:px-5">
                  <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-[var(--text-subtle)]">
                    Summe Einzelkauf
                  </div>
                </td>
                <td className="px-4 py-3 text-right sm:px-5">
                  <span className="text-xl font-extrabold text-[var(--text-muted)] line-through sm:text-2xl">
                    {BUNDLE.priceStrike}
                  </span>
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-[#1663de]/[0.08] to-[#db6f16]/[0.08]">
                <td className="px-4 py-4 sm:px-5">
                  <div className="text-[11px] font-black uppercase tracking-[1.8px] text-[#1663de]">
                    Komplettpaket
                  </div>
                  <div className="mt-0.5 text-[14px] font-bold text-[var(--text)] sm:text-[15px]">
                    Alle 5 Phasen in einem
                  </div>
                </td>
                <td className="px-4 py-4 text-right sm:px-5">
                  <div className="text-2xl font-extrabold text-[#db6f16] sm:text-3xl">
                    {BUNDLE.priceNow}
                  </div>
                  <div className="mt-1 inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-600 whitespace-nowrap">
                    Spare {BUNDLE.savings} · {BUNDLE.savingsPercent}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </motion.section>

      {/* ───── WAS DU BEKOMMST (Top-Level Bullets) ───── */}
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
          {BUNDLE.bullets.map((b, i) => (
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
        <motion.div variants={fadeUp} className="mt-8">
          <PriceBox />
        </motion.div>
      </motion.section>

      {/* ───── DIE 5 PHASEN IM DETAIL ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pb-10 sm:pb-14"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-2 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl"
        >
          Die 5 Phasen im Detail
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mb-6 max-w-[600px] text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base"
        >
          Hier ist genau, was in jeder einzelnen Phase enthalten ist — alles in deinem Komplettpaket.
        </motion.p>
        <div className="flex flex-col gap-4">
          {BUNDLE.includedPhases.map((p) => (
            <motion.div
              key={p.phase}
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Mockup */}
                <div className="relative aspect-[4/3] w-full shrink-0 bg-gradient-to-br from-[#f6f8fc] to-[#eef2f9] ring-1 ring-black/5 sm:aspect-auto sm:w-[260px]">
                  <Image
                    src={p.mockup}
                    alt={p.shortName}
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-contain p-2"
                  />
                </div>
                {/* Inhalt */}
                <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-[1.8px] text-[#1663de]">
                      {p.phase}
                    </span>
                    <span className="text-[12px] font-semibold text-[var(--text-subtle)] line-through">
                      einzeln {p.originalPrice}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-extrabold leading-snug text-[var(--text)] sm:text-[17px]">
                    {p.shortName}
                  </h3>
                  <ul className="mt-1 flex flex-col gap-2">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-muted)] sm:text-sm">
                        <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#1663de]"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-8">
          <PriceBox />
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
          {BUNDLE.steps.map((step, i) => (
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

      {/* ───── FÜR WEN / FÜR WEN NICHT ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[760px] px-5 pb-10 sm:pb-14"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="mb-4 text-[15px] font-extrabold uppercase tracking-[1.2px] text-emerald-600 sm:text-base">
              Für wen es passt
            </h3>
            <ul className="flex flex-col gap-3">
              {BUNDLE.forWhom.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">
                  <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] font-bold text-emerald-600">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="mb-4 text-[15px] font-extrabold uppercase tracking-[1.2px] text-rose-600 sm:text-base">
              Für wen nicht
            </h3>
            <ul className="flex flex-col gap-3">
              {BUNDLE.forWhomNot.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
                  <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-[11px] font-bold text-rose-600">×</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
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
          {BUNDLE.faq.map((q, i) => (
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
              <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">{q.a}</p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* ───── FINAL CTA ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto w-full max-w-[760px] px-5 pb-14"
      >
        <div className="rounded-2xl border-2 border-[#1663de]/30 bg-gradient-to-br from-[#1663de]/[0.08] to-[#db6f16]/[0.08] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            Bereit, den ganzen Weg zu gehen?
          </h2>
          <p className="mt-2 max-w-[520px] text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
            Sicher dir alle 5 Phasen zum Bundle-Preis und leg sofort los — mit dem kompletten Fahrplan in der Hand.
          </p>
          <div className="mt-6">
            <PriceBox large />
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
