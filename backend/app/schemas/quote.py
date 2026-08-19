from datetime import date
from enum import Enum

from pydantic import BaseModel, EmailStr, Field, field_validator


class ServiceValue(str, Enum):
    material_transport = "material-transport"
    building_maintenance = "building-maintenance"
    electromechanical = "electromechanical"
    heavy_equipment = "heavy-equipment"


class QuoteRequestCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    company: str | None = Field(default=None, max_length=200)
    phone: str = Field(min_length=7, max_length=40)
    email: EmailStr | None = None
    service: ServiceValue
    requirement: str = Field(min_length=10, max_length=4000)
    preferredDate: date | None = None
    location: str | None = Field(default=None, max_length=300)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        allowed = set("0123456789+()- ")
        if not set(value).issubset(allowed):
            raise ValueError("Phone number may only contain digits, +, (), -, and spaces.")
        return value

    @field_validator("name", "company", "location")
    @classmethod
    def strip_whitespace(cls, value: str | None) -> str | None:
        return value.strip() if value else value


class QuoteRequestOut(BaseModel):
    id: str
    status: str

    model_config = {"from_attributes": True}
