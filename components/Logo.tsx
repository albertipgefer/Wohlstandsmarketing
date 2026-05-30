/* WSM-Logo — rendert IMMER das identische Bild wie das Favicon.
 * Single Source of Truth: /icon.png (im app/-Ordner).
 * Wenn du das Logo ändern willst: NUR /icon.png in /app, /public und ggf.
 * SVG-Variante austauschen. Nie wieder ein separates Inline-SVG hier
 * pflegen — das führt unweigerlich zu Abweichungen zwischen Tab-Favicon
 * und Nav-Bar-Logo (siehe Session 28.05.2026).
 */

export default function Logo({
  size = 36,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon.png"
        width={size}
        height={size}
        alt="Wohlstandsmarketing – Agentur für Webdesign, SEO und KI-Sichtbarkeit"
        className="shrink-0 select-none"
        draggable={false}
        decoding="async"
      />
      {withWordmark && (
        <span className="text-[14px] font-semibold tracking-tight text-[var(--text)] sm:text-[15px]">
          Wohlstandsmarketing
        </span>
      )}
    </span>
  );
}
