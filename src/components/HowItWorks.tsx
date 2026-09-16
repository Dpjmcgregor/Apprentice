import {
  ChevronRight,
  Mail,
  Gift,
  Tag,
  ShoppingCart,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// The "How it works" process. Circular numbered nodes on a connector line
// (dashed with an "If unsuccessful" label between steps 3 and 4), with a small
// product illustration under each step. Server component: static markup only.
// Step titles and bodies come from the page verbatim; the illustrations are
// keyed by index. Figures in the impact preview are illustrative.

type Step = { n: string; title: string; body: string };

const ATS = ["TeamTailor", "Greenhouse", "Lever", "Workable"];
const OFFERS = ["Gymshark", "Hotel Chocolat", "Uber Eats", "and more"];
const IMPACT = [
  { icon: Tag, label: "Offers redeemed", value: "1,248", delta: "22%" },
  { icon: ShoppingCart, label: "Purchases", value: "342", delta: "18%" },
  { icon: BarChart3, label: "Revenue", value: "£12,430", delta: "27%" },
];

function AtsCard() {
  return (
    <Card className="h-full p-3">
      <ul className="space-y-2">
        {ATS.map((name) => (
          <li
            key={name}
            className="flex items-center gap-2.5 rounded-lg border border-border/70 px-2.5 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-[11px] font-bold text-muted-foreground">
              {name[0]}
            </span>
            <span className="flex-1 truncate text-xs font-medium text-foreground">
              {name}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function JobCard() {
  return (
    <Card className="h-full p-4">
      <p className="text-[11px] text-muted-foreground">Your Careers</p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        Marketing Manager
      </p>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <span className="block h-2 w-full rounded bg-muted" />
        <span className="block h-2 w-4/5 rounded bg-muted" />
        <span className="block h-2 w-2/3 rounded bg-muted" />
      </div>
      <div className="mt-4 flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
        Apply
        <ChevronRight className="ml-1 h-3.5 w-3.5" />
      </div>
    </Card>
  );
}

function OffersCard() {
  return (
    <Card className="h-full p-4 text-center">
      <p className="text-sm font-semibold text-foreground">You&rsquo;re in 🎉</p>
      <p className="mx-auto mt-1 max-w-[15rem] text-[11px] text-muted-foreground">
        Here are some offers while we review your application.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {OFFERS.map((o) => (
          <span
            key={o}
            className="flex items-center justify-center rounded-lg border border-border/70 px-2 py-2 text-center text-[11px] font-semibold text-foreground"
          >
            {o}
          </span>
        ))}
      </div>
    </Card>
  );
}

function EmailCard() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-foreground">
        <Mail className="h-4 w-4 text-muted-foreground" />
        Application update
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Hi Alex,</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Thank you for your interest&hellip;
      </p>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent/60 p-2.5">
        <Gift className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-xs font-semibold text-primary">
            A little something from us
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Here&rsquo;s a thank-you offer for your time.
          </p>
        </div>
      </div>
    </Card>
  );
}

function ImpactCard() {
  return (
    <Card className="h-full p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Impact</span>
        <span className="text-[10px] text-muted-foreground">Last 90 days</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {IMPACT.map((m) => (
          <li key={m.label} className="flex items-center gap-2 text-xs">
            <m.icon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="flex-1 text-muted-foreground">{m.label}</span>
            <span className="font-semibold text-foreground">{m.value}</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-success">
              <ArrowUpRight className="h-3 w-3" />
              {m.delta}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Illustration({ i }: { i: number }) {
  switch (i) {
    case 0:
      return <AtsCard />;
    case 1:
      return <JobCard />;
    case 2:
      return <OffersCard />;
    case 3:
      return <EmailCard />;
    case 4:
      return <ImpactCard />;
    default:
      return null;
  }
}

// A solid or dashed connector between two nodes. The dashed one (step 3 -> 4)
// carries the "If unsuccessful" label instead of a chevron.
function Connector({ dashed }: { dashed?: boolean }) {
  if (dashed) {
    return (
      <>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-0 flex w-full -translate-y-1/2 items-center"
        >
          <span className="flex-1 border-t border-dashed border-muted-foreground/40" />
          <span className="flex-1 border-t border-dashed border-muted-foreground/40" />
        </span>
        <span className="absolute left-1/2 top-1/2 z-20 flex w-full -translate-y-1/2 justify-center">
          <Badge
            variant="neutral"
            className="px-2 py-0 text-[11px] font-medium"
          >
            If unsuccessful
          </Badge>
        </span>
      </>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 z-0 flex w-full -translate-y-1/2 items-center"
    >
      <span className="h-px flex-1 bg-border" />
      <ChevronRight className="mx-1 h-4 w-4 shrink-0 text-primary/50" />
      <span className="h-px flex-1 bg-border" />
    </span>
  );
}

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <>
      {/* Desktop: horizontal process in one row. */}
      <ol className="mt-14 hidden grid-cols-5 gap-4 lg:grid">
        {steps.map((s, i) => (
          <li key={s.n} className="flex flex-col">
            <div className="relative flex h-14 items-center justify-center">
              {i < steps.length - 1 && <Connector dashed={i === 2} />}
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent font-display text-2xl font-bold text-primary">
                {s.n}
              </span>
            </div>
            <div className="mt-5 flex flex-col text-center lg:min-h-[8rem]">
              <h3 className="text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
            <div className="mt-2 flex-1">
              <Illustration i={i} />
            </div>
          </li>
        ))}
      </ol>

      {/* Mobile / tablet: vertical timeline. */}
      <ol className="mt-12 lg:hidden">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex gap-4 pb-10 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={
                  "absolute bottom-0 left-7 top-14 -translate-x-1/2 " +
                  (i === 2
                    ? "border-l border-dashed border-muted-foreground/40"
                    : "w-px bg-border")
                }
              />
            )}
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent font-display text-2xl font-bold text-primary">
              {s.n}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <h3 className="text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              {i === 2 && (
                <Badge
                  variant="neutral"
                  className="mt-3 px-2 py-0 text-[11px] font-medium"
                >
                  If unsuccessful
                </Badge>
              )}
              <div className="mt-4 max-w-xs">
                <Illustration i={i} />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Product previews are illustrative.
      </p>
    </>
  );
}
