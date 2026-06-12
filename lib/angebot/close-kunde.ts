/**
 * Close-Anbindung speziell für die ANGEBOTS-ANNAHME.
 *
 * Bewusst getrennt von lib/close.ts (Inbound-Lead-Sync mit HOT-Routing):
 * Wenn ein Kunde ein Angebot annimmt, ist er KEIN frischer Inbound-Lead mehr,
 * sondern wird zum Kunden. Darum:
 *   - Lead per E-Mail suchen → gefunden: Status auf "Kunde" setzen
 *   - nicht gefunden: Lead anlegen mit Status "Kunde" + Kontaktdaten
 *   - in beiden Fällen eine Notiz "Angebot angenommen" mit Details + Link
 *   - KEINE "Sofort anrufen"-Aufgabe, KEINE Telegram-Benachrichtigung
 *     (die Annahme-Telegram verschickt die accept-Route selbst)
 *
 * Wirft nie nach außen — der Aufrufer kapselt zusätzlich in try/catch.
 *
 * Required ENV: CLOSE_API_KEY
 */

const CLOSE_BASE = "https://api.close.com/api/v1";

// Lead-Status "Kunde" (aus der Close-Org von Wohlstandsmarketing)
const STATUS_KUNDE = "stat_w6MOGNTE0UAJtOWcsLwitu9kMcAKwlCuLB8zBe4qLNA";

function authHeader(apiKey: string): string {
  return "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
}

async function closeFetch(
  apiKey: string,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${CLOSE_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(apiKey),
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

type CloseLead = { id: string; name?: string; [key: string]: unknown };

async function findLeadByEmail(
  apiKey: string,
  email: string,
): Promise<CloseLead | null> {
  const q = encodeURIComponent(`email:"${email}"`);
  const r = await closeFetch(apiKey, `/lead/?query=${q}&_limit=1`);
  if (!r.ok) return null;
  const data = (await r.json()) as { data?: CloseLead[] };
  return data.data && data.data.length > 0 ? data.data[0] : null;
}

export type AcceptCloseInput = {
  email: string;
  company?: string | null;
  contactName?: string | null;
  /** Detail-Zeilen für die Notiz (z. B. Angebotsnummer, Betrag, angenommen von). */
  noteLines?: (string | null | undefined)[];
};

export type AcceptCloseResult = {
  ok: boolean;
  leadId?: string;
  created?: boolean;
  reason?: string;
};

/**
 * Markiert den Kunden in Close nach Angebotsannahme als "Kunde".
 * Legt den Lead an, falls er noch nicht existiert. Hängt immer eine Notiz an.
 */
export async function markCloseLeadAsKunde(
  input: AcceptCloseInput,
): Promise<AcceptCloseResult> {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) return { ok: false, reason: "missing_close_key" };
  if (!input.email) return { ok: false, reason: "missing_email" };

  const leadName =
    input.company?.trim() || input.contactName?.trim() || input.email;
  const contactName =
    input.contactName?.trim() || input.company?.trim() || input.email;

  try {
    const existing = await findLeadByEmail(apiKey, input.email);

    let leadId: string;
    let created: boolean;

    if (existing) {
      leadId = existing.id;
      created = false;
      // Bestehenden Lead auf "Kunde" hochstufen.
      const r = await closeFetch(apiKey, `/lead/${leadId}/`, {
        method: "PUT",
        body: JSON.stringify({ status_id: STATUS_KUNDE }),
      });
      if (!r.ok) return { ok: false, reason: `update_failed_${r.status}` };
    } else {
      // Neuen Lead direkt als Kunde anlegen.
      const r = await closeFetch(apiKey, `/lead/`, {
        method: "POST",
        body: JSON.stringify({
          name: leadName,
          status_id: STATUS_KUNDE,
          contacts: [
            {
              name: contactName,
              emails: [{ email: input.email, type: "office" }],
            },
          ],
        }),
      });
      if (!r.ok) return { ok: false, reason: `create_failed_${r.status}` };
      const lead = (await r.json()) as CloseLead;
      leadId = lead.id;
      created = true;
    }

    // Notiz mit den Annahme-Details anhängen.
    const note = [
      "✅ Angebot angenommen — Kunde",
      ...(input.noteLines || []).filter(Boolean),
    ]
      .filter(Boolean)
      .join("\n");
    await closeFetch(apiKey, `/activity/note/`, {
      method: "POST",
      body: JSON.stringify({ lead_id: leadId, note }),
    });

    return { ok: true, leadId, created };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown" };
  }
}
