/**
 * Finanz-KI — beantwortet Fragen über Alberts echte Zahlen und kann (nur nach
 * ausdrücklicher Bestätigung) kleine Aktionen ausführen. Läuft über die
 * Anthropic Messages API (Claude Opus 4.8), dependency-frei via fetch.
 *
 * Sicherheit: Schreib-Tools führen nur aus, wenn der Nutzer im Chat bestätigt
 * hat (Tool-Param `bestaetigt: true`). Ohne ANTHROPIC_API_KEY → klare Meldung.
 */
import { listAngebote } from "@/lib/angebot/db";
import { listRechnungen, getRechnungById, updateRechnung } from "@/lib/finanzen/db";
import { listAusgaben, ausgabenJahr, insertAusgabe } from "@/lib/finanzen/ausgaben";
import { listKunden } from "@/lib/finanzen/kunden";
import { computeKpis } from "@/lib/finanzen/forecast";
import { ustVoranmeldung, euer, ruecklageEmpfehlung, zeitraum } from "@/lib/finanzen/steuern";
import { eur } from "@/lib/angebot/format";

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.FINANZEN_KI_MODEL || "claude-opus-4-8";

export function kiReady(): boolean {
  return !!API_KEY;
}

export type KiMessage = { role: "user" | "assistant"; content: string };

