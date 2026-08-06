import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus,
  MapPin,
  Users,
  MailX,
  Gift,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { computeMetrics } from "@/lib/metrics";
import { formatNumber, formatPercent } from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const DEPARTMENTS = ["Retail", "Hospitality", "Marketing", "Operations", "Leadership", "Support"];
const TYPES = ["Full-time", "Part-time", "Seasonal", "Contract"];

export default function Jobs() {
  const { data, addJob } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    location: "",
    department: "Retail",
    employmentType: "Full-time",
    description: "",
  });

  const jobs = data.jobs;

  const jobStats = useMemo(() => {
    const map: Record<string, ReturnType<typeof computeMetrics>> = {};
    for (const job of jobs) {
      map[job.id] = computeMetrics(
        data.applicants.filter((a) => a.jobId === job.id)
      );
    }
    return map;
  }, [jobs, data.applicants]);

  const copyApplyLink = (jobId: string) => {
    const url = `${window.location.origin}/apply/${jobId}`;
    navigator.clipboard?.writeText(url);
    toast.success("Application link copied", { description: url });
  };

  const submit = () => {
    if (!form.title.trim()) {
      toast.error("Give the role a title");
      return;
    }
    const job = addJob(form);
    setOpen(false);
    setForm({
      title: "",
      location: "",
      department: "Retail",
      employmentType: "Full-time",
      description: "",
    });
    toast.success(`"${job.title}" created`, {
      description: "Share the application link to start collecting applicants.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        description="Create roles and collect applicants. Every application becomes an advocacy opportunity."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                New job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create a job</DialogTitle>
                <DialogDescription>
                  Post a role and get a shareable application form — no ATS
                  required.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Job title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Barista"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. London — Shoreditch"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select
                      value={form.department}
                      onValueChange={(v) => setForm({ ...form, department: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Employment type</Label>
                    <Select
                      value={form.employmentType}
                      onValueChange={(v) =>
                        setForm({ ...form, employmentType: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Short description</Label>
                  <Textarea
                    id="desc"
                    placeholder="What's the role about?"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submit}>Create job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => {
          const m = jobStats[job.id];
          return (
            <Card key={job.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    to={`/app/jobs/${job.id}`}
                    className="text-lg font-semibold text-foreground hover:text-primary"
                  >
                    {job.title}
                  </Link>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location || "Remote"}
                  </p>
                </div>
                <Badge variant={job.status === "open" ? "default" : "secondary"}>
                  {job.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="outline">{job.department}</Badge>
                <Badge variant="outline">{job.employmentType}</Badge>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-secondary/60 p-3 text-center">
                <Stat icon={<Users className="h-4 w-4" />} label="Applicants" value={formatNumber(m.applications)} />
                <Stat icon={<MailX className="h-4 w-4" />} label="Rejected" value={formatNumber(m.rejectionsSent)} />
                <Stat icon={<Gift className="h-4 w-4" />} label="Redeemed" value={formatPercent(m.redemptionRate)} />
              </div>

              <div className="mt-4 flex items-center gap-2 border-t pt-4">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to={`/app/jobs/${job.id}`}>Manage</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyApplyLink(job.id)}
                  title="Copy application link"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button asChild variant="ghost" size="sm" title="Open application form">
                  <Link to={`/apply/${job.id}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-md bg-background text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
