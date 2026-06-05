/**
 * GET /api/outreach/pixel?pid=<uuid> — Open-Tracking-Pixel der Cold-Mail.
 * Liefert ein 1x1-transparentes GIF und loggt ein "open"-Event (mit A/B-Arm +
 * Sequenz-Schritt des Leads). Eindeutige Öffnungen werden beim Auslesen je
 * Prospect zusammengefasst (openStats), Mehrfach-Laden bläht die Quote nicht auf.
 *
 * Hinweis: Open-Rate ist durch Auto-Bildladen (Apple Mail / Gmail) absolut
 * ungenau — sinnvoll v. a. für den RELATIVEN Betreff-Vergleich (A/B).
 */
import { NextRequest, NextResponse } from "next/server";
import { logEvent, getProspectById } from "@/lib/outreach-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// 1x1 transparentes GIF
const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

export async function GET(req: NextRequest) {
  const pid = req.nextUrl.searchParams.get("pid") || "";
  if (UUID.test(pid)) {
    try {
      const p = await getProspectById(pid);
      await logEvent(pid, "open", {
        ab_arm: p?.ab_arm ?? undefined,
        sequence_step: typeof p?.sequence_step === "number" ? p.sequence_step : undefined,
      });
    } catch {
      /* nie blockierend — Pixel muss immer ausgeliefert werden */
    }
  }
  return new NextResponse(GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": String(GIF.length),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
    },
  });
}
