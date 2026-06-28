// Erweiterte Multi-Page-Crawls mit Error-Aggregation.
// Max 20 URLs aus der Sitemap, sequentiell parallel mit Concurrency 5.
// Alle Sub-Checks defensiv (try/catch + Promise.allSettled).

import * as cheerio from "cheerio";
import type {
  CheckItem,
  PillarResult,
  PageReport,
  PageIssue,
  CrawlError,
} from "./types";

const FETCH_TIMEOUT_MS = 8_000;
const PAGESPEED_TIMEOUT_MS = 14_000;
const MAX_PAGES = 20;
const CONCURRENCY = 5;
const PAGESPEED_TOP_N = 3;

const USER_AGENT =
  "Mozilla/5.0 (compatible; WSM-Sichtbarkeitscheck/2.0; +https://wohlstandsmarketing.de/sichtbarkeits-check)";

const KI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "OAI-SearchBot",
] as const;

// ─────────────────────────────────────────────────────────────
// Fetch-Helpers (defensiv)
// ─────────────────────────────────────────────────────────────
async function fetchText(
  url: string,
  timeoutMs = FETCH_TIMEOUT_MS,
): Promise<{ text: string | null; error?: string }> {
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) {
      return { text: null, error: `HTTP ${res.status}` };
    }
    return { text: await res.text() };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown_fetch_error";
    return { text: null, error: msg.includes("abort") ? "timeout" : msg };
  }
}

function statusFromScore(score: number, max: number): "pass" | "warn" | "fail" {
  const ratio = score / max;
  if (ratio >= 0.75) return "pass";
  if (ratio >= 0.4) return "warn";
  return "fail";
}

// ─────────────────────────────────────────────────────────────
// Sitemap-Discovery (max 20 URLs)
// ─────────────────────────────────────────────────────────────
async function discoverPages(
  origin: string,
  errors: CrawlError[],
): Promise<string[]> {
  const found = new Set<string>([origin]);

  // 1) Versuche Sitemap zu laden
  const { text: sitemap, error } = await fetchText(`${origin}/sitemap.xml`);
  if (sitemap) {
    // Sitemap-Index oder normales urlset?
    const isIndex = /<sitemapindex/i.test(sitemap);
    if (isIndex) {
      // Sub-Sitemaps fetchen
      const subSitemaps = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))
        .map((m) => m[1])
        .slice(0, 3);
      for (const sub of subSitemaps) {
        const r = await fetchText(sub);
        if (r.text) {
          for (const m of r.text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
            try {
              const u = new URL(m[1]);
              if (u.origin === origin) found.add(m[1]);
            } catch {
              /* ignore invalid url */
            }
            if (found.size >= MAX_PAGES) break;
          }
        }
        if (found.size >= MAX_PAGES) break;
      }
    } else {
      for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        try {
          const u = new URL(m[1]);
          if (u.origin === origin) found.add(m[1]);
        } catch {
          /* ignore */
        }
        if (found.size >= MAX_PAGES) break;
      }
    }
  } else {
    errors.push({
      context: "sitemap-discovery",
      message: `Sitemap nicht geladen: ${error ?? "unbekannt"} — verwende nur Startseite + interne Links`,
    });
  }

  // 2) Fallback / Ergänzung: interne Links der Startseite
  if (found.size < 5) {
    const r = await fetchText(origin);
    if (r.text) {
      const $ = cheerio.load(r.text);
      $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (!href) return;
        try {
          const abs = new URL(href, origin).href.split("#")[0];
          const u = new URL(abs);
          if (u.origin === origin) found.add(abs);
        } catch {
          /* ignore */
        }
        if (found.size >= MAX_PAGES) return false;
      });
    }
  }

  // Startseite immer zuerst, Rest aus Sitemap-Reihenfolge
  const all = Array.from(found);
  return [origin, ...all.filter((u) => u !== origin)].slice(0, MAX_PAGES);
}

