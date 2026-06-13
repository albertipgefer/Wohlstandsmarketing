/**
 * Beleg-Handling für Ausgaben (login-geschützt).
 *  POST  (multipart: id, file)  → lädt Beleg in Supabase Storage, setzt ausgaben.beleg_url
 *  GET   ?id=<ausgabeId>        → leitet auf eine signierte (zeitlich begrenzte) URL um
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getAusgabeById, updateAusgabe, dbReady } from "@/lib/finanzen/ausgaben";
import { uploadBeleg, signedBelegUrl, storageReady } from "@/lib/finanzen/storage";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbReady() || !storageReady()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const id = String(form.get("id") || "");
  const file = form.get("file");
  if (!id || !(file instanceof File)) return NextResponse.json({ ok: false, error: "id_und_datei_pflicht" }, { status: 400 });
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ ok: false, error: "datei_zu_gross" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const path = await uploadBeleg(bytes, file.name, file.type);
  if (!path) return NextResponse.json({ ok: false, error: "upload_failed" }, { status: 500 });

  const saved = await updateAusgabe(id, { beleg_url: path });
  if (!saved) return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true, path });
}

export async function GET(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id") || "";
  const a = await getAusgabeById(id);
  const path = a?.beleg_url;
  if (!path) return NextResponse.json({ ok: false, error: "kein_beleg" }, { status: 404 });
  const url = await signedBelegUrl(path);
  if (!url) return NextResponse.json({ ok: false, error: "sign_failed" }, { status: 500 });
  return NextResponse.redirect(url);
}
