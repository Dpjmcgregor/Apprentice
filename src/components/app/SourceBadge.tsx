import { Plug, Pencil } from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { SOURCE_LABELS, type JobSource } from "@/lib/types";

// Sources map to tonal Badge variants (brand-token driven) rather than ad-hoc
// indigo/sky/slate, keeping the palette cohesive across the app.
const VARIANT: Record<JobSource, BadgeProps["variant"]> = {
  greenhouse: "success",
  lever: "brand",
  workable: "sage",
  manual: "neutral",
};

// Shows where a job/candidate originated — a synced ATS or a manual Cushion job.
export function SourceBadge({
  source,
  className,
  withPrefix = false,
}: {
  source: JobSource;
  className?: string;
  withPrefix?: boolean;
}) {
  const manual = source === "manual";
  return (
    <Badge variant={VARIANT[source]} className={className}>
      {manual ? <Pencil className="h-3 w-3" /> : <Plug className="h-3 w-3" />}
      {withPrefix && !manual ? "Synced · " : ""}
      {SOURCE_LABELS[source]}
    </Badge>
  );
}
