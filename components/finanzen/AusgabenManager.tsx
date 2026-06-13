"use client";
/**
 * Ausgaben verwalten: erfassen, bearbeiten, Beleg hochladen/ansehen, löschen,
 * suchen. Beleg geht in Supabase Storage (privat) über /api/finanzen/beleg.
 */
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type AusgabeZeile = {
  id: string;
  datum: string;
  lieferant: string | null;
  beschreibung: string | null;
  kategorie: string | null;
  betrag_netto: number;
  betrag_brutto: number;
  ust_satz: number; // abgeleitet für die Bearbeitung
  bezahlt: boolean;
  beleg_url: string | null;
};

const KATEGORIEN = ["Software/Tools", "Werbung", "Freelancer", "Büro", "Reise", "Weiterbildung", "Sonstiges"];
const eur = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);
const deDate = (iso: string) => (iso ? new Date(iso).toLocaleDateString("de-DE") : "—");

type FormState = {
  id?: string;
  datum: string;
  lieferant: string;
  beschreibung: string;
  kategorie: string;
  betragNetto: number;
  ustSatz: number;
  bezahlt: boolean;
};

function leer(): FormState {
  return { datum: new Date().toISOString().slice(0, 10), lieferant: "", beschreibung: "", kategorie: "Software/Tools", betragNetto: 0, ustSatz: 19, bezahlt: true };
}

