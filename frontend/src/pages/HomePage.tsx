import { useSeo } from "../hooks/useSeo";
import { Hero } from "../components/sections/Hero";
import { CoreCapabilities } from "../components/sections/CoreCapabilities";
import { CompanySnapshot } from "../components/sections/CompanySnapshot";
import { ServicesSection } from "../components/sections/ServicesSection";
import { FleetPreview } from "../components/sections/FleetPreview";
import { IndustriesSection } from "../components/sections/IndustriesSection";
import { WhyGrandRoute } from "../components/sections/WhyGrandRoute";
import { QuoteCta } from "../components/sections/QuoteCta";
import { ContactSection } from "../components/sections/ContactSection";

export function HomePage() {
  useSeo({
    title: "Grand Route Transport & General Maintenance",
    description:
      "Transportation, maintenance, and heavy equipment rental for business operations in Musaffah, Abu Dhabi.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <ContactSection />
      <CoreCapabilities />
      <CompanySnapshot />
      <ServicesSection />
      <FleetPreview />
      <IndustriesSection />
      <WhyGrandRoute />
      <QuoteCta />
    </>
  );
}
