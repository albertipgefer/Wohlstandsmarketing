import type { Post } from "./types";

// ── KI-Sichtbarkeit (11) ──────────────────────────────────────────────
import * as ki2026 from "./posts/ki-sichtbarkeit-chatgpt-2026";
import * as aeoVsSeo from "./posts/aeo-vs-seo-2026";
import * as perplexitySeo from "./posts/perplexity-seo-2026";
import * as googleAiOverviews from "./posts/google-ai-overviews-2026";
import * as chatgptKonkurrenz from "./posts/chatgpt-konkurrenz-positionierung";
import * as bingCopilot from "./posts/bing-copilot-seo";
import * as voiceSearch from "./posts/voice-search-2026";
import * as ccgVergleich from "./posts/chatgpt-claude-gemini-vergleich";
import * as kiMessen from "./posts/ki-sichtbarkeit-messen";
import * as branchenKi from "./posts/branchen-spezifische-ki-seo";
import * as zeroClick from "./posts/zero-click-seo";

// ── Technisches SEO (11) ──────────────────────────────────────────────
import * as schemaOrg from "./posts/schema-org-lokale-anbieter";
import * as robotsTxt from "./posts/robots-txt-ki-crawler";
import * as coreWebVitals from "./posts/core-web-vitals-2026";
import * as sitemapXml from "./posts/sitemap-xml-2026";
import * as hreflangDach from "./posts/hreflang-dach";
import * as openGraph from "./posts/open-graph-social-previews";
import * as pageExperience from "./posts/page-experience-2026";
import * as lighthouse from "./posts/lighthouse-vs-pagespeed";
import * as internalLinking from "./posts/internal-linking-2026";
import * as httpsHsts from "./posts/https-hsts-2026";
import * as jsSeo from "./posts/javascript-seo-spa";

// ── Lokales SEO (9) ───────────────────────────────────────────────────
import * as lokalesSeo from "./posts/lokales-seo-google-maps-chatgpt";
import * as gbpOptimierungen from "./posts/gbp-12-optimierungen";
import * as lokaleBacklinks from "./posts/lokale-backlinks";
import * as appleBusiness from "./posts/apple-business-connect";
import * as stadtSeiten from "./posts/stadt-seiten-skalieren";
import * as yelp from "./posts/yelp-2026";
import * as lokaleSchemaTricks from "./posts/lokale-schema-tricks";
import * as multiLocation from "./posts/multi-location-seo";
import * as saisonalesSeo from "./posts/saisonales-seo";

// ── Webdesign (10) ────────────────────────────────────────────────────
import * as webdesignTrends from "./posts/webdesign-trends-2026";
import * as webdesignHandwerker from "./posts/webdesign-fuer-handwerker";
import * as webdesignAnwaelte from "./posts/webdesign-fuer-anwaelte";
import * as webdesignBerater from "./posts/webdesign-fuer-berater";
import * as headlessCms from "./posts/headless-cms-2026";
import * as darkVsLight from "./posts/dark-vs-light-mode";
import * as wdRestaurants from "./posts/webdesign-restaurants";
import * as wdShops from "./posts/webdesign-onlineshops";
import * as wdCoaches from "./posts/webdesign-coaches";
import * as multilingual from "./posts/multilingual-webdesign";

// ── Conversion (9) ────────────────────────────────────────────────────
import * as conversion from "./posts/conversion-webseiten-2026";
import * as landingpageStruktur from "./posts/landingpage-struktur-2026";
import * as b2bFunnel from "./posts/b2b-funnel-erstgespraech";
import * as trustElemente from "./posts/trust-elemente-2026";
import * as mobileForms from "./posts/mobile-forms-2026";
import * as abTesting from "./posts/ab-testing-mittelstand";
import * as pricingSeiten from "./posts/pricing-seiten";
import * as newsletter from "./posts/newsletter-funnel";
import * as salesPages from "./posts/sales-pages-2026";

