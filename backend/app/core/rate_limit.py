"""Minimal in-process rate limiter for public form endpoints.

Good enough for a single-instance deployment (e.g. one Render/Railway
service). If the service is ever scaled to multiple instances, swap
this for a shared store (Redis) — the dependency interface stays the
same, so callers don't need to change.
"""

import time
from collections import defaultdict

from fastapi import HTTPException, Request, status

from app.core.config import get_settings

settings = get_settings()

# ip -> list of request timestamps (seconds)
_hits: dict[str, list[float]] = defaultdict(list)


def rate_limit(request: Request) -> None:
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    window_start = now - 60

    recent = [t for t in _hits[ip] if t > window_start]
    if len(recent) >= settings.rate_limit_per_minute:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again in a minute.",
        )

    recent.append(now)
    _hits[ip] = recent
