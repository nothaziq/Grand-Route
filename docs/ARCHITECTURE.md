# Architecture

## 1. Architecture Goals

The architecture should be:

-   Professional
-   Maintainable
-   Component-driven
-   Responsive
-   SEO-conscious
-   Fast
-   Easy for a small team to develop
-   Ready for a FastAPI backend
-   Ready for future CMS/admin functionality

The project uses **React + Vite + TypeScript** for the frontend.

## 2. High-Level Architecture

``` text
Browser
   |
   v
React + Vite Frontend
   |
   +-- Static content
   +-- Client-side routing
   +-- UI components
   +-- Forms
   +-- API client
   |
   v
FastAPI Backend (optional Phase 2)
   |
   +-- Quote Requests
   +-- Fleet/Equipment
   +-- Projects
   +-- Contact/Business Data
   |
   v
PostgreSQL
```

## 3. Repository Structure

``` text
grand-route/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── navigation/
│   │   │   ├── sections/
│   │   │   ├── services/
│   │   │   ├── fleet/
│   │   │   └── forms/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
│
├── docs/
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN-SYSTEM.md
│   ├── PAGES.md
│   ├── CONTENT.md
│   ├── API.md
│   ├── DEVELOPMENT-PLAN.md
│   ├── TECH-STACK.md
│   └── PROJECT-PLAN.md
│
└── README.md
```

## 4. Frontend Responsibilities

The frontend owns:

-   Rendering pages
-   Responsive layout
-   Navigation
-   Visual design
-   Client-side validation
-   Quote form UX
-   API consumption
-   SEO metadata
-   Loading/error states
-   Accessibility

## 5. Backend Responsibilities

The backend, when introduced, owns:

-   Quote request processing
-   Validation
-   Persistent storage
-   Fleet/equipment records
-   Project records
-   Admin authentication
-   Email/notification integration
-   API authorization
-   Audit logging where required

## 6. Routing

Recommended routes:

``` text
/
 /about
 /services
 /services/material-transport
 /services/passenger-transport
 /services/building-maintenance
 /services/electromechanical
 /services/heavy-equipment
 /fleet
 /industries
 /projects
 /contact
 /request-quote
```

## 7. Component Rules

Components should be:

-   Small enough to reason about
-   Reusable when there is genuine reuse
-   Typed with TypeScript
-   Independent from page-specific business logic where possible
-   Accessible by default

Avoid creating a component abstraction merely because two pieces of
markup look similar once.

## 8. Data Strategy

Static early-stage content should live in typed data files.

Example:

``` ts
export interface Service {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  image?: string;
}
```

When the backend is introduced, server-owned content should move behind
the API without changing the page component contracts.

## 9. State Management

Do not introduce a global state library initially.

Use:

-   React state for local UI state
-   React Hook Form for forms
-   URL state for filters/query parameters
-   Server/API state through a small API layer

Introduce a dedicated server-state library only if application
complexity justifies it.

## 10. Error Handling

Every API-driven interaction must have:

-   Loading state
-   Success state
-   User-readable error state
-   Retry or recovery path where appropriate

Never expose raw server errors to users.

## 11. Security

The frontend must never contain:

-   Database credentials
-   API secrets
-   Private keys
-   Admin credentials

Public environment variables must contain only values intended for
browser exposure.
