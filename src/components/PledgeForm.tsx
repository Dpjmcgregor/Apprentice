import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitPledge } from "@/lib/pledge";

interface PledgeFormProps {
  pledgedCount?: number;
}

const detailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(120, "Full name must be under 120 characters"),
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(120, "Company name must be under 120 characters"),
  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(120, "Job title must be under 120 characters"),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .max(120, "Location must be under 120 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(255, "Email must be under 255 characters"),
});

const ALREADY_HIRE_OPTIONS = ["Yes", "No"];
const INTEND_OPTIONS = ["1", "2", "3–5", "6+"];
const LEVY_OPTIONS = ["Yes", "No", "Not sure"];
const SECTOR_OPTIONS = [
  "Sales, marketing and procurement",
  "Agriculture, environmental and animal care",
  "Digital",
  "Business and administration",
  "Care services",
  "Catering and hospitality",
  "Construction and the built environment",
  "Creative and design",
  "Education and early years",
  "Engineering and manufacturing",
  "Hair and beauty",
  "Health and science",
  "Legal, finance and accounting",
  "Protective services",
  "Transport and logistics",
  "Other",
];

const TOTAL_STEPS = 3;

const inputClass =
  "w-full bg-input border-none px-6 py-5 rounded-2xl focus:ring-2 focus:ring-primary outline-none uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60";
const labelClass =
  "text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold ml-2 block";

interface PledgeData {
  fullName: string;
  company: string;
  jobTitle: string;
  location: string;
  email: string;
  alreadyHire: string;
  intendCount: string;
  sector: string;
  levyPayer: string;
  connect: boolean;
}

const emptyData: PledgeData = {
  fullName: "",
  company: "",
  jobTitle: "",
  location: "",
  email: "",
  alreadyHire: "",
  intendCount: "",
  sector: "",
  levyPayer: "",
  connect: true,
};

