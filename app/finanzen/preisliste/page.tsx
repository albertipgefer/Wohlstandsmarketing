/**
 * /finanzen/preisliste — wiederverwendbare Leistungen/Produkte (Accountable-Stil).
 * Login-geschützt. Positionen lassen sich beim Erstellen von Rechnungen auswählen.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listPreisliste } from "@/lib/finanzen/preisliste";
import FinanzShell from "@/components/finanzen/FinanzShell";
import PreislisteManager, { type PreisZeile } from "@/components/finanzen/PreislisteManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Preisliste", robots: { index: false, follow: false } };

export default async function PreislisteSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const positionen = await listPreisliste();
  const zeilen: PreisZeile[] = positionen.map((p) => ({
    id: p.id, bezeichnung: p.bezeichnung, beschreibung: p.beschreibung,
    preis_netto: p.preis_netto, ust_satz: p.ust_satz, einheit: p.einheit, aktiv: p.aktiv,
  }));

  return (
    <FinanzShell section="einnahmen" subTab="preisliste" title="Preisliste">
      <PreislisteManager positionen={zeilen} />
    </FinanzShell>
  );
}
