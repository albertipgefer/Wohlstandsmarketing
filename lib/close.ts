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

import { notifyNewLead, sendFirefliesTelegram } from "@/lib/telegram";

const CLOSE_BASE = "https://api.close.com/api/v1";

// Custom Field "Leadquelle" (Mehrfachauswahl) — Kanal, u. a. "Webseite", "Lead Magnet"
const CF_LEADQUELLE = "cf_4tvIavFLNa1TPcIaVNimpWA2ouLoQex5CyY4RcSy523";

// Custom Field "Website-Formular" (Mehrfachauswahl) — welches Formular der Lead nutzte.
// Macht die per-Formular-Smart-Views sauber filterbar (Leadquelle bleibt = Kanal).
const CF_WEBSITE_FORMULAR = "cf_SiThXrPoJTtQcagNHJgpYYLfede46t7lctVbsNaKR2y";

// Lead-Status "Nicht kontaktiert" — Startpunkt für frische Inbound-Leads
const STATUS_NICHT_KONTAKTIERT = "stat_LgnS6Nzg3QGf0ZdRs4LtZ0MkyQioALpOVCeLeX4T1fw";

// HOT-Lead-Routing: Wem die automatische "Sofort anrufen"-Aufgabe zugewiesen wird
// (Albert). Über ENV überschreibbar, falls der Account/Owner wechselt.
const ASSIGNEE_USER_ID =
  process.env.CLOSE_ASSIGNEE_USER_ID ||
  "user_f7ko2arPVfVjWzWjr8hgfaX1cj4nguGNdwaEDd83h6f";

// ki-check-Score darunter = großer Handlungsbedarf = HOT (starker Verkaufsaufhänger).
// Der Report selbst stuft < 60 als "deutliche Lücken" bis "kritisch" ein.
const HOT_KICHECK_MAX_SCORE = 60;

export type LeadSource = "ki-check" | "kontakt" | "angebot" | "lead-magnet" | "cold-outreach" | "location-check";

const SOURCE_LABEL: Record<LeadSource, string> = {
  "ki-check": "KI-Sichtbarkeitscheck",
  kontakt: "Kontaktformular",
  angebot: "Angebots-Konfigurator",
  "lead-magnet": "Lead-Magnet (PDF)",
  "cold-outreach": "Cold-Outreach (Antwort)",
  "location-check": "Eventlocation-Check (Firmenfeiern)",
};

// Zusätzliche Leadquelle-Werte je Weg (zu "Webseite", das immer gesetzt wird)
const SOURCE_EXTRA_LEADQUELLE: Record<LeadSource, string[]> = {
  "ki-check": ["Lead Magnet"],
  kontakt: [],
  angebot: [],
  "lead-magnet": ["Lead Magnet"],
  "cold-outreach": [],
  // Kommt aus der Meta-Ads-Kampagne → existierender Choice "META Paid ads"
  // macht die Leads in Close sauber filterbar (plus "Lead Magnet" als Funnel-Art).
  "location-check": ["META Paid ads", "Lead Magnet"],
};

// Wert im Feld "Website-Formular" je Weg (muss exakt den Choice-Werten entsprechen).
// Leerer Wert (cold-outreach) → Feld wird nicht gesetzt (kein ungültiger Choice).
const SOURCE_FORMULAR: Record<LeadSource, string> = {
  "ki-check": "KI-Sichtbarkeitscheck",
  kontakt: "Kontaktformular",
  angebot: "Angebots-Konfigurator",
  "lead-magnet": "Lead-Magnet",
  "cold-outreach": "",
  "location-check": "Eventlocation-Check",
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
  /** Nur bei source "ki-check": Gesamtscore 0–100 — steuert die HOT-Einstufung. */
  kiScore?: number;
  /**
   * Unterdrückt die interne Telegram-Benachrichtigung (Standard-Bot). Setzen,
   * wenn der Aufrufer den Lead selbst über einen DEDIZIERTEN Bot meldet (z. B.
   * der Eventlocation-Funnel über den WSMMetaAdsLeadsBot) — sonst kommt der
   * Lead doppelt an (einmal Standard-Bot, einmal dedizierter Bot).
   */
  skipTelegram?: boolean;
};

