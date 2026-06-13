/**
 * /finanzen/rechnungen — Rechnungsliste (login-geschützt). Zeigt alle Rechnungen
 * mit Status, Fälligkeit, Betrag + Aktionen (Senden / Bezahlt / Mahnung).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listRechnungen, type RechnungStatus } from "@/lib/finanzen/db";
import FinanzShell from "@/components/finanzen/FinanzShell";
import RechnungenListe, { type RechnungZeile } from "@/components/finanzen/RechnungenListe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Rechnungen",
  robots: { index: false, follow: false },
};

function effektiverStatus(status: RechnungStatus, faellig: string | null, heute: string): RechnungStatus {
  if (status === "offen" && faellig !== null && faellig < heute) return "ueberfaellig";
  return status;
}

export default async function RechnungenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const heute = new Date().toISOString().slice(0, 10);
  const rechnungen = await listRechnungen();

  const zeilen: RechnungZeile[] = rechnungen.map((r) => ({
    id: r.id,
    nummer: r.nummer,
    kunde_firma: r.kunde_firma,
    kunde_email: r.kunde_email,
    brutto: r.brutto,
    status: effektiverStatus(r.status, r.faellig_am, heute),
    faellig_am: r.faellig_am,
    mahnstufe: r.mahnstufe,
    public_token: r.public_token,
  }));

  const action = (
    <Link href="/finanzen/rechnungen/neu" style={S.newBtn}>+ Neue Rechnung</Link>
  );

  return (
    <FinanzShell section="einnahmen" subTab="rechnungen" title="Rechnungen" action={action}>
      {rechnungen.length === 0 ? (
        <div style={S.empty}>
          Noch keine Rechnungen. Sobald ein Angebot angenommen wird, entsteht hier
          automatisch ein <strong>Rechnungs-Entwurf</strong>.
        </div>
      ) : (
        <RechnungenListe rechnungen={zeilen} />
      )}
    </FinanzShell>
  );
}

const S: Record<string, React.CSSProperties> = {
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15, lineHeight: 1.6 },
  newBtn: { background: "#1663de", color: "#fff", textDecoration: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700 },
};
