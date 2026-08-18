import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "onLight" | "onDark";

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  icon?: "arrow-up-right" | "arrow-right" | "none";
}

const base =
  "group inline-flex items-center gap-2 font-body font-semibold text-[13px] tracking-[0.04em] uppercase transition-all duration-200 ease-[var(--ease-grp)] focus-visible:outline-2 focus-visible:outline-offset-2";

function variantClasses(variant: Variant, tone: Tone) {
  if (variant === "primary") {
    return "px-6 py-3.5 bg-grp-green text-off-white hover:bg-grp-green-dark active:bg-grp-green-dark";
  }
  if (variant === "secondary") {
    return tone === "onDark"
      ? "px-6 py-3.5 border border-off-white/40 text-off-white hover:border-off-white hover:bg-off-white/5"
      : "px-6 py-3.5 border border-ink/30 text-ink hover:border-ink hover:bg-ink/5";
  }
  // ghost
  return tone === "onDark"
    ? "text-off-white hover:text-grp-green py-1"
    : "text-ink hover:text-grp-green py-1";
}

function Icon({ icon }: { icon: NonNullable<SharedProps["icon"]> }) {
  if (icon === "none") return null;
  const cls = "size-4 transition-transform duration-200 ease-[var(--ease-grp)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
  if (icon === "arrow-up-right") return <ArrowUpRight className={cls} aria-hidden="true" />;
  return <ArrowRight className={cn(cls, "group-hover:translate-y-0")} aria-hidden="true" />;
}

interface ButtonAsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  to?: undefined;
  href?: undefined;
}
interface ButtonAsLink extends SharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  to: string;
  href?: undefined;
}
interface ButtonAsAnchor extends SharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  to?: undefined;
  href: string;
}

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const DEFAULT_ICON: Record<Variant, SharedProps["icon"]> = {
  primary: "arrow-up-right",
  secondary: "arrow-right",
  ghost: "arrow-right",
};

export function Button(props: Props) {
  const { children, variant = "primary", tone = "onLight", className, icon, ...rest } = props;
  const resolvedIcon = icon ?? DEFAULT_ICON[variant];
  const classes = cn(base, variantClasses(variant, tone), className);

  if ("to" in props && props.to) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkRest}>
        <span>{children}</span>
        <Icon icon={resolvedIcon!} />
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        <span>{children}</span>
        <Icon icon={resolvedIcon!} />
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      <span>{children}</span>
      <Icon icon={resolvedIcon!} />
    </button>
  );
}
