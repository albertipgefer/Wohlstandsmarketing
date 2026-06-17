import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer serverseitig nicht bundeln (fontkit u. a. native-nah).
  serverExternalPackages: ["@react-pdf/renderer"],
  // PostHog Reverse-Proxy (EU): Tracking läuft über die eigene Domain (/ingest),
  // umgeht Adblocker und hält den Datenfluss in der EU (eu.i.posthog.com).
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog empfiehlt das für den Proxy (sonst Redirect-Probleme bei /ingest).
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
