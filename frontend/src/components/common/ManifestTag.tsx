import { cn } from "../../lib/cn";

interface ManifestTagProps {
  children: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Small bordered label styled after a transport waybill stamp —
 * the site's recurring signature detail, used for section eyebrows.
 */
export function ManifestTag({ children, tone = "light", className }: ManifestTagProps) {
  return (
    <span
      className={cn(
        "manifest-corners inline-flex items-center px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.18em]",
        tone === "light" ? "text-ink" : "text-off-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
