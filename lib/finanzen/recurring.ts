/**
 * Wiederkehrende Rechnungen (Retainer) — Datenschicht + Fälligkeitslogik.
 * Tabelle: public.rechnungen_wiederkehrend (RLS, service_role).
 * Der Finanz-Cron erzeugt aus fälligen Vorlagen Rechnungs-ENTWÜRFE.
 */
import type { AngebotPosition } from "@/lib/angebot/db";
import type { RechnungInput } from "@/lib/finanzen/db";

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

export type Intervall = "monatlich" | "quartalsweise" | "jaehrlich";

export type Wiederkehrend = {
  id: string;
  bezeichnung: string | null;
  kunde_firma: string | null;
  kunde_ansprech: string | null;
  kunde_strasse: string | null;
  kunde_plz_ort: string | null;
  kunde_land: string | null;
  kunde_email: string | null;
  titel: string | null;
  einleitung: string | null;
  positionen: AngebotPosition[];
  anmerkungen: string | null;
  bedingungen: string | null;
  netto: number;
  ust: number;
  brutto: number;
  intervall: Intervall;
  zahlungsziel_tage: number;
  naechste_faelligkeit: string;
  enddatum: string | null;
  abschlag_modus: boolean;
  abschlag_gesamt: number | null;
  aktiv: boolean;
  auto_senden: boolean;
  created_at: string;
  updated_at: string;
  last_erzeugt_at: string | null;
};

export type WiederkehrendInput = Partial<
  Omit<Wiederkehrend, "id" | "created_at" | "updated_at">
>;

const REST = () => `${URL}/rest/v1/rechnungen_wiederkehrend`;

export async function listWiederkehrend(): Promise<Wiederkehrend[]> {
  if (!dbReady()) return [];
  try {
    const r = await fetch(`${REST()}?order=created_at.desc&limit=200`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Wiederkehrend[];
  } catch {
    return [];
  }
}

export async function getWiederkehrendById(id: string): Promise<Wiederkehrend | null> {
  if (!dbReady() || !id) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Wiederkehrend[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Aktive Vorlagen, deren nächste Fälligkeit erreicht/überschritten ist. */
export async function listFaelligeWiederkehrend(heute: string): Promise<Wiederkehrend[]> {
  if (!dbReady()) return [];
  try {
    const q = `aktiv=eq.true&naechste_faelligkeit=lte.${heute}&limit=200`;
    const r = await fetch(`${REST()}?${q}`, { headers: headers() });
    if (!r.ok) return [];
    const rows = (await r.json()) as Wiederkehrend[];
    // Laufzeit-Ende: keine Erzeugung mehr, wenn die fällige Rate hinter dem Enddatum liegt.
    return rows.filter((w) => !w.enddatum || w.naechste_faelligkeit <= w.enddatum);
  } catch {
    return [];
  }
}

export async function insertWiederkehrend(
  fields: WiederkehrendInput,
): Promise<Wiederkehrend | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(fields),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Wiederkehrend[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function updateWiederkehrend(
  id: string,
  fields: WiederkehrendInput,
): Promise<Wiederkehrend | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Wiederkehrend[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Wiederkehrende Rechnung (Vorlage) löschen — stoppt künftige Auto-Erzeugung. */
export async function deleteWiederkehrend(id: string): Promise<boolean> {
  if (!dbReady() || !id) return false;
  try {
    const r = await fetch(`${REST()}?id=eq.${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    return r.ok;
  } catch {
    return false;
  }
}

function naechstesDatum(iso: string, intervall: Intervall): string {
  const d = new Date(iso + "T00:00:00Z");
  const monate = intervall === "monatlich" ? 1 : intervall === "quartalsweise" ? 3 : 12;
  d.setUTCMonth(d.getUTCMonth() + monate);
  return d.toISOString().slice(0, 10);
}

/** Baut die Rechnungs-Felder (Entwurf) aus einer wiederkehrenden Vorlage. */
export function rechnungAusWiederkehrend(
  w: Wiederkehrend,
  nummer: string,
  now: number,
): RechnungInput {
  const heute = new Date(now);
  const faellig = new Date(now + (w.zahlungsziel_tage || 14) * 24 * 60 * 60 * 1000);
  return {
    nummer,
    typ: w.abschlag_modus ? "abschlag" : "rechnung",
    titel: w.titel,
    kunde_firma: w.kunde_firma,
    kunde_ansprech: w.kunde_ansprech,
    kunde_strasse: w.kunde_strasse,
    kunde_plz_ort: w.kunde_plz_ort,
    kunde_land: w.kunde_land,
    kunde_email: w.kunde_email,
    einleitung: w.einleitung,
    positionen: w.positionen,
    anmerkungen: w.anmerkungen,
    bedingungen: w.bedingungen,
    netto: w.netto,
    ust: w.ust,
    brutto: w.brutto,
    status: "entwurf",
    rechnungsdatum: heute.toISOString().slice(0, 10),
    faellig_am: faellig.toISOString().slice(0, 10),
    zahlungsziel_tage: w.zahlungsziel_tage,
  };
}

/** Schiebt die nächste Fälligkeit nach vorn — und deaktiviert die Vorlage,
 *  sobald die nächste Fälligkeit hinter dem Enddatum läge (Laufzeit-Ende). */
export async function vorrueckenWiederkehrend(w: Wiederkehrend, now: number): Promise<void> {
  const naechste = naechstesDatum(w.naechste_faelligkeit, w.intervall);
  const beendet = !!w.enddatum && naechste > w.enddatum;
  await updateWiederkehrend(w.id, {
    naechste_faelligkeit: naechste,
    last_erzeugt_at: new Date(now).toISOString(),
    ...(beendet ? { aktiv: false } : {}),
  });
}
