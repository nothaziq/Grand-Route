export interface CompanyInfo {
  legalName: string;
  tradeName: string;
  shortName: string;
  establishedDate: string; // ISO
  establishedYear: string;
  licenceType: string;
  licenceCategory: string;
  location: string;
  region: string;
  country: string;
  licenceNumber: string;
  unifiedLicenceNumber: string;
  unifiedRegistrationNumber: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // digits only, international format
}

export interface LeadershipContact {
  name: string;
  title: string;
  phone: string; // digits only, e.g. +9715...
  phoneDisplay: string;
  whatsappNumber: string; // digits only, international format
}

export type CapabilityId = "transportation" | "maintenance" | "equipment";

export interface Capability {
  id: CapabilityId;
  number: string;
  title: string;
  summary: string;
  serviceSlugs: ServiceSlug[];
  image?: string;
}

export type ServiceSlug =
  | "material-transport"
  | "building-maintenance"
  | "electromechanical"
  | "heavy-equipment";

export interface Service {
  slug: ServiceSlug;
  number: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  description: string;
  applications: string[];
  capability: CapabilityId;
  relatedSlugs: ServiceSlug[];
  image?: string;
}

export interface FleetItem {
  slug: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  specifications?: Record<string, string>;
}

export interface FleetCategory {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  service: ServiceSlug;
  description: string;
  images: string[];
  published: boolean;
}

export type QuoteServiceValue =
  | "material-transport"
  | "building-maintenance"
  | "electromechanical"
  | "heavy-equipment";

export interface QuoteRequestPayload {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  service: QuoteServiceValue;
  requirement: string;
  preferredDate?: string;
  location?: string;
}

export type SubmissionState = "idle" | "submitting" | "success" | "error";
