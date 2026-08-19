from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    slug: Mapped[str] = mapped_column(String(120), primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    location: Mapped[str] = mapped_column(String(200))
    service: Mapped[str] = mapped_column(String(60))
    description: Mapped[str] = mapped_column(Text)
    # Stored as a comma-separated list of image paths — simple and
    # sufficient for a handful of images per project. Switch to a
    # separate images table if per-image metadata is ever needed.
    images_csv: Mapped[str] = mapped_column(Text, default="")
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(default=0)

    @property
    def images(self) -> list[str]:
        return [i for i in self.images_csv.split(",") if i]
