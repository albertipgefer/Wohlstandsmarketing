/**
 * Fireflies.ai — minimaler GraphQL-Client für Baustein A (Auto-Call-Doku).
 *
 * Zweck: Nach einem Setting-/Closing-/Folgetermin die Meeting-Details holen,
 * den Call-Typ aus dem Titel ableiten und den Interessenten (nicht-interner
 * Teilnehmer) bestimmen. Die eigentliche Close-Notiz schreibt lib/close.ts.
 *
 * Auth: Bearer FIREFLIES_API_KEY (Fireflies Pro/Business — API-Zugriff nötig).
 *
 * Bewusst schlank: nur fetch, kein SDK. Fehler werfen NIE nach außen.
 */

import type { CallType } from "@/lib/close";

const FIREFLIES_GRAPHQL = "https://api.fireflies.ai/graphql";

// Interne Team-Mails (= nie der Interessent). Default = Albert (beide Konten,
// da Fireflies/Meet teils über das Gmail-Konto läuft). Via ENV überschreibbar.
const DEFAULT_INTERNAL = ["info@wohlstandsmarketing.de", "albertipgefer9@gmail.com"];

function internalEmails(): Set<string> {
  const raw = process.env.WSM_INTERNAL_EMAILS;
  const list = raw
    ? raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
    : DEFAULT_INTERNAL;
  return new Set(list);
}

// Titel-Substring → Call-Typ. Substring (nicht startsWith), da Fireflies teils
// "Google Meet – " voranstellt.
const TITLE_RULES: { needle: string; type: CallType }[] = [
  { needle: "Erstgespräch mit Wohlstandsmarketing", type: "erstgespraech" },
  { needle: "Strategiegespräch mit Wohlstandsmarketing", type: "strategiegespraech" },
  { needle: "Folgetermin mit Wohlstandsmarketing", type: "folgetermin" },
];

/** Leitet den Call-Typ aus dem Meeting-Titel ab. null = kein relevanter Call. */
export function classifyCallType(title: string | null | undefined): CallType | null {
  if (!title) return null;
  for (const r of TITLE_RULES) if (title.includes(r.needle)) return r.type;
  return null;
}

export type FfAttendee = { displayName?: string | null; email?: string | null };

export type FfTranscript = {
  id: string;
  title: string | null;
  dateString: string | null;
  meeting_link?: string | null;
  participants?: string[] | null;
  meeting_attendees?: FfAttendee[] | null;
  summary?: {
    short_summary?: string | null;
    keywords?: string[] | null;
    action_items?: string | null;
  } | null;
};

/** Holt ein Transcript per Meeting-/Transcript-ID. null bei Fehler/fehlendem Key. */
export async function getTranscriptById(id: string): Promise<FfTranscript | null> {
  const key = process.env.FIREFLIES_API_KEY;
  if (!key) return null;
  const query = `query Transcript($id: String!) {
    transcript(id: $id) {
      id
      title
      dateString
      meeting_link
      participants
      meeting_attendees { displayName email }
      summary { short_summary keywords action_items }
    }
  }`;
  try {
    const r = await fetch(FIREFLIES_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { id } }),
    });
    if (!r.ok) return null;
    const json = (await r.json()) as { data?: { transcript?: FfTranscript } };
    return json.data?.transcript ?? null;
  } catch {
    return null;
  }
}

/** true, wenn eine echte Fireflies-Zusammenfassung vorliegt (sonst Call überspringen). */
export function hasProcessedSummary(t: FfTranscript): boolean {
  return Boolean(t.summary && (t.summary.short_summary || "").trim());
}

/**
 * Bestimmt den Interessenten (erster nicht-interner Teilnehmer).
 * Nutzt meeting_attendees (mit Namen), Fallback participants.
 */
export function extractProspect(
  t: FfTranscript,
): { email: string; name?: string } | null {
  const internal = internalEmails();
  const fromAttendees = (t.meeting_attendees || [])
    .filter((a) => a.email && !internal.has(a.email.toLowerCase()))
    .map((a) => ({ email: a.email as string, name: a.displayName || undefined }));
  if (fromAttendees.length) return fromAttendees[0];

  const fromParticipants = (t.participants || [])
    .filter((e) => e && !internal.has(e.toLowerCase()))
    .map((email) => ({ email }));
  return fromParticipants[0] || null;
}
