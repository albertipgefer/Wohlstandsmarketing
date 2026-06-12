"use client";

import { usePathname } from "next/navigation";
import StickyKiCheckCTA from "@/components/StickyKiCheckCTA";
import KiCheckTeaserPopup from "@/components/KiCheckTeaserPopup";
import ExitIntentPopup from "@/components/ExitIntentPopup";

/**
 * Bündelt die Marketing-Overlays (Lead-Capture-Popups + Sticky-CTA) und blendet
 * sie auf internen Dashboard-/Tool-Routen aus — dort sind sie fehl am Platz.
 * Neue interne Route? Einfach unten ergänzen.
 */
const HIDDEN_PREFIXES = ["/outreach", "/angebot", "/finanzen"];

export default function MarketingOverlays() {
  const pathname = usePathname() || "";
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return (
    <>
      <StickyKiCheckCTA />
      <KiCheckTeaserPopup />
      <ExitIntentPopup />
    </>
  );
}
