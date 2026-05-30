"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionEyebrow from "./_shared/SectionEyebrow";

const CASES = [
  {
    client: "Fahrtendienst Weber",
    location: "Rheinland-Pfalz",
    url: "https://fahrtendienst-weber.de",
    image: "/cases/weber.png",
    result: "5 – 10 qualifizierte Anfragen / Monat aus organischer Suche.",
    accent: "Auftritt + lokale Sichtbarkeit",
  },
  {
    client: "Holzmann Immobilien",
    location: "Herford · NRW",
    url: "https://verkauf.holzmann-immobilien.de",
    image: "/cases/holzmann.png",
    result:
      "Komplett neuer Auftritt — fokussiert auf qualifizierte Verkaufsanfragen.",
    accent: "Webdesign + KI-Indexierung",
  },
  {
    client: "NOMA Beach",
    location: "Northeim · Niedersachsen",
    url: "https://www.nomabeach.de",
    image: "/cases/noma.png",
    result:
      "Neuer Auftritt für die Eventlocation & Beachbar am See — Feiern, Hochzeiten & Events direkt anfragbar.",
    accent: "Webdesign + lokale Sichtbarkeit",
  },
];

export default function VorherNachher() {
  return (
    <section
      id="cases"
      className="relative overflow-hidden bg-[var(--surface-2)]/40 py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <SectionEyebrow index="06" label="Echte Cases" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)" }}
        >
          Auftritte, die schon{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              live
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="12"
              viewBox="0 0 120 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 8C 30 2, 60 10, 90 5 S 115 7, 118 4"
                stroke="#db6f16"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>
          </span>{" "}
          sind.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Klick auf eine Karte — sieh dir den fertigen Auftritt direkt an.
        </motion.p>

        <div className="mt-14 grid gap-6 md:mt-16 md:gap-8 xl:grid-cols-2">
          {CASES.map((c, i) => (
            <motion.a
              key={c.client}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_10px_40px_-20px_rgba(10,10,10,0.15)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(22,99,222,0.3)]"
            >
              {/* Browser Frame Mockup */}
              <div className="border-b border-[var(--border)] bg-[var(--surface-2)]/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[var(--text-muted)]">
                    {c.url.replace("https://", "")}
                  </span>
                </div>
              </div>

              {/* Live Site Preview — echter Hero-Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-2)]">
                <Image
                  src={c.image}
                  alt={`Hero-Bereich der Webseite ${c.client}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  priority={i < 1}
                />
              </div>

              {/* Card Footer */}
              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                <span className="self-start rounded-full bg-[var(--accent-glow-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {c.accent}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--text)]">
                    {c.client}
                  </p>
                  <p className="text-[12px] text-[var(--text-subtle)]">
                    {c.location}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed text-[var(--text-muted)]">
                  {c.result}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2.5">
                  Live ansehen
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center text-[12px] text-[var(--text-subtle)]"
        >
          Weitere Cases auf Anfrage im Erstgespräch.
        </motion.p>
      </div>
    </section>
  );
}
