"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "@/components/app/AppLayout";

import Login from "@/views/Login";
import Apply from "@/views/Apply";
import RejectionExperience from "@/views/RejectionExperience";
import NotFound from "@/views/NotFound";

import Dashboard from "@/views/app/Dashboard";
import Jobs from "@/views/app/Jobs";
import JobDetail from "@/views/app/JobDetail";
import Applicants from "@/views/app/Applicants";
import Integrations from "@/views/app/Integrations";
import RejectionBuilder from "@/views/app/RejectionBuilder";
import Rewards from "@/views/app/Rewards";
import Reports from "@/views/app/Reports";
import Settings from "@/views/app/Settings";

// The client-side router for everything except "/". The marketing homepage is
// served by Next as a Server Component at app/page.tsx; this app is mounted by
// the [...rest] catch-all for every other path. Shared providers (store, auth,
// query, tooltips, toasts) live in the root layout, so they wrap both.
export default function SpaApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/r/:token" element={<RejectionExperience />} />

        {/* Authenticated workspace */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:jobId" element={<JobDetail />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="rejections" element={<RejectionBuilder />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
