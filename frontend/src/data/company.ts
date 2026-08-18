import type { CompanyInfo } from "../types";

/**
 * Source of truth: supplied UAE economic licence (see docs/CONTENT.md).
 * Do not add unverified facts (years of experience, client counts,
 * fleet size, awards, certifications) to this file.
 */
export const company: CompanyInfo = {
  legalName: "Grand Route Transport and General Maintenance - L.L.C - S.P.C",
  tradeName: "Grand Route Transport & General Maintenance",
  shortName: "Grand Route",
  establishedDate: "2025-01-29",
  establishedYear: "2025",
  licenceType: "Commercial",
  licenceCategory: "Normal",
  location: "Musaffah, Abu Dhabi",
  region: "Abu Dhabi",
  country: "United Arab Emirates",
  licenceNumber: "CN-5733628",
  unifiedLicenceNumber: "501-2025-200020343",
  unifiedRegistrationNumber: "101-2025-200032876",
  email: "simpletyping.ae@gmail.com",
  phone: "+971586650434",
  phoneDisplay: "+971 58 665 0434",
  whatsappNumber: "971586650434",
};

export const heroContent = {
  headline: ["Moving Materials.", "Maintaining Infrastructure."],
  subhead:
    "Grand Route Transport & General Maintenance provides transportation, equipment rental, and maintenance solutions for business operations in Abu Dhabi.",
  primaryCta: "Request a Quote",
  secondaryCta: "Explore Services",
};

export const companySnapshot = [
  { value: company.establishedYear, label: "Established" },
  { value: "Abu Dhabi", label: "Location" },
  { value: "Musaffah", label: "Operations" },
  { value: "05", label: "Licensed Activities" },
];

export const whyGrandRoute = [
  {
    title: "Reliable Operations",
    description: "Focused on dependable transportation and maintenance support for business operations.",
  },
  {
    title: "Multi-Service Capability",
    description: "Transportation, maintenance, and equipment rental delivered under one company.",
  },
  {
    title: "Abu Dhabi Based",
    description: "Operating from Musaffah, Abu Dhabi, with proximity to the emirate's industrial zones.",
  },
  {
    title: "Business Focused",
    description: "Services structured around operational requirements rather than one-size offers.",
  },
];
