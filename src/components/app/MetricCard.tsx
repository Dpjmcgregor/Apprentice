import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  sub,
  icon,
  accent,
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "p-5",
        accent && "border-primary/30 bg-primary/[0.04]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg [&_svg]:h-4 [&_svg]:w-4",
              accent
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </Card>
  );
}
