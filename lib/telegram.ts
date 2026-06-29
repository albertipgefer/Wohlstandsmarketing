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

/**
 * Schickt eine beliebige (bereits HTML-formatierte) Nachricht an den hinterlegten
 * Telegram-Chat. Genutzt z. B. vom Wochen-Briefing-Cron.
 * Gibt true zurück, wenn gesendet wurde; false wenn nicht konfiguriert/Fehler.
 * Wirft nie nach außen.
 */
export async function sendTelegramMessage(
  html: string,
  opts?: { token?: string; chatId?: string },
): Promise<boolean> {
  const token = opts?.token || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = opts?.chatId || process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/**
 * Wie sendTelegramMessage, aber über den eigenen Fireflies-Call-Doku-Bot
 * (FIREFLIES_TELEGRAM_*). Fallback auf den Standard-Bot, solange der neue Bot
 * noch nicht konfiguriert ist.
 */
export async function sendFirefliesTelegram(html: string): Promise<boolean> {
  return sendTelegramMessage(html, {
    token: process.env.FIREFLIES_TELEGRAM_BOT_TOKEN,
    chatId: process.env.FIREFLIES_TELEGRAM_CHAT_ID,
  });
}

export type InlineButton = { text: string; callback_data: string };

/**
 * Schickt eine Nachricht mit Inline-Buttons (Genehmigungs-Flow) und gibt die
 * message_id zurück (für späteres Editieren) — null bei Fehler/nicht konfiguriert.
 */
export async function sendTelegramButtons(
  html: string,
  buttons: InlineButton[][],
  opts?: { token?: string; chatId?: string },
): Promise<number | null> {
  const token = opts?.token || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = opts?.chatId || process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard: buttons },
      }),
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { result?: { message_id?: number } };
    return data.result?.message_id ?? null;
  } catch {
    return null;
  }
}

/** Editiert Text + Buttons einer bestehenden Nachricht (z.B. nach Genehmigung). */
export async function editTelegramMessage(
  messageId: number,
  html: string,
  buttons?: InlineButton[][],
  opts?: { token?: string; chatId?: string },
): Promise<boolean> {
  const token = opts?.token || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = opts?.chatId || process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: buttons ? { inline_keyboard: buttons } : undefined,
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

/** Beantwortet einen Button-Klick (entfernt die Lade-Animation, optional Toast). */
export async function answerCallback(callbackId: string, text?: string, opts?: { token?: string }): Promise<void> {
  const token = opts?.token || process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackId, text: text || undefined }),
    });
  } catch {
    /* ignore */
  }
}

/**
 * Cold-Outreach-Benachrichtigung an den DEDIZIERTEN Outreach-Bot.
 * Nutzt OUTREACH_TELEGRAM_BOT_TOKEN / OUTREACH_TELEGRAM_CHAT_ID; fällt auf den
 * Standard-Bot (TELEGRAM_*) zurück, falls die Outreach-Variablen nicht gesetzt sind.
 * So landen Outreach-Alerts/Reports getrennt von den normalen Lead-Alerts.
 */
export function outreachTelegramConfig(): { token?: string; chatId?: string } {
  return {
    token: process.env.OUTREACH_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.OUTREACH_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID,
  };
}

export async function sendOutreachTelegram(html: string): Promise<boolean> {
  return sendTelegramMessage(html, outreachTelegramConfig());
}

export async function sendOutreachTelegramButtons(html: string, buttons: InlineButton[][]): Promise<number | null> {
  return sendTelegramButtons(html, buttons, outreachTelegramConfig());
}

export async function editOutreachTelegram(messageId: number, html: string, buttons?: InlineButton[][]): Promise<boolean> {
  return editTelegramMessage(messageId, html, buttons, outreachTelegramConfig());
}

export async function answerOutreachCallback(callbackId: string, text?: string): Promise<void> {
  return answerCallback(callbackId, text, { token: outreachTelegramConfig().token });
}

/**
 * Finanz-/Angebots-Modul (Rechnungen, Angebote, Mahnungen, 2FA-Login,
 * Freigabe-Flow, Finanz-Cron) → DEDIZIERTER WSMFinanzenBot.
 * Nutzt FINANZEN_TELEGRAM_BOT_TOKEN / FINANZEN_TELEGRAM_CHAT_ID; fällt auf den
 * Standard-Bot (TELEGRAM_*) zurück, solange die Finanz-Variablen nicht gesetzt
 * sind. So sind alle Finanz-/Angebots-Meldungen getrennt von den Lead-Alerts.
 */
export function finanzenTelegramConfig(): { token?: string; chatId?: string } {
  return {
    token: process.env.FINANZEN_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.FINANZEN_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID,
  };
}

export async function sendFinanzenTelegram(html: string): Promise<boolean> {
  return sendTelegramMessage(html, finanzenTelegramConfig());
}

export async function sendFinanzenTelegramButtons(html: string, buttons: InlineButton[][]): Promise<number | null> {
  return sendTelegramButtons(html, buttons, finanzenTelegramConfig());
}

export async function editFinanzenTelegram(messageId: number, html: string, buttons?: InlineButton[][]): Promise<boolean> {
  return editTelegramMessage(messageId, html, buttons, finanzenTelegramConfig());
}

export async function answerFinanzenCallback(callbackId: string, text?: string): Promise<void> {
  return answerCallback(callbackId, text, { token: finanzenTelegramConfig().token });
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

/**
 * Eventlocation-Kampagne (Meta Ads, /location-check) → DEDIZIERTER
 * WSMMetaAdsLeadsBot. Nutzt WSM_LEADS_TELEGRAM_BOT_TOKEN / _CHAT_ID; fällt auf
 * den Standard-Bot (TELEGRAM_*) zurück, solange die Variablen nicht gesetzt sind.
 */
export function metaAdsTelegramConfig(): { token?: string; chatId?: string } {
  return {
    token: process.env.WSM_LEADS_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.WSM_LEADS_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID,
  };
}

/** Schickt eine formatierte Lead-Benachrichtigung an den hinterlegten Telegram-Chat. */
export async function notifyNewLead(
  n: LeadNotification,
  opts?: { token?: string; chatId?: string; buttons?: InlineButton[][] },
): Promise<void> {
  const token = opts?.token || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = opts?.chatId || process.env.TELEGRAM_CHAT_ID;
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
      ...(opts?.buttons && opts.buttons.length ? { reply_markup: { inline_keyboard: opts.buttons } } : {}),
    }),
  });
}
