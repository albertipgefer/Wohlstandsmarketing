/**
 * /finanzen/steuern — Accountable-Layout (WSM-Stil): violettes Banner (Gewinn +
 * geschätzte Einkommensteuer), Jahres-Tabs, Steuer-Verpflichtungen als Karten-Grid
 * pro Quartal + Jahresabschluss. Klick auf eine Karte → Detail (?art=…).
 * Berechnung + Report, KEINE ELSTER-Einreichung.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import { listRechnungen, type Rechnung } from "@/lib/finanzen/db";
import { listAusgaben, type Ausgabe } from "@/lib/finanzen/ausgaben";
import { ustVoranmeldung, euer, ruecklageEmpfehlung, zeitraum } from "@/lib/finanzen/steuern";
import { eur } from "@/lib/angebot/format";
import FinanzShell from "@/components/finanzen/FinanzShell";
import PrintButton from "@/components/finanzen/PrintButton";
import SteuerListe, { type SteuerGruppe } from "@/components/finanzen/SteuerListe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Steuern", robots: { index: false, follow: false } };

const HEBESATZ_DEFAULT = 4.0; // 400 % Gewerbesteuer-Hebesatz (Schätzung)

function gewerbesteuer(gewinn: number): { messbetrag: number; steuer: number; relevant: boolean } {
  const ertrag = Math.floor(Math.max(0, gewinn) / 100) * 100;
  if (ertrag <= 24500) return { messbetrag: 0, steuer: 0, relevant: false };
  const messbetrag = Math.round((ertrag - 24500) * 0.035 * 100) / 100;
  return { messbetrag, steuer: Math.round(messbetrag * HEBESATZ_DEFAULT * 100) / 100, relevant: true };
}

export default async function SteuernSeite({ searchParams }: { searchParams: Promise<{ jahr?: string; art?: string; z?: string }> }) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const sp = await searchParams;
  const now = new Date();
  const jahr = Number(sp.jahr) || now.getFullYear();

  const [rechnungen, ausgaben] = await Promise.all([listRechnungen(), listAusgaben()]);
  const e = euer(rechnungen, ausgaben, jahr);
  const rl = ruecklageEmpfehlung(e.gewinn);
  const gewSt = gewerbesteuer(e.gewinn);

  if (sp.art) {
    return <Detail art={sp.art} z={sp.z} jahr={jahr} rechnungen={rechnungen} ausgaben={ausgaben} gewSt={gewSt} />;
  }

  const ustQ = (["q1", "q2", "q3", "q4"] as const).map((q) => {
    const zr = zeitraum(jahr, q);
    return ustVoranmeldung(rechnungen, ausgaben, zr.von, zr.bis).zahllast;
  });
  const jahrU = ustVoranmeldung(rechnungen, ausgaben, `${jahr}-01-01`, `${jahr}-12-31`);
  const estVz = Math.round((rl.einkommensteuerSchaetzung / 4) * 100) / 100;
  const gewVz = Math.round((gewSt.steuer / 4) * 100) / 100;

  const gewStFaellig = [`${jahr}-02-15`, `${jahr}-05-15`, `${jahr}-08-15`, `${jahr}-11-15`];
  const estFaellig = [`${jahr}-03-10`, `${jahr}-06-10`, `${jahr}-09-10`, `${jahr}-12-10`];
  const ustFaellig = [`${jahr}-04-10`, `${jahr}-07-10`, `${jahr}-10-10`, `${jahr + 1}-01-10`];

  const gruppen: SteuerGruppe[] = [1, 2, 3, 4].map((nr) => {
    const i = nr - 1;
    return {
      titel: `${nr}. Quartal ${jahr}`,
      karten: [
        { id: `gewvz-${nr}`, title: "Gewerbesteuer-Vorauszahlung", betrag: gewVz, faelligISO: gewStFaellig[i], href: `/finanzen/steuern?jahr=${jahr}&art=gewst` },
        { id: `estvz-${nr}`, title: "Einkommensteuer-Vorauszahlung", betrag: estVz, faelligISO: estFaellig[i], href: `/finanzen/steuern?jahr=${jahr}&art=est` },
        { id: `ust-${nr}`, title: "Umsatzsteuer (USt.)", betrag: ustQ[i], faelligISO: ustFaellig[i], href: `/finanzen/steuern?jahr=${jahr}&art=ustva&z=q${nr}` },
      ],
    };
  });
  gruppen.push({
    titel: `Jahresabschluss ${jahr}`,
    karten: [
      { id: "euer", title: "EÜR", betrag: null, faelligISO: `${jahr + 1}-07-31`, href: `/finanzen/steuern?jahr=${jahr}&art=euer` },
      { id: "gewst-erkl", title: "Gewerbesteuererklärung", betrag: null, faelligISO: `${jahr + 1}-07-31`, href: `/finanzen/steuern?jahr=${jahr}&art=gewst` },
      { id: "est-erkl", title: "Einkommensteuererklärung", betrag: null, faelligISO: `${jahr + 1}-07-31`, href: `/finanzen/steuern?jahr=${jahr}&art=est` },
      { id: "ust-erkl", title: `Umsatzsteuererklärung für ${jahr}`, betrag: jahrU.zahllast, faelligISO: `${jahr + 1}-07-31`, href: `/finanzen/steuern?jahr=${jahr}&art=ustjahr` },
      { id: "zahlung-est", title: "Zahlung Einkommensteuer", betrag: rl.einkommensteuerSchaetzung, faelligISO: null, href: `/finanzen/steuern?jahr=${jahr}&art=est` },
    ],
  });

  const banner = (
    <div style={S.band}>
      <div style={S.bandTitle}>✌︎ Steuern</div>
      <div style={S.bandKpi}>
        <div style={S.bandLabel}>Gewinn in {jahr}</div>
        <div style={S.bandValue}>{eur(e.gewinn)}</div>
      </div>
      <div style={S.bandKpi}>
        <div style={S.bandLabel}>Bisherige Einkommensteuer</div>
        <div style={S.bandValue}>{eur(rl.einkommensteuerSchaetzung)}</div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }} className="no-print">
        <a href={`/api/finanzen/steuern/export?jahr=${jahr}`} style={S.bandBtn} title="CSV-Export">⬇</a>
      </div>
    </div>
  );

  return (
    <FinanzShell section="steuern" title="Steuern" banner={banner}>
      <div style={S.tabs} className="no-print">
        {[now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2].map((y) => (
          <Link key={y} href={`/finanzen/steuern?jahr=${y}`} className={y === jahr ? "fin-pill on" : "fin-pill"}>{y}</Link>
        ))}
        <PrintButton label="PDF" />
      </div>

      <SteuerListe gruppen={gruppen} />

      <p style={S.note}>
        Alle Werte werden automatisch aus deinen Ein- und Ausgaben berechnet (Regelbesteuerung 19 %, Ist-Besteuerung) und sind eine
        Orientierung — kein Steuerbescheid. Mit Überprüfen öffnest du die Detailansicht mit den Zahlen fürs ELSTER-Portal. Die ELSTER-Direkteinreichung folgt als eigene Phase.
      </p>
    </FinanzShell>
  );
}

// ---------- Detail ----------
function Detail({ art, z, jahr, rechnungen, ausgaben, gewSt }: { art: string; z?: string; jahr: number; rechnungen: Rechnung[]; ausgaben: Ausgabe[]; gewSt: { messbetrag: number; steuer: number; relevant: boolean } }) {
  const e = euer(rechnungen, ausgaben, jahr);
  const rl = ruecklageEmpfehlung(e.gewinn);
  let titel = "Steuer-Detail";
  const rows: { label: string; value: string; stark?: boolean; warn?: boolean }[] = [];

  if (art === "ustva" && z) {
    const zr = zeitraum(jahr, z);
    const u = ustVoranmeldung(rechnungen, ausgaben, zr.von, zr.bis);
    titel = `USt-Voranmeldung · ${zr.label}`;
    rows.push(
      { label: "Bemessungsgrundlage 19 % (Kz. 81)", value: eur(u.umsatzNetto) },
      { label: "Umsatzsteuer (Kz. 81)", value: eur(u.ustEingenommen) },
      { label: "abziehbare Vorsteuer (Kz. 66)", value: `− ${eur(u.vorsteuer)}` },
      { label: u.zahllast >= 0 ? "Zahllast (Kz. 83)" : "Erstattung", value: eur(Math.abs(u.zahllast)), stark: true, warn: u.zahllast > 0 },
    );
  } else if (art === "ustjahr") {
    const u = ustVoranmeldung(rechnungen, ausgaben, `${jahr}-01-01`, `${jahr}-12-31`);
    titel = `Umsatzsteuererklärung ${jahr}`;
    rows.push(
      { label: "Umsätze 19 % netto (Jahr)", value: eur(u.umsatzNetto) },
      { label: "Umsatzsteuer", value: eur(u.ustEingenommen) },
      { label: "Vorsteuer", value: `− ${eur(u.vorsteuer)}` },
      { label: "verbleibende Zahllast", value: eur(Math.abs(u.zahllast)), stark: true, warn: u.zahllast > 0 },
    );
  } else if (art === "euer") {
    titel = `EÜR / Jahresabschluss ${jahr}`;
    rows.push(
      { label: "Betriebseinnahmen (netto)", value: eur(e.einnahmenNetto) },
      { label: "Betriebsausgaben (netto)", value: `− ${eur(e.ausgabenNetto)}` },
      { label: "Gewinn vor Steuern", value: eur(e.gewinn), stark: true },
    );
  } else if (art === "est") {
    titel = `Einkommensteuer ${jahr}`;
    rows.push(
      { label: "zu versteuerndes Einkommen (≈ Gewinn)", value: eur(e.gewinn) },
      { label: `Einkommensteuer (Grundtarif, Ø ${rl.durchschnittssatz}%)`, value: eur(rl.einkommensteuerSchaetzung), stark: true, warn: true },
    );
  } else if (art === "gewst") {
    titel = `Gewerbesteuer ${jahr}`;
    if (!gewSt.relevant) {
      rows.push({ label: "Gewinn unter Freibetrag (24.500 €)", value: "keine Gewerbesteuer", stark: true });
    } else {
      rows.push(
        { label: "Gewerbeertrag", value: eur(e.gewinn) },
        { label: "− Freibetrag", value: "− 24.500,00 €" },
        { label: "Steuermessbetrag (3,5 %)", value: eur(gewSt.messbetrag) },
        { label: "Gewerbesteuer (Hebesatz 400 %, Schätzung)", value: eur(gewSt.steuer), stark: true, warn: true },
      );
    }
  }

  return (
    <FinanzShell section="steuern" title="Steuern">
      <Link href={`/finanzen/steuern?jahr=${jahr}`} style={{ ...S.ghostBtn, display: "inline-block", marginBottom: 16 }}>← Zurück zur Übersicht</Link>
      <div style={S.card}>
        <div style={S.cardHead}>{titel}</div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < rows.length - 1 ? "1px solid #f4f4f5" : "none" }}>
            <span style={{ fontSize: r.stark ? 14.5 : 14, color: r.stark ? "#0a0a0a" : "#52525b", fontWeight: r.stark ? 700 : 500 }}>{r.label}</span>
            <span style={{ fontSize: r.stark ? 18 : 14, fontWeight: r.stark ? 800 : 600, color: r.warn ? "#b42318" : "#0a0a0a" }}>{r.value}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 10 }} className="no-print">
        <a href={`/api/finanzen/steuern/export?jahr=${jahr}`} style={S.ghostBtn}>⬇ CSV-Export</a>
        <PrintButton />
      </div>
      <p style={S.note}>Diese Zahlen überträgst du ins ELSTER-Online-Portal. Die Direkteinreichung aus dem Tool folgt als spätere Phase.</p>
    </FinanzShell>
  );
}

const S: Record<string, React.CSSProperties> = {
  band: { background: "linear-gradient(90deg,#cdbdf6,#dcd2f8)", border: "1px solid #c3b3ef", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" },
  bandTitle: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", color: "#2c1a55" },
  bandKpi: {},
  bandLabel: { fontSize: 12.5, color: "#4a3a78", fontWeight: 600 },
  bandValue: { fontSize: 24, fontWeight: 800, color: "#2c1a55", marginTop: 2 },
  bandBtn: { width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.7)", color: "#4a3a78", display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: 16, fontWeight: 700 },
  tabs: { display: "flex", gap: 8, alignItems: "center", margin: "18px 0" },
  note: { fontSize: 12.5, color: "#a1a1aa", marginTop: 16, lineHeight: 1.55, maxWidth: 820 },
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "18px 22px" },
  cardHead: { fontSize: 15, fontWeight: 800, color: "#0a0a0a", marginBottom: 8 },
  ghostBtn: { background: "#fff", color: "#1663de", border: "1px solid #1663de", borderRadius: 9, padding: "9px 16px", fontSize: 14, fontWeight: 700, textDecoration: "none" },
};
