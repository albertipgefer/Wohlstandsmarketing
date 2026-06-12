"use client";

/**
 * Angebots-Editor (Client) — Eingabe links, Live-A4-Vorschau (AngebotDocument) rechts.
 * Speichern → DB-Entwurf. Senden → Kunden-Mail mit Link. PDF via window.print().
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { UST_SATZ, STANDARD_BEDINGUNGEN, STANDARD_ANMERKUNGEN } from "@/lib/angebot/stammdaten";
import { BAUSTEINE, KATEGORIEN, type Baustein, type Einheit, type Kategorie } from "@/lib/angebot/bausteine";
import type { AngebotPosition } from "@/lib/angebot/db";
import { eur, isoToday, isoPlusDays, computeTotals } from "@/lib/angebot/format";
import AngebotDocument from "@/components/angebot/AngebotDocument";

export type EditorInitial = {
  id?: string;
  nummer?: string;
  titel?: string;
  untertitel?: string;
  kundeFirma?: string;
  kundeAnsprech?: string;
  kundeStrasse?: string;
  kundePlzOrt?: string;
  kundeLand?: string;
  kundeEmail?: string;
  einleitung?: string;
  positionen?: AngebotPosition[];
  anmerkungen?: string;
  bedingungen?: string;
  erstellt?: string;
  gueltigBis?: string;
  status?: string;
};

let uidCounter = 0;
const nextUid = () => `pos-${Date.now().toString(36)}-${++uidCounter}`;

function bausteinToPosition(b: Baustein): AngebotPosition {
  return {
    uid: nextUid(),
    titel: b.titel,
    beschreibung: b.beschreibung,
    leistungen: [...b.leistungen],
    preisNetto: b.preisNetto,
    einheit: b.einheit,
    menge: b.menge,
    ustSatz: b.ustSatz,
  };
}

export default function AngebotGenerator({ initial }: { initial?: EditorInitial }) {
  const [savedId, setSavedId] = useState<string | undefined>(initial?.id);
  const [angebotNr, setAngebotNr] = useState(initial?.nummer || "2026-001");
  const [erstellt, setErstellt] = useState(initial?.erstellt || isoToday());
  const [gueltigBis, setGueltigBis] = useState(initial?.gueltigBis || isoPlusDays(14));
  const [titel, setTitel] = useState(initial?.titel || "Ihr Weg zu mehr Sichtbarkeit");
  const [untertitel, setUntertitel] = useState(
    initial?.untertitel || "Ein individuelles Angebot von Wohlstandsmarketing.",
  );
  const [kundeFirma, setKundeFirma] = useState(initial?.kundeFirma || "");
  const [kundeAnsprech, setKundeAnsprech] = useState(initial?.kundeAnsprech || "");
  const [kundeStrasse, setKundeStrasse] = useState(initial?.kundeStrasse || "");
  const [kundePlzOrt, setKundePlzOrt] = useState(initial?.kundePlzOrt || "");
  const [kundeLand, setKundeLand] = useState(initial?.kundeLand || "Deutschland");
  const [kundeEmail, setKundeEmail] = useState(initial?.kundeEmail || "");
  const [einleitung, setEinleitung] = useState(initial?.einleitung || "");
  const [positionen, setPositionen] = useState<AngebotPosition[]>(initial?.positionen || []);
  const [anmerkungen, setAnmerkungen] = useState(initial?.anmerkungen ?? STANDARD_ANMERKUNGEN);
  const [bedingungen, setBedingungen] = useState(
    initial?.bedingungen ?? STANDARD_BEDINGUNGEN.join("\n"),
  );
  const [busy, setBusy] = useState<"" | "save" | "send">("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const bausteineNachKat = useMemo(() => {
    const map = new Map<Kategorie, Baustein[]>();
    for (const k of KATEGORIEN) map.set(k, []);
    for (const b of BAUSTEINE) map.get(b.kategorie)!.push(b);
    return map;
  }, []);

  const summen = useMemo(() => computeTotals(positionen), [positionen]);

  const addBaustein = (b: Baustein) => setPositionen((prev) => [...prev, bausteinToPosition(b)]);
  const addFreiePosition = () =>
    setPositionen((prev) => [
      ...prev,
      { uid: nextUid(), titel: "Neue Position", beschreibung: "", leistungen: [], preisNetto: 0, einheit: "einmalig", menge: 1, ustSatz: UST_SATZ },
    ]);
  const updatePos = (uid: string, patch: Partial<AngebotPosition>) =>
    setPositionen((prev) => prev.map((p) => (p.uid === uid ? { ...p, ...patch } : p)));
  const removePos = (uid: string) => setPositionen((prev) => prev.filter((p) => p.uid !== uid));
  const movePos = (uid: string, dir: -1 | 1) =>
    setPositionen((prev) => {
      const i = prev.findIndex((p) => p.uid === uid);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const docData = {
    nummer: angebotNr, titel, untertitel, kundeFirma, kundeAnsprech, kundeStrasse,
    kundePlzOrt, kundeLand, einleitung, positionen, anmerkungen, bedingungen, erstellt, gueltigBis,
  };

  function payload() {
    const s = computeTotals(positionen);
    return {
      id: savedId,
      nummer: angebotNr, titel, untertitel,
      kunde_firma: kundeFirma, kunde_ansprech: kundeAnsprech, kunde_strasse: kundeStrasse,
      kunde_plz_ort: kundePlzOrt, kunde_land: kundeLand, kunde_email: kundeEmail,
      einleitung, positionen, anmerkungen, bedingungen,
      netto: s.netto, ust: s.ust, brutto: s.brutto, gueltig_bis: gueltigBis,
    };
  }

  async function handleSave(): Promise<string | null> {
    setBusy("save"); setMsg(null);
    try {
      const r = await fetch("/api/angebot/save", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload()),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Speichern fehlgeschlagen");
      setSavedId(j.id);
      setMsg({ kind: "ok", text: "Gespeichert." });
      return j.id as string;
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof Error ? e.message : "Fehler beim Speichern" });
      return null;
    } finally {
      setBusy("");
    }
  }

  async function handleSend() {
    if (!kundeFirma.trim()) return setMsg({ kind: "err", text: "Bitte Kundenname (Firma) eintragen." });
    if (positionen.length === 0) return setMsg({ kind: "err", text: "Bitte mindestens eine Leistung hinzufügen." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kundeEmail.trim()))
      return setMsg({ kind: "err", text: "Bitte eine gültige Kunden-E-Mail eintragen." });
    if (!confirm(`Angebot jetzt an ${kundeEmail} senden?`)) return;
    setBusy("send"); setMsg(null);
    const id = savedId || (await handleSave());
    if (!id) { setBusy(""); return; }
    try {
      const r = await fetch("/api/angebot/send", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Versand fehlgeschlagen");
      setMsg({ kind: "ok", text: `Gesendet an ${kundeEmail}. Link: ${j.link}` });
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof Error ? e.message : "Fehler beim Senden" });
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="ag-page">
      <style dangerouslySetInnerHTML={{ __html: PANEL_CSS }} />

      <aside className="ag-input ag-no-print">
        <div className="ag-input-head">
          <div>
            <Link href="/angebot" className="ag-back">← Dashboard</Link>
            <h1>Angebot erstellen</h1>
          </div>
          <div className="ag-actions">
            <button className="ag-btn ag-btn-ghost" onClick={() => window.print()}>PDF</button>
            <button className="ag-btn ag-btn-ghost" disabled={busy !== ""} onClick={handleSave}>
              {busy === "save" ? "…" : "Speichern"}
            </button>
            <button className="ag-btn ag-btn-primary" disabled={busy !== ""} onClick={handleSend}>
              {busy === "send" ? "…" : "Senden"}
            </button>
          </div>
        </div>
        {msg && <div className={`ag-msg ${msg.kind === "ok" ? "ag-msg-ok" : "ag-msg-err"}`}>{msg.text}</div>}

        <section className="ag-fieldset">
          <h2>Eckdaten</h2>
          <div className="ag-grid2">
            <label>Angebotsnr.<input value={angebotNr} onChange={(e) => setAngebotNr(e.target.value)} /></label>
            <label>Erstellt<input type="date" value={erstellt} onChange={(e) => setErstellt(e.target.value)} /></label>
            <label>Gültig bis<input type="date" value={gueltigBis} onChange={(e) => setGueltigBis(e.target.value)} /></label>
          </div>
          <label>Titel (Deckblatt)<input value={titel} onChange={(e) => setTitel(e.target.value)} /></label>
          <label>Untertitel<input value={untertitel} onChange={(e) => setUntertitel(e.target.value)} /></label>
        </section>

        <section className="ag-fieldset">
          <h2>Kunde</h2>
          <label>Firma / Name<input value={kundeFirma} onChange={(e) => setKundeFirma(e.target.value)} placeholder="Mustermann GmbH" /></label>
          <label>Ansprechpartner<input value={kundeAnsprech} onChange={(e) => setKundeAnsprech(e.target.value)} placeholder="Max Mustermann" /></label>
          <label>E-Mail (für den Versand)<input type="email" value={kundeEmail} onChange={(e) => setKundeEmail(e.target.value)} placeholder="kunde@firma.de" /></label>
          <div className="ag-grid2">
            <label>Straße<input value={kundeStrasse} onChange={(e) => setKundeStrasse(e.target.value)} /></label>
            <label>PLZ + Ort<input value={kundePlzOrt} onChange={(e) => setKundePlzOrt(e.target.value)} /></label>
            <label>Land<input value={kundeLand} onChange={(e) => setKundeLand(e.target.value)} /></label>
          </div>
        </section>

        <section className="ag-fieldset">
          <h2>Einleitung (optional)</h2>
          <textarea rows={4} value={einleitung} onChange={(e) => setEinleitung(e.target.value)} placeholder="Kurzer persönlicher Einstieg. Leer = wird weggelassen." />
        </section>

        <section className="ag-fieldset">
          <h2>Leistungen wählen</h2>
          {KATEGORIEN.map((kat) => (
            <div key={kat} className="ag-kat">
              <div className="ag-kat-title">{kat}</div>
              <div className="ag-baustein-list">
                {bausteineNachKat.get(kat)!.map((b) => (
                  <button key={b.id} className="ag-baustein" onClick={() => addBaustein(b)} title={b.kurz}>
                    <span className="ag-baustein-name">{b.titel}</span>
                    <span className="ag-baustein-meta">{eur(b.preisNetto)}{b.einheit === "pro Monat" ? " /Mon." : ""} · +</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="ag-add-frei" onClick={addFreiePosition}>+ Freie Position</button>
        </section>

        <section className="ag-fieldset">
          <h2>Positionen ({positionen.length})</h2>
          {positionen.length === 0 && <p className="ag-empty">Noch keine Leistung gewählt.</p>}
          {positionen.map((p, idx) => {
            const gesamt = p.preisNetto * p.menge;
            return (
              <div key={p.uid} className="ag-pos-edit">
                <div className="ag-pos-edit-head">
                  <span className="ag-pos-num">#{idx + 1}</span>
                  <div className="ag-pos-actions">
                    <button onClick={() => movePos(p.uid, -1)} title="hoch">↑</button>
                    <button onClick={() => movePos(p.uid, 1)} title="runter">↓</button>
                    <button className="ag-del" onClick={() => removePos(p.uid)} title="entfernen">✕</button>
                  </div>
                </div>
                <label>Titel<input value={p.titel} onChange={(e) => updatePos(p.uid, { titel: e.target.value })} /></label>
                <label>Beschreibung<textarea rows={2} value={p.beschreibung} onChange={(e) => updatePos(p.uid, { beschreibung: e.target.value })} /></label>
                <label>Leistungen (eine pro Zeile)<textarea rows={4} value={p.leistungen.join("\n")} onChange={(e) => updatePos(p.uid, { leistungen: e.target.value.split("\n").map((l) => l.replace(/\s+$/, "")) })} /></label>
                <div className="ag-grid2">
                  <label>Preis netto (€)<input type="number" value={p.preisNetto} onChange={(e) => updatePos(p.uid, { preisNetto: Number(e.target.value) || 0 })} /></label>
                  <label>Einheit<select value={p.einheit} onChange={(e) => updatePos(p.uid, { einheit: e.target.value as Einheit })}><option value="einmalig">einmalig</option><option value="pro Monat">pro Monat</option></select></label>
                  <label>{p.einheit === "pro Monat" ? "Monate" : "Menge"}<input type="number" value={p.menge} min={1} onChange={(e) => updatePos(p.uid, { menge: Math.max(1, Number(e.target.value) || 1) })} /></label>
                  <label>USt. %<input type="number" value={p.ustSatz} onChange={(e) => updatePos(p.uid, { ustSatz: Number(e.target.value) || 0 })} /></label>
                </div>
                <div className="ag-pos-sum">Position gesamt (netto): <strong>{eur(gesamt)}</strong>{p.einheit === "pro Monat" && ` (${p.menge} × ${eur(p.preisNetto)})`}</div>
              </div>
            );
          })}
        </section>

        <section className="ag-fieldset">
          <h2>Anmerkungen &amp; Hinweise</h2>
          <textarea rows={3} value={anmerkungen} onChange={(e) => setAnmerkungen(e.target.value)} />
        </section>
        <section className="ag-fieldset">
          <h2>Bedingungen (eine pro Zeile)</h2>
          <textarea rows={6} value={bedingungen} onChange={(e) => setBedingungen(e.target.value)} />
        </section>
        <div className="ag-summary-foot">Brutto gesamt: <strong>{eur(summen.brutto)}</strong></div>
      </aside>

      <main className="ag-doc-wrap">
        <AngebotDocument data={docData} />
      </main>
    </div>
  );
}

const ACCENT = "#1663de";
const ACCENT_DARK = "#0f4cb3";

const PANEL_CSS = `
.ag-page {
  --ag-accent: ${ACCENT};
  --ag-accent-dark: ${ACCENT_DARK};
  font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
  display: grid; grid-template-columns: minmax(380px, 480px) 1fr; gap: 0;
  min-height: 100vh; background: #e9eaee; color: #0a0a0a;
}
@media (max-width: 1100px) { .ag-page { grid-template-columns: 1fr; } }
.ag-input { background: #fff; border-right: 1px solid #e4e4e7; padding: 22px 22px 80px; max-height: 100vh; overflow-y: auto; position: sticky; top: 0; }
@media (max-width: 1100px) { .ag-input { position: static; max-height: none; } }
.ag-input-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.ag-input-head h1 { font-size: 19px; font-weight: 800; margin: 4px 0 0; }
.ag-back { font-size: 12px; color: var(--ag-accent); text-decoration: none; font-weight: 600; }
.ag-actions { display: flex; gap: 6px; flex-shrink: 0; }
.ag-btn { border-radius: 8px; padding: 9px 14px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; border: 1px solid #d4d4d8; background: #fff; color: #27272a; }
.ag-btn:disabled { opacity: 0.5; cursor: default; }
.ag-btn-primary { background: var(--ag-accent); color: #fff; border-color: var(--ag-accent); }
.ag-btn-primary:hover:not(:disabled) { background: var(--ag-accent-dark); }
.ag-btn-ghost:hover:not(:disabled) { background: #f4f4f5; }
.ag-msg { margin-top: 12px; padding: 9px 12px; border-radius: 8px; font-size: 12.5px; line-height: 1.45; word-break: break-word; }
.ag-msg-ok { background: #ecfdf3; color: #027a48; border: 1px solid #a6f4c5; }
.ag-msg-err { background: #fef3f2; color: #b42318; border: 1px solid #fecdca; }
.ag-fieldset { border-top: 1px solid #f0f0f1; padding-top: 16px; margin-top: 16px; }
.ag-fieldset > h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #52525b; margin: 0 0 10px; }
.ag-input label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 10px; }
.ag-input input, .ag-input textarea, .ag-input select { display: block; width: 100%; margin-top: 4px; border: 1px solid #d4d4d8; border-radius: 7px; padding: 8px 10px; font-size: 13.5px; font-family: inherit; color: #0a0a0a; background: #fff; }
.ag-input textarea { resize: vertical; line-height: 1.45; }
.ag-input input:focus, .ag-input textarea:focus, .ag-input select:focus { outline: 2px solid var(--ag-accent); outline-offset: 0; border-color: var(--ag-accent); }
.ag-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 12px; }
.ag-kat { margin-bottom: 12px; }
.ag-kat-title { font-size: 12px; font-weight: 700; color: var(--ag-accent); margin-bottom: 6px; }
.ag-baustein-list { display: flex; flex-direction: column; gap: 6px; }
.ag-baustein { display: flex; justify-content: space-between; align-items: center; gap: 10px; text-align: left; background: #f7f8fa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 8px 11px; cursor: pointer; font-family: inherit; }
.ag-baustein:hover { border-color: var(--ag-accent); background: #f0f5ff; }
.ag-baustein-name { font-size: 13px; font-weight: 600; color: #0a0a0a; }
.ag-baustein-meta { font-size: 11.5px; font-weight: 700; color: var(--ag-accent); white-space: nowrap; }
.ag-add-frei { width: 100%; margin-top: 6px; background: #fff; border: 1px dashed #b9bbc2; border-radius: 8px; padding: 9px; font-size: 13px; font-weight: 600; color: #52525b; cursor: pointer; font-family: inherit; }
.ag-add-frei:hover { border-color: var(--ag-accent); color: var(--ag-accent); }
.ag-empty { font-size: 13px; color: #a3a3a3; }
.ag-pos-edit { border: 1px solid #e4e4e7; border-radius: 10px; padding: 12px; margin-bottom: 12px; background: #fcfcfd; }
.ag-pos-edit-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.ag-pos-num { font-size: 12px; font-weight: 800; color: #71717a; }
.ag-pos-actions { display: flex; gap: 4px; }
.ag-pos-actions button { border: 1px solid #d4d4d8; background: #fff; border-radius: 6px; width: 26px; height: 26px; cursor: pointer; font-size: 13px; line-height: 1; }
.ag-pos-actions .ag-del { color: #b91c1c; }
.ag-pos-actions button:hover { background: #f4f4f5; }
.ag-pos-sum { font-size: 12px; color: #52525b; margin-top: 4px; }
.ag-summary-foot { border-top: 1px solid #f0f0f1; margin-top: 16px; padding-top: 14px; font-size: 14px; color: #52525b; }
.ag-summary-foot strong { color: var(--ag-accent); font-size: 16px; }
.ag-doc-wrap { padding: 28px; display: flex; justify-content: center; align-items: flex-start; overflow-x: auto; }
`;
