import { toast } from "sonner";
import { Check, RotateCcw, Crown } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Tone } from "@/lib/types";
import { PageHeader } from "@/components/app/PageHeader";
import { BrandLogo } from "@/components/app/BrandLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const PRESETS = [
  "#6d3bf5",
  "#e11d48",
  "#0ea5e9",
  "#f97316",
  "#059669",
  "#db2777",
  "#7c3aed",
  "#0f172a",
];

const TONES: Tone[] = ["warm", "professional", "aspirational"];

const PLANS = [
  { value: "starter", label: "Starter", cap: "500 applications / mo" },
  { value: "growth", label: "Growth", cap: "5,000 applications / mo" },
  { value: "premium", label: "Premium", cap: "Unlimited + white label" },
] as const;

export default function Settings() {
  const { data, updateBrand, resetDemo } = useStore();
  const brand = data.brand;
  const premium = brand.plan === "premium";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Make every rejection unmistakably yours."
        actions={
          <Button
            variant="outline"
            onClick={() => {
              resetDemo();
              toast.success("Demo data reset");
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reset demo data
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Brand identity */}
          <Section title="Brand identity" description="How you show up in every applicant's inbox.">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand name</Label>
              <Input
                id="brand-name"
                value={brand.name}
                onChange={(e) => updateBrand({ name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Brand colour</Label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateBrand({ primaryColor: c })}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg ring-offset-2 transition-transform hover:scale-105",
                      brand.primaryColor.toLowerCase() === c &&
                        "ring-2 ring-foreground"
                    )}
                    style={{ background: c }}
                    aria-label={`Use ${c}`}
                  >
                    {brand.primaryColor.toLowerCase() === c && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
                <div className="ml-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={brand.primaryColor}
                    onChange={(e) =>
                      updateBrand({ primaryColor: e.target.value })
                    }
                    className="h-9 w-9 cursor-pointer rounded-lg border bg-transparent p-0.5"
                    aria-label="Custom colour"
                  />
                  <Input
                    value={brand.primaryColor}
                    onChange={(e) =>
                      updateBrand({ primaryColor: e.target.value })
                    }
                    className="w-28 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sender">Sender name</Label>
                <Input
                  id="sender"
                  value={brand.senderName}
                  onChange={(e) => updateBrand({ senderName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reply">Reply-to email</Label>
                <Input
                  id="reply"
                  type="email"
                  value={brand.replyTo}
                  onChange={(e) => updateBrand({ replyTo: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default tone</Label>
              <Select
                value={brand.defaultTone}
                onValueChange={(v) => updateBrand({ defaultTone: v as Tone })}
              >
                <SelectTrigger className="sm:w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t} value={t} className="capitalize">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Section>

          {/* Premium features */}
          <Section
            title="Premium features"
            description="Included on the Premium plan."
          >
            <ToggleRow
              label="White labelling"
              hint="Remove “Powered by Rejection Done Right” from emails."
              checked={brand.whiteLabel}
              disabled={!premium}
              onChange={(v) => updateBrand({ whiteLabel: v })}
            />
            <ToggleRow
              label="Video rejection messages"
              hint="Add a hiring-manager video to the rejection experience."
              checked={brand.videoRejections}
              disabled={!premium}
              onChange={(v) => updateBrand({ videoRejections: v })}
            />
            {!premium && (
              <p className="text-xs text-muted-foreground">
                Upgrade to Premium to switch these on.
              </p>
            )}
          </Section>

          {/* Plan */}
          <Section title="Plan" description="Billed per brand, tiered by applications processed.">
            <div className="grid gap-3 sm:grid-cols-3">
              {PLANS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => updateBrand({ plan: p.value })}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    brand.plan === p.value
                      ? "border-primary bg-primary/[0.05] ring-1 ring-primary"
                      : "hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{p.label}</p>
                    {p.value === "premium" && (
                      <Crown className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.cap}</p>
                </button>
              ))}
            </div>
          </Section>
        </div>

        {/* Live brand preview */}
        <div>
          <div className="sticky top-6 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Preview</p>
            <Card>
              <div
                className="flex items-center gap-3 p-5 text-primary-foreground"
                style={{ background: brand.primaryColor }}
              >
                <BrandLogo
                  name={brand.name}
                  onBrand={false}
                  className="h-10 w-10 bg-white/20 text-white"
                />
                <div>
                  <p className="font-display font-bold">{brand.name}</p>
                  <p className="text-xs opacity-80">{brand.senderName}</p>
                </div>
              </div>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <Badge>Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline" className="capitalize">
                    {brand.defaultTone}
                  </Badge>
                </div>
                <Button className="w-full">Redeem your reward</Button>
                <Button variant="outline" className="w-full">
                  Visit {brand.name}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  {brand.whiteLabel
                    ? `Sent with care by ${brand.name}`
                    : "Powered by Rejection Done Right"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
