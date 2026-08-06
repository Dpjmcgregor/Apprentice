import type { AppData, Applicant, Stage } from "./types";
import { STAGES, STAGE_LABELS } from "./types";
import { estimateSentimentUplift } from "./format";

export interface Metrics {
  applications: number;
  active: number;
  rejectionsSent: number;
  opened: number;
  redeemed: number;
  purchased: number;
  shared: number;
  openRate: number; // %
  redemptionRate: number; // % of sent
  redemptionOfOpened: number; // % of opened
  conversionRate: number; // % of sent that purchased
  revenue: number;
  sentimentUplift: number;
}

const rate = (num: number, den: number) => (den === 0 ? 0 : (num / den) * 100);

export function computeMetrics(
  applicants: Applicant[]
): Metrics {
  const rejected = applicants.filter((a) => a.rejection);
  const opened = rejected.filter((a) => a.rejection?.opened).length;
  const redeemed = rejected.filter((a) => a.rejection?.redeemed).length;
  const purchased = rejected.filter((a) => a.rejection?.purchased).length;
  const shared = rejected.filter((a) => a.rejection?.shared).length;
  const revenue = rejected.reduce(
    (sum, a) => sum + (a.rejection?.purchaseValue ?? 0),
    0
  );

  return {
    applications: applicants.length,
    active: applicants.filter((a) => a.status === "active").length,
    rejectionsSent: rejected.length,
    opened,
    redeemed,
    purchased,
    shared,
    openRate: rate(opened, rejected.length),
    redemptionRate: rate(redeemed, rejected.length),
    redemptionOfOpened: rate(redeemed, opened),
    conversionRate: rate(purchased, rejected.length),
    revenue,
    sentimentUplift: estimateSentimentUplift(applicants),
  };
}

// Funnel from rejection sent -> opened -> redeemed -> purchased.
export function funnel(applicants: Applicant[]) {
  const m = computeMetrics(applicants);
  return [
    { step: "Rejections sent", value: m.rejectionsSent },
    { step: "Opened", value: m.opened },
    { step: "Reward redeemed", value: m.redeemed },
    { step: "Made a purchase", value: m.purchased },
  ];
}

// Rejections by the stage the applicant reached — powers segmentation views.
export function byStage(applicants: Applicant[]) {
  const rejected = applicants.filter((a) => a.rejection);
  return STAGES.map((stage: Stage) => {
    const group = rejected.filter(
      (a) => a.rejection?.stageAtRejection === stage
    );
    const redeemed = group.filter((a) => a.rejection?.redeemed).length;
    const purchased = group.filter((a) => a.rejection?.purchased).length;
    return {
      stage,
      label: STAGE_LABELS[stage],
      sent: group.length,
      redeemed,
      purchased,
      redemptionRate: group.length === 0 ? 0 : (redeemed / group.length) * 100,
    };
  });
}

// Group rejections into weekly buckets for the trend chart (last `weeks`).
export function weeklyTrend(applicants: Applicant[], weeks = 8) {
  const now = Date.now();
  const buckets: { label: string; sent: number; redeemed: number; purchased: number }[] =
    [];
  for (let i = weeks - 1; i >= 0; i--) {
    const end = now - i * 7 * 86_400_000;
    const start = end - 7 * 86_400_000;
    const label = new Date(end).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    const inWindow = (iso?: string) => {
      if (!iso) return false;
      const t = new Date(iso).getTime();
      return t > start && t <= end;
    };
    const sent = applicants.filter((a) => inWindow(a.rejection?.sentAt)).length;
    const redeemed = applicants.filter((a) =>
      inWindow(a.rejection?.redeemedAt)
    ).length;
    const purchased = applicants.filter((a) =>
      inWindow(a.rejection?.purchasedAt)
    ).length;
    buckets.push({ label, sent, redeemed, purchased });
  }
  return buckets;
}

export function jobMetrics(data: AppData, jobId: string) {
  const applicants = data.applicants.filter((a) => a.jobId === jobId);
  return { applicants, metrics: computeMetrics(applicants) };
}
