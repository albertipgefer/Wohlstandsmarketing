/**
 * AngebotDocument — geteilte A4-Darstellung des Angebots (Deckblatt + Inhalt).
 * Rein präsentational (keine Hooks) → funktioniert in Server- UND Client-Bäumen.
 * Genutzt von der Editor-Vorschau und der öffentlichen Kundenansicht.
 * Enthält das Druck-CSS (blendet alles außer dem Dokument aus).
 */
import { ANBIETER, UST_SATZ } from "@/lib/angebot/stammdaten";
import type { AngebotPosition } from "@/lib/angebot/db";
import { eur, deDate, computeTotals } from "@/lib/angebot/format";

export type DocData = {
  nummer: string;
  titel: string;
  untertitel: string;
  kundeFirma: string;
  kundeAnsprech: string;
  kundeStrasse: string;
  kundePlzOrt: string;
  kundeLand: string;
  einleitung: string;
  positionen: AngebotPosition[];
  anmerkungen: string;
  bedingungen: string;
  erstellt: string; // ISO yyyy-mm-dd
  gueltigBis: string; // ISO yyyy-mm-dd
};

export default function AngebotDocument({ data }: { data: DocData }) {
  const summen = computeTotals(data.positionen);
  const titelWords = (data.titel || "").trim().split(/\s+/).filter(Boolean);
  const titelHead = titelWords.slice(0, -1).join(" ");
  const titelTail = titelWords.length ? titelWords[titelWords.length - 1] : "";
  const bedingungenListe = (data.bedingungen || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="ag-doc">
      <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />

      {/* COVER */}
      <section className="ag-cover">
        <div className="ag-cover-top">
          <img className="ag-avatar" src="/albert-portrait.jpg" alt="Albert Ipgefer" />
          <div className="ag-brand">
            <span className="ag-brand-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ag-logo" src="/icon.png" alt="Wohlstandsmarketing" />
              <span>Wohlstands<span className="ag-accent">marketing</span></span>
            </span>
            <small>Angebot {data.nummer}</small>
          </div>
        </div>

        <div className="ag-hero">
          <span className="ag-eyebrow">Angebot · erstellt {deDate(data.erstellt)}</span>
          <h1 className="ag-h1">
            {titelHead && <>{titelHead} </>}
            <span className="ag-italic">{titelTail}</span>
          </h1>
          <p className="ag-subtitle">{data.untertitel}</p>
        </div>

        <div className="ag-cover-foot">
          <div>
            <div className="ag-cf-label">Für</div>
            <div className="ag-cf-name">{data.kundeFirma || "— Kunde —"}</div>
            {data.kundeAnsprech && <div className="ag-cf-line">{data.kundeAnsprech}</div>}
          </div>
          <div className="ag-cf-right">
            <div>Gültig bis {deDate(data.gueltigBis)}</div>
            <div>{ANBIETER.website}</div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="ag-content">
        <div className="ag-addresses">
          <div className="ag-addr-col">
            <div className="ag-addr-label">An</div>
            <div className="ag-addr-name">{data.kundeFirma || "—"}</div>
            {data.kundeAnsprech && <div className="ag-addr-line">{data.kundeAnsprech}</div>}
            <div className="ag-addr-line">
              {data.kundeStrasse && (
                <>
                  {data.kundeStrasse}
                  <br />
                </>
              )}
              {data.kundePlzOrt}
              {data.kundeLand && (
                <>
                  <br />
                  {data.kundeLand}
                </>
              )}
            </div>
          </div>
          <div className="ag-addr-col">
            <div className="ag-addr-label">Von</div>
            <div className="ag-addr-name">{ANBIETER.name}</div>
            <div className="ag-addr-line">
              {ANBIETER.strasse}
              <br />
              {ANBIETER.plzOrt}
              <br />
              {ANBIETER.land}
            </div>
            <div className="ag-addr-line ag-mt">Steuernummer: {ANBIETER.steuernummer}</div>
          </div>
        </div>

        {data.einleitung.trim() && (
          <div className="ag-einleitung">
            <h2 className="ag-sec">Worum es geht</h2>
            {data.einleitung
              .split("\n")
              .filter((l) => l.trim())
              .map((l, i) => (
                <p key={i}>{l}</p>
              ))}
          </div>
        )}

        <div className="ag-positions-head">
          <div>Beschreibung</div>
          <div>Preis (netto)</div>
          <div>USt.</div>
          <div>Menge</div>
          <div>Gesamt</div>
        </div>
        {data.positionen.map((p) => {
          const gesamt = (p.preisNetto || 0) * (p.menge || 0);
          return (
            <div className="ag-position" key={p.uid}>
              <div className="ag-position-row">
                <div className="ag-pos-title">{p.titel}</div>
                <div className="ag-num">{eur(p.preisNetto)}</div>
                <div className="ag-num">{p.ustSatz} %</div>
                <div className="ag-num">
                  {p.einheit === "pro Monat"
                    ? `${p.menge} Mon.`
                    : p.menge > 1
                      ? `${p.menge}×`
                      : "einmalig"}
                </div>
                <div className="ag-num ag-num-strong">{eur(gesamt)}</div>
              </div>
              {p.beschreibung && <div className="ag-pos-lead">{p.beschreibung}</div>}
              {p.leistungen.filter((l) => l.trim()).length > 0 && (
                <ul className="ag-plain">
                  {p.leistungen
                    .filter((l) => l.trim())
                    .map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                </ul>
              )}
            </div>
          );
        })}

        <div className="ag-totals">
          <div className="ag-totals-inner">
            {summen.hasPaket && (
              <>
                <div className="ag-t-label">Zwischensumme (netto)</div>
                <div className="ag-t-value">{eur(summen.nettoRaw)}</div>
                <div className="ag-t-label">
                  Paket-Rabatt ({Math.round(summen.rabattRate * 100)} %)
                </div>
                <div className="ag-t-value">−{eur(summen.rabattBetrag)}</div>
              </>
            )}
            <div className="ag-t-label">Nettobetrag</div>
            <div className="ag-t-value">{eur(summen.netto)}</div>
            <div className="ag-t-label">Umsatzsteuer ({UST_SATZ} %)</div>
            <div className="ag-t-value">{eur(summen.ust)}</div>
            <div className="ag-t-label ag-grand">Gesamtbetrag</div>
            <div className="ag-t-value ag-grand">{eur(summen.brutto)}</div>
          </div>
        </div>

        {data.anmerkungen.trim() && (
          <>
            <h2 className="ag-sec">Anmerkungen &amp; Hinweise</h2>
            <div className="ag-notes">
              {data.anmerkungen
                .split("\n")
                .filter((l) => l.trim())
                .map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
            </div>
          </>
        )}

        {bedingungenListe.length > 0 && (
          <>
            <h2 className="ag-sec">Bedingungen</h2>
            <ul className="ag-plain">
              {bedingungenListe.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </>
        )}

        <div className="ag-bank">
          <div className="ag-bank-left">
            Kontoinhaber: {ANBIETER.kontoinhaber}
            <br />
            IBAN: {ANBIETER.iban}
            <br />
            BIC: {ANBIETER.bic}
          </div>
          <div className="ag-bank-right">
            <span className="ag-bank-email">{ANBIETER.email}</span>
            <br />
            {ANBIETER.telefon}
          </div>
        </div>
      </section>
    </div>
  );
}

const ACCENT = "#1663de";
const ACCENT_DARK = "#0f4cb3";

export const DOC_CSS = `
.ag-doc {
  --ag-accent: ${ACCENT};
  --ag-accent-dark: ${ACCENT_DARK};
  width: 210mm; min-width: 210mm; min-height: 297mm;
  background: #fff; color: #0a0a0a;
  box-shadow: 0 8px 40px rgba(0,0,0,0.16);
  padding: 18mm 16mm;
  font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
  font-size: 10.5pt; line-height: 1.6;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.ag-cover { display: flex; flex-direction: column; min-height: 250mm; page-break-after: always; }
.ag-cover-top { display: flex; align-items: center; gap: 14px; }
.ag-avatar { width: 56px; height: 56px; border-radius: 14px; object-fit: cover; box-shadow: 0 2px 10px rgba(22,99,222,0.20); }
.ag-brand { font-size: 14pt; font-weight: 700; letter-spacing: -0.3px; }
.ag-brand-row { display: inline-flex; align-items: center; gap: 8px; }
.ag-logo { width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0; }
.ag-brand .ag-accent { color: var(--ag-accent); }
.ag-brand small { display: block; font-size: 8.5pt; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 2.2px; margin-top: 2px; }
.ag-hero { margin-top: 34mm; }
.ag-eyebrow { display: inline-block; font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; color: var(--ag-accent); border: 1px solid rgba(22,99,222,0.3); padding: 6px 14px; border-radius: 999px; background: rgba(22,99,222,0.06); }
.ag-h1 { font-size: 42pt; line-height: 1.04; letter-spacing: -1.6px; font-weight: 900; margin: 22px 0 18px; }
.ag-italic { font-family: var(--font-playfair), Georgia, serif; font-style: italic; font-weight: 400; color: var(--ag-accent); }
.ag-subtitle { font-size: 15pt; color: #52525b; max-width: 90%; line-height: 1.4; }
.ag-cover-foot { margin-top: auto; border-top: 1px solid #e4e4e7; padding-top: 14px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 9pt; color: #71717a; }
.ag-cf-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #a3a3a3; }
.ag-cf-name { font-size: 11pt; font-weight: 700; color: #0a0a0a; margin-top: 2px; }
.ag-cf-line { margin-top: 1px; }
.ag-cf-right { text-align: right; line-height: 1.6; }
.ag-content { padding-top: 4mm; }
.ag-addresses { display: flex; justify-content: space-between; gap: 12mm; margin-bottom: 9mm; }
.ag-addr-col { flex: 1; }
.ag-addr-label { color: #a3a3a3; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2mm; }
.ag-addr-name { font-weight: 700; font-size: 12.5pt; margin-bottom: 1.5mm; }
.ag-addr-line { font-size: 9.5pt; line-height: 1.5; color: #27272a; }
.ag-addr-line.ag-mt { margin-top: 2mm; }
.ag-sec { font-size: 13pt; font-weight: 800; color: #0a0a0a; margin: 9mm 0 3mm; page-break-after: avoid; }
.ag-sec::before { content: ''; display: inline-block; width: 5px; height: 16px; background: linear-gradient(180deg, var(--ag-accent), var(--ag-accent-dark)); vertical-align: -2px; margin-right: 9px; border-radius: 2px; }
.ag-einleitung p { margin: 4px 0; color: #27272a; }
.ag-positions-head { display: grid; grid-template-columns: 3.2fr 1fr 0.6fr 0.9fr 1fr; background: #f4f7fc; padding: 2.5mm 3mm; font-size: 8pt; font-weight: 700; color: #52525b; border-radius: 6px; margin-top: 2mm; }
.ag-positions-head > div:not(:first-child) { text-align: right; }
.ag-position { padding: 4mm 3mm 5mm; border-bottom: 0.2mm solid #ececec; page-break-inside: avoid; }
.ag-position-row { display: grid; grid-template-columns: 3.2fr 1fr 0.6fr 0.9fr 1fr; gap: 2mm; align-items: start; }
.ag-pos-title { color: var(--ag-accent); font-weight: 700; font-size: 10.5pt; }
.ag-num { text-align: right; font-size: 9.5pt; white-space: nowrap; }
.ag-num-strong { font-weight: 700; color: #0a0a0a; }
.ag-pos-lead { font-size: 9pt; color: #27272a; margin: 1.5mm 0 2mm; }
ul.ag-plain { list-style: none; padding-left: 0; margin: 2mm 0; }
ul.ag-plain li { font-size: 9pt; line-height: 1.55; padding-left: 5mm; text-indent: -5mm; color: #27272a; }
ul.ag-plain li::before { content: "✓\\00A0\\00A0"; color: var(--ag-accent); font-weight: 700; }
.ag-totals { margin-top: 7mm; display: flex; justify-content: flex-end; page-break-inside: avoid; }
.ag-totals-inner { display: grid; grid-template-columns: auto auto; gap: 1.5mm 10mm; font-size: 9.5pt; }
.ag-t-label { color: #52525b; text-align: right; }
.ag-t-value { text-align: right; }
.ag-t-label.ag-grand, .ag-t-value.ag-grand { font-weight: 800; font-size: 13pt; padding-top: 1.5mm; }
.ag-t-value.ag-grand { color: var(--ag-accent); }
.ag-notes p { margin: 0 0 2.5mm; font-size: 9pt; color: #27272a; }
.ag-bank { margin-top: 10mm; background: #f4f7fc; border-radius: 8px; padding: 5mm 6mm; font-size: 8pt; color: #2b2b2b; display: flex; justify-content: space-between; page-break-inside: avoid; }
.ag-bank-left { font-weight: 700; line-height: 1.65; }
.ag-bank-right { text-align: right; line-height: 1.65; }
.ag-bank-email { font-weight: 700; }

/* Mobil: A4-Dokument fluid umbrechen (nur Bildschirm — Druck/PDF unberührt). */
@media screen and (max-width: 820px) {
  .ag-doc {
    width: 100%; min-width: 0; max-width: 210mm;
    padding: 24px 18px; font-size: 11px; box-shadow: none;
  }
  .ag-cover { min-height: auto; page-break-after: auto; }
  .ag-cover-top { gap: 10px; }
  .ag-avatar { width: 48px; height: 48px; }
  .ag-hero { margin-top: 20px; }
  .ag-h1 { font-size: clamp(26px, 8vw, 40px); letter-spacing: -0.5px; margin: 14px 0 12px; }
  .ag-subtitle { font-size: 15px; max-width: 100%; }
  .ag-cover-foot { flex-direction: column; gap: 12px; align-items: flex-start; margin-top: 22px; }
  .ag-cf-right { text-align: left; }
  .ag-content { padding-top: 8px; }
  .ag-addresses { flex-direction: column; gap: 16px; margin-bottom: 22px; }
  .ag-positions-head { display: none; }
  .ag-position-row { display: flex; flex-direction: column; gap: 2px; }
  .ag-pos-title { font-size: 12pt; margin-bottom: 2px; }
  .ag-position-row .ag-num { text-align: left; font-size: 10pt; color: #52525b; white-space: normal; }
  .ag-position-row .ag-num-strong { color: #0a0a0a; }
  .ag-position-row .ag-num:nth-child(2)::before { content: "Einzelpreis: "; color: #a3a3a3; }
  .ag-position-row .ag-num:nth-child(3)::before { content: "USt: "; color: #a3a3a3; }
  .ag-position-row .ag-num:nth-child(4)::before { content: "Menge: "; color: #a3a3a3; }
  .ag-position-row .ag-num:nth-child(5)::before { content: "Gesamt: "; color: #a3a3a3; }
  .ag-totals { justify-content: stretch; }
  .ag-totals-inner { width: 100%; grid-template-columns: 1fr auto; column-gap: 12px; }
  .ag-bank { flex-direction: column; gap: 10px; }
  .ag-bank-right { text-align: left; }
}

@page { size: A4; margin: 14mm 14mm 16mm; }
@media print {
  body > *:not(.ag-page) { display: none !important; }
  .ag-page { display: block !important; background: #fff !important; }
  .ag-no-print { display: none !important; }
  .ag-doc-wrap { padding: 0 !important; display: block !important; overflow: visible !important; }
  .ag-doc { width: auto !important; min-width: 0 !important; min-height: 0 !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; }
  .ag-cover { min-height: 247mm; }
}
`;
