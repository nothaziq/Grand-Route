import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { ContactCta } from "../components/common/ContactCta";
import { LeadershipContacts } from "../components/common/LeadershipContacts";
import { Button } from "../components/common/Button";
import { company } from "../data/company";

export function ContactPage() {
  useSeo({
    title: "Contact",
    description: `Contact Grand Route Transport & General Maintenance in ${company.location}, ${company.country}.`,
    path: "/contact",
  });

  const mapQuery = encodeURIComponent(`${company.location}, ${company.country}`);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Speak with the Musaffah office."
        description="Call, email, or send a WhatsApp message directly — or request a quote for a specific requirement."
      >
        <div className="mt-8">
          <Button to="/request-quote" variant="primary">
            Request a Quote
          </Button>
        </div>
      </PageHeader>

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-ink">Get in touch</h2>
                <p className="mt-4 max-w-sm font-body text-[15px] leading-relaxed text-ink-muted">
                  {company.legalName} operates from {company.location}, {company.country}.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mt-8">
                <ContactCta />
              </Reveal>
              <Reveal delay={0.12} className="mt-10">
                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                  Speak with an owner directly
                </h3>
                <div className="mt-4">
                  <LeadershipContacts />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="aspect-[4/3] w-full overflow-hidden border border-hairline sm:aspect-[16/10]">
                  <iframe
                    title="Grand Route location — Musaffah, Abu Dhabi"
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    className="h-full w-full grayscale"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
