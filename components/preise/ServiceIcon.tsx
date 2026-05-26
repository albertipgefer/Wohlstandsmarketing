// Schlanke SVG-Line-Icons (Heroicons-Stil) für den Pricing-Konfigurator.
// Keine Emojis — neutrale, professionelle Optik.

type IconName =
  | "building"
  | "target"
  | "refresh"
  | "search"
  | "chart"
  | "bolt"
  | "trending"
  | "wrench";

const PATHS: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <path d="M3 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16" />
      <path d="M15 9h5a1 1 0 0 1 1 1v11" />
      <path d="M3 21h18" />
      <path d="M7 8h.01M7 12h.01M7 16h.01M11 8h.01M11 12h.01M11 16h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 14.85-6.85L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-14.85 6.85L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 16V10" />
      <path d="M12 16V6" />
      <path d="M17 16v-4" />
    </>
  ),
  bolt: (
    <>
      <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8z" />
    </>
  ),
  trending: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.83 2.83 0 0 1-4-4l9.4-9.4z" />
      <path d="M16 8 8 16" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  className = "",
  size = 24,
}: {
  name: IconName | string;
  className?: string;
  size?: number;
}) {
  const paths = (PATHS as Record<string, React.ReactNode>)[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths}
    </svg>
  );
}
