"use client";
/**
 * PostHog-Tracking für die ÖFFENTLICHE Website (EU, datenschutzfreundlich).
 *
 * - Läuft NICHT auf internen, passwortgeschützten Seiten (BARE_PREFIXES) —
 *   konsistent mit der Nackt-Regel (siehe components/GlobalOverlays.tsx).
 * - EU-Server über den Reverse-Proxy /ingest (siehe next.config.ts).
 * - Datenschutzfreundlich: anonyme Besucher bekommen kein Personenprofil
 *   (person_profiles: 'identified_only'), Session-Recording aus (das macht
 *   bereits Microsoft Clarity).
 * - Pageviews werden im App Router manuell bei jedem Routenwechsel erfasst.
 * - Init erst nach Einwilligung (DSGVO).
 */
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";
import { isInternalRoute } from "@/lib/tracking-routes";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Init genau einmal — nur auf öffentlichen Seiten UND nach Einwilligung.
  useEffect(() => {
    if (isInternalRoute(pathname)) return;

    const initIfAllowed = (fireInitialPageview: boolean) => {
      if (getConsent() !== "accept") return;
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      if (!key || posthog.__loaded) return;
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false, // App Router → manuell (siehe unten)
        capture_pageleave: true,
        disable_session_recording: true, // Clarity übernimmt Heatmaps/Replays
      });
      // Beim Mount-Init übernimmt der reguläre Pageview-Effekt den ersten
      // Pageview. Nur beim späten Opt-in (Subscription) feuern wir ihn hier,
      // weil der Pageview-Effekt mangels pathname-Wechsel nicht erneut läuft.
      if (fireInitialPageview) posthog.capture("$pageview");
    };

    initIfAllowed(false);
    return subscribeConsent((d) => {
      if (d === "accept") initIfAllowed(true);
    });
  }, [pathname]);

  // Pageview bei jedem Routenwechsel — außer auf internen Seiten.
  useEffect(() => {
    if (isInternalRoute(pathname)) return;
    if (!posthog.__loaded) return;
    posthog.capture("$pageview");
  }, [pathname]);

  // Zentrale Conversion-/Engagement-Events (DRY für überall verteilte Links):
  // Erstgespräch-Klick (TidyCal/cal.com), Anruf, E-Mail, Scroll-Tiefe.
  useEffect(() => {
    if (isInternalRoute(pathname)) return;
    if (!posthog.__loaded) return;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      const href = a?.getAttribute("href") || "";
      if (!href) return;
      if (href.startsWith("tel:")) {
        posthog.capture("anruf_klick", { href, seite: pathname });
      } else if (href.startsWith("mailto:")) {
        posthog.capture("email_klick", { href, seite: pathname });
      } else if (/tidycal|cal\.com/i.test(href)) {
        posthog.capture("erstgespraech_geklickt", { href, seite: pathname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    // Scroll-Tiefe: jede Schwelle einmal pro Seitenaufruf.
    const reached = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (doc.scrollTop / max) * 100;
      for (const t of [25, 50, 75, 100]) {
        if (pct >= t && !reached.has(t)) {
          reached.add(t);
          posthog.capture("scroll_tiefe", { tiefe: t, seite: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
