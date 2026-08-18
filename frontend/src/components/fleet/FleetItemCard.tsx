import { motion } from "motion/react";
import type { FleetItem } from "../../types";
import { PlaceholderImage } from "../common/PlaceholderImage";

export function FleetItemCard({ item }: { item: FleetItem }) {
  return (
    <motion.div
      className="group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {item.image ? (
        <div className="aspect-[4/3] w-full overflow-hidden border border-hairline bg-light-gray transition-shadow duration-300 group-hover:shadow-lg">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>
      ) : (
        <PlaceholderImage
          label={item.name}
          aspect="aspect-[4/3]"
          className="transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.02]"
        />
      )}
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{item.name}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{item.description}</p>
    </motion.div>
  );
}
