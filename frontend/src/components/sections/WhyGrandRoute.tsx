import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { whyGrandRoute } from "../../data/company";

export function WhyGrandRoute() {
  return (
    <section className="bg-off-white py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader eyebrow="Why Grand Route" heading="Capability, not claims." />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          {whyGrandRoute.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="border-t border-hairline pt-6">
                <span className="font-display text-xs font-semibold text-grp-burgundy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
