"use client";
/**
 * Google Analytics 4 mit Consent Mode v2 (advanced).
 *
 * - Default: alle Consent-Signale "denied" → GA sendet cookielose Pings, auch
 *   ohne Einwilligung (bewusste Risiko-Entscheidung, siehe Spec 2026-06-23).
 * - Nach Einwilligung ("Alle akzeptieren") → consent update "granted".
 * - Pageviews bei jedem Routenwechsel (App Router); interne Seiten ausgenommen.
 * - No-op, wenn NEXT_PUBLIC_GA_ID fehlt.
 */
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isInternalRoute } from "@/lib/tracking-routes";
import { getConsent, subscribeConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GRANTED = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
} as const;

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const ready = useRef(false);

  // 1) Bootstrap: dataLayer + Consent-Default (denied) + config. Genau einmal,
  //    VOR den Pageview-Effekten (Effekte laufen in Deklarationsreihenfolge).
  useEffect(() => {
    if (!GA_ID || ready.current) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || (gtag as Window["gtag"]);
    window.gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
    if (getConsent() === "accept") {
      window.gtag("consent", "update", GRANTED);
    }
    ready.current = true;
  }, []);

  // 2) Nachträgliche Einwilligung in dieser Session.
  useEffect(() => {
    if (!GA_ID) return;
    return subscribeConsent((d) => {
      if (d === "accept" && typeof window.gtag === "function") {
        window.gtag("consent", "update", GRANTED);
      }
    });
  }, []);

  // 3) Pageview pro Routenwechsel (inkl. erstem) — interne Seiten ausgenommen.
  useEffect(() => {
    if (!GA_ID || isInternalRoute(pathname)) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <Script
      id="ga4-src"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />
  );
}
