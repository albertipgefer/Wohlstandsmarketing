"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/analytics/logout", { method: "POST" });
        router.replace("/analytics/login");
        router.refresh();
      }}
      style={{
        background: "none",
        border: "1px solid #d4d4d8",
        borderRadius: 8,
        padding: "7px 12px",
        fontSize: 13,
        color: "#52525b",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      Logout
    </button>
  );
}
