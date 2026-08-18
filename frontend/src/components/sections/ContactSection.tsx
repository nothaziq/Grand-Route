import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { ContactCta } from "../common/ContactCta";
import { LeadershipContacts } from "../common/LeadershipContacts";
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
        <Reveal delay={0.15} className="mt-14">
          <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
            Speak with an owner directly
          </h3>
          <div className="mt-5">
            <LeadershipContacts />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
