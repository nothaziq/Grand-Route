import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { LeadershipContacts } from "../components/common/LeadershipContacts";
import { company, companySnapshot } from "../data/company";
import { capabilities } from "../data/services";

export function AboutPage() {
  useSeo({
    title: "About",
    description:
      "Grand Route Transport and General Maintenance is a Musaffah, Abu Dhabi-based operator licensed for transportation, maintenance, and equipment rental.",
    path: "/about",
  });

  return (
    <>
      <PageHeader
        eyebrow="About Grand Route"
        title="An Abu Dhabi operator built around five licensed capabilities."
        description="Grand Route Transport and General Maintenance is a commercial business operating from Musaffah, Abu Dhabi."
      />

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Company introduction
                </h2>
                <p className="mt-5 max-w-xl font-body text-[15px] leading-relaxed text-ink-muted">
                  {company.legalName} was established in {company.establishedYear} and operates from{" "}
                  {company.location}, {company.country}. The company holds a {company.licenceType}{" "}
                  licence covering five distinct activities: material transportation, passenger
                  transportation, building maintenance, electromechanical installation and
                  maintenance, and heavy equipment rental.
                </p>
                <p className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-ink-muted">
                  The business is structured to support operational requirements directly rather
                  than to position itself around unverifiable claims — every capability listed on
                  this site corresponds to a licensed activity.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Licensed capabilities
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {capabilities.map((cap) => (
                    <div key={cap.id} className="border-t border-hairline pt-4">
                      <span className="font-display text-xs font-semibold text-grp-green">
                        {cap.number}
                      </span>
                      <h3 className="mt-2 font-display text-base font-semibold text-ink">
                        {cap.title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                        {cap.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15} className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Leadership
                </h2>
                <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-ink-muted">
                  Reach either owner directly for quotes, scheduling, or general enquiries.
                </p>
                <div className="mt-6">
                  <LeadershipContacts />
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-14">
                <Button to="/request-quote" variant="primary">
                  Request a Quote
                </Button>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.05}>
                <div className="aspect-[4/5] w-full overflow-hidden border border-hairline bg-light-gray">
                  <img
                    src="/images/projects/villa-flooring-paving/floor-02.jpg"
                    alt="Grand Route site work, Abu Dhabi"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-8 border border-hairline p-6">
                <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                  Company Facts
                </h3>
                <dl className="mt-5 grid grid-cols-2 gap-y-5">
                  {companySnapshot.map((item) => (
                    <div key={item.label}>
                      <dt className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