// ── Transaktionale Kauf-Intention (15 — Mai 2026) ─────────────────────
import * as webdesignKosten from "./posts/webdesign-kosten-2026";
import * as webseiteErstellenLassen from "./posts/webseite-erstellen-lassen-mittelstand";
import * as seoHandwerker from "./posts/seo-agentur-fuer-handwerker";
import * as kiAgenturVergleich from "./posts/ki-sichtbarkeit-agentur-vergleich";
import * as chatgptAgentur from "./posts/chatgpt-optimierung-agentur";
import * as landingpageKosten from "./posts/landingpage-erstellen-lassen-kosten";
import * as relaunchKosten from "./posts/webseiten-relaunch-kosten";
import * as wdCoaches2 from "./posts/webdesigner-fuer-coaches";
import * as hochzeitsfotografen from "./posts/webseite-fuer-hochzeitsfotografen";
import * as eventlocations from "./posts/webdesigner-fuer-eventlocations";
import * as caterer from "./posts/webdesigner-fuer-caterer";
import * as gbpAgentur from "./posts/google-business-profile-agentur";
import * as metaAdsAgentur from "./posts/meta-ads-agentur-mittelstand";
import * as googleAdsAgentur from "./posts/google-ads-agentur-mittelstand";
import * as aeoAgentur from "./posts/aeo-agentur-deutschland";

