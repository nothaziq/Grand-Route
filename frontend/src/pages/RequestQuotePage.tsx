import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { QuoteForm } from "../components/forms/QuoteForm";
import { ContactCta } from "../components/common/ContactCta";

export function RequestQuotePage() {
  useSeo({
    title: "Request a Quote",
    description:
      "Submit a transportation, maintenance, or equipment rental requirement to Grand Route Transport & General Maintenance.",
    path: "/request-quote",
  });

  return (
    <>
      <PageHeader
        eyebrow="Request a Quote"
        title="Tell us what the operation needs."
        description="Share the requirement below, or reach the office directly by phone, email, or WhatsApp."
      />

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <QuoteForm />
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                  Prefer to talk?
                </h3>
                <div className="mt-5">
                  <ContactCta layout="stack" />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