/** Kompakter Snapshot der Finanzlage als Kontext fürs Modell. */
async function buildSnapshot(): Promise<string> {
  const now = new Date();
  const jahr = now.getFullYear();
  const [angebote, rechnungen, ausgaben, kunden] = await Promise.all([
    listAngebote(), listRechnungen(), listAusgaben(), listKunden(),
  ]);
  const k = computeKpis(angebote, rechnungen, now);
  const aus = ausgabenJahr(ausgaben, jahr);
  const heute = now.toISOString().slice(0, 10);

  const offen = rechnungen.filter((r) => r.status === "offen" || r.status === "ueberfaellig");
  const ueberfaellig = offen.filter((r) => r.faellig_am && r.faellig_am < heute);

  const qNow = "q" + (Math.floor(now.getMonth() / 3) + 1);
  const zr = zeitraum(jahr, qNow);
  const ust = ustVoranmeldung(rechnungen, ausgaben, zr.von, zr.bis);
  const e = euer(rechnungen, ausgaben, jahr);
  const rl = ruecklageEmpfehlung(e.gewinn);

  // Top-Kunden nach bezahltem Umsatz
  const umsatzProKunde = new Map<string, number>();
  for (const r of rechnungen) {
    if (r.status !== "bezahlt") continue;
    const key = r.kunde_firma || r.kunde_email || "—";
    umsatzProKunde.set(key, (umsatzProKunde.get(key) || 0) + r.netto);
  }
  const topKunden = [...umsatzProKunde.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Ausgaben nach Kategorie
  const ausProKat = new Map<string, number>();
  for (const a of ausgaben) {
    if (new Date(a.datum).getFullYear() !== jahr) continue;
    ausProKat.set(a.kategorie || "Sonstiges", (ausProKat.get(a.kategorie || "Sonstiges") || 0) + a.betrag_netto);
  }

  const offenListe = offen.slice(0, 15).map((r) =>
    `- id=${r.id} | ${r.nummer || "Entwurf"} | ${r.kunde_firma || r.kunde_email || "—"} | ${eur(r.brutto)} | fällig ${r.faellig_am || "—"} | ${r.status}`,
  ).join("\n");

  return [
    `Heutiges Datum: ${heute}. Inhaber: Albert Ipgefer, Wohlstandsmarketing (Regelbesteuerung 19 %).`,
    ``,
    `KENNZAHLEN ${jahr}:`,
    `- Umsatz Jahr (netto, bezahlt): ${eur(k.umsatzJahrNetto)}`,
    `- Umsatz akt. Quartal (netto): ${eur(k.umsatzQuartalNetto)}`,
    `- Offene Forderungen (netto): ${eur(k.offenNetto)} (${offen.length} Rechnungen, davon ${ueberfaellig.length} überfällig)`,
    `- Erwarteter nächster Umsatz (Pipeline): ${eur(k.naechsterUmsatzNetto)}`,
    `- Ausgaben Jahr (netto): ${eur(aus.netto)}`,
    `- Gewinn vor Steuern (netto): ${eur(e.gewinn)}`,
    `- Kundenanzahl (Stammkunden): ${kunden.length}`,
    ``,
    `STEUERN:`,
    `- USt-Voranmeldung ${zr.label}: Umsatzsteuer ${eur(ust.ustEingenommen)} − Vorsteuer ${eur(ust.vorsteuer)} = Zahllast ${eur(ust.zahllast)}`,
    `- Geschätzte Einkommensteuer ${jahr} (Ø ${rl.durchschnittssatz}%): ${eur(rl.einkommensteuerSchaetzung)} → empfohlene Rücklage: ${eur(rl.empfohleneRuecklage)}`,
    ``,
    `TOP-KUNDEN (bezahlter Umsatz netto): ${topKunden.map(([n, v]) => `${n} ${eur(v)}`).join(", ") || "—"}`,
    `AUSGABEN NACH KATEGORIE: ${[...ausProKat.entries()].map(([kat, v]) => `${kat} ${eur(v)}`).join(", ") || "—"}`,
    ``,
    `OFFENE/ÜBERFÄLLIGE RECHNUNGEN (mit id für Aktionen):`,
    offenListe || "- keine",
  ].join("\n");
}

const SYSTEM = (snapshot: string) => `Du bist die interne Finanz-KI von Wohlstandsmarketing, dem Einzelunternehmen von Albert Ipgefer. Du kennst seine echten Buchhaltungszahlen (siehe unten) und hilfst ihm, den Überblick zu behalten — wie ein mitdenkender Buchhalter/Steuerberater.

Regeln:
- Antworte auf Deutsch, präzise und konkret mit echten Zahlen aus dem Kontext. Keine Floskeln.
- Rechne auf Wunsch (z. B. Rücklagen, Margen, offene Beträge). Sei ehrlich, wenn eine Zahl nicht im Kontext steht.
- Steuer-Hinweise sind Orientierung, kein Steuerbescheid; bei komplexen Fällen auf Steuerberater verweisen.
- AKTIONEN (Rechnung als bezahlt markieren, Ausgabe erfassen): Schlage sie vor und führe sie NUR aus, nachdem Albert im Chat ausdrücklich bestätigt hat. Setze den Tool-Parameter \`bestaetigt\` erst auf true, wenn er klar "ja/mach das/bestätigt" gesagt hat. Frage sonst vorher nach.

AKTUELLE ZAHLEN:
${snapshot}`;

// --- Tools (Aktionen) ---
const TOOLS = [
  {
    name: "markiere_rechnung_bezahlt",
    description: "Markiert eine Rechnung als bezahlt. Nur mit bestaetigt=true ausführen, nachdem der Nutzer zugestimmt hat.",
    input_schema: {
      type: "object",
      properties: {
        rechnung_id: { type: "string", description: "Die id der Rechnung (aus dem Kontext)." },
        bestaetigt: { type: "boolean", description: "true nur nach ausdrücklicher Bestätigung des Nutzers." },
      },
      required: ["rechnung_id", "bestaetigt"],
    },
  },
  {
    name: "erfasse_ausgabe",
    description: "Erfasst eine Betriebsausgabe. Nur mit bestaetigt=true ausführen, nachdem der Nutzer zugestimmt hat.",
    input_schema: {
      type: "object",
      properties: {
        betrag_netto: { type: "number" },
        ust_satz: { type: "number", description: "Standard 19." },
        lieferant: { type: "string" },
        beschreibung: { type: "string" },
        kategorie: { type: "string" },
        datum: { type: "string", description: "YYYY-MM-DD, Standard heute." },
        bestaetigt: { type: "boolean" },
      },
      required: ["betrag_netto", "bestaetigt"],
    },
  },
];

type ToolInput = Record<string, unknown>;

async function runTool(name: string, input: ToolInput): Promise<string> {
  if (!input.bestaetigt) {
    return "NICHT AUSGEFÜHRT — bitte zuerst vom Nutzer bestätigen lassen, dann erneut mit bestaetigt=true aufrufen.";
  }
  if (name === "markiere_rechnung_bezahlt") {
    const id = String(input.rechnung_id || "");
    const r = await getRechnungById(id);
    if (!r) return "Fehler: Rechnung nicht gefunden.";
    const ok = await updateRechnung(id, { status: "bezahlt", bezahlt_am: new Date().toISOString() });
    return ok ? `Erledigt: Rechnung ${r.nummer || id} ist als bezahlt markiert.` : "Fehler beim Speichern.";
  }
  if (name === "erfasse_ausgabe") {
    const netto = Math.round((Number(input.betrag_netto) || 0) * 100) / 100;
    if (netto <= 0) return "Fehler: Betrag fehlt.";
    const satz = Number.isFinite(Number(input.ust_satz)) ? Number(input.ust_satz) : 19;
    const ust = Math.round(netto * (satz / 100) * 100) / 100;
    const saved = await insertAusgabe({
      datum: (input.datum as string) || new Date().toISOString().slice(0, 10),
      lieferant: (input.lieferant as string) || null,
      beschreibung: (input.beschreibung as string) || null,
      kategorie: (input.kategorie as string) || "Sonstiges",
      betrag_netto: netto,
      ust,
      betrag_brutto: Math.round((netto + ust) * 100) / 100,
      bezahlt: true,
    });
    return saved ? `Erledigt: Ausgabe über ${eur(netto)} netto erfasst.` : "Fehler beim Speichern.";
  }
  return "Unbekannte Aktion.";
}

type Block = { type: string; [k: string]: unknown };

async function callAnthropic(system: string, messages: { role: string; content: unknown }[]): Promise<{ stop: string; blocks: Block[] }> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY || "",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1024, system, tools: TOOLS, messages }),
  });
  if (!res.ok) {
    throw new Error(`anthropic_${res.status}`);
  }
  const data = (await res.json()) as { stop_reason: string; content: Block[] };
  return { stop: data.stop_reason, blocks: data.content || [] };
}

