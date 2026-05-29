import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://start.wohlstandsmarketing.de"),
  title: {
    default: "Albert Ipgefer · Wohlstandsmarketing",
    template: "%s · Wohlstandsmarketing",
  },
  description:
    "Vom Tagesjob zur ortsunabhängigen Selbstständigkeit — die 5 Phasen der Wohlstandsmarketing-Treppe. Direkt aus der Praxis, ohne Marketing-Bullshit.",
  openGraph: {
    title: "Albert Ipgefer · Wohlstandsmarketing",
    description:
      "Die 5 Phasen vom Tagesjob zur ortsunabhängigen Selbstständigkeit. Direkt aus der Praxis.",
    url: "https://start.wohlstandsmarketing.de",
    siteName: "Wohlstandsmarketing",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albert Ipgefer · Wohlstandsmarketing",
    description:
      "Die 5 Phasen vom Tagesjob zur ortsunabhängigen Selbstständigkeit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
