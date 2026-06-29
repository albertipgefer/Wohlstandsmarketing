/**
 * POST /api/telegram/leads-webhook — Webhook des WSMMetaAdsLeadsBot.
 * Verarbeitet den "🔨 Prototyp bauen"-Button aus dem Eventlocation-Lead-Alert:
 * löst den Build der Website-Fabrik für das bereits angelegte Projekt aus
 * (GitHub repository_dispatch). KEIN Auto-Build — Albert entscheidet per Klick.
 *
 * Sicherheit:
 *  - Header X-Telegram-Bot-Api-Secret-Token muss LEADS_TELEGRAM_WEBHOOK_SECRET
 *    (Fallback TELEGRAM_WEBHOOK_SECRET) sein.
 *  - chat.id muss die Leads-Chat-ID sein (metaAdsTelegramConfig).
 *
 * Einrichtung (einmalig durch Albert): Webhook für den Leads-Bot setzen mit
 *   https://api.telegram.org/bot<WSM_LEADS_TELEGRAM_BOT_TOKEN>/setWebhook?url=https://wohlstandsmarketing.de/api/telegram/leads-webhook&secret_token=<SECRET>
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { metaAdsTelegramConfig, answerCallback, editTelegramMessage } from "@/lib/telegram";
import { triggerBuildPreview, getEventProjectStatus } from "@/lib/fabrik/db";

const ok = () => NextResponse.json({ ok: true });

// Status, in denen ein (erneuter) Build sinnvoll ist.
const BUILDABLE = new Set(["intake_complete", "failed", "changes_requested"]);

export async function POST(req: NextRequest) {
  const expected = process.env.LEADS_TELEGRAM_WEBHOOK_SECRET || process.env.TELEGRAM_WEBHOOK_SECRET;
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cfg = metaAdsTelegramConfig();
  const chatId = String(cfg.chatId || "");

  let update: {
    callback_query?: {
      id: string;
      data?: string;
      message?: { chat?: { id?: number }; message_id?: number; text?: string };
    };
  };
  try {
    update = await req.json();
  } catch {
    return ok();
  }

  const cq = update.callback_query;
  if (!cq) return ok();

  // Nur der Leads-Chat darf Builds auslösen.
  if (String(cq.message?.chat?.id ?? "") !== chatId) {
    await answerCallback(cq.id, undefined, { token: cfg.token });
    return ok();
  }

  const [action, projectId] = (cq.data || "").split(":");
  if (action !== "proto" || !projectId) {
    await answerCallback(cq.id, undefined, { token: cfg.token });
    return ok();
  }

  const messageId = cq.message?.message_id;
  const baseText = cq.message?.text || "Eventlocation-Lead";

  // Doppelklick-Schutz: nur bauen, wenn das Projekt noch nicht in Arbeit/fertig ist.
  const status = await getEventProjectStatus(projectId);
  if (status && !BUILDABLE.has(status)) {
    await answerCallback(cq.id, "Läuft bereits oder ist fertig.", { token: cfg.token });
    if (messageId) {
      await editTelegramMessage(messageId, `${baseText}\n\nℹ️ Build läuft bereits oder ist fertig (Status: ${status}).`, undefined, cfg);
    }
    return ok();
  }

  await answerCallback(cq.id, "🔨 Baue Prototyp …", { token: cfg.token });
  const dispatched = await triggerBuildPreview(projectId);

  if (messageId) {
    await editTelegramMessage(
      messageId,
      dispatched
        ? `${baseText}\n\n✅ Prototyp wird gebaut — der Vorschau-Link kommt in ~3 Min.`
        : `${baseText}\n\n⚠️ Build konnte nicht gestartet werden (GitHub-Token prüfen).`,
      undefined,
      cfg,
    );
  }
  return ok();
}
