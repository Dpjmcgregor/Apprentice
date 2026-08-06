import type {
  AppData,
  Applicant,
  Integration,
  Job,
  RejectionTemplate,
  Reward,
  Stage,
} from "./types";
import { STAGES } from "./types";

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

const FIRST = [
  "Ava",
  "Liam",
  "Sophie",
  "Noah",
  "Isla",
  "Jack",
  "Maya",
  "Leo",
  "Grace",
  "Ethan",
  "Freya",
  "Oscar",
  "Ruby",
  "Harry",
  "Ella",
  "Finn",
  "Amara",
  "Reuben",
  "Priya",
  "Theo",
  "Nadia",
  "Marcus",
  "Chloe",
  "Idris",
];
const LAST = [
  "Bennett",
  "Okafor",
  " Walsh",
  "Nguyen",
  "Patel",
  "Kowalski",
  "Silva",
  "Ahmed",
  "Rossi",
  "Murphy",
  "Chen",
  "Dubois",
  "Ivanova",
  "Santos",
  "Khan",
  "Oduya",
];
const CITIES = [
  "London",
  "Manchester",
  "Bristol",
  "Leeds",
  "Glasgow",
  "Birmingham",
  "Brighton",
  "Cardiff",
];

const ANSWERS = [
  "I've shopped here since I was a teenager — being part of the team would mean a lot.",
  "Your sustainability commitments are why I keep coming back as a customer.",
  "I love how the brand shows up in-store. I want to bring that energy to the floor.",
  "Big fan of the loyalty programme — I'd love to help make it even better.",
  "",
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

export const seedRewards: Reward[] = [
  {
    id: "r-welcome",
    label: "15% off your next order",
    code: "THANKYOU15",
    type: "percentage",
    value: 15,
  },
  {
    id: "r-product",
    label: "A free signature product on us",
    code: "ONUS-GIFT",
    type: "freeproduct",
    value: 0,
  },
  {
    id: "r-final",
    label: "25% off + free delivery for a year",
    code: "SOCLOSE25",
    type: "percentage",
    value: 25,
  },
  {
    id: "r-vip",
    label: "Early access to every new drop",
    code: "INSIDER",
    type: "earlyaccess",
    value: 0,
  },
];

export const seedTemplates: Record<Stage, RejectionTemplate> = {
  applied: {
    stage: "applied",
    enabled: true,
    subject: "Thank you for applying to {{company}}, {{firstname}}",
    heading: "Thank you, {{firstname}}",
    body: "Thank you for applying to be our {{role}}. We were genuinely glad you thought of us — we had an incredible response and won't be moving forward this time.\n\nYou chose us, so here's a little thank you from all of us.",
    signoff: "Warmly,\nThe {{company}} team",
    tone: "warm",
    rewardId: "r-welcome",
  },
  screening: {
    stage: "screening",
    enabled: true,
    subject: "An update on your {{role}} application",
    heading: "You made an impression, {{firstname}}",
    body: "Thank you for taking the time to speak with us about the {{role}} role. It was a close call and we won't be progressing your application further right now.\n\nWe'd genuinely love to see you around — as a candidate next time, and as one of our favourite people in the meantime.",
    signoff: "With thanks,\nThe {{company}} team",
    tone: "warm",
    rewardId: "r-welcome",
  },
  interview: {
    stage: "interview",
    enabled: true,
    subject: "Thank you for interviewing with {{company}}",
    heading: "It was so good to meet you, {{firstname}}",
    body: "Thank you for interviewing for the {{role}} position. This was a hard decision — you were up against an exceptional field and we've decided to go a different way this time.\n\nPlease don't be a stranger. Here's something to say thank you for the time and energy you gave us.",
    signoff: "Sincerely,\n{{company}} Talent",
    tone: "professional",
    rewardId: "r-product",
  },
  final: {
    stage: "final",
    enabled: true,
    subject: "So close — a personal note from {{company}}",
    heading: "You were right there with us, {{firstname}}",
    body: "Getting to the final stage for the {{role}} role is no small thing, and this was one of the toughest calls we've had to make. It came down to the smallest of margins and we've made a different decision this time.\n\nWe don't want this to be goodbye. As a thank you for everything you brought to the process, we'd love to keep you close to the brand.",
    signoff: "Personally,\nThe {{company}} Hiring Team",
    tone: "aspirational",
    rewardId: "r-final",
  },
};

export const seedJobs: Job[] = [
  {
    id: "job-barista",
    title: "Barista",
    location: "London — Shoreditch",
    department: "Retail",
    employmentType: "Part-time",
    description:
      "Front-of-house barista for our flagship Shoreditch café. Great coffee, warmer welcomes.",
    status: "open",
    createdAt: daysAgo(72),
    source: "greenhouse",
    externalId: "gh-1001",
  },
  {
    id: "job-store-manager",
    title: "Store Manager",
    location: "Manchester — Arndale",
    department: "Retail",
    employmentType: "Full-time",
    description:
      "Lead a 12-person team in our Manchester store. Own the customer experience end to end.",
    status: "open",
    createdAt: daysAgo(60),
    source: "greenhouse",
    externalId: "gh-1002",
  },
  {
    id: "job-social",
    title: "Social Media Coordinator",
    location: "Remote — UK",
    department: "Marketing",
    employmentType: "Full-time",
    description:
      "Own our TikTok and Instagram presence. Turn customers into a community.",
    status: "open",
    createdAt: daysAgo(41),
    source: "greenhouse",
    externalId: "gh-1003",
  },
  {
    id: "job-warehouse",
    title: "Fulfilment Associate",
    location: "Leeds — Distribution Centre",
    department: "Operations",
    employmentType: "Full-time",
    description:
      "Pick, pack and dispatch orders that customers love receiving.",
    status: "open",
    createdAt: daysAgo(30),
    source: "lever",
    externalId: "lev-2001",
  },
  {
    id: "job-head-retail",
    title: "Head of Retail",
    location: "London — HQ",
    department: "Leadership",
    employmentType: "Full-time",
    description:
      "Set the strategy for every store and every in-person moment with our customers.",
    status: "closed",
    createdAt: daysAgo(96),
    source: "manual",
  },
];

export const seedIntegrations: Integration[] = [
  {
    provider: "greenhouse",
    status: "connected",
    connectedAt: daysAgo(84),
    lastSyncedAt: daysAgo(0.02),
    rejectionWebhook: true,
  },
  {
    provider: "lever",
    status: "connected",
    connectedAt: daysAgo(26),
    lastSyncedAt: daysAgo(0.05),
    rejectionWebhook: true,
  },
  {
    provider: "workable",
    status: "disconnected",
    rejectionWebhook: false,
  },
];

function buildApplicants(): Applicant[] {
  const out: Applicant[] = [];
  // Distribution of applicants per job — plenty of rejections to make the
  // "999 of 1,000" story tangible in the dashboard.
  const perJob: Record<string, number> = {
    "job-barista": 14,
    "job-store-manager": 11,
    "job-social": 12,
    "job-warehouse": 8,
    "job-head-retail": 7,
  };

  let n = 0;
  for (const job of seedJobs) {
    const count = perJob[job.id] ?? 8;
    for (let i = 0; i < count; i++) {
      n++;
      const name = `${pick(FIRST, n).trim()} ${pick(LAST, n + 3).trim()}`;
      const email = `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`;
      const appliedDays = 8 + ((n * 7) % 70);
      // Reached stage — most drop early, a few reach the end.
      const stageIndex =
        i % 9 === 0 ? 3 : i % 5 === 0 ? 2 : i % 3 === 0 ? 1 : 0;
      const stage = STAGES[stageIndex] as Stage;

      // Roughly 80% of applicants are rejected (the rest are still active).
      const isRejected = i % 5 !== 0 || job.status === "closed";

      const applicant: Applicant = {
        id: `app-${n}`,
        jobId: job.id,
        name,
        email,
        location: pick(CITIES, n + 2),
        stage,
        status: isRejected ? "rejected" : "active",
        appliedAt: daysAgo(appliedDays),
        answer: pick(ANSWERS, n),
      };

      if (isRejected) {
        const sentDays = Math.max(1, appliedDays - 6);
        const opened = n % 10 !== 0; // ~90% open
        const redeemed = opened && n % 3 !== 0; // ~66% of opens redeem
        const purchased = redeemed && n % 4 === 0; // subset convert to purchase
        const shared = opened && n % 6 === 0;
        applicant.rejection = {
          sentAt: daysAgo(sentDays),
          token: `tok-${n}`,
          stageAtRejection: stage,
          rewardId: seedTemplates[stage].rewardId,
          opened,
          openedAt: opened ? daysAgo(sentDays - 0.2) : undefined,
          redeemed,
          redeemedAt: redeemed ? daysAgo(Math.max(0, sentDays - 2)) : undefined,
          shared,
          purchased,
          purchasedAt: purchased ? daysAgo(Math.max(0, sentDays - 3)) : undefined,
          purchaseValue: purchased ? 35 + ((n * 13) % 90) : undefined,
        };
      }

      out.push(applicant);
    }
  }
  return out;
}

export function buildSeed(): AppData {
  return {
    brand: {
      name: "Nova & Co.",
      primaryColor: "#B95F3B",
      senderName: "The Nova & Co. Team",
      replyTo: "careers@novaco.example",
      defaultTone: "warm",
      whiteLabel: false,
      videoRejections: false,
      plan: "growth",
    },
    integrations: seedIntegrations,
    jobs: seedJobs,
    applicants: buildApplicants(),
    rewards: seedRewards,
    templates: seedTemplates,
  };
}
