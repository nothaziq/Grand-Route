import { Phone, Mail } from "lucide-react";
import { company, leadership } from "../../data/company";

export function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 hidden border-b border-white/10 bg-charcoal sm:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          {leadership.map((person) => (
            <a
              key={person.name}
              href={`tel:${person.phone}`}
              className="flex items-center gap-1.5 font-body text-[12px] text-off-white/75 transition-colors hover:text-grp-green"
            >
              <Phone className="size-3 shrink-0 text-grp-green" aria-hidden="true" />
              <span className="font-semibold text-off-white/90">{person.name}</span>
              <span className="text-off-white/50">·</span>
              <span>{person.phoneDisplay}</span>
            </a>
          ))}
        </div>
        <a
          href={`mailto:${company.email}`}
          className="flex items-center gap-1.5 font-body text-[12px] text-off-white/75 transition-colors hover:text-grp-green"
        >
          <Mail className="size-3 shrink-0 text-grp-green" aria-hidden="true" />
          {company.email}
        </a>
      </div>
    </div>
  );
}
