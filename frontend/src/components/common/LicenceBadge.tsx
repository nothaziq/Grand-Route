import { ShieldCheck } from "lucide-react";
import { company } from "../../data/company";

/**
 * Trust badge showing the verified Abu Dhabi DED licence. Fields
 * come directly from company.ts, sourced from the economic licence
 * PDF (docs/CONTENT.md) — never edit the numbers here directly.
 */
export function LicenceBadge() {
  return (
    <div className="inline-flex items-center gap-3 border border-hairline-dark bg-charcoal-soft px-5 py-3">
      <ShieldCheck className="size-5 shrink-0 text-grp-green" aria-hidden="true" />
      <div className="flex flex-col">
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-off-white/50">
          Licensed &amp; Registered
        </span>
        <span className="font-body text-[13px] text-off-white/85">
          Abu Dhabi Department of Economic Development · Licence No. {company.licenceNumber}
        </span>
      </div>
    </div>
  );
}
