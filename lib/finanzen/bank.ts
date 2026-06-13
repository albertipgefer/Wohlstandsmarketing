/**
 * Bank-Anbindung via GoCardless Bank Account Data (PSD2, kostenlos) — für N26.
 * Enthält Datenschicht (bank_konten, bank_transaktionen, PostgREST/service_role)
 * und den GoCardless-Client (Token, Institutions, Requisition/Consent, Accounts,
 * Transactions). Geht live, sobald GOCARDLESS_SECRET_ID/_KEY gesetzt sind und
 * Albert den N26-Consent erteilt hat.
 */
const URL = process.env.ANGEBOT_SUPABASE_URL;
const KEY = process.env.ANGEBOT_SUPABASE_SERVICE_KEY;
const GC_ID = process.env.GOCARDLESS_SECRET_ID;
const GC_KEY = process.env.GOCARDLESS_SECRET_KEY;
const GC_BASE = "https://bankaccountdata.gocardless.com/api/v2";

function headers(extra?: Record<string, string>) {
  return { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json", ...extra };
}

export function dbReady(): boolean {
  return !!URL && !!KEY;
}
export function gcReady(): boolean {
  return !!GC_ID && !!GC_KEY;
}

// ---------- Typen ----------
export type BankKonto = {
  id: string;
  provider: string;
  requisition_id: string | null;
  account_id: string | null;
  institution_id: string | null;
  iban: string | null;
  name: string | null;
  status: string; // neu | verbunden | abgelaufen | fehler
  consent_expires_at: string | null;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
};

export type BankTransaktion = {
  id: string;
  konto_id: string | null;
  tx_id: string | null;
  datum: string | null;
  betrag: number;
  waehrung: string | null;
  gegenname: string | null;
  verwendungszweck: string | null;
  richtung: string | null;
  klassifiziert_als: string | null;
  rechnung_id: string | null;
  ausgabe_id: string | null;
  raw?: unknown;
  created_at: string;
};

// ---------- Datenschicht ----------
const REST = (t: string) => `${URL}/rest/v1/${t}`;

export async function listKonten(): Promise<BankKonto[]> {
  if (!dbReady()) return [];
  try {
    const r = await fetch(`${REST("bank_konten")}?order=created_at.desc`, { headers: headers() });
    return r.ok ? ((await r.json()) as BankKonto[]) : [];
  } catch {
    return [];
  }
}

export async function getKontoById(id: string): Promise<BankKonto | null> {
  if (!dbReady() || !id) return null;
  try {
    const r = await fetch(`${REST("bank_konten")}?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    return ((await r.json()) as BankKonto[])[0] || null;
  } catch {
    return null;
  }
}

export async function getKontoByRequisition(reqId: string): Promise<BankKonto | null> {
  if (!dbReady() || !reqId) return null;
  try {
    const r = await fetch(`${REST("bank_konten")}?requisition_id=eq.${reqId}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    return ((await r.json()) as BankKonto[])[0] || null;
  } catch {
    return null;
  }
}

export async function insertKonto(fields: Partial<BankKonto>): Promise<BankKonto | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(REST("bank_konten"), { method: "POST", headers: headers({ Prefer: "return=representation" }), body: JSON.stringify(fields) });
    return r.ok ? ((await r.json()) as BankKonto[])[0] || null : null;
  } catch {
    return null;
  }
}

export async function updateKonto(id: string, fields: Partial<BankKonto>): Promise<BankKonto | null> {
  if (!dbReady()) return null;
  try {
    const r = await fetch(`${REST("bank_konten")}?id=eq.${id}`, { method: "PATCH", headers: headers({ Prefer: "return=representation" }), body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }) });
    return r.ok ? ((await r.json()) as BankKonto[])[0] || null : null;
  } catch {
    return null;
  }
}

export async function listTransaktionen(limit = 200): Promise<BankTransaktion[]> {
  if (!dbReady()) return [];
  try {
    const r = await fetch(`${REST("bank_transaktionen")}?order=datum.desc&limit=${limit}`, { headers: headers() });
    return r.ok ? ((await r.json()) as BankTransaktion[]) : [];
  } catch {
    return [];
  }
}

export async function updateTransaktion(id: string, fields: Partial<BankTransaktion>): Promise<boolean> {
  if (!dbReady()) return false;
  try {
    const r = await fetch(`${REST("bank_transaktionen")}?id=eq.${id}`, { method: "PATCH", headers: headers(), body: JSON.stringify(fields) });
    return r.ok;
  } catch {
    return false;
  }
}

/** Upsert über tx_id (Dedupe). Ignoriert bereits vorhandene Transaktionen. */
async function upsertTransaktion(fields: Partial<BankTransaktion>): Promise<void> {
  if (!dbReady()) return;
  try {
    await fetch(`${REST("bank_transaktionen")}?on_conflict=tx_id`, {
      method: "POST",
      headers: headers({ Prefer: "resolution=ignore-duplicates,return=minimal" }),
      body: JSON.stringify(fields),
    });
  } catch {
    /* ignore */
  }
}

