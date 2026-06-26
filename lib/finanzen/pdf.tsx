/**
 * Server-seitige PDF-Erzeugung (echtes PDF, kein Headless-Browser) via
 * @react-pdf/renderer. Ein Layout für Angebot UND Rechnung.
 *
 * Nutzung: const buf = await renderDokumentPdf(toPdfDoc(...))
 */
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { ANBIETER } from "@/lib/angebot/stammdaten";
import { LOGO_PNG_DATA_URI } from "@/lib/finanzen/logo-data";
import { eur, deDate, computeTotals } from "@/lib/angebot/format";
import type { Angebot, AngebotPosition } from "@/lib/angebot/db";
import type { Rechnung } from "@/lib/finanzen/db";

export type PdfDoc = {
  art: "Angebot" | "Rechnung";
  nummer: string;
  /** Bei Rechnung: Nummer des zugrunde liegenden Angebots (Bezug). */
  angebotNummer?: string | null;
  datum: string | null;
  /** Bei Rechnung: Leistungsdatum/-zeitraum (Pflichtangabe §14 UStG). */
  leistungsdatum?: string | null;
  faellig?: string | null;
  gueltigBis?: string | null;
  kundeFirma?: string | null;
  kundeAnsprech?: string | null;
  kundeStrasse?: string | null;
  kundePlzOrt?: string | null;
  kundeLand?: string | null;
  titel?: string | null;
  einleitung?: string | null;
  positionen: AngebotPosition[];
  anmerkungen?: string | null;
  bedingungen?: string | null;
  /** Netto vor Paket-Rabatt (für transparente Rabatt-Zeile). */
  nettoRaw?: number;
  rabattRate?: number;
  rabattBetrag?: number;
  netto: number;
  ust: number;
  brutto: number;
  /** Bei Rechnung: Bankverbindung + Fälligkeit anzeigen. */
  zahlungshinweis?: boolean;
};

