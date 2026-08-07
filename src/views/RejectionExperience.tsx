import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Gift,
  Copy,
  Check,
  ShoppingBag,
  Share2,
  Play,
  Sparkles,
  Heart,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { STAGE_LABELS } from "@/lib/types";
import { renderTemplate, type RenderContext } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/app/BrandLogo";

export default function RejectionExperience() {
  const { token } = useParams();
  const {
    data,
    getApplicantByToken,
    getReward,
    getJob,
    markOpened,
    markRedeemed,
    markShared,
    simulatePurchase,
  } = useStore();

  const applicant = token ? getApplicantByToken(token) : undefined;

  // Record the open once when the page loads.
  useEffect(() => {
    if (token && applicant) markOpened(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [copied, setCopied] = useState(false);

  const template = applicant
    ? data.templates[applicant.rejection!.stageAtRejection]
    : undefined;
  const reward = getReward(applicant?.rejection?.rewardId);
  const job = getJob(applicant?.jobId);
  const brand = data.brand;

  const ctx = useMemo<RenderContext>(
    () => ({
      name: applicant?.name ?? "",
      role: job?.title ?? "the role",
      company: brand.name,
      stage: template ? STAGE_LABELS[template.stage] : "",
      location: applicant?.location ?? "",
    }),
    [applicant, job, brand.name, template]
  );

  if (!applicant || !template) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
        <Card className="max-w-md">
          <CardContent className="p-10 text-center">
            <p className="text-lg font-semibold text-foreground">
              This link has expired
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't find this message. Please check the link from your
              email.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <a href="/">Go home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const redeemed = applicant.rejection?.redeemed;
  const purchased = applicant.rejection?.purchased;

  const paragraphs = renderTemplate(template.body, ctx)
    .split("\n")
    .filter((l) => l.trim().length > 0);
  const signoff = renderTemplate(template.signoff, ctx)
    .split("\n")
    .filter(Boolean);

  const reveal = () => {
    if (token) markRedeemed(token);
    if (reward?.code) {
      navigator.clipboard?.writeText(reward.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    toast.success("Reward unlocked", {
      description: reward?.code ? `Code ${reward.code} copied` : reward?.label,
    });
  };

  const shop = () => {
    if (token) simulatePurchase(token);
    toast.success(`Enjoy ${brand.name}!`, {
      description: "Thanks for giving us another look.",
    });
  };

  const share = () => {
    if (token) markShared(token);
    toast.success("Thanks for sharing 💛");
  };

  return (
    <div className="min-h-screen bg-secondary/40 py-8 sm:py-14">
      <div className="mx-auto max-w-xl px-4">
        <Card className="overflow-hidden">
          {/* Brand header */}
          <div
            className="flex items-center gap-3 px-6 py-6 text-primary-foreground"
            style={{ background: brand.primaryColor }}
          >
            <BrandLogo
              name={brand.name}
              onBrand={false}
              className="h-12 w-12 bg-white/20 text-white"
            />
            <div>
              <p className="font-display text-xl font-bold">{brand.name}</p>
              <p className="text-sm opacity-85">A note for {ctx.name.split(" ")[0]}</p>
            </div>
          </div>

          <CardContent className="space-y-5 p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-foreground">
              {renderTemplate(template.heading, ctx)}
            </h1>

            {brand.videoRejections && (
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900">
                  <Play className="h-6 w-6 translate-x-0.5" />
                </div>
                <span className="absolute bottom-3 left-4 text-sm font-medium text-white/80">
                  A message from {brand.senderName}
                </span>
              </div>
            )}

            {paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-slate-600">
                {p}
              </p>
            ))}

            {/* Reward */}
            {reward && (
              <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/[0.05] p-5">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Gift className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    A little something from us
                  </span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {reward.label}
                </p>

                {reward.code ? (
                  redeemed ? (
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200">
                      <span className="font-mono text-lg font-bold tracking-wider text-foreground">
                        {reward.code}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(reward.code);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex items-center gap-1 text-sm font-medium text-primary"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <Button className="mt-4 w-full" onClick={reveal}>
                      Reveal my code
                    </Button>
                  )
                ) : (
                  !redeemed && (
                    <Button className="mt-4 w-full" onClick={reveal}>
                      Claim this reward
                    </Button>
                  )
                )}
              </div>
            )}

            {/* Post-redeem actions */}
            {redeemed && (
              <div className="space-y-3">
                {purchased ? (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    <Heart className="h-4 w-4" />
                    Thanks for shopping with {brand.name} — you're one of us now.
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    style={{ background: brand.primaryColor }}
                    onClick={shop}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Shop {brand.name}
                  </Button>
                )}
                <button
                  onClick={share}
                  className="flex w-full items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="h-4 w-4" />
                  Share the love
                </button>
              </div>
            )}

            <div className="pt-2 text-slate-600">
              {signoff.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardContent>

          <div className="border-t px-6 py-4 text-center text-[11px] text-muted-foreground">
            {brand.whiteLabel ? (
              <span>Sent with care by {brand.name}</span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Powered by Cushion
              </span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
