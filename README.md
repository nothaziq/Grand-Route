# Grand Route

Production website for Grand Route Transport and General Maintenance
L.L.C - S.P.C, a Musaffah, Abu Dhabi-based transportation, maintenance, and
heavy equipment rental company.

## Structure

```
grand-route/
├── frontend/     # React + Vite + TypeScript site (see frontend/README.md)
├── backend/      # FastAPI service — quote requests (see backend/README.md)
└── docs/         # Source-of-truth project documentation
```

## Status

The frontend is a complete, production-built brochure site covering every
route in `docs/PAGES.md`. The backend is a FastAPI service implementing
`POST /api/v1/quotes` per `docs/API.md` — it validates, persists, and emails
the office on every quote request. Fleet and Projects still run on local
frontend mock data; only the quote form talks to a real backend so far.

Wiring the frontend to the backend is one environment variable
(`VITE_API_BASE_URL`) — see `docs/DEPLOYMENT.md` for the full Render +
Vercel deployment walkthrough.

## Content honesty

Every fact on the site traces back to the supplied UAE economic licence.
No client names, project names, statistics, certifications, or fleet
specifications have been invented — see `docs/CONTENT.md` for the source
facts and `frontend/README.md` for where they live in code.

## Getting started

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (separate terminal)
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

With no `.env` changes, the backend saves quote requests to a local SQLite
file and skips email sending (logs instead) — enough to develop against.

See `frontend/README.md` and `backend/README.md` for full command lists
and project layout, and `docs/DEPLOYMENT.md` for shipping to production.
