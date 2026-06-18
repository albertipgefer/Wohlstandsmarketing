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
  bounceRate: number; // 0..1 (Sitzungen mit nur einem Seitenaufruf)
  avgSessionSec: number; // Ø-Sitzungsdauer in Sekunden
  conversionRate: number; // 0..1 (Besucher mit Lead-Aktion / alle Besucher)
  googleVisitors: number; // Besucher, die über die Google-Suche kamen
  googleConversions: number; // davon mit Lead-Aktion
};

// Echte Lead-Signale (für Conversion-Rate + Google-Conversions).
const CONV =
  "'erstgespraech_geklickt','kontaktformular_gesendet','ki_check_abgeschlossen','lead_magnet_download','anruf_klick','email_klick'";

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

  const [
    live,
    totals,
    prev,
    series,
    pages,
    conv,
    sources,
    devices,
    funnel,
    sessions,
    google,
  ] = await Promise.all([
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
      hogql(
        `SELECT count() AS s, countIf(pv <= 1) AS b, avg(dur) AS d FROM (SELECT properties.$session_id AS sid, countIf(event = '$pageview') AS pv, dateDiff('second', min(timestamp), max(timestamp)) AS dur FROM events WHERE timestamp >= now() - INTERVAL ${range} DAY AND properties.$session_id != '' GROUP BY sid)`,
      ),
      hogql(
        `SELECT uniqIf(person_id, from_google = 1) AS gv, uniqIf(person_id, from_google = 1 AND conv > 0) AS gc, uniqIf(person_id, has_pv = 1 AND conv > 0) AS converter, uniqIf(person_id, has_pv = 1) AS pv_visitors FROM (SELECT person_id, maxIf(1, event = '$pageview' AND properties.$referring_domain LIKE '%google%') AS from_google, maxIf(1, event = '$pageview') AS has_pv, countIf(event IN (${CONV})) AS conv FROM events WHERE timestamp >= now() - INTERVAL ${range} DAY GROUP BY person_id)`,
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
    bounceRate:
      num(sessions[0]?.[0]) > 0
        ? num(sessions[0]?.[1]) / num(sessions[0]?.[0])
        : 0,
    avgSessionSec: Math.round(num(sessions[0]?.[2])),
    conversionRate:
      num(google[0]?.[3]) > 0 ? num(google[0]?.[2]) / num(google[0]?.[3]) : 0,
    googleVisitors: num(google[0]?.[0]),
    googleConversions: num(google[0]?.[1]),
  };
}

/**
 * Tages-Check für den Einbruch-Alarm: gestrige Seitenaufrufe vs.
 * Tagesdurchschnitt der 7 Tage davor. Null, wenn nicht konfiguriert/Fehler.
 */
export async function getDailyTrafficCheck(): Promise<{
  yesterday: number;
  avg7: number;
} | null> {
  if (!process.env.POSTHOG_PERSONAL_API_KEY || !process.env.POSTHOG_PROJECT_ID) {
    return null;
  }
  const rows = await hogql(
    `SELECT countIf(toDate(timestamp) = today() - 1) AS y, countIf(toDate(timestamp) >= today() - 8 AND toDate(timestamp) <= today() - 2) AS week FROM events WHERE event = '$pageview' AND timestamp >= now() - INTERVAL 9 DAY`,
  );
  if (!rows.length) return null;
  return { yesterday: num(rows[0]?.[0]), avg7: num(rows[0]?.[1]) / 7 };
}
