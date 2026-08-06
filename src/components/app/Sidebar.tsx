import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Wand2,
  Gift,
  BarChart3,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { BrandLogo } from "./BrandLogo";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/jobs", label: "Jobs", icon: Briefcase },
  { to: "/app/applicants", label: "Applicants", icon: Users },
  { to: "/app/rejections", label: "Rejection flows", icon: Wand2 },
  { to: "/app/rewards", label: "Rewards", icon: Gift },
  { to: "/app/reports", label: "Reports", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { data } = useStore();
  const { user, signOut } = useAuth();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Product brand */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-base font-semibold text-white">Cushion</p>
          <p className="-mt-0.5 text-[11px] font-medium text-sidebar-muted">
            Applicant advocacy
          </p>
        </div>
      </div>

      {/* Active brand account */}
      <div className="mx-3 mb-2 flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-2.5">
        <BrandLogo name={data.brand.name} className="h-9 w-9 shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {data.brand.name}
          </p>
          <p className="truncate text-xs capitalize text-sidebar-muted">
            {data.brand.plan} plan
          </p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-white">
            {user?.name
              .split(" ")
              .map((w) => w[0])
              .join("") || "?"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.name}
            </p>
            <p className="truncate text-xs capitalize text-sidebar-muted">
              {user?.role.replace("_", " ")}
            </p>
          </div>
          <button
            onClick={signOut}
            title="Sign out"
            className="rounded-md p-1.5 text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
