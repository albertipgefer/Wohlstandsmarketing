"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type WkInitial = {
  id?: string;
  bezeichnung?: string;
  kunde_firma?: string;
  kunde_ansprech?: string;
  kunde_strasse?: string;
  kunde_plz_ort?: string;
  kunde_email?: string;
  titel?: string;
  betragNetto?: number;
  ustSatz?: number;
  intervall?: string;
  naechste_faelligkeit?: string;
  zahlungsziel_tage?: number;
  aktiv?: boolean;
  anmerkungen?: string;
};

export default function WiederkehrendEditor({ initial }: { initial?: WkInitial }) {
  const router = useRouter();
  const [f, setF] = useState({
    bezeichnung: initial?.bezeichnung || "",
    kunde_firma: initial?.kunde_firma || "",
    kunde_ansprech: initial?.kunde_ansprech || "",
    kunde_strasse: initial?.kunde_strasse || "",
    kunde_plz_ort: initial?.kunde_plz_ort || "",
    kunde_email: initial?.kunde_email || "",
    titel: initial?.titel || "",
    betragNetto: initial?.betragNetto ?? 0,
    ustSatz: initial?.ustSatz ?? 19,
    intervall: initial?.intervall || "monatlich",
    naechste_faelligkeit: initial?.naechste_faelligkeit || new Date().toISOString().slice(0, 10),
    zahlungsziel_tage: initial?.zahlungsziel_tage ?? 14,
    aktiv: initial?.aktiv ?? true,
    anmerkungen: initial?.anmerkungen || "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function set<K extends keyof typeof f>(k: K, v: (typeof f)[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function save() {
    setBusy(true); setMsg("");
    if (!f.kunde_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.kunde_email)) {
      setBusy(false); return setMsg("Bitte eine gültige Kunden-E-Mail eintragen.");
    }
    try {
      const r = await fetch("/api/finanzen/wiederkehrend/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: initial?.id, ...f, betragNetto: Number(f.betragNetto), ustSatz: Number(f.ustSatz), zahlungsziel_tage: Number(f.zahlungsziel_tage) }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) { setBusy(false); return setMsg(data.error || "Speichern fehlgeschlagen."); }
      router.push("/finanzen/wiederkehrend"); router.refresh();
    } catch { setBusy(false); setMsg("Netzwerkfehler."); }
  }

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 720 }}>
      <Card>
        <Field label="Bezeichnung (intern)"><input value={f.bezeichnung} onChange={(e) => set("bezeichnung", e.target.value)} style={inp} placeholder="z. B. Retainer Mustermann GmbH" /></Field>
        <Row>
          <Field label="Firma"><input value={f.kunde_firma} onChange={(e) => set("kunde_firma", e.target.value)} style={inp} /></Field>
          <Field label="Ansprechpartner"><input value={f.kunde_ansprech} onChange={(e) => set("kunde_ansprech", e.target.value)} style={inp} /></Field>
        </Row>
        <Row>
          <Field label="Straße"><input value={f.kunde_strasse} onChange={(e) => set("kunde_strasse", e.target.value)} style={inp} /></Field>
          <Field label="PLZ & Ort"><input value={f.kunde_plz_ort} onChange={(e) => set("kunde_plz_ort", e.target.value)} style={inp} /></Field>
        </Row>
        <Field label="Kunden-E-Mail *"><input value={f.kunde_email} onChange={(e) => set("kunde_email", e.target.value)} style={inp} placeholder="kunde@firma.de" /></Field>
      </Card>

      <Card>
        <Field label="Leistung (Titel)"><input value={f.titel} onChange={(e) => set("titel", e.target.value)} style={inp} placeholder="z. B. KI-Sichtbarkeit & SEO (Retainer)" /></Field>
        <Row>
          <Field label="Betrag netto (€)"><input type="number" value={f.betragNetto} onChange={(e) => set("betragNetto", Number(e.target.value))} style={inp} /></Field>
          <Field label="USt %"><input type="number" value={f.ustSatz} onChange={(e) => set("ustSatz", Number(e.target.value))} style={inp} /></Field>
        </Row>
        <Row>
          <Field label="Intervall">
            <select value={f.intervall} onChange={(e) => set("intervall", e.target.value)} style={inp}>
              <option value="monatlich">monatlich</option>
              <option value="quartalsweise">quartalsweise</option>
              <option value="jaehrlich">jährlich</option>
            </select>
          </Field>
          <Field label="Nächste Rechnung am"><input type="date" value={f.naechste_faelligkeit} onChange={(e) => set("naechste_faelligkeit", e.target.value)} style={inp} /></Field>
          <Field label="Zahlungsziel (Tage)"><input type="number" value={f.zahlungsziel_tage} onChange={(e) => set("zahlungsziel_tage", Number(e.target.value))} style={inp} /></Field>
        </Row>
        <Field label="Anmerkungen"><textarea value={f.anmerkungen} onChange={(e) => set("anmerkungen", e.target.value)} style={{ ...inp, minHeight: 50 }} /></Field>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginTop: 4 }}>
          <input type="checkbox" checked={f.aktiv} onChange={(e) => set("aktiv", e.target.checked)} /> aktiv (erzeugt automatisch Rechnungs-Entwürfe)
        </label>
      </Card>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={save} disabled={busy} style={btnPrimary}>{busy ? "…" : "Speichern"}</button>
        {msg && <span style={{ color: "#b42318", fontSize: 14 }}>{msg}</span>}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px", display: "grid", gap: 10 }}>{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 150, fontSize: 12.5, color: "#52525b", fontWeight: 600 }}>
      {label}{children}
    </label>
  );
}
const inp: React.CSSProperties = { border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 11px", fontSize: 14, fontFamily: "inherit", width: "100%" };
const btnPrimary: React.CSSProperties = { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
