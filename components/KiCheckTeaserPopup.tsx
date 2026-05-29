"use client";

/**
 * KiCheckTeaserPopup — kleines Popup nach 10 Sekunden Verweildauer.
 *
 * Inhalt: Kurzer Pitch für den kostenlosen KI-Sichtbarkeits-Check + CTA.
 * Stil identisch zu Inline-CTA (Akzent-Border, Pulse-Dot, schwarzer Button
 * mit Blau-Hover).
 *
 * Regeln:
 *   - Erscheint nach 10s erstmals
 *   - Wird auf folgenden Pfaden NICHT gezeigt:
 *     /sichtbarkeits-check*, /preise, /preise/danke, /impressum, /datenschutz
 *   - 1× pro Session via sessionStorage("ki-check-popup-shown")
 *   - Schließbar via X, Backdrop-Klick, ESC
 *   - Wenn geschlossen: setzt das Flag, kommt in der Session nicht wieder
 *   - Synchron mit ExitIntentPopup: wenn einer offen ist / war, blockt
 *     er den anderen nicht — beide haben unabhängige Flags
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PopupModal from "./PopupModal";
import { isFormActive } from "@/lib/form-active";
import { tryOpenPopup, markPopupClosed, remainingCooldownMs } from "@/lib/popupCoordinator";

const HIDDEN_PATHS = [
  "/sichtbarkeits-check",
  "/preise",
  "/impressum",
  "/datenschutz",
];

const DELAY_MS = 35_000;
const STORAGE_KEY = "ki-check-popup-shown";

export default function KiCheckTeaserPopup() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (hidden) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    // Wenn der User gerade in einer Form tippt, NICHT triggern — stattdessen
    // alle 2 Sekunden nochmal probieren, bis Form-Focus weg ist.
    function tryOpen() {
      if (isFormActive()) {
        window.setTimeout(tryOpen, 2000);
        return;
      }
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
      // Popup-Coordinator: nicht öffnen wenn anderer Popup offen / Cooldown läuft
      if (!tryOpenPopup("ki-check-teaser")) {
        const wait = Math.max(remainingCooldownMs() + 500, 2000);
        window.setTimeout(tryOpen, wait);
        return;
      }
      // Flag SOFORT setzen, damit das Popup nicht bei jedem Seitenwechsel
      // erneut feuert, wenn der User es nicht aktiv geschlossen hat.
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }

    const t = window.setTimeout(tryOpen, DELAY_MS);
    return () => window.clearTimeout(t);
  }, [hidden, pathname]);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    markPopupClosed("ki-check-teaser");
    setOpen(false);
  }

  if (hidden) return null;

  return (
    <PopupModal open={open} onClose={close} label="KI-Sichtbarkeits-Check anbieten">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] shadow-[0_4px_14px_-6px_rgba(22,99,222,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          60 Sekunden · Kostenlos
        </span>

        <h3
          className="mt-5 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.025em] text-[var(--text)]"
          style={{ fontSize: "clamp(1.35rem, 4vw, 1.75rem)" }}
        >
          Wird deine Seite von{" "}
          <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
            ChatGPT
          </span>{" "}
          empfohlen?
        </h3>

        <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
          Mach den kostenlosen KI-Sichtbarkeits-Check: 20+ Prüfpunkte, Live-Score, drei konkrete Hebel zum Sofort-Umsetzen. Direkt in deinem Browser.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3">
          <Link
            href="/sichtbarkeits-check"
            onClick={close}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--text)] !text-white px-8 py-4 text-[15px] font-semibold no-underline shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)] transition hover:shadow-[0_16px_44px_-12px_rgba(22,99,222,0.55)]"
          >
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 !text-white">Jetzt kostenlos checken</span>
            <span className="relative z-10 !text-white transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <button
            type="button"
            onClick={close}
            className="text-[13px] font-semibold text-[var(--text-muted)] underline-offset-4 transition hover:text-[var(--text)] hover:underline"
          >
            Vielleicht später
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
