/**
 * Geteilte Postfach-Logik für den Cold-Outreach-Versand.
 *
 * Kern: das Tageslimit eines Postfachs ist NICHT statisch, sondern hängt vom
 * Postfach-Alter ab (Warm-up). Neue Postfächer fangen klein an und rampen
 * automatisch hoch, damit die Domain-Reputation nicht verbrennt — ohne dass
 * jemand manuell eingreifen muss.
 */

export type Inbox = {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  /** Obergrenze, sobald das Postfach voll eingelaufen ist. Default 15. */
  dailyCap?: number;
  /** ISO-Datum, ab dem das Postfach warmläuft. Fehlt es, gilt das Postfach als voll warm. */
  warmupStart?: string;
};

/** Warm-up-Stufen: < untilDay Tage alt → cap Mails/Tag. Ab der letzten Stufe gilt FULL_CAP. */
const RAMP: { untilDay: number; cap: number }[] = [
  { untilDay: 7, cap: 5 },   // Woche 1 (Tag 0-6)
  { untilDay: 14, cap: 8 },  // Woche 2 (Tag 7-13)
  { untilDay: 21, cap: 10 }, // Woche 3 (Tag 14-20)
];
const FULL_CAP = 15; // ab Woche 4 (Tag 21+)

export function loadInboxes(): Inbox[] {
  try {
    const arr = JSON.parse(process.env.OUTBOUND_INBOXES || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/**
 * Effektives Tageslimit eines Postfachs unter Berücksichtigung des Warm-ups.
 * Ohne warmupStart: voll warm → dailyCap (Default 15).
 * Mit warmupStart: Ramp 5 → 8 → 10 → 15, jeweils gedeckelt durch dailyCap (falls gesetzt).
 */
export function effectiveCap(inbox: Inbox, now: Date = new Date()): number {
  const ceil = inbox.dailyCap ?? FULL_CAP;
  if (!inbox.warmupStart) return ceil;
  const start = Date.parse(inbox.warmupStart);
  if (Number.isNaN(start)) return ceil;
  const ageDays = Math.floor((now.getTime() - start) / 86_400_000);
  let ramp = FULL_CAP;
  for (const step of RAMP) {
    if (ageDays < step.untilDay) {
      ramp = step.cap;
      break;
    }
  }
  return Math.min(ramp, ceil);
}
