"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";

const ROWS = [
  {
    point: "Webdesign",
    classic: "Schönes Design, fertig.",
    wsm: "Design + Conversion-Architektur.",
  },
  {
    point: "Google-SEO",
    classic: "Add-on, monatliches Retainer.",
    wsm: "Im Auftritt mit eingebaut.",
  },
  {
    point: "KI-Sichtbarkeit",
    classic: "„ChatGPT? Davon hatten wir noch nichts gehört.",
    wsm: "Schema, AEO, Entity-Linking — Standard.",
  },
  {
    point: "Texte",
    classic: "Du lieferst — oder ChatGPT-Stub.",
    wsm: "Strategischer Copy-Prozess, KI-zitierfähig.",
  },
  {
    point: "Zeitrahmen",
    classic: "3 – 6 Monate. Open End.",
    wsm: "90 Tage. Fix.",
  },
  {
    point: "Ergebnis",
    classic: "Eine Webseite.",
    wsm: "Ein Auftritt, der gefunden wird.",
  },
];

export default function Vergleich() {
  return (
    <section
      id="vergleich"
      className="relative overflow-hidden bg-[var(--bg)] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="09" label="Klassisch vs. WSM" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Es gibt zwei Wege. Einer macht dich auch 2026 noch{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              sichtbar
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

        {/* Comparison — Cards on mobile, Table on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12"
        >
          {/* Mobile: stacked cards per row */}
          <div className="space-y-4 md:hidden">
            {ROWS.map((r) => (
              <div
                key={r.point}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_30px_-18px_rgba(10,10,10,0.15)]"
              >
                <div className="border-b border-[var(--border)] bg-[var(--surface-2)]/50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    {r.point}
                  </p>
                </div>
                <div className="border-b border-[var(--border)] px-4 py-3.5">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                    <span>✕</span> Klassische Agentur
                  </div>
                  <p
                    className="text-[13.5px] text-[var(--text-muted)]"
                    dangerouslySetInnerHTML={{ __html: r.classic }}
                  />
                </div>
                <div className="bg-[var(--accent-glow-soft)]/60 px-4 py-3.5">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    <span>✓</span> WSM-Methode
                  </div>
                  <p className="text-[13.5px] font-medium text-[var(--text)]">
                    {r.wsm}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: classic comparison table */}
          <div className="hidden overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_20px_60px_-30px_rgba(10,10,10,0.15)] md:block">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-[var(--border)] bg-[var(--surface-2)]/60">
              <div className="p-5" />
              <div className="border-l border-[var(--border)] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
                  Klassische Agentur
                </p>
              </div>
              <div className="border-l border-[var(--accent)]/20 bg-[var(--accent-glow-soft)] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                  WSM-Methode
                </p>
              </div>
            </div>
            {ROWS.map((r, i) => (
              <div
                key={r.point}
                className={`grid grid-cols-[1.2fr_1fr_1fr] border-b border-[var(--border)] last:border-b-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-[var(--surface-2)]/30"
                }`}
              >
                <div className="p-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                  {r.point}
                </div>
                <div className="border-l border-[var(--border)] p-5 text-[13.5px] text-[var(--text-muted)]">
                  <span className="mr-2 inline-block text-[var(--text-subtle)]">
                    ✕
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: r.classic }} />
                </div>
                <div className="border-l border-[var(--accent)]/20 bg-[var(--accent-glow-soft)]/50 p-5 text-[13.5px] font-medium text-[var(--text)]">
                  <span className="mr-2 inline-block font-bold text-[var(--accent)]">
                    ✓
                  </span>
                  {r.wsm}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
