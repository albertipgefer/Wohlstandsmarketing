/**
 * POST /api/finanzen/bank/connect — startet die N26-Verbindung über GoCardless.
 * Legt ein bank_konto an, erzeugt eine Requisition und gibt den Consent-Link zurück.
 * Login-geschützt.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { insertKonto, updateKonto, createRequisition, gcReady, dbReady, N26_INSTITUTION_ID } from "@/lib/finanzen/bank";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  if (!gcReady()) return NextResponse.json({ ok: false, error: "gocardless_keys_fehlen" }, { status: 503 });

  const konto = await insertKonto({ provider: "gocardless", institution_id: N26_INSTITUTION_ID, status: "neu" });
  if (!konto) return NextResponse.json({ ok: false, error: "konto_anlegen_fehlgeschlagen" }, { status: 500 });

  const origin = process.env.ANGEBOT_BASE_URL || req.nextUrl.origin;
  const redirect = `${origin}/api/finanzen/bank/callback?ref=${konto.id}`;

  const requisition = await createRequisition(N26_INSTITUTION_ID, redirect, konto.id);
  if (!requisition) return NextResponse.json({ ok: false, error: "requisition_fehlgeschlagen" }, { status: 502 });

  await updateKonto(konto.id, { requisition_id: requisition.id });
  return NextResponse.json({ ok: true, link: requisition.link });
}
