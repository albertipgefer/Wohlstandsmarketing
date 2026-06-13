"use client";
/** Kleiner Button, der den Browser-Druckdialog öffnet (Report → PDF speichern). */
export default function PrintButton({ label = "Als PDF drucken" }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      style={{ background: "#fff", color: "#1663de", border: "1px solid #1663de", borderRadius: 9, padding: "9px 16px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
    >
      🖨 {label}
    </button>
  );
}