const modules: Array<{
  meta: Post["meta"];
  default: () => React.ReactNode;
}> = [
  // KI-Sichtbarkeit
  { meta: { ...ki2026.meta, popularity: 95 }, default: ki2026.default },
  { meta: { ...aeoVsSeo.meta, popularity: 88 }, default: aeoVsSeo.default },
  { meta: { ...perplexitySeo.meta, popularity: 82 }, default: perplexitySeo.default },
  { meta: { ...googleAiOverviews.meta, popularity: 90 }, default: googleAiOverviews.default },
  { meta: { ...chatgptKonkurrenz.meta, popularity: 75 }, default: chatgptKonkurrenz.default },
  { meta: { ...bingCopilot.meta, popularity: 50 }, default: bingCopilot.default },
  { meta: { ...voiceSearch.meta, popularity: 60 }, default: voiceSearch.default },
  { meta: ccgVergleich.meta, default: ccgVergleich.default },
  { meta: kiMessen.meta, default: kiMessen.default },
  { meta: branchenKi.meta, default: branchenKi.default },
  { meta: zeroClick.meta, default: zeroClick.default },
  // Technisches SEO
  { meta: { ...schemaOrg.meta, popularity: 85 }, default: schemaOrg.default },
  { meta: { ...robotsTxt.meta, popularity: 78 }, default: robotsTxt.default },
  { meta: { ...coreWebVitals.meta, popularity: 80 }, default: coreWebVitals.default },
  { meta: { ...sitemapXml.meta, popularity: 55 }, default: sitemapXml.default },
  { meta: { ...hreflangDach.meta, popularity: 45 }, default: hreflangDach.default },
  { meta: { ...openGraph.meta, popularity: 50 }, default: openGraph.default },
  { meta: { ...pageExperience.meta, popularity: 65 }, default: pageExperience.default },
  { meta: lighthouse.meta, default: lighthouse.default },
  { meta: internalLinking.meta, default: internalLinking.default },
  { meta: httpsHsts.meta, default: httpsHsts.default },
  { meta: jsSeo.meta, default: jsSeo.default },
  // Lokales SEO
  { meta: { ...lokalesSeo.meta, popularity: 92 }, default: lokalesSeo.default },
  { meta: gbpOptimierungen.meta, default: gbpOptimierungen.default },
  { meta: { ...lokaleBacklinks.meta, popularity: 60 }, default: lokaleBacklinks.default },
  { meta: { ...appleBusiness.meta, popularity: 48 }, default: appleBusiness.default },
  { meta: { ...stadtSeiten.meta, popularity: 65 }, default: stadtSeiten.default },
  { meta: yelp.meta, default: yelp.default },
  { meta: lokaleSchemaTricks.meta, default: lokaleSchemaTricks.default },
  { meta: multiLocation.meta, default: multiLocation.default },
  { meta: saisonalesSeo.meta, default: saisonalesSeo.default },
  // Webdesign
  { meta: { ...webdesignTrends.meta, popularity: 70 }, default: webdesignTrends.default },
  { meta: { ...webdesignHandwerker.meta, popularity: 72 }, default: webdesignHandwerker.default },
  { meta: { ...webdesignAnwaelte.meta, popularity: 55 }, default: webdesignAnwaelte.default },
  { meta: { ...webdesignBerater.meta, popularity: 68 }, default: webdesignBerater.default },
  { meta: { ...headlessCms.meta, popularity: 50 }, default: headlessCms.default },
  { meta: { ...darkVsLight.meta, popularity: 42 }, default: darkVsLight.default },
  { meta: wdRestaurants.meta, default: wdRestaurants.default },
  { meta: wdShops.meta, default: wdShops.default },
  { meta: wdCoaches.meta, default: wdCoaches.default },
  { meta: multilingual.meta, default: multilingual.default },
  // Conversion
  { meta: { ...conversion.meta, popularity: 85 }, default: conversion.default },
  { meta: { ...landingpageStruktur.meta, popularity: 78 }, default: landingpageStruktur.default },
  { meta: { ...b2bFunnel.meta, popularity: 70 }, default: b2bFunnel.default },
  { meta: { ...trustElemente.meta, popularity: 62 }, default: trustElemente.default },
  { meta: { ...mobileForms.meta, popularity: 58 }, default: mobileForms.default },
  { meta: abTesting.meta, default: abTesting.default },
  { meta: pricingSeiten.meta, default: pricingSeiten.default },
  { meta: newsletter.meta, default: newsletter.default },
  { meta: salesPages.meta, default: salesPages.default },
  // Transaktionale Kauf-Intention (15 — Mai 2026)
  { meta: { ...webdesignKosten.meta, popularity: 95 }, default: webdesignKosten.default },
  { meta: { ...webseiteErstellenLassen.meta, popularity: 88 }, default: webseiteErstellenLassen.default },
  { meta: { ...seoHandwerker.meta, popularity: 82 }, default: seoHandwerker.default },
  { meta: { ...kiAgenturVergleich.meta, popularity: 90 }, default: kiAgenturVergleich.default },
  { meta: { ...chatgptAgentur.meta, popularity: 92 }, default: chatgptAgentur.default },
  { meta: { ...landingpageKosten.meta, popularity: 85 }, default: landingpageKosten.default },
  { meta: { ...relaunchKosten.meta, popularity: 80 }, default: relaunchKosten.default },
  { meta: { ...wdCoaches2.meta, popularity: 78 }, default: wdCoaches2.default },
  { meta: { ...hochzeitsfotografen.meta, popularity: 76 }, default: hochzeitsfotografen.default },
  { meta: { ...eventlocations.meta, popularity: 80 }, default: eventlocations.default },
  { meta: { ...caterer.meta, popularity: 75 }, default: caterer.default },
  { meta: { ...gbpAgentur.meta, popularity: 78 }, default: gbpAgentur.default },
  { meta: { ...metaAdsAgentur.meta, popularity: 84 }, default: metaAdsAgentur.default },
  { meta: { ...googleAdsAgentur.meta, popularity: 82 }, default: googleAdsAgentur.default },
  { meta: { ...aeoAgentur.meta, popularity: 88 }, default: aeoAgentur.default },
];

/** Posts sorted by date descending (newest first) */
export const posts = modules.sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
);

