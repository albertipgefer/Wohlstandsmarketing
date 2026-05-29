"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Floating-CTA unten rechts auf allen Seiten — Lead-Magnet-Booster.
 * Erscheint nach 600px Scroll-Tiefe und versteckt sich auf den
 * KI-Check-Seiten selbst, um Doppel-CTA zu vermeiden.
 */
const HIDDEN_PATHS = [
  "/sichtbarkeits-check",
  "/sichtbarkeits-check/danke",
  "/preise",
];

export default function StickyKiCheckCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Dismiss-Status aus sessionStorage laden (verschwindet bei neuer Session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ki-check-cta-dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  // Erst nach Scroll erscheinen lassen, damit Hero ungestört bleibt
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auf KI-Check-Seiten ausblenden
  if (HIDDEN_PATHS.some((p) => pathname?.startsWith(p))) return null;
  if (dismissed) return null;

  function dismiss() {
    sessionStorage.setItem("ki-check-cta-dismissed", "1");
    setDismissed(true);
  }

  return (
    <div
      inert={!visible}
      className={`pointer-events-none fixed bottom-4 right-4 z-40 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-auto group relative flex w-[232px] items-center gap-3 rounded-full border border-[var(--border)] bg-white py-2 pl-2 pr-3 shadow-[0_14px_40px_-10px_rgba(10,10,10,0.25)] backdrop-blur sm:w-[262px] sm:py-2.5 sm:pl-2.5 sm:pr-4">
        {/* Pulse-Dot */}
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white sm:h-10 sm:w-10">
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-40" />
          <span className="relative text-base">⚡</span>
        </span>

        <Link
          href="/sichtbarkeits-check"
          className="flex flex-col leading-tight"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] sm:text-[12px]">
            Kostenlos
          </span>
          <span className="text-[13px] font-semibold text-[var(--text)] group-hover:underline sm:text-[14px]">
            KI-Check starten →
          </span>
        </Link>

        <button
          type="button"
          aria-label="Hinweis schließen"
          onClick={dismiss}
          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--text-subtle)] transition hover:bg-[var(--bg)] hover:text-[var(--text)]"
        >
          <span className="text-base leading-none">×</span>
        </button>
      </div>
    </div>
  );
}
