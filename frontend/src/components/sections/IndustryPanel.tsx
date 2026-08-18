import type { Industry } from "../../types";

export function IndustryPanel({ industry }: { industry: Industry }) {
  return (
    <div className="manifest-corners flex flex-col gap-3 border border-hairline p-6 text-ink transition-colors hover:border-grp-green/50">
      <h3 className="font-display text-lg font-semibold text-ink">{industry.title}</h3>
      <p className="font-body text-sm leading-relaxed text-ink-muted">{industry.description}</p>
    </div>
  );
}
