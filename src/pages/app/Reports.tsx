import { useMemo, useState } from "react";
import { Printer, TrendingUp, Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { reportMetrics, reportByStage, recentMonths } from "@/lib/metrics";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { BrandLogo } from "@/components/app/BrandLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Reports() {
  const { data } = useStore();

  const months = useMemo(() => recentMonths(Date.now(), 6), []);
  const [monthKey, setMonthKey] = useState(months[0].key);
  const selected = months.find((mo) => mo.key === monthKey) ?? months[0];

  const m = useMemo(
    () => reportMetrics(data.applicants, selected.window),
    [data.applicants, selected.window]
  );
  const stages = useMemo(
    () => reportByStage(data.applicants, selected.window),
    [data.applicants, selected.window]
  );

  const month = selected.label;

  const rows: { label: string; value: string; note: string }[] = [
    {
      label: "Applications received",
      value: formatNumber(m.applications),
      note: "Warm audience captured",
    },
    {
      label: "Rejections sent",
      value: formatNumber(m.rejectionsSent),
      note: "Every one personalised & on-brand",
    },
    {
      label: "Rewards redeemed",
      value: `${formatNumber(m.redeemed)} · ${formatPercent(m.redemptionRate)}`,
      note: "Rejection turned into an offer taken up",
    },
    {
      label: "Purchases made",
      value: formatNumber(m.purchased),
      note: "Rejected applicants who became customers",
    },
    {
      label: "Revenue influenced",
      value: formatCurrency(m.revenue),
      note: "Directly attributed to the rejection flow",
    },
    {
      label: "Est. brand sentiment uplift",
      value: `+${m.sentimentUplift}`,
      note: "Blended open, redemption & purchase signal",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand report"
        description="A growth and CRM report, not an HR one. Share it with marketing and finance."
        actions={
          <div className="flex items-center gap-2">
            <Select value={monthKey} onValueChange={setMonthKey}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((mo) => (
                  <SelectItem key={mo.key} value={mo.key}>
                    {mo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Export / print
            </Button>
          </div>
        }
      />

      <Card className="overflow-hidden">
        {/* Report header */}
        <div className="flex flex-col gap-4 border-b bg-secondary/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo name={data.brand.name} className="h-12 w-12" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {data.brand.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Applicant advocacy report · {month}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-primary/[0.06] px-5 py-3 text-center">
            <p className="text-xs font-medium text-muted-foreground">
              Rejected → paying customer
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatPercent(m.conversionRate)}
            </p>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Headline callout */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue from rejected applicants
                </p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(m.revenue)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Heart className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">
                  Applicants who felt valued (opened)
                </p>
                <p className="text-xl font-bold text-foreground">
                  {formatNumber(m.opened)} · {formatPercent(m.openRate)}
                </p>
              </div>
            </div>
          </div>

          {/* Metric rows */}
          <div className="overflow-hidden rounded-xl border">
            <Table>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.label}>
                    <TableCell className="font-medium text-foreground">
                      {r.label}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      {r.value}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                      {r.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Segmentation */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Performance by stage reached
            </h3>
            <div className="overflow-hidden rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stage</TableHead>
                    <TableHead className="text-right">Sent</TableHead>
                    <TableHead className="text-right">Redeemed</TableHead>
                    <TableHead className="text-right">Purchased</TableHead>
                    <TableHead className="text-right">Redemption</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stages.map((s) => (
                    <TableRow key={s.stage}>
                      <TableCell className="font-medium text-foreground">
                        {s.label}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(s.sent)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(s.redeemed)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(s.purchased)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {formatPercent(s.redemptionRate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Brand sentiment uplift is an estimate derived from open, redemption
            and purchase signals — a directional indicator, not a survey score.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
