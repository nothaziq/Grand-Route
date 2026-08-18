"""Minimal admin endpoint for viewing quote requests.

Protected by a single shared API key (set ADMIN_API_KEY in the
environment) passed via the X-Admin-Key header. This is intentionally
simple for launch — swap for real auth (per docs/API.md section 7)
before this becomes a multi-user admin panel.
"""

import os

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteRequestOut

router = APIRouter(prefix="/admin", tags=["admin"])


class QuoteRequestDetail(QuoteRequestOut):
    name: str
    company: str | None
    phone: str
    email: str | None
    service: str
    requirement: str
    location: str | None


def require_admin_key(x_admin_key: str | None = Header(default=None)) -> None:
    expected = os.environ.get("ADMIN_API_KEY")
    if not expected:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin access is not configured on this deployment.",
        )
    if x_admin_key != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin key.")


@router.get("/quotes", response_model=list[QuoteRequestDetail], dependencies=[Depends(require_admin_key)])
def list_quotes(db: Session = Depends(get_db)) -> list[QuoteRequest]:
    return list(db.scalars(select(QuoteRequest).order_by(QuoteRequest.created_at.desc())))
