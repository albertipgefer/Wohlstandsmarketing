"use client";
/**
 * Seenpilot (Visitor-/Lead-Tracking) — lädt erst nach Einwilligung.
 * Vor "Alle akzeptieren" wird das Snippet nicht geladen (DSGVO, einheitlich
 * mit GA4/PostHog/Clarity).
 */
import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";

const SEENPILOT_SRC =
  "https://seenpilot.com/snippet/csk_b2028487-1f91-4b95-8d6f-bfe994cd2819.CJNagiYtfr2oRx6yA4GhmS67YtgPsZxo.js";

export default function SeenpilotAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (getConsent() === "accept") setAllowed(true);
    return subscribeConsent((d) => {
      if (d === "accept") setAllowed(true);
    });
  }, []);

  if (!allowed) return null;

  return <Script id="seenpilot" strategy="afterInteractive" src={SEENPILOT_SRC} />;
}
