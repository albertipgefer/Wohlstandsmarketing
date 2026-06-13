/**
 * /finanzen/steuern — USt-Voranmeldung, EÜR, Gewinnermittlung, Steuer-Rücklage
 * (Regelbesteuerung 19 %, Ist-Besteuerung). Berechnung + Report; KEINE
 * ELSTER-Einreichung (separate Phase). Zeitraum über Query-Params.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listRechnungen } from "@/lib/finanzen/db";
import { listAusgaben } from "@/lib/finanzen/ausgaben";
import { ustVoranmeldung, euer, ruecklageEmpfehlung, zeitraum } from "@/lib/finanzen/steuern";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import PrintButton from "@/components/finanzen/PrintButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Steuern", robots: { index: false, follow: false } };

const ZEITRAEUME = [
  { key: "jahr", label: "Jahr" },
  { key: "q1", label: "Q1" },
  { key: "q2", label: "Q2" },
  { key: "q3", label: "Q3" },
  { key: "q4", label: "Q4" },
];

export default async function SteuernSeite({ searchParams }: { searchParams: Promise<{ jahr?: string; z?: string }> }) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const sp = await searchParams;
  const jahr = Number(sp.jahr) || new Date().getFullYear();
  const z = sp.z || "q" + (Math.floor(new Date().getMonth() / 3) + 1);

  const [rechnungen, ausgaben] = await Promise.all([listRechnungen(), listAusgaben()]);

  const zr = zeitraum(jahr, z);
  const ust = ustVoranmeldung(rechnungen, ausgaben, zr.von, zr.bis);
  const e = euer(rechnungen, ausgaben, jahr);
  const rl = ruecklageEmpfehlung(e.gewinn);

  const action = (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <a href={`/api/finanzen/steuern/export?jahr=${jahr}`} style={S.ghostBtn}>⬇ CSV-Export</a>
      <PrintButton />
    </div>
  );

  return (
    <FinanzShell section="steuern" title="Steuern" action={action}>
      <div style={S.note}>
        Regelbesteuerung 19 %, Ist-Besteuerung (USt bei Zahlungseingang). Berechnung &amp; Report —
        die Einreichung erfolgt aktuell über das ELSTER-Online-Portal. Alle Werte sind Orientierung, kein Steuerbescheid.
      </div>

      {/* Jahr + Zeitraum-Auswahl */}
      <div style={S.controls} className="no-print">
        <div style={S.years}>
          {[jahr + 1, jahr, jahr - 1].filter((y, i, a) => a.indexOf(y) === i).sort((a, b) => b - a).map((y) => (
            <Link key={y} href={`/finanzen/steuern?jahr=${y}&z=${z}`} className={y === jahr ? "fin-pill on" : "fin-pill"}>{y}</Link>
          ))}
        </div>
        <div style={S.years}>
          {ZEITRAEUME.map((t) => (
            <Link key={t.key} href={`/finanzen/steuern?jahr=${jahr}&z=${t.key}`} className={t.key === z ? "fin-pill on" : "fin-pill"}>{t.label}</Link>
          ))}
        </div>
      </div>

      <div className="fin-twocol">
        {/* USt-Voranmeldung */}
        <div style={S.card}>
          <div style={S.cardHead}>USt-Voranmeldung · {zr.label}</div>
          <Zeile label="Umsatz netto (19 %)" value={eur(ust.umsatzNetto)} />
          <Zeile label="Umsatzsteuer" value={eur(ust.ustEingenommen)} />
          <Zeile label="abziehbare Vorsteuer" value={`− ${eur(ust.vorsteuer)}`} />
          <Zeile label={ust.zahllast >= 0 ? "Zahllast ans Finanzamt" : "Erstattung"} value={eur(Math.abs(ust.zahllast))} stark warn={ust.zahllast > 0} />
        </div>

        {/* EÜR / Gewinn */}
        <div style={S.card}>
          <div style={S.cardHead}>EÜR / Gewinnermittlung · Jahr {jahr}</div>
          <Zeile label="Betriebseinnahmen (netto)" value={eur(e.einnahmenNetto)} />
          <Zeile label="Betriebsausgaben (netto)" value={`− ${eur(e.ausgabenNetto)}`} />
          <Zeile label="Gewinn vor Steuern" value={eur(e.gewinn)} stark />
        </div>
      </div>

      {/* Rücklage */}
      <div style={{ ...S.card, marginTop: 16 }}>
        <div style={S.cardHead}>Steuer-Rücklage (Einkommensteuer-Schätzung {jahr})</div>
        <Zeile label="Gewinn (Bemessung)" value={eur(rl.gewinn)} />
        <Zeile label={`geschätzte Einkommensteuer (Ø ${rl.durchschnittssatz}%)`} value={eur(rl.einkommensteuerSchaetzung)} />
        <Zeile label="empfohlene Rücklage" value={eur(rl.empfohleneRuecklage)} stark warn />
        <p style={S.small}>
          Grundtarif §32a EStG 2025, vereinfacht (ohne weitere Einkünfte, Vorsorgeaufwendungen, Soli/Kirchensteuer).
          Für die genaue Zahl bleibt die Steuererklärung bzw. dein Steuerberater maßgeblich.
        </p>
      </div>
    </FinanzShell>
  );
}

function Zeile({ label, value, stark, warn }: { label: string; value: string; stark?: boolean; warn?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f4f4f5" }}>
      <span style={{ fontSize: stark ? 14.5 : 14, color: stark ? "#0a0a0a" : "#52525b", fontWeight: stark ? 700 : 500 }}>{label}</span>
      <span style={{ fontSize: stark ? 17 : 14, fontWeight: stark ? 800 : 600, color: warn ? "#b42318" : "#0a0a0a" }}>{value}</span>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  note: { background: "#f4f6fb", border: "1px solid #e4e9f5", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#3f3f46", marginBottom: 18, lineHeight: 1.55 },
  controls: { display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 18 },
  years: { display: "inline-flex", gap: 6, flexWrap: "wrap" },
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "18px 20px" },
  cardHead: { fontSize: 14, fontWeight: 700, color: "#27272a", marginBottom: 10 },
  small: { fontSize: 12, color: "#a1a1aa", marginTop: 10, lineHeight: 1.5 },
  ghostBtn: { background: "#fff", color: "#1663de", border: "1px solid #1663de", borderRadius: 9, padding: "9px 16px", fontSize: 14, fontWeight: 700, textDecoration: "none" },
};
