/**
 * /finanzen/steuern — Accountable-Stil: oben Gewinn + geschätzte Einkommensteuer,
 * darunter die Liste der Steuer-Erklärungen (USt-Voranmeldungen Q1–Q4,
 * Umsatzsteuererklärung, EÜR/Jahresabschluss, Einkommensteuer, Gewerbesteuer).
 * Klick auf eine Zeile → Detail (?art=…). Berechnung + Report, KEINE ELSTER-Einreichung.
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

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = { title: "Finanzen — Steuern", robots: { index: false, follow: false } };

const GEWST_HEBESATZ = 0.0; // Gemeinde-Hebesatz unbekannt → unten als Hinweis; Default 400 % nur als Schätzung
const HEBESATZ_DEFAULT = 4.0; // 400 %

function gewerbesteuer(gewinn: number): { messbetrag: number; steuer: number; relevant: boolean } {
  const ertrag = Math.floor(Math.max(0, gewinn) / 100) * 100;
  if (ertrag <= 24500) return { messbetrag: 0, steuer: 0, relevant: false };
  const messbetrag = Math.round((ertrag - 24500) * 0.035 * 100) / 100;
  const hebe = GEWST_HEBESATZ || HEBESATZ_DEFAULT;
  return { messbetrag, steuer: Math.round(messbetrag * hebe * 100) / 100, relevant: true };
}

export default async function SteuernSeite({ searchParams }: { searchParams: Promise<{ jahr?: string; art?: string; z?: string }> }) {
  if (!(await isLoggedIn())) redirect("/angebot/login");
  const sp = await searchParams;
  const now = new Date();
  const jahr = Number(sp.jahr) || now.getFullYear();

  const [rechnungen, ausgaben] = await Promise.all([listRechnungen(), listAusgaben()]);
  const e = euer(rechnungen, ausgaben, jahr);
  const rl = ruecklageEmpfehlung(e.gewinn);
  const jahrU = ustVoranmeldung(rechnungen, ausgaben, `${jahr}-01-01`, `${jahr}-12-31`);
  const gewSt = gewerbesteuer(e.gewinn);

  // Detail-Ansicht?
  if (sp.art) {
    return <Detail art={sp.art} z={sp.z} jahr={jahr} rechnungen={rechnungen} ausgaben={ausgaben} />;
  }

  const aktQ = Math.floor(now.getMonth() / 3) + 1;
  const ustQ = (["q1", "q2", "q3", "q4"] as const).map((q, i) => {
    const zr = zeitraum(jahr, q);
    const u = ustVoranmeldung(rechnungen, ausgaben, zr.von, zr.bis);
    return { key: q, nr: i + 1, label: `Umsatzsteuer-Voranmeldung Q${i + 1} ${jahr}`, betrag: u.zahllast, faellig: i + 1 < aktQ || jahr < now.getFullYear() };
  });

  const banner = (
    <div style={S.band}>
      <div>
        <div style={S.bandLabel}>Gewinn {jahr} (vorläufig)</div>
        <div style={S.bandValue}>{eur(e.gewinn)}</div>
      </div>
      <div>
        <div style={S.bandLabel}>geschätzte Einkommensteuer</div>
        <div style={S.bandValue}>{eur(rl.einkommensteuerSchaetzung)}</div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }} className="no-print">
        <a href={`/api/finanzen/steuern/export?jahr=${jahr}`} style={S.ghostBtn}>⬇ CSV</a>
        <PrintButton />
      </div>
    </div>
  );

  return (
    <FinanzShell section="steuern" title="Steuern" banner={banner}>
      <div style={S.years} className="no-print">
        {[now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2].map((y) => (
          <Link key={y} href={`/finanzen/steuern?jahr=${y}`} className={y === jahr ? "fin-pill on" : "fin-pill"}>{y}</Link>
        ))}
      </div>

      <div style={S.listCard}>
        <Gruppe titel="Umsatzsteuer-Voranmeldungen" />
        {ustQ.map((q) => (
          <FilingRow key={q.key} href={`/finanzen/steuern?jahr=${jahr}&art=ustva&z=${q.key}`} name={q.label} betrag={q.betrag} betragLabel={q.betrag >= 0 ? "Zahllast" : "Erstattung"} faellig={q.faellig} />
        ))}
        <Gruppe titel="Jahreserklärungen" />
        <FilingRow href={`/finanzen/steuern?jahr=${jahr}&art=ustjahr`} name={`Umsatzsteuererklärung ${jahr}`} betrag={jahrU.zahllast} betragLabel="Zahllast Jahr" />
        <FilingRow href={`/finanzen/steuern?jahr=${jahr}&art=euer`} name={`EÜR / Jahresabschluss ${jahr}`} betrag={e.gewinn} betragLabel="Gewinn" />
        <FilingRow href={`/finanzen/steuern?jahr=${jahr}&art=est`} name={`Einkommensteuererklärung ${jahr}`} betrag={rl.einkommensteuerSchaetzung} betragLabel="geschätzt" />
        <FilingRow
          href={`/finanzen/steuern?jahr=${jahr}&art=gewst`}
          name={`Gewerbesteuererklärung ${jahr}`}
          betrag={gewSt.relevant ? gewSt.steuer : 0}
          betragLabel={gewSt.relevant ? "geschätzt" : "unter Freibetrag"}
        />
      </div>

      <p style={S.note}>
        Regelbesteuerung 19 %, Ist-Besteuerung. Alle Werte werden automatisch aus deinen Ein- und Ausgaben berechnet und sind eine
        Orientierung (kein Steuerbescheid). Die Einreichung erfolgt aktuell über das ELSTER-Online-Portal — die ELSTER-Direkteinreichung folgt als eigene Phase.
      </p>
    </FinanzShell>
  );
}

// ---------- Detail ----------
function Detail({ art, z, jahr, rechnungen, ausgaben }: { art: string; z?: string; jahr: number; rechnungen: Rechnung[]; ausgaben: Ausgabe[] }) {
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
    titel = `Einkommensteuererklärung ${jahr}`;
    rows.push(
      { label: "zu versteuerndes Einkommen (≈ Gewinn)", value: eur(e.gewinn) },
      { label: `Einkommensteuer (Grundtarif, Ø ${rl.durchschnittssatz}%)`, value: eur(rl.einkommensteuerSchaetzung), stark: true, warn: true },
    );
  } else if (art === "gewst") {
    const g = gewerbesteuer(e.gewinn);
    titel = `Gewerbesteuererklärung ${jahr}`;
    if (!g.relevant) {
      rows.push({ label: "Gewinn unter Freibetrag (24.500 €)", value: "keine Gewerbesteuer", stark: true });
    } else {
      rows.push(
        { label: "Gewerbeertrag", value: eur(e.gewinn) },
        { label: "− Freibetrag", value: "− 24.500,00 €" },
        { label: "Steuermessbetrag (3,5 %)", value: eur(g.messbetrag) },
        { label: "Gewerbesteuer (Hebesatz 400 %, Schätzung)", value: eur(g.steuer), stark: true, warn: true },
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

function FilingRow({ href, name, betrag, betragLabel, faellig }: { href: string; name: string; betrag: number; betragLabel: string; faellig?: boolean }) {
  return (
    <Link href={href} style={S.row}>
      <span style={S.rowName}>{name}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ textAlign: "right" }}>
          <span style={S.rowAmount}>{eur(betrag)}</span>
          <span style={S.rowAmountLabel}>{betragLabel}</span>
        </span>
        {faellig ? <span style={{ ...S.badge, background: "#fff7ed", color: "#c2410c" }}>fällig</span> : <span style={{ ...S.badge, background: "#f4f4f5", color: "#71717a" }}>offen</span>}
        <span style={{ color: "#c4c4c4" }}>→</span>
      </span>
    </Link>
  );
}

function Gruppe({ titel }: { titel: string }) {
  return <div style={S.gruppe}>{titel}</div>;
}

const S: Record<string, React.CSSProperties> = {
  band: { background: "linear-gradient(90deg,#e6efff,#eef4ff)", border: "1px solid #d2e0fb", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" },
  bandLabel: { fontSize: 12.5, color: "#3f5680", fontWeight: 600 },
  bandValue: { fontSize: 24, fontWeight: 800, color: "#14264a", marginTop: 2 },
  years: { display: "flex", gap: 6, margin: "18px 0" },
  listCard: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, overflow: "hidden" },
  gruppe: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", padding: "10px 18px", borderBottom: "1px solid #f0f0f0" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 18px", borderBottom: "1px solid #f4f4f5", textDecoration: "none", color: "inherit" },
  rowName: { fontSize: 14.5, fontWeight: 600 },
  rowAmount: { display: "block", fontSize: 14.5, fontWeight: 700 },
  rowAmountLabel: { display: "block", fontSize: 11.5, color: "#a1a1aa" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 700 },
  card: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "18px 22px" },
  cardHead: { fontSize: 15, fontWeight: 800, color: "#0a0a0a", marginBottom: 8 },
  note: { fontSize: 12.5, color: "#a1a1aa", marginTop: 16, lineHeight: 1.55, maxWidth: 760 },
  ghostBtn: { background: "#fff", color: "#1663de", border: "1px solid #1663de", borderRadius: 9, padding: "9px 16px", fontSize: 14, fontWeight: 700, textDecoration: "none" },
};
