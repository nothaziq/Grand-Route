from fastapi import APIRouter, BackgroundTasks, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.rate_limit import rate_limit
from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteRequestCreate, QuoteRequestOut
from app.services.email import send_quote_notification

router = APIRouter(prefix="/quotes", tags=["quotes"])


@router.post(
    "",
    response_model=QuoteRequestOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit)],
)
def create_quote_request(
    payload: QuoteRequestCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> QuoteRequest:
    quote = QuoteRequest(
        name=payload.name,
        company=payload.company,
        phone=payload.phone,
        email=payload.email,
        service=payload.service.value,
        requirement=payload.requirement,
        preferred_date=payload.preferredDate,
        location=payload.location,
    )
    db.add(quote)
    db.commit()
    db.refresh(quote)

    # Don't make the customer wait on the email round-trip.
    background_tasks.add_task(send_quote_notification, quote)

    return quote
