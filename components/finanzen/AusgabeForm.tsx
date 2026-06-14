"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const KATEGORIEN = ["Software/Tools", "Software-Abo", "Werbung", "Büromaterial", "Fortbildung", "Hosting", "Reisekosten", "Hotels", "Bewirtungskosten", "Kraftstoffe & Strom", "Geschäftliche Versicherungen", "Bankgebühren", "Sonstige Kosten"];

export default function AusgabeForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    datum: new Date().toISOString().slice(0, 10),
    lieferant: "",
    beschreibung: "",
    kategorie: "Software/Tools",
    betragNetto: 0,
    ustSatz: 19,
    bezahlt: true,
    belegPath: "" as string,
  });
  const [belegVorschau, setBelegVorschau] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [msg, setMsg] = useState("");

  function set<K extends keyof typeof f>(k: K, v: (typeof f)[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function onScan(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanning(true); setMsg(""); setOpen(true);
    try {
      const fd = new FormData();
      fd.append("datei", file);
      const r = await fetch("/api/finanzen/ausgabe/scan", { method: "POST", body: fd });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setMsg(
          data.error === "ki_not_configured" ? "KI-Scan ist noch nicht aktiv (ANTHROPIC_API_KEY fehlt)."
          : data.error === "too_large" ? "Datei zu groß (max. 12 MB)."
          : data.error === "unsupported_type" ? "Nur Foto (JPG/PNG/WebP) oder PDF."
          : "Beleg konnte nicht gelesen werden.",
        );
      } else {
        const ff = data.felder;
        setF((p) => ({
          ...p,
          datum: ff.datum || p.datum,
          lieferant: ff.lieferant || p.lieferant,
          beschreibung: ff.beschreibung || p.beschreibung,
          kategorie: ff.kategorie || p.kategorie,
          betragNetto: ff.betragNetto || p.betragNetto,
          ustSatz: ff.ustSatz ?? p.ustSatz,
          belegPath: data.belegPath || "",
        }));
        setBelegVorschau(data.belegVorschau || null);
        setMsg("✓ Beleg erkannt — bitte prüfen und speichern.");
      }
    } catch {
      setMsg("Netzwerkfehler beim Scan.");
    }
    setScanning(false);
    if (fileRef.current) fileRef.current.value = "";
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
      setF({ ...f, lieferant: "", beschreibung: "", betragNetto: 0, belegPath: "" });
      setBelegVorschau(null);
      setOpen(false);
      router.refresh();
    } catch { setBusy(false); setMsg("Netzwerkfehler."); }
    setBusy(false);
  }

  const katOptionen = f.kategorie && !KATEGORIEN.includes(f.kategorie) ? [f.kategorie, ...KATEGORIEN] : KATEGORIEN;

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*,application/pdf" capture="environment" onChange={onScan} style={{ display: "none" }} />
      {!open ? (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => fileRef.current?.click()} disabled={scanning} style={btnPrimary}>
            {scanning ? "Beleg wird gelesen …" : "📷 Beleg scannen"}
          </button>
          <button onClick={() => setOpen(true)} style={btnGhost}>+ Ausgabe manuell erfassen</button>
          {msg && <span style={{ color: msg.startsWith("✓") ? "#027a48" : "#b42318", fontSize: 13, alignSelf: "center" }}>{msg}</span>}
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
            <button onClick={() => fileRef.current?.click()} disabled={scanning} style={btnScan}>
              {scanning ? "Liest Beleg …" : "📷 Beleg scannen (KI)"}
            </button>
            {belegVorschau && <a href={belegVorschau} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#1663de", fontWeight: 600 }}>Beleg ansehen ↗</a>}
            {msg && <span style={{ color: msg.startsWith("✓") ? "#027a48" : "#b42318", fontSize: 13 }}>{msg}</span>}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Field label="Datum"><input type="date" value={f.datum} onChange={(e) => set("datum", e.target.value)} style={inp} /></Field>
            <Field label="Lieferant"><input value={f.lieferant} onChange={(e) => set("lieferant", e.target.value)} style={inp} placeholder="z. B. Vercel" /></Field>
            <Field label="Kategorie">
              <select value={f.kategorie} onChange={(e) => set("kategorie", e.target.value)} style={inp}>
                {katOptionen.map((k) => <option key={k} value={k}>{k}</option>)}
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
            <button onClick={() => { setOpen(false); setBelegVorschau(null); setMsg(""); }} style={btnGhost}>Abbrechen</button>
          </div>
        </div>
      )}
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
const btnScan: React.CSSProperties = { background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9, padding: "9px 14px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" };
const btnGhost: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
