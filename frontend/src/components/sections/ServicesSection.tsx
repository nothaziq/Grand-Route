import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { Button } from "../common/Button";
import { ServiceGrid } from "../services/ServiceGrid";
import { services } from "../../data/services";

// Homepage teaser highlights only the services we have site photography for.
// The full list of five licensed activities is always shown on /services.
const featuredServices = services.filter((s) => s.image);

export function ServicesSection() {
  return (
    <section id="services" className="bg-off-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeader
              eyebrow="Licensed Activities"
              heading="Featured services, from the field."
              description="Every service below reflects a licensed business activity — nothing more, nothing invented. See all five services and capability groups on the full list."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/services" variant="secondary" className="shrink-0">
              All Services
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <ServiceGrid services={featuredServices} renumber />
        </Reveal>
      </Container>
    </section>
  );
}
