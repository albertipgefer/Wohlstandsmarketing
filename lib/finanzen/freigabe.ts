/**
 * Telegram-Freigabe-Flow ("Human in the Loop"): jede ausgehende Mail
 * (Rechnung/Angebot/Mahnung) wird erst als Freigabe gespeichert und mit
 * Vorschau + Buttons an Albert geschickt. Erst "Genehmigen" verschickt sie.
 * "Anpassen" lässt ihn per Telegram-Text sagen, was zu ändern ist (KI baut die
 * Mail neu). Opt-in via FREIGABE_FLOW=on — sonst senden die Routen wie bisher.
 *
 * PostgREST-Muster wie lib/finanzen/ausgaben.ts; Tabelle public.finanzen_freigaben.
 */
import { sendFinanzenTelegramButtons, type InlineButton } from "@/lib/telegram";
import { sendMail } from "@/lib/angebot/email";
import { getRechnungById, updateRechnung } from "@/lib/finanzen/db";
import { getAngebotById, updateAngebot } from "@/lib/angebot/db";
import { renderDokumentPdf, rechnungToPdfDoc } from "@/lib/finanzen/pdf";

const URL = process.env.ANGEBOT_SUPABASE_URL;
const KEY = process.env.ANGEBOT_SUPABASE_SERVICE_KEY;
const REST = () => `${URL}/rest/v1/finanzen_freigaben`;

function headers(extra?: Record<string, string>) {
  return { apikey: KEY || "", Authorization: `Bearer ${KEY || ""}`, "Content-Type": "application/json", ...extra };
}

export function freigabeFlowAktiv(): boolean {
  return process.env.FREIGABE_FLOW === "on" && !!URL && !!KEY;
}

export type FreigabeTyp = "rechnung" | "angebot" | "mahnung" | "angebot_reminder";
export type Freigabe = {
  id: string;
  typ: FreigabeTyp;
  ziel_id: string | null;
  empfaenger: string | null;
  betreff: string;
  html: string;
  kontext: string | null;
  status: string;
  telegram_message_id: number | null;
  fehler: string | null;
};

