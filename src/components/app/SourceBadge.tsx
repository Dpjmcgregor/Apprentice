import { Plug, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOURCE_LABELS, type JobSource } from "@/lib/types";

const COLORS: Record<JobSource, string> = {
  greenhouse: "bg-emerald-50 text-emerald-700",
  lever: "bg-indigo-50 text-indigo-700",
  workable: "bg-sky-50 text-sky-700",
  manual: "bg-slate-100 text-slate-600",
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
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        COLORS[source],
        className
      )}
    >
      {manual ? (
        <Pencil className="h-3 w-3" />
      ) : (
        <Plug className="h-3 w-3" />
      )}
      {withPrefix && !manual ? "Synced · " : ""}
      {SOURCE_LABELS[source]}
    </span>
  );
}
