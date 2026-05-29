import type { Metadata } from "next";
import BundlePage from "@/components/BundlePage";
import { BUNDLE } from "@/lib/products";

export const metadata: Metadata = {
  title: BUNDLE.shortName,
  description: BUNDLE.subtitle,
  openGraph: {
    title: BUNDLE.shortName,
    description: BUNDLE.subtitle,
    images: [{ url: BUNDLE.cover, width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: BUNDLE.shortName,
    description: BUNDLE.subtitle,
    images: [BUNDLE.cover],
  },
};

export default function Page() {
  return <BundlePage />;
}