// ─────────────────────────────────────────────────────────────
// Pro-Seite-Check
// ─────────────────────────────────────────────────────────────
async function checkOnePage(url: string): Promise<PageReport> {
  const { text, error } = await fetchText(url);
  if (!text) {
    return {
      url,
      status: error === "timeout" ? "timeout" : "error",
      errorMessage: error ?? "unbekannter Fehler",
      issues: [],
    };
  }

  const issues: PageIssue[] = [];
  try {
    const $ = cheerio.load(text);

    // Title
    const title = $("title").first().text().trim();
    if (!title) {
      issues.push({ category: "title", status: "fail", message: "Kein Title-Tag" });
    } else if (title.length < 30 || title.length > 65) {
      issues.push({
        category: "title",
        status: "warn",
        message: `Title ${title.length} Zeichen (optimal 30–65)`,
      });
    }

    // Meta-Description
    const desc = $('meta[name="description"]').attr("content")?.trim();
    if (!desc) {
      issues.push({ category: "description", status: "fail", message: "Keine Meta-Description" });
    } else if (desc.length < 120 || desc.length > 170) {
      issues.push({
        category: "description",
        status: "warn",
        message: `Description ${desc.length} Zeichen (optimal 120–170)`,
      });
    }

    // H1
    const h1Count = $("h1").length;
    const h1Text = $("h1").first().text().trim();
    if (h1Count === 0) {
      issues.push({ category: "h1", status: "fail", message: "Keine H1" });
    } else if (h1Count > 1) {
      issues.push({
        category: "h1",
        status: "warn",
        message: `${h1Count} H1-Tags (sollte nur 1 sein)`,
      });
    }

    // OG-Image
    const ogImage = $('meta[property="og:image"]').attr("content");
    if (!ogImage) {
      issues.push({ category: "og", status: "warn", message: "Kein og:image" });
    }

    // Canonical
    const canonical = $('link[rel="canonical"]').attr("href");
    if (!canonical) {
      issues.push({ category: "canonical", status: "warn", message: "Kein Canonical-Tag" });
    }

    // Schema.org
    const schemaTypes: string[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const parsed = JSON.parse($(el).text());
        const collect = (obj: unknown) => {
          if (!obj || typeof obj !== "object") return;
          if (Array.isArray(obj)) return obj.forEach(collect);
          const o = obj as Record<string, unknown>;
          const t = o["@type"];
          if (typeof t === "string") schemaTypes.push(t);
          if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && schemaTypes.push(x));
          if (o["@graph"]) collect(o["@graph"]);
        };
        collect(parsed);
      } catch {
        /* parse error pro script ignorieren */
      }
    });
    if (schemaTypes.length === 0) {
      issues.push({ category: "schema", status: "fail", message: "Keine Schema.org-Daten" });
    }

    // Images
    const imgs = $("img");
    const imagesTotal = imgs.length;
    let imagesWithAlt = 0;
    imgs.each((_, el) => {
      const alt = $(el).attr("alt");
      if (alt && alt.trim().length > 0) imagesWithAlt++;
    });
    if (imagesTotal > 0 && imagesWithAlt / imagesTotal < 0.7) {
      issues.push({
        category: "alt",
        status: "warn",
        message: `${imagesWithAlt}/${imagesTotal} Bilder mit alt-Text`,
      });
    }

    // Page-Score
    const failCount = issues.filter((i) => i.status === "fail").length;
    const warnCount = issues.filter((i) => i.status === "warn").length;
    const pageScore = Math.max(0, 100 - failCount * 15 - warnCount * 7);

    return {
      url,
      status: "ok",
      pageScore,
      title,
      metaDescription: desc,
      h1: h1Text,
      h1Count,
      schemaTypes,
      hasOgImage: !!ogImage,
      hasCanonical: !!canonical,
      imagesTotal,
      imagesWithAlt,
      issues,
    };
  } catch (e) {
    return {
      url,
      status: "error",
      errorMessage: e instanceof Error ? e.message : "parse_error",
      issues,
    };
  }
}

// Parallel mit Concurrency-Limit
async function crawlPages(
  urls: string[],
  errors: CrawlError[],
): Promise<PageReport[]> {
  const results: PageReport[] = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(batch.map((u) => checkOnePage(u)));
    settled.forEach((r, idx) => {
      if (r.status === "fulfilled") {
        results.push(r.value);
      } else {
        errors.push({
          context: `page-crawl:${batch[idx]}`,
          message: r.reason instanceof Error ? r.reason.message : "unknown",
        });
        results.push({
          url: batch[idx],
          status: "error",
          errorMessage: "Crawl-Fehler",
          issues: [],
        });
      }
    });
  }
  return results;
}

