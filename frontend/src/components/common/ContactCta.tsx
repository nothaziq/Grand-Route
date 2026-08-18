import { Phone, Mail, MessageCircle } from "lucide-react";
import { company } from "../../data/company";

const contactMethods = [
  {
    icon: Phone,
    label: "Call",
    value: company.phoneDisplay,
    href: `tel:${company.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: company.phoneDisplay,
    href: `https://wa.me/${company.whatsappNumber}`,
    external: true,
  },
];

export function ContactCta({ layout = "grid" }: { layout?: "grid" | "stack" }) {
  return (
    <div className={layout === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-3" : "flex flex-col gap-4"}>
      {contactMethods.map((method) => (
        <a
          key={method.label}
          href={method.href}
          target={method.external ? "_blank" : undefined}
          rel={method.external ? "noopener noreferrer" : undefined}
          className="manifest-corners group flex flex-col gap-4 border border-hairline p-6 transition-colors hover:border-grp-green/50"
        >
          <method.icon className="size-5 text-grp-green" aria-hidden="true" />
          <div>
            <div className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
              {method.label}
            </div>
            <div className="mt-1 font-display text-base font-semibold text-ink group-hover:text-grp-green">
              {method.value}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
