"use client";

import { motion } from "framer-motion";
import SectionEyebrow from "./_shared/SectionEyebrow";
import ContactForm from "@/components/ContactForm";

const STEPS = [
  {
    no: "01",
    title: "Du erzählst, wo du stehst.",
    desc: "Aktueller Auftritt, Ziele, Branche, bisherige Erfahrungen. 5 Minuten Bestandsaufnahme.",
  },
  {
    no: "02",
    title: "Ich zeige dir, wo deine Konkurrenz dich überholt.",
    desc: "Live-Audit deiner KI-Sichtbarkeit. Du siehst sofort, wo du verlierst — und wo du gewinnen kannst.",
  },
  {
    no: "03",
    title: "Du gehst mit einem klaren Plan raus.",
    desc: "Auch wenn wir nicht zusammenarbeiten. Du weißt, was als Nächstes zu tun ist — kostenlos.",
  },
];

export default function CTABlock() {
  return (
    <section
      id="strategie"
      className="relative overflow-hidden bg-[var(--bg)] py-24 md:py-32"
    >
      {/* Big radial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(22,99,222,0.18)_0%,rgba(22,99,222,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(219,111,22,0.14)_0%,rgba(219,111,22,0)_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        <div className="flex justify-center">
          <SectionEyebrow index="11" label="Nächster Schritt" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-6 max-w-4xl text-center font-[family-name:var(--font-display)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
        >
          15 Minuten, die deinen{" "}
          <span className="relative inline-block">
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              Online-Auftritt
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
          verändern.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
        >
          Wir prüfen gemeinsam, ob die WSM-Methode zu deinem Unternehmen passt.
          Kostenfrei, unverbindlich, mit ehrlicher Einschätzung.
        </motion.p>

        {/* 3 Step Cards */}
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(10,10,10,0.12)] sm:p-7"
            >
              <span className="font-[family-name:var(--font-serif)] text-4xl font-bold italic text-[var(--accent)] sm:text-5xl">
                {s.no}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight text-[var(--text)] sm:text-xl">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--text-muted)]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <a
            href="https://tidycal.com/albertipgefer/erstgespraech-mit-wohlstandsmarketing-2"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] px-9 py-5 text-base font-semibold text-white shadow-[0_14px_40px_-10px_rgba(22,99,222,0.55)] transition hover:shadow-[0_18px_50px_-10px_rgba(22,99,222,0.8)] sm:w-auto"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Erstgespräch sichern</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-subtle)] sm:text-[12px]">
            15-Min · Kostenfrei · Albert Ipgefer persönlich
          </p>
        </motion.div>

        {/* Divider */}
        <div className="mt-16 flex items-center gap-4 sm:mt-20">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
            Oder
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* Contact Form */}
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
