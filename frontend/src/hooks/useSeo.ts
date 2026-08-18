import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
}

const SITE_NAME = "Grand Route Transport & General Maintenance";
const SITE_URL = "https://www.grandroute.ae";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Applies per-page SEO metadata: unique title, meta description,
 * canonical URL, and Open Graph tags (docs/PAGES.md #27 SEO).
 */
export function useSeo({ title, description, path = "/" }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", `${SITE_URL}${path}`);
    setCanonical(`${SITE_URL}${path}`);
  }, [title, description, path]);
}
