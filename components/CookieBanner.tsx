"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "wsm-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      /* localStorage blocked → don't show */
    }
  }, []);

  function persist(decision: "accept" | "decline") {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ decision, at: new Date().toISOString() })
      );
    } catch {
      /* noop */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[100] sm:inset-x-5 sm:bottom-5"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white/95 p-5 shadow-[0_24px_60px_-20px_rgba(10,10,10,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex-1">
              <p className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight text-[var(--text)]">
                Cookies &amp; Datenschutz
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-muted)]">
                Wir nutzen technische Cookies zur Bereitstellung dieser Seite
                und optionale Analyse-Tools, um die Sichtbarkeit zu messen.
                Details in der{" "}
                <Link
                  href="/datenschutz"
                  className="text-[var(--accent)] underline-offset-2 hover:underline"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                onClick={() => persist("decline")}
                className="rounded-full border border-[var(--border-strong)] bg-white px-5 py-2.5 text-[13px] font-medium text-[var(--text)] transition hover:bg-[var(--surface-2)]"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => persist("accept")}
                className="rounded-full bg-[var(--text)] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--accent)]"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