export default function AusgabenManager({ ausgaben }: { ausgaben: AusgabeZeile[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<FormState>(leer());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  function neu() { setF(leer()); setOpen(true); setMsg(""); if (fileRef.current) fileRef.current.value = ""; }
  function bearbeiten(a: AusgabeZeile) {
    setF({ id: a.id, datum: a.datum, lieferant: a.lieferant || "", beschreibung: a.beschreibung || "", kategorie: a.kategorie || "Sonstiges", betragNetto: a.betrag_netto, ustSatz: a.ust_satz || 19, bezahlt: a.bezahlt });
    setOpen(true); setMsg(""); if (fileRef.current) fileRef.current.value = "";
  }

  async function save() {
    if (!(Number(f.betragNetto) > 0)) return setMsg("Bitte einen Betrag eintragen.");
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/finanzen/ausgabe/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) { setBusy(false); return setMsg(data.error || "Speichern fehlgeschlagen."); }

      const file = fileRef.current?.files?.[0];
      if (file && data.id) {
        const fd = new FormData();
        fd.append("id", data.id);
        fd.append("file", file);
        const up = await fetch("/api/finanzen/beleg", { method: "POST", body: fd });
        const updata = await up.json().catch(() => ({}));
        if (!up.ok || !updata.ok) { setBusy(false); return setMsg("Ausgabe gespeichert, aber Beleg-Upload fehlgeschlagen."); }
      }
      setOpen(false); setBusy(false); router.refresh();
    } catch { setBusy(false); setMsg("Netzwerkfehler."); }
  }

  async function loeschen(id: string) {
    if (!window.confirm("Diese Ausgabe wirklich löschen?")) return;
    await fetch("/api/finanzen/ausgabe/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
  }

  const gefiltert = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return ausgaben;
    return ausgaben.filter((a) => [a.lieferant, a.beschreibung, a.kategorie].some((v) => (v || "").toLowerCase().includes(n)));
  }, [ausgaben, q]);

  return (
    <>
      <div style={S.toolbar}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ausgaben durchsuchen …" style={S.search} />
        <button onClick={neu} style={btnPrimary}>+ Ausgabe erfassen</button>
      </div>

      {open && (
        <div style={S.formCard}>
          <div style={S.row}>
            <Field label="Datum"><input type="date" value={f.datum} onChange={(e) => set("datum", e.target.value)} style={inp} /></Field>
            <Field label="Lieferant"><input value={f.lieferant} onChange={(e) => set("lieferant", e.target.value)} style={inp} placeholder="z. B. Vercel" /></Field>
            <Field label="Kategorie">
              <select value={f.kategorie} onChange={(e) => set("kategorie", e.target.value)} style={inp}>{KATEGORIEN.map((k) => <option key={k}>{k}</option>)}</select>
            </Field>
          </div>
          <div style={S.row}>
            <Field label="Beschreibung"><input value={f.beschreibung} onChange={(e) => set("beschreibung", e.target.value)} style={inp} /></Field>
            <Field label="Betrag netto (€)"><input type="number" value={f.betragNetto} onChange={(e) => set("betragNetto", Number(e.target.value))} style={inp} /></Field>
            <Field label="USt %"><input type="number" value={f.ustSatz} onChange={(e) => set("ustSatz", Number(e.target.value))} style={inp} /></Field>
          </div>
          <div style={S.row}>
            <Field label="Beleg (PDF/Foto, optional)"><input ref={fileRef} type="file" accept="application/pdf,image/*" style={{ ...inp, padding: 7 }} /></Field>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
            <button onClick={save} disabled={busy} style={btnPrimary}>{busy ? "…" : f.id ? "Änderungen speichern" : "Speichern"}</button>
            <button onClick={() => setOpen(false)} style={btnGhost}>Abbrechen</button>
            {msg && <span style={{ color: "#b42318", fontSize: 13 }}>{msg}</span>}
          </div>
        </div>
      )}

      {gefiltert.length === 0 ? (
        <div style={S.empty}>Keine Ausgaben für diese Auswahl.</div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead>
              <tr>{["Lieferant", "Datum", "Kategorie", "Status", "Anhang", "Betrag", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {gefiltert.map((a) => (
                <tr key={a.id} style={S.tr}>
                  <td style={S.td}>
                    <div style={{ fontWeight: 600 }}>{a.lieferant || "—"}</div>
                    {a.beschreibung && <div style={{ fontSize: 12, color: "#a3a3a3" }}>{a.beschreibung}</div>}
                  </td>
                  <td style={S.td}>{deDate(a.datum)}</td>
                  <td style={S.td}>{a.kategorie || "—"}</td>
                  <td style={S.td}>
                    <span style={{ ...S.badge, ...(a.bezahlt ? { background: "#ecfdf3", color: "#027a48" } : { background: "#fff7ed", color: "#c2410c" }) }}>
                      {a.bezahlt ? "bezahlt" : "offen"}
                    </span>
                  </td>
                  <td style={S.td}>
                    {a.beleg_url ? (
                      <a href={`/api/finanzen/beleg?id=${a.id}`} target="_blank" rel="noreferrer" style={S.link}>📎 ansehen</a>
                    ) : (
                      <span style={{ color: "#c4c4c4", fontSize: 13 }}>—</span>
                    )}
                  </td>
                  <td style={{ ...S.td, fontWeight: 700 }}>{eur(a.betrag_brutto)}</td>
                  <td style={{ ...S.td, textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => bearbeiten(a)} style={S.linkBtn}>Bearbeiten</button>
                    <button onClick={() => loeschen(a.id)} style={{ ...S.linkBtn, color: "#b42318", marginLeft: 12 }}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 130, fontSize: 12.5, color: "#52525b", fontWeight: 600 }}>{label}{children}</label>;
}

const S: Record<string, React.CSSProperties> = {
  toolbar: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" },
  search: { flex: 1, minWidth: 200, border: "1px solid #e4e4e7", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none" },
  formCard: { background: "#fff", border: "1px solid #ececf0", borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 },
  row: { display: "flex", gap: 12, flexWrap: "wrap" },
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  link: { color: "#1663de", textDecoration: "none", fontSize: 13, fontWeight: 600 },
  linkBtn: { background: "none", border: "none", color: "#1663de", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 },
};
const inp: React.CSSProperties = { border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 11px", fontSize: 14, fontFamily: "inherit", width: "100%" };
const btnPrimary: React.CSSProperties = { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
const btnGhost: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
