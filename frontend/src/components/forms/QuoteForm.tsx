import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Paperclip } from "lucide-react";
import { Button } from "../common/Button";
import { quoteServiceOptions } from "../../data/services";
import { submitQuoteRequest } from "../../lib/api/quotes";
import type { SubmissionState } from "../../types";

const SERVICE_VALUES = [
  "material-transport",
  "passenger-transport",
  "building-maintenance",
  "electromechanical",
  "heavy-equipment",
] as const;

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  company: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .regex(/^[0-9+()\-\s]+$/, "Use digits and + only."),
  email: z.string().trim().email("Enter a valid email address.").optional().or(z.literal("")),
  service: z.enum(SERVICE_VALUES, { message: "Select a service." }),
  requirement: z.string().trim().min(10, "Describe the requirement in a few words."),
  preferredDate: z.string().optional(),
  location: z.string().trim().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const inputClasses =
  "w-full border border-hairline bg-off-white px-4 py-3 font-body text-[15px] text-ink placeholder:text-ink-muted/60 transition-colors focus:border-grp-green focus:outline-none";
const labelClasses = "font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-ink";
const errorClasses = "mt-1.5 font-body text-[12px] text-grp-burgundy";

export function QuoteForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (values: QuoteFormValues) => {
    setState("submitting");
    setSubmitError(null);
    try {
      await submitQuoteRequest({
        name: values.name,
        company: values.company || undefined,
        phone: values.phone,
        email: values.email || undefined,
        service: values.service,
        requirement: values.requirement,
        preferredDate: values.preferredDate || undefined,
        location: values.location || undefined,
      });
      setState("success");
      reset();
      setFileName(null);
    } catch (err) {
      setState("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (state === "success") {
    return (
      <div className="manifest-corners flex flex-col items-start gap-4 border border-grp-green/40 bg-grp-green/[0.04] p-8">
        <CheckCircle2 className="size-8 text-grp-green" aria-hidden="true" />
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">Request received</h3>
          <p className="mt-2 max-w-sm font-body text-[15px] leading-relaxed text-ink-muted">
            Thank you — the Grand Route team will contact you shortly to confirm the requirement.
          </p>
        </div>
        <Button variant="secondary" type="button" onClick={() => setState("idle")} icon="none">
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6" aria-busy={state === "submitting"}>
      {state === "error" ? (
        <div className="flex items-start gap-3 border border-grp-burgundy/40 bg-grp-burgundy/[0.05] p-4">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-grp-burgundy" aria-hidden="true" />
          <div>
            <p className="font-body text-sm font-semibold text-ink">Request not sent</p>
            <p className="mt-1 font-body text-sm text-ink-muted">
              {submitError ?? "Something went wrong. Please try again."}
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-grp-burgundy">*</span>
          </label>
          <input id="name" className={`mt-2 ${inputClasses}`} {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name ? <p id="name-error" className={errorClasses}>{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input id="company" className={`mt-2 ${inputClasses}`} {...register("company")} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone <span className="text-grp-burgundy">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={`mt-2 ${inputClasses}`}
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? <p id="phone-error" className={errorClasses}>{errors.phone.message}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`mt-2 ${inputClasses}`}
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? <p id="email-error" className={errorClasses}>{errors.email.message}</p> : null}
        </div>

        <div>
          <label htmlFor="service" className={labelClasses}>
            Service <span className="text-grp-burgundy">*</span>
          </label>
          <select
            id="service"
            className={`mt-2 ${inputClasses}`}
            defaultValue=""
            {...register("service")}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="" disabled>
              Select a service
            </option>
            {quoteServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service ? <p id="service-error" className={errorClasses}>{errors.service.message}</p> : null}
        </div>

        <div>
          <label htmlFor="preferredDate" className={labelClasses}>
            Preferred Date
          </label>
          <input id="preferredDate" type="date" className={`mt-2 ${inputClasses}`} {...register("preferredDate")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="location" className={labelClasses}>
            Project / Location
          </label>
          <input id="location" className={`mt-2 ${inputClasses}`} {...register("location")} placeholder="e.g. Musaffah, MW-9" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="requirement" className={labelClasses}>
            Requirement <span className="text-grp-burgundy">*</span>
          </label>
          <textarea
            id="requirement"
            rows={4}
            className={`mt-2 ${inputClasses} resize-none`}
            {...register("requirement")}
            aria-invalid={!!errors.requirement}
            aria-describedby={errors.requirement ? "requirement-error" : undefined}
            placeholder="Describe the transport, maintenance, or equipment requirement."
          />
          {errors.requirement ? (
            <p id="requirement-error" className={errorClasses}>
              {errors.requirement.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="attachment" className={labelClasses}>
            Attachment
          </label>
          <label
            htmlFor="attachment"
            className="mt-2 flex cursor-pointer items-center gap-3 border border-dashed border-hairline px-4 py-4 font-body text-sm text-ink-muted transition-colors hover:border-grp-green"
          >
            <Paperclip className="size-4 shrink-0" aria-hidden="true" />
            {fileName ?? "Attach a drawing, list, or reference file (optional)"}
          </label>
          <input
            id="attachment"
            type="file"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </div>
      </div>

      <div>
        <Button type="submit" variant="primary" disabled={state === "submitting"} icon="none">
          {state === "submitting" ? "Sending…" : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}
