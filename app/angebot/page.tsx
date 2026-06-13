/**
 * /angebot — Angebote-Liste (login-geschützt) im Finanz-Modul-Rahmen.
 * Editor liegt unter /angebot/neu (neu) bzw. /angebot/neu?id=… (bearbeiten).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAngebote, dbReady } from "@/lib/angebot/db";
import { listRechnungen } from "@/lib/finanzen/db";
import FinanzShell from "@/components/finanzen/FinanzShell";
import AngeboteListe, { type AngebotZeile } from "@/components/finanzen/AngeboteListe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Angebote",
  robots: { index: false, follow: false },
};

export default async function AngebotDashboard() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const [angebote, rechnungen] = await Promise.all([listAngebote(), listRechnungen()]);
  const angebotIdsMitRechnung = new Set(
    rechnungen.map((r) => r.angebot_id).filter(Boolean) as string[],
  );

  const zeilen: AngebotZeile[] = angebote.map((a) => ({
    id: a.id,
    nummer: a.nummer,
    kunde_firma: a.kunde_firma,
    kunde_email: a.kunde_email,
    brutto: a.brutto,
    status: a.status,
    gueltig_bis: a.gueltig_bis,
    created_at: a.created_at,
    public_token: a.public_token,
    abrechenbar: a.status === "angenommen" && !angebotIdsMitRechnung.has(a.id),
  }));

  const action = (
    <Link href="/angebot/neu" style={S.newBtn}>+ Neues Angebot</Link>
  );

  return (
    <FinanzShell section="einnahmen" subTab="angebote" title="Angebote" action={action}>
      {!dbReady() && (
        <div style={S.warn}>
          ⚠️ Datenbank nicht verbunden (Env-Vars <code>ANGEBOT_SUPABASE_URL</code> /
          <code>ANGEBOT_SUPABASE_SERVICE_KEY</code> fehlen).
        </div>
      )}

      {angebote.length === 0 ? (
        <div style={S.empty}>
          Noch keine Angebote. Klick auf <strong>+ Neues Angebot</strong>, um loszulegen.
        </div>
      ) : (
        <AngeboteListe angebote={zeilen} />
      )}
    </FinanzShell>
  );
}

const S: Record<string, React.CSSProperties> = {
  newBtn: { background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700 },
  warn: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", borderRadius: 10, padding: "12px 16px", fontSize: 13.5, marginBottom: 20, lineHeight: 1.5 },
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15 },
};
