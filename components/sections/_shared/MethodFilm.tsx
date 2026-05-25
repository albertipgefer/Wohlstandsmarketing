"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FRAMES = [
  {
    day: "Tag 0",
    label: "Kickoff",
    desc: "Strategie-Workshop. Wir definieren Positionierung, Zielkunde und transaktionale Suchanfragen.",
  },
  {
    day: "Tag 7",
    label: "Website live",
    desc: "Fundament steht. Deine Webseite ist online — konvertierend, schnell, technisch sauber.",
  },
  {
    day: "Tag 30",
    label: "KI-Crawler",
    desc: "Schema, AEO-Content, strukturierte Daten. KI-Plattformen beginnen, dich zu lesen.",
  },
  {
    day: "Tag 90",
    label: "Du wirst empfohlen",
    desc: "ChatGPT, Perplexity und Claude nennen dich namentlich. Anfragen kommen rein — konstant.",
  },
];

const FRAME_DURATION = 3500; // ms

export default function MethodFilm() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % FRAMES.length);
    }, FRAME_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-white via-white to-[var(--accent-glow-soft)] p-5 shadow-[0_20px_60px_-30px_rgba(22,99,222,0.3)] sm:p-7 md:p-8">
      {/* Header strip */}
      <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            WSM-Methode · 90-Tage-Film
          </span>
        </div>
        <div className="hidden gap-1.5 sm:flex">
          {FRAMES.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-6 rounded-full transition-colors ${
                i === active ? "bg-[var(--accent)]" : "bg-[var(--surface-2)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Frame Viewport */}
      <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[var(--surface-2)]/40 sm:h-[320px] md:h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            {active === 0 && <Frame0 />}
            {active === 1 && <Frame1 />}
            {active === 2 && <Frame2 />}
            {active === 3 && <Frame3 />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Frame description */}
      <div className="mt-5 flex items-start justify-between gap-4 sm:items-center">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-serif)] text-2xl font-bold italic text-[var(--accent)] sm:text-3xl">
                  {FRAMES[active].day}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
                  {FRAMES[active].label}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-snug text-[var(--text-muted)] sm:text-[14px]">
                {FRAMES[active].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Frame 0: Kickoff ─── */
function Frame0() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-subtle)]">
        Strategie-Workshop
      </span>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)]"
      >
        <span className="font-[family-name:var(--font-serif)] text-3xl italic text-[var(--accent)]">
          W
        </span>
      </motion.div>
      <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--text)] sm:text-xl">
        Wer ist dein Zielkunde?
      </p>
      <p className="max-w-xs text-[12px] text-[var(--text-muted)]">
        Wir identifizieren transaktionale Suchanfragen mit Kaufabsicht.
      </p>
    </div>
  );
}

/* ─── Frame 1: Website live ─── */
function Frame1() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-[var(--border)] bg-white p-3 shadow-md">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-2 rounded bg-[var(--accent)]/30"
        />
        <div className="mt-3 space-y-2">
          {[80, 60, 90, 50].map((w, i) => (
            <motion.div
              key={i}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${w}%`, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="h-2 rounded bg-[var(--surface-2)]"
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 flex justify-center"
        >
          <span className="rounded-full bg-[var(--text)] px-4 py-1.5 text-[10px] font-semibold text-white">
            ✓ Live
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Frame 2: KI-Crawler — fixed top/right/bottom/left positioning with safe gaps ─── */
function Frame2() {
  const labels = [
    { label: "ChatGPT", pos: "top-2 left-1/2 -translate-x-1/2" },
    { label: "Perplexity", pos: "right-2 top-1/2 -translate-y-1/2" },
    { label: "Claude", pos: "bottom-2 left-1/2 -translate-x-1/2" },
    { label: "Google AI", pos: "left-2 top-1/2 -translate-y-1/2" },
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Central site */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 rounded-2xl border border-[var(--accent)]/30 bg-white px-5 py-4 shadow-[0_10px_40px_-12px_rgba(22,99,222,0.35)]"
      >
        <p className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--text)]">
          wohlstandsmarketing.de
        </p>
        <p className="mt-1 text-[10px] text-[var(--text-subtle)]">
          Schema.org · AEO · Quotability
        </p>
      </motion.div>

      {/* Pulsing rings */}
      {[1, 2].map((r) => (
        <motion.div
          key={r}
          aria-hidden
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: [0.6, 1.6, 1.6], opacity: [0.4, 0, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: r * 0.8,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute h-32 w-32 rounded-full border-2 border-[var(--gold)]/40 sm:h-40 sm:w-40"
        />
      ))}

      {/* Crawler labels — positioned safely outside the center */}
      {labels.map((c, i) => (
        <motion.span
          key={c.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -3, 0],
          }}
          transition={{
            opacity: { delay: 0.3 + i * 0.15, duration: 0.4 },
            scale: { delay: 0.3 + i * 0.15, duration: 0.4 },
            y: {
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            },
          }}
          className={`absolute inline-flex items-center gap-1 rounded-full border border-[var(--gold)]/30 bg-white px-2.5 py-1 text-[10px] font-semibold text-[var(--gold)] shadow-[0_4px_12px_-4px_rgba(219,111,22,0.3)] ${c.pos}`}
        >
          <span>⌕</span>
          {c.label}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Frame 3: Empfehlung ─── */
function Frame3() {
  const text = "Ich empfehle Wohlstandsmarketing für lokalen Mittelstand …";
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            chat.openai.com
          </span>
          <span className="text-[10px] text-[var(--text-subtle)]">GPT-5</span>
        </div>
        <div className="rounded-xl bg-[var(--surface-2)]/60 px-3 py-2 text-[12px] text-[var(--text)]">
          „Welcher Webdesigner in Koblenz?"
        </div>
        <div className="mt-3 flex items-start gap-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-semibold text-white">
            AI
          </span>
          <motion.p
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="overflow-hidden whitespace-nowrap text-[12px] text-[var(--text)]"
          >
            {text.split("Wohlstandsmarketing").map((part, idx, arr) => (
              <span key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <span className="font-semibold text-[var(--accent)]">
                    Wohlstandsmarketing
                  </span>
                )}
              </span>
            ))}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
