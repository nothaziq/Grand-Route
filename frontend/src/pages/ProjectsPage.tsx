import { useEffect, useState } from "react";
import { useSeo } from "../hooks/useSeo";
import { PageHeader } from "../components/common/PageHeader";
import { Container } from "../components/common/Container";
import { Reveal } from "../components/common/Reveal";
import { PlaceholderImage } from "../components/common/PlaceholderImage";
import { Button } from "../components/common/Button";
import { getProjects } from "../lib/api/projects";
import type { Project } from "../types";

type LoadState = "loading" | "loaded" | "error";

export function ProjectsPage() {
  useSeo({
    title: "Projects",
    description: "Published project work by Grand Route Transport & General Maintenance.",
    path: "/projects",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    getProjects()
      .then((data) => {
        if (cancelled) return;
        setProjects(data);
        setState("loaded");
      })
      .catch(() => {
        if (cancelled) return;
        setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Project work, as it's confirmed for publication."
        description="Grand Route only publishes projects the business has approved for release."
      />

      <section className="bg-off-white py-20 sm:py-24">
        <Container>
          {state === "loading" ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] w-full bg-light-gray" />
                  <div className="mt-4 h-4 w-2/3 bg-light-gray" />
                  <div className="mt-2 h-3 w-1/2 bg-light-gray" />
                </div>
              ))}
            </div>
          ) : state === "error" ? (
            <div className="border-t border-hairline pt-14 text-center">
              <p className="mx-auto max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
                Projects couldn't be loaded right now. Please try again shortly, or get in touch
                directly.
              </p>
              <div className="mt-6 flex justify-center">
                <Button to="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <Reveal className="border-t border-hairline pt-14 text-center">
              <PlaceholderImage
                label="Project gallery"
                aspect="aspect-[16/6]"
                className="mx-auto max-w-2xl"
              />
              <p className="mx-auto mt-8 max-w-md font-body text-[15px] leading-relaxed text-ink-muted">
                No projects are published yet. This page will list approved project work — location,
                service, and description — as it becomes available.
              </p>
              <div className="mt-6 flex justify-center">
                <Button to="/request-quote" variant="primary">
                  Request a Quote
                </Button>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.slug}>
                  <PlaceholderImage label={project.title} aspect="aspect-[4/3]" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{project.title}</h3>
                  <p className="mt-1 font-body text-sm text-ink-muted">{project.location}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
