"use client";
/**
 * Microsoft Clarity (Heatmaps/Replays) — lädt erst nach Einwilligung.
 */
import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";

const CLARITY_PROJECT_ID = "wwyiou5vrl";

export default function ClarityAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (getConsent() === "accept") setAllowed(true);
    return subscribeConsent((d) => {
      if (d === "accept") setAllowed(true);
    });
  }, []);

  if (!allowed) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}
