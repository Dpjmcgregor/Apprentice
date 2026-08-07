import { cn } from "@/lib/utils";
import { STAGE_LABELS, type Stage } from "@/lib/types";

const STYLES: Record<Stage, string> = {
  applied: "bg-stone-100 text-stone-600",
  screening: "bg-[#E8F0EA] text-[#3F7C64]",
  interview: "bg-[#F7E7D8] text-[#9C5A2C]",
  final: "bg-[#ECE3F3] text-[#634C82]",
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
