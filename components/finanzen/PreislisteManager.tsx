"use client";
/** Preisliste verwalten: anlegen, bearbeiten, aktiv/inaktiv, löschen, suchen. */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type PreisZeile = {
  id: string;
  bezeichnung: string;
  beschreibung: string | null;
  preis_netto: number;
  ust_satz: number;
  einheit: string;
  aktiv: boolean;
};

const eur = (n: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n || 0);

type FormState = { id?: string; bezeichnung: string; beschreibung: string; preis_netto: number; ust_satz: number; einheit: string; aktiv: boolean };
const leer = (): FormState => ({ bezeichnung: "", beschreibung: "", preis_netto: 0, ust_satz: 19, einheit: "einmalig", aktiv: true });

export default function PreislisteManager({ positionen }: { positionen: PreisZeile[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<FormState>(leer());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function set<K extends keyof FormState>(k: K, v: FormState[K]) { setF((p) => ({ ...p, [k]: v })); }
  function neu() { setF(leer()); setOpen(true); setMsg(""); }
  function bearbeiten(p: PreisZeile) {
    setF({ id: p.id, bezeichnung: p.bezeichnung, beschreibung: p.beschreibung || "", preis_netto: p.preis_netto, ust_satz: p.ust_satz, einheit: p.einheit, aktiv: p.aktiv });
    setOpen(true); setMsg("");
  }

  async function save() {
    if (!f.bezeichnung.trim()) return setMsg("Bitte eine Bezeichnung eintragen.");
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/finanzen/preisliste/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) { setBusy(false); return setMsg(data.error || "Speichern fehlgeschlagen."); }
      setOpen(false); setBusy(false); router.refresh();
    } catch { setBusy(false); setMsg("Netzwerkfehler."); }
  }

  async function loeschen(id: string) {
    if (!window.confirm("Diese Position wirklich löschen?")) return;
    await fetch("/api/finanzen/preisliste/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
  }

  const gefiltert = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return positionen;
    return positionen.filter((p) => [p.bezeichnung, p.beschreibung].some((v) => (v || "").toLowerCase().includes(n)));
  }, [positionen, q]);

  return (
    <>
      <div style={S.toolbar}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Preisliste durchsuchen …" style={S.search} />
        <button onClick={neu} style={btnPrimary}>+ Artikel hinzufügen</button>
      </div>

      {open && (
        <div style={S.formCard}>
          <div style={S.row}>
            <Field label="Bezeichnung *"><input value={f.bezeichnung} onChange={(e) => set("bezeichnung", e.target.value)} style={inp} placeholder="z. B. Unternehmenswebsite" /></Field>
            <Field label="Einheit">
              <select value={f.einheit} onChange={(e) => set("einheit", e.target.value)} style={inp}><option value="einmalig">einmalig</option><option value="pro Monat">pro Monat</option></select>
            </Field>
          </div>
          <div style={S.row}>
            <Field label="Beschreibung"><input value={f.beschreibung} onChange={(e) => set("beschreibung", e.target.value)} style={inp} /></Field>
          </div>
          <div style={S.row}>
            <Field label="Preis netto (€)"><input type="number" value={f.preis_netto} onChange={(e) => set("preis_netto", Number(e.target.value))} style={inp} /></Field>
            <Field label="USt %"><input type="number" value={f.ust_satz} onChange={(e) => set("ust_satz", Number(e.target.value))} style={inp} /></Field>
            <Field label="Aktiv">
              <select value={f.aktiv ? "ja" : "nein"} onChange={(e) => set("aktiv", e.target.value === "ja")} style={inp}><option value="ja">aktiv</option><option value="nein">inaktiv</option></select>
            </Field>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
            <button onClick={save} disabled={busy} style={btnPrimary}>{busy ? "…" : f.id ? "Änderungen speichern" : "Speichern"}</button>
            <button onClick={() => setOpen(false)} style={btnGhost}>Abbrechen</button>
            {msg && <span style={{ color: "#b42318", fontSize: 13 }}>{msg}</span>}
          </div>
        </div>
      )}

      {gefiltert.length === 0 ? (
        <div style={S.empty}>Noch keine Positionen. Lege wiederkehrende Leistungen an, um sie beim Erstellen von Angeboten/Rechnungen schnell auszuwählen.</div>
      ) : (
        <div className="fin-table-wrap">
          <table style={S.table}>
            <thead><tr>{["Bezeichnung", "Preis netto", "USt", "Einheit", "Status", ""].map((h) => (<th key={h} style={S.th}>{h}</th>))}</tr></thead>
            <tbody>
              {gefiltert.map((p) => (
                <tr key={p.id} style={S.tr}>
                  <td style={S.td}>
                    <div style={{ fontWeight: 600 }}>{p.bezeichnung}</div>
                    {p.beschreibung && <div style={{ fontSize: 12, color: "#a3a3a3" }}>{p.beschreibung}</div>}
                  </td>
                  <td style={S.td}>{eur(p.preis_netto)}</td>
                  <td style={S.td}>{p.ust_satz}%</td>
                  <td style={S.td}>{p.einheit}</td>
                  <td style={S.td}>
                    <span style={{ ...S.badge, background: p.aktiv ? "#ecfdf3" : "#f4f4f5", color: p.aktiv ? "#027a48" : "#a1a1aa" }}>{p.aktiv ? "aktiv" : "inaktiv"}</span>
                  </td>
                  <td style={{ ...S.td, textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => bearbeiten(p)} style={S.linkBtn}>Bearbeiten</button>
                    <button onClick={() => loeschen(p.id)} style={{ ...S.linkBtn, color: "#b42318", marginLeft: 12 }}>Löschen</button>
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
  empty: { background: "#fff", border: "1px solid #ececf0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#71717a", fontSize: 15, lineHeight: 1.6 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#737373", background: "#f9fafb", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f4f4f5" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  linkBtn: { background: "none", border: "none", color: "#1663de", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 },
};
const inp: React.CSSProperties = { border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 11px", fontSize: 14, fontFamily: "inherit", width: "100%" };
const btnPrimary: React.CSSProperties = { background: "#1663de", color: "#fff", border: "none", borderRadius: 9, padding: "10px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" };
const btnGhost: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
