"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/format";

// An honest, interactive estimate driven entirely by the visitor's own numbers
//, no invented averages. "Your numbers, not ours."
export function RejectionCalculator() {
  const [applicants, setApplicants] = useState(5000);
  const [rejectRate, setRejectRate] = useState(92); // % of applicants rejected
  const [redemption, setRedemption] = useState(20); // % of rejected who redeem
  const [aov, setAov] = useState(45); // average order value £

  const { rejected, redemptions, revenue } = useMemo(() => {
    const rejected = Math.round((applicants * rejectRate) / 100);
    const redemptions = Math.round((rejected * redemption) / 100);
    const revenue = redemptions * aov;
    return { rejected, redemptions, revenue };
  }, [applicants, rejectRate, redemption, aov]);

  return (
    <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-4">
        <NumberField
          label="Applicants a year"
          value={applicants}
          onChange={setApplicants}
          step={100}
          min={0}
        />
        <RangeField
          label="Share you reject"
          suffix="%"
          value={rejectRate}
          onChange={setRejectRate}
          min={50}
          max={100}
        />
        <RangeField
          label="Reward redemption"
          suffix="%"
          value={redemption}
          onChange={setRedemption}
          min={0}
          max={60}
          hint="How many rejected applicants use their reward"
        />
        <NumberField
          label="Average order value"
          value={aov}
          onChange={setAov}
          step={5}
          min={0}
          prefix="£"
        />
      </div>

      {/* Outputs */}
      <div className="flex flex-col justify-center gap-3">
        <Output
          label="Warm audience you reject a year"
          value={formatNumber(rejected)}
        />
        <Output
          label="Estimated reward redemptions"
          value={formatNumber(redemptions)}
        />
        <Output
          label="Estimated influenced revenue"
          value={formatCurrency(revenue)}
          accent
        />
        <p className="mt-1 text-xs text-slate-400">
          An estimate from your own inputs, not an industry average. Nothing is
          sent anywhere.
        </p>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  min,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </span>
      <div className="flex items-center rounded-lg border border-white/15 bg-white/5 px-3 focus-within:border-primary">
        {prefix && <span className="text-slate-400">{prefix}</span>}
        <input
          type="number"
          inputMode="numeric"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(min ?? 0, Number(e.target.value) || 0))}
          className="w-full bg-transparent py-2.5 text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </label>
  );
}

function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-sm font-medium text-slate-200">
        {label}
        <span className="tabular-nums text-primary">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function Output({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border px-4 py-3 " +
        (accent
          ? "border-primary/40 bg-primary/10"
          : "border-white/10 bg-white/[0.03]")
      }
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className={
          "mt-0.5 text-2xl font-bold " + (accent ? "text-primary" : "text-white")
        }
      >
        {value}
      </p>
    </div>
  );
}
