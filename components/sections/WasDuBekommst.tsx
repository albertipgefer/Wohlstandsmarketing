"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";

const GROUPS = [
  {
    label: "Webdesign",
    accent: "blue" as const,
    items: [
      "Positionierungs-Workshop (90 Min)",
      "Wettbewerbs- & Keyword-Audit",
      "Custom Design in Figma",
      "Responsive Development (Next.js + Vercel)",
      "Copywriting für alle Sektionen",
      "Bildwelt-Konzept & Asset-Erstellung",
      "Performance-Optimierung (95+ Lighthouse)",
    ],
  },
  {
    label: "KI-Sichtbarkeit",
    accent: "blue" as const,
    items: [
      "Strukturierte Daten (Schema.org)",
      "AEO-Content (Frage-Antwort-Format)",
      "Entity-Verknüpfung mit Wikipedia & Google",
      "Zitatfähigkeit (Quellen-Optimierung)",
      "Submission an ChatGPT, Perplexity, Claude",
      "Lokale Sichtbarkeit (Google Business Profile)",
      "Monatliches Sichtbarkeits-Reporting",
    ],
  },
  {
    label: "Begleitung",
    accent: "orange" as const,
    items: [
      "WhatsApp-Support während der 90 Tage",
      "Wöchentlicher Status-Call (30 Min)",
      "Ergebnis-Garantie nach 90 Tagen",
      "Hosting & Wartung im ersten Jahr",
    ],
  },
];

export default function WasDuBekommst() {
  return (
    <section
      id="leistungen"
      className="relative overflow-hidden bg-[var(--bg)] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="07" label="Lieferumfang" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Ein kompletter{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Sichtbarkeits-Auftritt
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="12"
              viewBox="0 0 360 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 8C 90 2, 180 10, 270 5 S 350 7, 358 4"
                stroke="#db6f16"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
          </span>
          {" "}— keine Add-ons, keine Überraschungen.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Vom ersten Wireframe bis zur ChatGPT-Indexierung. Alles drin. Alles
          aufeinander abgestimmt.
        </motion.p>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-7"
            >
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                  g.accent === "blue"
                    ? "text-[var(--accent)]"
                    : "text-[var(--gold)]"
                }`}
              >
                {g.label}
              </span>
              <ul className="mt-5 space-y-3">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] leading-snug text-[var(--text)]"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                        g.accent === "blue"
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--gold)]"
                      }`}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
