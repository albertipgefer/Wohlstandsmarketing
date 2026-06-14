/**
 * Finanz-Datenschicht — Rechnungen (Supabase via PostgREST über fetch, kein SDK).
 * Stil & Env analog lib/angebot/db.ts; greift auf DASSELBE Fabrik-/SEO-Projekt zu
 * (geteilte Env-Vars ANGEBOT_SUPABASE_URL / ANGEBOT_SUPABASE_SERVICE_KEY).
 *
 * Tabelle: public.rechnungen (RLS an, ohne Policy → nur service_role).
 *
 * Nummernkreis: RE{Jahr}-{0001..} — fortlaufend pro Jahr, in Code vergeben
 * (Single-User → keine echte Race-Gefahr; bei Bedarf später DB-Sequence).
 */
import type { Angebot, AngebotPosition } from "@/lib/angebot/db";

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

export type RechnungStatus =
  | "entwurf"
  | "offen"
  | "teilbezahlt"
  | "bezahlt"
  | "ueberfaellig"
  | "storniert";

export type RechnungTyp = "rechnung" | "abschlag" | "schluss" | "storno";

export type Rechnung = {
  id: string;
  nummer: string | null;
  angebot_id: string | null;
  typ: RechnungTyp;
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
  status: RechnungStatus;
  public_token: string | null;
  rechnungsdatum: string | null;
  faellig_am: string | null;
  zahlungsziel_tage: number;
  bezahlt_am: string | null;
  mahnstufe: number;
  last_mahnung_at: string | null;
  created_at: string;
  updated_at: string;
  sent_at: string | null;
  close_lead_id: string | null;
};

export type RechnungInput = Partial<
  Omit<Rechnung, "id" | "created_at" | "updated_at">
>;

const REST = () => `${URL}/rest/v1/rechnungen`;

