import type { PostMeta } from "@/content/blog/types";

/**
 * Category-driven cover graphics. Each category gets its own visual motif
 * so the blog list doesn't look like a wall of gradients. Generated as SVG
 * inside a gradient frame — no asset files needed.
 */
export default function PostCover({
  meta,
  size = "card",
}: {
  meta: PostMeta;
  size?: "card" | "hero";
}) {
  const isHero = size === "hero";
  const motif = CategoryMotif[meta.category] ?? GenericMotif;
  const MotifComponent = motif;

  return (
    <div
      className={`relative w-full overflow-hidden ${
        isHero ? "aspect-[16/8] rounded-3xl" : "aspect-[16/10] rounded-2xl"
      }`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${meta.cover.from} 0%, ${meta.cover.to} 100%)`,
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:36px_36px]"
      />
      {/* Soft highlight */}
      <div
        aria-hidden
        className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-black/30 blur-3xl"
      />

      {/* Category motif (right side) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 flex items-center ${
          isHero ? "w-2/5 pr-6 md:pr-10" : "w-2/5 pr-4"
        }`}
      >
        <MotifComponent isHero={isHero} />
      </div>

      {/* Category label + thematic word (left side) */}
      <div
        className={`relative flex h-full flex-col justify-between p-5 text-white sm:p-6 ${
          isHero ? "md:p-10" : ""
        }`}
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {meta.category}
        </span>
        <span
          className={`relative z-10 font-[family-name:var(--font-serif)] italic leading-none tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${
            isHero ? "text-5xl md:text-7xl" : "text-3xl sm:text-4xl"
          }`}
        >
          {meta.cover.label}
        </span>
      </div>
    </div>
  );
}

/* ───── Category-specific motifs (white-on-dark SVG decorations) ───── */

type MotifProps = { isHero: boolean };

function KiSichtbarkeitMotif({ isHero }: MotifProps) {
  const size = isHero ? 200 : 120;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className="opacity-70"
    >
      {/* Central node */}
      <circle cx="100" cy="100" r="14" fill="white" />
      {/* Orbiting nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 68;
        const cy = 100 + Math.sin(rad) * 68;
        return (
          <g key={angle}>
            <line
              x1="100"
              y1="100"
              x2={cx}
              y2={cy}
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <circle cx={cx} cy={cy} r="6" fill="white" fillOpacity="0.8" />
          </g>
        );
      })}
      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="white"
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeDasharray="3 6"
      />
    </svg>
  );
}

function TechnischesSeoMotif({ isHero }: MotifProps) {
  const size = isHero ? 200 : 120;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-80">
      {/* Code window */}
      <rect
        x="20"
        y="30"
        width="160"
        height="140"
        rx="10"
        fill="white"
        fillOpacity="0.06"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {/* Window dots */}
      <circle cx="32" cy="44" r="3" fill="white" fillOpacity="0.6" />
      <circle cx="42" cy="44" r="3" fill="white" fillOpacity="0.6" />
      <circle cx="52" cy="44" r="3" fill="white" fillOpacity="0.6" />
      {/* Code lines */}
      {[70, 88, 106, 124, 142].map((y, i) => (
        <rect
          key={y}
          x="32"
          y={y}
          width={[100, 70, 120, 60, 90][i]}
          height="6"
          rx="3"
          fill="white"
          fillOpacity={0.5 - i * 0.05}
        />
      ))}
    </svg>
  );
}

function LokalesSeoMotif({ isHero }: MotifProps) {
  const size = isHero ? 200 : 120;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-80">
      {/* Map pin */}
      <path
        d="M100 30 C 70 30 50 55 50 85 C 50 130 100 170 100 170 C 100 170 150 130 150 85 C 150 55 130 30 100 30 Z"
        fill="white"
        fillOpacity="0.16"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      <circle cx="100" cy="85" r="18" fill="white" fillOpacity="0.9" />
      {/* Pulse rings */}
      <circle
        cx="100"
        cy="170"
        rx="30"
        ry="6"
        fill="none"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="170"
        rx="48"
        ry="9"
        fill="none"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
    </svg>
  );
}

function WebdesignMotif({ isHero }: MotifProps) {
  const size = isHero ? 200 : 120;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-80">
      {/* Browser frame */}
      <rect
        x="20"
        y="35"
        width="160"
        height="130"
        rx="8"
        fill="white"
        fillOpacity="0.06"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      {/* Top bar */}
      <line
        x1="20"
        y1="55"
        x2="180"
        y2="55"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <circle cx="32" cy="45" r="2.5" fill="white" fillOpacity="0.7" />
      <circle cx="40" cy="45" r="2.5" fill="white" fillOpacity="0.7" />
      <circle cx="48" cy="45" r="2.5" fill="white" fillOpacity="0.7" />
      {/* Hero block */}
      <rect
        x="34"
        y="68"
        width="80"
        height="40"
        rx="4"
        fill="white"
        fillOpacity="0.3"
      />
      <rect
        x="124"
        y="68"
        width="42"
        height="40"
        rx="4"
        fill="white"
        fillOpacity="0.12"
      />
      {/* CTA bar */}
      <rect
        x="34"
        y="118"
        width="60"
        height="14"
        rx="7"
        fill="white"
        fillOpacity="0.9"
      />
      {/* Footer dots */}
      {[34, 56, 78, 100, 122, 144].map((x) => (
        <rect
          key={x}
          x={x}
          y="145"
          width="14"
          height="3"
          rx="1.5"
          fill="white"
          fillOpacity="0.4"
        />
      ))}
    </svg>
  );
}

function ConversionMotif({ isHero }: MotifProps) {
  const size = isHero ? 200 : 120;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-80">
      {/* Funnel */}
      <path
        d="M 30 40 L 170 40 L 130 100 L 130 170 L 70 170 L 70 100 Z"
        fill="white"
        fillOpacity="0.1"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      {/* Layers */}
      <line
        x1="46"
        y1="65"
        x2="154"
        y2="65"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <line
        x1="62"
        y1="90"
        x2="138"
        y2="90"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      {/* Arrow down at bottom */}
      <path
        d="M 95 135 L 105 135 L 100 150 Z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="100" cy="125" r="5" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function GenericMotif({ isHero }: MotifProps) {
  const size = isHero ? 200 : 120;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-60">
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <circle cx="100" cy="100" r="20" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

const CategoryMotif: Record<string, (p: MotifProps) => React.JSX.Element> = {
  "KI-Sichtbarkeit": KiSichtbarkeitMotif,
  "Technisches SEO": TechnischesSeoMotif,
  "Lokales SEO": LokalesSeoMotif,
  "Webdesign": WebdesignMotif,
  "Conversion": ConversionMotif,
};
