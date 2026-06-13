/**
 * POST /api/finanzen/kunde/save — Kunde anlegen/aktualisieren (login-geschützt).
 * Body: { id?, firma, ansprech, strasse, plz_ort, land, email, telefon, ust_id, notiz }
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { insertKunde, updateKunde, dbReady, type KundeInput } from "@/lib/finanzen/kunden";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: { id?: string } & Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const fields: KundeInput = {
    firma: (body.firma as string) || null,
    ansprech: (body.ansprech as string) || null,
    strasse: (body.strasse as string) || null,
    plz_ort: (body.plz_ort as string) || null,
    land: (body.land as string) || "Deutschland",
    email: (body.email as string) || null,
    telefon: (body.telefon as string) || null,
    ust_id: (body.ust_id as string) || null,
    notiz: (body.notiz as string) || null,
    weitere_emails: Array.isArray(body.weitere_emails) ? (body.weitere_emails as string[]) : [],
  };

  if (!fields.firma && !fields.email) {
    return NextResponse.json({ ok: false, error: "firma_oder_email_pflicht" }, { status: 400 });
  }

  const saved = body.id ? await updateKunde(body.id, fields) : await insertKunde(fields);
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: saved.id });
}
