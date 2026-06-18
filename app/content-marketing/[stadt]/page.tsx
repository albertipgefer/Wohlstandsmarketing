import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/content/cities";
import { contentMarketingStadt } from "@/content/standortServices";
import ServiceStadtPage from "@/components/standort/ServiceStadtPage";

export async function generateStaticParams() {
  return cities.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stadt: string }>;
}): Promise<Metadata> {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) return {};
  return contentMarketingStadt.meta(city);
}

export default async function Page({
  params,
}: {
  params: Promise<{ stadt: string }>;
}) {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) notFound();
  return <ServiceStadtPage city={city} config={contentMarketingStadt} />;
}
