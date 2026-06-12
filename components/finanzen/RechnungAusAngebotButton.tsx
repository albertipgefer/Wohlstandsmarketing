"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RechnungAusAngebotButton({ angebotId }: { angebotId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function go() {
    setBusy(true);
    try {
      const r = await fetch("/api/finanzen/rechnung/aus-angebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ angebotId }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok && data.id) {
        router.push(`/finanzen/rechnungen/neu?id=${data.id}`);
        return;
      }
    } catch {
      /* ignore */
    }
    setBusy(false);
    window.alert("Konnte keine Rechnung erzeugen.");
  }

  return (
    <button
      onClick={go}
      disabled={busy}
      style={{ background: "none", border: "none", color: "#027a48", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, marginLeft: 12 }}
      title="Rechnungs-Entwurf aus diesem Angebot erzeugen"
    >
      {busy ? "…" : "→ Rechnung"}
    </button>
  );
}
