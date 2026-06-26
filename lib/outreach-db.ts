/**
 * Cold-Outreach — Supabase-Anbindung (PostgREST über fetch, kein SDK).
 *
 * Bewusst schlank im Stil von lib/close.ts: nur fetch, keine Abhängigkeit.
 * Greift auf das SEPARATE Outreach-Projekt zu (NICHT die Kunden-Portal-DB).
 *
 * Required ENV:
 *   SUPABASE_URL          — https://<ref>.supabase.co
 *   SUPABASE_SERVICE_KEY  — service_role-Key (nur serverseitig!)
 */

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;

function headers(extra?: Record<string, string>) {
  return {
    apikey: KEY || "",
    Authorization: `Bearer ${KEY || ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function ready(): boolean {
  return !!URL && !!KEY;
}

export type ProspectStatus =
  | "active" | "paused" | "replied" | "converted"
  | "bounced" | "unsubscribed" | "exhausted" | "suppressed";

export type EventType =
  | "sent" | "delivered" | "bounce" | "click"
  | "reply" | "conversion" | "unsubscribe" | "open";

export type Prospect = {
  id: string;
  email: string;
  company?: string | null;
  city?: string | null;
  salutation?: string | null;
  phone?: string | null;
  ab_arm?: "reply" | "link";
  sequence_step: number;
  status: ProspectStatus;
  mail1_subject?: string | null;
  mail1_body?: string | null;
  mail2_body?: string | null;
  mail3_body?: string | null;
  mail4_body?: string | null;
  mail5_body?: string | null;
  bucket?: string | null;
  signal_fact?: string | null;
  strength?: string | null;
  enrich_status?: string | null;
  suppressed_reason?: string | null;
  thread_message_id?: string | null;
  sent_from_inbox?: string | null;
  next_send_at?: string | null;
  [k: string]: unknown;
};

export type PendingReply = {
  id: string;
  prospect_id: string | null;
  reply_text?: string | null;
  draft_subject?: string | null;
  draft_body?: string | null;
  status: "awaiting" | "revising" | "approved" | "sent" | "rejected";
  revision_notes?: string | null;
  telegram_message_id?: number | null;
  thread_message_id?: string | null;
  send_at?: string | null;
};

/** Prospect per E-Mail holen (für Conversion-Match / Reply-Match). Null bei Fehler/kein Treffer. */
export async function getProspectByEmail(email: string): Promise<Prospect | null> {
  if (!ready()) return null;
  try {
    const q = `email=eq.${encodeURIComponent(email.toLowerCase().trim())}&limit=1`;
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?${q}`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Prospect[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Prospect per ID holen (für Open-Pixel: ab_arm + sequence_step). Null bei Fehler. */
export async function getProspectById(id: string): Promise<Prospect | null> {
  if (!ready()) return null;
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Prospect[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Eindeutige Öffnungen (distinct Prospect) gesamt + je A/B-Arm — für Dashboard/Report.
 *  Zählt pro Prospect nur einmal (mehrfaches Pixel-Laden bläht nicht auf). */
export async function openStats(): Promise<{ unique: number; byArm: Record<string, number> }> {
  if (!ready()) return { unique: 0, byArm: { link: 0, reply: 0 } };
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_events?select=prospect_id,ab_arm&type=eq.open`, { headers: headers() });
    if (!r.ok) return { unique: 0, byArm: { link: 0, reply: 0 } };
    const rows = (await r.json()) as { prospect_id: string | null; ab_arm: string | null }[];
    const seen = new Set<string>();
    const armSeen: Record<string, Set<string>> = { link: new Set(), reply: new Set() };
    for (const row of rows) {
      if (!row.prospect_id) continue;
      seen.add(row.prospect_id);
      const arm = row.ab_arm === "reply" ? "reply" : row.ab_arm === "link" ? "link" : null;
      if (arm) armSeen[arm].add(row.prospect_id);
    }
    return { unique: seen.size, byArm: { link: armSeen.link.size, reply: armSeen.reply.size } };
  } catch {
    return { unique: 0, byArm: { link: 0, reply: 0 } };
  }
}

/** Status (und optional weitere Felder) eines Prospects setzen. Gibt true bei Erfolg. */
export async function updateProspect(
  id: string,
  fields: Partial<Prospect>,
): Promise<boolean> {
  if (!ready()) return false;
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?id=eq.${id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(fields),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/** Setzt den Status anhand der E-Mail (Convenience für Conversion/Reply/Bounce). */
export async function setStatusByEmail(
  email: string,
  status: ProspectStatus,
): Promise<string | null> {
  const p = await getProspectByEmail(email);
  if (!p) return null;
  const ok = await updateProspect(p.id, { status });
  return ok ? p.id : null;
}

/** Ereignis ins KPI-Log schreiben (sent/click/reply/conversion/…). Wirft nie. */
export async function logEvent(
  prospectId: string | null,
  type: EventType,
  data?: { sequence_step?: number; inbox?: string; ab_arm?: string; meta?: unknown },
): Promise<void> {
  if (!ready()) return;
  try {
    await fetch(`${URL}/rest/v1/outreach_events`, {
      method: "POST",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify({
        prospect_id: prospectId,
        type,
        sequence_step: data?.sequence_step ?? null,
        inbox: data?.inbox ?? null,
        ab_arm: data?.ab_arm ?? null,
        meta: data?.meta ?? {},
      }),
    });
  } catch {
    /* nie blockierend */
  }
}

/** Fällige, aktive Prospects für den Versand (next_send_at <= jetzt, status active/paused). */
export async function getDueProspects(limit = 50): Promise<Prospect[]> {
  if (!ready()) return [];
  try {
    const nowIso = new Date().toISOString();
    const q =
      `status=in.(active,paused)&hook_status=eq.ready` +
      `&or=(next_send_at.is.null,next_send_at.lte.${nowIso})` +
      // nullslast: fällige Follow-ups (next_send_at gesetzt, älteste zuerst) vor
      // neuen Erstkontakten (null) → Sequenz bleibt pünktlich, Rest-Cap = neue Leads.
      `&order=next_send_at.asc.nullslast&limit=${limit}`;
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?${q}`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as Prospect[];
  } catch {
    return [];
  }
}

/** Aggregierte KPIs fürs Dashboard (Event-Zähler je Typ, optional je A/B-Arm). */
export async function eventCounts(): Promise<{
  byType: Record<string, number>;
  byArm: Record<string, Record<string, number>>;
}> {
  const empty = { byType: {}, byArm: {} };
  if (!ready()) return empty;
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_events?select=type,ab_arm`, {
      headers: headers(),
    });
    if (!r.ok) return empty;
    const rows = (await r.json()) as { type: string; ab_arm: string | null }[];
    const byType: Record<string, number> = {};
    const byArm: Record<string, Record<string, number>> = { link: {}, reply: {} };
    for (const row of rows) {
      byType[row.type] = (byType[row.type] || 0) + 1;
      const arm = row.ab_arm === "reply" ? "reply" : row.ab_arm === "link" ? "link" : null;
      if (arm) byArm[arm][row.type] = (byArm[arm][row.type] || 0) + 1;
    }
    return { byType, byArm };
  } catch {
    return empty;
  }
}

/** Event-Zähler je Typ (und A/B-Arm) seit einem Zeitpunkt (ISO) — für Digests/Reports. */
export async function eventCountsSince(sinceIso: string): Promise<{
  byType: Record<string, number>;
  byArm: Record<string, Record<string, number>>;
  total: number;
}> {
  const empty = { byType: {}, byArm: { link: {}, reply: {} }, total: 0 };
  if (!ready()) return empty;
  try {
    const q = `select=type,ab_arm&created_at=gte.${encodeURIComponent(sinceIso)}`;
    const r = await fetch(`${URL}/rest/v1/outreach_events?${q}`, { headers: headers() });
    if (!r.ok) return empty;
    const rows = (await r.json()) as { type: string; ab_arm: string | null }[];
    const byType: Record<string, number> = {};
    const byArm: Record<string, Record<string, number>> = { link: {}, reply: {} };
    for (const row of rows) {
      byType[row.type] = (byType[row.type] || 0) + 1;
      const arm = row.ab_arm === "reply" ? "reply" : row.ab_arm === "link" ? "link" : null;
      if (arm) byArm[arm][row.type] = (byArm[arm][row.type] || 0) + 1;
    }
    return { byType, byArm, total: rows.length };
  } catch {
    return empty;
  }
}

/** Heute bereits versendete Mails je Postfach (für das Tageslimit der Rampe). */
export async function sentTodayByInbox(): Promise<Record<string, number>> {
  if (!ready()) return {};
  try {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const q = `select=inbox&type=eq.sent&created_at=gte.${midnight.toISOString()}`;
    const r = await fetch(`${URL}/rest/v1/outreach_events?${q}`, { headers: headers() });
    if (!r.ok) return {};
    const rows = (await r.json()) as { inbox: string | null }[];
    const counts: Record<string, number> = {};
    for (const row of rows) if (row.inbox) counts[row.inbox] = (counts[row.inbox] || 0) + 1;
    return counts;
  } catch {
    return {};
  }
}

/**
 * Bounce-Quote der letzten N Events (für den Kill-Switch).
 * Gibt 0 zurück, solange die Stichprobe zu klein ist (minSample) — verhindert,
 * dass ein einzelner Bounce in der Warm-up-Phase den Versand fälschlich stoppt.
 */
export async function recentBounceRate(window = 200, minSample = 30): Promise<number> {
  if (!ready()) return 0;
  try {
    const q = `select=type&type=in.(sent,bounce)&order=created_at.desc&limit=${window}`;
    const r = await fetch(`${URL}/rest/v1/outreach_events?${q}`, { headers: headers() });
    if (!r.ok) return 0;
    const rows = (await r.json()) as { type: string }[];
    const sent = rows.filter((x) => x.type === "sent").length;
    const bounce = rows.filter((x) => x.type === "bounce").length;
    const total = sent + bounce;
    if (total < minSample) return 0; // zu wenig Daten → Kill-Switch ruht
    return bounce / total;
  } catch {
    return 0;
  }
}

/** Prospect-Zähler je Status (active/converted/replied/…) fürs Dashboard. */
export async function statusCounts(): Promise<Record<string, number>> {
  if (!ready()) return {};
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?select=status`, {
      headers: headers(),
    });
    if (!r.ok) return {};
    const rows = (await r.json()) as { status: string }[];
    const counts: Record<string, number> = {};
    for (const row of rows) counts[row.status] = (counts[row.status] || 0) + 1;
    return counts;
  } catch {
    return {};
  }
}

/* ───────────────────────── Dashboard v3 (vertieft) ───────────────────────── */

/** Letzte Antworten mit Lead-Kontext (für die Antworten-Liste im Dashboard). */
export async function getRepliesWithDetails(limit = 25): Promise<
  { created_at: string; meta: unknown; company: string | null; email: string | null; salutation: string | null; phone: string | null; bucket: string | null }[]
> {
  if (!ready()) return [];
  try {
    const q =
      `select=created_at,meta,outreach_prospects(company,email,salutation,phone,bucket)` +
      `&type=eq.reply&order=created_at.desc&limit=${limit}`;
    const r = await fetch(`${URL}/rest/v1/outreach_events?${q}`, { headers: headers() });
    if (!r.ok) return [];
    const rows = (await r.json()) as { created_at: string; meta: unknown; outreach_prospects: Record<string, string | null> | null }[];
    return rows.map((row) => ({
      created_at: row.created_at, meta: row.meta,
      company: row.outreach_prospects?.company ?? null,
      email: row.outreach_prospects?.email ?? null,
      salutation: row.outreach_prospects?.salutation ?? null,
      phone: row.outreach_prospects?.phone ?? null,
      bucket: row.outreach_prospects?.bucket ?? null,
    }));
  } catch {
    return [];
  }
}

/** Events je Tag (Versand/Antworten/Conversions) für den Zeitverlauf. */
export async function eventsByDay(days = 30): Promise<Record<string, Record<string, number>>> {
  if (!ready()) return {};
  try {
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const q = `select=type,created_at&created_at=gte.${since}&order=created_at.asc`;
    const r = await fetch(`${URL}/rest/v1/outreach_events?${q}`, { headers: headers() });
    if (!r.ok) return {};
    const rows = (await r.json()) as { type: string; created_at: string }[];
    const out: Record<string, Record<string, number>> = {};
    for (const row of rows) {
      const day = row.created_at.slice(0, 10);
      (out[day] ??= {})[row.type] = (out[day][row.type] || 0) + 1;
    }
    return out;
  } catch {
    return {};
  }
}

/** Prospects je Bucket mit Status (zeigt, welcher Befund antwortet/konvertiert). */
export async function bucketBreakdown(): Promise<Record<string, { total: number; replied: number; converted: number }>> {
  if (!ready()) return {};
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?select=bucket,status`, { headers: headers() });
    if (!r.ok) return {};
    const rows = (await r.json()) as { bucket: string | null; status: string }[];
    const out: Record<string, { total: number; replied: number; converted: number }> = {};
    for (const row of rows) {
      const b = row.bucket || "—";
      const e = (out[b] ??= { total: 0, replied: 0, converted: 0 });
      e.total++;
      if (row.status === "replied") e.replied++;
      if (row.status === "converted") e.converted++;
    }
    return out;
  } catch {
    return {};
  }
}

/** Anreicherungs-Status der Leads (wie viele auf v3-Copy umgestellt). */
export async function enrichStatusCounts(): Promise<Record<string, number>> {
  if (!ready()) return {};
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_prospects?select=enrich_status`, { headers: headers() });
    if (!r.ok) return {};
    const rows = (await r.json()) as { enrich_status: string | null }[];
    const counts: Record<string, number> = {};
    for (const row of rows) { const k = row.enrich_status || "—"; counts[k] = (counts[k] || 0) + 1; }
    return counts;
  } catch {
    return {};
  }
}

