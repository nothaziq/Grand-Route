import { fleetItems } from "../../data/fleet";
import type { FleetItem } from "../../types";
import { apiRequest } from "./client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

/**
 * Matches GET /fleet in docs/API.md. Reads from local typed data
 * until fleet content moves behind the FastAPI backend, at which
 * point only this module changes.
 */
export async function getFleetItems(): Promise<FleetItem[]> {
  if (!API_BASE_URL) {
    return Promise.resolve(fleetItems);
  }
  return apiRequest<FleetItem[]>("/fleet");
}

export async function getFleetItemBySlug(slug: string): Promise<FleetItem | undefined> {
  if (!API_BASE_URL) {
    return Promise.resolve(fleetItems.find((item) => item.slug === slug));
  }
  return apiRequest<FleetItem>(`/fleet/${slug}`);
}