const ACCENT = "#1663de";
const s = StyleSheet.create({
  page: { paddingTop: 48, paddingBottom: 64, paddingHorizontal: 48, fontSize: 9.5, color: "#1a1a1a", fontFamily: "Helvetica", lineHeight: 1.4 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  brandRow: { flexDirection: "row", alignItems: "center" },
  brandLogo: { width: 38, height: 38 },
  brand: { fontSize: 15, fontFamily: "Helvetica-Bold", color: "#0a0a0a" },
  brandAccent: { color: ACCENT },
  senderSmall: { fontSize: 8, color: "#6b6b6b", marginTop: 4, lineHeight: 1.5 },
  metaBox: { alignItems: "flex-end" },
  metaTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0a0a0a", lineHeight: 1, marginBottom: 8 },
  metaLine: { fontSize: 9, color: "#52525b", marginTop: 3 },
  addressRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 26 },
  fromBlock: { maxWidth: 240 },
  toBlock: { maxWidth: 240 },
  label: { fontSize: 7.5, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 },
  strong: { fontFamily: "Helvetica-Bold" },
  intro: { marginBottom: 16, color: "#27272a" },
  table: { marginTop: 8 },
  th: { flexDirection: "row", backgroundColor: "#f4f6fb", paddingVertical: 6, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: "#e4e7ee" },
  thText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#52525b", textTransform: "uppercase", letterSpacing: 0.3 },
  row: { flexDirection: "row", paddingVertical: 7, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: "#f0f0f2" },
  cPos: { width: "52%" },
  cQty: { width: "12%", textAlign: "right" },
  cPrice: { width: "18%", textAlign: "right" },
  cSum: { width: "18%", textAlign: "right" },
  posTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  posDesc: { fontSize: 8.5, color: "#6b6b6b", marginTop: 2 },
  posLeist: { fontSize: 8, color: "#71717a", marginTop: 1 },
  totals: { marginTop: 14, alignSelf: "flex-end", width: 240 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  totalLabel: { color: "#52525b" },
  grand: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 7, marginTop: 4, borderTopWidth: 1.5, borderTopColor: "#0a0a0a" },
  grandText: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  section: { marginTop: 22 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 5, color: "#0a0a0a" },
  small: { fontSize: 8.5, color: "#52525b", lineHeight: 1.5 },
  bullet: { fontSize: 8.5, color: "#52525b", marginBottom: 2 },
  payBox: { marginTop: 18, padding: 12, backgroundColor: "#f4f6fb", borderRadius: 4 },
  footer: { position: "absolute", bottom: 28, left: 48, right: 48, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#ececec", paddingTop: 8, fontSize: 7.5, color: "#9a9a9a" },
});

function lineSum(p: AngebotPosition): number {
  return (p.preisNetto || 0) * (p.menge || 1);
}

function DokumentPdf({ d }: { d: PdfDoc }) {
  const empf = [d.kundeFirma, d.kundeAnsprech, d.kundeStrasse, d.kundePlzOrt, d.kundeLand].filter(Boolean);
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Kopf */}
        <View style={s.headerRow}>
          <View style={s.brandRow}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image style={s.brandLogo} src={LOGO_PNG_DATA_URI} />
          </View>
          <View style={s.metaBox}>
            <Text style={s.metaTitle}>{d.art}</Text>
            <Text style={s.metaLine}>Nr. {d.nummer || "—"}</Text>
            {d.art === "Rechnung" && d.angebotNummer ? (
              <Text style={s.metaLine}>zu Angebot {d.angebotNummer}</Text>
            ) : null}
            <Text style={s.metaLine}>Datum: {deDate(d.datum)}</Text>
            {d.art === "Rechnung" ? (
              <Text style={s.metaLine}>Leistungsdatum: {deDate(d.leistungsdatum || d.datum)}</Text>
            ) : null}
            {d.art === "Rechnung" && d.faellig ? (
              <Text style={s.metaLine}>Fällig: {deDate(d.faellig)}</Text>
            ) : null}
            {d.art === "Angebot" && d.gueltigBis ? (
              <Text style={s.metaLine}>Gültig bis: {deDate(d.gueltigBis)}</Text>
            ) : null}
          </View>
        </View>

        {/* Absender (Von) + Empfänger (An) nebeneinander */}
        <View style={s.addressRow}>
          <View style={s.fromBlock}>
            <Text style={s.label}>Von</Text>
            <Text style={s.strong}>{ANBIETER.firma}</Text>
            <Text>{ANBIETER.name}</Text>
            <Text>{ANBIETER.strasse}</Text>
            <Text>{ANBIETER.plzOrt}</Text>
            <Text>{ANBIETER.email}</Text>
            <Text>{ANBIETER.telefon}</Text>
          </View>
          <View style={s.toBlock}>
            <Text style={s.label}>An</Text>
            {empf.length ? (
              empf.map((l, i) => (
                <Text key={i} style={i === 0 ? s.strong : undefined}>{l}</Text>
              ))
            ) : (
              <Text>—</Text>
            )}
          </View>
        </View>

        {d.titel ? <Text style={[s.strong, { fontSize: 12, marginBottom: 6 }]}>{d.titel}</Text> : null}
        {d.einleitung ? <Text style={s.intro}>{d.einleitung}</Text> : null}

        {/* Positionen */}
        <View style={s.table}>
          <View style={s.th}>
            <Text style={[s.thText, s.cPos]}>Position</Text>
            <Text style={[s.thText, s.cQty]}>Menge</Text>
            <Text style={[s.thText, s.cPrice]}>Einzel (netto)</Text>
            <Text style={[s.thText, s.cSum]}>Summe</Text>
          </View>
          {d.positionen.map((p, i) => (
            <View key={p.uid || String(i)} style={s.row} wrap={false}>
              <View style={s.cPos}>
                <Text style={s.posTitle}>{p.titel}</Text>
                {p.beschreibung ? <Text style={s.posDesc}>{p.beschreibung}</Text> : null}
                {(p.leistungen || []).filter(Boolean).map((l, j) => (
                  <Text key={j} style={s.posLeist}>• {l}</Text>
                ))}
              </View>
              <Text style={s.cQty}>{p.menge || 1}{p.einheit === "pro Monat" ? " /M" : ""}</Text>
              <Text style={s.cPrice}>{eur(p.preisNetto || 0)}</Text>
              <Text style={s.cSum}>{eur(lineSum(p))}</Text>
            </View>
          ))}
        </View>

        {/* Summen */}
        <View style={s.totals}>
          {d.rabattRate && d.rabattRate > 0 ? (
            <>
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Zwischensumme (netto)</Text>
                <Text>{eur(d.nettoRaw ?? d.netto)}</Text>
              </View>
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Paket-Rabatt ({Math.round(d.rabattRate * 100)} %)</Text>
                <Text>−{eur(d.rabattBetrag ?? 0)}</Text>
              </View>
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Netto nach Rabatt</Text>
                <Text>{eur(d.netto)}</Text>
              </View>
            </>
          ) : (
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Zwischensumme (netto)</Text>
              <Text>{eur(d.netto)}</Text>
            </View>
          )}
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>zzgl. USt</Text>
            <Text>{eur(d.ust)}</Text>
          </View>
          <View style={s.grand}>
            <Text style={s.grandText}>Gesamt</Text>
            <Text style={s.grandText}>{eur(d.brutto)}</Text>
          </View>
        </View>

        {/* Zahlungshinweis (Rechnung) */}
        {d.zahlungshinweis ? (
          <View style={s.payBox} wrap={false}>
            <Text style={s.sectionTitle}>Zahlung</Text>
            <Text style={s.small}>
              Bitte überweisen Sie {eur(d.brutto)} bis {deDate(d.faellig)} auf:
              {"\n"}{ANBIETER.kontoinhaber} · IBAN {ANBIETER.iban} · BIC {ANBIETER.bic}
              {"\n"}Verwendungszweck: {d.nummer}
            </Text>
          </View>
        ) : null}

        {/* Anmerkungen */}
        {d.anmerkungen ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Anmerkungen</Text>
            <Text style={s.small}>{d.anmerkungen}</Text>
          </View>
        ) : null}

        {/* Bedingungen */}
        {d.bedingungen ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Bedingungen</Text>
            {d.bedingungen.split("\n").filter((l) => l.trim()).map((l, i) => (
              <Text key={i} style={s.bullet}>• {l.trim()}</Text>
            ))}
          </View>
        ) : null}

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text>{ANBIETER.firma} · {ANBIETER.website}</Text>
          <Text>Steuernr. {ANBIETER.steuernummer} · USt-IdNr {ANBIETER.ustIdNr}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function renderDokumentPdf(d: PdfDoc): Promise<Buffer> {
  return renderToBuffer(<DokumentPdf d={d} />);
}

