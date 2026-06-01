/**
 * GET /api/cron/indexnow
 *
 * Meldet neue/geänderte URLs automatisch an IndexNow (Bing, Yandex — und damit
 * an Copilot/ChatGPT-Suche, die den Bing-Index nutzen). Beschleunigt die
 * Indexierung neuer Inhalte deutlich.
 *
 * Strategie (stateless): Liest die Live-Sitemap und meldet alle URLs, deren
 * <lastmod> in den letzten WINDOW_DAYS liegt.
 *   - Neue Blog-Artikel haben ein echtes Datum (p.meta.date) → werden zuverlässig erkannt.
 *   - Übrige Seiten haben lastmod = Build-Zeit (stabil bis zum nächsten Deploy)
 *     → werden nach jedem Deploy einmalig im Zeitfenster gemeldet.
 *
 * Google nimmt IndexNow offiziell nicht → dort läuft die Discovery über die
 * Sitemap in der Search Console (bewusst nicht hier abgebildet).
 *
 * Schedule: täglich (siehe vercel.json). Manuell testbar: ?dryrun=1.
 * Auth: Header `Authorization: Bearer ${CRON_SECRET}`.
 *
 * Required ENV: CRON_SECRET
 * Optional ENV: INDEXNOW_KEY (sonst Konstante unten; muss zur public/<key>.txt passen)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://wohlstandsmarketing.de";
const HOST = "wohlstandsmarketing.de";

// Öffentlicher IndexNow-Key — liegt als public/<key>.txt im Repo (kein Geheimnis).
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "c1a450946f5fde5f7c6e7b3c769ff766";

const WINDOW_DAYS = 2;
const MAX_URLS = 10000; // IndexNow-Limit pro Request

/** Extrahiert {loc, lastmod} aus der Sitemap-XML (ohne Extra-Dependency). */
function parseSitemap(xml: string): { loc: string; lastmod: string | null }[] {
  const out: { loc: string; lastmod: string | null }[] = [];
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const b of blocks) {
    const loc = b.match(/<loc>(.*?)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    const lastmod = b.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim() || null;
    out.push({ loc, lastmod });
  }
  return out;
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const params = new URL(req.url).searchParams;
  const dryrun = params.get("dryrun") === "1";
  // ?all=1 (nur mit gültigem Secret): einmalig ALLE Sitemap-URLs melden
  // (z. B. für die Erstbefüllung von Bing), unabhängig vom lastmod-Fenster.
  const all = params.get("all") === "1";

  // 1) Sitemap laden
  const smRes = await fetch(`${SITE}/sitemap.xml`, {
    headers: { "User-Agent": "WSM-IndexNow-Cron" },
  });
  if (!smRes.ok) {
    return Response.json(
      { ok: false, reason: "sitemap_fetch_failed", status: smRes.status },
      { status: 502 },
    );
  }
  const xml = await smRes.text();
  const entries = parseSitemap(xml);

  // 2) Frische URLs auswählen
  const sinceMs = Date.now() - WINDOW_DAYS * 86_400_000;
  const urlList = entries
    .filter((e) => {
      if (all) return true;
      if (!e.lastmod) return false;
      const t = new Date(e.lastmod).getTime();
      return !Number.isNaN(t) && t >= sinceMs;
    })
    .map((e) => e.loc)
    .slice(0, MAX_URLS);

  if (dryrun) {
    return Response.json({
      ok: true,
      mode: all ? "dryrun-all" : "dryrun",
      sitemapTotal: entries.length,
      selected: urlList.length,
      sample: urlList.slice(0, 10),
    });
  }

  if (urlList.length === 0) {
    return Response.json({ ok: true, submitted: 0, note: "keine frischen URLs" });
  }

  // 3) An IndexNow melden
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  return Response.json({
    ok: r.ok,
    submitted: r.ok ? urlList.length : 0,
    indexnowStatus: r.status,
    sitemapTotal: entries.length,
  });
}
