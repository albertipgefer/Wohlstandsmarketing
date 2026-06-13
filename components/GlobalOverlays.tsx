"use client";

/**
 * Globale Overlays (WhatsApp-Button, Marketing-Popups, Cookie-Banner).
 * Auf internen/passwortgeschützten Seiten werden sie ausgeblendet — dort
 * soll es schlicht bleiben (keine Pop-ups). Aktuell: /tools (interne
 * Tool-Übersicht), /rechner (Closing-Call), /outreach (Dashboard).
 */
import { usePathname } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import MarketingOverlays from "@/components/MarketingOverlays";

const BARE_PREFIXES = ["/tools", "/rechner", "/outreach"];

export default function GlobalOverlays() {
  const pathname = usePathname();
  if (pathname && BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      <WhatsAppButton />
      <MarketingOverlays />
      <CookieBanner />
    </>
  );
}
