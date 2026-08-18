import { projects } from "../../data/projects";
import type { Project } from "../../types";
import { apiRequest } from "./client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

/** Matches GET /projects in docs/API.md. */
export async function getProjects(): Promise<Project[]> {
  if (!API_BASE_URL) {
    return Promise.resolve(projects.filter((p) => p.published));
  }
  return apiRequest<Project[]>("/projects");
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!API_BASE_URL) {
    return Promise.resolve(projects.find((p) => p.slug === slug && p.published));
  }
  return apiRequest<Project>(`/projects/${slug}`);
}
