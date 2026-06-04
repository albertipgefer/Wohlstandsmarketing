"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PARTNER_PRODUCTS,
  ALL_PRODUCTS_INVITE,
  COMMISSION_PCT,
  earningPerSale,
  BENEFITS,
  PARTNER_FAQ,
} from "@/lib/partner";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const euro = (v: number) =>
  v.toLocaleString("de-DE", {
    minimumFractionDigits: v % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0 text-[#1663de]">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PartnerClient() {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      {/* ───── HERO ───── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto w-full max-w-[640px] px-5 pt-8 pb-4 sm:pt-12"
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

        <motion.div
          variants={fadeUp}
          className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-2 border-[#1663de] shadow-[0_0_0_3px_rgba(22,99,222,0.08),0_20px_40px_-20px_rgba(22,99,222,0.4)]"
        >
          <Image
            src="/images/albert-rooftop.jpg"
            alt="Albert Ipgefer"
            width={192}
            height={192}
            priority
            className="h-full w-full object-cover object-[center_28%]"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <span className="inline-block rounded-full bg-[#1663de]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[1.5px] text-[#1663de]">
            Partnerprogramm
          </span>
          <h1 className="mt-4 text-[28px] font-extrabold leading-tight tracking-tight text-[var(--text)] sm:text-4xl">
            Verdiene <span className="text-[#1663de]">50 % Provision</span> mit meinen Produkten
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
            Empfiehl die Produkte von <span className="font-semibold text-[var(--text)]">Wohlstandsmarketing</span> an deine Community — und verdiene an jedem Verkauf mit. Automatisches Tracking, pünktliche Auszahlung, null Risiko.
          </p>
        </motion.div>
      </motion.section>

      {/* ───── BENEFITS ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 py-6"
      >
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[1px] text-[var(--text-subtle)]">
            Warum Partner werden
          </h2>
          <ul className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-[var(--text-muted)]">
                <Check />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      {/* ───── HAUPT-CTA: ALLE PRODUKTE ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto w-full max-w-[640px] px-5 py-4"
      >
        <div className="overflow-hidden rounded-2xl border border-[#1663de]/30 bg-gradient-to-br from-[#1663de]/[0.07] to-[#db6f16]/[0.06] p-6 text-center sm:p-8">
          <h2 className="text-xl font-extrabold tracking-tight text-[var(--text)] sm:text-2xl">
            Alle Produkte auf einmal bewerben
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-[var(--text-muted)]">
            Ein Klick — und du bist als Partner für das komplette Sortiment freigeschaltet. Danach bekommst du deine persönlichen Links automatisch in CopeCart.
          </p>
          <a
            href={ALL_PRODUCTS_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1663de] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(22,99,222,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f4cb3]"
          >
            Jetzt als Partner anmelden
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.section>

      {/* ───── EINZELNE PRODUKTE ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 py-6"
      >
        <motion.h2 variants={fadeUp} className="mb-2 text-center text-sm font-bold uppercase tracking-[1px] text-[var(--text-subtle)]">
          … oder nur einzelne Produkte
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mb-5 max-w-md text-center text-[13.5px] leading-relaxed text-[var(--text-muted)]">
          Wähl die Produkte, die zu deiner Zielgruppe passen. Pro Produkt bekommst du einen eigenen Partner-Link.
        </motion.p>

        <div className="flex flex-col gap-3">
          {PARTNER_PRODUCTS.map((p) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:border-[#1663de]/40 hover:shadow-[0_14px_30px_-14px_rgba(22,99,222,0.3)] sm:flex-row sm:items-center sm:gap-4 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-3 sm:flex-1 sm:gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)] sm:h-[72px] sm:w-[72px]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="72px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="text-[14px] font-bold leading-snug text-[var(--text)] sm:text-[15px]">{p.name}</h3>
                  <p className="text-[12.5px] leading-relaxed text-[var(--text-muted)] sm:text-[13px]">{p.tagline}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11.5px] sm:gap-2 sm:text-[12px]">
                    <span className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 font-semibold text-[var(--text-muted)]">
                      {euro(p.price)} €
                    </span>
                    <span className="rounded-md bg-[#1663de]/10 px-2 py-0.5 font-bold text-[#1663de]">
                      {COMMISSION_PCT} % → ≈ {euro(earningPerSale(p.price))} € / Verkauf
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={p.invite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#1663de]/20 bg-[#1663de]/[0.06] px-5 text-[13px] font-bold text-[#1663de] transition-all duration-300 hover:bg-[#1663de] hover:text-white sm:h-10 sm:w-auto"
              >
                Bewerben
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───── FAQ ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[640px] px-5 py-6"
      >
        <motion.h2 variants={fadeUp} className="mb-4 text-center text-xl font-extrabold tracking-tight text-[var(--text)] sm:text-2xl">
          Häufige Fragen
        </motion.h2>
        <div className="flex flex-col gap-2.5">
          {PARTNER_FAQ.map((f) => (
            <motion.details
              key={f.q}
              variants={fadeUp}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 [&_summary]:cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-3 text-[14.5px] font-bold text-[var(--text)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="shrink-0 text-[var(--text-subtle)] transition-transform duration-300 group-open:rotate-180"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* ───── ABSCHLUSS-CTA ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto w-full max-w-[640px] px-5 pt-2 pb-8"
      >
        <a
          href={ALL_PRODUCTS_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#1663de] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(22,99,222,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f4cb3]"
        >
          Jetzt Partner werden — 50 % auf alle Produkte
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