export type CloseSyncResult = {
  ok: boolean;
  leadId?: string;
  created?: boolean;
  reason?: string;
};

/**
 * HOT-Lead = hohe Kaufabsicht, soll sofort angerufen werden:
 *   - Angebots-Konfigurator genutzt (konkret konfiguriertes Angebot)
 *   - ki-check mit großem Handlungsbedarf (Score < HOT_KICHECK_MAX_SCORE)
 * Kontakt- und Lead-Magnet-Leads sind nie HOT (geringere/indirekte Absicht).
 */
function isHotLead(input: SyncLeadInput): boolean {
  if (input.source === "angebot") return true;
  if (input.source === "cold-outreach") return true; // positive Cold-Antwort = sofort anrufen
  if (
    (input.source === "ki-check" || input.source === "location-check") &&
    typeof input.kiScore === "number" &&
    input.kiScore < HOT_KICHECK_MAX_SCORE
  ) {
    return true;
  }
  return false;
}

/**
 * Legt eine "Sofort anrufen"-Aufgabe für Albert an (Fälligkeit: morgen = 24 h).
 * Gekapselt vom Aufrufer — ein Fehler hier darf den Lead-Sync nie sprengen.
 */
async function createCallTask(
  apiKey: string,
  leadId: string,
  sourceLabel: string,
): Promise<void> {
  // Fälligkeit morgen im Format YYYY-MM-DD (Close-Task-Due-Date ist datumsbasiert)
  const due = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  await closeFetch(apiKey, `/task/`, {
    method: "POST",
    body: JSON.stringify({
      _type: "lead",
      lead_id: leadId,
      assigned_to: ASSIGNEE_USER_ID,
      text: `🔥 HOT-Lead — sofort anrufen (${sourceLabel})`,
      date: due,
      is_complete: false,
    }),
  });
}

/**
 * Legt einen Website-Lead in Close an (oder aktualisiert einen bestehenden):
 *   - Dedup per E-Mail
 *   - Leadquelle = "Webseite" (+ ggf. weg-spezifische Werte), additiv
 *   - Kontakt mit Name + Mail + Telefon
 *   - Notiz mit Quelle + übergebenen Detail-Zeilen
 *   - HOT-Leads: zusätzlich "Sofort anrufen"-Aufgabe (24 h) für Albert
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
  const formularAdd = SOURCE_FORMULAR[input.source] ? [SOURCE_FORMULAR[input.source]] : [];

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

    // HOT-Lead-Routing: bei hoher Kaufabsicht eine "Sofort anrufen"-Aufgabe (24 h)
    // für Albert anlegen (eigenes try/catch — nie blockierend).
    const hot = isHotLead(input);
    if (hot) {
      try {
        await createCallTask(apiKey, leadId, SOURCE_LABEL[input.source]);
      } catch (e) {
        console.warn("Close-Task (HOT) Exception:", e);
      }
    }

    // Telegram-Sofort-Benachrichtigung aufs Handy (eigenes try/catch — nie blockierend).
    // Übersprungen, wenn der Aufrufer den Lead selbst über einen dedizierten Bot meldet.
    if (!input.skipTelegram) {
      try {
        await notifyNewLead({
          sourceLabel: SOURCE_LABEL[input.source],
          name: personName || leadName,
          email: input.email,
          phone: input.phone,
          detailLines: input.noteLines,
          leadId,
          hot,
        });
      } catch (e) {
        console.warn("Telegram-Notify Exception:", e);
      }
    }

    return { ok: true, leadId, created };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown" };
  }
}

// ───────────────────────── Fireflies → Call-Notiz (Baustein A) ─────────────────────────

export type CallType = "erstgespraech" | "strategiegespraech" | "folgetermin";

const CALL_TYPE_LABEL: Record<CallType, string> = {
  erstgespraech: "Erstgespräch (Setting)",
  strategiegespraech: "Strategiegespräch (Closing)",
  folgetermin: "Folgetermin",
};

const CALL_TYPE_FOLLOWUP: Record<CallType, string> = {
  erstgespraech: "Erstgespräch nachbereiten → Strategiegespräch terminieren",
  strategiegespraech: "Strategiegespräch nachfassen (Angebot / Entscheidung)",
  folgetermin: "Folgetermin nachfassen",
};

export type CallNoteInput = {
  /** E-Mail des Interessenten (nicht-interner Teilnehmer). */
  email: string;
  callType: CallType;
  /** Fireflies-Meeting-Titel (für Kontext in der Notiz). */
  title: string;
  /** ISO-Datum des Calls. */
  dateISO: string;
  /** Fireflies short_summary. */
  summary: string;
  keywords: string[];
  /** Fireflies action_items (vorformatierter String). */
  actionItems: string;
  meetingLink?: string;
  /** Fireflies-Transcript-ID — dient als Idempotenz-Marker. */
  transcriptId: string;
  /** Anzeigename des Interessenten (für Telegram), optional. */
  prospectName?: string;
  /** Wenn true: nichts in Close schreiben, nur das Ergebnis zurückgeben (Test). */
  dryRun?: boolean;
};

