import type { Applicant, Reward, Stage } from "./types";
import { STAGE_LABELS } from "./types";

// ---- Currency / numbers -------------------------------------------------

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => gbp.format(value || 0);

export const formatPercent = (value: number, digits = 0) =>
  `${(value || 0).toFixed(digits)}%`;

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-GB").format(value || 0);

export const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const relativeTime = (iso?: string) => {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};

// ---- Colour: hex -> "H S% L%" for CSS custom properties -----------------

export function hexToHslString(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Readable foreground (black/white) for a given brand hex.
export function readableForeground(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "0 0% 10%" : "0 0% 100%";
}

// ---- Template rendering -------------------------------------------------

export interface RenderContext {
  name: string;
  role: string;
  company: string;
  stage: string;
  location: string;
}

const firstName = (name: string) => (name || "there").trim().split(" ")[0];

export function renderTemplate(text: string, ctx: RenderContext): string {
  return (text || "")
    .replace(/\{\{\s*name\s*\}\}/gi, ctx.name || "there")
    .replace(/\{\{\s*firstname\s*\}\}/gi, firstName(ctx.name))
    .replace(/\{\{\s*role\s*\}\}/gi, ctx.role || "the role")
    .replace(/\{\{\s*company\s*\}\}/gi, ctx.company || "our team")
    .replace(/\{\{\s*stage\s*\}\}/gi, ctx.stage || "your application")
    .replace(/\{\{\s*location\s*\}\}/gi, ctx.location || "");
}

export function rewardSummary(reward?: Reward): string {
  if (!reward) return "No reward";
  return reward.label;
}

export function stageLabel(stage: Stage): string {
  return STAGE_LABELS[stage];
}

// Rough, defensible brand-sentiment proxy used in reporting. Rewards a high
// open + redemption rate; not a real NPS, clearly labelled as an estimate.
export function estimateSentimentUplift(applicants: Applicant[]): number {
  const rejected = applicants.filter((a) => a.rejection);
  if (rejected.length === 0) return 0;
  const opened = rejected.filter((a) => a.rejection?.opened).length;
  const redeemed = rejected.filter((a) => a.rejection?.redeemed).length;
  const purchased = rejected.filter((a) => a.rejection?.purchased).length;
  const score =
    (opened / rejected.length) * 30 +
    (redeemed / rejected.length) * 40 +
    (purchased / rejected.length) * 30;
  return Math.round(score);
}
