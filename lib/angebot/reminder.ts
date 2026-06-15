/**
 * Auto-Follow-up für nicht angenommene Angebote (läuft im täglichen Finanz-Cron).
 *
 * Timing ist an das ABLAUFDATUM gekoppelt (nicht an den Versand), damit es zur
 * jeweiligen Laufzeit passt und nie aufdringlich wirkt:
 *   • Ablauf-Erinnerung  — 1 Tag vor Ablauf ("läuft bald aus"), der Hauptnudge.
 *   • Frühe Erinnerung   — nur bei Laufzeit ≥ 6 Tagen, etwa zur Hälfte, sanft.
 * Sehr kurze Angebote (Laufzeit ≤ 2 Tage) bekommen bewusst KEINE Auto-Mail —
 * die treibt Albert selbst/live voran. Max. 2 Erinnerungen, Stopp bei Annahme,
 * nichts nach Ablauf.
 *
 * Jede Erinnerung wird nur als Telegram-Freigabe vorgelegt; die Kundenmail geht
 * erst auf Alberts "Senden"-Klick raus (Freigabe-Flow, lib/finanzen/freigabe.ts).
 *
 * Stufen-State am Angebot:
 *   reminder_stufe   — höchste erledigte Stufe (0 | 1 = früh | 2 = ablauf/terminal)
 *   reminder_pending — Stufe, die gerade zur Freigabe liegt (Sperre gegen Re-Ping)
 */
import { listAngebote, updateAngebot, type Angebot } from "@/lib/angebot/db";
import { reminderEmailHtml, publicLink } from "@/lib/angebot/email";
import { createFreigabe } from "@/lib/finanzen/freigabe";

const TAG = 24 * 60 * 60 * 1000;

/** Kalendertage zwischen zwei Datumsangaben (von → bis), Eingabe beliebig parsebar. */
function kalenderTage(von: string, bis: string): number | null {
  const a = new Date(von.slice(0, 10) + "T00:00:00Z").getTime();
  const b = new Date(bis.slice(0, 10) + "T00:00:00Z").getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / TAG);
}

type Erinnerung = { art: "frueh" | "ablauf"; stufe: 1 | 2 };

/** Nächste fällige Erinnerung für ein Angebot — oder null. */
function naechsteErinnerung(a: Angebot, heute: string): Erinnerung | null {
  if (a.status !== "gesendet" && a.status !== "angesehen") return null; // nicht angenommen/abgelehnt/entwurf
  if (!a.sent_at || !a.gueltig_bis) return null; // ohne Ablaufdatum keine Erinnerung
  if (a.reminder_pending != null) return null; // wartet schon auf Freigabe → kein Re-Ping
  if ((a.reminder_stufe || 0) >= 2) return null; // beide Stufen verbraucht
  if (a.gueltig_bis < heute) return null; // abgelaufen → nichts mehr

  const laufzeit = kalenderTage(a.sent_at, a.gueltig_bis);
  const alterTage = kalenderTage(a.sent_at, heute);
  const restTage = kalenderTage(heute, a.gueltig_bis);
  if (laufzeit == null || alterTage == null || restTage == null) return null;
  if (laufzeit <= 2) return null; // sehr kurze Angebote: keine Auto-Mail

  // Ablauf-Erinnerung: ~1 Tag vor Ablauf, aber nie am Versandtag.
  if (restTage <= 1 && alterTage >= 1) return { art: "ablauf", stufe: 2 };

  // Frühe Erinnerung: nur bei längerer Laufzeit, etwa zur Hälfte, noch ≥ 2 Tage Rest.
  if ((a.reminder_stufe || 0) === 0 && laufzeit >= 6 && restTage >= 2) {
    if (alterTage >= Math.round(laufzeit / 2)) return { art: "frueh", stufe: 1 };
  }
  return null;
}

/**
 * Legt für alle fälligen Angebote eine Erinnerungs-Freigabe an und setzt
 * reminder_pending. Verschickt KEINE Kundenmail (das macht erst die Freigabe).
 */
export async function verarbeiteReminderLauf(
  now: number,
): Promise<{ angefragt: number; fehler: string[] }> {
  const fehler: string[] = [];
  let angefragt = 0;
  const heute = new Date(now).toISOString().slice(0, 10);
  const angebote = await listAngebote(1000);

  for (const a of angebote) {
    if (angefragt >= 25) break; // Sicherung gegen Rückstau
    const e = naechsteErinnerung(a, heute);
    if (!e) continue;
    if (!a.kunde_email || !a.public_token) continue;

    const betreff =
      e.art === "frueh"
        ? `Kurze Erinnerung an Ihr Angebot${a.nummer ? ` — ${a.nummer}` : ""}`
        : `Ihr Angebot${a.nummer ? ` ${a.nummer}` : ""} — läuft bald aus`;
    const html = reminderEmailHtml(a, publicLink(a.public_token), e.stufe);

    const angelegt = await createFreigabe({
      typ: "angebot_reminder",
      zielId: a.id,
      empfaenger: a.kunde_email,
      betreff,
      html,
      kontext: `reminder:${e.art}`,
    });
    if (!angelegt) {
      fehler.push(`Angebot ${a.nummer || a.id}: Freigabe konnte nicht angelegt werden`);
      continue;
    }
    const u = await updateAngebot(a.id, { reminder_pending: e.stufe });
    if (u) angefragt++;
    else fehler.push(`Angebot ${a.nummer || a.id}: reminder_pending nicht gesetzt`);
  }

  return { angefragt, fehler };
}
