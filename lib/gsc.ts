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
 * Required ENV (alle drei):
 *   GSC_CLIENT_EMAIL   — client_email des Service-Accounts
 *   GSC_PRIVATE_KEY    — private_key des Service-Accounts (\n maskiert erlaubt)
 *   GSC_SITE_URL       — Property, z. B. "sc-domain:wohlstandsmarketing.de"
 *                        oder "https://wohlstandsmarketing.de/"
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

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

type SearchRow = { keys?: string[]; clicks?: number; impressions?: number };

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
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const rawKey = process.env.GSC_PRIVATE_KEY;
  const site = process.env.GSC_SITE_URL;
  if (!clientEmail || !rawKey || !site) return null;

  // Vercel speichert mehrzeilige Keys oft mit \n als Literal — zurückübersetzen.
  const privateKey = rawKey.replace(/\\n/g, "\n");

  try {
    const token = await getAccessToken(clientEmail, privateKey);
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
