import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Search,
  MailX,
  ExternalLink,
  MailOpen,
  Gift,
  ShoppingBag,
  Share2,
  Send,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { STAGES, STAGE_LABELS, type Applicant, type Stage } from "@/lib/types";
import { relativeTime } from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { StageBadge, StatusBadge } from "@/components/app/StageBadge";
import { SourceBadge } from "@/components/app/SourceBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

type Filter = "active" | "rejected" | "all";

export default function Applicants() {
  const { data, rejectApplicant, rejectMany, updateApplicantStage, getReward, getJob } =
    useStore();
  const [filter, setFilter] = useState<Filter>("active");
  const [jobId, setJobId] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    return data.applicants.filter((a) => {
      if (filter === "active" && a.status !== "active") return false;
      if (filter === "rejected" && a.status !== "rejected") return false;
      if (jobId !== "all" && a.jobId !== jobId) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !a.name.toLowerCase().includes(q) &&
          !a.email.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [data.applicants, filter, jobId, query]);

  const activeIds = rows.filter((a) => a.status === "active").map((a) => a.id);
  const selectedActive = [...selected].filter((id) => activeIds.includes(id));
  const allSelected =
    activeIds.length > 0 && selectedActive.length === activeIds.length;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => {
      if (allSelected) return new Set();
      return new Set(activeIds);
    });
  };

  const rejectOne = (a: Applicant) => {
    const template = data.templates[a.stage];
    if (!template.enabled) {
      toast.error(`${STAGE_LABELS[a.stage]} rejection flow is switched off`, {
        description: "Turn it on in the rejection builder before sending.",
      });
      return;
    }
    const reward = getReward(template.rewardId);
    rejectApplicant(a.id);
    toast.success(`Rejection sent to ${a.name.split(" ")[0]}`, {
      description: reward
        ? `${STAGE_LABELS[a.stage]} template · ${reward.label}`
        : STAGE_LABELS[a.stage],
    });
  };

  const rejectSelected = () => {
    const chosen = rows.filter((a) => selectedActive.includes(a.id));
    const sendable = chosen.filter((a) => data.templates[a.stage].enabled);
    const skipped = chosen.length - sendable.length;
    if (sendable.length === 0) {
      toast.error("No rejections sent", {
        description:
          "The selected applicants are at stages whose rejection flow is switched off.",
      });
      return;
    }
    rejectMany(sendable.map((a) => a.id));
    toast.success(
      `${sendable.length} on-brand rejection${
        sendable.length > 1 ? "s" : ""
      } sent`,
      {
        description:
          skipped > 0
            ? `${skipped} skipped — their stage flow is switched off.`
            : "Each applicant got the reward matched to their stage.",
      }
    );
    setSelected(new Set());
  };

  const counts = useMemo(() => {
    return {
      active: data.applicants.filter((a) => a.status === "active").length,
      rejected: data.applicants.filter((a) => a.status === "rejected").length,
      all: data.applicants.length,
    };
  }, [data.applicants]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applicants"
        description="Candidates synced from your connected ATS. When a candidate is rejected there, Cushion sends the reward automatically — or trigger it here for manual roles."
      />

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border bg-card p-1">
          {(["active", "rejected", "all"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f} <span className="opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 sm:max-w-md sm:flex-row">
          <Select value={jobId} onValueChange={setJobId}>
            <SelectTrigger className="sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All jobs</SelectItem>
              {data.jobs.map((j) => (
                <SelectItem key={j.id} value={j.id}>
                  {j.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name or email"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedActive.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/[0.04] px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            {selectedActive.length} selected
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
              Clear
            </Button>
            <Button size="sm" onClick={rejectSelected}>
              <Send className="h-4 w-4" />
              Send rejection + reward
            </Button>
          </div>
        </div>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                  disabled={activeIds.length === 0}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Advocacy</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((a) => {
              const job = getJob(a.jobId);
              const isActive = a.status === "active";
              return (
                <TableRow key={a.id} data-state={selected.has(a.id) ? "selected" : undefined}>
                  <TableCell>
                    {isActive ? (
                      <Checkbox
                        checked={selected.has(a.id)}
                        onCheckedChange={() => toggle(a.id)}
                        aria-label={`Select ${a.name}`}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.email}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="text-foreground">{job?.title ?? "—"}</div>
                    {job && (
                      <SourceBadge source={job.source} className="mt-1" />
                    )}
                  </TableCell>
                  <TableCell>
                    {isActive ? (
                      <Select
                        value={a.stage}
                        onValueChange={(v) =>
                          updateApplicantStage(a.id, v as Stage)
                        }
                      >
                        <SelectTrigger className="h-8 w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STAGES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STAGE_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <StageBadge stage={a.rejection!.stageAtRejection} />
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge rejected={!isActive} />
                  </TableCell>
                  <TableCell>
                    {a.rejection ? (
                      <div className="flex items-center gap-1.5">
                        <Track on={a.rejection.opened} title="Opened">
                          <MailOpen className="h-4 w-4" />
                        </Track>
                        <Track on={a.rejection.redeemed} title="Redeemed reward">
                          <Gift className="h-4 w-4" />
                        </Track>
                        <Track on={a.rejection.purchased} title="Made a purchase">
                          <ShoppingBag className="h-4 w-4" />
                        </Track>
                        <Track on={a.rejection.shared} title="Shared socially">
                          <Share2 className="h-4 w-4" />
                        </Track>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Applied {relativeTime(a.appliedAt)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isActive ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectOne(a)}
                        disabled={!data.templates[a.stage].enabled}
                        title={
                          data.templates[a.stage].enabled
                            ? undefined
                            : `${STAGE_LABELS[a.stage]} rejection flow is off`
                        }
                      >
                        <MailX className="h-4 w-4" />
                        Reject well
                      </Button>
                    ) : (
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`/r/${a.rejection!.token}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                          Experience
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                  No applicants match these filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function Track({
  on,
  title,
  children,
}: {
  on: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <span
      title={title}
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-md [&_svg]:h-3.5 [&_svg]:w-3.5",
        on ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground/40"
      )}
    >
      {children}
    </span>
  );
}
