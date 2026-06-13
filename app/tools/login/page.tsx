/**
 * /tools/login — Login-Seite für die interne Tool-Übersicht.
 * Bereits eingeloggt → weiter zur Übersicht.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/tools/auth";
import LoginForm from "@/components/tools/LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Meine Tools — Login",
  robots: { index: false, follow: false },
};

export default async function ToolsLoginPage() {
  if (await isLoggedIn()) redirect("/tools");
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#e9eaee",
        padding: "40px 20px",
      }}
    >
      <LoginForm />
    </main>
  );
}
