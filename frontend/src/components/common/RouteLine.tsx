import { cn } from "../../lib/cn";

interface RouteLineProps {
  tone?: "light" | "dark";
  className?: string;
}

/**
 * A dashed route line with waypoint markers — the recurring visual
 * signature that ties the "Grand Route" name to a literal transport
 * route, used as a section divider instead of a generic rule.
 */
export function RouteLine({ tone = "light", className }: RouteLineProps) {
  const lineColor = tone === "light" ? "#d6d5cc" : "#3a3c37";
  const nodeColor = tone === "light" ? "#1c1e1b" : "#f5f4ef";

  return (
    <svg
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className={cn("h-2 w-full", className)}
      aria-hidden="true"
    >
      <line x1="0" y1="4" x2="100" y2="4" stroke={lineColor} strokeWidth="1" strokeDasharray="1.2 3" />
      <circle cx="0" cy="4" r="2" fill={nodeColor} />
      <circle cx="50" cy="4" r="1.4" fill={lineColor} />
      <circle cx="100" cy="4" r="2" fill="#1b9b68" />
    </svg>
  );
}
