import type { ReactNode } from "react";
import { Container } from "./Container";
import { ManifestTag } from "./ManifestTag";
import { RouteLine } from "./RouteLine";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="bg-charcoal pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <ManifestTag tone="dark" className="text-grp-green">
          {eyebrow}
        </ManifestTag>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] text-off-white text-balance">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-xl font-body text-[15px] leading-relaxed text-off-white/70">
            {description}
          </p>
        ) : null}
        {children}
        <RouteLine tone="dark" className="mt-10" />
      </Container>
    </header>
  );
}
