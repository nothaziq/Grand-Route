import type { FleetCategory } from "../../types";
import { PlaceholderImage } from "../common/PlaceholderImage";

export function FleetCategoryCard({ category }: { category: FleetCategory }) {
  return (
    <div className="group">
      <PlaceholderImage
        label={category.title}
        aspect="aspect-[4/3]"
        className="transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.02]"
      />
      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{category.title}</h3>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-ink-muted">{category.description}</p>
    </div>
  );
}
