"""Application settings, loaded from environment variables.

All secrets and environment-specific values live here — nothing is
hardcoded elsewhere in the app. See backend/.env.example for the full
list of variables a deployment must set.
"""

from functools import lru_cache

from pydantic import EmailStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # --- General ---
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"

    # --- Database ---
    # Defaults to a local SQLite file so the service runs with zero setup.
    # In production, set DATABASE_URL to a Postgres connection string, e.g.:
    #   postgresql+psycopg://user:password@host:5432/grandroute
    database_url: str = "sqlite:///./grandroute.db"

    # --- CORS ---
    # Comma-separated list of allowed origins, e.g.
    # "https://grandroute.ae,https://www.grandroute.ae"
    cors_origins: str = "http://localhost:5173"

    # --- Email notifications (SMTP) ---
    # If smtp_host is unset, email sending is skipped (submissions are
    # still saved to the database) — useful for local dev.
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_use_tls: bool = True
    notify_email: EmailStr | None = None  # where quote requests are sent
    from_email: EmailStr | None = None  # "From" address on outgoing mail

    # --- Rate limiting ---
    rate_limit_per_minute: int = 5

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
