import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  MapPin,
  Copy,
  ExternalLink,
  MailX,
  Users,
  MailOpen,
  Gift,
  ShoppingBag,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { computeMetrics } from "@/lib/metrics";
import {
  formatNumber,
  formatPercent,
  relativeTime,
} from "@/lib/format";
import { STAGE_LABELS } from "@/lib/types";
import { PageHeader } from "@/components/app/PageHeader";
import { MetricCard } from "@/components/app/MetricCard";
import { StageBadge, StatusBadge } from "@/components/app/StageBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function JobDetail() {
  const { jobId } = useParams();
  const { data, getJob, getReward, rejectApplicant } = useStore();
  const job = getJob(jobId);

  const applicants = useMemo(
    () => data.applicants.filter((a) => a.jobId === jobId),
    [data.applicants, jobId]
  );
  const m = useMemo(() => computeMetrics(applicants), [applicants]);

  if (!job) {
    return (
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/app/jobs">
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>
        </Button>
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            This job no longer exists.
          </CardContent>
        </Card>
      </div>
    );
  }

  const applyUrl = `${window.location.origin}/apply/${job.id}`;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to="/app/jobs">
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
      </Button>

      <PageHeader
        title={job.title}
        description={job.description}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant={job.status === "open" ? "default" : "secondary"}>
              {job.status}
            </Badge>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location || "Remote"}
        </span>
        <span>·</span>
        <span>{job.department}</span>
        <span>·</span>
        <span>{job.employmentType}</span>
      </div>

      {/* Apply link */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">
              Public application link
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {applyUrl}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(applyUrl);
                toast.success("Link copied");
              }}
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button asChild size="sm">
              <Link to={`/apply/${job.id}`} target="_blank">
                <ExternalLink className="h-4 w-4" />
                Open form
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Applicants" value={formatNumber(m.applications)} icon={<Users />} />
        <MetricCard label="Rejections sent" value={formatNumber(m.rejectionsSent)} icon={<MailX />} />
        <MetricCard label="Open rate" value={formatPercent(m.openRate)} icon={<MailOpen />} />
        <MetricCard
          label="Became customers"
          value={formatPercent(m.conversionRate)}
          icon={<ShoppingBag />}
          accent
        />
      </div>

      {/* Applicants */}
      <Card>
        <div className="border-b px-5 py-4">
          <h3 className="text-base font-semibold">Applicants</h3>
          <p className="text-sm text-muted-foreground">
            Reject with care, straight from the pipeline.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((a) => {
              const reward = a.rejection
                ? getReward(a.rejection.rewardId)
                : getReward(data.templates[a.stage].rewardId);
              return (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.email}</div>
                  </TableCell>
                  <TableCell>
                    <StageBadge
                      stage={a.rejection?.stageAtRejection ?? a.stage}
                    />
                  </TableCell>
                  <TableCell>
                    <StatusBadge rejected={a.status === "rejected"} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {reward?.label ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {relativeTime(a.appliedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {a.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!data.templates[a.stage].enabled}
                        title={
                          data.templates[a.stage].enabled
                            ? undefined
                            : `${STAGE_LABELS[a.stage]} rejection flow is off`
                        }
                        onClick={() => {
                          if (!data.templates[a.stage].enabled) {
                            toast.error(
                              `${STAGE_LABELS[a.stage]} rejection flow is switched off`,
                              {
                                description:
                                  "Turn it on in the rejection builder before sending.",
                              }
                            );
                            return;
                          }
                          rejectApplicant(a.id);
                          toast.success(`Rejection sent to ${a.name.split(" ")[0]}`, {
                            description: `${STAGE_LABELS[a.stage]} · ${
                              reward?.label ?? "no reward"
                            }`,
                          });
                        }}
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
            {applicants.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  No applicants yet. Share the link above to start collecting.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
