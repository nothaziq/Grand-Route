import { Link, Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { PlaceholderImage } from "../components/common/PlaceholderImage";
import { Button } from "../components/common/Button";
import { ManifestTag } from "../components/common/ManifestTag";
import { getServiceBySlug, services } from "../data/services";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useSeo({
    title: service?.title ?? "Service",
    description: service?.description ?? "Grand Route service detail.",
    path: `/services/${slug ?? ""}`,
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const related = services.filter((s) => service.relatedSlugs.includes(s.slug));

  return (
    <>
      <PageHeader
        eyebrow={`Service ${service.number} / 05`}
        title={service.title}
        description={service.shortDescription}
      >
        <div className="mt-8">
          <Button to="/request-quote" variant="primary">
            Request a Quote
          </Button>
        </div>
      </PageHeader>

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Overview</h2>
                <p className="mt-5 max-w-xl font-body text-[15px] leading-relaxed text-ink-muted">
                  {service.description}
                </p>
              </Reveal>

              <Reveal delay={0.08} className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Typical applications
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.applications.map((application) => (
                    <li key={application} className="flex items-start gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-grp-green" aria-hidden="true" />
                      <span className="font-body text-[15px] leading-relaxed text-ink">{application}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.05}>
                {service.image ? (
                  <div className="aspect-[4/5] w-full overflow-hidden border border-hairline bg-light-gray">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <PlaceholderImage label={`${service.title} — GRP`} aspect="aspect-[4/5]" />
                )}
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-hairline bg-off-white py-20 sm:py-24">
          <Container>
            <ManifestTag className="text-grp-green">Related Services</ManifestTag>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="group border-t border-hairline pt-5"
                >
                  <span className="font-display text-xs font-semibold text-grp-green">{r.number}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-grp-green">
                    {r.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-ink-muted">{r.shortDescription}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
