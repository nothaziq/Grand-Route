import type { QuoteRequestPayload } from "../../types";
import { apiRequest } from "./client";

export interface QuoteSubmissionResult {
  id: string;
  status: "received";
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

/**
 * Submits a quote request. Matches the POST /quotes contract in
 * docs/API.md. Until a FastAPI backend is deployed and
 * VITE_API_BASE_URL is set, this resolves against a local mock so the
 * form UX (loading/success/error) can be fully exercised without a
 * live backend — swap-in is transparent to callers.
 */
export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<QuoteSubmissionResult> {
  if (!API_BASE_URL) {
    return mockSubmitQuoteRequest(payload);
  }

  return apiRequest<QuoteSubmissionResult>("/quotes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

function mockSubmitQuoteRequest(payload: QuoteRequestPayload): Promise<QuoteSubmissionResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!payload.name || !payload.phone) {
        reject(new Error("Missing required fields."));
        return;
      }
      resolve({ id: `local-${Date.now()}`, status: "received" });
    }, 900);
  });
}
