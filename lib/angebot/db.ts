/**
 * Angebots-Datenschicht — Supabase via PostgREST über fetch (kein SDK),
 * Stil analog lib/outreach-db.ts. Greift auf das Fabrik-/SEO-Projekt zu
 * (dedizierte Env-Vars, getrennt vom Outreach-Projekt).
 *
 * Required ENV:
 *   ANGEBOT_SUPABASE_URL          — https://<ref>.supabase.co
 *   ANGEBOT_SUPABASE_SERVICE_KEY  — service_role-Key (nur serverseitig!)
 *
 * Tabelle: public.angebote (RLS an, ohne Policy → nur service_role).
 */
import { randomUUID } from "node:crypto";

const URL = process.env.ANGEBOT_SUPABASE_URL;
const KEY = process.env.ANGEBOT_SUPABASE_SERVICE_KEY;

function headers(extra?: Record<string, string>) {
  return {
    apikey: KEY || "",
    Authorization: `Bearer ${KEY || ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export function dbReady(): boolean {
  return !!URL && !!KEY;
}

export type AngebotStatus =
  | "entwurf"
  | "gesendet"
  | "angesehen"
  | "angenommen"
  | "abgelehnt";

export type AngebotPosition = {
  uid: string;
  titel: string;
  beschreibung: string;
  leistungen: string[];
  preisNetto: number;
  einheit: "einmalig" | "pro Monat";
  menge: number;
  ustSatz: number;
};

export type Angebot = {
  id: string;
  nummer: string | null;
  titel: string | null;
  untertitel: string | null;
  kunde_firma: string | null;
  kunde_ansprech: string | null;
  kunde_strasse: string | null;
  kunde_plz_ort: string | null;
  kunde_land: string | null;
  kunde_email: string | null;
  einleitung: string | null;
  positionen: AngebotPosition[];
  anmerkungen: string | null;
  bedingungen: string | null;
  netto: number;
  ust: number;
  brutto: number;
  status: AngebotStatus;
  public_token: string | null;
  gueltig_bis: string | null;
  created_at: string;
  updated_at: string;
  sent_at: string | null;
  viewed_at: string | null;
  accepted_at: string | null;
  declined_at: string | null;
  accept_name: string | null;
  accept_ip: string | null;
  close_lead_id: string | null;
  // Auto-Follow-up: höchste erledigte Erinnerungsstufe (0–2), die gerade zur
  // Telegram-Freigabe liegende Stufe (Sperre gegen tägliches Re-Pingen) und der
  // Zeitpunkt der letzten gesendeten Erinnerung. Siehe lib/angebot/reminder.ts.
  reminder_stufe: number;
  reminder_pending: number | null;
  last_reminder_at: string | null;
};

/** Felder, die beim Speichern/Anlegen erlaubt sind (kein id/Timestamps). */
export type AngebotInput = Partial<
  Omit<Angebot, "id" | "created_at" | "updated_at">
>;

const REST = () => `${URL}/rest/v1/angebote`;

/** Neues Angebot anlegen → gibt den Datensatz zurück (oder null bei Fehler). */
export async function insertAngebot(
  fields: AngebotInput,
): Promise<Angebot | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(fields),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Angebot[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Angebot aktualisieren (per id). Setzt updated_at automatisch. */
export async function updateAngebot(
  id: string,
  fields: AngebotInput,
): Promise<Angebot | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Angebot[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/**
 * Angebot löschen (login-geschützt im Route-Handler). Eine evtl. daraus
 * erzeugte Rechnung bleibt erhalten — ihre angebot_id wird gelöst (auf null
 * gesetzt), damit kein FK-Constraint das Löschen blockiert.
 */
export async function deleteAngebot(id: string): Promise<boolean> {
  if (!dbReady() || !id) return false;
  try {
    await fetch(`${URL}/rest/v1/rechnungen?angebot_id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ angebot_id: null }),
    });
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: headers(),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function getAngebotById(id: string): Promise<Angebot | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}&limit=1`, {
      headers: headers(),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Angebot[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getAngebotByToken(
  token: string,
): Promise<Angebot | null> {
  if (!dbReady() || !token) return null;
  try {
    const q = `public_token=eq.${encodeURIComponent(token)}&limit=1`;
    const r = await fetch(`${REST()}?${q}`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Angebot[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Alle Angebote, neueste zuerst (fürs Dashboard). */
export async function listAngebote(limit = 200): Promise<Angebot[]> {
  if (!dbReady()) return [];
  try {
    const q = `order=created_at.desc&limit=${limit}`;
    const r = await fetch(`${REST()}?${q}`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Angebot[];
  } catch {
    return [];
  }
}

/** Eindeutigen public_token erzeugen (für den Kunden-Link). */
export function newPublicToken(): string {
  return randomUUID().replace(/-/g, "");
}