/** Canonical list of blog categories — used for filter UI + routing. */
export const CATEGORIES = [
  "Alle",
  "KI-Sichtbarkeit",
  "Technisches SEO",
  "Lokales SEO",
  "Webdesign",
  "Conversion",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const SORT_OPTIONS = ["Neueste", "Beliebteste", "Lesedauer"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export function getPost(slug: string) {
  return posts.find((p) => p.meta.slug === slug) ?? null;
}

/**
 * Related posts ranked by keyword-overlap (Jaccard-style), category bonus,
 * and popularity tiebreaker. Replaces the old "same category first" naive logic.
 * This boosts topical-authority signals for Google and gives readers genuinely
 * useful next reads instead of random siblings.
 */
export function getRelatedPosts(currentSlug: string, limit = 4) {
  const current = getPost(currentSlug);
  if (!current) return posts.slice(0, limit);

  const currentKw = new Set(
    current.meta.keywords.map((k) => k.toLowerCase().trim())
  );

  const scored = posts
    .filter((p) => p.meta.slug !== currentSlug)
    .map((p) => {
      const overlap = p.meta.keywords.filter((k) =>
        currentKw.has(k.toLowerCase().trim())
      ).length;
      const sameCategoryBonus =
        p.meta.category === current.meta.category ? 2 : 0;
      const popularityWeight = (p.meta.popularity ?? 0) / 100;
      // overlap is the primary signal, category secondary, popularity tertiary
      const score = overlap * 10 + sameCategoryBonus + popularityWeight;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

/**
 * Returns the top-N posts most relevant for a given city / regional topic.
 * Used on city landing pages to deep-link into authoritative blog content,
 * strengthening internal linking from money-pages → content cluster.
 */
export function getCityRelevantPosts(limit = 3) {
  // Cherry-pick the strongest cluster for "local + AI visibility" use cases.
  const slugs = [
    "lokales-seo-google-maps-chatgpt-2026",
    "stadt-seiten-skalieren-2026",
    "ki-sichtbarkeit-chatgpt-2026",
    "google-ai-overviews-2026",
    "google-business-profile-12-optimierungen",
  ];
  return slugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => p !== null)
    .slice(0, limit);
}

/**
 * Returns the top-N posts most relevant for the Webdesign Hub.
 */
export function getWebdesignPosts(limit = 4) {
  const slugs = [
    "webdesign-kosten-2026",
    "webseite-erstellen-lassen-mittelstand",
    "landingpage-erstellen-lassen-kosten",
    "webseiten-relaunch-kosten",
    "webdesign-trends-2026",
    "conversion-webseiten-2026",
    "landingpage-struktur-2026",
  ];
  return slugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => p !== null)
    .slice(0, limit);
}

/**
 * Returns the top-N posts most relevant for the Relaunch Service Page.
 */
export function getRelaunchPosts(limit = 4) {
  const slugs = [
    "webseiten-relaunch-kosten",
    "webdesign-kosten-2026",
    "core-web-vitals-2026",
    "javascript-seo-spa",
    "headless-cms-2026",
    "page-experience-2026",
  ];
  return slugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => p !== null)
    .slice(0, limit);
}

/**
 * Returns the top-N posts most relevant for SEO-Stadt-Pages.
 * Used on `/seo/[stadt]` to deep-link into the classic + local SEO cluster.
 */
export function getSeoPosts(limit = 4) {
  const slugs = [
    "seo-agentur-fuer-handwerker",
    "lokales-seo-google-maps-chatgpt-2026",
    "google-business-profile-12-optimierungen",
    "lokale-backlinks-mittelstand",
    "stadt-seiten-skalieren-2026",
    "internal-linking-2026",
    "core-web-vitals-2026",
  ];
  return slugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => p !== null)
    .slice(0, limit);
}

/**
 * Returns the top-N posts most relevant for KI-Sichtbarkeit-Stadt-Pages.
 * Used on `/ki-sichtbarkeit/[stadt]` to deep-link into the GEO/AEO cluster.
 */
export function getKiVisibilityPosts(limit = 4) {
  const slugs = [
    "ki-sichtbarkeit-chatgpt-2026",
    "chatgpt-optimierung-agentur",
    "ki-sichtbarkeit-agentur-vergleich",
    "aeo-agentur-deutschland",
    "perplexity-seo-2026",
    "google-ai-overviews-2026",
    "aeo-vs-seo-2026",
  ];
  return slugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => p !== null)
    .slice(0, limit);
}
