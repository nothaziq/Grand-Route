# Technology Stack

## Frontend

### React

Primary UI framework.

Why:

-   Component architecture
-   Mature ecosystem
-   Strong TypeScript support
-   Suitable for interactive marketing sites

### Vite

Build tool and development server.

Why:

-   Fast development server
-   Simple configuration
-   Excellent React support
-   Low architectural overhead

### TypeScript

Required for:

-   Component props
-   API contracts
-   Content models
-   Form types
-   Safer refactoring

## Styling

### Tailwind CSS

Use Tailwind for:

-   Layout
-   Responsive utilities
-   Design tokens
-   Component styling

Do not rely on default Tailwind aesthetics. Build a custom GRP visual
system.

## Animation

### Motion

Use for:

-   Page transitions
-   Scroll reveals
-   Hover interactions
-   Image transitions
-   Navigation interactions

Keep motion restrained.

## Routing

### React Router

Use for:

-   Page routing
-   Nested service routes
-   404 handling
-   Route-level metadata strategy

## Forms

### React Hook Form

Use for:

-   Quote forms
-   Contact forms
-   Equipment requests

### Zod

Use for:

-   Client-side schema validation
-   Shared form models where practical

## Icons

### Lucide React

Use sparingly.

Important visual elements should not become a wall of generic icons.

## Backend

### FastAPI

Use for:

-   Quote API
-   Admin API
-   Fleet management
-   Project management
-   Business data

## Database

### PostgreSQL

Use when persistent data is required.

Potential tables:

``` text
quote_requests
fleet_items
projects
admins
service_categories
```

## Deployment

Frontend can be deployed to a modern static/frontend hosting platform.

Backend can be deployed to a Python-compatible service.

The final hosting provider should be selected based on:

-   Cost
-   Reliability
-   Region/latency
-   Deployment workflow
-   Database support

## Environment Variables

Frontend:

``` text
VITE_API_BASE_URL=
VITE_MAP_URL=
```

Backend:

``` text
DATABASE_URL=
CORS_ORIGINS=
SECRET_KEY=
EMAIL_PROVIDER_KEY=
```

Never commit real secrets.
