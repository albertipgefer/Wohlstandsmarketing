/**
 * Zahlungen (Teilzahlungen je Rechnung). Tabelle: public.zahlungen (RLS,
 * service_role). PostgREST-Muster wie lib/finanzen/ausgaben.ts. Summen werden
 * clientfern in JS gebildet (Albert-Skala: unkritisch).
 */
const URL = process.env.ANGEBOT_SUPABASE_URL;
const KEY = process.env.ANGEBOT_SUPABASE_SERVICE_KEY;

function headers(extra?: Record<string, string>) {
  return { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json", ...extra };
}

export function dbReady(): boolean {
  return !!URL && !!KEY;
}

export type Zahlung = {
  id: string;
  rechnung_id: string;
  betrag: number;
  datum: string;
  quelle: string; // 'manuell' | 'bank'
  bank_tx_id: string | null;
  notiz: string | null;
  created_at: string;
};

const REST = () => `${URL}/rest/v1/zahlungen`;

export async function listAlleZahlungen(): Promise<Zahlung[]> {
  if (!dbReady()) return [];
  try {
    const r = await fetch(`${REST()}?order=datum.desc&limit=2000`, { headers: headers() });
    return r.ok ? ((await r.json()) as Zahlung[]) : [];
  } catch {
    return [];
  }
}

export async function listZahlungenFor(rechnungId: string): Promise<Zahlung[]> {
  if (!dbReady() || !rechnungId) return [];
  try {
    const r = await fetch(`${REST()}?rechnung_id=eq.${rechnungId}&order=datum.asc`, { headers: headers() });
    return r.ok ? ((await r.json()) as Zahlung[]) : [];
  } catch {
    return [];
  }
}

export async function insertZahlung(fields: Partial<Zahlung>): Promise<Zahlung | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), { method: "POST", headers: headers({ Prefer: "return=representation" }), body: JSON.stringify(fields) });
    return r.ok ? ((await r.json()) as Zahlung[])[0] || null : null;
  } catch {
    return null;
  }
}

/** Map rechnung_id → Summe der bisher erfassten Zahlungen. */
export function summen(zahlungen: Zahlung[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const z of zahlungen) m.set(z.rechnung_id, (m.get(z.rechnung_id) || 0) + z.betrag);
  return m;
}
