"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AusgabeDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!window.confirm("Ausgabe wirklich löschen?")) return;
    setBusy(true);
    try {
      const r = await fetch("/api/finanzen/ausgabe/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) { router.refresh(); return; }
    } catch {
      /* ignore */
    }
    setBusy(false);
    window.alert("Löschen fehlgeschlagen.");
  }

  return (
    <button onClick={del} disabled={busy} style={{ background: "none", border: "none", color: "#b42318", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}>
      {busy ? "…" : "Löschen"}
    </button>
  );
}
