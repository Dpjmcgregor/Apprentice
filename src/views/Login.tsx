import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuth, type Role } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ROLES: { value: Role; label: string; hint: string }[] = [
  { value: "brand_admin", label: "Brand admin", hint: "Set up jobs, flows & rewards" },
  { value: "hr_manager", label: "HR manager", hint: "Manage the pipeline" },
];

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("jordan@novaco.example");
  const [role, setRole] = useState<Role>("brand_admin");

  const enter = () => {
    signIn({
      email,
      role,
      name: role === "brand_admin" ? "Jordan Lee" : "Sam Rivera",
    });
    navigate("/app");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <a href="/" className="mb-10 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-semibold text-foreground">
              Cushion
            </span>
          </a>

          <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo workspace, pick a role and step in. No password needed.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              enter();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={cn(
                      "rounded-lg border p-3 text-left transition-colors",
                      role === r.value
                        ? "border-primary bg-primary/[0.05] ring-1 ring-primary"
                        : "hover:border-primary/40"
                    )}
                  >
                    <p className="text-sm font-medium text-foreground">
                      {r.label}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                      {r.hint}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Enter workspace
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Authentication is powered by Clerk in production. This demo uses a
            local session.
          </p>
        </div>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden bg-sidebar lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative flex h-full flex-col justify-center px-12 text-white">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Applicant advocacy, on top of your ATS
          </p>
          <p className="mt-2 max-w-md text-4xl font-bold leading-tight">
            Keep the people who chose your brand.
          </p>
          <p className="mt-4 max-w-md text-slate-300">
            When you reject a candidate in your ATS, Cushion sends a warm,
            on-brand note with a real reward, then reports how many go on to
            buy. Everything here runs on seeded demo data.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-slate-300">
            <li>Plugs into Greenhouse, Lever and Workable</li>
            <li>You set the reward, the tone and the terms</li>
            <li>Reporting built for growth, not just HR</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
