import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wohlstandsmarketing",
    short_name: "WSM",
    description:
      "Webdesign + KI-Sichtbarkeit für DACH-Mittelstand. In 90 Tagen auf Google und ChatGPT empfohlen.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#1663de",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
