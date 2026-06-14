"use client";

/**
 * Generischer Löschen-Button für Finanz-Listen (Angebote, Wiederkehrende, …).
 * POST { id } an `endpoint`, danach router.refresh(). Mit Bestätigungsdialog.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  endpoint,
  id,
  confirmMsg,
  label = "Löschen",
  style,
}: {
  endpoint: string;
  id: string;
  confirmMsg: string;
  label?: string;
  style?: React.CSSProperties;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!window.confirm(confirmMsg)) return;
    setBusy(true);
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        router.refresh();
        return;
      }
    } catch {
      /* ignore */
    }
    setBusy(false);
    window.alert("Löschen fehlgeschlagen.");
  }

  return (
    <button
      onClick={del}
      disabled={busy}
      style={{ background: "none", border: "none", color: "#b42318", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, ...style }}
    >
      {busy ? "…" : label}
    </button>
  );
}
