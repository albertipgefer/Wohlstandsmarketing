/**
 * Beleg-Scan via Claude Vision (Sonnet 4.6, dependency-frei über fetch).
 * Nimmt ein Bild ODER PDF (base64) und extrahiert die Ausgabe-Felder per
 * forced tool use — strukturierte, validierte Daten statt freiem Text.
 * Ohne ANTHROPIC_API_KEY → null (Aufrufer meldet das sauber).
 *
 * Bewusst KEIN Auto-Speichern: die erkannten Werte füllen nur das Formular
 * vor, Albert prüft + speichert (Sicherheitsfaktor wie bei der KI generell).
 */
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.FINANZEN_SCAN_MODEL || "claude-sonnet-4-6";

export function scanReady(): boolean {
  return !!API_KEY;
}

export type BelegScan = {
  lieferant: string | null;
  datum: string | null; // YYYY-MM-DD
  kategorie: string | null;
  ustSatz: number; // 19 | 7 | 0
  betragBrutto: number;
  betragNetto: number;
  ust: number;
  beschreibung: string | null;
};

/** Beispiel-Kategorien (an Accountable angelehnt) — Hinweis für die KI. */
const KATEGORIEN = [
  "Software/Tools",
  "Software-Abo",
  "Werbung",
  "Büromaterial",
  "Fortbildung",
  "Hosting",
  "Hotels",
  "Reisekosten",
  "Bewirtungskosten",
  "Kraftstoffe & Strom",
  "KFZ-Versicherungen",
  "Geschäftliche Versicherungen",
  "Bankgebühren",
  "Telefon/Internet",
  "Sonstige Kosten",
];

const TOOL = {
  name: "beleg_erfasst",
  description: "Die aus dem Beleg/der Rechnung ausgelesenen Ausgabe-Daten. Alle Beträge in EUR.",
  input_schema: {
    type: "object",
    properties: {
      lieferant: { type: "string", description: "Name des Lieferanten/Händlers/Anbieters (oben auf dem Beleg)." },
      datum: { type: "string", description: "Belegdatum im Format YYYY-MM-DD. Leer lassen, wenn nicht erkennbar." },
      betrag_brutto: { type: "number", description: "Gesamt-/Endbetrag inkl. Umsatzsteuer (die Summe, die bezahlt wurde)." },
      ust_satz: { type: "number", enum: [19, 7, 0], description: "Umsatzsteuersatz in Prozent. 19 Standard, 7 ermäßigt (z.B. Lebensmittel/Bücher), 0 wenn keine USt ausgewiesen oder Auslandsleistung." },
      kategorie: { type: "string", description: `Passende Ausgabenkategorie. Bevorzugt eine aus: ${KATEGORIEN.join(", ")}. Sonst eine treffende eigene.` },
      beschreibung: { type: "string", description: "Kurze Beschreibung, was gekauft wurde (1 Zeile)." },
    },
    required: ["lieferant", "betrag_brutto", "ust_satz"],
  },
} as const;

function round2(n: number): number {
  return Math.round((Number(n) || 0) * 100) / 100;
}

/**
 * Beleg analysieren. `dataBase64` ohne Data-URI-Präfix, `mediaType` z.B.
 * "image/jpeg", "image/png" oder "application/pdf".
 */
export async function scanBeleg(dataBase64: string, mediaType: string): Promise<BelegScan | null> {
  if (!API_KEY) return null;

  const istPdf = mediaType === "application/pdf";
  const quelle = istPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: dataBase64 } }
    : { type: "image", source: { type: "base64", media_type: mediaType, data: dataBase64 } };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      tools: [TOOL],
      tool_choice: { type: "tool", name: "beleg_erfasst" },
      messages: [
        {
          role: "user",
          content: [
            quelle,
            {
              type: "text",
              text: "Lies diesen Beleg/diese Rechnung aus und erfasse die Ausgabe-Daten exakt über das Tool. Nimm den tatsächlich bezahlten Bruttobetrag. Wenn mehrere USt-Sätze vorkommen, nimm den überwiegenden.",
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`anthropic_${res.status}`);
  const data = (await res.json()) as { content?: { type: string; name?: string; input?: Record<string, unknown> }[] };
  const tool = (data.content || []).find((b) => b.type === "tool_use" && b.name === "beleg_erfasst");
  if (!tool?.input) return null;

  const inp = tool.input as {
    lieferant?: string; datum?: string; betrag_brutto?: number; ust_satz?: number; kategorie?: string; beschreibung?: string;
  };

  const brutto = round2(Number(inp.betrag_brutto));
  const satz = [19, 7, 0].includes(Number(inp.ust_satz)) ? Number(inp.ust_satz) : 19;
  const netto = round2(brutto / (1 + satz / 100));
  const ust = round2(brutto - netto);
  const datum = typeof inp.datum === "string" && /^\d{4}-\d{2}-\d{2}$/.test(inp.datum) ? inp.datum : null;

  return {
    lieferant: inp.lieferant?.trim() || null,
    datum,
    kategorie: inp.kategorie?.trim() || null,
    ustSatz: satz,
    betragBrutto: brutto,
    betragNetto: netto,
    ust,
    beschreibung: inp.beschreibung?.trim() || null,
  };
}
