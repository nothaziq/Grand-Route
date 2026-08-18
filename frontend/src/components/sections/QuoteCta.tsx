import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { RouteLine } from "../common/RouteLine";

export function QuoteCta() {
  return (
    <section className="bg-charcoal py-24 sm:py-28">
      <Container>
        <Reveal>
          <RouteLine tone="dark" className="mb-10" />
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="max-w-xl font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-off-white text-balance">
              Tell us what the operation needs.
            </h2>
            <Button to="/request-quote" variant="primary" className="shrink-0">
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
