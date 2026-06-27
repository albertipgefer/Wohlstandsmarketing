"use client";

/**
 * Globale Overlays (WhatsApp-Button, Marketing-Popups, Cookie-Banner).
 * Auf internen/passwortgeschützten Seiten werden sie ausgeblendet — dort
 * soll es schlicht bleiben: KEINE Badges (WhatsApp, KI-Check), KEINE
 * Mail-/Marketing-Popups, kein Cookie-Banner.
 *
 * ‼️ REGEL: Jede NEUE interne, passwortgeschützte Route MUSS in
 * lib/tracking-routes.ts als Prefix ergänzt werden. Interne Seiten bleiben
 * nackt — nur die App selbst, kein Marketing-Beiwerk und kein Marketing-Footer.
 */
import { usePathname } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import MarketingOverlays from "@/components/MarketingOverlays";
import CursorGlow from "@/components/CursorGlow";
import { isInternalRoute, isBareLandingRoute } from "@/lib/tracking-routes";

export default function GlobalOverlays() {
  const pathname = usePathname();
  if (isInternalRoute(pathname)) return null;

  // Conversion-Landingpages: nur Cookie-Banner (DSGVO), keine Marketing-Overlays.
  if (isBareLandingRoute(pathname)) return <CookieBanner />;

  return (
    <>
      <CursorGlow />
      <WhatsAppButton />
      <MarketingOverlays />
      <CookieBanner />
    </>
  );
}
