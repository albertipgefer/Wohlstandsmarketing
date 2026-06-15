/**
 * POST /api/telegram/webhook — Telegram-Webhook für den Freigabe-Flow.
 * Verarbeitet Button-Klicks (Genehmigen/Anpassen/Verwerfen) und die
 * Text-Anweisung beim Anpassen.
 *
 * Sicherheit:
 *  - Header X-Telegram-Bot-Api-Secret-Token muss TELEGRAM_WEBHOOK_SECRET sein.
 *  - chat.id muss TELEGRAM_CHAT_ID sein (nur Albert).
 *
 * Einrichtung (einmalig durch Albert): Webhook setzen mit
 *   https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://wohlstandsmarketing.de/api/telegram/webhook&secret_token=<SECRET>
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  getFreigabe,
  updateFreigabe,
  findFreigabeWartetAnpassung,
  sendeFreigabe,
  passeMailAn,
  freigabeButtons,
  vorschauText,
  resetOffeneAnpassungen,
  finalisiereReminderFreigabe,
} from "@/lib/finanzen/freigabe";
import {
  finanzenTelegramConfig,
  answerFinanzenCallback,
  editFinanzenTelegram,
  sendFinanzenTelegramButtons,
  sendFinanzenTelegram,
} from "@/lib/telegram";

const ok = () => NextResponse.json({ ok: true });

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (!process.env.TELEGRAM_WEBHOOK_SECRET || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const chatId = String(finanzenTelegramConfig().chatId || "");
  let update: {
    callback_query?: { id: string; data?: string; message?: { chat?: { id?: number }; message_id?: number } };
    message?: { text?: string; chat?: { id?: number } };
  };
  try {
    update = await req.json();
  } catch {
    return ok();
  }

  // 1) Button-Klick
  if (update.callback_query) {
    const cq = update.callback_query;
    if (String(cq.message?.chat?.id ?? "") !== chatId) { await answerFinanzenCallback(cq.id); return ok(); }
    await answerFinanzenCallback(cq.id);

    const parts = (cq.data || "").split(":");
    if (parts[0] !== "fg" || parts.length < 3) return ok();
    const action = parts[1];
    const id = parts[2];
    const fg = await getFreigabe(id);
    if (!fg || !fg.telegram_message_id) return ok();

    if (fg.status === "gesendet" || fg.status === "abgelehnt") {
      await editFinanzenTelegram(fg.telegram_message_id, `Diese Freigabe ist bereits ${fg.status}.`);
      return ok();
    }

    if (action === "ok") {
      const res = await sendeFreigabe(fg);
      if (res.ok) {
        await updateFreigabe(id, { status: "gesendet" });
        await editFinanzenTelegram(fg.telegram_message_id, `✅ Gesendet an ${fg.empfaenger}\nBetreff: ${fg.betreff}`);
      } else {
        await updateFreigabe(id, { status: "fehler", fehler: res.error || null });
        await editFinanzenTelegram(fg.telegram_message_id, `⚠️ Senden fehlgeschlagen: ${res.error}`, freigabeButtons(id));
      }
    } else if (action === "edit") {
      await resetOffeneAnpassungen(); // sicherstellen, dass nur DIESE auf Text wartet
      await updateFreigabe(id, { status: "anpassen_angefragt" });
      await editFinanzenTelegram(
        fg.telegram_message_id,
        `✏️ Schreib mir jetzt als nächste Nachricht, was an der Mail (${fg.typ}) anzupassen ist.`,
      );
    } else if (action === "no") {
      await updateFreigabe(id, { status: "abgelehnt" });
      // Erinnerung übersprungen: Stufe trotzdem als erledigt buchen (sonst bleibt
      // das Angebot via reminder_pending dauerhaft aus dem Cron gesperrt).
      await finalisiereReminderFreigabe(fg, false);
      const txt =
        fg.typ === "angebot_reminder"
          ? `✖️ Übersprungen — diese Erinnerung wurde nicht gesendet.`
          : `❌ Verworfen — es wurde nichts gesendet.`;
      await editFinanzenTelegram(fg.telegram_message_id, txt);
    }
    return ok();
  }

  // 2) Text-Nachricht → Anpassungs-Anweisung für die offene Freigabe
  if (update.message?.text) {
    if (String(update.message.chat?.id ?? "") !== chatId) return ok();
    const fg = await findFreigabeWartetAnpassung();
    if (!fg) return ok(); // keine offene Anpassung → ignorieren

    await sendFinanzenTelegram("✏️ Passe die Mail an …");
    const neu = await passeMailAn(fg, update.message.text);
    if (!neu) {
      await sendFinanzenTelegram("Konnte die Anpassung nicht generieren (KI nicht erreichbar?). Die Freigabe bleibt offen.");
      await updateFreigabe(fg.id, { status: "wartet" });
      return ok();
    }
    const updated = await updateFreigabe(fg.id, { betreff: neu.betreff, html: neu.html, status: "wartet" });
    const msgId = await sendFinanzenTelegramButtons(
      `${vorschauText({ ...fg, betreff: neu.betreff, html: neu.html })}\n\n<i>(angepasst)</i>`,
      freigabeButtons(fg.id),
    );
    if (msgId && updated) await updateFreigabe(fg.id, { telegram_message_id: msgId });
    return ok();
  }

  return ok();
}
