"""Application settings, loaded from environment variables.

All secrets and environment-specific values live here — nothing is
hardcoded elsewhere in the app. See backend/.env.example for the full
list of variables a deployment must set.
"""

from functools import lru_cache

from pydantic import field_validator
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

    # --- Email notifications ---
    # Preferred: Resend (HTTPS API, works everywhere — including hosts
    # like Render's free tier that block raw outbound SMTP sockets).
    # Sign up free at resend.com, grab an API key, set it here.
    resend_api_key: str | None = None

    # Fallback: plain SMTP. Works for local dev and hosts that allow
    # outbound SMTP, but Render's free tier does NOT — connections
    # fail with "Network is unreachable" regardless of credentials.
    # Only used if resend_api_key is unset.
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_use_tls: bool = True

    # Plain str, not EmailStr: hosting dashboards often leave an env
    # var "set" to an empty string rather than truly unset, and
    # EmailStr rejects "" outright (crashes startup). Also, from_email
    # legitimately needs the "Display Name <address>" format Resend
    # expects, which EmailStr would reject too. Blank strings are
    # normalized to None below so "unset" behaves the same either way.
    notify_email: str | None = None  # where quote requests are sent
    from_email: str | None = None  # "From" header, e.g. "Grand Route <onboarding@resend.dev>"

    @field_validator("notify_email", "from_email", mode="before")
    @classmethod
    def _blank_to_none(cls, value: str | None) -> str | None:
        if value is None:
            return None
        stripped = value.strip()
        return stripped or None

    # --- Rate limiting ---
    rate_limit_per_minute: int = 5

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
