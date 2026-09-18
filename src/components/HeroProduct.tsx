import {
  Users,
  Gift,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// A calm, shadcn-style product surface for the hero. Static and token-driven
// (no real data). Figures are illustrative and labelled as such. This is the
// "serious software" moment: fine borders, neutral palette, one orange accent.

const TABS = ["Overview", "Candidates", "Rewards", "Analytics"];

const STATS = [
  {
    icon: Users,
    label: "Applicants opted in",
    value: "18,204",
    delta: "18.4%",
  },
  {
    icon: Gift,
    label: "Rewards redeemed",
    value: "6,120",
    delta: "12.1%",
  },
  {
    icon: ShoppingBag,
    label: "Purchases",
    value: "1,940",
    delta: "9.6%",
  },
  {
    icon: TrendingUp,
    label: "Influenced revenue",
    value: "£74,300",
    delta: "27.0%",
    accent: true,
  },
];

const ACTIVITY: {
  name: string;
  reward: string;
  state: string;
  variant: "brand" | "success" | "neutral";
}[] = [
  { name: "Ava B.", reward: "National Trust day pass", state: "Purchased", variant: "brand" },
  { name: "Marcus O.", reward: "25% off first order", state: "Redeemed", variant: "success" },
  { name: "Priya K.", reward: "Free coffee", state: "Opted in", variant: "neutral" },
];

export function HeroProduct() {
  return (
    <Card className="overflow-hidden p-0 shadow-elevated">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="text-sm font-semibold text-foreground">Cushion</span>
        </div>
        <div className="hidden items-center gap-5 sm:flex">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={
                "text-xs font-medium " +
                (i === 0
                  ? "text-foreground"
                  : "text-muted-foreground")
              }
            >
              {t}
            </span>
          ))}
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground">
          DM
        </span>
      </div>

      {/* Metrics */}
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              {s.value}
            </p>
            <span
              className={
                "mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium " +
                (s.accent ? "text-brand" : "text-success")
              }
            >
              <ArrowUpRight className="h-3 w-3" />
              {s.delta}
            </span>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            Recent activity
          </span>
          <span className="text-[10px] text-muted-foreground">Last 90 days</span>
        </div>
        <div className="mt-2 divide-y divide-border">
          {ACTIVITY.map((a) => (
            <div key={a.name} className="flex items-center gap-3 py-2.5 text-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground">
                {a.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="w-24 shrink-0 truncate font-medium text-foreground">
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

      <p className="border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
        Illustrative product preview.
      </p>
    </Card>
  );
}
