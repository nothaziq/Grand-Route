# Grand Route — Frontend

Production frontend for the Grand Route Transport & General Maintenance website.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · Motion ·
React Hook Form + Zod · Lucide React

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build
npm run lint       # oxlint
```

## Project structure

```
src/
├── components/
│   ├── common/       # Container, Button, SectionHeader, PageHeader, etc.
│   ├── layout/        # Layout, Footer
│   ├── navigation/    # Navbar
│   ├── sections/      # Homepage sections (Hero, CoreCapabilities, ...)
│   ├── services/      # ServicePanel, ServiceGrid
│   ├── fleet/          # FleetCategoryCard
│   └── forms/          # QuoteForm
├── data/               # Centralized, verified business data
├── hooks/              # useSeo
├── lib/
│   ├── api/            # API abstraction (client, quotes, fleet, projects)
│   └── cn.ts
├── pages/              # Route-level page components
├── routes/             # AppRoutes (React Router, lazy-loaded)
└── types/              # Shared TypeScript types
```

## Business data & content policy

All verified company facts live in `src/data/company.ts`, sourced strictly
from the supplied economic licence. `src/data/fleet.ts` and
`src/data/projects.ts` intentionally ship with empty inventories — no
vehicle specs, project names, or client names should be invented. When real
content is available, add it to these files; no other files need to change.

## Connecting a backend

The app currently runs entirely on local mock data (see `src/lib/api/`).
To connect the planned FastAPI backend, set `VITE_API_BASE_URL` in a `.env`
file — each module in `src/lib/api/` automatically switches from its local
mock to a real request against `${VITE_API_BASE_URL}/api/v1/...`.

## Notes

- All imagery is a clearly labeled placeholder (`PlaceholderImage`) pending
  real GRP photography — nothing on the site fabricates fleet or site images.
- `src/data/projects.ts` is empty until the business approves projects for
  publication; the Projects page renders a proper empty state until then.
