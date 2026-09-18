import {
  Sparkles,
  ArrowRight,
  Wand2,
  Gift,
  BarChart3,
  Plug,
  ShoppingBag,
  ShieldCheck,
  Coffee,
  Ticket,
  Eye,
  FileText,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { WaitlistPrompt } from "@/components/waitlist/WaitlistPrompt";
import { WaitlistCount } from "@/components/waitlist/WaitlistCount";
import { RejectionCalculator } from "@/components/RejectionCalculator";
import { BrandExample } from "@/components/BrandExample";
import { HeroProduct } from "@/components/HeroProduct";
import { FaqAccordion } from "@/components/FaqAccordion";

// This is a Server Component. Every piece of marketing copy below is rendered
// to static HTML in the initial response; only the genuinely interactive parts
// (the waitlist form, the modal prompt, the calculator, the live count) are
// client components rendered as leaves.

const STAT_SOURCE_URL =
  "https://standout-cv.com/stats/how-long-does-it-take-to-get-a-job";

const STEPS = [
  {
    n: "01",
    title: "Connect your ATS",
    body: "Connect TeamTailor, Greenhouse, Lever or Workable. Nothing changes about how you hire.",
  },
  {
    n: "02",
    title: "An applicant applies",
    body: "Cushion invites them to opt in to exclusive rewards, separate from their application.",
  },
  {
    n: "03",
    title: "Rewards from day one",
    body: "Opted-in applicants get access to partner offers and brand rewards straight away.",
  },
  {
    n: "04",
    title: "If it doesn't work out",
    body: "Cushion sends an additional thank-you and reward alongside your own rejection email. It never replaces it.",
  },
  {
    n: "05",
    title: "Growth gets the numbers",
    body: "Reporting on redemptions and purchases from applicants.",
  },
];

const REWARDS = [
  {
    icon: Coffee,
    title: "Partner offers",
    body: "Perks funded by our partners, not by your budget. Something as simple as a coffee, or a day out with the family.",
    lead: true,
  },
  {
    icon: Ticket,
    title: "Brand discounts",
    body: "Exclusive discounts on your own products, set and controlled by you.",
  },
];

const CONSENT = [
  {
    icon: FileText,
    title: "Opt-in at application",
    body: "The choice sits separate from the application itself.",
  },
  {
    icon: Check,
    title: "Always optional",
    body: "It never affects the application or the hiring decision.",
  },
  {
    icon: Eye,
    title: "Easy opt-out",
    body: "Every message has a visible way to stop.",
  },
  {
    icon: ShieldCheck,
    title: "Full audit trail",
    body: "We provide our DPA and a template DPIA.",
  },
];

const FEATURES = [
  {
    icon: Plug,
    title: "Plugs into your ATS",
    body: "Connect TeamTailor, Greenhouse, Lever or Workable in minutes. Roles and applicants sync automatically. Nothing to rip out.",
  },
  {
    icon: Gift,
    title: "Reward engine",
    body: "Attach partner offers and brand discounts. Set the terms. Trackable per applicant.",
  },
  {
    icon: ShieldCheck,
    title: "Consent built in",
    body: "Opt-in at application, a visible opt-out on every message, and a full audit trail.",
  },
  {
    icon: Wand2,
    title: "Message builder",
    body: "Personalise what Cushion sends by name, role and stage. Set the tone. Add a hiring-manager video.",
  },
  {
    icon: BarChart3,
    title: "Advocacy tracking",
    body: "Opens, redemptions, shares, and whether applicants go on to buy.",
  },
  {
    icon: ShoppingBag,
    title: "Brand reporting",
    body: "A monthly growth and CRM report: applicants, rewards redeemed, purchases.",
  },
];

const PLANS = [
  {
    name: "Starter",
    band: "Up to 500",
    cap: "applications a month",
    features: ["Rejection builder", "1 reward", "Open & redemption tracking"],
  },
  {
    name: "Growth",
    band: "Up to 5,000",
    cap: "applications a month",
    features: ["Stage segmentation", "Unlimited rewards", "Advocacy dashboard"],
    featured: true,
  },
  {
    name: "Premium",
    band: "Volume",
    cap: "unlimited, plus white label",
    features: ["White labelling", "Video rejections", "Advanced reporting"],
  },
];

const FAQ = [
  {
    q: "Is it legal to offer applicants rewards?",
    a: "The reward is marketing, so under UK GDPR and PECR it needs a lawful basis and a clear opt-out. Cushion is built around that. Consent is captured at the point of application, separate from the application itself. Every message has a visible opt-out, and there's a full audit trail of what was sent to whom. This isn't legal advice. Confirm the approach with your own counsel. We'll provide our DPA and a template DPIA to make that quick.",
  },
  {
    q: "What happens to our margin if lots of people redeem?",
    a: "You set each reward and its terms: a fixed-value voucher, a capped discount, or a free product with conditions. Partner offers are funded by partners, not by you. Your worst case is redemptions times your reward cost. Model it with the calculator above before you commit a penny.",
  },
  {
    q: "Won't applicants see through it?",
    a: "Only if it's an afterthought. So the reward comes with a genuine thank-you, at application and again if they're not successful. You set the tone per stage, warmer the further someone got. A final-round candidate never gets the same note as a day-one applicant.",
  },
  {
    q: "What stops the codes ending up on a voucher site?",
    a: "Every code is unique to the applicant and single-use, tied to the email address we sent it to, with an expiry and an optional cap you control. A leaked code redeems once, for one person. It's worthless to a deal-scraping site.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <WaitlistPrompt />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Cushion
            </span>
          </div>
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#how"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Demo
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href="/login">Log in</a>
            </Button>
            <Button asChild size="sm">
              <a href="#waitlist">Join waitlist</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:pb-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Applicant advocacy for consumer brands
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]">
              The people who apply to work for you are your best advocates.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Cushion gives every applicant access to exclusive rewards from the
              moment they apply. Whether they get the job or not.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#waitlist">
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/login">Explore the demo</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="uppercase tracking-wider">Works with</span>
              <span className="font-medium text-foreground">TeamTailor</span>
              <span className="font-medium text-foreground">Greenhouse</span>
              <span className="font-medium text-foreground">Lever</span>
              <span className="font-medium text-foreground">Workable</span>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <HeroProduct />
          </div>
        </div>
      </section>

      {/* Statement band */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <p className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Those who love your business want to work for you. The majority never
            will.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Cushion makes sure they still walk away with something.
          </p>
        </div>
      </section>

      {/* The effort of job hunting */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">
            Job hunting is hard work.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The average UK job seeker sends 162 applications and takes 3.8 months
            to land a role. Every one is real effort, often for a brand they
            already care about.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Source:{" "}
            <a
              href={STAT_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
            >
              StandOut CV UK survey
            </a>
          </p>
          <p className="mt-10 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Be the brand that buys them a{" "}
            <span className="text-brand">coffee.</span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-16 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              The process
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Five steps. Your hiring process stays exactly as it is.
            </p>
          </div>
          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t border-border pt-5">
                <span className="text-3xl font-semibold tabular-nums tracking-tight text-muted-foreground/50">
                  {s.n}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rewards */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Two kinds of reward
            </h2>
            <p className="mt-3 text-muted-foreground">
              Applicants get access the moment they opt in.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {REWARDS.map((r) => (
              <Card
                key={r.title}
                className={"p-6 " + (r.lead ? "ring-1 ring-brand/40" : "")}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                  <r.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-world example */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <BrandExample />
        </div>
      </section>

      {/* Consent is a feature */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Consent is a feature, not small print.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Applicants choose to take part. It never affects their application.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONSENT.map((c) => (
            <Card key={c.title} className="p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Cushion is built around UK GDPR and PECR. This isn&rsquo;t legal
          advice. Confirm the approach with your own counsel.
        </p>
      </section>

      {/* Features */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Everything you need to run it
            </h2>
            <p className="mt-3 text-muted-foreground">
              From opt-in to reporting, in one place.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two-buyer handshake */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">
            One product, two teams
          </h2>
          <p className="mt-3 text-muted-foreground">
            Talent owns the ATS. Growth owns the reward budget and the reporting.
            Cushion is the handshake between them.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <Badge variant="neutral">Talent / HR</Badge>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Installs once, then forgets about it
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect TeamTailor, Greenhouse, Lever or Workable in minutes.
              Nothing changes about how you hire. Cushion handles the opt-in and
              the rewards.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <a href="/login">See the integration</a>
            </Button>
          </Card>
          <Card className="p-6">
            <Badge variant="brand">Growth / CRM</Badge>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Owns the reward, and the reporting
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Set the rewards and the tone. Then see what applicant advocacy is
              worth: redemptions and purchases from applicants.
            </p>
            <Button asChild className="mt-5">
              <a href="/login">See the reporting</a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Calculator, the number is theirs, not ours */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Put your own numbers in
            </h2>
            <p className="mt-3 text-muted-foreground">
              Skip the invented averages. Enter what you actually see and
              estimate what your applicant audience is worth.
            </p>
          </div>
          <RejectionCalculator />
        </div>
      </section>

      {/* Objections */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              The questions your legal and finance teams will ask
            </h2>
            <p className="mt-3 text-muted-foreground">
              Answered plainly. If we can&rsquo;t answer these, you
              shouldn&rsquo;t sign.
            </p>
          </div>
          <div className="mt-10">
            <FaqAccordion items={FAQ} />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            This isn&rsquo;t legal advice. We&rsquo;ll share our DPA and a
            template DPIA so your counsel can sign off on the specifics.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Priced per applicant, banded by volume
          </h2>
          <p className="mt-3 text-muted-foreground">
            No &ldquo;book a demo&rdquo; wall. Join the waitlist and we&rsquo;ll
            send the full pricing sheet so you can see the numbers before you
            talk to anyone.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={
                "flex flex-col rounded-xl border bg-card p-6 " +
                (p.featured ? "ring-1 ring-brand/50" : "")
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                {p.featured && (
                  <Badge variant="brand">Most popular</Badge>
                )}
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{p.band}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.cap}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="h-4 w-4 text-primary" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-6 w-full"
                variant={p.featured ? "default" : "outline"}
              >
                <a href="#waitlist">Join the waitlist</a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-20 bg-secondary/50">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-md text-center">
            <Badge
              variant="outline"
              className="gap-2 bg-card px-3 py-1 text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Early access
            </Badge>
            <h2 className="mt-4 text-3xl font-bold text-foreground">
              Join the waitlist
            </h2>
            <p className="mt-3 text-muted-foreground">
              We&rsquo;re onboarding consumer brands in waves. Add your details
              and we&rsquo;ll reach out with early access to Cushion.
            </p>
          </div>
          <Card className="mx-auto mt-8 max-w-md p-6">
            <WaitlistForm source="landing-section" />
          </Card>
          <WaitlistCount />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your applicants already chose you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Recognise that from the moment they apply, whatever the outcome. Then
            see what it&rsquo;s worth.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="#waitlist">
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <footer className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-background text-foreground">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-background">
                  Cushion
                </span>
              </div>
              <p className="mt-4 text-sm text-sidebar-foreground">
                Applicant advocacy for consumer brands. Reward the people who
                apply, whatever the outcome.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-sidebar-muted">
                  Product
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="#how" className="transition-colors hover:text-background">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="transition-colors hover:text-background">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="transition-colors hover:text-background">
                      Demo
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-sidebar-muted">
                  Company
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="#waitlist" className="transition-colors hover:text-background">
                      Waitlist
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-sidebar-muted">
                  Legal
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <span className="text-sidebar-muted">Built around UK GDPR and PECR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-sidebar-border pt-6 text-xs text-sidebar-muted">
            © 2026 Cushion. Applicant advocacy for consumer brands.
          </div>
        </div>
      </footer>
    </div>
  );
}
