import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface PledgeFormProps {
  pledgedCount?: number;
}

const pledgeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "First name must be under 80 characters"),
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(120, "Company name must be under 120 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(255, "Email must be under 255 characters"),
});

const PledgeForm = ({ pledgedCount = 42 }: PledgeFormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = pledgeSchema.safeParse({
      firstName: form.get("firstName"),
      company: form.get("company"),
      email: form.get("email"),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setError(null);
    setSubmitting(true);

    // Open the underlying Google Form submission in a new tab for now,
    // then navigate to /thank-you so conversion tracking can fire.
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSe4jQRTMPqd85m7yNLrFkh3j9VojPwOcyDhX4_ZzzAXUAkyuQ/viewform",
      "_blank",
      "noopener,noreferrer"
    );

    navigate("/thank-you", {
      state: {
        firstName: parsed.data.firstName,
        company: parsed.data.company,
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

          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
            The Commitment
          </p>

          <h2 className="font-display uppercase text-4xl md:text-6xl lg:text-7xl leading-[0.9] mb-10">
            I commit to hiring <br />
            at least <span className="text-primary">one apprentice</span> <br />
            in the next 12 months.
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            noValidate
          >
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold ml-2 block">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                type="text"
                maxLength={80}
                placeholder="ALEX"
                className="w-full bg-input border-none px-6 py-5 rounded-2xl focus:ring-2 focus:ring-primary outline-none uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold ml-2 block">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                required
                type="text"
                maxLength={120}
                placeholder="AVENUE CREATIVE"
                className="w-full bg-input border-none px-6 py-5 rounded-2xl focus:ring-2 focus:ring-primary outline-none uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold ml-2 block">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                required
                type="email"
                maxLength={255}
                placeholder="HELLO@PARTNER.CO.UK"
                className="w-full bg-input border-none px-6 py-5 rounded-2xl focus:ring-2 focus:ring-primary outline-none uppercase tracking-widest text-foreground placeholder:text-muted-foreground/60"
              />
            </div>

            {error && (
              <p className="md:col-span-2 text-sm text-destructive uppercase tracking-wider font-bold" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 w-full bg-primary text-primary-foreground py-6 rounded-full font-bold uppercase tracking-[0.2em] text-base md:text-xl hover:bg-white transition-colors mt-4 disabled:opacity-60"
            >
              I Take the Pledge
            </button>

            <p className="md:col-span-2 text-center text-muted-foreground text-xs uppercase tracking-[0.2em] mt-2">
              No spam. No obligation beyond your commitment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PledgeForm;
