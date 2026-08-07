"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AppData,
  Applicant,
  AtsProvider,
  BrandSettings,
  Job,
  RejectionTemplate,
  Reward,
  Stage,
  WaitlistEntry,
} from "./types";
import { buildSeed } from "./seed";
import { hexToHslString, readableForeground } from "./format";

const STORAGE_KEY = "cushion:data:v4";

function loadData(): AppData {
  if (typeof window === "undefined") return buildSeed();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {
    /* ignore corrupt storage */
  }
  const seed = buildSeed();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  } catch {
    /* ignore */
  }
  return seed;
}

const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const nowIso = () => new Date().toISOString();

interface StoreContextValue {
  data: AppData;
  // brand
  updateBrand: (patch: Partial<BrandSettings>) => void;
  // ATS integrations (v1 is a plugin to the customer's existing ATS)
  connectAts: (provider: AtsProvider) => void;
  disconnectAts: (provider: AtsProvider) => void;
  syncAts: (provider: AtsProvider) => void;
  setRejectionWebhook: (provider: AtsProvider, on: boolean) => void;
  // jobs
  addJob: (
    job: Omit<Job, "id" | "createdAt" | "status" | "source"> & {
      status?: Job["status"];
      source?: Job["source"];
    }
  ) => Job;
  updateJob: (id: string, patch: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  // applicants
  addApplicant: (
    input: Omit<Applicant, "id" | "appliedAt" | "status" | "stage" | "rejection"> & {
      stage?: Stage;
    }
  ) => Applicant;
  updateApplicantStage: (id: string, stage: Stage) => void;
  rejectApplicant: (id: string) => void;
  rejectMany: (ids: string[]) => void;
  restoreApplicant: (id: string) => void;
  // applicant-facing tracking (public rejection page)
  markOpened: (token: string) => void;
  markRedeemed: (token: string) => void;
  markShared: (token: string) => void;
  simulatePurchase: (token: string, value?: number) => void;
  // rewards
  addReward: (reward: Omit<Reward, "id">) => Reward;
  updateReward: (id: string, patch: Partial<Reward>) => void;
  // Returns false (and leaves the reward in place) if it is still referenced by
  // a template or by an already-sent rejection.
  deleteReward: (id: string) => boolean;
  isRewardReferenced: (id: string) => boolean;
  // templates
  updateTemplate: (stage: Stage, patch: Partial<RejectionTemplate>) => void;
  // waitlist (public site)
  joinWaitlist: (input: {
    email: string;
    name?: string;
    company?: string;
    source: string;
  }) => WaitlistEntry;
  // demo controls
  resetDemo: () => void;
  // lookups
  getApplicantByToken: (token: string) => Applicant | undefined;
  getReward: (id?: string) => Reward | undefined;
  getJob: (id?: string) => Job | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData);

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [data]);

  // Apply the brand colour to the CSS custom properties that drive shadcn.
  useEffect(() => {
    const root = document.documentElement;
    const hsl = hexToHslString(data.brand.primaryColor);
    root.style.setProperty("--primary", hsl);
    root.style.setProperty("--ring", hsl);
    root.style.setProperty(
      "--primary-foreground",
      readableForeground(data.brand.primaryColor)
    );
  }, [data.brand.primaryColor]);

  const updateBrand = useCallback((patch: Partial<BrandSettings>) => {
    setData((d) => ({ ...d, brand: { ...d.brand, ...patch } }));
  }, []);

  const patchIntegration = (
    provider: AtsProvider,
    patch: (i: AppData["integrations"][number]) => AppData["integrations"][number]
  ) => {
    setData((d) => ({
      ...d,
      integrations: d.integrations.map((i) =>
        i.provider === provider ? patch(i) : i
      ),
    }));
  };

  const connectAts = useCallback((provider: AtsProvider) => {
    patchIntegration(provider, (i) => ({
      ...i,
      status: "connected",
      connectedAt: nowIso(),
      lastSyncedAt: nowIso(),
      rejectionWebhook: true,
    }));
  }, []);

  const disconnectAts = useCallback((provider: AtsProvider) => {
    patchIntegration(provider, (i) => ({
      ...i,
      status: "disconnected",
      rejectionWebhook: false,
    }));
  }, []);

  const syncAts = useCallback((provider: AtsProvider) => {
    patchIntegration(provider, (i) => ({ ...i, lastSyncedAt: nowIso() }));
  }, []);

  const setRejectionWebhook = useCallback(
    (provider: AtsProvider, on: boolean) => {
      patchIntegration(provider, (i) => ({ ...i, rejectionWebhook: on }));
    },
    []
  );

  const addJob = useCallback<StoreContextValue["addJob"]>((job) => {
    const created: Job = {
      id: uid("job"),
      createdAt: nowIso(),
      status: job.status ?? "open",
      source: job.source ?? "manual",
      title: job.title,
      location: job.location,
      department: job.department,
      employmentType: job.employmentType,
      description: job.description,
    };
    setData((d) => ({ ...d, jobs: [created, ...d.jobs] }));
    return created;
  }, []);

  const updateJob = useCallback((id: string, patch: Partial<Job>) => {
    setData((d) => ({
      ...d,
      jobs: d.jobs.map((j) => (j.id === id ? { ...j, ...patch } : j)),
    }));
  }, []);

  const deleteJob = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      jobs: d.jobs.filter((j) => j.id !== id),
      applicants: d.applicants.filter((a) => a.jobId !== id),
    }));
  }, []);

  const addApplicant = useCallback<StoreContextValue["addApplicant"]>((input) => {
    const created: Applicant = {
      id: uid("app"),
      jobId: input.jobId,
      name: input.name,
      email: input.email,
      location: input.location,
      answer: input.answer,
      stage: input.stage ?? "applied",
      status: "active",
      appliedAt: nowIso(),
    };
    setData((d) => ({ ...d, applicants: [created, ...d.applicants] }));
    return created;
  }, []);

  const updateApplicantStage = useCallback((id: string, stage: Stage) => {
    setData((d) => ({
      ...d,
      applicants: d.applicants.map((a) =>
        a.id === id ? { ...a, stage } : a
      ),
    }));
  }, []);

  const buildRejection = (applicant: Applicant, templates: Record<Stage, RejectionTemplate>) => {
    const template = templates[applicant.stage];
    return {
      ...applicant,
      status: "rejected" as const,
      rejection: {
        sentAt: nowIso(),
        token: uid("tok"),
        stageAtRejection: applicant.stage,
        rewardId: template.rewardId,
        opened: false,
        redeemed: false,
        shared: false,
        purchased: false,
      },
    };
  };

  // A stage can only be rejected when its template is switched on.
  const canReject = (a: Applicant, templates: Record<Stage, RejectionTemplate>) =>
    a.status === "active" && templates[a.stage].enabled;

  const rejectApplicant = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      applicants: d.applicants.map((a) =>
        a.id === id && canReject(a, d.templates)
          ? buildRejection(a, d.templates)
          : a
      ),
    }));
  }, []);

  const rejectMany = useCallback((ids: string[]) => {
    const set = new Set(ids);
    setData((d) => ({
      ...d,
      applicants: d.applicants.map((a) =>
        set.has(a.id) && canReject(a, d.templates)
          ? buildRejection(a, d.templates)
          : a
      ),
    }));
  }, []);

  const restoreApplicant = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      applicants: d.applicants.map((a) =>
        a.id === id ? { ...a, status: "active", rejection: undefined } : a
      ),
    }));
  }, []);

  const patchRejection = (
    token: string,
    patch: (r: NonNullable<Applicant["rejection"]>) => NonNullable<Applicant["rejection"]>
  ) => {
    setData((d) => ({
      ...d,
      applicants: d.applicants.map((a) =>
        a.rejection?.token === token
          ? { ...a, rejection: patch(a.rejection) }
          : a
      ),
    }));
  };

  const markOpened = useCallback((token: string) => {
    patchRejection(token, (r) =>
      r.opened ? r : { ...r, opened: true, openedAt: nowIso() }
    );
  }, []);

  const markRedeemed = useCallback((token: string) => {
    patchRejection(token, (r) =>
      r.redeemed
        ? r
        : { ...r, opened: true, redeemed: true, redeemedAt: nowIso() }
    );
  }, []);

  const markShared = useCallback((token: string) => {
    patchRejection(token, (r) => ({ ...r, shared: true }));
  }, []);

  const simulatePurchase = useCallback((token: string, value = 48) => {
    patchRejection(token, (r) => ({
      ...r,
      purchased: true,
      purchasedAt: nowIso(),
      purchaseValue: r.purchaseValue ?? value,
    }));
  }, []);

  const addReward = useCallback<StoreContextValue["addReward"]>((reward) => {
    const created: Reward = { ...reward, id: uid("r") };
    setData((d) => ({ ...d, rewards: [...d.rewards, created] }));
    return created;
  }, []);

  const updateReward = useCallback((id: string, patch: Partial<Reward>) => {
    setData((d) => ({
      ...d,
      rewards: d.rewards.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  }, []);

  const isRewardReferenced = useCallback(
    (id: string) =>
      Object.values(data.templates).some((t) => t.rewardId === id) ||
      data.applicants.some((a) => a.rejection?.rewardId === id),
    [data.templates, data.applicants]
  );

  const deleteReward = useCallback(
    (id: string) => {
      const referenced =
        Object.values(data.templates).some((t) => t.rewardId === id) ||
        data.applicants.some((a) => a.rejection?.rewardId === id);
      if (referenced) return false;
      setData((d) => ({ ...d, rewards: d.rewards.filter((r) => r.id !== id) }));
      return true;
    },
    [data.templates, data.applicants]
  );

  const updateTemplate = useCallback(
    (stage: Stage, patch: Partial<RejectionTemplate>) => {
      setData((d) => ({
        ...d,
        templates: {
          ...d.templates,
          [stage]: { ...d.templates[stage], ...patch },
        },
      }));
    },
    []
  );

  const joinWaitlist = useCallback<StoreContextValue["joinWaitlist"]>(
    (input) => {
      const entry: WaitlistEntry = {
        id: uid("wl"),
        email: input.email.trim(),
        name: input.name?.trim() || undefined,
        company: input.company?.trim() || undefined,
        createdAt: nowIso(),
        source: input.source,
      };
      setData((d) => {
        const list = d.waitlist ?? [];
        // De-dupe by email — a repeat signup just refreshes the timestamp.
        const existing = list.find(
          (w) => w.email.toLowerCase() === entry.email.toLowerCase()
        );
        if (existing) {
          return {
            ...d,
            waitlist: list.map((w) =>
              w.id === existing.id ? { ...w, ...entry, id: existing.id } : w
            ),
          };
        }
        return { ...d, waitlist: [entry, ...list] };
      });
      return entry;
    },
    []
  );

  const resetDemo = useCallback(() => {
    const seed = buildSeed();
    setData(seed);
  }, []);

  const getApplicantByToken = useCallback(
    (token: string) => data.applicants.find((a) => a.rejection?.token === token),
    [data.applicants]
  );
  const getReward = useCallback(
    (id?: string) => data.rewards.find((r) => r.id === id),
    [data.rewards]
  );
  const getJob = useCallback(
    (id?: string) => data.jobs.find((j) => j.id === id),
    [data.jobs]
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      data,
      updateBrand,
      connectAts,
      disconnectAts,
      syncAts,
      setRejectionWebhook,
      addJob,
      updateJob,
      deleteJob,
      addApplicant,
      updateApplicantStage,
      rejectApplicant,
      rejectMany,
      restoreApplicant,
      markOpened,
      markRedeemed,
      markShared,
      simulatePurchase,
      addReward,
      updateReward,
      deleteReward,
      isRewardReferenced,
      updateTemplate,
      joinWaitlist,
      resetDemo,
      getApplicantByToken,
      getReward,
      getJob,
    }),
    [
      data,
      updateBrand,
      connectAts,
      disconnectAts,
      syncAts,
      setRejectionWebhook,
      addJob,
      updateJob,
      deleteJob,
      addApplicant,
      updateApplicantStage,
      rejectApplicant,
      rejectMany,
      restoreApplicant,
      markOpened,
      markRedeemed,
      markShared,
      simulatePurchase,
      addReward,
      updateReward,
      deleteReward,
      isRewardReferenced,
      updateTemplate,
      joinWaitlist,
      resetDemo,
      getApplicantByToken,
      getReward,
      getJob,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
