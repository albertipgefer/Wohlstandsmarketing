/**
 * Call-Ingest (Baustein A — Auto-Call-Doku).
 *
 * POST /api/calls/ingest   (Auth: Bearer CRON_SECRET)
 *   Nimmt ein (oder mehrere) Fireflies-Transcript-Objekt(e) entgegen — geliefert
 *   von einem lokalen `claude -p`-Job, der die Calls über den Fireflies-MCP liest
 *   (kein API-Key) — filtert auf Setting-/Closing-/Folgetermin mit Summary und
 *   schreibt Notiz + Follow-up-Task in den passenden Close-Lead.
 *
 * Body: ein FfTranscript ODER { transcripts: FfTranscript[], dryRun?: boolean }.
 * Idempotent über den Marker [ff:<id>] in der Close-Notiz.
 *
 * Required ENV: CRON_SECRET, CLOSE_API_KEY. Optional: WSM_INTERNAL_EMAILS, TELEGRAM_*.
 */
import { NextRequest, NextResponse } from "next/server";
import {
  classifyCallType,
  hasProcessedSummary,
  extractProspect,
  type FfTranscript,
} from "@/lib/fireflies";
import { addCallNoteAndTask } from "@/lib/close";
import { sendFirefliesTelegram } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function processOne(t: FfTranscript, dryRun: boolean) {
  if (!t?.id) return { id: null, skipped: "missing_id" };

  const callType = classifyCallType(t.title);
  if (!callType) return { id: t.id, skipped: "not_a_sales_call" };

  if (!hasProcessedSummary(t)) return { id: t.id, skipped: "no_summary" };

  const prospect = extractProspect(t);
  if (!prospect) {
    if (!dryRun) {
      await sendFirefliesTelegram(
        `⚠️ <b>Call ohne erkennbaren Interessenten</b>\nTitel: ${t.title}`,
      ).catch(() => {});
    }
    return { id: t.id, skipped: "no_prospect" };
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

  if (!dryRun && result.noLead) {
    await sendFirefliesTelegram(
      `⚠️ <b>Call ohne passenden Close-Lead</b>\n${prospect.email}\nTitel: ${t.title}`,
    ).catch(() => {});
  }

  return { id: t.id, callType, prospect: prospect.email, result };
}

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const b = body as {
    transcripts?: FfTranscript[];
    dryRun?: boolean;
  } & FfTranscript;
  const dryRun = b.dryRun === true;
  const list: FfTranscript[] = Array.isArray(b.transcripts)
    ? b.transcripts
    : b?.id
      ? [b]
      : [];

  if (!list.length) {
    return NextResponse.json(
      { ok: false, error: "kein Transcript im Body (Feld 'transcripts' oder ein FfTranscript)" },
      { status: 400 },
    );
  }

  const results = [];
  for (const t of list) {
    try {
      results.push(await processOne(t, dryRun));
    } catch (e) {
      results.push({ id: t?.id ?? null, error: e instanceof Error ? e.message : "unknown" });
    }
  }

  return NextResponse.json({ ok: true, dryRun, count: results.length, results });
}
