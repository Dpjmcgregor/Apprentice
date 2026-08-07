# Cushion

**Turn job rejections into brand advocacy.** Most rejected applicants get a
generic email or nothing at all — yet they are people who _chose your brand_.
Cushion sends every unsuccessful applicant a personalised, on-brand rejection
with an exclusive reward, then measures how many of them go on to become paying
customers.

Positioned as a **CRM and growth tool**, not an HR one. The metric that sells it:
_what percentage of your rejected applicants became paying customers?_

**v1 is a plugin to your existing ATS, not a replacement.** Cushion connects to
Greenhouse, Lever or Workable, syncs your roles and candidates, and listens for
rejection events — when a candidate is rejected in your ATS, Cushion
automatically sends the on-brand rejection and reward. A lightweight standalone
path (a Cushion-hosted job + application form) is available for roles that live
outside an ATS.

## What's in this build (MVP)

This is a fully interactive front-end MVP. It runs entirely in the browser and
persists to `localStorage`, standing in for the Node/Postgres backend described
in the product brief — so you can click through the whole product with realistic
seeded data.

| Area | What you can do |
| --- | --- |
| **Integrations** | Connect Greenhouse / Lever / Workable, sync jobs & candidates, and toggle the rejection webhook that triggers advocacy sends automatically. The heart of the plugin model. |
| **Dashboard** | Key advocacy metrics front and centre — applications, rejections, open & redemption rates, rejected-to-customer conversion, revenue influenced, plus trend, funnel and by-stage charts (Recharts). |
| **Jobs** | Roles synced from your ATS (source-tagged), plus manual Cushion-hosted roles with a shareable application link for anything outside your ATS. |
| **Applicants** | The synced pipeline. Move candidates through stages, then reject one-by-one or in bulk — each gets the reward matched to their stage. |
| **Rejection flow builder** | Personalise the rejection by name/role, pick a tone, insert variables, attach a reward, and see a live mobile-responsive email preview. Segmented per stage reached. |
| **Reward engine** | Manage discount / free-product / early-access rewards with per-reward redemption tracking. |
| **Reports** | A monthly, printable brand report framed for marketing & finance. |
| **Settings** | Brand-colour customisation (drives the whole theme live), sender identity, tone, plan, plus premium white-label & video toggles. |
| **Applicant experience** | Login-free public pages: the application form (`/apply/:jobId`) and the rejection experience (`/r/:token`) where applicants reveal & redeem their reward — which feeds the advocacy tracking live. |

### Routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Marketing homepage — server-rendered by Next (static HTML) | Public |
| `/login` | Sign in (mock Clerk session) | Public |
| `/apply/:jobId` | Application form | Public, no login |
| `/r/:token` | Rejection experience + reward redemption | Public, no login |
| `/app` | Dashboard | Signed in |
| `/app/integrations` | ATS connections (Greenhouse / Lever / Workable) | Signed in |
| `/app/jobs`, `/app/jobs/:jobId` | Jobs & job detail | Signed in |
| `/app/applicants` | Pipeline & rejection triggering | Signed in |
| `/app/rejections` | Rejection flow builder | Signed in |
| `/app/rewards` | Reward engine | Signed in |
| `/app/reports` | Brand report | Signed in |
| `/app/settings` | Brand settings | Signed in |

## Tech stack

- [Next.js](https://nextjs.org/) App Router + [React 18](https://react.dev/) + TypeScript
- The **marketing homepage (`/`) is a Server Component** — all of its copy is
  rendered to static HTML in the initial response, and page metadata (title,
  description, Open Graph) is emitted via the Next Metadata API. This keeps the
  page fully crawlable by search engines, LLM crawlers and link unfurlers.
- Everything else (sign in, the applicant flows, the authenticated workspace)
  runs as a **client-side SPA on [React Router](https://reactrouter.com/)**,
  mounted by a catch-all route and loaded with `ssr: false`.
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/) for the advocacy dashboard
- Client-side store (`src/lib/store.tsx`) persisting to `localStorage`

The product brief also specifies Node.js + PostgreSQL, Postmark/SendGrid for
email, a voucher partner (Voucherify / Tremendous) for rewards, Clerk for auth,
and ATS integrations (Greenhouse / Lever / Workable). Those integration points —
including the ATS sync and the rejection webhook that fires the advocacy send —
are modelled in the client store so the full plugin experience is demonstrable;
wiring each to the real provider APIs and webhooks is the v2 backend work.

## Getting started

Requires Node.js & npm.

```sh
npm install       # install dependencies
npm run dev       # Next dev server (http://localhost:3000)
npm run build     # production build
npm run start     # serve the production build
npm run lint      # lint
```

## Project structure

```
app/
  layout.tsx       # Root layout + Metadata API (title/description/Open Graph) + client providers
  page.tsx         # Marketing homepage — Server Component, static-rendered copy
  providers.tsx    # Client providers (query, store, auth, tooltips, toasts)
  [...rest]/       # Catch-all that mounts the client SPA for every non-"/" path
src/
  spa/SpaApp.tsx   # React Router app (login, applicant flows, workspace), ssr:false
  components/
    app/           # Shell + product components (Sidebar, MetricCard, RejectionEmail, charts…)
    waitlist/      # Waitlist form, prompt & live count (client)
    ui/            # shadcn/ui primitives
  lib/
    types.ts       # Domain model
    store.tsx      # localStorage-backed data store + mutations
    auth.tsx       # Mock auth (stand-in for Clerk)
    seed.ts        # Seeded demo data
    metrics.ts     # Dashboard/report metric calculations
    format.ts      # Formatters, hex→HSL brand colour, template rendering
  pages/
    Login, Apply, RejectionExperience, NotFound
    app/           # Dashboard, Jobs, JobDetail, Applicants, RejectionBuilder, Rewards, Reports, Settings
  index.css        # Design tokens (light surface, dark sidebar, brand colour var)
```

## Notes

- **Brand colour** set in Settings updates the CSS custom properties at runtime,
  re-theming the whole app and every email preview live.
- **Reset demo data** in Settings restores the seeded dataset at any time.
- Deployed on Vercel as a Next.js app: the homepage is server-rendered for
  crawlability, the rest hydrates as a client SPA.
