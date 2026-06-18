/**
 * Google Search Console — minimaler API-Helper für das Wochen-Briefing.
 *
 * Holt ohne SDK (nur fetch + node:crypto) über den Service-Account-JWT-Flow:
 *   - Klicks / Impressionen der letzten 7 Tage (+ Vorwoche zum Vergleich)
 *   - Top-Suchanfragen
 *   - Top-Seiten (= Top-Blogartikel, wenn /blog/ im Pfad)
 *   - indexierte Seiten (Summe aus der Sitemaps-API)
 *
 * Optional — fehlt eine ENV, gibt getGscSummary() null zurück (Briefing zeigt
 * den SEO-Block dann einfach nicht). Wirft nie nach außen.
 *
 * Auth — zwei Wege, OAuth hat Vorrang (Service-Account als Fallback):
 *   A) OAuth-Refresh-Token (User-Consent, umgeht den GSC-"email not found"-Bug):
 *      GSC_OAUTH_CLIENT_ID, GSC_OAUTH_CLIENT_SECRET, GSC_OAUTH_REFRESH_TOKEN
 *   B) Service-Account (JWT): GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY
 *   Immer nötig:
 *      GSC_SITE_URL       — Property, z. B. "sc-domain:wohlstandsmarketing.de"
 *                           oder "https://wohlstandsmarketing.de/"
 */
import { createSign } from "crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SC_BASE = "https://searchconsole.googleapis.com/webmasters/v3";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Signiertes JWT für den Service-Account erzeugen und gegen ein Access-Token tauschen. */
async function getAccessToken(
  clientEmail: string,
  privateKey: string,
): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = base64url(signer.sign(privateKey));
  const assertion = `${signingInput}.${signature}`;

  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!r.ok) return null;
  const data = (await r.json()) as { access_token?: string };
  return data.access_token ?? null;
}

