/**
 * Kundenverwaltung — eigene Stammdaten (unabhängig von Angeboten/Rechnungen).
 * Tabelle: public.kunden (RLS, service_role). Anlegen/Bearbeiten/Löschen.
 */
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

export type Kunde = {
  id: string;
  firma: string | null;
  ansprech: string | null;
  strasse: string | null;
  plz_ort: string | null;
  land: string | null;
  email: string | null;
  telefon: string | null;
  ust_id: string | null;
  notiz: string | null;
  weitere_emails: string[];
  created_at: string;
  updated_at: string;
};

export type KundeInput = Partial<Omit<Kunde, "id" | "created_at" | "updated_at">>;

const REST = () => `${URL}/rest/v1/kunden`;

export async function listKunden(): Promise<Kunde[]> {
  if (!dbReady()) return [];
  try {
    const r = await fetch(`${REST()}?order=created_at.desc&limit=500`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Kunde[];
  } catch {
    return [];
  }
}

export async function getKundeById(id: string): Promise<Kunde | null> {
  if (!dbReady() || !id) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Kunde[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function insertKunde(fields: KundeInput): Promise<Kunde | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(fields),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Kunde[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function updateKunde(id: string, fields: KundeInput): Promise<Kunde | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Kunde[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function deleteKunde(id: string): Promise<boolean> {
  if (!dbReady() || !id) return false;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, { method: "DELETE", headers: headers() });
    return r.ok;
  } catch {
    return false;
  }
}
