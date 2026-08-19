import { useEffect } from "react";
import { buildLocalBusinessSchema } from "../lib/structuredData";

/** Injects site-wide LocalBusiness JSON-LD once. Call at the app root. */
export function useStructuredData() {
  useEffect(() => {
    const id = "ld-json-local-business";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(buildLocalBusinessSchema());
  }, []);
}
