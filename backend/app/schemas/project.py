from pydantic import BaseModel

from app.schemas.quote import ServiceValue


class ProjectOut(BaseModel):
    slug: str
    title: str
    location: str
    service: ServiceValue
    description: str
    images: list[str]
    published: bool

    model_config = {"from_attributes": True}
