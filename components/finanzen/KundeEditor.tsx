"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type KundeInitial = {
  id?: string;
  firma?: string;
  ansprech?: string;
  strasse?: string;
  plz_ort?: string;
  land?: string;
  email?: string;
  telefon?: string;
  ust_id?: string;
  notiz?: string;
};

export default function KundeEditor({ initial }: { initial?: KundeInitial }) {
  const router = useRouter();
  const [f, setF] = useState({
    firma: initial?.firma || "",
    ansprech: initial?.ansprech || "",
    strasse: initial?.strasse || "",
    plz_ort: initial?.plz_ort || "",
    land: initial?.land || "Deutschland",
    email: initial?.email || "",
    telefon: initial?.telefon || "",
    ust_id: initial?.ust_id || "",
    notiz: initial?.notiz || "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function set<K extends keyof typeof f>(k: K, v: string) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function save() {
    setBusy(true); setMsg("");
    if (!f.firma && !f.email) {
      setBusy(false); return setMsg("Bitte mindestens Firma oder E-Mail angeben.");
    }
    try {
      const r = await fetch("/api/finanzen/kunde/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: initial?.id, ...f }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) { setBusy(false); return setMsg(data.error || "Speichern fehlgeschlagen."); }
      router.push("/finanzen/kunden"); router.refresh();
    } catch { setBusy(false); setMsg("Netzwerkfehler."); }
  }

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 660 }}>
      <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px", display: "grid", gap: 10 }}>
        <Row>
          <Field label="Firma"><input value={f.firma} onChange={(e) => set("firma", e.target.value)} style={inp} /></Field>
          <Field label="Ansprechpartner"><input value={f.ansprech} onChange={(e) => set("ansprech", e.target.value)} style={inp} /></Field>
        </Row>
        <Row>
          <Field label="Straße"><input value={f.strasse} onChange={(e) => set("strasse", e.target.value)} style={inp} /></Field>
          <Field label="PLZ & Ort"><input value={f.plz_ort} onChange={(e) => set("plz_ort", e.target.value)} style={inp} /></Field>
        </Row>
        <Row>
          <Field label="Land"><input value={f.land} onChange={(e) => set("land", e.target.value)} style={inp} /></Field>
          <Field label="E-Mail"><input value={f.email} onChange={(e) => set("email", e.target.value)} style={inp} placeholder="kunde@firma.de" /></Field>
        </Row>
        <Row>
          <Field label="Telefon"><input value={f.telefon} onChange={(e) => set("telefon", e.target.value)} style={inp} /></Field>
          <Field label="USt-IdNr."><input value={f.ust_id} onChange={(e) => set("ust_id", e.target.value)} style={inp} /></Field>
        </Row>
        <Field label="Notiz"><textarea value={f.notiz} onChange={(e) => set("notiz", e.target.value)} style={{ ...inp, minHeight: 50 }} /></Field>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={save} disabled={busy} style={btnPrimary}>{busy ? "…" : "Kunde speichern"}</button>
        {msg && <span style={{ color: "#b42318", fontSize: 14 }}>{msg}</span>}
      </div>
    </div>
  );
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
