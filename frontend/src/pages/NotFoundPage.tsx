import { useSeo } from "../hooks/useSeo";
import { Container } from "../components/common/Container";
import { Button } from "../components/common/Button";

export function NotFoundPage() {
  useSeo({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    path: "/404",
  });

  return (
    <section className="flex min-h-[70vh] items-center bg-off-white py-32">
      <Container>
        <span className="font-display text-sm font-semibold text-grp-green">404</span>
        <h1 className="mt-4 max-w-lg font-display text-3xl font-semibold text-ink sm:text-4xl">
          This route doesn't exist.
        </h1>
        <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
          The page you're looking for may have moved. Head back to the homepage or explore our
          services.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/" variant="primary">
            Back Home
          </Button>
          <Button to="/services" variant="secondary">
            Explore Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
