import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { cities } from "@/content/cities";

const SITE = "https://wohlstandsmarketing.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/standorte`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/sichtbarkeits-check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.meta.slug}`,
    lastModified: new Date(p.meta.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE}/webdesign/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...postRoutes, ...cityRoutes];
}
