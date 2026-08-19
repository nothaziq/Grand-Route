from pydantic import BaseModel


class FleetItemOut(BaseModel):
    slug: str
    name: str
    category: str
    description: str
    image: str | None = None
    specifications: dict[str, str] | None = None

    model_config = {"from_attributes": True}
