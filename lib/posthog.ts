/**
 * PostHog — serverseitiger Datenabruf fürs /traffic-Dashboard (Ebene "Live & Verhalten").
 *
 * Nutzt die HogQL Query-API (EU): POST {host}/api/projects/{id}/query mit dem
 * Personal API Key. Liest nur aggregierte Daten — kein personenbezogener Abruf.
 *
 * Optional — fehlt eine ENV, gibt getPosthogDashboard() null zurück (das
 * Dashboard zeigt dann einen Hinweis). Wirft nie nach außen.
 *
 * Required ENV:
 *   POSTHOG_PERSONAL_API_KEY  — Personal API Key (phx_…), nur server-seitig
 *   POSTHOG_PROJECT_ID        — Projekt-ID (Zahl)
 * Optional:
 *   POSTHOG_API_HOST          — Default https://eu.posthog.com
 */

const DEFAULT_HOST = "https://eu.posthog.com";
const ALLOWED_RANGES = [7, 28, 90] as const;

type Row = (string | number | null)[];

/** Eine HogQL-Query gegen die PostHog-API ausführen. Bei Fehler: leeres Array. */
async function hogql(query: string): Promise<Row[]> {
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_API_HOST || DEFAULT_HOST;
  if (!key || !projectId) return [];
  try {
    const r = await fetch(`${host}/api/projects/${projectId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
      // immer frische Daten
      cache: "no-store",
    });
    if (!r.ok) return [];
    const data = (await r.json()) as { results?: Row[] };
    return data.results ?? [];
  } catch {
    return [];
  }
}

const num = (v: string | number | null | undefined): number =>
  typeof v === "number" ? v : Number(v) || 0;
const str = (v: string | number | null | undefined): string =>
  v == null || v === "" ? "" : String(v);

export type PosthogDashboard = {
  rangeDays: number;
  liveVisitors: number;
  visitors: number;
  pageviews: number;
  prevVisitors: number;
  prevPageviews: number;
  series: { date: string; visitors: number; views: number }[];
  topPages: { path: string; views: number }[];
  conversions: { event: string; count: number }[];
  sources: { source: string; count: number }[];
  devices: { device: string; count: number }[];
  funnel: { label: string; count: number }[];
};

/** Alle Kennzahlen der Live-/Verhaltens-Ebene. Null, wenn nicht konfiguriert. */
export async function getPosthogDashboard(
  rangeDays = 28,
): Promise<PosthogDashboard | null> {
  if (!process.env.POSTHOG_PERSONAL_API_KEY || !process.env.POSTHOG_PROJECT_ID) {
    return null;
  }
  const range = (ALLOWED_RANGES as readonly number[]).includes(rangeDays)
    ? rangeDays
    : 28;

  const pvWindow = `event = '$pageview' AND timestamp >= now() - INTERVAL ${range} DAY`;
  const prevWindow = `event = '$pageview' AND timestamp < now() - INTERVAL ${range} DAY AND timestamp >= now() - INTERVAL ${range * 2} DAY`;

  const [live, totals, prev, series, pages, conv, sources, devices, funnel] =
    await Promise.all([
      hogql(
        `SELECT uniq(person_id) FROM events WHERE timestamp >= now() - INTERVAL 5 MINUTE`,
      ),
      hogql(
        `SELECT uniq(person_id) AS v, count() AS pv FROM events WHERE ${pvWindow}`,
      ),
      hogql(
        `SELECT uniq(person_id) AS v, count() AS pv FROM events WHERE ${prevWindow}`,
      ),
      hogql(
        `SELECT toDate(timestamp) AS d, uniq(person_id) AS v, count() AS pv FROM events WHERE ${pvWindow} GROUP BY d ORDER BY d`,
      ),
      hogql(
        `SELECT properties.$pathname AS path, count() AS pv FROM events WHERE ${pvWindow} GROUP BY path ORDER BY pv DESC LIMIT 25`,
      ),
      hogql(
        `SELECT event, count() AS c FROM events WHERE event IN ('kontaktformular_gesendet','lead_magnet_download','ki_check_gestartet','ki_check_abgeschlossen','erstgespraech_geklickt','anruf_klick','email_klick','preise_konfiguriert') AND timestamp >= now() - INTERVAL ${range} DAY GROUP BY event ORDER BY c DESC`,
      ),
      hogql(
        `SELECT coalesce(nullIf(properties.$referring_domain, ''), 'Direkt / unbekannt') AS src, count() AS c FROM events WHERE ${pvWindow} GROUP BY src ORDER BY c DESC LIMIT 10`,
      ),
      hogql(
        `SELECT coalesce(properties.$device_type, 'unbekannt') AS dev, count() AS c FROM events WHERE ${pvWindow} GROUP BY dev ORDER BY c DESC`,
      ),
      hogql(
        `SELECT uniqIf(person_id, event = '$pageview') AS besucher, uniqIf(person_id, event = '$pageview' AND properties.$pathname = '/preise') AS preise, uniqIf(person_id, event IN ('erstgespraech_geklickt','kontaktformular_gesendet')) AS lead FROM events WHERE timestamp >= now() - INTERVAL ${range} DAY`,
      ),
    ]);

  return {
    rangeDays: range,
    liveVisitors: num(live[0]?.[0]),
    visitors: num(totals[0]?.[0]),
    pageviews: num(totals[0]?.[1]),
    prevVisitors: num(prev[0]?.[0]),
    prevPageviews: num(prev[0]?.[1]),
    series: series.map((r) => ({
      date: str(r[0]),
      visitors: num(r[1]),
      views: num(r[2]),
    })),
    topPages: pages.map((r) => ({ path: str(r[0]) || "/", views: num(r[1]) })),
    conversions: conv.map((r) => ({ event: str(r[0]), count: num(r[1]) })),
    sources: sources.map((r) => ({ source: str(r[0]), count: num(r[1]) })),
    devices: devices.map((r) => ({ device: str(r[0]), count: num(r[1]) })),
    funnel: [
      { label: "Besucher", count: num(funnel[0]?.[0]) },
      { label: "Preise angesehen", count: num(funnel[0]?.[1]) },
      { label: "Lead (Erstgespräch / Kontakt)", count: num(funnel[0]?.[2]) },
    ],
  };
}
