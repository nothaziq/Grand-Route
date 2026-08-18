import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

const AboutPage = lazy(() => import("../pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import("../pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() =>
  import("../pages/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage })),
);
const FleetPage = lazy(() => import("../pages/FleetPage").then((m) => ({ default: m.FleetPage })));
const IndustriesPage = lazy(() =>
  import("../pages/IndustriesPage").then((m) => ({ default: m.IndustriesPage })),
);
const ProjectsPage = lazy(() => import("../pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import("../pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const RequestQuotePage = lazy(() =>
  import("../pages/RequestQuotePage").then((m) => ({ default: m.RequestQuotePage })),
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

function RouteFallback() {
  return <div className="min-h-[60vh] bg-off-white" aria-hidden="true" />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-quote" element={<RequestQuotePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
