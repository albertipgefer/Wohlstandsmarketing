// 4-Säulen-Checks für den KI-Sichtbarkeits-Check.
// Alle Checks sind defensiv: Netzwerk-Fehler -> "fail" mit Hinweis, niemals Crash.

import * as cheerio from "cheerio";
import type { CheckItem, PillarResult } from "./types";

const FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (compatible; WSM-Sichtbarkeitscheck/1.0; +https://wohlstandsmarketing.de/sichtbarkeits-check)";

// KI-Crawler, die wir prüfen
const KI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "OAI-SearchBot",
] as const;

async function fetchText(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function statusFromScore(score: number, max: number): "pass" | "warn" | "fail" {
  const ratio = score / max;
  if (ratio >= 0.75) return "pass";
  if (ratio >= 0.4) return "warn";
  return "fail";
}

// ─────────────────────────────────────────────────────────────
// SÄULE 1: KI-Crawler-Zugang + llms.txt
// ─────────────────────────────────────────────────────────────
export async function checkCrawler(origin: string): Promise<PillarResult> {
  const items: CheckItem[] = [];
  let score = 0;

  // 1a) robots.txt
  const robots = await fetchText(`${origin}/robots.txt`);
  if (!robots) {
    items.push({
      id: "robots-exists",
      label: "robots.txt",
      status: "fail",
      detail: "Keine robots.txt gefunden.",
      fix: "Lege eine /robots.txt an, die KI-Bots ausdrücklich erlaubt.",
    });
  } else {
    items.push({
      id: "robots-exists",
      label: "robots.txt",
      status: "pass",
      detail: "robots.txt vorhanden und erreichbar.",
    });
    score += 5;

    // 1b) Welche KI-Bots sind erlaubt?
    const lower = robots.toLowerCase();
    const allowedBots = KI_BOTS.filter((bot) => {
      const re = new RegExp(`user-agent:\\s*${bot.toLowerCase()}`, "i");
      if (!re.test(lower)) return true; // nicht explizit gesperrt = erlaubt
      // Block extrahieren
      const idx = lower.search(re);
      const block = lower.slice(idx, idx + 400);
      const disallowAll = /disallow:\s*\/(\s|$)/.test(block);
      return !disallowAll;
    });
    const blockedCount = KI_BOTS.length - allowedBots.length;
    if (blockedCount === 0) {
      items.push({
        id: "ki-bots-allowed",
        label: "KI-Crawler erlaubt",
        status: "pass",
        detail: `Alle ${KI_BOTS.length} relevanten KI-Bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot) dürfen deine Seite crawlen.`,
      });
      score += 10;
    } else {
      items.push({
        id: "ki-bots-allowed",
        label: "KI-Crawler erlaubt",
        status: "fail",
        detail: `${blockedCount} von ${KI_BOTS.length} KI-Bots sind in robots.txt blockiert.`,
        fix: "Entferne Disallow-Regeln für GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot.",
      });
    }
  }

  // 1c) llms.txt
  const llms = await fetchText(`${origin}/llms.txt`);
  if (llms && llms.trim().length > 50) {
    items.push({
      id: "llms-txt",
      label: "llms.txt vorhanden",
      status: "pass",
      detail: "Du hast eine llms.txt mit Inhalt — KI-Crawler bekommen Hints, wie sie deine Seite verstehen sollen.",
    });
    score += 10;
  } else {
    items.push({
      id: "llms-txt",
      label: "llms.txt vorhanden",
      status: "fail",
      detail: "Keine llms.txt gefunden (neuer Standard für KI-Crawler).",
      fix: "Lege eine /llms.txt an mit kurzer Selbstbeschreibung deines Angebots in 200–500 Wörtern.",
    });
  }

  const status = statusFromScore(score, 25);
  return {
    id: "crawler",
    title: "KI-Crawler & Auffindbarkeit",
    score,
    status,
    summary:
      score >= 20
        ? "KI-Bots dürfen deine Seite lesen und finden Hints. Sehr gut."
        : score >= 10
          ? "Teilweise offen für KI-Bots, aber wichtige Hebel fehlen noch."
          : "KI-Bots werden deine Seite kaum verstehen — größter Hebel.",
    items,
  };
}

// ─────────────────────────────────────────────────────────────
// SÄULE 2: Schema.org JSON-LD
// ─────────────────────────────────────────────────────────────
export function checkSchema($: cheerio.CheerioAPI): PillarResult {
  const items: CheckItem[] = [];
  let score = 0;

  const ldScripts = $('script[type="application/ld+json"]');
  const schemas: string[] = [];
  ldScripts.each((_, el) => {
    try {
      const raw = $(el).text();
      const parsed = JSON.parse(raw);
      const collect = (obj: unknown) => {
        if (!obj || typeof obj !== "object") return;
        if (Array.isArray(obj)) {
          obj.forEach(collect);
          return;
        }
        const o = obj as Record<string, unknown>;
        const t = o["@type"];
        if (typeof t === "string") schemas.push(t);
        if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && schemas.push(x));
        if (o["@graph"]) collect(o["@graph"]);
      };
      collect(parsed);
    } catch {
      // ignore parse errors per script
    }
  });

  const has = (name: string) =>
    schemas.some((s) => s.toLowerCase() === name.toLowerCase());

  // 2a) Organisation/Business
  const hasOrg =
    has("Organization") ||
    has("LocalBusiness") ||
    has("ProfessionalService") ||
    has("Corporation");
  if (hasOrg) {
    items.push({
      id: "schema-org",
      label: "Organization-Schema",
      status: "pass",
      detail: "Organization/LocalBusiness-Schema gefunden — Google + KI verstehen dein Unternehmen.",
    });
    score += 8;
  } else {
    items.push({
      id: "schema-org",
      label: "Organization-Schema",
      status: "fail",
      detail: "Kein Organization- oder LocalBusiness-Schema gefunden.",
      fix: "Füge JSON-LD mit Organization/LocalBusiness in deinen <head> ein.",
    });
  }

  // 2b) Person/Author
  if (has("Person")) {
    items.push({
      id: "schema-person",
      label: "Person-Schema",
      status: "pass",
      detail: "Person-Schema vorhanden — KI ordnet Author/Founder einer realen Person zu.",
    });
    score += 6;
  } else {
    items.push({
      id: "schema-person",
      label: "Person-Schema",
      status: "warn",
      detail: "Kein Person-Schema gefunden — Author-Verknüpfung fehlt.",
      fix: "Füge Person-Schema mit sameAs zu LinkedIn/Social-Profilen ein.",
    });
  }

  // 2c) FAQ-Schema (KI liebt strukturierte Fragen)
  if (has("FAQPage")) {
    items.push({
      id: "schema-faq",
      label: "FAQ-Schema",
      status: "pass",
      detail: "FAQ-Schema gefunden — perfekt für Featured Snippets + KI-Antworten.",
    });
    score += 6;
  } else {
    items.push({
      id: "schema-faq",
      label: "FAQ-Schema",
      status: "warn",
      detail: "Keine strukturierten FAQs (FAQPage) — verschenktes Potenzial für KI-Antworten.",
      fix: "Baue eine FAQ-Sektion mit FAQPage-Schema (Frage+Antwort als JSON-LD).",
    });
  }

  // 2d) Mind. 1 weiteres relevantes Schema
  const richTypes = ["Service", "Product", "BreadcrumbList", "Article", "BlogPosting", "WebSite"];
  const hasRich = richTypes.some((t) => has(t));
  if (hasRich) {
    items.push({
      id: "schema-extra",
      label: "Weitere Rich-Schemas",
      status: "pass",
      detail: "Zusätzliche Schemas (Service/Article/Breadcrumb) gefunden — gutes Schema-Profil.",
    });
    score += 5;
  } else {
    items.push({
      id: "schema-extra",
      label: "Weitere Rich-Schemas",
      status: "warn",
      detail: "Kaum weitere Schema.org-Typen erkannt.",
      fix: "Ergänze Service- und/oder BreadcrumbList-Schema je nach Seitentyp.",
    });
  }

  const status = statusFromScore(score, 25);
  return {
    id: "schema",
    title: "Schema.org & strukturierte Daten",
    score,
    status,
    summary:
      score >= 20
        ? "Sehr starke strukturierte Daten — KI versteht dich klar."
        : score >= 10
          ? "Schema teilweise vorhanden, aber Lücken bei Person/FAQ."
          : "Strukturierte Daten fehlen weitgehend — KI rät nur.",
    items,
  };
}

