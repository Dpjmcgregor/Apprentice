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

const FEATURES = [
  {
    icon: Plug,
    title: "Plugs into your ATS",
    body: "Connect Greenhouse, Lever or Workable in minutes. Roles and candidates sync automatically — no data re-entry, no ripping anything out.",
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
    body: "Open rates, redemptions, social shares — and whether rejected applicants go on to buy.",
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
    body: "The moment you reject someone in your ATS, Cushion catches the event — no change to your hiring workflow.",
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
    price: "£99",
    cap: "Up to 500 applications / mo",
    features: ["Rejection builder", "1 reward", "Open & redemption tracking"],
  },
  {
    name: "Growth",
    price: "£299",
    cap: "Up to 5,000 applications / mo",
    features: ["Stage segmentation", "Unlimited rewards", "Advocacy dashboard"],
    featured: true,
  },
  {
    name: "Premium",
    price: "Let's talk",
    cap: "Unlimited applications",
    features: ["White labelling", "Video rejections", "Advanced reporting"],
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
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
              For every 1,000 applicants,{" "}
              <span className="text-primary">999 get rejected.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
              They chose your brand — they wanted to work for you. Cushion plugs
              into your ATS and turns every rejection into a personalised,
              on-brand reward, so rejected applicants become paying customers.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="text-xs uppercase tracking-wider">Works with</span>
              <span className="font-semibold text-slate-200">Greenhouse</span>
              <span className="font-semibold text-slate-200">Lever</span>
              <span className="font-semibold text-slate-200">Workable</span>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/login">
                  Explore the demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/apply/job-barista">See an application form</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The metric */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {[
            { v: "999/1,000", l: "Applicants rejected" },
            { v: "34%", l: "Avg. reward redemption" },
            { v: "11%", l: "Rejected → paying customer" },
            { v: "+62", l: "Est. brand sentiment uplift" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-bold text-foreground">{s.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
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

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Priced per brand
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tiered by applications processed each month.
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
                {p.price}
                {p.price.startsWith("£") && (
                  <span className="text-base font-normal text-muted-foreground">
                    /mo
                  </span>
                )}
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
                <Link to="/login">Start free</Link>
              </Button>
            </div>
          ))}
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
            <Link to="/login">
              Explore the demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t bg-background py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Cushion — turn rejection into
          advocacy.
        </div>
      </footer>
    </div>
  );
}
