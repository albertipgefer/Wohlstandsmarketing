import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { cities } from "@/content/cities";
import { industries } from "@/content/industries";
import { hasIndustryServiceContent } from "@/content/industry-service";

const SITE = "https://wohlstandsmarketing.de";

/**
 * Stabiles Content-Revisionsdatum.
 *
 * WICHTIG: NICHT `new Date()` verwenden. Sonst meldet die Sitemap bei JEDEM
 * Deploy *alle* URLs als „heute geändert" — Google lernt, dass die Datumsangaben
 * wertlos sind, und ignoriert sie (negatives Crawl-Signal).
 *
 * Diesen Wert nur dann hochsetzen, wenn der Seiten-Content (Templates/Daten)
 * inhaltlich überarbeitet wurde. Blog-Artikel nutzen ihr eigenes `meta.date`.
 */
const CONTENT_REVISED = new Date("2026-06-18");

/**
 * Crawl-Budget-Strategie (Stand 21.06.2026):
 *
 * Branche×Service-Kombis kommen nur in die Sitemap, wenn `hasIndustryServiceContent`
 * true zurückgibt (Content-Gate). Dünne Fallback-Seiten ohne einzigartigen Content
 * werden bewusst ausgelassen — Crawl-Budget bündeln statt verteilen.
 *
 * Branche-Hubs (/branchen/[branche]) und Stadt-Seiten bleiben vollständig drin —
 * sie tragen eigenständigen Unique-Content (USPs, Bullets, FAQs) und ranken bereits.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: CONTENT_REVISED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/blog`, lastModified: CONTENT_REVISED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/branchen`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/standorte`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/sichtbarkeits-check`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE}/preise`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/webdesign`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/ki-sichtbarkeit`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/seo`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/relaunch`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/leistungen`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/content-marketing`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/e-mail-marketing`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/ki-optimierung`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/web-apps`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/vergleich/seo-vs-ki-sichtbarkeit`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/vergleich/landingpage-vs-unternehmenswebsite`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/vergleich/relaunch-vs-neue-webseite`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/vergleich/agentur-vs-inhouse-seo`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/vergleich/ki-optimierung-vs-ki-sichtbarkeit`, lastModified: CONTENT_REVISED, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/impressum`, lastModified: CONTENT_REVISED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/datenschutz`, lastModified: CONTENT_REVISED, changeFrequency: "yearly", priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.meta.slug}`,
    lastModified: new Date(p.meta.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE}/webdesign/${c.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const kiVisibilityCityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE}/ki-sichtbarkeit/${c.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const seoCityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE}/seo/${c.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${SITE}/branchen/${i.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Stadt-Routen der NEUEN Leistungen (E-Mail-Marketing, Content-Marketing,
  // KI-Optimierung, Web-Apps). Die Seiten existieren und sind intern über die
  // Hubs verlinkt — werden aber bewusst NICHT sofort gesammelt in die Sitemap
  // eingereicht (Crawl-Budget bündeln, siehe oben). Flag auf true setzen, sobald
  // die Hub-Seiten indexiert sind und Domain-Autorität steigt (spätere Welle).
  const INCLUDE_NEW_SERVICE_CITY_ROUTES = false;
  const newServiceCitySlugs = [
    "e-mail-marketing",
    "content-marketing",
    "ki-optimierung",
    "web-apps",
  ];
  const newServiceCityRoutes: MetadataRoute.Sitemap = INCLUDE_NEW_SERVICE_CITY_ROUTES
    ? newServiceCitySlugs.flatMap((svc) =>
        cities.map((c) => ({
          url: `${SITE}/${svc}/${c.slug}`,
          lastModified: CONTENT_REVISED,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      )
    : [];

  // Nur Kombis mit einzigartigem Content kommen in die Sitemap (Content-Gate).
  // Verhindert das Einreichen dünner Seiten (Crawl-Budget bündeln).
  const industryServiceRoutes: MetadataRoute.Sitemap = industries.flatMap((i) =>
    i.serviceSlugs
      .filter((slug) => hasIndustryServiceContent(i.slug, slug))
      .map((slug) => ({
        url: `${SITE}/branchen/${i.slug}/${slug}`,
        lastModified: CONTENT_REVISED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );

  return [
    ...staticRoutes,
    ...postRoutes,
    ...cityRoutes,
    ...kiVisibilityCityRoutes,
    ...seoCityRoutes,
    ...industryRoutes,
    ...industryServiceRoutes,
    ...newServiceCityRoutes,
  ];
}