export type CallNoteResult = {
  ok: boolean;
  leadId?: string;
  /** true, wenn der Call schon dokumentiert war (Idempotenz). */
  skipped?: boolean;
  /** true, wenn kein passender Lead in Close gefunden wurde. */
  noLead?: boolean;
  reason?: string;
  /** Wie der Lead gefunden wurde: "email" | "domain" | "name". */
  matchedVia?: string;
  /** Im dryRun: die Notiz, die geschrieben WÜRDE. */
  preview?: string;
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Freemail-Domains: dafür KEIN Domain-Matching (sonst trifft es fremde Leads).
const FREEMAIL = new Set([
  "gmail.com", "googlemail.com", "web.de", "gmx.de", "gmx.net", "gmx.at",
  "t-online.de", "yahoo.com", "yahoo.de", "outlook.com", "outlook.de",
  "hotmail.com", "hotmail.de", "live.com", "live.de", "icloud.com", "me.com",
  "aol.com", "mail.com", "freenet.de",
]);

/** Sucht den ersten Lead-Treffer für eine Close-Query (oder null). */
async function searchLead(apiKey: string, query: string): Promise<CloseLead | null> {
  const q = encodeURIComponent(query);
  const r = await closeFetch(apiKey, `/lead/?query=${q}&_limit=1`);
  if (!r.ok) return null;
  const data = (await r.json()) as { data?: CloseLead[] };
  return data.data && data.data.length > 0 ? data.data[0] : null;
}

/**
 * Robustes Lead-Matching: zuerst exakte E-Mail, dann (bei Business-Domain) die
 * E-Mail-Domain, dann der Name. So wird der Lead auch dann korrekt zugeordnet,
 * wenn die Call-Mail von der im CRM hinterlegten Mail abweicht.
 */
async function findLeadFuzzy(
  apiKey: string,
  email: string,
  name?: string,
): Promise<{ lead: CloseLead; via: string } | null> {
  const byEmail = await findLeadByEmail(apiKey, email);
  if (byEmail) return { lead: byEmail, via: "email" };

  const domain = email.split("@")[1]?.toLowerCase();
  if (domain && !FREEMAIL.has(domain)) {
    const byDomain = await searchLead(apiKey, `email_domain:"${domain}"`);
    if (byDomain) return { lead: byDomain, via: "domain" };
  }

  const n = (name || "").trim();
  if (n.length > 2) {
    const byName = await searchLead(apiKey, `"${n}"`);
    if (byName) return { lead: byName, via: "name" };
  }

  return null;
}

/**
 * Schreibt nach einem Setting-/Closing-/Folgetermin automatisch eine
 * strukturierte Notiz + Follow-up-Task in den passenden Close-Lead.
 *
 * Match über die E-Mail des Interessenten. Idempotent über den versteckten
 * Marker `[ff:<transcriptId>]` in der Notiz (fängt Webhook-Retries ab).
 * Kein passender Lead → noLead:true (Aufrufer alarmiert per Telegram).
 * Wirft nicht.
 */
export async function addCallNoteAndTask(
  input: CallNoteInput,
): Promise<CallNoteResult> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return { ok: false, reason: "missing_close_key" };

  const marker = `[ff:${input.transcriptId}]`;
  const kw = input.keywords.filter(Boolean).join(", ");
  const note = [
    `📞 ${CALL_TYPE_LABEL[input.callType]} — ${input.dateISO.slice(0, 10)}`,
    "",
    input.summary?.trim() || "(keine Zusammenfassung verfügbar)",
    kw ? `\nKeywords: ${kw}` : null,
    input.actionItems?.trim() ? `\nAction Items:\n${input.actionItems.trim()}` : null,
    input.meetingLink ? `\nFireflies: ${input.meetingLink}` : null,
    `\n${marker}`,
  ]
    .filter((l) => l !== null)
    .join("\n")
    // Markdown-Reste (z. B. **Name** aus Fireflies) entfernen — Close-Notizen sind Plain-Text.
    .replace(/\*\*/g, "");

  if (input.dryRun) {
    const match = await findLeadFuzzy(apiKey, input.email, input.prospectName);
    return {
      ok: true,
      leadId: match?.lead.id,
      matchedVia: match?.via,
      noLead: !match,
      preview: note,
    };
  }

  try {
    const match = await findLeadFuzzy(apiKey, input.email, input.prospectName);
    if (!match) return { ok: true, noLead: true };
    const leadId = match.lead.id;
    const matchedVia = match.via;

    // Idempotenz: existiert schon eine Notiz mit diesem Marker?
    try {
      const r = await closeFetch(
        apiKey,
        `/activity/note/?lead_id=${encodeURIComponent(leadId)}&_limit=50`,
      );
      if (r.ok) {
        const data = (await r.json()) as { data?: { note?: string }[] };
        const exists = (data.data || []).some((n) =>
          (n.note || "").includes(marker),
        );
        if (exists) return { ok: true, leadId, skipped: true };
      }
    } catch {
      // Idempotenz-Check fehlgeschlagen → lieber schreiben als Call verlieren.
    }

    // Notiz schreiben
    await closeFetch(apiKey, `/activity/note/`, {
      method: "POST",
      body: JSON.stringify({ lead_id: leadId, note }),
    });

    // Follow-up-Task (Fälligkeit morgen) — eigenes try/catch, nie blockierend
    try {
      const due = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      await closeFetch(apiKey, `/task/`, {
        method: "POST",
        body: JSON.stringify({
          _type: "lead",
          lead_id: leadId,
          assigned_to: ASSIGNEE_USER_ID,
          text: `📞 ${CALL_TYPE_FOLLOWUP[input.callType]}`,
          date: due,
          is_complete: false,
        }),
      });
    } catch (e) {
      console.warn("Close-Task (Call-Followup) Exception:", e);
    }

    // Telegram-Ping (nie blockierend)
    try {
      const name = input.prospectName || input.email;
      const viaHint = matchedVia !== "email" ? `\n<i>(zugeordnet über ${esc(matchedVia)})</i>` : "";
      await sendFirefliesTelegram(
        `📞 <b>Call-Notiz erstellt</b>\n${esc(CALL_TYPE_LABEL[input.callType])} mit ${esc(name)}${viaHint}\n<a href="https://app.close.com/lead/${leadId}/">In Close öffnen</a>`,
      );
    } catch (e) {
      console.warn("Telegram-Notify (Call) Exception:", e);
    }

    return { ok: true, leadId, matchedVia };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown" };
  }
}
