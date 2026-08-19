"""Initial catalog content, mirrored from the frontend's former static
data files (frontend/src/data/projects.ts and fleet.ts) so switching
to the backend doesn't change what visitors see. Seeded once, on
first boot, if the tables are empty — safe to edit afterwards via
direct DB access or (once built) the admin endpoints without this
file overwriting your changes.
"""

from sqlalchemy.orm import Session

from app.models.fleet import FleetItem
from app.models.project import Project

PROJECT_SEED = [
    {
        "slug": "rooftop-ductwork-installation",
        "title": "Rooftop Ductwork Installation",
        "location": "Abu Dhabi, UAE",
        "service": "electromechanical",
        "description": (
            "Fabrication and installation of galvanized sheet metal ductwork across a "
            "commercial rooftop, including curved transitions and multiple branch runs."
        ),
        "images_csv": ",".join(
            [
                "/images/projects/ductwork-installation/duct-01.jpg",
                "/images/projects/ductwork-installation/duct-02.jpg",
                "/images/projects/ductwork-installation/duct-03.jpg",
            ]
        ),
        "published": True,
        "sort_order": 0,
    },
    {
        "slug": "villa-flooring-and-paving",
        "title": "Villa Flooring & Paving Works",
        "location": "UAE",
        "service": "building-maintenance",
        "description": (
            "Interior marble tiling and exterior interlocking paver installation for a "
            "residential villa, covering bathrooms, walkways, and staircase finishing."
        ),
        "images_csv": ",".join(
            [
                "/images/projects/villa-flooring-paving/floor-01.jpg",
                "/images/projects/villa-flooring-paving/floor-02.jpg",
                "/images/projects/villa-flooring-paving/floor-03.jpg",
                "/images/projects/villa-flooring-paving/floor-04.jpg",
            ]
        ),
        "published": True,
        "sort_order": 1,
    },
]

FLEET_SEED = [
    {
        "slug": "skid-steer-loader",
        "name": "Skid Steer Loader",
        "category": "heavy-machinery",
        "description": "Compact skid steer loader used for material handling and site clearing.",
        "image": "/images/fleet/skid-steer-loader.jpg",
        "specifications": None,
        "sort_order": 0,
    },
    {
        "slug": "backhoe-loader-3cx",
        "name": "Backhoe Loader",
        "category": "heavy-machinery",
        "description": "JCB 3CX backhoe loader used for excavation, loading, and general earthmoving work.",
        "image": "/images/fleet/backhoe-loader-side.jpg",
        "specifications": None,
        "sort_order": 1,
    },
]


def seed_if_empty(db: Session) -> None:
    if db.query(Project).count() == 0:
        for row in PROJECT_SEED:
            db.add(Project(**row))
    if db.query(FleetItem).count() == 0:
        for row in FLEET_SEED:
            db.add(FleetItem(**row))
    db.commit()
