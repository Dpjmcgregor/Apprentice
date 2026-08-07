import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Wand2,
  Gift,
  BarChart3,
  Layers,
  Plug,
  ShoppingBag,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { formatNumber } from "@/lib/format";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { WaitlistPrompt } from "@/components/waitlist/WaitlistPrompt";
import { RejectionCalculator } from "@/components/RejectionCalculator";
import { EmailShowcase } from "@/components/EmailShowcase";

const FEATURES = [
  {
    icon: Plug,
    title: "Plugs into your ATS",
    body: "Connect Greenhouse, Lever or Workable in minutes. Roles and candidates sync automatically, no data re-entry, no ripping anything out.",
  },
  {
    icon: Wand2,
    title: "Rejection flow builder",
    body: "Personalise every rejection by name, role and stage reached. Set the tone. Add a hiring-manager video.",
  },
  {
    icon: Gift,
    title: "Reward engine",
    body: "Attach a discount, free product or early access. Triggered automatically, trackable per applicant.",
  },
  {
    icon: Layers,
    title: "Segmentation",
    body: "First-round rejections get one message. Final-stage gets a more personal note and a higher-value reward.",
  },
  {
    icon: BarChart3,
    title: "Advocacy tracking",
    body: "Open rates, redemptions, social shares, and whether rejected applicants go on to buy.",
  },
  {
    icon: ShoppingBag,
    title: "Brand reporting",
    body: "A monthly growth and CRM report: applications, rewards redeemed, purchases, sentiment uplift.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect your ATS",
    body: "Plug Cushion into Greenhouse, Lever or Workable. Your roles and candidates sync in automatically.",
  },
  {
    n: "02",
    title: "A candidate is rejected",
    body: "The moment you reject someone in your ATS, Cushion catches the event, no change to your hiring workflow.",
  },
  {
    n: "03",
    title: "Reward & track",
    body: "Cushion auto-sends the on-brand rejection and reward, then reports the % of rejected applicants who bought.",
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
    q: "Is putting an offer inside a rejection email even legal?",
    a: "A rejection is a service message; a promotional reward is marketing, which under UK GDPR and PECR needs a lawful basis and a clear opt-out. Cushion is designed to support that, consent captured at the point of application, a visible opt-out on every message, and a full audit trail of what was sent to whom. Confirm the approach with your own counsel; we'll provide our DPA and a template DPIA to make that quick.",
  },
  {
    q: "What happens to our margin if lots of people redeem?",
    a: "You set the reward and its terms, a fixed-value voucher, a capped discount, or a free product with conditions. Your worst case is redemptions × your reward cost, and it only ever fires on people you'd otherwise have lost. Model it with the calculator above before you commit a penny.",
  },
  {
    q: "Doesn't “sorry, here's 20% off” read as insulting?",
    a: "Done badly, yes. So the message leads with a genuine, human thank-you and the reward sits underneath it, never as the headline. You set the tone per stage, warmer and more personal the further someone got, so a final-round candidate never gets the same note as a day-one applicant.",
  },
  {
    q: "What stops the codes ending up on a voucher site?",
    a: "Every code is unique to the applicant and single-use, tied to the email address we sent it to, with an expiry and an optional cap you control. A leaked code redeems once, for one person, it's worthless to a deal-scraping site.",
  },
];

export default function Landing() {
  const { data } = useStore();
  const waitlistCount = data.waitlist?.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <WaitlistPrompt />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-semibold text-foreground">
              Cushion
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/login">
                View live demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-sidebar text-white">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              <Plug className="h-3 w-3 text-primary" />
              An advocacy layer on top of your ATS
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
              You reject thousands of people who{" "}
              <span className="text-primary">wanted to work for you.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
              Then you send a template that makes them like you less. Cushion
              plugs into your ATS and turns each rejection into a warm, on-brand
              note with a real reward, so the people who chose your brand stay
              customers instead of walking away.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="text-xs uppercase tracking-wider">Works with</span>
              <span className="font-semibold text-slate-200">Greenhouse</span>
              <span className="font-semibold text-slate-200">Lever</span>
              <span className="font-semibold text-slate-200">Workable</span>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#waitlist">
                  Join the waitlist
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/login">Explore the demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The artifact, show the real product */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              This is what your rejected applicants get
            </h2>
            <p className="mt-3 text-muted-foreground">
              A real send from the builder, in your livery, not a generic
              &ldquo;unfortunately&rdquo; template. Same product, three brands.
            </p>
          </div>
          <div className="mt-12">
            <EmailShowcase />
          </div>
        </div>
      </section>

      {/* Calculator, the number is theirs, not ours */}
      <section className="border-b border-white/10 bg-sidebar">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Put your own numbers in
            </h2>
            <p className="mt-3 text-slate-300">
              Skip the invented averages. Enter what you actually see and decide
              for yourself whether the rejected audience is worth keeping.
            </p>
          </div>
          <RejectionCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            A CRM and growth tool disguised as an HR nicety.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border bg-card p-6">
              <p className="font-display text-3xl font-bold text-primary">
                {s.n}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Everything to reject well
            </h2>
            <p className="mt-3 text-muted-foreground">
              From intake to advocacy reporting, in one place.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
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
            Talent owns the ATS. Growth owns the reward budget and the metric.
            Cushion is the handshake between them.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Talent / HR
            </span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Installs once, then forgets about it
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect Greenhouse, Lever or Workable in minutes. Nothing changes
              about how you hire, when you reject someone in your ATS, Cushion
              handles the rest automatically.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/login">See the integration</Link>
            </Button>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Growth / CRM
            </span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              Owns the reward, and the number
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Set the reward and the tone. Then report the one metric that
              matters to finance: the share of rejected applicants who went on to
              buy.
            </p>
            <Button asChild className="mt-5">
              <Link to="/login">See the reporting</Link>
            </Button>
          </div>
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
          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border bg-card p-6">
                <h3 className="font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            This isn&rsquo;t legal advice. We&rsquo;ll share our DPA and a
            template DPIA so your counsel can sign off on the specifics.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">
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
                "flex flex-col rounded-2xl border bg-card p-6 " +
                (p.featured ? "ring-2 ring-primary" : "")
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">
                {p.band}
              </p>
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
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Early access
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground">
              Join the waitlist
            </h2>
            <p className="mt-3 text-muted-foreground">
              We're onboarding consumer brands in waves. Add your details and
              we'll reach out with early access to Cushion.
            </p>
          </div>
          <Card className="mx-auto mt-8 max-w-md p-6">
            <WaitlistForm source="landing-section" />
          </Card>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            You'll be in good company:{" "}
            <span className="font-semibold text-foreground">
              {formatNumber(waitlistCount)}
            </span>{" "}
            {waitlistCount === 1 ? "brand has" : "brands have"} already joined.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sidebar">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">
            What percentage of your rejected applicants became customers?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            If you don't know, you're leaving your warmest audience on the table.
            Let's fix that.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="#waitlist">
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <footer className="border-t bg-background py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Cushion, turn rejection into
          advocacy.
        </div>
      </footer>
    </div>
  );
}
