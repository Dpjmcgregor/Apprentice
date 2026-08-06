import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/app/BrandLogo";

export default function Apply() {
  const { jobId } = useParams();
  const { data, getJob, addApplicant } = useStore();
  const job = getJob(jobId);
  const brand = data.brand;

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    answer: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!job || job.status !== "open") {
    return (
      <Shell brand={brand.name}>
        <Card>
          <CardContent className="p-10 text-center">
            <p className="text-lg font-semibold text-foreground">
              This role isn't available
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              The link may have expired or the position has closed.
            </p>
          </CardContent>
        </Card>
      </Shell>
    );
  }

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and email.");
      return;
    }
    addApplicant({ jobId: job.id, ...form });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Shell brand={brand.name}>
        <Card>
          <CardContent className="flex flex-col items-center p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h1 className="mt-5 text-xl font-bold text-foreground">
              Application received
            </h1>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Thank you, {form.name.split(" ")[0]}. The {brand.name} team has
              your application for <strong>{job.title}</strong>. Whatever the
              outcome, you'll hear from us — properly.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/">Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </Shell>
    );
  }

  return (
    <Shell brand={brand.name}>
      <Card>
        <div
          className="flex items-center gap-3 rounded-t-xl px-6 py-5 text-primary-foreground"
          style={{ background: brand.primaryColor }}
        >
          <BrandLogo
            name={brand.name}
            onBrand={false}
            className="h-11 w-11 bg-white/20 text-white"
          />
          <div>
            <p className="font-display text-lg font-bold">{brand.name}</p>
            <p className="text-sm opacity-85">is hiring</p>
          </div>
        </div>
        <CardContent className="space-y-6 p-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">{job.title}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location || "Remote"}
              </span>
              <span>·</span>
              <span>{job.employmentType}</span>
            </p>
            {job.description && (
              <p className="mt-3 text-sm text-muted-foreground">
                {job.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Why do you want to work with us?</Label>
              <Textarea
                id="answer"
                rows={4}
                placeholder="Tell us in a sentence or two…"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button className="w-full" onClick={submit}>
              Submit application
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By applying you agree to hear back from {brand.name}.
            </p>
          </div>
        </CardContent>
      </Card>
    </Shell>
  );
}

function Shell({
  brand,
  children,
}: {
  brand: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="mx-auto max-w-lg px-4 py-10 sm:py-16">
        {children}
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          {brand} · Powered by Cushion
        </p>
      </div>
    </div>
  );
}
