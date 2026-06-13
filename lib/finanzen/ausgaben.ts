/**
 * Ausgaben (Betriebsausgaben) — Datenschicht. Für die Gewinn-Übersicht
 * (Einnahmen − Ausgaben). Ohne Steuerlogik; netto/brutto rein zur Erfassung.
 * Tabelle: public.ausgaben (RLS, service_role).
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

export type Ausgabe = {
  id: string;
  datum: string;
  lieferant: string | null;
  beschreibung: string | null;
  kategorie: string | null;
  betrag_netto: number;
  ust: number;
  betrag_brutto: number;
  bezahlt: boolean;
  notiz: string | null;
  beleg_url: string | null;
  created_at: string;
  updated_at: string;
};

export type AusgabeInput = Partial<Omit<Ausgabe, "id" | "created_at" | "updated_at">>;

const REST = () => `${URL}/rest/v1/ausgaben`;

export async function listAusgaben(limit = 500): Promise<Ausgabe[]> {
  if (!dbReady()) return [];
  try {
    const r = await fetch(`${REST()}?order=datum.desc&limit=${limit}`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Ausgabe[];
  } catch {
    return [];
  }
}

export async function getAusgabeById(id: string): Promise<Ausgabe | null> {
  if (!dbReady() || !id) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Ausgabe[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function insertAusgabe(fields: AusgabeInput): Promise<Ausgabe | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(fields),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Ausgabe[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function updateAusgabe(id: string, fields: AusgabeInput): Promise<Ausgabe | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Ausgabe[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function deleteAusgabe(id: string): Promise<boolean> {
  if (!dbReady() || !id) return false;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, { method: "DELETE", headers: headers() });
    return r.ok;
  } catch {
    return false;
  }
}

/** Summe Netto-Ausgaben im laufenden Jahr + pro Monat (Index 0 = Jan). */
export function ausgabenJahr(ausgaben: Ausgabe[], jahr: number): { netto: number; monatlich: number[] } {
  const monatlich = new Array(12).fill(0) as number[];
  let netto = 0;
  for (const a of ausgaben) {
    const d = new Date(a.datum);
    if (Number.isNaN(d.getTime()) || d.getFullYear() !== jahr) continue;
    netto += a.betrag_netto;
    monatlich[d.getMonth()] += a.betrag_netto;
  }
  return { netto, monatlich };
}
