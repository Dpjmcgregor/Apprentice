import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import { AppLayout } from "@/components/app/AppLayout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import RejectionExperience from "./pages/RejectionExperience";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/app/Dashboard";
import Jobs from "./pages/app/Jobs";
import JobDetail from "./pages/app/JobDetail";
import Applicants from "./pages/app/Applicants";
import RejectionBuilder from "./pages/app/RejectionBuilder";
import Rewards from "./pages/app/Rewards";
import Reports from "./pages/app/Reports";
import Settings from "./pages/app/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/apply/:jobId" element={<Apply />} />
              <Route path="/r/:token" element={<RejectionExperience />} />

              {/* Authenticated workspace */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:jobId" element={<JobDetail />} />
                <Route path="applicants" element={<Applicants />} />
                <Route path="rejections" element={<RejectionBuilder />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </StoreProvider>
  </QueryClientProvider>
);

export default App;
