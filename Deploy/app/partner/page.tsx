import type { Metadata } from "next";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = {
  title: "Partnerprogramm — 50 % Provision",
  description:
    "Werde Affiliate-Partner von Wohlstandsmarketing: 50 % Provision auf 6 digitale Produkte, automatisches Tracking, pünktliche Auszahlung. Mit einem Klick anmelden.",
  // Partner-Seite: bewusst nicht in Suchmaschinen — nur über den geteilten Link erreichbar.
  robots: { index: false, follow: false },
};

export default function PartnerPage() {
  return <PartnerClient />;
}
