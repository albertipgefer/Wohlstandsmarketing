"use client";

/**
 * Globale Overlays (WhatsApp-Button, Marketing-Popups, Cookie-Banner).
 * Auf internen/passwortgeschützten Seiten werden sie ausgeblendet — dort
 * soll es schlicht bleiben: KEINE Badges (WhatsApp, KI-Check), KEINE
 * Mail-/Marketing-Popups, kein Cookie-Banner.
 *
 * ‼️ REGEL: Jede NEUE interne, passwortgeschützte Route MUSS hier als Prefix
 * ergänzt werden. Interne Seiten bleiben nackt — nur die App selbst, kein
 * Marketing-Beiwerk und kein Marketing-Footer.
 */
import { usePathname } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import MarketingOverlays from "@/components/MarketingOverlays";
import CursorGlow from "@/components/CursorGlow";

const BARE_PREFIXES = [
  "/tools",
  "/rechner",
  "/outreach",
  "/analytics",
  "/finanzen",
  "/angebot",
];

export default function GlobalOverlays() {
  const pathname = usePathname();
  if (pathname && BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      <CursorGlow />
      <WhatsAppButton />
      <MarketingOverlays />
      <CookieBanner />
    </>
  );
}
