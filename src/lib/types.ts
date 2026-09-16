// Domain model for Cushion.
// The MVP runs entirely client-side; this store stands in for the Node/Postgres
// backend described in the product brief and persists to localStorage.

export type Tone = "warm" | "professional" | "aspirational";

// Pipeline stages an applicant can reach before rejection. Order matters — it is
// used for progress bars and "how far did they get" segmentation.
export type Stage = "applied" | "screening" | "interview" | "final";

export const STAGES: Stage[] = ["applied", "screening", "interview", "final"];

export const STAGE_LABELS: Record<Stage, string> = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  final: "Final stage",
};

export type ApplicantStatus = "active" | "rejected";

export type RewardType =
  | "percentage"
  | "fixed"
  | "freeproduct"
  | "earlyaccess";

export interface Reward {
  id: string;
  label: string; // e.g. "20% off your next order"
  code: string; // e.g. "THANKYOU20"
  type: RewardType;
  value: number; // percent, currency amount, or 0 for non-numeric rewards
}

// One personalised rejection template per pipeline stage (segmentation): a
// first-round rejection gets a lighter touch, a final-stage rejection gets a
// more personal message and a higher-value reward.
export interface RejectionTemplate {
  stage: Stage;
  enabled: boolean;
  subject: string;
  heading: string;
  body: string; // supports {{name}} {{role}} {{company}} {{stage}} {{location}}
  signoff: string;
  tone: Tone;
  rewardId: string;
}

// v1 is an add-on to an existing applicant tracking system, not a replacement.
// Roles and candidates sync in from the connected ATS; "manual" covers the
// lightweight standalone path (a Cushion-hosted job + application form) used
// when a role has no ATS behind it.
export type AtsProvider = "greenhouse" | "lever" | "workable";
export type JobSource = AtsProvider | "manual";

export const ATS_PROVIDERS: AtsProvider[] = ["greenhouse", "lever", "workable"];

export const SOURCE_LABELS: Record<JobSource, string> = {
  greenhouse: "Greenhouse",
  lever: "Lever",
  workable: "Workable",
  manual: "Cushion (manual)",
};

export interface Integration {
  provider: AtsProvider;
  status: "connected" | "disconnected";
  connectedAt?: string;
  lastSyncedAt?: string;
  // When on, a candidate marked rejected in the ATS fires a webhook that
  // triggers Cushion's advocacy send automatically.
  rejectionWebhook: boolean;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  department: string;
  employmentType: string;
  description: string;
  status: "open" | "closed";
  createdAt: string; // ISO
  source: JobSource;
  externalId?: string; // id of the requisition in the source ATS
}

export interface RejectionRecord {
  sentAt: string;
  token: string; // public link token for /r/:token
  stageAtRejection: Stage;
  rewardId: string;
  opened: boolean;
  openedAt?: string;
  redeemed: boolean;
  redeemedAt?: string;
  shared: boolean;
  purchased: boolean;
  purchasedAt?: string;
  purchaseValue?: number;
}

export interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  location?: string;
  stage: Stage;
  status: ApplicantStatus;
  appliedAt: string; // ISO
  answer?: string;
  rejection?: RejectionRecord;
}

export interface BrandSettings {
  name: string;
  primaryColor: string; // hex, drives --primary at runtime
  senderName: string;
  replyTo: string;
  defaultTone: Tone;
  whiteLabel: boolean;
  videoRejections: boolean;
  plan: "starter" | "growth" | "premium";
}

// A visitor who signed up on the public site to be notified at launch.
export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  company?: string;
  createdAt: string; // ISO
  source: string; // where they joined from, e.g. "landing-hero", "prompt"
}

export interface AppData {
  brand: BrandSettings;
  integrations: Integration[];
  jobs: Job[];
  applicants: Applicant[];
  rewards: Reward[];
  templates: Record<Stage, RejectionTemplate>;
  waitlist: WaitlistEntry[];
}