export async function insertRechnung(
  fields: RechnungInput,
): Promise<Rechnung | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST(), {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify(fields),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Rechnung[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function updateRechnung(
  id: string,
  fields: RechnungInput,
): Promise<Rechnung | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Rechnung[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getRechnungById(id: string): Promise<Rechnung | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Rechnung[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getRechnungByToken(
  token: string,
): Promise<Rechnung | null> {
  if (!dbReady() || !token) return null;
  try {
    const q = `public_token=eq.${encodeURIComponent(token)}&limit=1`;
    const r = await fetch(`${REST()}?${q}`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Rechnung[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function listRechnungen(limit = 300): Promise<Rechnung[]> {
  if (!dbReady()) return [];
  try {
    const q = `order=created_at.desc&limit=${limit}`;
    const r = await fetch(`${REST()}?${q}`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Rechnung[];
  } catch {
    return [];
  }
}

/** Gibt es schon eine Rechnung zu diesem Angebot? (Doppel-Erzeugung vermeiden) */
export async function getRechnungByAngebotId(
  angebotId: string,
): Promise<Rechnung | null> {
  if (!dbReady() || !angebotId) return null;
  try {
    const q = `angebot_id=eq.${encodeURIComponent(angebotId)}&limit=1`;
    const r = await fetch(`${REST()}?${q}`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Rechnung[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/**
 * Rechnung endgültig löschen (login-geschützt im Route-Handler).
 * Entfernt zuerst zugehörige Teilzahlungen (FK), dann die Rechnung selbst.
 */
export async function deleteRechnung(id: string): Promise<boolean> {
  if (!dbReady() || !id) return false;
  try {
    // Teilzahlungen zuerst entfernen (verhindert FK-Constraint-Fehler)
    await fetch(`${URL}/rest/v1/zahlungen?rechnung_id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: headers(),
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

/**
 * Nächste Rechnungsnummer RE{Jahr}-{0001..} ermitteln.
 * Liest die höchste vorhandene Nummer des Jahres und zählt hoch.
 */
export async function nextRechnungsnummer(year: number): Promise<string> {
  const prefix = `RE${year}-`;
  let max = 0;
  if (dbReady()) {
    try {
      const q = `nummer=like.${encodeURIComponent(prefix + "*")}&select=nummer&order=nummer.desc&limit=1`;
      const r = await fetch(`${REST()}?${q}`, { headers: headers() });
      if (r.ok) {
        const rows = (await r.json()) as { nummer: string | null }[];
        const last = rows[0]?.nummer;
        if (last) {
          const n = parseInt(last.slice(prefix.length), 10);
          if (Number.isFinite(n)) max = n;
        }
      }
    } catch {
      /* ignore → fällt auf 0 zurück */
    }
  }
  return `${prefix}${String(max + 1).padStart(4, "0")}`;
}

/**
 * Baut die Rechnungs-Felder aus einem (angenommenen) Angebot.
 * Übernimmt Kundendaten + Positionen + Summen 1:1, setzt Fälligkeit
 * = Rechnungsdatum + zahlungsziel_tage. Vergibt KEINE Nummer (das macht der
 * Aufrufer via nextRechnungsnummer, damit der Zeitpunkt der Vergabe klar ist).
 */
export function rechnungFromAngebot(
  a: Angebot,
  opts?: {
    zahlungszielTage?: number;
    status?: RechnungStatus;
    /** Wenn gesetzt (1–100): Abschlagsrechnung über diesen Prozentsatz des
     *  Angebotsbetrags statt der vollen Rechnung. */
    abschlagProzent?: number;
  },
): RechnungInput {
  const ziel = opts?.zahlungszielTage ?? 14;
  const heute = new Date();
  const faellig = new Date(heute.getTime() + ziel * 24 * 60 * 60 * 1000);

  const p = opts?.abschlagProzent;
  const istAbschlag = typeof p === "number" && p > 0 && p < 100;

  // Bei Abschlag: eine einzelne Abschlags-Position über den Teilbetrag (netto),
  // USt 19 %. Sonst die Original-Positionen 1:1.
  const abschlagNetto = istAbschlag ? Math.round(a.netto * (p! / 100) * 100) / 100 : a.netto;
  const abschlagUst = istAbschlag ? Math.round(abschlagNetto * 0.19 * 100) / 100 : a.ust;
  const abschlagBrutto = istAbschlag ? Math.round((abschlagNetto + abschlagUst) * 100) / 100 : a.brutto;

  const positionen = istAbschlag
    ? [
        {
          uid: `abschlag-${a.id}`,
          titel: `Abschlagszahlung ${p}%`,
          beschreibung: `${p}%-Abschlag auf Angebot ${a.nummer || ""}`.trim(),
          leistungen: [] as string[],
          preisNetto: abschlagNetto,
          menge: 1,
          einheit: "einmalig" as const,
          ustSatz: 19,
        },
      ]
    : a.positionen;

  return {
    angebot_id: a.id,
    typ: istAbschlag ? "abschlag" : "rechnung",
    titel: istAbschlag ? `Abschlagsrechnung — ${a.titel || ""}`.trim() : a.titel,
    untertitel: a.untertitel,
    kunde_firma: a.kunde_firma,
    kunde_ansprech: a.kunde_ansprech,
    kunde_strasse: a.kunde_strasse,
    kunde_plz_ort: a.kunde_plz_ort,
    kunde_land: a.kunde_land,
    kunde_email: a.kunde_email,
    einleitung: a.einleitung,
    positionen,
    anmerkungen: a.anmerkungen,
    bedingungen: a.bedingungen,
    netto: abschlagNetto,
    ust: abschlagUst,
    brutto: abschlagBrutto,
    status: opts?.status ?? "entwurf",
    rechnungsdatum: heute.toISOString().slice(0, 10),
    faellig_am: faellig.toISOString().slice(0, 10),
    zahlungsziel_tage: ziel,
  };
}
