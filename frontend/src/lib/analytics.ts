/**
 * Minimal GA4 integration. Does nothing until VITE_GA_MEASUREMENT_ID
 * is set — safe for local dev, safe if you decide not to use GA at
 * all. No cookies/consent-banner libraries pulled in; GA4 itself
 * still sets cookies, so add a consent banner before relying on this
 * in regions where that's legally required (the UAE currently has no
 * mandatory cookie-consent-banner law, but review before an EU/UK
 * audience matters to you).
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let initialized = false;

export function initAnalytics(): void {
  if (!MEASUREMENT_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  // send_page_view disabled here — we send page_view manually per
  // route via trackPageview(), since this is a client-side-routed SPA
  // and the default GA pageview only fires on the initial hard load.
  gtag("config", MEASUREMENT_ID, { send_page_view: false });
  window.gtag = gtag;
}

export function trackPageview(path: string): void {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}
