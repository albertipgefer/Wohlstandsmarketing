/**
 * Close CRM — minimaler API-Helper (Serverless-tauglich, nur fetch).
 *
 * Zweck: Jeden Inbound-Lead von der Website automatisch in Close anlegen —
 * sauber gelabelt, mit Dedup, ohne Dubletten. Abgedeckte Wege:
 *   - KI-Sichtbarkeitscheck  (/api/ki-check/report)
 *   - Kontaktformular        (/api/contact)
 *   - Angebots-Konfigurator  (/api/angebot)
 *   - Lead-Magnet (nach DOI)  (/api/lead-magnet/confirm)
 *
 * Jeder Website-Lead bekommt Leadquelle "Webseite" → fällt damit in die
 * Smart View "Neue Website-Leads". Der konkrete Weg + Details stehen in der Notiz.
 *
 * Auth: Close nutzt Basic-Auth mit dem API-Key als Username (Passwort leer).
 *
 * Required ENV:
 *   CLOSE_API_KEY
 *
 * Bewusst schlank: keine SDK-Abhängigkeit, alles über fetch.
 * Fehler werfen NIE nach außen — der Aufrufer kapselt in try/catch, damit
 * ein Close-Ausfall nie den Mail-Versand an den Kunden blockiert.
 */

const CLOSE_BASE = "https://api.close.com/api/v1";

// Custom Field "Leadquelle" (Mehrfachauswahl) — Kanal, u. a. "Webseite", "Lead Magnet"
const CF_LEADQUELLE = "cf_4tvIavFLNa1TPcIaVNimpWA2ouLoQex5CyY4RcSy523";

// Custom Field "Website-Formular" (Mehrfachauswahl) — welches Formular der Lead nutzte.
// Macht die per-Formular-Smart-Views sauber filterbar (Leadquelle bleibt = Kanal).
const CF_WEBSITE_FORMULAR = "cf_SiThXrPoJTtQcagNHJgpYYLfede46t7lctVbsNaKR2y";

// Lead-Status "Nicht kontaktiert" — Startpunkt für frische Inbound-Leads
const STATUS_NICHT_KONTAKTIERT = "stat_LgnS6Nzg3QGf0ZdRs4LtZ0MkyQioALpOVCeLeX4T1fw";

export type LeadSource = "ki-check" | "kontakt" | "angebot" | "lead-magnet";

const SOURCE_LABEL: Record<LeadSource, string> = {
  "ki-check": "KI-Sichtbarkeitscheck",
  kontakt: "Kontaktformular",
  angebot: "Angebots-Konfigurator",
  "lead-magnet": "Lead-Magnet (PDF)",
};

// Zusätzliche Leadquelle-Werte je Weg (zu "Webseite", das immer gesetzt wird)
const SOURCE_EXTRA_LEADQUELLE: Record<LeadSource, string[]> = {
  "ki-check": ["Lead Magnet"],
  kontakt: [],
  angebot: [],
  "lead-magnet": ["Lead Magnet"],
};

// Wert im Feld "Website-Formular" je Weg (muss exakt den Choice-Werten entsprechen)
const SOURCE_FORMULAR: Record<LeadSource, string> = {
  "ki-check": "KI-Sichtbarkeitscheck",
  kontakt: "Kontaktformular",
  angebot: "Angebots-Konfigurator",
  "lead-magnet": "Lead-Magnet",
};

function authHeader(apiKey: string): string {
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

/** Fügt fehlende Choice-Werte additiv hinzu (überschreibt vorhandene nie). */
function mergeChoices(existing: unknown, add: string[]): string[] {
  const current = Array.isArray(existing)
    ? (existing as string[])
    : typeof existing === "string" && existing
      ? [existing]
      : [];
  const set = new Set(current);
  for (const v of add) set.add(v);
  return Array.from(set);
}

export type SyncLeadInput = {
  source: LeadSource;
  /** Voller Name (z. B. Kontaktformular liefert nur ein Namensfeld). */
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  /** Firmenname — wird, falls vorhanden, als Lead-Name genutzt (B2B-üblich). */
  company?: string;
  /** Zeilen für die Notiz (Header mit Quelle wird automatisch vorangestellt). */
  noteLines?: (string | null | undefined)[];
};

export type CloseSyncResult = {
  ok: boolean;
  leadId?: string;
  created?: boolean;
  reason?: string;
};

/**
 * Legt einen Website-Lead in Close an (oder aktualisiert einen bestehenden):
 *   - Dedup per E-Mail
 *   - Leadquelle = "Webseite" (+ ggf. weg-spezifische Werte), additiv
 *   - Kontakt mit Name + Mail + Telefon
 *   - Notiz mit Quelle + übergebenen Detail-Zeilen
 *
 * Wirft nicht — gibt im Fehlerfall { ok: false, reason } zurück.
 */
export async function syncLeadToClose(
  input: SyncLeadInput,
): Promise<CloseSyncResult> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return { ok: false, reason: "missing_close_key" };

  const personName =
    input.fullName?.trim() ||
    `${input.firstName || ""} ${input.lastName || ""}`.trim();
  const leadName = input.company?.trim() || personName || input.email;
  const contactName = personName || input.company?.trim() || input.email;

  const leadquelleAdd = ["Webseite", ...SOURCE_EXTRA_LEADQUELLE[input.source]];
  const formularAdd = [SOURCE_FORMULAR[input.source]];

  try {
    const existing = await findLeadByEmail(apiKey, input.email);

    let leadId: string;
    let created: boolean;

    if (existing) {
      // Bestehenden Lead aktualisieren — beide Felder additiv mergen, Status NICHT anfassen
      leadId = existing.id;
      created = false;
      const mergedQuelle = mergeChoices(
        existing[`custom.${CF_LEADQUELLE}`],
        leadquelleAdd,
      );
      const mergedFormular = mergeChoices(
        existing[`custom.${CF_WEBSITE_FORMULAR}`],
        formularAdd,
      );
      await closeFetch(apiKey, `/lead/${leadId}/`, {
        method: "PUT",
        body: JSON.stringify({
          [`custom.${CF_LEADQUELLE}`]: mergedQuelle,
          [`custom.${CF_WEBSITE_FORMULAR}`]: mergedFormular,
        }),
      });
    } else {
      // Neuen Lead anlegen
      const createBody = {
        name: leadName,
        status_id: STATUS_NICHT_KONTAKTIERT,
        [`custom.${CF_LEADQUELLE}`]: leadquelleAdd,
        [`custom.${CF_WEBSITE_FORMULAR}`]: formularAdd,
        contacts: [
          {
            name: contactName,
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

    // Notiz anhängen (immer — auch bei bestehendem Lead = neuer Touchpoint)
    const note = [
      `Neue Anfrage über: ${SOURCE_LABEL[input.source]}`,
      ...(input.noteLines || []).filter(Boolean),
      input.phone ? `Telefon: ${input.phone}` : null,
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
