import { Phone, MessageCircle } from "lucide-react";
import { leadership } from "../../data/company";

export function LeadershipContacts() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {leadership.map((person) => (
        <div
          key={person.name}
          className="manifest-corners flex flex-col gap-4 border border-hairline p-6"
        >
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{person.name}</h3>
            <p className="mt-1 font-body text-[12px] font-bold uppercase tracking-[0.1em] text-grp-green">
              {person.title}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${person.phone}`}
              className="flex items-center gap-2 font-body text-sm text-ink-muted transition-colors hover:text-grp-green"
            >
              <Phone className="size-4 shrink-0 text-grp-green" aria-hidden="true" />
              {person.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${person.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-ink-muted transition-colors hover:text-grp-green"
            >
              <MessageCircle className="size-4 shrink-0 text-grp-green" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
