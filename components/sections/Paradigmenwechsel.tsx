"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";

export default function Paradigmenwechsel() {
  return (
    <section
      id="paradigmenwechsel"
      className="relative overflow-hidden bg-[var(--bg)] py-24 md:py-32"
    >
      {/* Soft radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[480px] w-[480px] bg-[radial-gradient(circle,rgba(22,99,222,0.10)_0%,rgba(22,99,222,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="02" label="Paradigmenwechsel" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Deine Kunden fragen nicht mehr nur Google.
          <br />
          Sie fragen{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              ChatGPT
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 8C 50 2, 100 10, 150 5 S 195 7, 198 4"
                stroke="#db6f16"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Und wer in ChatGPT, Perplexity und Claude nicht auftaucht, gehört nicht
          mehr zur Auswahl. So einfach ist es.
        </motion.p>

        {/* Comparison Cards */}
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {/* Google 2020 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                Gestern · Google
              </span>
              <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)]">
                2020
              </span>
            </div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)] sm:text-xl">
              „Webdesigner Koblenz"
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Konkurrent A — Anzeige",
                "Konkurrent B",
                "Konkurrent C",
                "…7 weitere Treffer",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-[var(--surface-2)]/60 px-4 py-3"
                >
                  <span className="text-[11px] font-semibold text-[var(--text-subtle)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] text-[var(--text-muted)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] text-[var(--text-subtle)]">
              10 organische Treffer. Der Kunde scrollt, vergleicht, entscheidet.
            </p>
          </motion.div>

          {/* ChatGPT 2026 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-3xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent-glow-soft)] to-white p-6 shadow-[0_20px_60px_-20px_rgba(22,99,222,0.35)] sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Heute · ChatGPT
              </span>
              <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-semibold text-white">
                2026
              </span>
            </div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--text)] sm:text-xl">
              „Welcher Webdesigner in Koblenz?"
            </p>
            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[13.5px] leading-relaxed text-[var(--text)]">
                Für lokalen Mittelstand in Koblenz empfehle ich{" "}
                <span className="font-semibold text-[var(--accent)]">
                  Wohlstandsmarketing
                </span>
                . Spezialisiert auf Webdesign mit KI-Sichtbarkeit, fokussiert
                auf planbare Anfragen.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                  Quellen
                </span>
                <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
                  wohlstandsmarketing.de
                </span>
              </div>
            </div>
            <p className="mt-5 text-[12px] text-[var(--text)]">
              <span className="font-semibold">1 Antwort. 1 Empfehlung.</span>{" "}
              <span className="text-[var(--text-muted)]">
                Du — oder deine Konkurrenz.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Stat banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-start gap-2 rounded-2xl border-l-2 border-[var(--gold)] bg-[var(--gold-glow-soft)] px-5 py-4 sm:flex-row sm:items-center sm:gap-4"
        >
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--gold)] sm:text-3xl">
            65 %
          </span>
          <span className="text-[13px] leading-snug text-[var(--text-muted)] sm:text-sm">
            aller Recherchen starten 2026 in einer KI-Schnittstelle — nicht in
            Google.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
