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
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
