"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";

const TRUST = [
  { value: "10+", label: "Unternehmen begleitet" },
  { value: "100 %", label: "DACH-Mittelstand-Fokus" },
  { value: "2025", label: "WSM-Methode gestartet" },
];

export default function UeberAlbert() {
  return (
    <section
      id="ueber"
      className="relative overflow-hidden bg-[var(--surface-2)]/40 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[460px] w-[460px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="08" label="Über mich" accent="orange" />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:items-start">
          {/* Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm md:mx-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] shadow-[0_20px_60px_-20px_rgba(10,10,10,0.18)]">
              <img
                src="/albert-portrait.jpg"
                alt="Albert Ipgefer, Gründer von Wohlstandsmarketing – Experte für Webdesign und KI-Sichtbarkeit im Raum Koblenz"
                className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
              />
              <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-[var(--border)] bg-white/90 px-4 py-3 backdrop-blur">
                <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--text)]">
                  Albert Ipgefer
                </p>
                <p className="text-[12px] text-[var(--text-muted)]">
                  Gründer · Wohlstandsmarketing
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2
              className="max-w-2xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
            >
              Warum Webdesign und{" "}
              <span className="relative inline-block">
                <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                  KI-Sichtbarkeit
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="12"
                  viewBox="0 0 280 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8C 70 2, 140 10, 210 5 S 270 7, 278 4"
                    stroke="#db6f16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </svg>
              </span>{" "}
              zusammengehören.
            </h2>

            <div className="mt-7 space-y-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              <p>
                Ich heiße Albert Ipgefer. Seit 2024 baue ich Webseiten, die
                planbare Anfragen bringen. Seit 2026 baue ich Webseiten, die{" "}
                <span className="font-semibold text-[var(--text)]">
                  auch von KI empfohlen werden
                </span>
                .
              </p>
              <p>
                Weil das Eine ohne das Andere nicht mehr funktioniert: Eine
                konvertierende Seite, die niemand findet, ist nutzlos. Eine
                sichtbare Seite, die nicht konvertiert, auch.
              </p>
              <p className="font-medium text-[var(--text)]">
                Genau deshalb mache ich beides — als Ein-Mann-Studio. Keine
                Account-Manager-Kette. Du arbeitest direkt mit mir.
              </p>
            </div>

            {/* Trust Markers */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-4 sm:flex-col sm:items-start sm:justify-start sm:text-left"
                >
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--accent)] sm:text-3xl">
                    {t.value}
                  </p>
                  <p className="text-right text-[12px] leading-snug text-[var(--text-muted)] sm:mt-1 sm:text-left">
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
