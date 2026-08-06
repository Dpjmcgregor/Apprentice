# Rejection Done Right

**Turn job rejections into brand advocacy.** For every 1,000 applicants, 999 get
rejected — and most get a generic email or nothing at all. Those are people who
_chose your brand_. Rejection Done Right sends every unsuccessful applicant a
personalised, on-brand rejection with an exclusive reward, then measures how many
of them go on to become paying customers.

Positioned as a **CRM and growth tool**, not an HR one. The metric that sells it:
_what percentage of your rejected applicants became paying customers?_

## What's in this build (MVP)

This is a fully interactive front-end MVP. It runs entirely in the browser and
persists to `localStorage`, standing in for the Node/Postgres backend described
in the product brief — so you can click through the whole product with realistic
seeded data.

| Area | What you can do |
| --- | --- |
| **Dashboard** | Key advocacy metrics front and centre — applications, rejections, open & redemption rates, rejected-to-customer conversion, revenue influenced, plus trend, funnel and by-stage charts (Recharts). |
| **Jobs** | Create roles and get a shareable public application link (no ATS required). |
| **Applicants** | The pipeline. Move candidates through stages, then reject one-by-one or in bulk — each gets the reward matched to their stage. |
| **Rejection flow builder** | Personalise the rejection by name/role, pick a tone, insert variables, attach a reward, and see a live mobile-responsive email preview. Segmented per stage reached. |
| **Reward engine** | Manage discount / free-product / early-access rewards with per-reward redemption tracking. |
| **Reports** | A monthly, printable brand report framed for marketing & finance. |
| **Settings** | Brand-colour customisation (drives the whole theme live), sender identity, tone, plan, plus premium white-label & video toggles. |
| **Applicant experience** | Login-free public pages: the application form (`/apply/:jobId`) and the rejection experience (`/r/:token`) where applicants reveal & redeem their reward — which feeds the advocacy tracking live. |

### Routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Marketing landing page | Public |
| `/login` | Sign in (mock Clerk session) | Public |
| `/apply/:jobId` | Application form | Public, no login |
| `/r/:token` | Rejection experience + reward redemption | Public, no login |
| `/app` | Dashboard | Signed in |
| `/app/jobs`, `/app/jobs/:jobId` | Jobs & job detail | Signed in |
| `/app/applicants` | Pipeline & rejection triggering | Signed in |
| `/app/rejections` | Rejection flow builder | Signed in |
| `/app/rewards` | Reward engine | Signed in |
| `/app/reports` | Brand report | Signed in |
| `/app/settings` | Brand settings | Signed in |

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/) for routing
- [Recharts](https://recharts.org/) for the advocacy dashboard
- Client-side store (`src/lib/store.tsx`) persisting to `localStorage`

The product brief also specifies Node.js + PostgreSQL, Postmark/SendGrid for
email, a voucher partner (Voucherify / Tremendous) for rewards, and Clerk for
auth. Those integration points are stubbed behind the store and a mock auth
context so the full experience is demonstrable; swapping each for the real
service is the v2 backend work.

## Getting started

Requires Node.js & npm.

```sh
npm install       # install dependencies
npm run dev       # dev server (http://localhost:8080)
npm run build     # production build
npm run preview   # preview the build
npm run lint      # lint
```

## Project structure

```
src/
  components/
    app/           # Shell + product components (Sidebar, MetricCard, RejectionEmail, charts…)
    ui/            # shadcn/ui primitives
  lib/
    types.ts       # Domain model
    store.tsx      # localStorage-backed data store + mutations
    auth.tsx       # Mock auth (stand-in for Clerk)
    seed.ts        # Seeded demo data
    metrics.ts     # Dashboard/report metric calculations
    format.ts      # Formatters, hex→HSL brand colour, template rendering
  pages/
    Landing, Login, Apply, RejectionExperience, NotFound
    app/           # Dashboard, Jobs, JobDetail, Applicants, RejectionBuilder, Rewards, Reports, Settings
  index.css        # Design tokens (light surface, dark sidebar, brand colour var)
```

## Notes

- **Brand colour** set in Settings updates the CSS custom properties at runtime,
  re-theming the whole app and every email preview live.
- **Reset demo data** in Settings restores the seeded dataset at any time.
- Deployed as a static SPA (see `vercel.json` for the client-routing rewrite).
