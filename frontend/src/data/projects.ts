import type { Project } from "../types";

/**
 * Site photography supplied directly by the business. Client names are
 * withheld pending explicit approval per docs/CONTENT.md — these entries
 * use generic, factual descriptions of the work shown in the images only.
 * Update title/location/description once the business confirms exact
 * project names and client permission to publish.
 */
export const projects: Project[] = [
  {
    slug: "rooftop-ductwork-installation",
    title: "Rooftop Ductwork Installation",
    location: "Abu Dhabi, UAE",
    service: "electromechanical",
    description:
      "Fabrication and installation of galvanized sheet metal ductwork across a commercial rooftop, including curved transitions and multiple branch runs.",
    images: [
      "/images/projects/ductwork-installation/duct-01.jpg",
      "/images/projects/ductwork-installation/duct-02.jpg",
      "/images/projects/ductwork-installation/duct-03.jpg",
    ],
    published: true,
  },
  {
    slug: "villa-flooring-and-paving",
    title: "Villa Flooring & Paving Works",
    location: "UAE",
    service: "building-maintenance",
    description:
      "Interior marble tiling and exterior interlocking paver installation for a residential villa, covering bathrooms, walkways, and staircase finishing.",
    images: [
      "/images/projects/villa-flooring-paving/floor-01.jpg",
      "/images/projects/villa-flooring-paving/floor-02.jpg",
      "/images/projects/villa-flooring-paving/floor-03.jpg",
      "/images/projects/villa-flooring-paving/floor-04.jpg",
    ],
    published: true,
  },
];
