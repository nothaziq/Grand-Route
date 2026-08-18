import type { Service } from "../../types";
import { ServicePanel } from "./ServicePanel";

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="border-b border-hairline">
      {services.map((service, i) => (
        <ServicePanel key={service.slug} service={service} reversed={i % 2 === 1} />
      ))}
    </div>
  );
}
