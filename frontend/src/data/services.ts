import type { Capability, Service } from "../types";

export const capabilities: Capability[] = [
  {
    id: "transportation",
    number: "01",
    title: "Transportation",
    summary: "Moving materials where operations require them.",
    serviceSlugs: ["material-transport"],
    image: "/images/capabilities/transportation.jpg",
  },
  {
    id: "maintenance",
    number: "02",
    title: "Maintenance",
    summary: "Keeping buildings and electromechanical systems running.",
    serviceSlugs: ["building-maintenance", "electromechanical"],
    image: "/images/projects/villa-flooring-paving/floor-01.jpg",
  },
  {
    id: "equipment",
    number: "03",
    title: "Equipment",
    summary: "Heavy machinery and equipment available for rental.",
    serviceSlugs: ["heavy-equipment"],
    image: "/images/fleet/backhoe-loader-3cx.jpg",
  },
];

export const services: Service[] = [
  {
    slug: "material-transport",
    number: "01",
    title: "Material Transportation",
    shortTitle: "Material Transport",
    shortDescription: "Transport of materials by light trucks.",
    description:
      "Grand Route transports materials by light truck in support of business and site operations across Abu Dhabi. This licensed activity covers the movement of goods and materials between sites, suppliers, and project locations.",
    applications: [
      "Site-to-site material movement",
      "Supplier collection and delivery",
      "Scheduled or on-request transport runs",
    ],
    capability: "transportation",
    relatedSlugs: ["heavy-equipment", "building-maintenance"],
  },
  {
    slug: "building-maintenance",
    number: "02",
    title: "Building Maintenance",
    shortTitle: "Building Maintenance",
    shortDescription: "Building maintenance services.",
    description:
      "Grand Route carries out building maintenance for commercial and operational properties, supporting the upkeep of facilities as a licensed activity.",
    applications: [
      "General facility upkeep",
      "Ongoing maintenance support",
      "Maintenance coordinated around active operations",
    ],
    capability: "maintenance",
    relatedSlugs: ["electromechanical", "material-transport"],
    image: "/images/projects/villa-flooring-paving/floor-03.jpg",
  },
  {
    slug: "electromechanical",
    number: "03",
    title: "Electromechanical Services",
    shortTitle: "Electromechanical",
    shortDescription: "Electromechanical equipment installation and maintenance.",
    description:
      "Grand Route installs and maintains electromechanical equipment as part of its licensed activities, supporting the electromechanical systems that keep facilities and operations running.",
    applications: [
      "Electromechanical equipment installation",
      "Ongoing electromechanical maintenance",
      "Support for facility operational systems",
    ],
    capability: "maintenance",
    relatedSlugs: ["building-maintenance", "heavy-equipment"],
    image: "/images/projects/ductwork-installation/duct-02.jpg",
  },
  {
    slug: "heavy-equipment",
    number: "04",
    title: "Heavy Equipment Rental",
    shortTitle: "Heavy Equipment",
    shortDescription: "Heavy machines and equipment renting.",
    description:
      "Grand Route rents heavy machines and equipment in support of construction, industrial, and operational requirements across Abu Dhabi.",
    applications: [
      "Construction site equipment needs",
      "Industrial operations support",
      "Short and longer-term equipment rental",
    ],
    capability: "equipment",
    relatedSlugs: ["material-transport", "electromechanical"],
    image: "/images/fleet/skid-steer-loader.jpg",
  },
];

export const quoteServiceOptions: { value: Service["slug"]; label: string }[] = services.map((s) => ({
  value: s.slug,
  label: s.title,
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getCapabilityById(id: Service["capability"]): Capability | undefined {
  return capabilities.find((c) => c.id === id);
}
