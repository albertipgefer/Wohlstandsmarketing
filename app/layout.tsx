import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ClarityAnalytics from "@/components/ClarityAnalytics";
import StickyKiCheckCTA from "@/components/StickyKiCheckCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import KiCheckTeaserPopup from "@/components/KiCheckTeaserPopup";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { REVIEW_PROFILE_URLS } from "@/content/testimonials";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const SITE = "https://wohlstandsmarketing.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Wohlstandsmarketing — In 90 Tagen auf Google & ChatGPT",
    template: "%s",
  },
  description:
    "Webdesign + KI-Sichtbarkeit als untrennbares Paket. In 90 Tagen auf Google, ChatGPT, Perplexity und Claude als erste Wahl deiner Region empfohlen.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${SITE}#organization`,
  name: "Wohlstandsmarketing",
  url: SITE,
  logo: `${SITE}/icon.svg`,
  image: `${SITE}/icon.svg`,
  description:
    "Webdesign und KI-Sichtbarkeit als ein untrennbares Paket. Die WSM-Methode: Dein neuer Auftritt — gebaut, um auf Google, ChatGPT, Perplexity und Claude als erste Wahl in deiner Region empfohlen zu werden.",
  founder: { "@type": "Person", name: "Albert Ipgefer" },
  foundingDate: "2025",
  email: "info@wohlstandsmarketing.de",
  telephone: "+49 176 227 87 559",
  priceRange: "€€€",
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "Country", name: "Österreich" },
    { "@type": "Country", name: "Schweiz" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vor der Loos 4e",
    postalCode: "56130",
    addressLocality: "Bad Ems",
    addressCountry: "DE",
  },
  sameAs: [
    REVIEW_PROFILE_URLS.google,
    REVIEW_PROFILE_URLS.trustpilot,
    "https://www.instagram.com/journeywithalbert/",
    "https://www.tiktok.com/@journeywithalbert",
    "https://www.linkedin.com/in/albertipgefer/",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WSM-Methode — Webdesign + KI-Sichtbarkeit",
  serviceType: "Webdesign &amp; KI-Sichtbarkeitsoptimierung",
  provider: { "@id": `${SITE}#organization` },
  areaServed: { "@type": "Country", name: "DACH" },
  description:
    "90-Tage-Programm für Mittelstand: Webseite in 7 Tagen live, danach 83 Tage konstante KI-Optimierung für Google, ChatGPT, Perplexity und Claude.",
  audience: { "@type": "BusinessAudience", audienceType: "Mittelstand DACH" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wohlstandsmarketing",
  url: SITE,
  inLanguage: "de-DE",
  publisher: { "@type": "Organization", name: "Wohlstandsmarketing" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}#person-albert`,
  name: "Albert Ipgefer",
  jobTitle: "Gründer, Wohlstandsmarketing",
  worksFor: { "@id": `${SITE}#organization` },
  url: SITE,
  image: `${SITE}/albert-portrait.jpg`,
  email: "info@wohlstandsmarketing.de",
  telephone: "+49 176 227 87 559",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vor der Loos 4e",
    postalCode: "56130",
    addressLocality: "Bad Ems",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Webdesign",
    "KI-Sichtbarkeit",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Lokales SEO",
    "Conversion-Optimierung",
    "Schema.org",
    "Performance-Marketing",
  ],
  sameAs: [
    "https://www.linkedin.com/in/albertipgefer/",
    "https://www.instagram.com/journeywithalbert/",
    "https://www.tiktok.com/@journeywithalbert",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <link rel="preconnect" href="https://scripts.clarity.ms" />
        <link rel="dns-prefetch" href="https://scripts.clarity.ms" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <StickyKiCheckCTA />
        <WhatsAppButton />
        <KiCheckTeaserPopup />
        <ExitIntentPopup />
        <CookieBanner />
        <ClarityAnalytics />
      </body>
    </html>
  );
}
