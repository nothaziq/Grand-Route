import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { ServiceGrid } from "../components/services/ServiceGrid";
import { capabilities, services } from "../data/services";

export function ServicesPage() {
  useSeo({
    title: "Services",
    description:
      "Material transportation, building maintenance, electromechanical services, and heavy equipment rental in Abu Dhabi.",
    path: "/services",
  });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Four licensed activities, grouped by capability."
        description="Transportation, maintenance, and equipment — organized the way operations actually request them."
      />

      <section className="bg-off-white py-6 sm:py-8">
        <Container>
          <div className="grid grid-cols-1 gap-6 border-b border-hairline pb-10 sm:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.id} id={cap.id} className="scroll-mt-28">
                <span className="font-display text-xs font-semibold text-grp-green">{cap.number}</span>
                <h2 className="mt-2 font-display text-lg font-semibold text-ink">{cap.title}</h2>
                <p className="mt-1 font-body text-sm text-ink-muted">{cap.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-off-white pb-24 sm:pb-28">
        <Container>
          <Reveal>
            <ServiceGrid services={services} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
