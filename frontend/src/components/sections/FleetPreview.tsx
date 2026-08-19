import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { Button } from "../common/Button";
import { FleetCategoryCard } from "../fleet/FleetCategoryCard";
import { fleetCategories } from "../../data/fleet";

export function FleetPreview() {
  return (
    <section className="bg-off-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeader
              eyebrow="Fleet & Equipment"
              heading="Built for material, people, and machinery."
              description="Vehicle and equipment listings are added as inventory is confirmed."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/fleet" variant="secondary" className="shrink-0">
              View Fleet
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 max-w-sm">
          {fleetCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.08}>
              <FleetCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
