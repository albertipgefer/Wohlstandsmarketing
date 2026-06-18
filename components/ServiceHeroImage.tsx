import Image from "next/image";

/**
 * Hero-Visual einer Leistung (markenkonformes Brand-Bild statt Portrait).
 * Zwei Slots, passend zum bestehenden Hero-Layout der Hubs & Stadt-Seiten:
 * - Desktop: quadratische Karte in der rechten Hero-Spalte (lg:block)
 * - Mobile: volle Breite zwischen Subline und CTAs (lg:hidden)
 * Bilder sind quadratische Brand-Visuals auf hellem Grund → dezente Karte mit Rahmen.
 */

export function ServiceHeroImageDesktop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative order-2 mx-auto hidden aspect-square w-full max-w-[440px] overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_30px_80px_-30px_rgba(10,10,10,0.18)] lg:block">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="440px"
        className="object-cover"
      />
    </div>
  );
}

export function ServiceHeroImageMobile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-white lg:hidden">
      <Image
        src={src}
        alt={alt}
        width={1024}
        height={1024}
        priority
        fetchPriority="high"
        quality={80}
        sizes="(max-width: 640px) 360px, 480px"
        className="h-auto w-full"
      />
    </div>
  );
}
