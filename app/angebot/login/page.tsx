/**
 * /angebot/login — Login-Seite für den internen Angebots-Bereich.
 * Bereits eingeloggt → weiter zum Dashboard.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/angebot/auth";
import LoginForm from "@/components/angebot/LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Angebote — Login",
  robots: { index: false, follow: false },
};

export default async function AngebotLoginPage() {
  if (await isLoggedIn()) redirect("/angebot");
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
