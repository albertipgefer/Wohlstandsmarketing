/**
 * GET /api/finanzen/bank/callback?ref=<kontoId> — Rückkehr nach dem N26-Consent.
 * Holt die Account-ID(s) der Requisition, lädt IBAN/Name, macht einen ersten Sync
 * und leitet zurück auf /finanzen/bank. Login-geschützt.
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getKontoById, updateKonto, getRequisitionAccounts, getAccountDetails, syncKonto } from "@/lib/finanzen/bank";

export async function GET(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.redirect(`${req.nextUrl.origin}/angebot/login`);
  const ref = req.nextUrl.searchParams.get("ref") || "";
  const back = `${process.env.ANGEBOT_BASE_URL || req.nextUrl.origin}/finanzen/bank`;

  const konto = await getKontoById(ref);
  if (!konto || !konto.requisition_id) return NextResponse.redirect(`${back}?fehler=konto`);

  const accounts = await getRequisitionAccounts(konto.requisition_id);
  if (accounts.length === 0) {
    await updateKonto(konto.id, { status: "fehler" });
    return NextResponse.redirect(`${back}?fehler=kein_konto`);
  }

  const accountId = accounts[0];
  const details = await getAccountDetails(accountId);
  await updateKonto(konto.id, {
    account_id: accountId,
    iban: details?.iban || null,
    name: details?.name || "N26",
    status: "verbunden",
    consent_expires_at: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString(),
  });

  const frisch = await getKontoById(konto.id);
  if (frisch) await syncKonto(frisch);

  return NextResponse.redirect(`${back}?verbunden=1`);
}
