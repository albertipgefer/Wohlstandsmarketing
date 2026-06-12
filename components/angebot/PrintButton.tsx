"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        background: "#fff",
        border: "1px solid #d4d4d8",
        borderRadius: 9,
        padding: "9px 16px",
        fontSize: 14,
        fontWeight: 600,
        color: "#27272a",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      Als PDF speichern
    </button>
  );
}
