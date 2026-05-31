/**
 * Close CRM — minimaler API-Helper (Serverless-tauglich, nur fetch).
 *
 * Zweck: Inbound-Leads (aktuell: KI-Sichtbarkeitscheck) automatisch in Close
 * anlegen — sauber gelabelt, mit Dedup, ohne Dubletten.
 *
 * Auth: Close nutzt Basic-Auth mit dem API-Key als Username (Passwort leer).
 *
 * Required ENV:
 *   CLOSE_API_KEY
 *
 * Bewusst schlank gehalten: keine SDK-Abhängigkeit, alles über fetch.
 * Fehler werfen NIE nach außen — der Aufrufer kapselt in try/catch, damit
 * ein Close-Ausfall nie den Report-Versand an den Kunden blockiert.
 */

const CLOSE_BASE = "https://api.close.com/api/v1";

// Custom Field "Leadquelle" (Mehrfachauswahl) — Werte u. a. "Webseite", "Lead Magnet"
const CF_LEADQUELLE = "cf_4tvIavFLNa1TPcIaVNimpWA2ouLoQex5CyY4RcSy523";

// Lead-Status "Nicht kontaktiert" — Startpunkt für frische Inbound-Leads
const STATUS_NICHT_KONTAKTIERT = "stat_LgnS6Nzg3QGf0ZdRs4LtZ0MkyQioALpOVCeLeX4T1fw";

function authHeader(apiKey: string): string {
  // Basic-Auth: base64("<key>:")
  return "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
}

type CloseLead = {
  id: string;
  name?: string;
  [key: string]: unknown;
};

async function closeFetch(
  apiKey: string,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${CLOSE_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(apiKey),
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

/** Sucht einen Lead anhand einer E-Mail-Adresse. Gibt den ersten Treffer zurück oder null. */
async function findLeadByEmail(
  apiKey: string,
  email: string,
): Promise<CloseLead | null> {
  const q = encodeURIComponent(`email:"${email}"`);
  const r = await closeFetch(apiKey, `/lead/?query=${q}&_limit=1`);
  if (!r.ok) return null;
  const data = (await r.json()) as { data?: CloseLead[] };
  return data.data && data.data.length > 0 ? data.data[0] : null;
}

/** Fügt fehlende Leadquelle-Werte additiv hinzu (überschreibt vorhandene nie). */
function mergeLeadquelle(
  existing: unknown,
  add: string[],
): string[] {
  const current = Array.isArray(existing)
    ? (existing as string[])
    : typeof existing === "string" && existing
      ? [existing]
      : [];
  const set = new Set(current);
  for (const v of add) set.add(v);
  return Array.from(set);
}

export type KiCheckLeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  url: string;
  score: number;
  scoreLabel: string;
  city?: string;
  goal?: string;
};

export type CloseSyncResult = {
  ok: boolean;
  leadId?: string;
  created?: boolean;
  reason?: string;
};

/**
 * Legt den KI-Check-Lead in Close an (oder aktualisiert einen bestehenden):
 *   - Dedup per E-Mail
 *   - Leadquelle = "Webseite" + "Lead Magnet" (additiv)
 *   - Kontakt mit Name + Mail + Telefon
 *   - Notiz mit Score, geprüfter URL, Stadt & Ziel
 *
 * Wirft nicht — gibt im Fehlerfall { ok: false, reason } zurück.
 */
export async function syncKiCheckLead(
  input: KiCheckLeadInput,
): Promise<CloseSyncResult> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return { ok: false, reason: "missing_close_key" };

  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const leadquelleAdd = ["Webseite", "Lead Magnet"];

  try {
    const existing = await findLeadByEmail(apiKey, input.email);

    let leadId: string;
    let created: boolean;

    if (existing) {
      // Bestehenden Lead aktualisieren — Leadquelle additiv mergen, Status NICHT anfassen
      leadId = existing.id;
      created = false;
      const merged = mergeLeadquelle(
        existing[`custom.${CF_LEADQUELLE}`],
        leadquelleAdd,
      );
      await closeFetch(apiKey, `/lead/${leadId}/`, {
        method: "PUT",
        body: JSON.stringify({ [`custom.${CF_LEADQUELLE}`]: merged }),
      });
    } else {
      // Neuen Lead anlegen
      const createBody = {
        name: fullName,
        status_id: STATUS_NICHT_KONTAKTIERT,
        [`custom.${CF_LEADQUELLE}`]: leadquelleAdd,
        contacts: [
          {
            name: fullName,
            emails: [{ email: input.email, type: "office" }],
            phones: input.phone
              ? [{ phone: input.phone, type: "office" }]
              : [],
          },
        ],
      };
      const r = await closeFetch(apiKey, `/lead/`, {
        method: "POST",
        body: JSON.stringify(createBody),
      });
      if (!r.ok) {
        return { ok: false, reason: `create_failed_${r.status}` };
      }
      const lead = (await r.json()) as CloseLead;
      leadId = lead.id;
      created = true;
    }

    // Notiz mit den KI-Check-Daten anhängen (immer, auch bei Update)
    const note = [
      `KI-Sichtbarkeitscheck eingegangen`,
      `Score: ${input.score}/100 (${input.scoreLabel})`,
      `Geprüfte URL: ${input.url}`,
      input.city ? `Stadt: ${input.city}` : null,
      input.goal ? `Hauptziel: ${input.goal}` : null,
      `Telefon: ${input.phone}`,
    ]
      .filter(Boolean)
      .join("\n");

    await closeFetch(apiKey, `/activity/note/`, {
      method: "POST",
      body: JSON.stringify({ lead_id: leadId, note }),
    });

    return { ok: true, leadId, created };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown" };
  }
}
