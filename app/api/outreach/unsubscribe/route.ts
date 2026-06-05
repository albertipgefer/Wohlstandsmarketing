/**
 * GET /api/outreach/unsubscribe?token=...
 * One-Click-Abmeldung für Cold-Outreach. Verifiziert HMAC-Token, setzt den
 * Prospect auf status=unsubscribed, loggt das Event und zeigt eine Bestätigung.
 *
 * Required ENV: OUTREACH_UNSUB_SECRET, SUPABASE_URL, SUPABASE_SERVICE_KEY
 */
import { NextRequest } from "next/server";
import { verifyUnsubToken } from "@/lib/outreach-token";
import { setStatusByEmail, logEvent } from "@/lib/outreach-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(title: string, message: string): Response {
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — Wohlstandsmarketing</title>
<style>
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
       background:#FAFAFA;color:#0A0A0A;display:flex;min-height:100vh;align-items:center;justify-content:center;}
  .card{max-width:480px;margin:24px;background:#fff;border:1px solid #ececec;border-radius:16px;
        padding:40px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.05);}
  h1{font-size:22px;margin:0 0 12px;color:#1663DE;}
  p{font-size:15px;line-height:1.6;color:#525252;margin:0;}
  a{color:#1663DE;}
</style></head><body><div class="card"><h1>${title}</h1><p>${message}</p>
<p style="margin-top:20px;font-size:13px;color:#a3a3a3;">Wohlstandsmarketing · <a href="https://wohlstandsmarketing.de">wohlstandsmarketing.de</a></p>
</div></body></html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const email = verifyUnsubToken(token);
  if (!email) {
    return page("Link ungültig", "Dieser Abmeldelink ist ungültig oder abgelaufen.");
  }
  const id = await setStatusByEmail(email, "unsubscribed");
  if (id) await logEvent(id, "unsubscribe", {});
  return page(
    "Sie sind abgemeldet",
    "Sie erhalten ab sofort keine weiteren Nachrichten von uns. Danke für Ihre Zeit — und falls es doch ein Versehen war, antworten Sie einfach kurz auf eine unserer Mails.",
  );
}
