/**
 * /finanzen/preisliste — wiederverwendbare Leistungen/Produkte (Accountable-Stil).
 * Login-geschützt. Positionen lassen sich beim Erstellen von Rechnungen auswählen.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listPreisliste } from "@/lib/finanzen/preisliste";
import { listRechnungen } from "@/lib/finanzen/db";
import { umsatzKpis, quartalLabel } from "@/lib/finanzen/einnahmen-kpis";
import FinanzShell from "@/components/finanzen/FinanzShell";
import EinnahmenBanner from "@/components/finanzen/EinnahmenBanner";
import PreislisteManager, { type PreisZeile } from "@/components/finanzen/PreislisteManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Preisliste", robots: { index: false, follow: false } };

export default async function PreislisteSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const now = new Date();
  const [positionen, rechnungen] = await Promise.all([listPreisliste(), listRechnungen()]);
  const kpi = umsatzKpis(rechnungen, now);
  const zeilen: PreisZeile[] = positionen.map((p) => ({
    id: p.id, bezeichnung: p.bezeichnung, beschreibung: p.beschreibung,
    preis_netto: p.preis_netto, ust_satz: p.ust_satz, einheit: p.einheit, aktiv: p.aktiv,
  }));

  const banner = (
    <EinnahmenBanner
      title="Preisliste"
      jahr={now.getFullYear()}
      quartalLabel={quartalLabel(now)}
      umsatzJahrNetto={kpi.jahr}
      umsatzQuartalNetto={kpi.quartal}
    />
  );

  return (
    <FinanzShell section="einnahmen" subTab="preisliste" title="Preisliste" banner={banner}>
      <PreislisteManager positionen={zeilen} />
    </FinanzShell>
  );
}
