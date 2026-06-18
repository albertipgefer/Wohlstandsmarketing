"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { serviceHubs } from "@/content/serviceHubs";
import ServiceIcon from "@/components/preise/ServiceIcon";
import SectionEyebrow from "./_shared/SectionEyebrow";

/**
 * Leistungs-Übersicht — alle Service-Hubs als verlinkte Kacheln.
 * Single Source: content/serviceHubs.ts. Genutzt auf der Startseite und unter /leistungen.
 */
export default function LeistungenUebersicht({
  withEyebrow = true,
}: {
  withEyebrow?: boolean;
}) {
  return (
    <section
      id="leistungen-uebersicht"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-2)]/40 py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {withEyebrow && <SectionEyebrow index="08" label="Leistungen" />}

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 max-w-4xl font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
        >
          Alles für deine{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Sichtbarkeit & Wachstum
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
          {" "}— aus einer Hand.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Von der Webseite über SEO und KI-Sichtbarkeit bis E-Mail-Marketing,
          Content und Automatisierung — alle Leistungen greifen ineinander.
        </motion.p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {serviceHubs.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] outline-none transition hover:-translate-y-0.5 hover:border-[var(--text)] hover:shadow-[0_18px_44px_-22px_rgba(22,99,222,0.3)] focus:outline-none focus-visible:outline-none"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg)] text-[var(--text)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                    <ServiceIcon name={s.icon} size={22} />
                  </span>
                  {s.tag && (
                    <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/[0.07] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                      {s.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[17px] font-bold leading-tight tracking-tight text-[var(--text)] sm:text-[18px]">
                  {s.label}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                  {s.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] transition group-hover:gap-2">
                  Mehr erfahren →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/preise"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-[14px] font-semibold text-white outline-none transition hover:bg-[var(--accent)] focus-visible:outline-none"
          >
            Unverbindliches Angebot zusammenstellen
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/leistungen"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-6 py-3 text-[14px] font-medium text-[var(--text)] outline-none transition hover:border-transparent hover:bg-[var(--text)] hover:text-white focus-visible:outline-none"
          >
            Alle Leistungen im Detail
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
