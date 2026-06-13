/**
 * /finanzen/bank — N26-Anbindung (GoCardless): Konto verbinden, Umsätze
 * synchronisieren, klassifizieren & mit Rechnungen/Ausgaben abgleichen.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listKonten, listTransaktionen, gcReady } from "@/lib/finanzen/bank";
import { listRechnungen } from "@/lib/finanzen/db";
import FinanzShell from "@/components/finanzen/FinanzShell";
import BankView, { type KontoLite, type TxLite, type OffeneRechnung } from "@/components/finanzen/BankView";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Bank", robots: { index: false, follow: false } };

export default async function BankSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");

  const [konten, transaktionen, rechnungen] = await Promise.all([listKonten(), listTransaktionen(150), listRechnungen()]);

  const kontenLite: KontoLite[] = konten.map((k) => ({ id: k.id, iban: k.iban, name: k.name, status: k.status, last_sync: k.last_sync, consent_expires_at: k.consent_expires_at }));
  const txLite: TxLite[] = transaktionen.map((t) => ({ id: t.id, datum: t.datum, betrag: t.betrag, gegenname: t.gegenname, verwendungszweck: t.verwendungszweck, richtung: t.richtung, klassifiziert_als: t.klassifiziert_als }));
  const offene: OffeneRechnung[] = rechnungen
    .filter((r) => r.status === "offen" || r.status === "ueberfaellig")
    .map((r) => ({ id: r.id, nummer: r.nummer, kunde: r.kunde_firma || r.kunde_email || "—", brutto: r.brutto }));

  return (
    <FinanzShell section="bank" title="Bank">
      <BankView gcReady={gcReady()} konten={kontenLite} transaktionen={txLite} offene={offene} />
    </FinanzShell>
  );
}
