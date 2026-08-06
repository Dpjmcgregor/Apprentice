import { Play, Gift } from "lucide-react";
import { renderTemplate, type RenderContext } from "@/lib/format";
import type { BrandSettings, RejectionTemplate, Reward } from "@/lib/types";
import { cn } from "@/lib/utils";

// A faithful, mobile-responsive preview of the rejection email an applicant
// receives. Reused by the flow builder and the public rejection experience.
export function RejectionEmail({
  brand,
  template,
  reward,
  ctx,
  showVideo,
  className,
}: {
  brand: BrandSettings;
  template: RejectionTemplate;
  reward?: Reward;
  ctx: RenderContext;
  showVideo?: boolean;
  className?: string;
}) {
  const body = renderTemplate(template.body, ctx);
  const paragraphs = body.split("\n").filter((line) => line.trim().length > 0);
  const signoff = renderTemplate(template.signoff, ctx)
    .split("\n")
    .filter(Boolean);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-sm",
        className
      )}
    >
      {/* Brand header */}
      <div className="bg-primary px-6 py-5 text-primary-foreground">
        <p className="font-display text-lg font-bold tracking-tight">
          {brand.name}
        </p>
      </div>

      <div className="space-y-4 px-6 py-6 text-slate-700">
        <h2 className="text-xl font-bold text-slate-900">
          {renderTemplate(template.heading, ctx)}
        </h2>

        {(showVideo ?? brand.videoRejections) && (
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900">
              <Play className="h-5 w-5 translate-x-0.5" />
            </div>
            <span className="absolute bottom-2 left-3 text-xs font-medium text-white/80">
              A message from {brand.senderName}
            </span>
          </div>
        )}

        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed">
            {p}
          </p>
        ))}

        {/* Reward block */}
        {reward && (
          <div className="rounded-xl border border-dashed border-primary/40 bg-primary/[0.05] p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Gift className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                A little something from us
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {reward.label}
            </p>
            {reward.code && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                <span className="font-mono text-sm font-semibold tracking-wider text-slate-900">
                  {reward.code}
                </span>
                <span className="text-xs font-medium text-primary">
                  Tap to copy
                </span>
              </div>
            )}
          </div>
        )}

        <div className="pt-2 text-sm leading-relaxed text-slate-600">
          {signoff.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      <div className="border-t px-6 py-4 text-center text-[11px] text-slate-400">
        {brand.whiteLabel ? (
          <span>Sent with care by {brand.name}</span>
        ) : (
          <span>Powered by Rejection Done Right</span>
        )}
      </div>
    </div>
  );
}