// ─────────────────────────────────────────────────────────────
// SÄULE 3: SEO-Basics (Sitemap, Meta, OG)
// ─────────────────────────────────────────────────────────────
export async function checkSeoBasics(
  $: cheerio.CheerioAPI,
  origin: string,
): Promise<PillarResult> {
  const items: CheckItem[] = [];
  let score = 0;

  // 3a) Title
  const title = $("title").first().text().trim();
  if (title && title.length >= 30 && title.length <= 65) {
    items.push({
      id: "seo-title",
      label: "Title-Tag",
      status: "pass",
      detail: `Title-Tag (${title.length} Zeichen) ist im optimalen Bereich.`,
    });
    score += 5;
  } else if (title) {
    items.push({
      id: "seo-title",
      label: "Title-Tag",
      status: "warn",
      detail: `Title-Tag vorhanden, aber ${title.length < 30 ? "zu kurz" : "zu lang"} (${title.length} Zeichen).`,
      fix: "Optimiere Title auf 30–65 Zeichen mit Haupt-Keyword vorne.",
    });
    score += 2;
  } else {
    items.push({
      id: "seo-title",
      label: "Title-Tag",
      status: "fail",
      detail: "Kein Title-Tag gefunden.",
      fix: "Pflicht: <title>-Tag im <head> setzen.",
    });
  }

  // 3b) Meta-Description
  const desc = $('meta[name="description"]').attr("content")?.trim();
  if (desc && desc.length >= 120 && desc.length <= 170) {
    items.push({
      id: "seo-desc",
      label: "Meta-Description",
      status: "pass",
      detail: `Meta-Description (${desc.length} Zeichen) ist im optimalen Bereich.`,
    });
    score += 5;
  } else if (desc) {
    items.push({
      id: "seo-desc",
      label: "Meta-Description",
      status: "warn",
      detail: `Meta-Description vorhanden, aber ${desc.length < 120 ? "zu kurz" : "zu lang"} (${desc.length} Zeichen).`,
      fix: "Optimiere auf 120–170 Zeichen mit klarem Nutzenversprechen + CTA.",
    });
    score += 2;
  } else {
    items.push({
      id: "seo-desc",
      label: "Meta-Description",
      status: "fail",
      detail: "Keine Meta-Description gefunden.",
      fix: "Setze <meta name=\"description\"> mit prägnantem Pitch (120–170 Zeichen).",
    });
  }

  // 3c) OG-Image
  const ogImage = $('meta[property="og:image"]').attr("content");
  if (ogImage) {
    items.push({
      id: "seo-og",
      label: "Open-Graph-Image",
      status: "pass",
      detail: "OG-Image gesetzt — Social-Shares + LinkedIn-Posts sehen sauber aus.",
    });
    score += 5;
  } else {
    items.push({
      id: "seo-og",
      label: "Open-Graph-Image",
      status: "fail",
      detail: "Kein og:image gesetzt.",
      fix: "Erzeuge ein 1200×630px OG-Image und setze <meta property=\"og:image\">.",
    });
  }

  // 3d) Canonical
  const canonical = $('link[rel="canonical"]').attr("href");
  if (canonical) {
    items.push({
      id: "seo-canonical",
      label: "Canonical-Tag",
      status: "pass",
      detail: "Canonical-Tag gesetzt — Duplicate-Content-Schutz aktiv.",
    });
    score += 4;
  } else {
    items.push({
      id: "seo-canonical",
      label: "Canonical-Tag",
      status: "warn",
      detail: "Kein Canonical-Tag gesetzt.",
      fix: "Füge <link rel=\"canonical\"> auf jeder Seite hinzu.",
    });
  }

  // 3e) Sitemap
  const sitemap = await fetchText(`${origin}/sitemap.xml`);
  if (sitemap && sitemap.includes("<urlset")) {
    items.push({
      id: "seo-sitemap",
      label: "Sitemap.xml",
      status: "pass",
      detail: "Sitemap.xml vorhanden und gültig.",
    });
    score += 6;
  } else {
    items.push({
      id: "seo-sitemap",
      label: "Sitemap.xml",
      status: "fail",
      detail: "Keine sitemap.xml gefunden.",
      fix: "Generiere automatisch eine /sitemap.xml und reiche sie in Google Search Console ein.",
    });
  }

  const status = statusFromScore(score, 25);
  return {
    id: "seo",
    title: "SEO-Fundament",
    score,
    status,
    summary:
      score >= 20
        ? "Solides SEO-Fundament — Suchmaschinen verstehen die Basics."
        : score >= 10
          ? "Wesentliche SEO-Elemente da, aber Lücken bei Title/Desc/Sitemap."
          : "SEO-Basics fehlen — selbst Google hat Mühe, dich einzuordnen.",
    items,
  };
}

