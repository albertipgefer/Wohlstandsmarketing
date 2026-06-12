"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const KATEGORIEN = ["Software/Tools", "Werbung", "Freelancer", "Büro", "Reise", "Weiterbildung", "Sonstiges"];

export default function AusgabeForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    datum: new Date().toISOString().slice(0, 10),
    lieferant: "",
    beschreibung: "",
    kategorie: "Software/Tools",
    betragNetto: 0,
    ustSatz: 19,
    bezahlt: true,
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function set<K extends keyof typeof f>(k: K, v: (typeof f)[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function save() {
    setBusy(true); setMsg("");
    if (!(Number(f.betragNetto) > 0)) { setBusy(false); return setMsg("Bitte einen Betrag eintragen."); }
    try {
      const r = await fetch("/api/finanzen/ausgabe/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) { setBusy(false); return setMsg(data.error || "Speichern fehlgeschlagen."); }
      setF({ ...f, lieferant: "", beschreibung: "", betragNetto: 0 });
      setOpen(false);
      router.refresh();
    } catch { setBusy(false); setMsg("Netzwerkfehler."); }
    setBusy(false);
  }

  if (!open) {
    return <button onClick={() => setOpen(true)} style={btnPrimary}>+ Ausgabe erfassen</button>;
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px", marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Field label="Datum"><input type="date" value={f.datum} onChange={(e) => set("datum", e.target.value)} style={inp} /></Field>
        <Field label="Lieferant"><input value={f.lieferant} onChange={(e) => set("lieferant", e.target.value)} style={inp} placeholder="z. B. Vercel" /></Field>
        <Field label="Kategorie">
          <select value={f.kategorie} onChange={(e) => set("kategorie", e.target.value)} style={inp}>
            {KATEGORIEN.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Field>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
        <Field label="Beschreibung"><input value={f.beschreibung} onChange={(e) => set("beschreibung", e.target.value)} style={inp} /></Field>
        <Field label="Betrag netto (€)"><input type="number" value={f.betragNetto} onChange={(e) => set("betragNetto", Number(e.target.value))} style={inp} /></Field>
        <Field label="USt %"><input type="number" value={f.ustSatz} onChange={(e) => set("ustSatz", Number(e.target.value))} style={inp} /></Field>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
        <button onClick={save} disabled={busy} style={btnPrimary}>{busy ? "…" : "Speichern"}</button>
        <button onClick={() => setOpen(false)} style={btnGhost}>Abbrechen</button>
        {msg && <span style={{ color: "#b42318", fontSize: 13 }}>{msg}</span>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 130, fontSize: 12.5, color: "#52525b", fontWeight: 600 }}>
      {label}{children}
    </label>
  );
}
const inp: React.CSSProperties = { border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 11px", fontSize: 14, fontFamily: "inherit", width: "100%" };
const btnPrimary: React.CSSProperties = { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
const btnGhost: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
