from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.fleet import FleetItem
from app.schemas.fleet import FleetItemOut

router = APIRouter(prefix="/fleet", tags=["fleet"])


@router.get("", response_model=list[FleetItemOut])
def list_fleet_items(db: Session = Depends(get_db)) -> list[FleetItem]:
    return list(db.scalars(select(FleetItem).order_by(FleetItem.sort_order)))


@router.get("/{slug}", response_model=FleetItemOut)
def get_fleet_item(slug: str, db: Session = Depends(get_db)) -> FleetItem:
    item = db.get(FleetItem, slug)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fleet item not found.")
    return item
