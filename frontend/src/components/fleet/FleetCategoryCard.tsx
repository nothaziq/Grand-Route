import { motion } from "motion/react";
import type { FleetCategory } from "../../types";
import { PlaceholderImage } from "../common/PlaceholderImage";

export function FleetCategoryCard({ category }: { category: FleetCategory }) {
  return (
    <motion.div
      className="group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {category.image ? (
        <div className="aspect-[4/3] w-full overflow-hidden border border-hairline bg-light-gray shadow-none transition-shadow duration-300 group-hover:shadow-lg">
          <img
            src={category.image}
            alt={category.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>
      ) : (
        <PlaceholderImage
          label={category.title}
          aspect="aspect-[4/3]"
          className="transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.02]"
        />
      )}
      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{category.title}</h3>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-ink-muted">{category.description}</p>
    </motion.div>
  );
}