// ─────────────────────────────────────────────────────────────
// SÄULE 4: Performance + E-E-A-T
// ─────────────────────────────────────────────────────────────
export async function checkPerformanceTrust(
  $: cheerio.CheerioAPI,
  origin: string,
): Promise<PillarResult> {
  const items: CheckItem[] = [];
  let score = 0;

  // 4a) Impressum (Pflicht in DE)
  const impressumLinks = $('a[href*="impressum"]').length;
  if (impressumLinks > 0) {
    items.push({
      id: "trust-impressum",
      label: "Impressum",
      status: "pass",
      detail: "Impressum verlinkt — Pflicht-Trust-Signal vorhanden.",
    });
    score += 5;
  } else {
    items.push({
      id: "trust-impressum",
      label: "Impressum",
      status: "fail",
      detail: "Kein Impressum-Link gefunden.",
      fix: "Impressum ist in Deutschland Pflicht — verlinke es im Footer.",
    });
  }

  // 4b) About / Über-Seite
  const aboutLinks = $(
    'a[href*="ueber"],a[href*="about"],a[href*="team"],a[href*="albert"]',
  ).length;
  if (aboutLinks > 0) {
    items.push({
      id: "trust-about",
      label: "Über-/Author-Seite",
      status: "pass",
      detail: "Über-/Author-Seite gefunden — wichtig für E-E-A-T.",
    });
    score += 5;
  } else {
    items.push({
      id: "trust-about",
      label: "Über-/Author-Seite",
      status: "warn",
      detail: "Keine 'Über'- oder Author-Seite verlinkt.",
      fix: "Baue eine Über-mich-Seite mit Foto, Werdegang, Expertise (E-E-A-T-Signal).",
    });
  }

  // 4c) sameAs / Social-Profile (im HTML oder Schema)
  const html = $.html();
  const socialPlatforms = [
    "linkedin.com",
    "instagram.com",
    "tiktok.com",
    "youtube.com",
    "facebook.com",
    "twitter.com",
    "x.com",
  ];
  const foundSocials = socialPlatforms.filter((p) => html.includes(p));
  if (foundSocials.length >= 3) {
    items.push({
      id: "trust-social",
      label: "Social-Profile (sameAs)",
      status: "pass",
      detail: `${foundSocials.length} Social-Profile verlinkt — KI kann dich auf mehreren Plattformen wiedererkennen.`,
    });
    score += 5;
  } else if (foundSocials.length >= 1) {
    items.push({
      id: "trust-social",
      label: "Social-Profile (sameAs)",
      status: "warn",
      detail: `Nur ${foundSocials.length} Social-Profil(e) verlinkt.`,
      fix: "Verlinke mindestens 3 Social-Profile (LinkedIn, Instagram, TikTok o.ä.) im Footer oder Author-Box.",
    });
    score += 2;
  } else {
    items.push({
      id: "trust-social",
      label: "Social-Profile (sameAs)",
      status: "fail",
      detail: "Keine Social-Profile auf der Seite gefunden.",
      fix: "Verlinke deine wichtigsten Social-Profile — wichtig für KI-Entity-Erkennung.",
    });
  }

  // 4d) Mobile Viewport
  const viewport = $('meta[name="viewport"]').attr("content");
  if (viewport && viewport.includes("width=device-width")) {
    items.push({
      id: "perf-viewport",
      label: "Mobile Viewport",
      status: "pass",
      detail: "Mobile Viewport korrekt gesetzt.",
    });
    score += 3;
  } else {
    items.push({
      id: "perf-viewport",
      label: "Mobile Viewport",
      status: "fail",
      detail: "Kein korrekter Viewport-Meta-Tag.",
      fix: "Setze <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">.",
    });
  }

  // 4e) HTTPS
  if (origin.startsWith("https://")) {
    items.push({
      id: "perf-https",
      label: "HTTPS aktiv",
      status: "pass",
      detail: "HTTPS aktiv — Pflicht für Ranking + Trust.",
    });
    score += 3;
  } else {
    items.push({
      id: "perf-https",
      label: "HTTPS aktiv",
      status: "fail",
      detail: "Seite läuft noch über HTTP.",
      fix: "Stelle dringend auf HTTPS um (gratis via Let's Encrypt/Vercel).",
    });
  }

  // 4f) PageSpeed (optional, nur wenn Limit nicht erreicht)
  // Wir nutzen die gratis PageSpeed Insights API ohne Key (Rate-Limited).
  // Bei Fehler überspringen wir den Punkt und verteilen den Score auf die anderen.
  try {
    const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(origin)}&strategy=mobile&category=performance`;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(psUrl, { signal: controller.signal });
    clearTimeout(t);
    if (res.ok) {
      const data = (await res.json()) as {
        lighthouseResult?: { categories?: { performance?: { score?: number } } };
      };
      const psScore = data.lighthouseResult?.categories?.performance?.score;
      if (typeof psScore === "number") {
        const pct = Math.round(psScore * 100);
        if (pct >= 75) {
          items.push({
            id: "perf-lighthouse",
            label: "Core Web Vitals (Mobile)",
            status: "pass",
            detail: `Lighthouse-Performance ${pct}/100 — schnell und stabil.`,
          });
          score += 4;
        } else if (pct >= 50) {
          items.push({
            id: "perf-lighthouse",
            label: "Core Web Vitals (Mobile)",
            status: "warn",
            detail: `Lighthouse-Performance ${pct}/100 — verbesserungsfähig.`,
            fix: "Optimiere LCP-Element + Bildgrößen + ungenutztes JavaScript.",
          });
          score += 2;
        } else {
          items.push({
            id: "perf-lighthouse",
            label: "Core Web Vitals (Mobile)",
            status: "fail",
            detail: `Lighthouse-Performance ${pct}/100 — kritisch.`,
            fix: "Mobile-Performance dringend optimieren (LCP, CLS, INP).",
          });
        }
      }
    }
  } catch {
    // PageSpeed nicht verfügbar — wir vergeben Bonus-Punkte aus den anderen Checks
    score += 2;
  }

  const status = statusFromScore(score, 25);
  return {
    id: "performance",
    title: "Performance & Vertrauen (E-E-A-T)",
    score,
    status,
    summary:
      score >= 20
        ? "Starkes Trust- und Performance-Profil."
        : score >= 10
          ? "Solide Basis, aber Lücken bei Trust-Signalen oder Speed."
          : "Wenig Trust-Signale + möglicherweise Performance-Probleme.",
    items,
  };
}

// ─────────────────────────────────────────────────────────────
// Master: alles laufen lassen
// ─────────────────────────────────────────────────────────────
export interface RawCheckOutput {
  origin: string;
  pillars: PillarResult[];
  meta: { title: string | null; description: string | null };
}

export async function runAllChecks(rawUrl: string): Promise<RawCheckOutput | null> {
  // URL normalisieren
  let normalized = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    return null;
  }
  const origin = `${parsed.protocol}//${parsed.host}`;

  // HTML laden
  const html = await fetchText(origin);
  if (!html) return null;
  const $ = cheerio.load(html);

  const meta = {
    title: $("title").first().text().trim() || null,
    description: $('meta[name="description"]').attr("content")?.trim() || null,
  };

  // Säulen parallel
  const [crawler, seo, performance] = await Promise.all([
    checkCrawler(origin),
    checkSeoBasics($, origin),
    checkPerformanceTrust($, origin),
  ]);
  const schema = checkSchema($);

  return {
    origin,
    pillars: [crawler, schema, seo, performance],
    meta,
  };
}