export function angebotToPdfDoc(a: Angebot): PdfDoc {
  const t = computeTotals(a.positionen || []);
  return {
    art: "Angebot",
    nummer: a.nummer || "",
    datum: a.created_at,
    gueltigBis: a.gueltig_bis,
    kundeFirma: a.kunde_firma,
    kundeAnsprech: a.kunde_ansprech,
    kundeStrasse: a.kunde_strasse,
    kundePlzOrt: a.kunde_plz_ort,
    kundeLand: a.kunde_land,
    titel: a.titel,
    einleitung: a.einleitung,
    positionen: a.positionen || [],
    anmerkungen: a.anmerkungen,
    bedingungen: a.bedingungen,
    nettoRaw: t.nettoRaw,
    rabattRate: t.rabattRate,
    rabattBetrag: t.rabattBetrag,
    netto: a.netto,
    ust: a.ust,
    brutto: a.brutto,
    zahlungshinweis: false,
  };
}

/**
 * Rechnung → PDF-Dokument. `angebotNummer` (optional) stellt den Bezug zum
 * Angebot her und wird von der aufrufenden Route via angebot_id geladen.
 */
export function rechnungToPdfDoc(r: Rechnung, angebotNummer?: string | null): PdfDoc {
  const t = computeTotals(r.positionen || []);
  const datum = r.rechnungsdatum || r.created_at;
  return {
    art: "Rechnung",
    nummer: r.nummer || "",
    angebotNummer: angebotNummer ?? null,
    datum,
    leistungsdatum: datum,
    faellig: r.faellig_am,
    kundeFirma: r.kunde_firma,
    kundeAnsprech: r.kunde_ansprech,
    kundeStrasse: r.kunde_strasse,
    kundePlzOrt: r.kunde_plz_ort,
    kundeLand: r.kunde_land,
    // Rechnungen tragen keinen Marketing-Titel (Entscheidung Albert).
    titel: null,
    einleitung: r.einleitung,
    positionen: r.positionen || [],
    // Fallback-Anmerkung mit klarer 7-Tage-Zahlungsfrist, falls keine gesetzt.
    anmerkungen:
      r.anmerkungen?.trim() ||
      `Zahlbar ohne Abzug innerhalb von 7 Tagen, bis zum ${deDate(r.faellig_am)}.`,
    // Keine Bedingungen auf der Rechnung.
    bedingungen: null,
    nettoRaw: t.nettoRaw,
    rabattRate: t.rabattRate,
    rabattBetrag: t.rabattBetrag,
    netto: r.netto,
    ust: r.ust,
    brutto: r.brutto,
    zahlungshinweis: true,
  };
}
