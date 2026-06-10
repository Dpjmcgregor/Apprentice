# The Apprentice Pledge

A UK movement of founders, leaders, and employers committing to hire, train, and
develop at least one apprentice in the next 12 months. A sister initiative of
[Another Avenue](https://another-avenue.co.uk/).

> 957,000 young people in the UK are NEET. One apprentice. One year. That's the pledge.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/) for the unemployment data visualisations

## Getting started

Requires Node.js & npm.

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint
```

## Project structure

```
src/
  components/        # Page sections (Hero, StatsSection, PledgeForm, …)
    ui/              # shadcn/ui primitives
  pages/             # Routed pages (Index, Blog, BlogPost, Unemployment, ThankYou, NotFound)
  data/posts.ts      # Blog content
  index.css          # Design tokens (dark theme, lime accent)
tailwind.config.ts   # Theme, fonts, animations
```

## Routes

| Path             | Page                                   |
| ---------------- | -------------------------------------- |
| `/`              | Landing page + pledge form             |
| `/blog`          | Blog index                             |
| `/blog/:slug`    | Individual blog post                   |
| `/unemployment`  | UK youth unemployment data, visualised |
| `/thank-you`     | Post-pledge confirmation               |
