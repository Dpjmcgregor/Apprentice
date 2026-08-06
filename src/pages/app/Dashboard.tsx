import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  Users,
  MailX,
  MailOpen,
  Gift,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { computeMetrics, funnel, byStage, weeklyTrend } from "@/lib/metrics";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  relativeTime,
} from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { MetricCard } from "@/components/app/MetricCard";
import { ChartCard, ChartTooltip } from "@/components/app/charts";
import { StageBadge } from "@/components/app/StageBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data } = useStore();
  const brandColor = data.brand.primaryColor;

  const metrics = useMemo(
    () => computeMetrics(data.applicants),
    [data.applicants]
  );
  const trend = useMemo(() => weeklyTrend(data.applicants), [data.applicants]);
  const stages = useMemo(() => byStage(data.applicants), [data.applicants]);
  const steps = useMemo(() => funnel(data.applicants), [data.applicants]);

  const recent = useMemo(
    () =>
      data.applicants
        .filter((a) => a.rejection)
        .sort(
          (a, b) =>
            new Date(b.rejection!.sentAt).getTime() -
            new Date(a.rejection!.sentAt).getTime()
        )
        .slice(0, 6),
    [data.applicants]
  );

  const maxFunnel = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back — ${data.brand.name}`}
        description="Every rejection is a warm audience. Here's how your unsuccessful applicants are becoming advocates and customers."
        actions={
          <Button asChild>
            <Link to="/app/applicants">
              Review pipeline
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      {/* Headline metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          label="Applications"
          value={formatNumber(metrics.applications)}
          sub={`${formatNumber(metrics.active)} still active`}
          icon={<Users />}
        />
        <MetricCard
          label="Rejections sent"
          value={formatNumber(metrics.rejectionsSent)}
          sub="Every one on-brand"
          icon={<MailX />}
        />
        <MetricCard
          label="Open rate"
          value={formatPercent(metrics.openRate)}
          sub={`${formatNumber(metrics.opened)} opened`}
          icon={<MailOpen />}
        />
        <MetricCard
          label="Redemption rate"
          value={formatPercent(metrics.redemptionRate)}
          sub={`${formatNumber(metrics.redeemed)} rewards claimed`}
          icon={<Gift />}
        />
        <MetricCard
          label="Became customers"
          value={formatPercent(metrics.conversionRate)}
          sub={`${formatNumber(metrics.purchased)} first purchases`}
          icon={<ShoppingBag />}
          accent
        />
        <MetricCard
          label="Revenue influenced"
          value={formatCurrency(metrics.revenue)}
          sub="From rejected applicants"
          icon={<TrendingUp />}
        />
      </div>

      {/* The pitch metric */}
      <Card className="overflow-hidden border-primary/30 bg-primary/[0.04]">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Heart className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">
                The metric that sells this to your CFO
              </p>
              <p className="text-lg font-semibold text-foreground">
                {formatPercent(metrics.conversionRate)} of rejected applicants
                became paying customers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {metrics.sentimentUplift}
              </p>
              <p className="text-xs text-muted-foreground">
                Est. sentiment uplift
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {formatNumber(metrics.shared)}
              </p>
              <p className="text-xs text-muted-foreground">Social shares</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Advocacy trend"
            description="Rejections sent vs rewards redeemed, last 8 weeks"
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={trend}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={brandColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={brandColor} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRedeemed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef1f6" vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  stroke="#94a3b8"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  stroke="#94a3b8"
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sent"
                  name="Sent"
                  stroke={brandColor}
                  strokeWidth={2}
                  fill="url(#gSent)"
                />
                <Area
                  type="monotone"
                  dataKey="redeemed"
                  name="Redeemed"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#gRedeemed)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard
          title="Rejection → customer funnel"
          description="Where the warm audience flows"
        >
          <div className="space-y-4 pt-2">
            {steps.map((s, i) => (
              <div key={s.step}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.step}</span>
                  <span className="font-semibold text-foreground">
                    {formatNumber(s.value)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(s.value / maxFunnel) * 100}%`,
                      background: brandColor,
                      opacity: 1 - i * 0.18,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* By stage + recent */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          title="Redemption by stage reached"
          description="Higher-stage rejections get higher-value rewards — and redeem more"
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={stages}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f6" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="#94a3b8"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="#94a3b8"
                unit="%"
              />
              <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: "#f1f5f9" }} />
              <Bar dataKey="redemptionRate" name="Redemption" radius={[6, 6, 0, 0]}>
                {stages.map((_, i) => (
                  <Cell
                    key={i}
                    fill={brandColor}
                    fillOpacity={0.55 + i * 0.15}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h3 className="text-base font-semibold">Recent rejection sends</h3>
              <p className="text-sm text-muted-foreground">
                The latest applicants to hear back
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/applicants">View all</Link>
            </Button>
          </div>
          <div className="divide-y">
            {recent.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 px-5 py-3 text-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                  {a.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">
                    {a.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.email}
                  </p>
                </div>
                <StageBadge stage={a.rejection!.stageAtRejection} />
                <div className="hidden w-24 items-center gap-1 sm:flex">
                  {a.rejection!.opened ? (
                    <span className="text-xs text-emerald-600">Opened</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Sent</span>
                  )}
                  {a.rejection!.redeemed && (
                    <span className="text-xs text-primary">· Redeemed</span>
                  )}
                </div>
                <span className="hidden w-16 text-right text-xs text-muted-foreground sm:block">
                  {relativeTime(a.rejection!.sentAt)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
