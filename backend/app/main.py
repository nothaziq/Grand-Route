import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import admin, fleet, projects, quotes
from app.core.config import get_settings
from app.core.database import Base, SessionLocal, engine
from app.core.seed import seed_if_empty

# Without this, only WARNING/ERROR logs reach Render's log viewer — the
# app's own INFO-level confirmations (e.g. "sent via Resend", "skipping
# email, not configured") are silently dropped, which makes diagnosing
# notification issues much harder than it needs to be.
logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(name)s:%(message)s")

settings = get_settings()

# Creates tables on startup if they don't exist yet. Fine for SQLite/dev
# and for a simple single-table Postgres deployment; swap for Alembic
# migrations once the schema needs to evolve carefully.
Base.metadata.create_all(bind=engine)

# Seed projects/fleet from the original static content, once, if empty.
with SessionLocal() as _db:
    seed_if_empty(_db)

app = FastAPI(
    title="Grand Route API",
    version="1.0.0",
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(quotes.router, prefix=settings.api_v1_prefix)
app.include_router(admin.router, prefix=settings.api_v1_prefix)
app.include_router(projects.router, prefix=settings.api_v1_prefix)
app.include_router(fleet.router, prefix=settings.api_v1_prefix)


@app.get("/api/v1/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
