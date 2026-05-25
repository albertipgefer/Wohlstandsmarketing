/* WSM-Logo — blue rounded square with white W + orange accent dot. */

export default function Logo({
  size = 36,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#1663de" />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fontFamily="'Inter', 'Helvetica Neue', sans-serif"
          fontWeight="900"
          fontSize="36"
          fill="#ffffff"
          letterSpacing="-1.5"
        >
          W
        </text>
        <circle cx="49" cy="49" r="5.5" fill="#db6f16" />
      </svg>
      {withWordmark && (
        <span className="text-[14px] font-semibold tracking-tight text-[var(--text)] sm:text-[15px]">
          Wohlstandsmarketing
        </span>
      )}
    </span>
  );
}
