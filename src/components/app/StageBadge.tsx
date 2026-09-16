import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { STAGE_LABELS, type Stage } from "@/lib/types";

// Each pipeline stage maps to a tonal Badge variant driven by brand tokens,
// so stage colors stay consistent with the rest of the design language.
const STAGE_VARIANT: Record<Stage, BadgeProps["variant"]> = {
  applied: "neutral",
  screening: "success",
  interview: "warning",
  final: "lavender",
};

export function StageBadge({
  stage,
  className,
}: {
  stage: Stage;
  className?: string;
}) {
  return (
    <Badge variant={STAGE_VARIANT[stage]} className={className}>
      {STAGE_LABELS[stage]}
    </Badge>
  );
}

export function StatusBadge({ rejected }: { rejected: boolean }) {
  return (
    <Badge variant={rejected ? "danger" : "success"}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          rejected ? "bg-destructive" : "bg-success"
        )}
      />
      {rejected ? "Rejected" : "Active"}
    </Badge>
  );
}
