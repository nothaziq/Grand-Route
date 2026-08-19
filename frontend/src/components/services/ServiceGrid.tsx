import type { Service } from "../../types";
import { ServicePanel } from "./ServicePanel";

interface ServiceGridProps {
  services: Service[];
  /** When true, displays sequential 01/02/03… instead of each service's
   *  catalog number — use for filtered subsets (e.g. a homepage teaser)
   *  so the list doesn't jump straight to 03. The full /services page
   *  should NOT set this, since it lists every service in catalog order. */
  renumber?: boolean;
}

export function ServiceGrid({ services, renumber = false }: ServiceGridProps) {
  return (
    <div className="border-b border-hairline">
      {services.map((service, i) => (
        <ServicePanel
          key={service.slug}
          service={service}
          reversed={i % 2 === 1}
          displayNumber={renumber ? String(i + 1).padStart(2, "0") : undefined}
        />
      ))}
    </div>
  );
}
