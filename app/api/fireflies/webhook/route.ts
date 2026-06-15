/**
 * Fireflies → Close-Notiz (Baustein A — Auto-Call-Doku).
 *
 * POST /api/fireflies/webhook
 *   Fireflies ruft nach abgeschlossener Transkription auf: { meetingId, eventType }.
 *   Wir verifizieren die HMAC-Signatur (x-hub-signature), holen das Transcript,
 *   filtern auf Setting-/Closing-/Folgetermin mit echter Summary und schreiben
 *   Notiz + Follow-up-Task in den passenden Close-Lead (Match über Teilnehmer-Mail).
 *
 * GET /api/fireflies/webhook?transcriptId=<id>&dryrun=1   (Auth: Bearer CRON_SECRET)
 *   Test gegen einen echten vergangenen Call — loggt die Notiz, schreibt nichts.
 *
 * Required ENV: FIREFLIES_API_KEY, CLOSE_API_KEY, CRON_SECRET.
 * Optional ENV: FIREFLIES_WEBHOOK_SECRET (Signatur), WSM_INTERNAL_EMAILS, TELEGRAM_*.
 */
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  getTranscriptById,
  classifyCallType,
  hasProcessedSummary,
  extractProspect,
} from "@/lib/fireflies";
import { addCallNoteAndTask, type CallNoteResult } from "@/lib/close";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ProcessResult =
  | { handled: false; reason: string; transcriptId: string }
  | { handled: true; result: CallNoteResult; transcriptId: string };

/** Holt + filtert + dokumentiert einen Call. Kein Throw. */
async function processTranscript(
  transcriptId: string,
  dryRun: boolean,
): Promise<ProcessResult> {
  const t = await getTranscriptById(transcriptId);
  if (!t) return { handled: false, reason: "transcript_not_found", transcriptId };

  const callType = classifyCallType(t.title);
  if (!callType)
    return { handled: false, reason: "not_a_sales_call", transcriptId };

  if (!hasProcessedSummary(t))
    return { handled: false, reason: "no_summary_yet", transcriptId };

  const prospect = extractProspect(t);
  if (!prospect) {
    if (!dryRun) {
      await sendTelegramMessage(
        `⚠️ <b>Call ohne erkennbaren Interessenten</b>\nTitel: ${t.title}\nKein nicht-interner Teilnehmer gefunden.`,
      ).catch(() => {});
    }
    return { handled: false, reason: "no_prospect_email", transcriptId };
  }

  const result = await addCallNoteAndTask({
    email: prospect.email,
    prospectName: prospect.name,
    callType,
    title: t.title || "",
    dateISO: t.dateString || new Date().toISOString(),
    summary: t.summary?.short_summary || "",
    keywords: t.summary?.keywords || [],
    actionItems: t.summary?.action_items || "",
    meetingLink: t.meeting_link || undefined,
    transcriptId: t.id,
    dryRun,
  });

  // Kein passender Lead in Close → Albert per Telegram informieren (manuell anlegen).
  if (!dryRun && result.noLead) {
    await sendTelegramMessage(
      `⚠️ <b>Call ohne passenden Close-Lead</b>\n${prospect.email}\nTitel: ${t.title}`,
    ).catch(() => {});
  }

  return { handled: true, result, transcriptId };
}

/** Verifiziert die Fireflies-HMAC-Signatur (x-hub-signature, sha256 hex). */
function verifySignature(raw: string, sig: string | null, secret: string): boolean {
  if (!sig) return false;
  const hex = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const candidates = [hex, `sha256=${hex}`];
  return candidates.some((c) => {
    try {
      return (
        c.length === sig.length &&
        crypto.timingSafeEqual(Buffer.from(c), Buffer.from(sig))
      );
    } catch {
      return false;
    }
  });
}

export async function POST(req: NextRequest) {
  const raw = await req.text();

  // Signatur prüfen, falls Secret konfiguriert (sonst verarbeiten + warnen).
  const secret = process.env.FIREFLIES_WEBHOOK_SECRET;
  if (secret) {
    const sig =
      req.headers.get("x-hub-signature") ||
      req.headers.get("x-hub-signature-256");
    if (!verifySignature(raw, sig, secret)) {
      return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
    }
  } else {
    console.warn("FIREFLIES_WEBHOOK_SECRET nicht gesetzt — Signatur ungeprüft.");
  }

  let body: { meetingId?: string; transcriptId?: string; eventType?: string };
  try {
    body = JSON.parse(raw || "{}");
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const meetingId = body.meetingId || body.transcriptId;
  if (!meetingId) {
    return NextResponse.json({ ok: false, error: "missing_meetingId" }, { status: 400 });
  }
  // Nur fertige Transkriptionen verarbeiten (andere Events ignorieren wir still).
  if (body.eventType && !/transcription/i.test(body.eventType)) {
    return NextResponse.json({ ok: true, ignored: body.eventType });
  }

  const out = await processTranscript(meetingId, false);
  // Immer 200 zurück (außer Auth) — sonst retryt Fireflies endlos.
  return NextResponse.json({ ok: true, ...out });
}

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const transcriptId = searchParams.get("transcriptId");
  const dryRun = searchParams.get("dryrun") === "1";
  if (!transcriptId) {
    return NextResponse.json(
      { ok: false, error: "transcriptId erforderlich (& dryrun=1 empfohlen)" },
      { status: 400 },
    );
  }
  const out = await processTranscript(transcriptId, dryRun);
  return NextResponse.json({ ok: true, dryRun, ...out });
}
