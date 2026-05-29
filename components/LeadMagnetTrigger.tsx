"use client";

/**
 * LeadMagnetTrigger — Footer-Link, der statt direkt auf die PDF zu führen
 * ein Popup mit dem LeadMagnetForm öffnet. So bekommen Interessenten die
 * "11 teuersten Marketing-Fehler" nur über den Double-Opt-In-Flow.
 */

import { useState } from "react";
import PopupModal from "@/components/PopupModal";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { tryOpenPopup, markPopupClosed } from "@/lib/popupCoordinator";

export default function LeadMagnetTrigger({
  source = "footer",
  className = "",
  children,
}: {
  source?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    // User-initiated: andere Popups sofort als geschlossen markieren und
    // diesen öffnen — der User klickt explizit.
    if (!tryOpenPopup("lead-magnet-trigger")) {
      // Falls anderer Popup automatisch aktiv: trotzdem zulassen (User-Intent gewinnt)
      markPopupClosed("any");
      tryOpenPopup("lead-magnet-trigger");
    }
    setOpen(true);
  }

  function handleClose() {
    markPopupClosed("lead-magnet-trigger");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={className}
      >
        {children}
      </button>

      <PopupModal
        open={open}
        onClose={handleClose}
        label="Lead-Magnet: 11 teuerste Marketing-Fehler im Mittelstand"
      >
        <div className="text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            Kostenfrei
          </span>
          <h3
            className="mt-4 font-[family-name:var(--font-display)] font-black leading-[1.1] tracking-[-0.02em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.75rem)" }}
          >
            Die{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic text-[var(--accent)]">
              11 teuersten Marketing-Fehler
            </span>{" "}
            im Mittelstand.
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            Hol dir die PDF kostenfrei. Du bekommst innerhalb von 24 Stunden eine
            Bestätigungs-Mail und danach den Download-Link für die 11
            kostspieligsten Fehler — und wie du sie konkret vermeidest.
          </p>
          <div className="mt-5">
            <LeadMagnetForm source={source} compact onSuccess={() => {}} />
          </div>
        </div>
      </PopupModal>
    </>
  );
}