const PledgeForm = ({ pledgedCount = 42 }: PledgeFormProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PledgeData>(emptyData);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (patch: Partial<PledgeData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      const parsed = detailsSchema.safeParse(data);
      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? "Please check your details");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!data.alreadyHire) return setError("Let us know if you already hire an apprentice");
      if (!data.intendCount) return setError("Pick how many apprentices you plan to hire");
      if (!data.sector) return setError("Choose the sector you might hire in");
      if (!data.levyPayer) return setError("Tell us your apprenticeship levy status");
      setStep(3);
      return;
    }

    // Final step — sign the pledge.
    if (!agreed) {
      setError("Tick the box to make your pledge official");
      return;
    }

    setSubmitting(true);

    await submitPledge({
      fullName: data.fullName,
      company: data.company,
      jobTitle: data.jobTitle,
      location: data.location,
      email: data.email,
      pledge: "Yes, I'm making the pledge",
      alreadyHire: data.alreadyHire,
      intendCount: data.intendCount,
      sector: data.sector,
      levyPayer: data.levyPayer,
      connect: data.connect ? "Yes" : "No",
    });

    const firstName = data.fullName.trim().split(/\s+/)[0];

    navigate("/thank-you", {
      state: {
        firstName,
        company: data.company,
        pledgeNumber: pledgedCount + 1,
      },
    });
  };

  return (
    <section id="pledge-form" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border p-10 md:p-16 lg:p-20 rounded-[2.5rem] shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <div className="w-32 h-32 border-8 border-primary rounded-full" />
          </div>

          {/* Counter above the form */}
          <div className="mb-10 pb-10 border-b border-border text-center">
            <div className="font-display text-6xl md:text-7xl text-primary leading-none">
              {pledgedCount}
            </div>
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm font-bold mt-3">
              Businesses have already pledged
            </p>
            {pledgedCount < 100 && (
              <p className="text-muted-foreground text-[11px] mt-3 uppercase tracking-[0.25em]">
                Be one of the first 100 leaders
              </p>
            )}
          </div>

          {/* Step header + progress */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
              The 2026 Pledge
            </p>
            <p className="text-muted-foreground font-bold tracking-[0.3em] uppercase text-[10px]">
              Step {step} / {TOTAL_STEPS} · under 60 seconds
            </p>
          </div>
          <div className="flex gap-2 mb-10">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleNext} noValidate>
            {/* STEP 1 — about you */}
            {step === 1 && (
              <div className="animate-fade-up">
                <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] mb-10">
                  First, <span className="text-primary">about you.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      maxLength={120}
                      placeholder="ALEX MORGAN"
                      value={data.fullName}
                      onChange={(e) => update({ fullName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className={labelClass}>
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      maxLength={120}
                      placeholder="AVENUE CREATIVE"
                      value={data.company}
                      onChange={(e) => update({ company: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="jobTitle" className={labelClass}>
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      maxLength={120}
                      placeholder="FOUNDER / CEO"
                      value={data.jobTitle}
                      onChange={(e) => update({ jobTitle: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className={labelClass}>
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      maxLength={120}
                      placeholder="MANCHESTER, UK"
                      value={data.location}
                      onChange={(e) => update({ location: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="email" className={labelClass}>
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      maxLength={255}
                      placeholder="HELLO@PARTNER.CO.UK"
                      value={data.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — the commitment shape */}
            {step === 2 && (
              <div className="animate-fade-up space-y-10">
                <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9]">
                  Your 2026 <span className="text-primary">hiring.</span>
                </h2>

                <OptionRow
                  label="Do you already hire an apprentice?"
                  options={ALREADY_HIRE_OPTIONS}
                  value={data.alreadyHire}
                  onSelect={(alreadyHire) => update({ alreadyHire })}
                />
                <OptionRow
                  label="How many apprentices will you hire in 2026?"
                  options={INTEND_OPTIONS}
                  value={data.intendCount}
                  onSelect={(intendCount) => update({ intendCount })}
                />
                <OptionRow
                  label="Which sector might you hire in?"
                  options={SECTOR_OPTIONS}
                  value={data.sector}
                  onSelect={(sector) => update({ sector })}
                />
                <OptionRow
                  label="Are you an Apprenticeship Levy payer?"
                  options={LEVY_OPTIONS}
                  value={data.levyPayer}
                  onSelect={(levyPayer) => update({ levyPayer })}
                  hint="This helps us tailor the funding guidance we send. Unsure? Pick “Not sure”."
                />
              </div>
            )}

            {/* STEP 3 — confirm & sign */}
            {step === 3 && (
              <div className="animate-fade-up">
                <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] mb-10">
                  Make it <span className="text-primary">official.</span>
                </h2>

                <div className="bg-secondary rounded-3xl p-8 md:p-10 mb-8">
                  <p className="font-display uppercase text-2xl md:text-3xl leading-[1.05]">
                    I, {data.fullName || "—"} of{" "}
                    <span className="text-primary">{data.company || "—"}</span>,
                    pledge to hire at least one apprentice in 2026.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      data.jobTitle,
                      data.location,
                      data.sector,
                      data.intendCount && `${data.intendCount} in 2026`,
                    ]
                      .filter(Boolean)
                      .map((chip) => (
                        <span
                          key={chip as string}
                          className="text-[10px] uppercase tracking-[0.2em] font-bold bg-background/60 text-muted-foreground px-4 py-2 rounded-full"
                        >
                          {chip}
                        </span>
                      ))}
                  </div>
                </div>

                <label className="flex items-start gap-4 cursor-pointer mb-5 group">
                  <span
                    className={`mt-0.5 w-7 h-7 shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      agreed
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border group-hover:border-primary"
                    }`}
                  >
                    {agreed && <Check className="w-4 h-4" strokeWidth={3} />}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-bold">
                      Yes, I&rsquo;m making the pledge.
                    </span>{" "}
                    I commit to hiring at least one apprentice in 2026, and I&rsquo;m happy
                    for my name and company to appear on the public pledge wall.
                  </span>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <span
                    className={`mt-0.5 w-7 h-7 shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      data.connect
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border group-hover:border-primary"
                    }`}
                  >
                    {data.connect && <Check className="w-4 h-4" strokeWidth={3} />}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={data.connect}
                    onChange={(e) => update({ connect: e.target.checked })}
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Connect me with apprentice-ready candidates from Another Avenue.
                  </span>
                </label>
              </div>
            )}

            {error && (
              <p
                className="text-sm text-destructive uppercase tracking-wider font-bold mt-8"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center justify-center gap-2 px-7 py-5 rounded-full border border-border text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-3 bg-primary text-primary-foreground py-5 md:py-6 rounded-full font-bold uppercase tracking-[0.2em] text-base md:text-xl hover:bg-white transition-colors disabled:opacity-60"
              >
                {step < TOTAL_STEPS ? (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : submitting ? (
                  "Signing…"
                ) : (
                  "I Take the Pledge"
                )}
              </button>
            </div>

            <p className="text-center text-muted-foreground text-xs uppercase tracking-[0.2em] mt-6">
              No spam. No obligation beyond your commitment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

interface OptionRowProps {
  label: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  hint?: string;
}

const OptionRow = ({ label, options, value, onSelect, hint }: OptionRowProps) => (
  <div>
    <p className={`${labelClass} mb-1`}>{label}</p>
    {hint && (
      <p className="text-[11px] text-muted-foreground/70 ml-2 mb-4 normal-case tracking-normal">
        {hint}
      </p>
    )}
    <div className={`flex flex-wrap gap-3 ${hint ? "" : "mt-4"}`} role="group" aria-label={label}>
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option)}
            className={`px-6 py-3 rounded-full font-bold uppercase tracking-[0.15em] text-xs transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "bg-input text-muted-foreground hover:text-foreground"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

export default PledgeForm;
