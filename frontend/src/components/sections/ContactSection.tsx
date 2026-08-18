import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { ContactCta } from "../common/ContactCta";
import { company } from "../../data/company";

export function ContactSection() {
  return (
    <section className="bg-off-white py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            heading="Reach the office directly."
            description={`Based in ${company.location}, ${company.country}.`}
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <ContactCta />
        </Reveal>
      </Container>
    </section>
  );
}
