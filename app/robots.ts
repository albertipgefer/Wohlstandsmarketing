import type { MetadataRoute } from "next";

const SITE = "https://wohlstandsmarketing.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all — interner Tool-Bereich ausgenommen
      { userAgent: "*", allow: "/", disallow: ["/tools", "/*?s="] },
      // Explicitly allow major AI crawlers
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
