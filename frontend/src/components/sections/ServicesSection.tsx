import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { Button } from "../common/Button";
import { ServiceGrid } from "../services/ServiceGrid";
import { services } from "../../data/services";

export function ServicesSection() {
  return (
    <section id="services" className="bg-off-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeader
              eyebrow="Licensed Activities"
              heading="Five services, three capability groups."
              description="Every service below reflects a licensed business activity — nothing more, nothing invented."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/services" variant="secondary" className="shrink-0">
              All Services
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <ServiceGrid services={services} />
        </Reveal>
      </Container>
    </section>
  );
}
