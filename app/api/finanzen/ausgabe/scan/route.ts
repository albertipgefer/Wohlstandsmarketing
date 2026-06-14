/**
 * POST /api/finanzen/ausgabe/scan — Beleg (Foto/PDF) hochladen, per KI auslesen
 * und die erkannten Felder + die gespeicherte Beleg-URL zurückgeben.
 * Speichert NICHT die Ausgabe selbst — das macht Albert nach Prüfung im Formular.
 * Body: multipart/form-data mit Feld "datei".
 */
export const runtime = "nodejs";
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { scanBeleg, scanReady } from "@/lib/finanzen/beleg-scan";
import { uploadBeleg, signedBelegUrl, storageReady } from "@/lib/finanzen/storage";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const ERLAUBT = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!scanReady()) return NextResponse.json({ ok: false, error: "ki_not_configured" }, { status: 503 });

  let datei: File | null = null;
  try {
    const form = await req.formData();
    datei = form.get("datei") as File | null;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!datei) return NextResponse.json({ ok: false, error: "missing_file" }, { status: 400 });
  if (datei.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });

  const mediaType = datei.type || "application/octet-stream";
  if (!ERLAUBT.includes(mediaType)) return NextResponse.json({ ok: false, error: "unsupported_type" }, { status: 415 });

  const bytes = await datei.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  let scan;
  try {
    scan = await scanBeleg(base64, mediaType);
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "scan_failed" }, { status: 502 });
  }
  if (!scan) return NextResponse.json({ ok: false, error: "no_data" }, { status: 422 });

  // Beleg in Storage ablegen: Pfad zum Speichern an der Ausgabe (beleg_url),
  // signierte URL nur für die Sofort-Vorschau.
  let belegPath: string | null = null;
  let belegVorschau: string | null = null;
  if (storageReady()) {
    const ext = mediaType === "application/pdf" ? "pdf" : (mediaType.split("/")[1] || "bin");
    const name = `beleg-${Date.now()}.${ext}`;
    belegPath = await uploadBeleg(bytes, name, mediaType);
    if (belegPath) belegVorschau = await signedBelegUrl(belegPath);
  }

  return NextResponse.json({ ok: true, felder: scan, belegPath, belegVorschau });
}
