import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../common/Container";
import { PlaceholderImage } from "../common/PlaceholderImage";
import { Reveal } from "../common/Reveal";
import { capabilities } from "../../data/services";

export function CoreCapabilities() {
  return (
    <section className="bg-off-white py-24 sm:py-28">
      <Container>
        <Reveal>
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-grp-green">
            Core Capabilities
          </span>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] text-ink text-balance">
            Three capability groups, one operator.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 0.08}>
              <Link
                to={`/services#${cap.id}`}
                className="group flex h-full flex-col"
              >
                {cap.image ? (
                  <div className="aspect-[5/4] w-full overflow-hidden border border-hairline bg-light-gray transition-shadow duration-300 group-hover:shadow-lg">
                    <img
                      src={cap.image}
                      alt={`${cap.title} — GRP`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    label={`${cap.title} — GRP`}
                    aspect="aspect-[5/4]"
                    className="transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.02]"
                  />
                )}
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-display text-sm font-semibold text-grp-green">{cap.number}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                      {cap.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-ink-muted transition-all duration-200 ease-[var(--ease-grp)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-grp-green" />
                </div>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-muted">{cap.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
