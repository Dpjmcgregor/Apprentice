import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Gift, Percent, PoundSterling, Package, Sparkles, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import type { RewardType } from "@/lib/types";
import { formatNumber, formatPercent } from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TYPE_META: Record<RewardType, { label: string; icon: React.ReactNode }> = {
  percentage: { label: "Percentage off", icon: <Percent className="h-4 w-4" /> },
  fixed: { label: "Money off", icon: <PoundSterling className="h-4 w-4" /> },
  freeproduct: { label: "Free product", icon: <Package className="h-4 w-4" /> },
  earlyaccess: { label: "Early access", icon: <Sparkles className="h-4 w-4" /> },
};

export default function Rewards() {
  const { data, addReward, deleteReward } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{
    label: string;
    code: string;
    type: RewardType;
    value: string;
  }>({ label: "", code: "", type: "percentage", value: "15" });

  const usage = useMemo(() => {
    const map: Record<string, { issued: number; redeemed: number }> = {};
    for (const a of data.applicants) {
      const rid = a.rejection?.rewardId;
      if (!rid) continue;
      map[rid] = map[rid] || { issued: 0, redeemed: 0 };
      map[rid].issued += 1;
      if (a.rejection?.redeemed) map[rid].redeemed += 1;
    }
    return map;
  }, [data.applicants]);

  const usesNumericValue = form.type === "percentage" || form.type === "fixed";

  const submit = () => {
    if (!form.label.trim() || !form.code.trim()) {
      toast.error("Add a label and a code");
      return;
    }
    addReward({
      label: form.label,
      code: form.code.toUpperCase().replace(/\s+/g, ""),
      type: form.type,
      value: usesNumericValue ? Number(form.value) || 0 : 0,
    });
    setOpen(false);
    setForm({ label: "", code: "", type: "percentage", value: "15" });
    toast.success("Reward added to the engine");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reward engine"
        description="The exclusive rewards you attach to rejections. Triggered automatically and trackable per applicant."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                New reward
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a reward</DialogTitle>
                <DialogDescription>
                  Set what a rejected applicant receives. In production this
                  issues a code via your voucher partner.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="label">Description</Label>
                  <Input
                    id="label"
                    placeholder="e.g. 20% off your next order"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={form.type}
                      onValueChange={(v) =>
                        setForm({ ...form, type: v as RewardType })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(TYPE_META) as RewardType[]).map((t) => (
                          <SelectItem key={t} value={t}>
                            {TYPE_META[t].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">
                      {form.type === "percentage"
                        ? "Percent"
                        : form.type === "fixed"
                        ? "Amount (£)"
                        : "Value"}
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      disabled={!usesNumericValue}
                      value={usesNumericValue ? form.value : ""}
                      placeholder={usesNumericValue ? "" : "n/a"}
                      onChange={(e) => setForm({ ...form, value: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g. THANKYOU20"
                    className="font-mono uppercase"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submit}>Add reward</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Integration note */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gift className="h-4 w-4" />
            </span>
            <span className="text-muted-foreground">
              Connected voucher engine:{" "}
              <span className="font-medium text-foreground">
                Demo issuer
              </span>{" "}
              — swap for Voucherify or Tremendous in production.
            </span>
          </div>
          <Badge variant="secondary">Sandbox</Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.rewards.map((r) => {
          const u = usage[r.id] ?? { issued: 0, redeemed: 0 };
          const rate = u.issued === 0 ? 0 : (u.redeemed / u.issued) * 100;
          return (
            <Card key={r.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {TYPE_META[r.type].icon}
                </span>
                <button
                  onClick={() => {
                    deleteReward(r.id);
                    toast.success("Reward removed");
                  }}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  title="Delete reward"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 font-semibold text-foreground">{r.label}</p>
              <p className="text-xs text-muted-foreground">
                {TYPE_META[r.type].label}
              </p>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
                  {r.code}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-center">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatNumber(u.issued)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Issued</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatNumber(u.redeemed)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Redeemed</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {formatPercent(rate)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Rate</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
