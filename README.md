# Grand Route

Production website for Grand Route Transport and General Maintenance
L.L.C - S.P.C, a Musaffah, Abu Dhabi-based transportation, maintenance, and
heavy equipment rental company.

## Structure

```
grand-route/
├── frontend/     # React + Vite + TypeScript site (see frontend/README.md)
├── backend/      # Reserved for the future FastAPI service (not yet built)
└── docs/         # Source-of-truth project documentation
```

## Status

The frontend is a complete, production-built brochure site covering every
route in `docs/PAGES.md`, running on local typed data. No backend exists
yet — the frontend's `src/lib/api/` layer is structured so a FastAPI
service can be dropped in later by setting one environment variable
(`VITE_API_BASE_URL`), per `docs/API.md` and `docs/ARCHITECTURE.md`.

## Content honesty

Every fact on the site traces back to the supplied UAE economic licence.
No client names, project names, statistics, certifications, or fleet
specifications have been invented — see `docs/CONTENT.md` for the source
facts and `frontend/README.md` for where they live in code.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

See `frontend/README.md` for the full command list and project layout.
