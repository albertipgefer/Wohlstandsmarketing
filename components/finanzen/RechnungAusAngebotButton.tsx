"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Erzeugt aus einem Angebot eine Rechnung und springt in den Editor.
 * - Standard: volle Rechnung („→ Gesamte Rechnung").
 * - abschlag=true: fragt nach einem Prozentsatz und erzeugt eine einzelne
 *   Abschlagsrechnung über diesen Teilbetrag.
 */
export default function RechnungAusAngebotButton({
  angebotId,
  abschlag = false,
}: {
  angebotId: string;
  abschlag?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function go() {
    let abschlagProzent: number | undefined;
    if (abschlag) {
      const eingabe = window.prompt("Abschlagsrechnung — wie viel Prozent des Angebotsbetrags? (z. B. 50)", "50");
      if (eingabe === null) return;
      abschlagProzent = Number(eingabe.replace(",", "."));
      if (!(abschlagProzent > 0 && abschlagProzent < 100)) {
        window.alert("Bitte einen Prozentsatz zwischen 1 und 99 eingeben.");
        return;
      }
    }
    setBusy(true);
    try {
      const r = await fetch("/api/finanzen/rechnung/aus-angebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ angebotId, abschlagProzent }),
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
      style={{ background: "none", border: "none", color: abschlag ? "#7c3aed" : "#027a48", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, marginLeft: 12 }}
      title={abschlag ? "Abschlagsrechnung (Teilbetrag) aus diesem Angebot" : "Gesamte Rechnung aus diesem Angebot erzeugen"}
    >
      {busy ? "…" : abschlag ? "→ Abschlag" : "→ Gesamte Rechnung"}
    </button>
  );
}
