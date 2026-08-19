import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Reveal } from "../common/Reveal";
import { Button } from "../common/Button";
import { projects } from "../../data/projects";

export function ProjectsPreview() {
  const featured = projects.filter((p) => p.published && p.images.length > 0);

  if (featured.length === 0) return null;

  return (
    <section className="bg-off-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeader
              eyebrow="Recent Work"
              heading="On site, doing the work."
              description="A look at recent installation and maintenance work carried out by the team."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/projects" variant="secondary" className="shrink-0">
              All Projects
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <Link to="/projects" className="group block">
                <motion.div
                  className="aspect-[4/3] w-full overflow-hidden border border-hairline bg-light-gray transition-shadow duration-300 group-hover:shadow-lg"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-grp)] group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </motion.div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
                    <p className="mt-1 font-body text-sm text-ink-muted">{project.location}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-ink-muted transition-all duration-200 ease-[var(--ease-grp)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-grp-green" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
