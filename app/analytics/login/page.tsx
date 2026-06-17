/**
 * /traffic/login — Login-Maske fürs Traffic-Dashboard.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/traffic/auth";
import LoginForm from "@/components/traffic/LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Login — Google-Traffic",
  robots: { index: false, follow: false },
};

export default async function TrafficLoginPage() {
  if (await isLoggedIn()) redirect("/analytics");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        padding: 20,
      }}
    >
      <LoginForm />
    </main>
  );
}
