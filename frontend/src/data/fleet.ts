import type { FleetCategory, FleetItem } from "../types";

/**
 * Equipment photography supplied directly by the business. Only images
 * with clear on-site/company context were used (see docs/CONTENT.md);
 * stock-style listing photos were excluded. Specifications are left
 * unset until the business confirms exact model details.
 */
export const fleetCategories: FleetCategory[] = [
  {
    id: "heavy-machinery",
    title: "Heavy Machinery",
    description: "Equipment available for rental to support construction and industrial operations.",
    image: "/images/fleet/backhoe-loader-3cx.jpg",
  },
];

export const fleetItems: FleetItem[] = [
  {
    slug: "skid-steer-loader",
    name: "Skid Steer Loader",
    category: "heavy-machinery",
    description: "Compact skid steer loader used for material handling and site clearing.",
    image: "/images/fleet/skid-steer-loader.jpg",
  },
  {
    slug: "backhoe-loader-3cx",
    name: "Backhoe Loader",
    category: "heavy-machinery",
    description: "JCB 3CX backhoe loader used for excavation, loading, and general earthmoving work.",
    image: "/images/fleet/backhoe-loader-3cx.jpg",
  },
];
