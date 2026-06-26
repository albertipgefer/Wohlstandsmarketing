/**
 * POST /api/outreach/telegram-webhook — Freigabe-Loop für Befund-Mails.
 *
 * Verarbeitet die Button-Klicks (Genehmigen/Ablehnen/Anpassen) und die freie
 * Textnachricht (Anpassungswunsch) am Cold-Outreach-Bot (@WSMColdMailingBot).
 *
 * Sicherheit: Header X-Telegram-Bot-Api-Secret-Token == TELEGRAM_WEBHOOK_SECRET,
 * chat.id == Outreach-Chat. Wirft nie nach außen.
 *
 * Einrichtung (einmalig): setWebhook auf
 *   https://wohlstandsmarketing.de/api/outreach/telegram-webhook
 *   mit secret_token=<TELEGRAM_WEBHOOK_SECRET> beim Outreach-Bot.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  getPendingReply, updatePendingReply, getLatestPendingByStatus, getProspectById,
} from "@/lib/outreach-db";
import { buildBefund, befundButtons, befundPreview } from "@/lib/outreach-befund";
import {
  outreachTelegramConfig, answerOutreachCallback, editOutreachTelegram, sendOutreachTelegramButtons,
} from "@/lib/telegram";

const ok = () => NextResponse.json({ ok: true });

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (!process.env.TELEGRAM_WEBHOOK_SECRET || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const chatId = String(outreachTelegramConfig().chatId || "");

  let update: {
    callback_query?: { id: string; data?: string; message?: { chat?: { id?: number }; message_id?: number } };
    message?: { text?: string; chat?: { id?: number } };
  };
  try { update = await req.json(); } catch { return ok(); }

  // 1) Button-Klick
  if (update.callback_query) {
    const cq = update.callback_query;
    if (String(cq.message?.chat?.id ?? "") !== chatId) { await answerOutreachCallback(cq.id); return ok(); }
    const [action, id] = (cq.data || "").split(":");
    if (!id) { await answerOutreachCallback(cq.id); return ok(); }
    const pending = await getPendingReply(id);
    if (!pending) { await answerOutreachCallback(cq.id, "Nicht mehr gefunden."); return ok(); }
    const msgId = cq.message?.message_id;

    if (action === "oappr") {
      const sendAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      await updatePendingReply(id, { status: "approved", send_at: sendAt });
      await answerOutreachCallback(cq.id, "Genehmigt, geht in 5 Minuten raus.");
      if (msgId) await editOutreachTelegram(msgId, `✅ <b>Genehmigt.</b> Die Befund-Mail geht in 5 Minuten raus.`);
    } else if (action === "orej") {
      await updatePendingReply(id, { status: "rejected" });
      await answerOutreachCallback(cq.id, "Abgelehnt.");
      if (msgId) await editOutreachTelegram(msgId, `🗑 <b>Abgelehnt.</b> Es geht nichts raus.`);
    } else if (action === "orev") {
      await updatePendingReply(id, { status: "revising" });
      await answerOutreachCallback(cq.id, "Schreib mir die Anpassung.");
      if (msgId) await editOutreachTelegram(msgId, `✏️ <b>Anpassen.</b> Schreiben Sie mir jetzt als Nachricht, was geändert werden soll.`);
    } else {
      await answerOutreachCallback(cq.id);
    }
    return ok();
  }

  // 2) Freie Textnachricht = Anpassungswunsch zum jüngsten Entwurf in "revising"
  if (update.message?.text) {
    if (String(update.message.chat?.id ?? "") !== chatId) return ok();
    const note = update.message.text.trim();
    const pending = await getLatestPendingByStatus("revising");
    if (!pending) return ok(); // keine offene Anpassung → ignorieren (kein Spam)
    const prospect = pending.prospect_id ? await getProspectById(pending.prospect_id) : null;
    const draft = await buildBefund(prospect || {}, pending.reply_text || "", note);
    await updatePendingReply(pending.id, {
      draft_subject: draft.subject, draft_body: draft.body, revision_notes: note, status: "awaiting",
    });
    await sendOutreachTelegramButtons(
      `🔁 <b>Angepasst.</b>\n\n` + befundPreview(prospect?.company || prospect?.email || "Lead", draft.subject, draft.body),
      befundButtons(pending.id),
    );
    return ok();
  }

  return ok();
}
