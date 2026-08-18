import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { IndustryPanel } from "../components/sections/IndustryPanel";
import { industries } from "../data/industries";

export function IndustriesPage() {
  useSeo({
    title: "Industries",
    description:
      "Construction, facilities, industrial operations, workforce transportation, and logistics — the operational categories Grand Route's services support.",
    path: "/industries",
  });

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Operational categories these services support."
        description="Presented as applications, not as a client list — Grand Route does not publish clients or partnerships that haven't been verified."
      />

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.id} delay={i * 0.05}>
                <IndustryPanel industry={industry} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
