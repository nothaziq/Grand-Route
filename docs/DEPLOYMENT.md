# Deployment Guide

Two services, deployed separately:

- **Frontend** (`frontend/`) → Vercel
- **Backend** (`backend/`) → Render (or Railway/Fly — anywhere that
  runs a persistent Python process; Vercel's serverless model doesn't
  suit a stateful FastAPI + SQLite/Postgres service well)

## 1. Deploy the backend first

1. Push this repo to GitHub (if not already).
2. On [render.com](https://render.com), **New → Web Service**, connect
   the repo, set **Root Directory** to `backend`.
3. Render should detect `render.yaml` and pre-fill build/start
   commands. If not, set manually:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add a free **Postgres** instance on Render (New → PostgreSQL),
   then copy its **Internal Connection String** into the web service's
   `DATABASE_URL` env var, prefixed as
   `postgresql+psycopg://...` and add `psycopg[binary]` to
   `requirements.txt` (uncomment the line already there).
   - Skipping this step is fine to start — the service falls back to
     a local SQLite file, but Render's free tier has an ephemeral
     filesystem, so that data won't survive a redeploy. Use Postgres
     for anything you want to keep.
5. Set the remaining environment variables (see
   `backend/.env.example`):
   - `CORS_ORIGINS` — leave as `http://localhost:5173` for now; update
     once you have the Vercel URL (step 2.4 below), then redeploy.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`,
     `NOTIFY_EMAIL`, `FROM_EMAIL` — for Gmail, generate an [App
     Password](https://myaccount.google.com/apppasswords) for
     `simpletyping.ae@gmail.com` and use that as `SMTP_PASSWORD`
     (your normal Gmail password won't work).
   - `ADMIN_API_KEY` — any long random string, so you can check
     submissions at `GET /api/v1/admin/quotes` with header
     `X-Admin-Key: <that string>`.
6. Deploy. Note the resulting URL, e.g.
   `https://grand-route-api.onrender.com`.
7. Sanity check: visit
   `https://grand-route-api.onrender.com/api/v1/health` — should
   return `{"status":"ok"}`.

Free-tier note: Render's free web services spin down after inactivity
and take ~30-60s to wake on the next request. The quote form will feel
slow on the first submission after idle time. Upgrade to a paid
instance before real launch if that's not acceptable.

## 2. Deploy the frontend

1. On [vercel.com/new](https://vercel.com/new), import the repo.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite (auto-detected). Build/output defaults are
   fine (`npm run build` / `dist`).
4. Add one environment variable:
   - `VITE_API_BASE_URL` = the Render URL from step 1.6, e.g.
     `https://grand-route-api.onrender.com`
5. Deploy.

## 3. Close the loop

Go back to the Render service and update `CORS_ORIGINS` to include the
real Vercel URL (e.g. `https://grand-route.vercel.app`), then redeploy
the backend so it actually accepts requests from the live frontend.

## 4. Verify

1. Open the live site's `/request-quote` page.
2. Submit a test request.
3. Check it arrived by either:
   - The notification email (if SMTP is configured), or
   - `curl -H "X-Admin-Key: <your key>" https://grand-route-api.onrender.com/api/v1/admin/quotes`

If it shows up, the form is live end-to-end.
