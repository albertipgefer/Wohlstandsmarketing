"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { STRATEGIEGESPRAECH_URL } from "@/lib/products";
import { BETRIEBSSYSTEM } from "@/lib/betriebssystem";
import ReviewBadges from "@/components/ReviewBadges";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const Arrow = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-muted)] transition-all duration-300 group-hover:bg-[#1663de] group-hover:text-white">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function BioPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg)]">
      {/* ───── HERO ───── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto w-full max-w-[600px] px-5 pt-10 pb-6 sm:pt-14"
      >
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

        <motion.div variants={fadeUp} className="text-center">
          <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            Albert Ipgefer
          </h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[2px] text-[var(--text-subtle)]">
            @journeywithalbert
          </p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base"
        >
          Mein Weg aus dem Tagesjob in die ortsunabhängige Selbstständigkeit — plus die <span className="font-semibold text-[var(--text)]">KI-Tools</span>, mit denen ich täglich arbeite. Wähl deinen Einstieg.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6">
          <ReviewBadges />
        </motion.div>
      </motion.section>

      {/* ───── KACHEL-MENÜ ───── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto w-full max-w-[600px] px-5 pb-10 pt-2"
      >
        <div className="flex flex-col gap-3">

          {/* Kachel 1 — Der gesamte Weg */}
          <motion.div variants={fadeUp}>
            <Link
              href="/weg"
              className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de]/40 hover:shadow-[0_14px_30px_-14px_rgba(22,99,222,0.3)] sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1663de] to-[#0f4cb3] text-white shadow-[0_8px_20px_-8px_rgba(22,99,222,0.6)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 20h4v-6H3v6zm7 0h4V9h-4v11zm7 0h4V4h-4v16z" fill="currentColor" />
                </svg>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="text-[15px] font-bold leading-snug text-[var(--text)] sm:text-base">
                  Der gesamte Weg von 0 bis zum ersten zahlenden Kunden
                </h3>
              </div>
              <Arrow />
            </Link>
          </motion.div>

          {/* Kachel 2 — Solopreneur-Betriebssystem */}
          <motion.div variants={fadeUp}>
            <Link
              href={`/${BETRIEBSSYSTEM.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de]/40 hover:shadow-[0_14px_30px_-14px_rgba(22,99,222,0.3)] sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b1020] to-[#1e293b] text-emerald-300 shadow-[0_8px_20px_-8px_rgba(11,16,32,0.6)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 17l6-5-6-5M12 19h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold leading-snug text-[var(--text)] sm:text-base">
                    Das Solopreneur-Betriebssystem für Claude Code
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#1663de]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[1px] text-[#1663de]">Neu</span>
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                  50 Skills + 5 KI-Agenten für dein Business
                </p>
              </div>
              <Arrow />
            </Link>
          </motion.div>

          {/* Kachel 3 — Strategiegespräch */}
          <motion.div variants={fadeUp}>
            <a
              href={STRATEGIEGESPRAECH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#1663de]/[0.06] to-[#db6f16]/[0.06] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1663de]/40 hover:shadow-[0_14px_30px_-14px_rgba(22,99,222,0.3)] sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#db6f16] to-[#f59e0b] text-white shadow-[0_8px_20px_-8px_rgba(219,111,22,0.6)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="text-[15px] font-bold leading-snug text-[var(--text)] sm:text-base">
                  Festgefahren? Hol dir 1:1 Hilfe
                </h3>
                <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                  90-Min-Strategiegespräch mit Albert
                </p>
              </div>
              <Arrow />
            </a>
          </motion.div>

        </div>
      </motion.section>

      {/* ───── FOOTER ───── */}
      <footer className="mx-auto w-full max-w-[600px] border-t border-[var(--border)] px-5 py-6 text-center text-xs text-[var(--text-subtle)]">
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
