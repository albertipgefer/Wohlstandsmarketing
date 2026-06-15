/**
 * Fireflies-Call-Helfer (Baustein A — Auto-Call-Doku).
 *
 * Reine, key-freie Hilfsfunktionen: Call-Typ aus dem Titel ableiten und den
 * Interessenten (nicht-interner Teilnehmer) bestimmen. Die Call-Daten selbst
 * liefert ein lokaler `claude -p`-Job über den Fireflies-MCP (kein API-Key) und
 * schickt sie an /api/calls/ingest. Das Schreiben nach Close macht lib/close.ts.
 */

import type { CallType } from "@/lib/close";

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
  dateString?: string | null;
  meeting_link?: string | null;
  participants?: string[] | null;
  meeting_attendees?: FfAttendee[] | null;
  summary?: {
    short_summary?: string | null;
    keywords?: string[] | null;
    action_items?: string | null;
  } | null;
};

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
