import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { FleetCategoryCard } from "../components/fleet/FleetCategoryCard";
import { FleetItemCard } from "../components/fleet/FleetItemCard";
import { fleetCategories, fleetItems } from "../data/fleet";

export function FleetPage() {
  useSeo({
    title: "Fleet & Equipment",
    description:
      "Light trucks, passenger buses, and heavy machinery available through Grand Route Transport & General Maintenance.",
    path: "/fleet",
  });

  return (
    <>
      <PageHeader
        eyebrow="Fleet & Equipment"
        title="Vehicles and machinery for the job at hand."
        description="Categories are established below; individual listings are published as inventory is confirmed."
      />

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {fleetCategories.map((category, i) => (
              <Reveal key={category.id} delay={i * 0.08}>
                <FleetCategoryCard category={category} />
              </Reveal>
            ))}
          </div>

          {fleetItems.length === 0 ? (
            <Reveal delay={0.2} className="mt-20 border-t border-hairline pt-14 text-center">
              <p className="mx-auto max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
                Individual vehicle and equipment listings will appear here once inventory details
                are confirmed. For current availability, request a quote directly.
              </p>
              <div className="mt-6 flex justify-center">
                <Button to="/request-quote" variant="primary">
                  Request a Quote
                </Button>
              </div>
            </Reveal>
          ) : (
            <div className="mt-20 border-t border-hairline pt-14">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {fleetItems.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.08}>
                    <FleetItemCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
