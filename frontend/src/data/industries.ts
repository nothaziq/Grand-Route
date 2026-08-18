import type { Industry } from "../types";

/**
 * Presented as operational requirement categories that Grand Route's
 * services can support — not as confirmed clients or partnerships
 * (per docs/PAGES.md).
 */
export const industries: Industry[] = [
  {
    id: "construction",
    title: "Construction",
    description: "Material transport and heavy equipment rental for active construction sites.",
  },
  {
    id: "facilities-property",
    title: "Facilities & Property",
    description: "Building maintenance and electromechanical support for commercial properties.",
  },
  {
    id: "industrial-operations",
    title: "Industrial Operations",
    description: "Transportation and equipment support for industrial facility operations.",
  },
  {
    id: "workforce-transportation",
    title: "Workforce Transportation",
    description: "Bus-based passenger transportation for operational personnel.",
  },
  {
    id: "logistics-supply",
    title: "Logistics & Supply",
    description: "Light truck transport supporting site-to-site material movement.",
  },
];
