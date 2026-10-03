"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WAITLIST_JOINED_KEY = "cushion:waitlist:joined:v1";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function hasJoinedWaitlist(): boolean {
  try {
    return window.localStorage.getItem(WAITLIST_JOINED_KEY) === "1";
  } catch {
    return false;
  }
}

// Shared waitlist capture form. Rendered on a light surface (card / modal), so
// the tokened inputs stay legible on both the light page and the dark hero.
export function WaitlistForm({
  source,
  onJoined,
  autoFocus,
}: {
  source: string;
  onJoined?: (email: string) => void;
  autoFocus?: boolean;
}) {
  const { joinWaitlist } = useStore();
  const [form, setForm] = useState({ email: "", name: "", company: "" });
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid work email.");
      return;
    }

    setSubmitting(true);
    setError("");

    // Persist to Supabase via the route handler. The server degrades to
    // { ok: true, persisted: false } when Supabase isn't configured, so a
    // preview without env vars still behaves like the local demo.
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
    } catch {
      setError("Couldn't reach the server. Please try again.");
      return;
    } finally {
      setSubmitting(false);
    }

    // Keep a local copy so the live count and the demo workspace stay in sync.
    joinWaitlist({ ...form, source });
    try {
      window.localStorage.setItem(WAITLIST_JOINED_KEY, "1");
    } catch {
      /* ignore */
    }
    setJoined(true);
    onJoined?.(form.email.trim());
    toast.success("You're on the list 🎉", {
      description: "We'll email you the moment Cushion opens up.",
    });
  };

  if (joined) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div>
          <p className="text-lg font-semibold text-foreground">
            You're on the list
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}, we'll be in
            touch at <span className="font-medium">{form.email}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="wl-name" className="text-xs">
            Name <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="wl-name"
            placeholder="Jordan Lee"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="wl-company" className="text-xs">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="wl-company"
            placeholder="Nova & Co."
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="wl-email" className="text-xs">
          Work email
        </Label>
        <Input
          id="wl-email"
          type="email"
          autoFocus={autoFocus}
          placeholder="you@yourbrand.com"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            if (error) setError("");
          }}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Joining…" : "Join the waitlist"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-[11px] text-muted-foreground">
        No spam, just one email when we launch.
      </p>
    </form>
  );
}
