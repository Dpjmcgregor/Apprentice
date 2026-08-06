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
  BrandSettings,
  Job,
  RejectionTemplate,
  Reward,
  Stage,
} from "./types";
import { buildSeed } from "./seed";
import { hexToHslString, readableForeground } from "./format";

const STORAGE_KEY = "rdr:data:v1";

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
  // jobs
  addJob: (job: Omit<Job, "id" | "createdAt" | "status"> & { status?: Job["status"] }) => Job;
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
  deleteReward: (id: string) => void;
  // templates
  updateTemplate: (stage: Stage, patch: Partial<RejectionTemplate>) => void;
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

  const addJob = useCallback<StoreContextValue["addJob"]>((job) => {
    const created: Job = {
      id: uid("job"),
      createdAt: nowIso(),
      status: job.status ?? "open",
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

  const rejectApplicant = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      applicants: d.applicants.map((a) =>
        a.id === id && a.status === "active"
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
        set.has(a.id) && a.status === "active"
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

  const deleteReward = useCallback((id: string) => {
    setData((d) => ({ ...d, rewards: d.rewards.filter((r) => r.id !== id) }));
  }, []);

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
      updateTemplate,
      resetDemo,
      getApplicantByToken,
      getReward,
      getJob,
    }),
    [
      data,
      updateBrand,
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
      updateTemplate,
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
