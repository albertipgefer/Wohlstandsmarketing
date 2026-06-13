/** POST /api/finanzen/preisliste/delete — Position löschen (login-geschützt). Body: { id } */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { deletePreisposition } from "@/lib/finanzen/preisliste";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ ok: false, error: "id_pflicht" }, { status: 400 });
  const ok = await deletePreisposition(body.id);
  return NextResponse.json({ ok });
}
