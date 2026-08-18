import type { FleetCategory, FleetItem } from "../types";

/**
 * No verified fleet inventory has been supplied yet. Per docs/CONTENT.md
 * and docs/PAGES.md, equipment models, capacities, and specifications
 * must not be invented. This file defines the category framework so
 * real inventory can be added without touching page components.
 */
export const fleetCategories: FleetCategory[] = [
  {
    id: "light-trucks",
    title: "Light Trucks",
    description: "Vehicles used for material transportation between sites and suppliers.",
  },
  {
    id: "passenger-buses",
    title: "Passenger Buses",
    description: "Rented buses used for workforce and passenger transportation.",
  },
  {
    id: "heavy-machinery",
    title: "Heavy Machinery",
    description: "Equipment available for rental to support construction and industrial operations.",
  },
];

export const fleetItems: FleetItem[] = [];
