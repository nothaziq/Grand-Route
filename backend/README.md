# Grand Route — Backend (planned)

Not yet implemented. Per `docs/API.md` and `docs/ARCHITECTURE.md`, this is
reserved for a future FastAPI + PostgreSQL service exposing:

- `POST /api/v1/quotes`
- `GET /api/v1/fleet`, `GET /api/v1/fleet/{slug}`
- `GET /api/v1/projects`, `GET /api/v1/projects/{slug}`

The frontend already calls these paths (see
`frontend/src/lib/api/`) and falls back to local mock data until
`VITE_API_BASE_URL` is set, so wiring up this service requires no frontend
changes beyond that one environment variable.
