import { Container } from "../common/Container";
import { Reveal } from "../common/Reveal";
import { companySnapshot } from "../../data/company";

export function CompanySnapshot() {
  return (
    <section className="border-y border-hairline-dark bg-charcoal py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-8">
            {companySnapshot.map((item) => (
              <div key={item.label} className="border-l border-hairline-dark pl-5 sm:pl-8">
                <div className="font-display text-3xl font-semibold text-off-white sm:text-4xl">
                  {item.value}
                </div>
                <div className="mt-2 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-off-white/50">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
