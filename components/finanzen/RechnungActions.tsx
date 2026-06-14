"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "entwurf" | "offen" | "teilbezahlt" | "bezahlt" | "ueberfaellig" | "storniert";

export default function RechnungActions({
  id,
  status,
}: {
  id: string;
  status: Status;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState("");

  async function call(path: string, label: string, confirmMsg?: string) {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    setBusy(label);
    setErr("");
    try {
      const r = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setErr(data.error || "Fehler");
        setBusy(null);
        return;
      }
      router.refresh();
    } catch {
      setErr("Netzwerkfehler");
    } finally {
      setBusy(null);
    }
  }

  async function setStatus(status: Status, label: string, confirmMsg?: string) {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    setBusy(label);
    setErr("");
    try {
      const r = await fetch("/api/finanzen/rechnung/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setErr(data.error || "Fehler");
        setBusy(null);
        return;
      }
      router.refresh();
    } catch {
      setErr("Netzwerkfehler");
    } finally {
      setBusy(null);
    }
  }

  async function zahlungErfassen() {
    const eingabe = window.prompt("Teilzahlung erfassen — Betrag in € (z. B. 500):");
    if (eingabe === null) return;
    const betrag = Number(eingabe.replace(",", "."));
    if (!(betrag > 0)) { setErr("Ungültiger Betrag"); return; }
    setBusy("zahlung");
    setErr("");
    try {
      const r = await fetch("/api/finanzen/zahlung/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rechnungId: id, betrag }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) { setErr(data.error || "Fehler"); setBusy(null); return; }
      router.refresh();
    } catch {
      setErr("Netzwerkfehler");
    } finally {
      setBusy(null);
    }
  }

  const offenOrDue = status === "offen" || status === "ueberfaellig" || status === "teilbezahlt";

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "flex-end", flexWrap: "wrap" }}>
      {status === "entwurf" && (
        <button
          style={btn(true)}
          disabled={!!busy}
          onClick={() => call("/api/finanzen/rechnung/send", "send", "Rechnung jetzt an den Kunden senden?")}
        >
          {busy === "send" ? "…" : "Senden"}
        </button>
      )}
      {offenOrDue && (
        <button style={btn(true)} disabled={!!busy} onClick={() => setStatus("bezahlt", "paid")}>
          {busy === "paid" ? "…" : "Bezahlt"}
        </button>
      )}
      {offenOrDue && (
        <button style={btn(false)} disabled={!!busy} onClick={zahlungErfassen}>
          {busy === "zahlung" ? "…" : "Teilzahlung"}
        </button>
      )}
      {offenOrDue && (
        <button
          style={btn(false)}
          disabled={!!busy}
          onClick={() => call("/api/finanzen/rechnung/mahnung", "mahn", "Zahlungserinnerung/Mahnung an den Kunden senden?")}
        >
          {busy === "mahn" ? "…" : "Mahnung"}
        </button>
      )}
      <button
        style={delBtn}
        disabled={!!busy}
        onClick={() =>
          call(
            "/api/finanzen/rechnung/delete",
            "del",
            "Rechnung wirklich endgültig löschen? Das kann nicht rückgängig gemacht werden. (Versendete/bezahlte Rechnungen besser stornieren statt löschen.)",
          )
        }
        title="Rechnung löschen"
      >
        {busy === "del" ? "…" : "Löschen"}
      </button>
      {err && <span style={{ color: "#b42318", fontSize: 12 }}>{err}</span>}
    </div>
  );
}

const delBtn: React.CSSProperties = {
  border: "1px solid #fecaca",
  background: "#fff",
  color: "#b42318",
  borderRadius: 8,
  padding: "6px 12px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

function btn(primary: boolean): React.CSSProperties {
  return {
    border: primary ? "none" : "1px solid #d4d4d8",
    background: primary ? "#1663de" : "#fff",
    color: primary ? "#fff" : "#3f3f46",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  };
}
