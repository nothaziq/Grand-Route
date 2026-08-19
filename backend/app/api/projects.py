from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectOut

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectOut])
def list_projects(db: Session = Depends(get_db)) -> list[ProjectOut]:
    rows = db.scalars(
        select(Project).where(Project.published.is_(True)).order_by(Project.sort_order)
    ).all()
    return [
        ProjectOut(
            slug=p.slug,
            title=p.title,
            location=p.location,
            service=p.service,
            description=p.description,
            images=p.images,
            published=p.published,
        )
        for p in rows
    ]


@router.get("/{slug}", response_model=ProjectOut)
def get_project(slug: str, db: Session = Depends(get_db)) -> ProjectOut:
    project = db.get(Project, slug)
    if project is None or not project.published:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    return ProjectOut(
        slug=project.slug,
        title=project.title,
        location=project.location,
        service=project.service,
        description=project.description,
        images=project.images,
        published=project.published,
    )
