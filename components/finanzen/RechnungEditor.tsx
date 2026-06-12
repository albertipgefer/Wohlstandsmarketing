"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Pos = {
  uid: string;
  titel: string;
  beschreibung: string;
  leistungen: string[];
  preisNetto: number;
  einheit: "einmalig" | "pro Monat";
  menge: number;
  ustSatz: number;
};

export type RechnungInitial = {
  id?: string;
  typ?: string;
  titel?: string;
  einleitung?: string;
  kunde_firma?: string;
  kunde_ansprech?: string;
  kunde_strasse?: string;
  kunde_plz_ort?: string;
  kunde_land?: string;
  kunde_email?: string;
  positionen?: Pos[];
  anmerkungen?: string;
  bedingungen?: string;
  rechnungsdatum?: string;
  zahlungsziel_tage?: number;
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function leerePos(): Pos {
  return { uid: uid(), titel: "", beschreibung: "", leistungen: [], preisNetto: 0, einheit: "einmalig", menge: 1, ustSatz: 19 };
}

const eur = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);

export default function RechnungEditor({ initial }: { initial?: RechnungInitial }) {
  const router = useRouter();
  const [typ, setTyp] = useState(initial?.typ || "rechnung");
  const [titel, setTitel] = useState(initial?.titel || "");
  const [einleitung, setEinleitung] = useState(initial?.einleitung || "");
  const [kunde, setKunde] = useState({
    firma: initial?.kunde_firma || "",
    ansprech: initial?.kunde_ansprech || "",
    strasse: initial?.kunde_strasse || "",
    plz_ort: initial?.kunde_plz_ort || "",
    land: initial?.kunde_land || "Deutschland",
    email: initial?.kunde_email || "",
  });
  const [positionen, setPositionen] = useState<Pos[]>(
    initial?.positionen?.length ? initial.positionen : [leerePos()],
  );
  const [rechnungsdatum, setRechnungsdatum] = useState(
    initial?.rechnungsdatum || new Date().toISOString().slice(0, 10),
  );
  const [zielTage, setZielTage] = useState(initial?.zahlungsziel_tage ?? 14);
  const [anmerkungen, setAnmerkungen] = useState(initial?.anmerkungen || "");
  const [bedingungen, setBedingungen] = useState(initial?.bedingungen || "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "err" | "ok"; text: string } | null>(null);

  const summe = useMemo(() => {
    let netto = 0, ust = 0;
    for (const p of positionen) {
      const z = (Number(p.preisNetto) || 0) * (Number(p.menge) || 1);
      netto += z;
      ust += z * ((Number(p.ustSatz) || 0) / 100);
    }
    return { netto, ust, brutto: netto + ust };
  }, [positionen]);

  function setPos(i: number, patch: Partial<Pos>) {
    setPositionen((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    if (!kunde.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kunde.email)) {
      setBusy(false);
      return setMsg({ kind: "err", text: "Bitte eine gültige Kunden-E-Mail eintragen." });
    }
    try {
      const r = await fetch("/api/finanzen/rechnung/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initial?.id,
          typ,
          titel,
          einleitung,
          kunde_firma: kunde.firma,
          kunde_ansprech: kunde.ansprech,
          kunde_strasse: kunde.strasse,
          kunde_plz_ort: kunde.plz_ort,
          kunde_land: kunde.land,
          kunde_email: kunde.email,
          positionen,
          anmerkungen,
          bedingungen,
          rechnungsdatum,
          zahlungsziel_tage: Number(zielTage) || 14,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setBusy(false);
        return setMsg({ kind: "err", text: data.error || "Speichern fehlgeschlagen." });
      }
      router.push("/finanzen/rechnungen");
      router.refresh();
    } catch {
      setBusy(false);
      setMsg({ kind: "err", text: "Netzwerkfehler." });
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18, maxWidth: 820 }}>
      <Card title="Art & Kunde">
        <Row>
          <Field label="Art">
            <select value={typ} onChange={(e) => setTyp(e.target.value)} style={inp}>
              <option value="rechnung">Rechnung</option>
              <option value="abschlag">Abschlagsrechnung</option>
              <option value="schluss">Schlussrechnung</option>
            </select>
          </Field>
          <Field label="Rechnungsdatum">
            <input type="date" value={rechnungsdatum} onChange={(e) => setRechnungsdatum(e.target.value)} style={inp} />
          </Field>
          <Field label="Zahlungsziel (Tage)">
            <input type="number" value={zielTage} onChange={(e) => setZielTage(Number(e.target.value))} style={inp} />
          </Field>
        </Row>
        <Row>
          <Field label="Firma"><input value={kunde.firma} onChange={(e) => setKunde({ ...kunde, firma: e.target.value })} style={inp} /></Field>
          <Field label="Ansprechpartner"><input value={kunde.ansprech} onChange={(e) => setKunde({ ...kunde, ansprech: e.target.value })} style={inp} /></Field>
        </Row>
        <Row>
          <Field label="Straße"><input value={kunde.strasse} onChange={(e) => setKunde({ ...kunde, strasse: e.target.value })} style={inp} /></Field>
          <Field label="PLZ & Ort"><input value={kunde.plz_ort} onChange={(e) => setKunde({ ...kunde, plz_ort: e.target.value })} style={inp} /></Field>
        </Row>
        <Row>
          <Field label="Land"><input value={kunde.land} onChange={(e) => setKunde({ ...kunde, land: e.target.value })} style={inp} /></Field>
          <Field label="E-Mail *"><input value={kunde.email} onChange={(e) => setKunde({ ...kunde, email: e.target.value })} style={inp} placeholder="kunde@firma.de" /></Field>
        </Row>
      </Card>

      <Card title="Titel & Einleitung">
        <Field label="Titel"><input value={titel} onChange={(e) => setTitel(e.target.value)} style={inp} placeholder="z. B. Website + KI-Sichtbarkeit" /></Field>
        <Field label="Einleitung"><textarea value={einleitung} onChange={(e) => setEinleitung(e.target.value)} style={{ ...inp, minHeight: 60 }} /></Field>
      </Card>

      <Card title="Positionen">
        {positionen.map((p, i) => (
          <div key={p.uid} style={{ border: "1px solid #ececf0", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <Row>
              <Field label="Bezeichnung"><input value={p.titel} onChange={(e) => setPos(i, { titel: e.target.value })} style={inp} /></Field>
              <Field label="Einheit">
                <select value={p.einheit} onChange={(e) => setPos(i, { einheit: e.target.value as Pos["einheit"] })} style={inp}>
                  <option value="einmalig">einmalig</option>
                  <option value="pro Monat">pro Monat</option>
                </select>
              </Field>
            </Row>
            <Field label="Beschreibung"><input value={p.beschreibung} onChange={(e) => setPos(i, { beschreibung: e.target.value })} style={inp} /></Field>
            <Row>
              <Field label="Preis netto (€)"><input type="number" value={p.preisNetto} onChange={(e) => setPos(i, { preisNetto: Number(e.target.value) })} style={inp} /></Field>
              <Field label="Menge"><input type="number" value={p.menge} onChange={(e) => setPos(i, { menge: Number(e.target.value) })} style={inp} /></Field>
              <Field label="USt %"><input type="number" value={p.ustSatz} onChange={(e) => setPos(i, { ustSatz: Number(e.target.value) })} style={inp} /></Field>
              <Field label=" ">
                <button onClick={() => setPositionen((ps) => ps.filter((_, j) => j !== i))} style={{ ...btnGhost, color: "#b42318" }} disabled={positionen.length <= 1}>Entfernen</button>
              </Field>
            </Row>
          </div>
        ))}
        <button onClick={() => setPositionen((ps) => [...ps, leerePos()])} style={btnGhost}>+ Position</button>
      </Card>

      <Card title="Anmerkungen & Bedingungen">
        <Field label="Anmerkungen / Zahlungshinweis"><textarea value={anmerkungen} onChange={(e) => setAnmerkungen(e.target.value)} style={{ ...inp, minHeight: 60 }} /></Field>
        <Field label="Bedingungen (eine pro Zeile)"><textarea value={bedingungen} onChange={(e) => setBedingungen(e.target.value)} style={{ ...inp, minHeight: 60 }} /></Field>
      </Card>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px" }}>
        <div style={{ fontSize: 14, color: "#52525b" }}>
          Netto {eur(summe.netto)} · USt {eur(summe.ust)} · <strong style={{ color: "#0a0a0a", fontSize: 16 }}>Gesamt {eur(summe.brutto)}</strong>
        </div>
        <button onClick={save} disabled={busy} style={btnPrimary}>{busy ? "…" : "Als Entwurf speichern"}</button>
      </div>
      {msg && <div style={{ color: msg.kind === "err" ? "#b42318" : "#027a48", fontSize: 14 }}>{msg.text}</div>}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px" }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140, fontSize: 12.5, color: "#52525b", fontWeight: 600 }}>
      {label}
      {children}
    </label>
  );
}

const inp: React.CSSProperties = { border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 11px", fontSize: 14, fontFamily: "inherit", width: "100%" };
const btnPrimary: React.CSSProperties = { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
const btnGhost: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
