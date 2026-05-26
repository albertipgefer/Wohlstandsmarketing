"use client";

/**
 * ExitIntentPopup — Lead-Magnet-Popup beim Verlassen der Seite.
 *
 * Trigger:
 *   - Desktop: mouseleave nach oben (clientY < 8) — klassische Exit-Intent-Erkennung.
 *   - Mobile/Tablet: deutlicher Scroll-Up nachdem 50%+ der Seite gescrollt wurden
 *     (= Indiz für "abbrechen wollen") — Fallback, weil Mobile keine echte
 *     Exit-Intent-Bewegung kennt.
 *
 * Regeln:
 *   - Frühestens nach 30s Verweildauer (sonst nervig)
 *   - 1× pro Session via sessionStorage("exit-intent-shown")
 *   - Auf folgenden Pfaden NICHT: /sichtbarkeits-check*, /preise, /impressum,
 *     /datenschutz, /preise/danke
 *   - Konkurrenz mit KiCheckTeaserPopup: Exit-Intent erscheint ohnehin nur
 *     wenn der Besucher die Seite verlässt — beide Popups bissen sich nicht
 *     in der Praxis, weil sie unterschiedliche Trigger haben. Falls beide
 *     gleichzeitig dran wären, blockt unsere `lastShown`-Logik im Layout.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PopupModal from "./PopupModal";
import LeadMagnetForm from "./LeadMagnetForm";

const HIDDEN_PATHS = [
  "/sichtbarkeits-check",
  "/preise",
  "/impressum",
  "/datenschutz",
];

const MIN_DWELL_MS = 30_000;
const STORAGE_KEY = "exit-intent-shown";

export default function ExitIntentPopup() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (hidden) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const ts = Date.now();
    let dismissed = false;
    let mobileStartScroll: number | null = null;

    function trigger() {
      if (dismissed) return;
      if (Date.now() - ts < MIN_DWELL_MS) return;
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
      dismissed = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }

    // Desktop: Maus verlässt oben
    function onMouseLeave(e: MouseEvent) {
      // e.clientY < 8 → Maus bewegt sich aus dem Viewport nach oben
      // relatedTarget === null → echtes Verlassen, nicht Tab-Wechsel
      if (e.clientY <= 8 && !e.relatedTarget) trigger();
    }

    // Mobile: starker Scroll-Up nach 50% Seitentiefe
    function onScroll() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? y / max : 0;
      if (progress > 0.5 && mobileStartScroll === null) mobileStartScroll = y;
      if (
        mobileStartScroll !== null &&
        y < mobileStartScroll - 240 // 240px schnelles Hoch-Scrollen
      ) {
        trigger();
      }
    }

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hidden, pathname]);

  function close() {
    setOpen(false);
  }

  if (hidden) return null;

  return (
    <PopupModal open={open} onClose={close} label="Lead-Magnet beim Verlassen anbieten">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)] shadow-[0_4px_14px_-6px_rgba(219,111,22,0.25)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          Bevor du gehst
        </span>

        <h3
          className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.025em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.35rem, 4vw, 1.75rem)" }}
        >
          Nimm dir die{" "}
          <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
            11 teuersten
          </span>{" "}
          Marketing-Fehler mit.
        </h3>

        <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--text-muted)] sm:text-[14.5px]">
          12-Seiten-PDF mit konkreten Lösungen pro Fehler + einer Profi-Checkliste für die nächsten 30 Tage. Kostenfrei, direkt in dein Postfach.
        </p>

        <div className="mt-6 text-left">
          <LeadMagnetForm source="exit-intent" compact onSuccess={() => {}} />
        </div>
      </div>
    </PopupModal>
  );
}
