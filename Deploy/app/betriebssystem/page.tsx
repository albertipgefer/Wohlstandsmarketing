"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BETRIEBSSYSTEM as B } from "@/lib/betriebssystem";
import ReviewBadges from "@/components/ReviewBadges";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

function CTAButton({ label, size = "md" }: { label: string; size?: "md" | "lg" }) {
  const href = B.checkoutUrl ?? "#";
  const padCls = size === "lg" ? "px-7 py-4 text-sm sm:text-[15px]" : "px-6 py-3.5 text-[13px] sm:text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1663de] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_14px_40px_-10px_rgba(22,99,222,0.8)] ${padCls}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#0f4cb3] to-[#0a3a82] transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {label}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
          <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

function PriceBox({ large = false }: { large?: boolean }) {
  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${large ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-[2px] text-[var(--text-subtle)]">
          Einführungspreis · einmalig
        </div>
        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
          {B.savingsPercent}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className={`font-extrabold tracking-tight text-[#db6f16] ${large ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
          {B.priceNow}
        </span>
        <span className={`font-semibold text-[var(--text-subtle)] line-through ${large ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
          {B.priceStrike}
        </span>
      </div>
      <div className="mt-5">
        <CTAButton label="Jetzt sichern" size={large ? "lg" : "md"} />
      </div>
      <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
        Sofort-Download nach Kauf · kein Abo · lebenslanger Zugang
      </p>
    </div>
  );
}

export default function BetriebssystemPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      {/* ───── HERO ───── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pt-8 pb-10 sm:pt-12 sm:pb-14"
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

        <motion.div
          variants={fadeUp}
          className="mb-4 inline-block rounded-full border border-[#1663de]/30 bg-[#1663de]/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[#1663de]"
        >
          {B.eyebrow}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[30px] font-extrabold leading-[1.08] tracking-tight text-[var(--text)] sm:text-[44px] md:text-[52px]"
        >
          Das <span className="font-display italic font-normal text-[#1663de]">Solopreneur-Betriebssystem</span> für Claude Code
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-[680px] text-[16px] leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          {B.subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-5">
          <div className="flex justify-start">
            <ReviewBadges />
          </div>
        </motion.div>

        {/* Terminal-Demo */}
        <motion.div
          variants={fadeUp}
          className="mt-8 overflow-hidden rounded-2xl border border-[#0a1f44]/10 bg-[#0b1020] shadow-[0_24px_60px_-24px_rgba(11,16,32,0.6)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-[11px] font-medium text-white/40">claude-code · solopreneur-os</span>
          </div>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-emerald-300 sm:text-[13.5px]">
{B.terminal.join("\n")}
          </pre>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8">
          <PriceBox large />
        </motion.div>
      </motion.section>

      {/* ───── PROBLEM ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.div variants={fadeUp} className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]">
          Kommt dir das bekannt vor?
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          Dein Claude Code läuft unter seinem Potenzial
        </motion.h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {B.pains.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="text-[15px] font-bold text-[var(--text)]">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───── STATS ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {B.stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#1663de]/[0.05] to-[#db6f16]/[0.05] p-5 text-center">
              <div className="text-3xl font-extrabold tracking-tight text-[#1663de] sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[1px] text-[var(--text-subtle)]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───── WAS IST DRIN — KATEGORIE-EXPLORER ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.div variants={fadeUp} className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]">
          Was steckt drin
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          50 Skills in 5 Kategorien
        </motion.h2>
        <div className="flex flex-col gap-3">
          {B.categories.map((cat) => (
            <motion.details
              key={cat.key}
              variants={fadeUp}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[#1663de]/30 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <div>
                  <div className="text-base font-extrabold text-[var(--text)] sm:text-lg">{cat.title}</div>
                  <p className="mt-1 max-w-[560px] text-[13px] leading-relaxed text-[var(--text-muted)]">{cat.desc}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-[#1663de]/10 px-2.5 py-1 text-[11px] font-bold text-[#1663de]">10 Skills</span>
                  <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] transition-transform group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </summary>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {cat.skills.map((sk) => (
                  <li key={sk.name} className="flex items-start gap-2.5 rounded-lg bg-[var(--surface-2)] px-3 py-2">
                    <span aria-hidden className="mt-0.5 text-[#db6f16]">▸</span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[12px] font-semibold text-[#1663de]">{sk.name}</span>
                      <span className="block text-[13px] text-[var(--text)]">{sk.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* ───── AGENTEN ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.div variants={fadeUp} className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--text-subtle)]">
          Plus 5 KI-Agenten
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          Die mehrere Skills zu einem Ablauf verketten
        </motion.h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {B.agents.map((a) => (
            <motion.div key={a.name} variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="font-mono text-[12px] font-semibold text-[#1663de]">{a.name}</div>
              <div className="mt-1 text-[15px] font-bold text-[var(--text)]">{a.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───── VERGLEICH ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          Kein weiteres Prompt-Paket
        </motion.h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-3 text-sm font-bold text-[var(--text-subtle)]">Lose Prompt-Sammlung</div>
            <ul className="flex flex-col gap-2.5">
              {B.comparisonBad.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-[var(--text-muted)]">
                  <span aria-hidden className="mt-0.5 text-red-400">✕</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl border-2 border-[#1663de]/40 bg-gradient-to-br from-white via-[#f6f8fc] to-[#eef2f9] p-5">
            <div className="mb-3 text-sm font-bold text-[#1663de]">Das Solopreneur-Betriebssystem</div>
            <ul className="flex flex-col gap-2.5">
              {B.comparisonGood.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] font-medium text-[var(--text)]">
                  <span aria-hidden className="mt-0.5 text-emerald-600">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* ───── SO FUNKTIONIERT'S ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          So funktioniert&apos;s
        </motion.h2>
        <ol className="flex flex-col gap-3">
          {B.steps.map((step, i) => (
            <motion.li key={i} variants={fadeUp} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1663de] text-sm font-extrabold text-white">{i + 1}</div>
              <div className="flex-1">
                <div className="text-base font-bold text-[var(--text)]">{step.title}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">{step.body}</div>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      {/* ───── PREIS ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
                Einmal zahlen, für immer nutzen
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {B.included.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-bold text-emerald-600">✓</span>
                    <span className="text-[14px] leading-relaxed text-[var(--text)] sm:text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PriceBox large />
          </div>
        </motion.div>
      </motion.section>

      {/* ───── FAQ ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[820px] px-5 pb-12 sm:pb-16"
      >
        <motion.h2 variants={fadeUp} className="mb-6 text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
          Häufige Fragen
        </motion.h2>
        <div className="flex flex-col gap-3">
          {B.faq.map((q, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[#1663de]/30 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-[15px] font-bold text-[var(--text)] sm:text-base">{q.q}</span>
                <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] transition-transform group-open:rotate-45">
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

      {/* ───── FINAL CTA ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto w-full max-w-[820px] px-5 pb-14"
      >
        <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#1663de]/[0.06] to-[#db6f16]/[0.06] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            Hör auf, bei null zu starten
          </h2>
          <p className="mt-2 max-w-[520px] text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
            Sicher dir das komplette Betriebssystem zum <span className="font-semibold text-[var(--text)]">Einführungspreis</span> und mach Claude Code in 3 Minuten zu deinem Mitarbeiter.
          </p>
          <div className="mt-6">
            <PriceBox large />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
            Sichere Zahlung über CopeCart · MwSt automatisch · 0-Tage-Widerrufsrecht
          </p>
        </div>
      </motion.section>

      {/* ───── FOOTER ───── */}
      <footer className="mx-auto w-full max-w-[820px] border-t border-[var(--border)] px-5 py-6 text-center text-xs text-[var(--text-subtle)]">
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
