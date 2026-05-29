"use client";

/**
 * LeadMagnetSection — Lead-Magnet-PDF-Anmeldung als eigene Sektion.
 *
 * Wird auf der Startseite eingebaut. Optisch identisch zur Inline-Lead-
 * Magnet-Box auf Blog-Artikeln (Akzent-Border, Gradient, vertikaler
 * Akzent-Streifen, Pulse-Dot-Eyebrow). Gleicher Form-Vertrag, gleiche
 * Conversion-Architektur.
 */

import { motion } from "framer-motion";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export default function LeadMagnetSection() {
  return (
    <section id="leadmagnet" className="relative isolate w-full bg-[var(--bg)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-gradient-to-br from-white via-white to-[var(--accent-glow-soft)] p-8 shadow-[0_18px_50px_-22px_rgba(22,99,222,0.28)] ring-1 ring-[var(--accent)]/5 sm:p-12 md:p-14">
            {/* Vertikaler Akzent-Streifen links */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-8 left-0 w-1 rounded-r-full bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--gold)] opacity-80"
            />
            {/* Glow rechts oben */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-20 h-[320px] w-[320px] bg-[radial-gradient(circle,rgba(22,99,222,0.16)_0%,rgba(22,99,222,0)_65%)]"
            />
            {/* Orange Akzent unten links */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-16 h-[260px] w-[260px] bg-[radial-gradient(circle,rgba(219,111,22,0.10)_0%,rgba(219,111,22,0)_70%)]"
            />

            <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)] shadow-[0_4px_14px_-6px_rgba(219,111,22,0.25)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Gratis PDF · 12 Seiten
                </span>
                <h2
                  className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.08] tracking-[-0.025em] text-[var(--text)]"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.625rem)" }}
                >
                  Die{" "}
                  <span className="relative inline-block">
                    <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
                      11 teuersten
                    </span>
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      height="10"
                      viewBox="0 0 200 10"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M2 7C 50 1, 100 9, 150 4 S 195 6, 198 3"
                        stroke="#db6f16"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    </svg>
                  </span>{" "}
                  Marketing-Fehler im Mittelstand
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
                  Konkrete Lösung pro Fehler + eine 30-Tage-Profi-Checkliste am Ende. Direkt nach Anmeldung in deinem Postfach. Kostenfrei, keine Anmeldung erforderlich.
                </p>

                <ul className="mt-5 space-y-2 text-[13.5px] text-[var(--text-muted)] sm:text-[14.5px]">
                  {[
                    "11 echte Mittelstand-Fehler — keine Theorie",
                    "Pro Fehler: konkreter Hebel in 30 Minuten umsetzbar",
                    "Profi-Checkliste mit 30 Punkten für die nächsten 4 Wochen",
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <LeadMagnetForm source="homepage" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
