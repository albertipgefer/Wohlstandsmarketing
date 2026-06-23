"use client";
/**
 * Google Analytics 4 — strikter Opt-in (lädt erst nach Einwilligung).
 *
 * - Vor "Alle akzeptieren" wird NICHTS geladen und NICHTS übertragen (kein
 *   gtag.js, keine Pings). Einheitlich mit PostHog/Clarity → maximal
 *   abmahnsicher (siehe Spec 2026-06-23, von Cookieless auf strikt opt-in
 *   umgestellt, da GA4 für die eigene Seite nicht entscheidungsrelevant ist).
 * - Bei Einwilligung wird gtag mit Consent Mode "granted" geladen.
 * - Pageviews bei jedem Routenwechsel (App Router); interne Seiten ausgenommen.
 * - No-op, wenn NEXT_PUBLIC_GA_ID fehlt.
 */
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isInternalRoute } from "@/lib/tracking-routes";
import { getConsent, subscribeConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const ready = useRef(false);

  // Einwilligung beobachten — erst dann GA4 aktivieren.
  useEffect(() => {
    if (!GA_ID) return;
    if (getConsent() === "accept") setAllowed(true);
    return subscribeConsent((d) => {
      if (d === "accept") setAllowed(true);
    });
  }, []);

  // Bootstrap erst nach Einwilligung: dataLayer + Consent "granted" + config.
  // VOR dem Pageview-Effekt deklariert (Effekte laufen in Reihenfolge).
  useEffect(() => {
    if (!GA_ID || !allowed || ready.current) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || (gtag as Window["gtag"]);
    window.gtag("consent", "default", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
    ready.current = true;
  }, [allowed]);

  // Pageview pro Routenwechsel (nach Einwilligung) — interne Seiten ausgenommen.
  useEffect(() => {
    if (!GA_ID || !allowed || isInternalRoute(pathname)) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [allowed, pathname]);

  if (!GA_ID || !allowed) return null;

  return (
    <Script
      id="ga4-src"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
    />
  );
}
