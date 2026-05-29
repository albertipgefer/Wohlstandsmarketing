"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";
import MethodFilm from "./_shared/MethodFilm";

const PILLAR_LEFT = [
  "Strategisches Webdesign",
  "Conversion-optimierte Struktur",
  "Eigenes Branding & Bildwelt",
  "Performance-Optimierung",
];

const PILLAR_RIGHT = [
  "Schema-Markup für KI-Crawler",
  "AEO-optimierte Inhalte",
  "Zitatfähigkeit & Quellen-Setup",
  "Lokale Entitäten-Verknüpfung",
];

export default function Angebot() {
  return (
    <section
      id="angebot"
      className="relative overflow-hidden bg-[var(--bg)] py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(22,99,222,0.12)_0%,rgba(22,99,222,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="04" label="Das Angebot" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Dein neuer Auftritt — gebaut, um{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              gefunden
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
          </span>{" "}
          zu werden.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Webdesign und KI-Sichtbarkeit als{" "}
          <span className="font-semibold text-[var(--text)]">
            ein untrennbares Paket
          </span>
          . Kein SEO-Add-on, keine Halbsachen, keine zwei Dienstleister.
        </motion.p>

        {/* Two Pillars + Multiplier */}
        <div className="mt-14 grid items-stretch gap-5 md:mt-16 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-8"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
              Säule 1
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              Webdesign
            </h3>
            <p className="mt-2 text-[14px] text-[var(--text-muted)]">
              Ein Auftritt, der konvertiert.
            </p>
            <ul className="mt-5 space-y-2.5">
              {PILLAR_LEFT.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14px] text-[var(--text)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Multiplier */}
          <div className="flex items-center justify-center md:flex-col">
            <span className="font-[family-name:var(--font-serif)] text-5xl font-bold italic text-[var(--gold-text)] md:text-6xl">
              ×
            </span>
          </div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent-glow-soft)] to-white p-7 shadow-[0_20px_60px_-20px_rgba(22,99,222,0.3)] sm:p-8"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Säule 2
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              KI-Sichtbarkeit
            </h3>
            <p className="mt-2 text-[14px] text-[var(--text-muted)]">
              Ein Auftritt, den KI empfiehlt.
            </p>
            <ul className="mt-5 space-y-2.5">
              {PILLAR_RIGHT.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14px] text-[var(--text)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Result line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-2 text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            = Ergebnis
          </span>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--text)] sm:text-2xl">
            Ein Auftritt, der gefunden wird —{" "}
            <span className="text-[var(--accent)]">und konvertiert</span>.
          </p>
        </motion.div>

        {/* Method Film — visual story of the 90 days */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14 md:mt-20"
        >
          <div className="mb-6 flex flex-col items-center gap-2 text-center sm:mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-text)]">
              Der Film
            </span>
            <p className="max-w-xl text-[14px] text-[var(--text-muted)] sm:text-[15px]">
              So läuft die Zusammenarbeit in 4 Akten ab — vom Kickoff bis zur
              Empfehlung durch KI.
            </p>
          </div>
          <MethodFilm />
        </motion.div>
      </div>
    </section>
  );
}
