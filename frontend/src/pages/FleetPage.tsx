import { motion } from "motion/react";
import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { FleetItemCard } from "../components/fleet/FleetItemCard";
import { fleetCategories, fleetItems } from "../data/fleet";

export function FleetPage() {
  useSeo({
    title: "Fleet & Equipment",
    description: "Heavy machinery available for rental through Grand Route Transport & General Maintenance.",
    path: "/fleet",
  });

  return (
    <>
      <PageHeader
        eyebrow="Fleet & Equipment"
        title="Heavy machinery for the job at hand."
        description="Individual listings are published as inventory is confirmed."
      />

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          {fleetCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.08}>
              <motion.div
                className="group flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden border border-hairline bg-light-gray transition-shadow duration-300 group-hover:shadow-lg sm:w-96">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-2 max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}

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
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
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
