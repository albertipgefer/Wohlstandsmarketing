/**
 * /finanzen/rechnungen — Rechnungsliste (login-geschützt). Zeigt alle Rechnungen
 * mit Status, Fälligkeit, Betrag + Aktionen (Senden / Bezahlt / Mahnung).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listRechnungen, type RechnungStatus } from "@/lib/finanzen/db";
import { umsatzKpis, quartalLabel, bannerAction } from "@/lib/finanzen/einnahmen-kpis";
import FinanzShell from "@/components/finanzen/FinanzShell";
import EinnahmenBanner from "@/components/finanzen/EinnahmenBanner";
import RechnungenListe, { type RechnungZeile } from "@/components/finanzen/RechnungenListe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Einnahmen",
  robots: { index: false, follow: false },
};

function effektiverStatus(status: RechnungStatus, faellig: string | null, heute: string): RechnungStatus {
  if (status === "offen" && faellig !== null && faellig < heute) return "ueberfaellig";
  return status;
}

const TYP_LABEL: Record<string, string> = { rechnung: "Rechnung", abschlag: "Abschlag", schluss: "Schlussrechnung", storno: "Storno" };

export default async function RechnungenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const now = new Date();
  const heute = now.toISOString().slice(0, 10);
  const rechnungen = await listRechnungen();
  const kpi = umsatzKpis(rechnungen, now);

  const zeilen: RechnungZeile[] = rechnungen.map((r) => ({
    id: r.id,
    nummer: r.nummer,
    typ: TYP_LABEL[r.typ] || "Rechnung",
    kunde_firma: r.kunde_firma,
    kunde_email: r.kunde_email,
    brutto: r.brutto,
    datum: r.rechnungsdatum || r.created_at,
    status: effektiverStatus(r.status, r.faellig_am, heute),
    faellig_am: r.faellig_am,
    mahnstufe: r.mahnstufe,
    public_token: r.public_token,
  }));

  const banner = (
    <EinnahmenBanner
      title="Einnahmen"
      jahr={now.getFullYear()}
      quartalLabel={quartalLabel(now)}
      umsatzJahrNetto={kpi.jahr}
      umsatzQuartalNetto={kpi.quartal}
      action={<Link href="/finanzen/rechnungen/neu" style={bannerAction}>+ Rechnung erstellen</Link>}
    />
  );

  return (
    <FinanzShell section="einnahmen" subTab="rechnungen" title="Einnahmen" banner={banner}>
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
};
