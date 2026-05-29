import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { PRODUCTS } from "@/lib/products";

const product = PRODUCTS.find((p) => p.slug === "ki-webseite")!;

export const metadata: Metadata = {
  title: product.shortName,
  description: product.subtitle,
  openGraph: {
    title: product.shortName,
    description: product.subtitle,
    images: [{ url: product.cover, width: 1280, height: 720 }],
  },
};

export default function Page() {
  return <ProductPage product={product} />;
}
