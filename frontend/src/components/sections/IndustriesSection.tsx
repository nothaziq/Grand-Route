import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { IndustryPanel } from "./IndustryPanel";
import { industries } from "../../data/industries";

export function IndustriesSection() {
  return (
    <section className="bg-light-gray py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Industries"
            heading="Where these services apply."
            description="The operational categories Grand Route's services are built to support."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.id} delay={i * 0.05}>
              <IndustryPanel industry={industry} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
