/**
 * /finanzen/bank — N26-Anbindung (GoCardless): Konto verbinden, Umsätze
 * synchronisieren, klassifizieren & mit Rechnungen/Ausgaben abgleichen.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listKonten, listTransaktionen, gcReady } from "@/lib/finanzen/bank";
import { listRechnungen } from "@/lib/finanzen/db";
import { listAusgaben } from "@/lib/finanzen/ausgaben";
import { ustVoranmeldung, euer, ruecklageEmpfehlung } from "@/lib/finanzen/steuern";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import BankView, { type KontoLite, type TxLite, type OffeneRechnung } from "@/components/finanzen/BankView";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Bank", robots: { index: false, follow: false } };

export default async function BankSeite() {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const jahr = new Date().getFullYear();

  const [konten, transaktionen, rechnungen, ausgaben] = await Promise.all([listKonten(), listTransaktionen(150), listRechnungen(), listAusgaben()]);

  const kontenLite: KontoLite[] = konten.map((k) => ({ id: k.id, iban: k.iban, name: k.name, status: k.status, last_sync: k.last_sync, consent_expires_at: k.consent_expires_at }));
  const txLite: TxLite[] = transaktionen.map((t) => ({ id: t.id, datum: t.datum, betrag: t.betrag, gegenname: t.gegenname, verwendungszweck: t.verwendungszweck, richtung: t.richtung, klassifiziert_als: t.klassifiziert_als }));
  const offene: OffeneRechnung[] = rechnungen
    .filter((r) => r.status === "offen" || r.status === "ueberfaellig")
    .map((r) => ({ id: r.id, nummer: r.nummer, kunde: r.kunde_firma || r.kunde_email || "—", brutto: r.brutto }));

  const verbunden = konten.length > 0;
  const saldo = transaktionen.reduce((s, t) => s + t.betrag, 0);
  const ustJahr = ustVoranmeldung(rechnungen, ausgaben, `${jahr}-01-01`, `${jahr}-12-31`);
  const rl = ruecklageEmpfehlung(euer(rechnungen, ausgaben, jahr).gewinn);
  const zukSteuern = Math.max(0, ustJahr.zahllast) + rl.empfohleneRuecklage;

  return (
    <FinanzShell section="bank" title="Bank">
      <div style={S.kpis}>
        <Card label="Guthaben" value={verbunden ? eur(saldo) : "—"} hint={verbunden ? "Hauptkonto N26" : "kein Konto verbunden"} />
        <Card label="Verfügbares" value={verbunden ? eur(saldo) : "—"} hint="abzgl. zukünftiger Steuern" />
        <Card label="Zukünftige Steuern" value={eur(zukSteuern)} hint="USt-Zahllast + ESt-Rücklage" warn />
      </div>
      <BankView gcReady={gcReady()} konten={kontenLite} transaktionen={txLite} offene={offene} />
    </FinanzShell>
  );
}

function Card({ label, value, hint, warn }: { label: string; value: string; hint: string; warn?: boolean }) {
  return (
    <div style={S.card}>
      <div style={S.cardLabel}>{label}</div>
      <div style={{ ...S.cardValue, color: warn ? "#b42318" : "#0a0a0a" }}>{value}</div>
      <div style={S.cardHint}>{hint}</div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  kpis: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 20 },
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "16px 18px" },
  cardLabel: { fontSize: 12.5, fontWeight: 600, color: "#71717a" },
  cardValue: { fontSize: 24, fontWeight: 800, margin: "6px 0 2px", letterSpacing: "-0.5px" },
  cardHint: { fontSize: 12, color: "#a1a1aa" },
};
