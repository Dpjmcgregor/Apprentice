import {
  Leaf,
  RefreshCw,
  Home,
  Globe,
  TreePine,
  BadgePercent,
  Users,
  Gift,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/app/MetricCard";

// A named, approved real-world example (Miniml x Cushion). The applicant-facing
// message sits on the left, the brand-facing reporting below. Headline figures
// are an illustrative example and the dashboard uses sample data, both labelled
// as such. Photography from the source creative is omitted; this renders in the
// Cushion design system with neutral placeholders.

const ECO = [
  { icon: Leaf, label: "Plant-based formulas" },
  { icon: RefreshCw, label: "Refill and save" },
  { icon: Home, label: "Kind to your home" },
  { icon: Globe, label: "Better for the planet" },
];

const ACTIVITY: {
  name: string;
  reward: string;
  state: string;
  variant: BadgeProps["variant"];
}[] = [
  { name: "Ava B.", reward: "National Trust day pass", state: "Purchased", variant: "brand" },
  { name: "Marcus O.", reward: "25% off first order", state: "Redeemed", variant: "success" },
  { name: "Priya K.", reward: "National Trust day pass", state: "Opted in", variant: "neutral" },
  { name: "Leo S.", reward: "25% off first order", state: "Redeemed", variant: "success" },
];

export function BrandExample() {
  return (
    <div className="space-y-16">
      {/* Applicant-facing example */}
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: editorial */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>Miniml</span>
            <span className="text-muted-foreground">&times;</span>
            <span>Cushion</span>
          </div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Real world example
          </p>
          <h3 className="mt-3 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Applications that go further.
          </h3>
          <p className="mt-5 max-w-md text-muted-foreground">
            When someone applies to join the Miniml team, they&rsquo;re already
            telling us they care about what we&rsquo;re building. With Cushion,
            we can turn that moment into a lasting relationship, with a reward
            for applying, not just a response.
          </p>

          {/* Illustrative maths */}
          <p className="mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            An illustrative example
          </p>
          <div className="mt-3 grid grid-cols-3 gap-4 border-t border-border pt-4">
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                3,000
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                applied for the role of Brand Manager
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                1
              </p>
              <p className="mt-1 text-xs text-muted-foreground">got the job</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-primary">
                2,999
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                are potential advocates, customers and future hires
              </p>
            </div>
          </div>

          {/* Reward mini-cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BadgePercent className="h-5 w-5" />
              </span>
              <p className="mt-3 font-semibold text-foreground">
                Bring Miniml home
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                25% off your first order.
              </p>
            </Card>
            <Card className="p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TreePine className="h-5 w-5" />
              </span>
              <p className="mt-3 font-semibold text-foreground">
                Get outside. On us.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                A National Trust day pass.
              </p>
            </Card>
          </div>

          {/* Brand attributes */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {ECO.map((e) => (
              <span
                key={e.label}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground"
              >
                <e.icon className="h-4 w-4 text-primary" />
                {e.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: phone message mock */}
        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-[2.5rem] border border-border bg-card p-3 shadow-elevated">
            <div className="rounded-[2rem] bg-background p-6">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-foreground">
                <span>Miniml</span>
                <span className="text-muted-foreground">&times;</span>
                <span>Cushion</span>
              </div>
              <h4 className="mt-6 text-center font-serif text-2xl font-bold text-foreground">
                Get outside. On us.
              </h4>
              <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                A National Trust day pass, from Miniml.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Thanks for applying. People like you make Miniml what it is.
                Here&rsquo;s a little something to say thank you. Get out in
                nature, it&rsquo;s where a lot of our inspiration comes from.
              </p>
              <div
                className="mt-5 h-28 rounded-xl bg-secondary"
                aria-hidden="true"
              />
              <Button className="mt-5 w-full">Claim your pass</Button>
              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Make your next shop a little more Miniml. 25% off your first
                order.
              </p>
              <Button variant="outline" className="mt-4 w-full">
                Shop Miniml
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand-facing back end */}
      <div>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="brand">The back end</Badge>
          <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
            What the brand sees
          </h3>
          <p className="mt-3 text-muted-foreground">
            Every opt-in, reward and purchase in one place. Growth sees what
            applicant advocacy is worth.
          </p>
        </div>

        <Card className="mx-auto mt-8 max-w-4xl overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
            <p className="text-sm font-semibold text-foreground">
              Miniml &middot; Applicant advocacy
            </p>
            <span className="text-xs text-muted-foreground">
              Illustrative figures
            </span>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Opted in"
              value="2,999"
              sub="of 3,000 applicants"
              icon={<Users />}
            />
            <MetricCard
              label="Rewards redeemed"
              value="1,142"
              sub="38% of opt-ins"
              icon={<Gift />}
            />
            <MetricCard
              label="Purchases"
              value="418"
              sub="from redeemed rewards"
              icon={<ShoppingBag />}
              accent
            />
            <MetricCard
              label="Influenced revenue"
              value="£18,810"
              sub="last 90 days"
              icon={<TrendingUp />}
              accent
            />
          </div>
          <div className="border-t border-border px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recent activity
            </p>
            <div className="mt-2 divide-y divide-border">
              {ACTIVITY.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 py-3 text-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                    {a.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                    {a.name}
                  </span>
                  <span className="hidden flex-1 truncate text-muted-foreground sm:block">
                    {a.reward}
                  </span>
                  <Badge variant={a.variant}>{a.state}</Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted-foreground">
          Sample data shown for illustration.
        </p>
      </div>
    </div>
  );
}
