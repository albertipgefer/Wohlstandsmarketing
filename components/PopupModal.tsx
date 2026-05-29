"use client";

/**
 * PopupModal — generischer kleiner Modal-Wrapper für Lead-Magnet,
 * KI-Check-Teaser, Exit-Intent und Co.
 *
 * Features:
 *   - Backdrop leicht abgedunkelt + blur (klickbar = schließen)
 *   - ESC-Taste schließt
 *   - X-Button rechts oben
 *   - max-w-md zentriert, voll responsive (Mobile/iPad/Desktop)
 *   - Body-Scroll-Lock während Modal offen
 *   - Sanfte Fade-/Scale-Animation
 *
 * Stil: identisch zu Inline-CTA — Akzent-Border, Gradient, Pulse-Dot
 * sind Aufgabe des Children-Contents, nicht des Wrappers.
 */

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Optional: aria-Label für den Dialog */
  label?: string;
}

export default function PopupModal({ open, onClose, children, label }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // ESC zum Schließen
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Body-Scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Initial-Focus auf das Dialog-Element
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[70] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300 animate-[fadeIn_.25s_ease-out_forwards]"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative z-[71] w-full max-w-md transform px-4 outline-none animate-[popIn_.32s_cubic-bezier(.22,1,.36,1)_forwards]"
        style={{ opacity: 0 }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/25 bg-gradient-to-br from-white via-white to-[var(--accent-glow-soft)] shadow-[0_30px_80px_-20px_rgba(10,10,10,0.45)] ring-1 ring-[var(--accent)]/5">
          {/* Akzent-Streifen oben */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-[var(--gold)] opacity-80"
          />
          {/* Subtle radial Glow rechts oben */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-12 h-[200px] w-[200px] bg-[radial-gradient(circle,rgba(22,99,222,0.18)_0%,rgba(22,99,222,0)_65%)]"
          />

          {/* Close-Button */}
          <button
            type="button"
            aria-label="Schließen"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[var(--text-muted)] backdrop-blur transition hover:bg-white hover:text-[var(--text)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Inline keyframes — keine globalen Css-Änderungen */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  );
}
