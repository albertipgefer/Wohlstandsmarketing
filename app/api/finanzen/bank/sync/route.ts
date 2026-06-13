/** POST /api/finanzen/bank/sync — synchronisiert ein Konto manuell. Body: { kontoId } */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getKontoById, syncKonto } from "@/lib/finanzen/bank";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { kontoId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const konto = await getKontoById(body.kontoId || "");
  if (!konto) return NextResponse.json({ ok: false, error: "konto_nicht_gefunden" }, { status: 404 });
  const res = await syncKonto(konto);
  return NextResponse.json({ ok: !res.fehler, ...res });
}
