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
 */
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Interne Routen, auf denen NICHT getrackt wird (gleich wie GlobalOverlays).
const BARE_PREFIXES = [
  "/tools",
  "/rechner",
  "/outreach",
  "/traffic",
  "/finanzen",
  "/angebot",
];

function isInternal(path: string | null): boolean {
  return !!path && BARE_PREFIXES.some((p) => path.startsWith(p));
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Init genau einmal — nur auf öffentlichen Seiten.
  useEffect(() => {
    if (isInternal(pathname)) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Pageview bei jedem Routenwechsel — außer auf internen Seiten.
  useEffect(() => {
    if (isInternal(pathname)) return;
    if (!posthog.__loaded) return;
    posthog.capture("$pageview");
  }, [pathname]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
