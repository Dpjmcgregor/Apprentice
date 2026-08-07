import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Wand2,
  FileInput,
  Layers,
  Gift,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/lib/store";
import {
  STAGES,
  STAGE_LABELS,
  type Stage,
  type Tone,
} from "@/lib/types";
import type { RenderContext } from "@/lib/format";
import { PageHeader } from "@/components/app/PageHeader";
import { RejectionEmail } from "@/components/app/RejectionEmail";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const TONES: { value: Tone; label: string; hint: string }[] = [
  { value: "warm", label: "Warm", hint: "Human, friendly, first-name" },
  { value: "professional", label: "Professional", hint: "Polished and respectful" },
  { value: "aspirational", label: "Aspirational", hint: "Personal, brand-led, hopeful" },
];

const VARIABLES = [
  { token: "{{firstname}}", label: "First name" },
  { token: "{{name}}", label: "Full name" },
  { token: "{{role}}", label: "Role" },
  { token: "{{company}}", label: "Company" },
  { token: "{{stage}}", label: "Stage" },
  { token: "{{location}}", label: "Location" },
];

export default function RejectionBuilder() {
  const { data, updateTemplate } = useStore();
  const [stage, setStage] = useState<Stage>("applied");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const template = data.templates[stage];

  const previewCtx = useMemo<RenderContext>(() => {
    const sample = data.applicants.find(
      (a) => a.stage === stage || a.rejection?.stageAtRejection === stage
    );
    const job = data.jobs.find((j) => j.id === sample?.jobId) ?? data.jobs[0];
    return {
      name: sample?.name ?? "Ava Bennett",
      role: job?.title ?? "Barista",
      company: data.brand.name,
      stage: STAGE_LABELS[stage],
      location: sample?.location ?? "London",
    };
  }, [data.applicants, data.jobs, data.brand.name, stage]);

  const reward = data.rewards.find((r) => r.id === template.rewardId);

  const insertVariable = (token: string) => {
    const el = bodyRef.current;
    if (!el) {
      updateTemplate(stage, { body: template.body + token });
      return;
    }
    const start = el.selectionStart ?? template.body.length;
    const end = el.selectionEnd ?? template.body.length;
    const next =
      template.body.slice(0, start) + token + template.body.slice(end);
    updateTemplate(stage, { body: next });
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + token.length;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rejection flow builder"
        description="Design the moment an applicant hears “no.” Personalise by name and role, set the tone, and attach the right reward — with a different experience for how far they got."
        actions={
          <Button variant="outline" onClick={() => toast.success("Flow saved")}>
            <Wand2 className="h-4 w-4" />
            Changes save automatically
          </Button>
        }
      />

      {/* Flow overview */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-2 p-4 text-sm">
          <FlowStep icon={<FileInput className="h-4 w-4" />} label="Application received" />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <FlowStep icon={<Layers className="h-4 w-4" />} label="Segment by stage reached" active />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <FlowStep icon={<Wand2 className="h-4 w-4" />} label="Personalised rejection" active />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <FlowStep icon={<Gift className="h-4 w-4" />} label="Reward delivered" active />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <FlowStep icon={<BarChart3 className="h-4 w-4" />} label="Advocacy tracked" />
        </CardContent>
      </Card>

      {/* Stage segmentation */}
      <Tabs value={stage} onValueChange={(v) => setStage(v as Stage)}>
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-4">
          {STAGES.map((s) => (
            <TabsTrigger key={s} value={s}>
              {STAGE_LABELS[s]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-5">
          <Card>
            <CardContent className="space-y-5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {STAGE_LABELS[stage]} rejection
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sent when a {STAGE_LABELS[stage].toLowerCase()} applicant is
                    rejected
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="enabled" className="text-sm text-muted-foreground">
                    {template.enabled ? "Active" : "Off"}
                  </Label>
                  <Switch
                    id="enabled"
                    checked={template.enabled}
                    onCheckedChange={(v) =>
                      updateTemplate(stage, { enabled: v })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tone</Label>
                <div className="grid grid-cols-3 gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => updateTemplate(stage, { tone: t.value })}
                      className={cn(
                        "rounded-lg border p-3 text-left transition-colors",
                        template.tone === t.value
                          ? "border-primary bg-primary/[0.05] ring-1 ring-primary"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <p className="text-sm font-medium text-foreground">
                        {t.label}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                        {t.hint}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Email subject</Label>
                <Input
                  id="subject"
                  value={template.subject}
                  onChange={(e) =>
                    updateTemplate(stage, { subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heading">Heading</Label>
                <Input
                  id="heading"
                  value={template.heading}
                  onChange={(e) =>
                    updateTemplate(stage, { heading: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="body">Message</Label>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {VARIABLES.map((v) => (
                    <button
                      key={v.token}
                      type="button"
                      onClick={() => insertVariable(v.token)}
                      className="rounded-md bg-secondary px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      title={`Insert ${v.label}`}
                    >
                      {v.token}
                    </button>
                  ))}
                </div>
                <Textarea
                  id="body"
                  ref={bodyRef}
                  rows={7}
                  value={template.body}
                  onChange={(e) =>
                    updateTemplate(stage, { body: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signoff">Sign-off</Label>
                <Textarea
                  id="signoff"
                  rows={2}
                  value={template.signoff}
                  onChange={(e) =>
                    updateTemplate(stage, { signoff: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Reward for this stage</Label>
                <Select
                  value={template.rewardId}
                  onValueChange={(v) => updateTemplate(stage, { rewardId: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {data.rewards.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.label} · {r.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tip: give final-stage rejections your highest-value reward.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Live preview
            </p>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
              Personalised for {previewCtx.name.split(" ")[0]}
            </span>
          </div>
          <div className="sticky top-6">
            <div className="rounded-2xl bg-slate-100 p-4 sm:p-6">
              <RejectionEmail
                brand={data.brand}
                template={template}
                reward={reward}
                ctx={previewCtx}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowStep({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2",
        active
          ? "border-primary/30 bg-primary/[0.05] text-foreground"
          : "border-border text-muted-foreground"
      )}
    >
      <span className={cn(active ? "text-primary" : "text-muted-foreground")}>
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
