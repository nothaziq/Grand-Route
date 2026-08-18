import { cn } from "../../lib/cn";

interface PlaceholderImageProps {
  label: string;
  aspect?: string; // tailwind aspect-ratio class, e.g. "aspect-[4/5]"
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Stands in for real GRP photography (vehicles, equipment, site work)
 * that has not yet been supplied. Deliberately not an AI-generated
 * image of trucks/equipment — per docs/DESIGN-SYSTEM.md — so nothing
 * on the live site misrepresents actual company assets. Styled as a
 * technical "photography pending" plate rather than hidden or faked.
 */
export function PlaceholderImage({ label, aspect = "aspect-[4/3]", className, tone = "light" }: PlaceholderImageProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border",
        aspect,
        isDark ? "border-hairline-dark bg-charcoal-soft" : "border-hairline bg-light-gray",
        className,
      )}
      role="img"
      aria-label={`Placeholder for: ${label}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`diag-${label.replace(/\s+/g, "-")}`} width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="14" stroke={isDark ? "#3a3c37" : "#c8c7bd"} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#diag-${label.replace(/\s+/g, "-")})`} />
      </svg>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <span
          className={cn(
            "font-body text-[10px] font-bold uppercase tracking-[0.14em]",
            isDark ? "text-off-white/70" : "text-ink-muted",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "shrink-0 font-body text-[10px] font-bold uppercase tracking-[0.14em]",
            isDark ? "text-off-white/40" : "text-ink-muted/60",
          )}
        >
          Photography pending
        </span>
      </div>
    </div>
  );
}
