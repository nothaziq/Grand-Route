# Grand Route — image & UI update

Unzip this and copy `frontend/` on top of your repo's `frontend/` folder,
overwriting the files listed below. Then commit and push yourself (I don't
have push access to your GitHub).

## Files this changes/adds

New images (compressed, ~768KB total for all 9):
- frontend/public/images/fleet/skid-steer-loader.jpg
- frontend/public/images/fleet/backhoe-loader-3cx.jpg
- frontend/public/images/projects/ductwork-installation/duct-01.jpg
- frontend/public/images/projects/ductwork-installation/duct-02.jpg
- frontend/public/images/projects/ductwork-installation/duct-03.jpg
- frontend/public/images/projects/villa-flooring-paving/floor-01.jpg
- frontend/public/images/projects/villa-flooring-paving/floor-02.jpg
- frontend/public/images/projects/villa-flooring-paving/floor-03.jpg
- frontend/public/images/projects/villa-flooring-paving/floor-04.jpg

Data (adds `image` fields, removes Light Trucks / Passenger Buses categories):
- frontend/src/data/fleet.ts
- frontend/src/data/services.ts
- frontend/src/data/projects.ts (unchanged from last time, included for completeness)

Types (adds optional `image?: string` to Capability, Service, FleetCategory):
- frontend/src/types/index.ts

Components (real photos + hover animations):
- frontend/src/components/fleet/FleetCategoryCard.tsx
- frontend/src/components/fleet/FleetItemCard.tsx
- frontend/src/components/services/ServicePanel.tsx
- frontend/src/components/sections/CoreCapabilities.tsx
- frontend/src/components/sections/Hero.tsx
- frontend/src/components/navigation/Navbar.tsx (active-tab highlight)

Pages:
- frontend/src/pages/FleetPage.tsx (single category, no more 3-col empty grid)
- frontend/src/pages/ProjectsPage.tsx (THE ACTUAL FIX — now shows every image
  per project, not just the first one)
- frontend/src/pages/ServiceDetailPage.tsx
- frontend/src/pages/AboutPage.tsx (real photo instead of a fabricated "team" placeholder)

## Verified

`npx tsc --noEmit -p tsconfig.app.json` — clean
`npm run build` — clean

## Note on the last delivery

The previous zip's ProjectsPage.tsx only rendered `project.images[0]`. That's
why applying it changed nothing you could see beyond 2 thumbnails. This
version renders the full `images[]` array per project.
