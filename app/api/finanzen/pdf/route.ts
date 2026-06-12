/**
 * GET /api/finanzen/pdf — echtes PDF für Angebot oder Rechnung.
 * Zugänge:
 *   ?rechnung=<id>        (login-geschützt)
 *   ?rechnungToken=<tok>  (öffentlich, für Kunden)
 *   ?angebot=<id>         (login-geschützt)
 *   ?angebotToken=<tok>   (öffentlich, für Kunden)
 */
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/angebot/auth";
import { getAngebotById, getAngebotByToken } from "@/lib/angebot/db";
import { getRechnungById, getRechnungByToken } from "@/lib/finanzen/db";
import {
  renderDokumentPdf,
  angebotToPdfDoc,
  rechnungToPdfDoc,
  type PdfDoc,
} from "@/lib/finanzen/pdf";

function pdfResponse(buf: Buffer, filename: string): NextResponse {
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const rId = sp.get("rechnung");
  const rTok = sp.get("rechnungToken");
  const aId = sp.get("angebot");
  const aTok = sp.get("angebotToken");

  let doc: PdfDoc | null = null;
  let filename = "dokument.pdf";

  try {
    if (rTok) {
      const r = await getRechnungByToken(rTok);
      if (!r) return NextResponse.json({ error: "not_found" }, { status: 404 });
      doc = rechnungToPdfDoc(r);
      filename = `Rechnung-${r.nummer || r.id}.pdf`;
    } else if (aTok) {
      const a = await getAngebotByToken(aTok);
      if (!a) return NextResponse.json({ error: "not_found" }, { status: 404 });
      doc = angebotToPdfDoc(a);
      filename = `Angebot-${a.nummer || a.id}.pdf`;
    } else if (rId || aId) {
      // ID-Zugriff nur eingeloggt
      if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      if (rId) {
        const r = await getRechnungById(rId);
        if (!r) return NextResponse.json({ error: "not_found" }, { status: 404 });
        doc = rechnungToPdfDoc(r);
        filename = `Rechnung-${r.nummer || r.id}.pdf`;
      } else if (aId) {
        const a = await getAngebotById(aId);
        if (!a) return NextResponse.json({ error: "not_found" }, { status: 404 });
        doc = angebotToPdfDoc(a);
        filename = `Angebot-${a.nummer || a.id}.pdf`;
      }
    } else {
      return NextResponse.json({ error: "missing_param" }, { status: 400 });
    }

    if (!doc) return NextResponse.json({ error: "not_found" }, { status: 404 });
    const buf = await renderDokumentPdf(doc);
    return pdfResponse(buf, filename);
  } catch (e) {
    return NextResponse.json(
      { error: "pdf_failed", detail: e instanceof Error ? e.message : "unknown" },
      { status: 500 },
    );
  }
}
