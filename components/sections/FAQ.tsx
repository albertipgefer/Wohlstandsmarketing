"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionEyebrow from "./_shared/SectionEyebrow";

const FAQS = [
  {
    q: "Wie lange dauert das wirklich?",
    a: "90 Tage von Kickoff bis Live-Gang inklusive KI-Indexierung. Verbindlich. Wenn wir das nicht halten, arbeiten wir kostenfrei weiter, bis der Auftritt steht.",
  },
  {
    q: "Was kostet das?",
    a: "Im Erstgespräch. Der Preis hängt von Umfang, Branche und Wettbewerbsdruck ab. Ich nenne dir die Investition transparent — und sage dir ehrlich, ob es sich für dich rechnet.",
  },
  {
    q: "Funktioniert KI-SEO heute schon?",
    a: "Ja. Perplexity, ChatGPT, Claude, Google AI Overviews liefern bereits heute Empfehlungen. Wer jetzt sichtbar ist, wird die nächsten 5 Jahre den Markt definieren.",
  },
  {
    q: "Was ist, wenn meine Branche nicht in ChatGPT auftaucht?",
    a: "Sie taucht auf. Wir prüfen das im Erstgespräch und ich zeige dir konkret, welche Anfragen in deinem Markt schon heute über KI laufen — auch wenn du es nicht glaubst.",
  },
  {
    q: "Wer schreibt die Inhalte?",
    a: "Ich, in enger Abstimmung mit dir. 2 strukturierte Interviews à 60 Min reichen meist aus, damit ich deine Stimme, dein Wissen und deine Differenzierung sauber übersetzen kann.",
  },
  {
    q: "Was passiert nach den 90 Tagen?",
    a: "Auf Wunsch begleite ich dich monatlich (Sichtbarkeits-Monitoring, KI-Index-Pflege, Content-Erweiterung). Optional, kein Zwang. Du bekommst alle Zugänge und kannst auch komplett alleine weitermachen.",
  },
  {
    q: "Wie viele Kunden nimmst du pro Monat an?",
    a: "Maximal 2. Ich bin Ein-Mann-Studio und garantiere persönliche Betreuung. Wenn der Slot weg ist, ist er weg.",
  },
];

function Item({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:opacity-70 sm:py-6"
      >
        <span className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--text)] sm:text-lg">
          {q}
        </span>
        <span
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[14px] text-[var(--text)] transition-transform ${
            open ? "rotate-45 bg-[var(--text)] text-white" : ""
          }`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-10 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[var(--surface-2)]/40 py-24 md:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="10" label="FAQ" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-3xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Häufige{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Fragen
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="12"
              viewBox="0 0 160 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 8C 40 2, 80 10, 120 5 S 155 7, 158 4"
                stroke="#db6f16"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
          </span>{" "}
          — ehrlich beantwortet.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 rounded-3xl border border-[var(--border)] bg-white px-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.1)] sm:px-8"
        >
          {FAQS.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
