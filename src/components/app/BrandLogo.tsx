import { cn } from "@/lib/utils";

// Renders a brand's monogram tile. `onBrand` fills it with the brand colour
// (via --primary); otherwise it uses a neutral surface.
export function BrandLogo({
  name,
  className,
  onBrand = true,
}: {
  name: string;
  className?: string;
  onBrand?: boolean;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg font-display text-sm font-bold",
        onBrand
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
        className
      )}
    >
      {initials || "??"}
    </div>
  );
}
