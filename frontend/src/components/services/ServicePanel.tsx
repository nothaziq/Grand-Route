import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Service } from "../../types";
import { PlaceholderImage } from "../common/PlaceholderImage";
import { cn } from "../../lib/cn";

interface ServicePanelProps {
  service: Service;
  reversed?: boolean;
}

export function ServicePanel({ service, reversed = false }: ServicePanelProps) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        "group grid grid-cols-1 items-center gap-8 border-t border-hairline py-10 transition-colors md:grid-cols-12 md:gap-10 md:py-14",
        "hover:bg-charcoal/[0.02]",
      )}
    >
      <div className={cn("md:col-span-6", reversed && "md:order-2")}>
        <PlaceholderImage
          label={`${service.title} — GRP`}
          aspect="aspect-[4/3]"
          className="transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.02]"
        />
      </div>
      <div className={cn("md:col-span-6", reversed && "md:order-1")}>
        <span className="font-display text-sm font-semibold text-grp-green">{service.number}</span>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
          {service.shortDescription}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-body text-[13px] font-semibold uppercase tracking-[0.06em] text-ink">
          Explore
          <ArrowRight className="size-4 text-grp-green transition-transform duration-200 ease-[var(--ease-grp)] group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