/** Hauptfunktion: Verlauf rein, Antworttext raus (inkl. Tool-Loop für Aktionen). */
export async function askKi(history: KiMessage[]): Promise<string> {
  if (!kiReady()) {
    return "Der KI-Assistent ist noch nicht verbunden — bitte ANTHROPIC_API_KEY in den Vercel-Env-Vars hinterlegen. Sobald das gesetzt ist, beantworte ich dir alles über deine Zahlen.";
  }
  const snapshot = await buildSnapshot();
  const system = SYSTEM(snapshot);

  const messages: { role: string; content: unknown }[] = history.map((m) => ({ role: m.role, content: m.content }));

  for (let i = 0; i < 5; i++) {
    const { stop, blocks } = await callAnthropic(system, messages);
    if (stop === "tool_use") {
      messages.push({ role: "assistant", content: blocks });
      const results: Block[] = [];
      for (const b of blocks) {
        if (b.type === "tool_use") {
          const out = await runTool(b.name as string, (b.input as ToolInput) || {});
          results.push({ type: "tool_result", tool_use_id: b.id as string, content: out });
        }
      }
      messages.push({ role: "user", content: results });
      continue;
    }
    // Normale Textantwort
    return blocks.filter((b) => b.type === "text").map((b) => b.text as string).join("\n").trim() || "—";
  }
  return "Ich konnte die Anfrage nicht abschließen. Bitte formuliere sie etwas konkreter.";
}
