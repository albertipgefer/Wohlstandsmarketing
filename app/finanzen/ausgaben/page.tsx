/**
 * /finanzen/ausgaben — Betriebsausgaben erfassen & verwalten (für die
 * Gewinn-Übersicht). Schnelle Erfassung oben, Liste darunter (mit Löschen).
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listAusgaben, ausgabenJahr } from "@/lib/finanzen/ausgaben";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import AusgabenManager, { type AusgabeZeile } from "@/components/finanzen/AusgabenManager";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {
  title: "Finanzen — Ausgaben",
  robots: { index: false, follow: false },
};

export default async function AusgabenSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const jahr = new Date().getFullYear();
  const ausgaben = await listAusgaben();
  const { netto } = ausgabenJahr(ausgaben, jahr);

  const zeilen: AusgabeZeile[] = ausgaben.map((a) => ({
    id: a.id,
    datum: a.datum,
    lieferant: a.lieferant,
    beschreibung: a.beschreibung,
    kategorie: a.kategorie,
    betrag_netto: a.betrag_netto,
    betrag_brutto: a.betrag_brutto,
    ust_satz: a.betrag_netto > 0 ? Math.round((a.ust / a.betrag_netto) * 100) : 19,
    bezahlt: a.bezahlt,
    beleg_url: a.beleg_url,
  }));

  return (
    <FinanzShell section="ausgaben" title="Ausgaben">
      <div style={{ marginBottom: 14, fontSize: 14, color: "#52525b" }}>
        Ausgaben {jahr} (netto): <strong style={{ color: "#0a0a0a" }}>{eur(netto)}</strong>
      </div>
      <AusgabenManager ausgaben={zeilen} />
    </FinanzShell>
  );
}
