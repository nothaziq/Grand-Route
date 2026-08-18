import type { ReactNode } from "react";
import { ManifestTag } from "./ManifestTag";
import { cn } from "../../lib/cn";

interface SectionHeaderProps {
  eyebrow: string;
  heading: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <ManifestTag tone={tone} className={cn(tone === "light" ? "text-grp-green" : "text-grp-green")}>
        {eyebrow}
      </ManifestTag>
      <h2
        className={cn(
          "mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] text-balance",
          tone === "light" ? "text-ink" : "text-off-white",
        )}
      >
        {heading}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 font-body text-[15px] leading-relaxed",
            tone === "light" ? "text-ink-muted" : "text-off-white/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
