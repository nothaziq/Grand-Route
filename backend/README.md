# Grand Route — Backend

FastAPI service backing the quote request form. Implements the
`POST /api/v1/quotes` contract from `docs/API.md`. Fleet/Projects
endpoints are not yet implemented — the frontend still uses local mock
data for those.

## What it does

- Validates incoming quote requests with Pydantic (same rules as the
  frontend's Zod schema, so errors should never disagree)
- Persists every request to a database (SQLite by default, Postgres
  via `DATABASE_URL`)
- Emails the office when SMTP is configured (skips silently, without
  failing the request, if it isn't — the submission is still saved)
- Rate-limits the public endpoint (5 requests/minute/IP by default)
- Exposes `GET /api/v1/admin/quotes` behind a shared `ADMIN_API_KEY`
  header (`X-Admin-Key`) so you can check submissions without a DB
  client

## Local development

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # edit as needed — defaults work with no changes
uvicorn app.main:app --reload
```

Visit `http://127.0.0.1:8000/api/v1/docs` for interactive API docs.

With no `.env` changes at all: requests save to a local
`grandroute.db` SQLite file and no emails are sent (logged instead) —
good enough to develop the frontend against.

## Deploying

See the root `docs/DEPLOYMENT.md` (or ask Claude) for step-by-step
Render + Vercel instructions. Quick version:

1. Deploy this `backend/` folder to Render (or Railway/Fly) as a
   Python web service — `render.yaml` in this folder is ready to use.
2. Set the environment variables from `.env.example` in the host's
   dashboard (database, SMTP, CORS origin, admin key).
3. Copy the resulting service URL (e.g.
   `https://grand-route-api.onrender.com`) into the frontend's
   `VITE_API_BASE_URL` environment variable in Vercel, then redeploy
   the frontend.