// ---------- GoCardless-Client ----------
async function gcToken(): Promise<string | null> {
  if (!gcReady()) return null;
  try {
    const r = await fetch(`${GC_BASE}/token/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret_id: GC_ID, secret_key: GC_KEY }),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { access?: string };
    return data.access || null;
  } catch {
    return null;
  }
}

function gcHeaders(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json", accept: "application/json" };
}

/** Erstellt eine Requisition (Consent-Link). reference = bank_konten.id, redirect = Callback-URL. */
export async function createRequisition(institutionId: string, redirect: string, reference: string): Promise<{ id: string; link: string } | null> {
  const token = await gcToken();
  if (!token) return null;
  try {
    const r = await fetch(`${GC_BASE}/requisitions/`, {
      method: "POST",
      headers: gcHeaders(token),
      body: JSON.stringify({ redirect, institution_id: institutionId, reference, user_language: "DE" }),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { id: string; link: string };
    return { id: data.id, link: data.link };
  } catch {
    return null;
  }
}

export async function getRequisitionAccounts(requisitionId: string): Promise<string[]> {
  const token = await gcToken();
  if (!token) return [];
  try {
    const r = await fetch(`${GC_BASE}/requisitions/${requisitionId}/`, { headers: gcHeaders(token) });
    if (!r.ok) return [];
    const data = (await r.json()) as { accounts?: string[] };
    return data.accounts || [];
  } catch {
    return [];
  }
}

export async function getAccountDetails(accountId: string): Promise<{ iban?: string; name?: string } | null> {
  const token = await gcToken();
  if (!token) return null;
  try {
    const r = await fetch(`${GC_BASE}/accounts/${accountId}/details/`, { headers: gcHeaders(token) });
    if (!r.ok) return null;
    const data = (await r.json()) as { account?: { iban?: string; name?: string; ownerName?: string } };
    return { iban: data.account?.iban, name: data.account?.name || data.account?.ownerName };
  } catch {
    return null;
  }
}

type GcTx = {
  transactionId?: string;
  internalTransactionId?: string;
  bookingDate?: string;
  valueDate?: string;
  transactionAmount?: { amount?: string; currency?: string };
  creditorName?: string;
  debtorName?: string;
  remittanceInformationUnstructured?: string;
  remittanceInformationUnstructuredArray?: string[];
};

/** Holt Transaktionen vom GoCardless-Account und speichert neue (Dedupe via tx_id). */
export async function syncKonto(konto: BankKonto): Promise<{ neu: number; fehler?: string }> {
  if (!konto.account_id) return { neu: 0, fehler: "kein_account" };
  const token = await gcToken();
  if (!token) return { neu: 0, fehler: "kein_token" };
  try {
    const r = await fetch(`${GC_BASE}/accounts/${konto.account_id}/transactions/`, { headers: gcHeaders(token) });
    if (!r.ok) {
      await updateKonto(konto.id, { status: r.status === 401 ? "abgelaufen" : "fehler" });
      return { neu: 0, fehler: `gc_${r.status}` };
    }
    const data = (await r.json()) as { transactions?: { booked?: GcTx[] } };
    const booked = data.transactions?.booked || [];
    let neu = 0;
    for (const t of booked) {
      const betrag = Number(t.transactionAmount?.amount || 0);
      const txId = t.transactionId || t.internalTransactionId;
      if (!txId) continue;
      const zweck = t.remittanceInformationUnstructured || (t.remittanceInformationUnstructuredArray || []).join(" ") || null;
      await upsertTransaktion({
        konto_id: konto.id,
        tx_id: txId,
        datum: t.bookingDate || t.valueDate || null,
        betrag,
        waehrung: t.transactionAmount?.currency || "EUR",
        gegenname: betrag >= 0 ? t.debtorName || null : t.creditorName || null,
        verwendungszweck: zweck,
        richtung: betrag >= 0 ? "eingang" : "ausgang",
        klassifiziert_als: "offen",
        raw: t,
      });
      neu++;
    }
    await updateKonto(konto.id, { status: "verbunden", last_sync: new Date().toISOString() });
    return { neu };
  } catch {
    return { neu: 0, fehler: "exception" };
  }
}

/** Synchronisiert alle verbundenen Konten (für den Cron). */
export async function syncAlleKonten(): Promise<{ konten: number; neu: number }> {
  const konten = await listKonten();
  let neu = 0;
  let count = 0;
  for (const k of konten) {
    if (!k.account_id) continue;
    const res = await syncKonto(k);
    neu += res.neu;
    count++;
  }
  return { konten: count, neu };
}

export const N26_INSTITUTION_ID = "N26_NTSBDEB1";