/** Access-Token über den OAuth-Refresh-Token (User-Consent-Flow) holen. */
async function getAccessTokenOAuth(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string | null> {
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!r.ok) return null;
  const data = (await r.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

type SearchRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

/** Access-Token aus den ENV holen (OAuth bevorzugt, Service-Account als Fallback). */
async function resolveAccessToken(): Promise<string | null> {
  const oauthId = process.env.GSC_OAUTH_CLIENT_ID;
  const oauthSecret = process.env.GSC_OAUTH_CLIENT_SECRET;
  const oauthRefresh = process.env.GSC_OAUTH_REFRESH_TOKEN;
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const rawKey = process.env.GSC_PRIVATE_KEY;
  if (oauthId && oauthSecret && oauthRefresh) {
    return getAccessTokenOAuth(oauthId, oauthSecret, oauthRefresh);
  }
  if (clientEmail && rawKey) {
    // Vercel speichert mehrzeilige Keys oft mit \n als Literal — zurückübersetzen.
    return getAccessToken(clientEmail, rawKey.replace(/\\n/g, "\n"));
  }
  return null;
}

async function searchAnalytics(
  token: string,
  site: string,
  body: Record<string, unknown>,
): Promise<SearchRow[]> {
  const r = await fetch(
    `${SC_BASE}/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!r.ok) return [];
  const data = (await r.json()) as { rows?: SearchRow[] };
  return data.rows ?? [];
}

export type GscSummary = {
  clicks: number;
  impressions: number;
  prevClicks: number;
  indexedPages: number | null;
  topQueries: { query: string; clicks: number }[];
  topPages: { page: string; clicks: number }[];
};

/** Liefert die GSC-Kennzahlen der letzten 7 Tage — oder null, wenn nicht konfiguriert/Fehler. */
export async function getGscSummary(): Promise<GscSummary | null> {
  const site = process.env.GSC_SITE_URL;
  if (!site) return null;

  try {
    const token = await resolveAccessToken();
    if (!token) return null;

    const end = isoDaysAgo(0);
    const start = isoDaysAgo(7);
    const prevEnd = isoDaysAgo(8);
    const prevStart = isoDaysAgo(14);

    const [totals, prevTotals, queries, pages] = await Promise.all([
      searchAnalytics(token, site, { startDate: start, endDate: end, rowLimit: 1 }),
      searchAnalytics(token, site, {
        startDate: prevStart,
        endDate: prevEnd,
        rowLimit: 1,
      }),
      searchAnalytics(token, site, {
        startDate: start,
        endDate: end,
        dimensions: ["query"],
        rowLimit: 5,
      }),
      searchAnalytics(token, site, {
        startDate: start,
        endDate: end,
        dimensions: ["page"],
        rowLimit: 5,
      }),
    ]);

    // Indexierte Seiten: Summe aus der Sitemaps-API (best effort)
    let indexedPages: number | null = null;
    try {
      const sm = await fetch(
        `${SC_BASE}/sites/${encodeURIComponent(site)}/sitemaps`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (sm.ok) {
        const d = (await sm.json()) as {
          sitemap?: { contents?: { indexed?: string | number }[] }[];
        };
        let sum = 0;
        let found = false;
        for (const s of d.sitemap ?? []) {
          for (const c of s.contents ?? []) {
            if (c.indexed != null) {
              sum += Number(c.indexed) || 0;
              found = true;
            }
          }
        }
        indexedPages = found ? sum : null;
      }
    } catch {
      // Sitemaps optional — Block bleibt ohne Index-Zahl
    }

    return {
      clicks: Math.round(totals[0]?.clicks ?? 0),
      impressions: Math.round(totals[0]?.impressions ?? 0),
      prevClicks: Math.round(prevTotals[0]?.clicks ?? 0),
      indexedPages,
      topQueries: queries.map((r) => ({
        query: r.keys?.[0] ?? "—",
        clicks: Math.round(r.clicks ?? 0),
      })),
      topPages: pages.map((r) => ({
        page: r.keys?.[0] ?? "—",
        clicks: Math.round(r.clicks ?? 0),
      })),
    };
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────
 * Dashboard-Daten für /traffic (volle Kennzahlen + Zeitreihe über 7/28/90 Tage).
 * Nutzt dieselbe Auth/Fetch-Basis wie getGscSummary, liefert aber CTR, Position
 * und die Tages-Zeitreihe fürs Trend-Chart.
 * ───────────────────────────────────────────────────────────────────────── */

export type GscMetrics = {
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number; // Ø-Position (kleiner = besser)
};

export type GscRow = {
  key: string; // Suchanfrage oder Seiten-URL
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number;
};

/** Keyword-Chance (Striking Distance) mit geschätztem ungenutztem Klick-Potenzial. */
export type GscOpportunity = GscRow & { potential: number };

export type GscDashboard = {
  rangeDays: number;
  current: GscMetrics;
  previous: GscMetrics; // gleich langer Zeitraum davor (Vergleich)
  indexedPages: number | null;
  series: { date: string; clicks: number; impressions: number }[];
  topQueries: GscRow[];
  topPages: GscRow[];
  opportunities: GscOpportunity[]; // Keyword-Chancen, Position 5–15
};

function metricsFrom(rows: SearchRow[]): GscMetrics {
  const r = rows[0];
  return {
    clicks: Math.round(r?.clicks ?? 0),
    impressions: Math.round(r?.impressions ?? 0),
    ctr: r?.ctr ?? 0,
    position: r?.position ?? 0,
  };
}

function rowsFrom(rows: SearchRow[]): GscRow[] {
  return rows.map((r) => ({
    key: r.keys?.[0] ?? "—",
    clicks: Math.round(r.clicks ?? 0),
    impressions: Math.round(r.impressions ?? 0),
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

/**
 * Keyword-Chancen ("Striking Distance"): Suchanfragen knapp vor/auf Seite 1
 * (Ø-Position 5–15) mit nennenswerten Impressionen. Sortiert nach geschätztem
 * ungenutztem Potenzial = Impressionen × 10 % (CTR-Richtwert für Top-Plätze)
 * minus aktuelle Klicks. Das sind die schnellsten Ranking-Hebel.
 */
function opportunitiesFrom(rows: GscRow[]): GscOpportunity[] {
  return rows
    .filter((r) => r.position >= 4 && r.position <= 20 && r.impressions >= 5)
    .map((r) => ({
      ...r,
      potential: Math.max(0, Math.round(r.impressions * 0.1 - r.clicks)),
    }))
    .sort((a, b) => b.potential - a.potential)
    .slice(0, 25);
}

/**
 * Anzahl Seiten mit Google-Suchpräsenz über die letzten 90 Tage — die beste
 * Live-Annäherung an "indexierte Seiten". Hintergrund: Google bietet die
 * Coverage-/Index-Zahl NICHT per API an, und das `indexed`-Feld der Sitemaps-
 * API liefert seit ~2023 keine verlässlichen Werte mehr. Stattdessen zählen
 * wir die eindeutigen Seiten, die in der Suche tatsächlich erschienen sind.
 */
async function getIndexedPages(token: string, site: string): Promise<number | null> {
  const rows = await searchAnalytics(token, site, {
    startDate: isoDaysAgo(90),
    endDate: isoDaysAgo(0),
    dimensions: ["page"],
    rowLimit: 5000,
  });
  return rows.length > 0 ? rows.length : null;
}

const ALLOWED_RANGES = [7, 28, 90] as const;

/** Voll-Datensatz fürs /traffic-Dashboard. Null, wenn nicht konfiguriert/Fehler. */
export async function getGscDashboard(rangeDays = 28): Promise<GscDashboard | null> {
  const site = process.env.GSC_SITE_URL;
  if (!site) return null;
  const range = (ALLOWED_RANGES as readonly number[]).includes(rangeDays) ? rangeDays : 28;

  try {
    const token = await resolveAccessToken();
    if (!token) return null;

    const end = isoDaysAgo(0);
    const start = isoDaysAgo(range);
    const prevEnd = isoDaysAgo(range + 1);
    const prevStart = isoDaysAgo(range * 2);

    const [cur, prev, series, queries, pages] = await Promise.all([
      searchAnalytics(token, site, { startDate: start, endDate: end, rowLimit: 1 }),
      searchAnalytics(token, site, { startDate: prevStart, endDate: prevEnd, rowLimit: 1 }),
      searchAnalytics(token, site, {
        startDate: start,
        endDate: end,
        dimensions: ["date"],
        rowLimit: 1000,
      }),
      searchAnalytics(token, site, {
        startDate: start,
        endDate: end,
        dimensions: ["query"],
        rowLimit: 1000,
      }),
      searchAnalytics(token, site, {
        startDate: start,
        endDate: end,
        dimensions: ["page"],
        rowLimit: 100,
      }),
    ]);

    const allQueries = rowsFrom(queries);
    return {
      rangeDays: range,
      current: metricsFrom(cur),
      previous: metricsFrom(prev),
      indexedPages: await getIndexedPages(token, site),
      series: series.map((r) => ({
        date: r.keys?.[0] ?? "",
        clicks: Math.round(r.clicks ?? 0),
        impressions: Math.round(r.impressions ?? 0),
      })),
      topQueries: allQueries.slice(0, 100),
      topPages: rowsFrom(pages),
      opportunities: opportunitiesFrom(allQueries),
    };
  } catch {
    return null;
  }
}
