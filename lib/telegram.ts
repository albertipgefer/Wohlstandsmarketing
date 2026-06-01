/**
 * Telegram-Push für neue Leads.
 *
 * Schickt Albert eine Sofort-Benachrichtigung aufs Handy, sobald sich ein
 * Lead über die Website einträgt. Kostenlos über die Telegram-Bot-API.
 *
 * Required ENV (optional — fehlt eins, wird stillschweigend übersprungen):
 *   TELEGRAM_BOT_TOKEN   — Token von @BotFather
 *   TELEGRAM_CHAT_ID     — Chat-ID des Empfängers (Albert)
 *
 * Wirft nie nach außen — der Aufrufer kapselt zusätzlich in try/catch, damit
 * ein Telegram-Ausfall nie etwas blockiert.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export type LeadNotification = {
  /** Menschlich lesbares Quell-Label, z. B. "Angebots-Konfigurator" */
  sourceLabel: string;
  name: string;
  email: string;
  phone?: string;
  /** Zusatz-Zeilen (z. B. Score, Angebotssumme) */
  detailLines?: (string | null | undefined)[];
  /** Close-Lead-ID für den Deep-Link */
  leadId?: string;
  /** HOT = hohe Kaufabsicht (Angebots-Konfigurator oder ki-check mit großem
   *  Handlungsbedarf) → auffälliger Alert + Hinweis auf die Rückruf-Aufgabe. */
  hot?: boolean;
};

/** Schickt eine formatierte Lead-Benachrichtigung an den hinterlegten Telegram-Chat. */
export async function notifyNewLead(n: LeadNotification): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return; // Feature optional — nicht konfiguriert = still überspringen

  const header = n.hot
    ? `🔥🔥 <b>HOT-LEAD — sofort anrufen</b>\n${escapeHtml(n.sourceLabel)}`
    : `🟢 <b>Neuer Lead</b> — ${escapeHtml(n.sourceLabel)}`;

  const lines = [
    header,
    ``,
    `👤 ${escapeHtml(n.name)}`,
    `✉️ ${escapeHtml(n.email)}`,
    n.phone ? `📞 ${escapeHtml(n.phone)}` : null,
    ...(n.detailLines || []).filter(Boolean).map((l) => escapeHtml(String(l))),
  ];

  if (n.hot) {
    lines.push(``, `⏰ Rückruf-Aufgabe (24 h) wurde in Close angelegt.`);
  }

  if (n.leadId) {
    lines.push(``, `➡️ <a href="https://app.close.com/lead/${n.leadId}/">In Close öffnen</a>`);
  }

  const text = lines.filter((l) => l !== null).join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}