// ─────────────────────────────────────────────────────────────
// PageSpeed Insights (Top-N URLs)
// ─────────────────────────────────────────────────────────────
async function getPageSpeed(url: string): Promise<number | null> {
  try {
    const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), PAGESPEED_TIMEOUT_MS);
    const res = await fetch(psUrl, { signal: controller.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      lighthouseResult?: { categories?: { performance?: { score?: number } } };
    };
    const psScore = data.lighthouseResult?.categories?.performance?.score;
    return typeof psScore === "number" ? Math.round(psScore * 100) : null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Säulen-Berechnung (aggregiert)
// ─────────────────────────────────────────────────────────────

// SÄULE 1: KI-Crawler & Auffindbarkeit
async function pillarCrawler(
  origin: string,
  pages: PageReport[],
  errors: CrawlError[],
): Promise<PillarResult> {
  const items: CheckItem[] = [];
  let score = 0;

  // robots.txt
  const robotsRes = await fetchText(`${origin}/robots.txt`);
  const robots = robotsRes.text;
  if (!robots) {
    items.push({
      id: "robots-exists",
      label: "robots.txt vorhanden",
      status: "fail",
      detail: "Keine robots.txt gefunden.",
      fix: "Lege /robots.txt an, die KI-Bots erlaubt.",
    });
    if (robotsRes.error && robotsRes.error !== "HTTP 404") {
      errors.push({ context: "robots.txt", message: robotsRes.error });
    }
  } else {
    items.push({
      id: "robots-exists",
      label: "robots.txt vorhanden",
      status: "pass",
      detail: "robots.txt erreichbar.",
    });
    score += 3;

    // Pro Bot einzeln prüfen (jeder = 1 Item)
    const lower = robots.toLowerCase();
    for (const bot of KI_BOTS) {
      const re = new RegExp(`user-agent:\\s*${bot.toLowerCase()}`, "i");
      let allowed = true;
      if (re.test(lower)) {
        const idx = lower.search(re);
        const block = lower.slice(idx, idx + 400);
        if (/disallow:\s*\/(\s|$)/.test(block)) allowed = false;
      }
      items.push({
        id: `bot-${bot}`,
        label: `${bot} erlaubt`,
        status: allowed ? "pass" : "fail",
        detail: allowed
          ? `${bot} darf crawlen.`
          : `${bot} ist in robots.txt blockiert.`,
        fix: allowed
          ? undefined
          : `Entferne Disallow für ${bot} in robots.txt.`,
      });
      if (allowed) score += 1.5;
    }

    // Sitemap-Verweis in robots.txt?
    if (/sitemap:/i.test(robots)) {
      items.push({
        id: "robots-sitemap-ref",
        label: "Sitemap in robots.txt referenziert",
        status: "pass",
        detail: "Sitemap-URL in robots.txt eingetragen — gut für Crawler.",
      });
      score += 1.5;
    } else {
      items.push({
        id: "robots-sitemap-ref",
        label: "Sitemap in robots.txt referenziert",
        status: "warn",
        detail: "Keine Sitemap-Referenz in robots.txt.",
        fix: 'Füge "Sitemap: https://.../sitemap.xml" in robots.txt ein.',
      });
    }
  }

  // llms.txt
  const llmsRes = await fetchText(`${origin}/llms.txt`);
  if (llmsRes.text && llmsRes.text.trim().length > 50) {
    items.push({
      id: "llms-txt",
      label: "llms.txt vorhanden",
      status: "pass",
      detail: `llms.txt mit Inhalt (${llmsRes.text.length} Zeichen).`,
    });
    score += 5;
  } else {
    items.push({
      id: "llms-txt",
      label: "llms.txt vorhanden",
      status: "fail",
      detail: "Keine llms.txt gefunden.",
      fix: "Lege /llms.txt mit Selbstbeschreibung deines Angebots an.",
    });
  }

  // Sitemap
  const sitemapRes = await fetchText(`${origin}/sitemap.xml`);
  if (sitemapRes.text && sitemapRes.text.includes("<urlset")) {
    const urlCount = (sitemapRes.text.match(/<loc>/g) || []).length;
    items.push({
      id: "sitemap-exists",
      label: "Sitemap.xml vorhanden",
      status: "pass",
      detail: `Sitemap mit ${urlCount} URLs gefunden.`,
    });
    score += 4;
  } else if (sitemapRes.text && sitemapRes.text.includes("<sitemapindex")) {
    items.push({
      id: "sitemap-exists",
      label: "Sitemap.xml vorhanden",
      status: "pass",
      detail: "Sitemap-Index gefunden.",
    });
    score += 4;
  } else {
    items.push({
      id: "sitemap-exists",
      label: "Sitemap.xml vorhanden",
      status: "fail",
      detail: "Keine Sitemap.xml gefunden.",
      fix: "Generiere /sitemap.xml und reiche sie in Google Search Console ein.",
    });
  }

  // Crawl-Coverage
  const okPages = pages.filter((p) => p.status === "ok").length;
  if (okPages >= 10) {
    items.push({
      id: "crawl-coverage",
      label: "Seiten erreichbar",
      status: "pass",
      detail: `${okPages} Seiten erfolgreich gecrawlt — gute Site-Architektur.`,
    });
    score += 2;
  } else if (okPages >= 3) {
    items.push({
      id: "crawl-coverage",
      label: "Seiten erreichbar",
      status: "warn",
      detail: `Nur ${okPages} Seiten erfolgreich gecrawlt.`,
      fix: "Sitemap erweitern, damit mehr Seiten erfasst werden.",
    });
    score += 1;
  } else {
    items.push({
      id: "crawl-coverage",
      label: "Seiten erreichbar",
      status: "fail",
      detail: `Nur ${okPages} Seite(n) erfolgreich gecrawlt.`,
      fix: "Sitemap + interne Verlinkung dringend ausbauen.",
    });
  }

  const finalScore = Math.min(Math.round(score), 25);
  return {
    id: "crawler",
    title: "KI-Crawler & Auffindbarkeit",
    score: finalScore,
    status: statusFromScore(finalScore, 25),
    summary:
      finalScore >= 20
        ? "Sehr gute KI-Crawler-Konfiguration. Bots dürfen lesen und finden Hints."
        : finalScore >= 12
          ? "Teilweise offen für KI-Bots, einige Hebel fehlen noch."
          : "KI-Bots werden deine Seite kaum verstehen — größter Hebel.",
    items,
  };
}

// SÄULE 2: Schema.org (aggregiert über alle Seiten)
function pillarSchema(pages: PageReport[]): PillarResult {
  const items: CheckItem[] = [];
  let score = 0;
  const okPages = pages.filter((p) => p.status === "ok");

  // Aggregierte Schema-Typen über alle Seiten
  const allTypes = new Set<string>();
  for (const p of okPages) {
    p.schemaTypes?.forEach((t) => allTypes.add(t));
  }
  const has = (t: string) =>
    Array.from(allTypes).some((x) => x.toLowerCase() === t.toLowerCase());

  // Pro relevantem Schema-Typ ein Item
  const schemaChecks: Array<{ types: string[]; label: string; weight: number; fix?: string }> = [
    {
      types: ["Organization", "LocalBusiness", "ProfessionalService", "Corporation"],
      label: "Organization / LocalBusiness",
      weight: 4,
      fix: "Füge Organization- oder LocalBusiness-Schema in <head> ein.",
    },
    {
      types: ["Person"],
      label: "Person (Author)",
      weight: 3,
      fix: "Person-Schema mit sameAs zu LinkedIn/Social ergänzen.",
    },
    {
      types: ["FAQPage"],
      label: "FAQ-Schema",
      weight: 3,
      fix: "FAQ-Sektion mit FAQPage-Schema für KI-Antworten ergänzen.",
    },
    {
      types: ["WebSite"],
      label: "WebSite-Schema",
      weight: 2,
      fix: "WebSite-Schema mit potentialAction (SearchAction) hinzufügen.",
    },
    {
      types: ["BreadcrumbList"],
      label: "Breadcrumb-Schema",
      weight: 2,
      fix: "BreadcrumbList-Schema auf Sub-Seiten.",
    },
    {
      types: ["Service"],
      label: "Service-Schema",
      weight: 2,
      fix: "Service-Schema für deine Hauptleistungen ergänzen.",
    },
    {
      types: ["Article", "BlogPosting"],
      label: "Article / BlogPosting",
      weight: 2,
      fix: "Article-Schema für Blog-Posts.",
    },
    {
      types: ["Offer", "OfferCatalog"],
      label: "Offer / OfferCatalog",
      weight: 2,
      fix: "Offer-Schema für deine Angebote.",
    },
  ];

  for (const check of schemaChecks) {
    const found = check.types.some((t) => has(t));
    items.push({
      id: `schema-${check.label.toLowerCase().replace(/[^a-z]/g, "")}`,
      label: check.label,
      status: found ? "pass" : "warn",
      detail: found
        ? `${check.label}-Schema gefunden.`
        : `${check.label}-Schema fehlt.`,
      fix: found ? undefined : check.fix,
    });
    if (found) score += check.weight;
  }

  // Coverage: wie viele Seiten haben überhaupt Schema?
  const pagesWithSchema = okPages.filter((p) => (p.schemaTypes?.length ?? 0) > 0).length;
  const coverage = okPages.length > 0 ? pagesWithSchema / okPages.length : 0;
  if (coverage >= 0.9) {
    items.push({
      id: "schema-coverage",
      label: "Schema-Coverage über Seiten",
      status: "pass",
      detail: `${pagesWithSchema}/${okPages.length} Seiten haben Schema.org-Daten.`,
    });
    score += 5;
  } else if (coverage >= 0.5) {
    items.push({
      id: "schema-coverage",
      label: "Schema-Coverage über Seiten",
      status: "warn",
      detail: `Nur ${pagesWithSchema}/${okPages.length} Seiten mit Schema.`,
      fix: "Schema.org auf allen Hauptseiten ausrollen.",
    });
    score += 2;
  } else {
    items.push({
      id: "schema-coverage",
      label: "Schema-Coverage über Seiten",
      status: "fail",
      detail: `Kaum Seiten mit Schema (${pagesWithSchema}/${okPages.length}).`,
      fix: "Schema.org strategisch auf allen wichtigen Seiten einbauen.",
    });
  }

  const finalScore = Math.min(Math.round(score), 25);
  return {
    id: "schema",
    title: "Schema.org & strukturierte Daten",
    score: finalScore,
    status: statusFromScore(finalScore, 25),
    summary:
      finalScore >= 20
        ? "Sehr starkes Schema-Profil — KI versteht dich klar."
        : finalScore >= 12
          ? "Grundlagen vorhanden, aber Schema-Lücken auf vielen Seiten."
          : "Strukturierte Daten fehlen weitgehend.",
    items,
  };
}

// SÄULE 3: SEO-Fundament (aggregiert)
async function pillarSeo(
  origin: string,
  pages: PageReport[],
): Promise<PillarResult> {
  const items: CheckItem[] = [];
  let score = 0;
  const okPages = pages.filter((p) => p.status === "ok");

  // Titles
  const pagesWithTitle = okPages.filter((p) => p.title && p.title.length > 0).length;
  const pagesGoodTitle = okPages.filter(
    (p) => p.title && p.title.length >= 30 && p.title.length <= 65,
  ).length;
  if (okPages.length > 0 && pagesWithTitle === okPages.length) {
    items.push({
      id: "titles-all",
      label: "Title-Tags auf allen Seiten",
      status: "pass",
      detail: `Alle ${okPages.length} Seiten haben einen Title.`,
    });
    score += 3;
  } else {
    items.push({
      id: "titles-all",
      label: "Title-Tags auf allen Seiten",
      status: "fail",
      detail: `${okPages.length - pagesWithTitle} Seite(n) ohne Title.`,
      fix: "Pflicht-Title auf jeder Seite setzen.",
    });
  }
  if (okPages.length > 0) {
    const ratio = pagesGoodTitle / okPages.length;
    items.push({
      id: "titles-length",
      label: "Title-Länge optimal",
      status: ratio >= 0.8 ? "pass" : ratio >= 0.5 ? "warn" : "fail",
      detail: `${pagesGoodTitle}/${okPages.length} Seiten mit Title 30–65 Zeichen.`,
      fix:
        ratio < 0.8
          ? "Titles auf 30–65 Zeichen mit Haupt-Keyword optimieren."
          : undefined,
    });
    if (ratio >= 0.8) score += 2;
    else if (ratio >= 0.5) score += 1;
  }

  // Meta-Descriptions
  const pagesWithDesc = okPages.filter(
    (p) => p.metaDescription && p.metaDescription.length > 0,
  ).length;
  const pagesGoodDesc = okPages.filter(
    (p) =>
      p.metaDescription &&
      p.metaDescription.length >= 120 &&
      p.metaDescription.length <= 170,
  ).length;
  if (okPages.length > 0) {
    items.push({
      id: "desc-all",
      label: "Meta-Descriptions auf allen Seiten",
      status: pagesWithDesc === okPages.length ? "pass" : "warn",
      detail: `${pagesWithDesc}/${okPages.length} Seiten mit Description.`,
      fix:
        pagesWithDesc < okPages.length
          ? "Meta-Description auf jeder Seite setzen."
          : undefined,
    });
    if (pagesWithDesc === okPages.length) score += 2;
    else if (pagesWithDesc / okPages.length >= 0.7) score += 1;

    const ratio = pagesGoodDesc / okPages.length;
    items.push({
      id: "desc-length",
      label: "Description-Länge optimal",
      status: ratio >= 0.7 ? "pass" : ratio >= 0.4 ? "warn" : "fail",
      detail: `${pagesGoodDesc}/${okPages.length} Seiten mit Description 120–170 Zeichen.`,
      fix:
        ratio < 0.7
          ? "Descriptions auf 120–170 Zeichen optimieren."
          : undefined,
    });
    if (ratio >= 0.7) score += 2;
    else if (ratio >= 0.4) score += 1;
  }

  // H1 pro Seite
  if (okPages.length > 0) {
    const pagesOneH1 = okPages.filter((p) => p.h1Count === 1).length;
    items.push({
      id: "h1-unique",
      label: "Genau eine H1 pro Seite",
      status:
        pagesOneH1 === okPages.length ? "pass" : pagesOneH1 / okPages.length >= 0.7 ? "warn" : "fail",
      detail: `${pagesOneH1}/${okPages.length} Seiten mit genau einer H1.`,
      fix:
        pagesOneH1 < okPages.length
          ? "Pro Seite genau eine H1 — keine, keine 2."
          : undefined,
    });
    if (pagesOneH1 === okPages.length) score += 2;
    else if (pagesOneH1 / okPages.length >= 0.7) score += 1;
  }

  // OG-Image
  if (okPages.length > 0) {
    const pagesWithOg = okPages.filter((p) => p.hasOgImage).length;
    const ratio = pagesWithOg / okPages.length;
    items.push({
      id: "og-image",
      label: "Open-Graph-Image",
      status: ratio >= 0.8 ? "pass" : ratio >= 0.4 ? "warn" : "fail",
      detail: `${pagesWithOg}/${okPages.length} Seiten mit og:image.`,
      fix:
        ratio < 0.8 ? "OG-Image (1200×630px) auf jeder Seite setzen." : undefined,
    });
    if (ratio >= 0.8) score += 2;
    else if (ratio >= 0.4) score += 1;
  }

  // Canonical
  if (okPages.length > 0) {
    const pagesWithCanonical = okPages.filter((p) => p.hasCanonical).length;
    const ratio = pagesWithCanonical / okPages.length;
    items.push({
      id: "canonical",
      label: "Canonical-Tags",
      status: ratio >= 0.8 ? "pass" : ratio >= 0.4 ? "warn" : "fail",
      detail: `${pagesWithCanonical}/${okPages.length} Seiten mit Canonical.`,
      fix: ratio < 0.8 ? "Canonical-Tag auf jeder Seite setzen." : undefined,
    });
    if (ratio >= 0.8) score += 2;
    else if (ratio >= 0.4) score += 1;
  }

  // Sitemap geprüft (1 Wert, aus pillarCrawler-Daten dupliziert für Übersicht)
  const { text: sitemap } = await fetchText(`${origin}/sitemap.xml`);
  if (sitemap) {
    items.push({
      id: "sitemap-seo",
      label: "Sitemap auffindbar",
      status: "pass",
      detail: "Sitemap.xml vorhanden.",
    });
    score += 3;
  } else {
    items.push({
      id: "sitemap-seo",
      label: "Sitemap auffindbar",
      status: "fail",
      detail: "Keine Sitemap gefunden.",
      fix: "Sitemap generieren + bei Google einreichen.",
    });
  }

  // Alt-Texte
  if (okPages.length > 0) {
    let totalImages = 0;
    let totalWithAlt = 0;
    for (const p of okPages) {
      totalImages += p.imagesTotal ?? 0;
      totalWithAlt += p.imagesWithAlt ?? 0;
    }
    const ratio = totalImages > 0 ? totalWithAlt / totalImages : 1;
    items.push({
      id: "alt-texts",
      label: "Bilder mit Alt-Text",
      status: ratio >= 0.8 ? "pass" : ratio >= 0.5 ? "warn" : "fail",
      detail: `${totalWithAlt}/${totalImages} Bilder mit Alt-Text (${Math.round(ratio * 100)} %).`,
      fix:
        ratio < 0.8
          ? "Alt-Texte für alle relevanten Bilder hinzufügen."
          : undefined,
    });
    if (ratio >= 0.8) score += 2;
    else if (ratio >= 0.5) score += 1;
  }

  const finalScore = Math.min(Math.round(score), 25);
  return {
    id: "seo",
    title: "SEO-Fundament",
    score: finalScore,
    status: statusFromScore(finalScore, 25),
    summary:
      finalScore >= 20
        ? "Solides SEO-Fundament über alle Seiten hinweg."
        : finalScore >= 12
          ? "SEO-Basics da, aber Inkonsistenzen über die Seiten."
          : "SEO-Fundament wackelt — viele Seiten betroffen.",
    items,
  };
}

// SÄULE 4: Performance + E-E-A-T
async function pillarPerformance(
  origin: string,
  pages: PageReport[],
  errors: CrawlError[],
): Promise<PillarResult> {
  const items: CheckItem[] = [];
  let score = 0;

  // HTTPS
  if (origin.startsWith("https://")) {
    items.push({
      id: "https",
      label: "HTTPS aktiv",
      status: "pass",
      detail: "Seite über HTTPS verfügbar.",
    });
    score += 2;
  } else {
    items.push({
      id: "https",
      label: "HTTPS aktiv",
      status: "fail",
      detail: "Seite läuft über HTTP.",
      fix: "Dringend auf HTTPS umstellen (gratis via Let's Encrypt / Vercel).",
    });
  }

  // Trust-Links (Impressum, Datenschutz, About, Kontakt) — aus Startseite
  const homeRes = await fetchText(origin);
  if (homeRes.text) {
    const html = homeRes.text.toLowerCase();
    const trustChecks = [
      { id: "impressum", label: "Impressum verlinkt", patterns: ["impressum"], weight: 2 },
      { id: "datenschutz", label: "Datenschutz verlinkt", patterns: ["datenschutz", "privacy"], weight: 2 },
      { id: "about", label: "Über-/About-Seite verlinkt", patterns: ["ueber", "about", "team"], weight: 2 },
      { id: "kontakt", label: "Kontakt verlinkt", patterns: ["kontakt", "contact"], weight: 1 },
    ];
    for (const t of trustChecks) {
      const found = t.patterns.some((p) => html.includes(p));
      items.push({
        id: `trust-${t.id}`,
        label: t.label,
        status: found ? "pass" : "warn",
        detail: found ? `${t.label}.` : `${t.label} nicht gefunden.`,
        fix: found ? undefined : `${t.label} im Footer ergänzen.`,
      });
      if (found) score += t.weight;
    }

    // Social-Profile
    const socials = ["linkedin.com", "instagram.com", "tiktok.com", "youtube.com", "facebook.com", "twitter.com", "x.com"];
    const foundSocials = socials.filter((s) => html.includes(s));
    if (foundSocials.length >= 3) {
      items.push({
        id: "trust-social",
        label: "Social-Profile (sameAs)",
        status: "pass",
        detail: `${foundSocials.length} Social-Profile verlinkt.`,
      });
      score += 3;
    } else if (foundSocials.length >= 1) {
      items.push({
        id: "trust-social",
        label: "Social-Profile (sameAs)",
        status: "warn",
        detail: `Nur ${foundSocials.length} Social-Profil(e).`,
        fix: "Mindestens 3 Social-Profile verlinken.",
      });
      score += 1;
    } else {
      items.push({
        id: "trust-social",
        label: "Social-Profile (sameAs)",
        status: "fail",
        detail: "Keine Social-Profile gefunden.",
        fix: "LinkedIn, Instagram, TikTok etc. im Footer/Author-Box verlinken.",
      });
    }

    // Viewport
    if (/<meta\s+name=["']viewport["'][^>]*width=device-width/i.test(homeRes.text)) {
      items.push({
        id: "viewport",
        label: "Mobile Viewport",
        status: "pass",
        detail: "Viewport korrekt gesetzt.",
      });
      score += 1;
    } else {
      items.push({
        id: "viewport",
        label: "Mobile Viewport",
        status: "fail",
        detail: "Kein korrekter Viewport-Meta-Tag.",
        fix: 'Setze <meta name="viewport" content="width=device-width, initial-scale=1">.',
      });
    }
  }

  // PageSpeed (Top-3 URLs parallel mit allSettled)
  const top = pages
    .filter((p) => p.status === "ok")
    .slice(0, PAGESPEED_TOP_N)
    .map((p) => p.url);
  if (top.length > 0) {
    const psResults = await Promise.allSettled(top.map((u) => getPageSpeed(u)));
    const scores: number[] = [];
    psResults.forEach((r, idx) => {
      if (r.status === "fulfilled" && r.value !== null) {
        scores.push(r.value);
        // Score im PageReport speichern (mutate)
        const page = pages.find((p) => p.url === top[idx]);
        if (page) page.performance = r.value;
      } else {
        if (r.status === "rejected") {
          errors.push({ context: `pagespeed:${top[idx]}`, message: "PageSpeed-Fehler" });
        }
        const page = pages.find((p) => p.url === top[idx]);
        if (page) page.performance = null;
      }
    });
    if (scores.length > 0) {
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      if (avg >= 75) {
        items.push({
          id: "perf-lighthouse",
          label: "Core Web Vitals (Ø Mobile)",
          status: "pass",
          detail: `Ø Lighthouse-Performance ${avg}/100 über ${scores.length} Seiten.`,
        });
        score += 5;
      } else if (avg >= 50) {
        items.push({
          id: "perf-lighthouse",
          label: "Core Web Vitals (Ø Mobile)",
          status: "warn",
          detail: `Ø Lighthouse-Performance ${avg}/100 — verbesserungsfähig.`,
          fix: "LCP, CLS, INP optimieren — Bilder + Skripte schlanker machen.",
        });
        score += 2;
      } else {
        items.push({
          id: "perf-lighthouse",
          label: "Core Web Vitals (Ø Mobile)",
          status: "fail",
          detail: `Ø Lighthouse-Performance ${avg}/100 — kritisch.`,
          fix: "Mobile-Performance dringend optimieren.",
        });
      }
    } else {
      items.push({
        id: "perf-lighthouse",
        label: "Core Web Vitals (Ø Mobile)",
        status: "warn",
        detail: "PageSpeed konnte nicht ermittelt werden (API-Limit?).",
      });
      score += 2;
    }
  }

  const finalScore = Math.min(Math.round(score), 25);
  return {
    id: "performance",
    title: "Performance & Vertrauen (E-E-A-T)",
    score: finalScore,
    status: statusFromScore(finalScore, 25),
    summary:
      finalScore >= 20
        ? "Starkes Trust- und Performance-Profil."
        : finalScore >= 12
          ? "Solide Basis, einige Lücken bei Trust oder Speed."
          : "Wenig Trust-Signale oder Performance-Probleme.",
    items,
  };
}

// ─────────────────────────────────────────────────────────────
// Master-Funktion
// ─────────────────────────────────────────────────────────────
export interface RawCheckOutput {
  origin: string;
  pillars: PillarResult[];
  meta: { title: string | null; description: string | null };
  pages: PageReport[];
  stats: {
    pagesScanned: number;
    pagesOk: number;
    pagesFailed: number;
    totalCheckpoints: number;
    pagesWithIssues: number;
  };
  errors: CrawlError[];
}

export async function runAllChecks(rawUrl: string): Promise<RawCheckOutput | null> {
  const errors: CrawlError[] = [];

  // URL normalisieren — bewusst tolerant: Das eingegebene Protokoll wird
  // ignoriert (egal ob "http://", "https://" oder nackte Domain) und www/
  // ohne-www wird automatisch durchprobiert. So bricht der Check nicht ab,
  // nur weil jemand "http://" tippt oder die falsche www-Variante erwischt.
  const cleaned = rawUrl
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
  let host: string;
  try {
    host = new URL(`https://${cleaned}`).host;
  } catch {
    return null;
  }
  if (!host) return null;

  const bareHost = host.replace(/^www\./i, "");
  // Reihenfolge = Präferenz: https zuerst, dann die andere www-Variante,
  // http nur als letzter Rettungsanker.
  const candidates = [
    `https://${host}`,
    host === bareHost ? `https://www.${host}` : `https://${bareHost}`,
    `http://${host}`,
  ];

  // 1) Startseite laden (für Meta + Smoke-Test) — ersten erreichbaren Origin nehmen
  let origin = "";
  let homeRes: { text: string | null; error?: string } = { text: null };
  for (const cand of candidates) {
    const res = await fetchText(cand);
    if (res.text) {
      const u = new URL(cand);
      origin = `${u.protocol}//${u.host}`;
      homeRes = res;
      break;
    }
  }
  if (!origin || !homeRes.text) {
    return null;
  }
  const $home = cheerio.load(homeRes.text);
  const meta = {
    title: $home("title").first().text().trim() || null,
    description: $home('meta[name="description"]').attr("content")?.trim() || null,
  };

  // 2) Seiten entdecken (Sitemap → Links)
  const urls = await discoverPages(origin, errors);

  // 3) Pro-Seite-Crawl (parallel)
  const pages = await crawlPages(urls, errors);

  // 4) Säulen parallel berechnen (Promise.allSettled für Resilienz)
  const settled = await Promise.allSettled([
    pillarCrawler(origin, pages, errors),
    Promise.resolve(pillarSchema(pages)),
    pillarSeo(origin, pages),
    pillarPerformance(origin, pages, errors),
  ]);
  const pillars: PillarResult[] = [];
  const pillarIds: Array<PillarResult["id"]> = ["crawler", "schema", "seo", "performance"];
  const pillarTitles: Record<string, string> = {
    crawler: "KI-Crawler & Auffindbarkeit",
    schema: "Schema.org & strukturierte Daten",
    seo: "SEO-Fundament",
    performance: "Performance & Vertrauen (E-E-A-T)",
  };
  settled.forEach((r, idx) => {
    if (r.status === "fulfilled") {
      pillars.push(r.value);
    } else {
      errors.push({
        context: `pillar:${pillarIds[idx]}`,
        message: r.reason instanceof Error ? r.reason.message : "unknown",
      });
      pillars.push({
        id: pillarIds[idx],
        title: pillarTitles[pillarIds[idx]],
        score: 0,
        status: "fail",
        summary: "Säule konnte nicht ausgewertet werden.",
        items: [],
      });
    }
  });

  // 5) Stats
  const okPages = pages.filter((p) => p.status === "ok");
  const totalCheckpoints =
    pillars.reduce((s, p) => s + p.items.length, 0) +
    pages.reduce((s, p) => s + p.issues.length, 0);
  const pagesWithIssues = okPages.filter((p) => p.issues.length > 0).length;

  return {
    origin,
    pillars,
    meta,
    pages,
    stats: {
      pagesScanned: pages.length,
      pagesOk: okPages.length,
      pagesFailed: pages.length - okPages.length,
      totalCheckpoints,
      pagesWithIssues,
    },
    errors,
  };
}
