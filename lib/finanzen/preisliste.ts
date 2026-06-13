/**
 * Preisliste — wiederverwendbare Leistungen/Produkte, die beim Erstellen von
 * Angeboten und Rechnungen ausgewählt werden können. Tabelle: public.preisliste
 * (RLS, service_role). PostgREST-Muster wie lib/finanzen/ausgaben.ts.
 */
const URL = process.env.ANGEBOT_SUPABASE_URL;
const KEY = process.env.ANGEBOT_SUPABASE_SERVICE_KEY;

function headers(extra?: Record<string, string>) {
  return { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json", ...extra };
}

export function dbReady(): boolean {
  return !!URL && !!KEY;
}

export type Preisposition = {
  id: string;
  bezeichnung: string;
  beschreibung: string | null;
  preis_netto: number;
  ust_satz: number;
  einheit: string; // 'einmalig' | 'pro Monat'
  aktiv: boolean;
  sortierung: number;
  created_at: string;
  updated_at: string;
};

export type PreispositionInput = Partial<Omit<Preisposition, "id" | "created_at" | "updated_at">>;

const REST = () => `${URL}/rest/v1/preisliste`;

export async function listPreisliste(nurAktive = false): Promise<Preisposition[]> {
  if (!dbReady()) return [];
  try {
    const filter = nurAktive ? "&aktiv=eq.true" : "";
    const r = await fetch(`${REST()}?order=sortierung.asc,bezeichnung.asc${filter}`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Preisposition[];
  } catch {
    return [];
  }
}

export async function getPreispositionById(id: string): Promise<Preisposition | null> {
  if (!dbReady() || !id) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Preisposition[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function insertPreisposition(fields: PreispositionInput): Promise<Preisposition | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), { method: "POST", headers: headers({ Prefer: "return=representation" }), body: JSON.stringify(fields) });
    if (!r.ok) return null;
    const rows = (await r.json()) as Preisposition[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function updatePreisposition(id: string, fields: PreispositionInput): Promise<Preisposition | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Preisposition[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function deletePreisposition(id: string): Promise<boolean> {
  if (!dbReady() || !id) return false;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, { method: "DELETE", headers: headers() });
    return r.ok;
  } catch {
    return false;
  }
}
