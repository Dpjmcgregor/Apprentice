import { useMemo } from "react";
import { toast } from "sonner";
import {
  Plug,
  RefreshCw,
  Check,
  Zap,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/lib/store";
import {
  ATS_PROVIDERS,
  SOURCE_LABELS,
  type AtsProvider,
} from "@/lib/types";
import { formatNumber, relativeTime } from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const PROVIDER_META: Record<
  AtsProvider,
  { color: string; blurb: string }
> = {
  greenhouse: {
    color: "#24a47a",
    blurb: "Sync roles & candidates and catch rejection events via Harvest webhooks.",
  },
  lever: {
    color: "#5340ff",
    blurb: "Two-way sync with Lever postings and archive/rejection triggers.",
  },
  workable: {
    color: "#1f7bd6",
    blurb: "Import jobs & candidates and listen for disqualification events.",
  },
};

export default function Integrations() {
  const { data, connectAts, disconnectAts, syncAts, setRejectionWebhook } =
    useStore();

  const sourceCounts = useMemo(() => {
    const jobs: Record<string, number> = {};
    const applicants: Record<string, number> = {};
    const jobSource: Record<string, string> = {};
    for (const j of data.jobs) {
      jobs[j.source] = (jobs[j.source] || 0) + 1;
      jobSource[j.id] = j.source;
    }
    for (const a of data.applicants) {
      const src = jobSource[a.jobId];
      if (src) applicants[src] = (applicants[src] || 0) + 1;
    }
    return { jobs, applicants };
  }, [data.jobs, data.applicants]);

  const connectedCount = data.integrations.filter(
    (i) => i.status === "connected"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Cushion is an add-on to your existing ATS. Connect it once — roles and candidates sync in, and rejections are caught automatically."
      />

      {/* How the plugin works */}
      <Card className="overflow-hidden border-primary/30 bg-primary/[0.04]">
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Step icon={<Plug className="h-4 w-4" />} label="Connect your ATS" />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Step icon={<RefreshCw className="h-4 w-4" />} label="Jobs & candidates sync" />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Step
              icon={<Zap className="h-4 w-4" />}
              label="ATS rejection → webhook"
            />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Step
              icon={<Check className="h-4 w-4" />}
              label="Cushion sends reward"
            />
          </div>
          <div className="lg:ml-auto">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {connectedCount} of {data.integrations.length} connected
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {ATS_PROVIDERS.map((provider) => {
          const integ = data.integrations.find(
            (i) => i.provider === provider
          )!;
          const meta = PROVIDER_META[provider];
          const connected = integ.status === "connected";
          const initials = SOURCE_LABELS[provider].slice(0, 2).toUpperCase();
          return (
            <Card key={provider} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                    style={{ background: meta.color }}
                  >
                    {initials}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {SOURCE_LABELS[provider]}
                    </p>
                    <span
                      className={
                        "inline-flex items-center gap-1.5 text-xs font-medium " +
                        (connected ? "text-emerald-600" : "text-muted-foreground")
                      }
                    >
                      <span
                        className={
                          "h-1.5 w-1.5 rounded-full " +
                          (connected ? "bg-emerald-500" : "bg-slate-300")
                        }
                      />
                      {connected ? "Connected" : "Not connected"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{meta.blurb}</p>

              {connected ? (
                <>
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-secondary/60 p-3 text-center">
                    <div>
                      <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-md bg-background text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formatNumber(sourceCounts.jobs[provider] || 0)}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Jobs synced
                      </p>
                    </div>
                    <div>
                      <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-md bg-background text-muted-foreground">
                        <Users className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formatNumber(sourceCounts.applicants[provider] || 0)}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Candidates
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Rejection trigger
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Auto-send on ATS rejection
                      </p>
                    </div>
                    <Switch
                      checked={integ.rejectionWebhook}
                      onCheckedChange={(v) => {
                        setRejectionWebhook(provider, v);
                        toast.success(
                          v
                            ? `${SOURCE_LABELS[provider]} rejection webhook on`
                            : `${SOURCE_LABELS[provider]} rejection webhook off`
                        );
                      }}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Synced {relativeTime(integ.lastSyncedAt)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          syncAts(provider);
                          toast.success(`${SOURCE_LABELS[provider]} synced`);
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Sync
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          disconnectAts(provider);
                          toast.success(`${SOURCE_LABELS[provider]} disconnected`);
                        }}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-auto pt-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      connectAts(provider);
                      toast.success(`${SOURCE_LABELS[provider]} connected`, {
                        description:
                          "Jobs and candidates will sync, and rejections will trigger automatically.",
                      });
                    }}
                  >
                    <Plug className="h-4 w-4" />
                    Connect {SOURCE_LABELS[provider]}
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        No ATS for a particular role? You can still create a Cushion-hosted job
        with its own application form from the Jobs page — it works standalone
        alongside your synced roles.
      </p>
    </div>
  );
}

function Step({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-background px-3 py-2">
      <span className="text-primary">{icon}</span>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  );
}
