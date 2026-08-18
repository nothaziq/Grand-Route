import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "../common/Container";
import { services } from "../../data/services";
import { company } from "../../data/company";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Fleet & Equipment", to: "/fleet" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${company.whatsappNumber}`;

  return (
    <footer className="border-t border-hairline-dark bg-charcoal text-off-white">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Grand Route — home">
            <img src={logo} alt="Grand Route" className="h-9 w-auto" />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.14em]">
              Grand Route
            </span>
          </Link>
          <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-off-white/60">
            Transportation, maintenance, and heavy equipment rental for business operations in
            Musaffah, Abu Dhabi.
          </p>
        </div>

        <div>
          <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-off-white/50">
            Services
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="font-body text-sm text-off-white/75 transition-colors hover:text-grp-green"
                >
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-off-white/50">
            Navigate
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-body text-sm text-off-white/75 transition-colors hover:text-grp-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-off-white/50">
            Contact
          </h3>
          <ul className="mt-5 flex flex-col gap-3 font-body text-sm text-off-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-grp-green" aria-hidden="true" />
              <span>{company.location}, {company.country}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-grp-green" aria-hidden="true" />
              <a href={`tel:${company.phone}`} className="transition-colors hover:text-grp-green">
                {company.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-grp-green" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-grp-green">
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="size-4 shrink-0 text-grp-green" aria-hidden="true" />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-grp-green"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-hairline-dark">
        <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-off-white/45">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="font-body text-xs text-off-white/35">
            Licence No. {company.licenceNumber} · Musaffah, Abu Dhabi, UAE
          </p>
        </Container>
      </div>
    </footer>
  );
}
