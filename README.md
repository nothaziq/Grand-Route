# Grand Route — homepage service numbering fix

Copy `frontend/` on top of your repo's `frontend/`, overwriting the 3 files
below, then commit/push.

## What was wrong

The homepage now only shows the 3 services that have real photos (Building
Maintenance, Electromechanical, Heavy Equipment). Those three still carry
their original catalog numbers (03, 04, 05) from the full 5-service list,
so the homepage teaser looked like it started at "03" instead of "01".

## Fix

- `ServicePanel.tsx` — accepts an optional `displayNumber` prop that
  overrides the service's own `number` field for display only.
- `ServiceGrid.tsx` — accepts an optional `renumber` prop; when set, each
  panel gets sequential 01/02/03… based on its position in the array
  passed in, instead of its catalog number.
- `ServicesSection.tsx` (homepage) — passes `renumber` so its filtered
  3-service subset shows 01, 02, 03.

The full `/services` page (`ServicesPage.tsx`) was NOT touched — it still
uses the default (no `renumber`), so it correctly shows all five services
numbered 01–05 in catalog order.

## Verified
`npx tsc --noEmit -p tsconfig.app.json` — clean
`npm run build` — clean