export async function getFreigabe(id: string): Promise<Freigabe | null> {
  if (!URL || !KEY || !id) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Freigabe[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function updateFreigabe(id: string, fields: Partial<Freigabe>): Promise<Freigabe | null> {
  if (!URL || !KEY) return null;
  try {
    const r = await fetch(`${REST()}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Freigabe[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Findet die Freigabe, die gerade auf eine Anpassungs-Anweisung wartet (Single-User). */
export async function findFreigabeWartetAnpassung(): Promise<Freigabe | null> {
  if (!URL || !KEY) return null;
  try {
    const r = await fetch(`${REST()}?status=eq.anpassen_angefragt&order=updated_at.desc&limit=1`, { headers: headers() });
    if (!r.ok) return null;
    const rows = (await r.json()) as Freigabe[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

/** Setzt alle (anderen) offenen Anpassungs-Anfragen zurück auf "wartet",
 *  damit immer nur genau eine Freigabe auf eine Text-Anweisung wartet. */
export async function resetOffeneAnpassungen(): Promise<void> {
  if (!URL || !KEY) return;
  try {
    await fetch(`${REST()}?status=eq.anpassen_angefragt`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ status: "wartet", updated_at: new Date().toISOString() }),
    });
  } catch {
    /* ignore */
  }
}

/** Escaped Text fürs Telegram-HTML-Parsing (nur die kritischen Zeichen). */
function tgEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Grobe HTML→Text-Konvertierung für eine lesbare Inhalts-Vorschau in Telegram.
 * Entfernt Markup, dekodiert die häufigsten Entities, kürzt auf sinnvolle Länge.
 */
function htmlToPreview(html: string | null | undefined, max = 700): string {
  if (!html) return "";
  let t = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|tr|h1|h2|h3|li|div|table)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (t.length > max) t = t.slice(0, max).trimEnd() + " …";
  return t;
}

function vorschau(f: { typ: FreigabeTyp; empfaenger: string | null; betreff: string; html?: string | null }): string {
  const label =
    f.typ === "rechnung"
      ? "📄 Rechnung"
      : f.typ === "angebot"
        ? "📝 Angebot"
        : f.typ === "angebot_reminder"
          ? "🔁 Angebots-Erinnerung"
          : "🔔 Mahnung";
  const body = htmlToPreview(f.html);
  return (
    `<b>Freigabe nötig — ${label}</b>\n` +
    `An: ${tgEscape(f.empfaenger || "—")}\n` +
    `Betreff: ${tgEscape(f.betreff)}\n` +
    (body ? `\n<b>Vorschau der Mail:</b>\n<i>${tgEscape(body)}</i>\n` : "") +
    `\nGenehmigen verschickt die Mail an den Kunden. Anpassen = du schreibst mir, was zu ändern ist.`
  );
}

function buttons(id: string): InlineButton[][] {
  return [
    [
      { text: "✅ Genehmigen & senden", callback_data: `fg:ok:${id}` },
      { text: "✏️ Anpassen", callback_data: `fg:edit:${id}` },
    ],
    [{ text: "❌ Verwerfen", callback_data: `fg:no:${id}` }],
  ];
}

export function freigabeButtons(id: string): InlineButton[][] {
  return buttons(id);
}

/** Vorschau-Text nach einer KI-Anpassung. */
export function vorschauText(f: Freigabe): string {
  return vorschau(f);
}

/**
 * Verschickt eine genehmigte Freigabe per Mail. Bei Rechnungen wird das PDF
 * frisch aus der Rechnung erzeugt und angehängt.
 */
export async function sendeFreigabe(f: Freigabe): Promise<{ ok: boolean; error?: string }> {
  if (!f.empfaenger) return { ok: false, error: "keine Empfänger-Adresse" };

  const attachments: { filename: string; content: string }[] = [];
  if (f.typ === "rechnung" && f.ziel_id) {
    try {
      const r = await getRechnungById(f.ziel_id);
      if (r) {
        const pdf = await renderDokumentPdf(rechnungToPdfDoc(r));
        attachments.push({ filename: `Rechnung-${r.nummer || r.id}.pdf`, content: pdf.toString("base64") });
      }
    } catch {
      /* Anhang optional — Online-Link in der Mail bleibt */
    }
  }

  const res = await sendMail({ to: f.empfaenger, subject: f.betreff, html: f.html, attachments: attachments.length ? attachments : undefined });

  // Status nachziehen (war im Freigabe-Modus noch Entwurf bis zur Genehmigung).
  if (res.ok && f.ziel_id) {
    try {
      if (f.typ === "rechnung") {
        const r = await getRechnungById(f.ziel_id);
        if (r && r.status === "entwurf") {
          await updateRechnung(f.ziel_id, { status: "offen", sent_at: new Date().toISOString() });
        }
      } else if (f.typ === "angebot") {
        const a = await getAngebotById(f.ziel_id);
        if (a && (a.status === "entwurf" || !a.sent_at)) {
          await updateAngebot(f.ziel_id, { status: "gesendet", sent_at: new Date().toISOString() });
        }
      }
    } catch {
      /* ignore */
    }
  }

  // Angebots-Erinnerung: kein status/sent_at-Update (würde die Tage-Berechnung
  // brechen) — stattdessen die Erinnerungsstufe am Angebot als erledigt buchen.
  if (res.ok && f.typ === "angebot_reminder") {
    await finalisiereReminderFreigabe(f, true);
  }

  return res;
}

/**
 * Verbucht das Ergebnis einer Angebots-Erinnerungs-Freigabe am Angebot:
 * die offene Stufe (reminder_pending) gilt als erledigt — egal ob gesendet
 * oder übersprungen — und die Pending-Sperre fällt weg, sodass der Cron die
 * nächste Stufe (oder den Stopp nach Stufe 2) erkennt. No-op für andere Typen.
 */
export async function finalisiereReminderFreigabe(f: Freigabe, gesendet: boolean): Promise<void> {
  if (f.typ !== "angebot_reminder" || !f.ziel_id) return;
  try {
    const a = await getAngebotById(f.ziel_id);
    if (!a || a.reminder_pending == null) return;
    await updateAngebot(f.ziel_id, {
      reminder_stufe: a.reminder_pending,
      reminder_pending: null,
      ...(gesendet ? { last_reminder_at: new Date().toISOString() } : {}),
    });
  } catch {
    /* ignore */
  }
}

const KI_MODEL = process.env.FINANZEN_KI_MODEL || "claude-sonnet-4-6";
const ANPASS_TOOL = {
  name: "mail_angepasst",
  description: "Die überarbeitete E-Mail.",
  input_schema: {
    type: "object",
    properties: {
      betreff: { type: "string", description: "Neuer Betreff (unverändert lassen, wenn nicht betroffen)." },
      html: { type: "string", description: "Das vollständige, überarbeitete HTML der Mail. Behalte Layout/Styling bei, ändere nur den vom Nutzer gewünschten Inhalt." },
    },
    required: ["betreff", "html"],
  },
} as const;

/** Passt Betreff + HTML einer Freigabe per KI gemäß Albert-Anweisung an. */
export async function passeMailAn(f: Freigabe, anweisung: string): Promise<{ betreff: string; html: string } | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: KI_MODEL,
        max_tokens: 4096,
        tools: [ANPASS_TOOL],
        tool_choice: { type: "tool", name: "mail_angepasst" },
        messages: [
          {
            role: "user",
            content:
              `Hier ist eine ausgehende E-Mail (Betreff + HTML). Passe sie gemäß meiner Anweisung an und gib das vollständige Ergebnis übers Tool zurück. Behalte das HTML-Layout und Styling exakt bei, ändere nur den inhaltlich gewünschten Teil. Deutsch, echte Umlaute.\n\n` +
              `AKTUELLER BETREFF:\n${f.betreff}\n\nAKTUELLES HTML:\n${f.html}\n\nMEINE ANWEISUNG:\n${anweisung}`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: { type: string; name?: string; input?: { betreff?: string; html?: string } }[] };
    const tool = (data.content || []).find((b) => b.type === "tool_use" && b.name === "mail_angepasst");
    const inp = tool?.input;
    if (!inp?.html) return null;
    return { betreff: inp.betreff?.trim() || f.betreff, html: inp.html };
  } catch {
    return null;
  }
}

/**
 * Legt eine Freigabe an und schickt die Vorschau mit Buttons an Telegram.
 * Gibt true zurück, wenn die Freigabe-Anfrage rausging.
 */
export async function createFreigabe(input: {
  typ: FreigabeTyp;
  zielId: string | null;
  empfaenger: string | null;
  betreff: string;
  html: string;
  kontext?: string;
}): Promise<boolean> {
  if (!URL || !KEY) return false;
  try {
    // Idempotenz: existiert schon eine offene Freigabe für dieses Ziel, nicht
    // erneut anlegen (verhindert Mehrfach-Senden → mehrere offene Freigaben).
    if (input.zielId) {
      const ex = await fetch(
        `${REST()}?ziel_id=eq.${encodeURIComponent(input.zielId)}&status=in.(wartet,anpassen_angefragt)&limit=1`,
        { headers: headers() },
      );
      if (ex.ok) {
        const offen = (await ex.json()) as Freigabe[];
        if (offen.length) return true; // bereits zur Freigabe vorgelegt
      }
    }
    const r = await fetch(REST(), {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({
        typ: input.typ,
        ziel_id: input.zielId,
        empfaenger: input.empfaenger,
        betreff: input.betreff,
        html: input.html,
        kontext: input.kontext || null,
        status: "wartet",
      }),
    });
    if (!r.ok) return false;
    const rows = (await r.json()) as Freigabe[];
    const fg = rows[0];
    if (!fg) return false;

    const msgId = await sendFinanzenTelegramButtons(vorschau(fg), buttons(fg.id));
    if (msgId) await updateFreigabe(fg.id, { telegram_message_id: msgId });
    return true;
  } catch {
    return false;
  }
}