/* ─────────────────── Pending Replies (Befund-Freigabe-Loop) ─────────────────── */

export async function insertPendingReply(p: Partial<PendingReply>): Promise<string | null> {
  if (!ready()) return null;
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_pending_replies`, {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ status: "awaiting", ...p }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as PendingReply[];
    return rows[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function getPendingReply(id: string): Promise<PendingReply | null> {
  if (!ready()) return null;
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_pending_replies?id=eq.${id}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    return ((await r.json()) as PendingReply[])[0] || null;
  } catch {
    return null;
  }
}

/** Jüngsten Entwurf in einem Status holen (für freie Textnachricht = Anpassungswunsch). */
export async function getLatestPendingByStatus(status: PendingReply["status"]): Promise<PendingReply | null> {
  if (!ready()) return null;
  try {
    const q = `status=eq.${status}&order=created_at.desc&limit=1`;
    const r = await fetch(`${URL}/rest/v1/outreach_pending_replies?${q}`, { headers: headers() });
    if (!r.ok) return null;
    return ((await r.json()) as PendingReply[])[0] || null;
  } catch {
    return null;
  }
}

export async function updatePendingReply(id: string, fields: Partial<PendingReply>): Promise<boolean> {
  if (!ready()) return false;
  try {
    const r = await fetch(`${URL}/rest/v1/outreach_pending_replies?id=eq.${id}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/** Genehmigte Entwürfe, deren Sendezeit erreicht ist (für den Sender). */
export async function getApprovedDuePending(): Promise<PendingReply[]> {
  if (!ready()) return [];
  try {
    const nowIso = new Date().toISOString();
    const q = `status=eq.approved&send_at=lte.${nowIso}&order=send_at.asc&limit=10`;
    const r = await fetch(`${URL}/rest/v1/outreach_pending_replies?${q}`, { headers: headers() });
    if (!r.ok) return [];
    return (await r.json()) as PendingReply[];
  } catch {
    return [];
  }
}
