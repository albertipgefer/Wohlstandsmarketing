"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";

const STEPS = [
  {
    no: "01",
    days: "Tag 1 – 3",
    title: "Fundament",
    desc: "Positionierung, Wettbewerbs-Audit, ICP-Schärfung. Wir verstehen gemeinsam, gegen wen du antrittst — bei Google und bei jeder KI.",
    deliverables: [
      "Positionierungs-Workshop",
      "Sichtbarkeits-Audit (Status quo)",
      "Keyword- & Entity-Strategie",
    ],
  },
  {
    no: "02",
    days: "Tag 4 – 7",
    title: "Auftritt",
    desc: "Design, Copy, Development — in einer Woche live. Eine Webseite, die konvertiert und gleichzeitig technisch so gebaut ist, dass KI sie versteht.",
    deliverables: [
      "Wireframes & Designs",
      "Copywriting für jede Sektion",
      "Build & Launch (Next.js + Vercel)",
    ],
  },
  {
    no: "03",
    days: "Tag 8 – 90",
    title: "KI-Indexierung",
    desc: "Über die nächsten 83 Tage optimieren wir kontinuierlich für transaktionale Suchanfragen — bis du in Google, ChatGPT, Perplexity und Claude empfohlen wirst.",
    deliverables: [
      "Strukturierte Daten & Schema",
      "AEO-Content (Fragen-Antworten)",
      "Wöchentliche Sichtbarkeits-Iteration",
    ],
  },
];

export default function Methode() {
  return (
    <section
      id="methode"
      className="relative overflow-hidden bg-[var(--bg)] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="05" label="Die WSM-Methode" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)" }}
        >
          Drei Säulen. Neunzig Tage.
          <br />
          Ein neuer{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Auftritt
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
          Webseite in 7 Tagen live, danach 83 Tage konstante KI-Optimierung — bis
          du für die Suchanfragen gefunden wirst, die wirklich Umsatz bringen.
        </motion.p>

        {/* Steps Grid */}
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-8"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--font-serif)] text-5xl font-bold italic text-[var(--accent)] sm:text-6xl">
                  {s.no}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  {s.days}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)]">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
                {s.desc}
              </p>
              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  Übergabe
                </span>
                <ul className="mt-2.5 space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-[13px] text-[var(--text)]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline bar — desktop only (mobile = cards genug) */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.85 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 hidden origin-left rounded-full border border-[var(--border)] bg-white p-2 md:block"
        >
          <div className="relative h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--accent)]"
              style={{ width: "7.7%" }}
            />
            <div
              className="absolute inset-y-0 bg-gradient-to-r from-[var(--accent-light)] to-[var(--gold)]"
              style={{ left: "7.7%", right: 0 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-medium text-[var(--text-subtle)]">
            <span>Tag 0 · Kickoff</span>
            <span>Tag 3 · Fundament steht</span>
            <span>Tag 7 · Website live</span>
            <span className="text-[var(--gold-text)]">Tag 90 · KI-Sichtbar</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
