/**
 * Telegram-Freigabe-Flow ("Human in the Loop"): jede ausgehende Mail
 * (Rechnung/Angebot/Mahnung) wird erst als Freigabe gespeichert und mit
 * Vorschau + Buttons an Albert geschickt. Erst "Genehmigen" verschickt sie.
 * "Anpassen" lässt ihn per Telegram-Text sagen, was zu ändern ist (KI baut die
 * Mail neu). Opt-in via FREIGABE_FLOW=on — sonst senden die Routen wie bisher.
 *
 * PostgREST-Muster wie lib/finanzen/ausgaben.ts; Tabelle public.finanzen_freigaben.
 */
import { sendTelegramButtons, type InlineButton } from "@/lib/telegram";
import { sendMail } from "@/lib/angebot/email";
import { getRechnungById, updateRechnung } from "@/lib/finanzen/db";
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

export type FreigabeTyp = "rechnung" | "angebot" | "mahnung";
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
    const r = await fetch(`${REST()}?id=eq.${id}&limit=1`, { headers: headers() });
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
    const r = await fetch(`${REST()}?id=eq.${id}`, {
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

function vorschau(f: { typ: FreigabeTyp; empfaenger: string | null; betreff: string }): string {
  const label = f.typ === "rechnung" ? "📄 Rechnung" : f.typ === "angebot" ? "📝 Angebot" : "🔔 Mahnung";
  return (
    `<b>Freigabe nötig — ${label}</b>\n` +
    `An: ${f.empfaenger || "—"}\n` +
    `Betreff: ${f.betreff}\n\n` +
    `Genehmigen verschickt die Mail an den Kunden. Anpassen = du schreibst mir, was zu ändern ist.`
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

  // Bei erfolgreichem Rechnungsversand: Rechnung auf "offen" setzen (war im
  // Freigabe-Modus noch Entwurf, bis Albert genehmigt hat).
  if (res.ok && f.typ === "rechnung" && f.ziel_id) {
    try {
      const r = await getRechnungById(f.ziel_id);
      if (r && r.status === "entwurf") {
        await updateRechnung(f.ziel_id, { status: "offen", sent_at: new Date().toISOString() });
      }
    } catch {
      /* ignore */
    }
  }

  return res;
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

    const msgId = await sendTelegramButtons(vorschau(fg), buttons(fg.id));
    if (msgId) await updateFreigabe(fg.id, { telegram_message_id: msgId });
    return true;
  } catch {
    return false;
  }
}
