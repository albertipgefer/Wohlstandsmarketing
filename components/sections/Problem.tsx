"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";

const PAINS = [
  {
    icon: "✕",
    title: "Alte SEO-Taktiken funktionieren nicht mehr.",
    body: "Keywords stopfen, Backlinks kaufen, Meta-Tags optimieren — das Spielfeld hat sich verändert. KI-Suchmaschinen bewerten anders.",
  },
  {
    icon: "✕",
    title: "ChatGPT &amp; Co. sind blind für dich.",
    body: "Ohne strukturierte Daten, ohne zitierfähige Inhalte, ohne AEO-Strategie bleibst du in den Antworten der KI-Plattformen unsichtbar.",
  },
  {
    icon: "✕",
    title: "Deine Konkurrenz gewinnt — jeden Tag.",
    body: "Während du wartest, baut deine Konkurrenz Sichtbarkeit auf. Jede Woche, die vergeht, ist Vorsprung, den du später teuer aufholen musst.",
  },
  {
    icon: "✕",
    title: "Deine Webseite ist technisch nicht KI-ready.",
    body: "Schema-Markup fehlt, Inhalte sind nicht maschinenlesbar, Quellen-Struktur ist chaotisch. KI-Crawler verstehen nicht, wofür du stehst.",
  },
  {
    icon: "✕",
    title: "Lokal wirst du übersehen.",
    body: "Kein optimiertes Google Business Profile, keine lokalen Entitäten verlinkt — also tauchst du bei lokalen Suchanfragen einfach nicht auf.",
  },
  {
    icon: "✕",
    title: "Deine Inhalte sind nicht zitierfähig.",
    body: "KI empfiehlt nur, was sie zitieren kann. Wenn deine Texte aus Marketing-Floskeln bestehen, statt aus klaren Fakten, gibt es nichts zu empfehlen.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-[var(--surface-2)]/40 py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="03" label="Das Problem" accent="orange" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Eine Webseite, die niemand findet, ist eine{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Visitenkarte
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="12"
              viewBox="0 0 240 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 8C 60 2, 120 10, 180 5 S 230 7, 238 4"
                stroke="#db6f16"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
          </span>{" "}
          ohne Adresse.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Du hast vermutlich schon viel in deine Webseite investiert. Aber wenn
          sie nicht gefunden wird, war alles vergebens.
        </motion.p>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:p-7"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold-glow-soft)] text-base font-bold text-[var(--gold)]">
                {p.icon}
              </span>
              <h3
                className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight text-[var(--text)] sm:text-xl"
                dangerouslySetInnerHTML={{ __html: p.title }}
              />
              <p
                className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
