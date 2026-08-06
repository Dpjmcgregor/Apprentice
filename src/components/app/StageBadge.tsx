import { cn } from "@/lib/utils";
import { STAGE_LABELS, type Stage } from "@/lib/types";

const STYLES: Record<Stage, string> = {
  applied: "bg-slate-100 text-slate-700",
  screening: "bg-sky-100 text-sky-700",
  interview: "bg-amber-100 text-amber-700",
  final: "bg-violet-100 text-violet-700",
};

export function StageBadge({
  stage,
  className,
}: {
  stage: Stage;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STYLES[stage],
        className
      )}
    >
      {STAGE_LABELS[stage]}
    </span>
  );
}

export function StatusBadge({ rejected }: { rejected: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        rejected
          ? "bg-rose-50 text-rose-600"
          : "bg-emerald-50 text-emerald-600"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          rejected ? "bg-rose-500" : "bg-emerald-500"
        )}
      />
      {rejected ? "Rejected" : "Active"}
    </span>
  );
}
