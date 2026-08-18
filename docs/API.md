# API Specification

## 1. Purpose

The API is optional for the initial brochure-only release but should be
designed so that the website can later become a lead-generation and
content platform.

Recommended backend:

-   FastAPI
-   PostgreSQL

## 2. API Base

Development:

``` text
/api/v1
```

Production URL should be configured through environment variables.

## 3. Quote Requests

### POST `/quotes`

Creates a new quote request.

Request:

``` json
{
  "name": "string",
  "company": "string",
  "phone": "string",
  "email": "string",
  "service": "material-transport",
  "requirement": "string",
  "preferredDate": "YYYY-MM-DD",
  "location": "string"
}
```

Response:

``` json
{
  "id": "string",
  "status": "received"
}
```

## 4. Service Values

``` text
material-transport
passenger-transport
building-maintenance
electromechanical
heavy-equipment
```

## 5. Fleet

### GET `/fleet`

Returns published fleet/equipment items.

### GET `/fleet/{slug}`

Returns one published fleet item.

Example conceptual response:

``` json
{
  "slug": "string",
  "name": "string",
  "category": "string",
  "description": "string",
  "imageUrl": "string",
  "specifications": {}
}
```

Do not hardcode specifications until supplied by the company.

## 6. Projects

### GET `/projects`

Returns published projects.

### GET `/projects/{slug}`

Returns a single project.

Project fields:

``` text
slug
title
location
service
description
images
published
```

## 7. Admin

Future admin endpoints may include:

``` text
POST   /auth/login
GET    /admin/quotes
PATCH  /admin/quotes/{id}
POST   /admin/fleet
PATCH  /admin/fleet/{id}
DELETE /admin/fleet/{id}
POST   /admin/projects
PATCH  /admin/projects/{id}
DELETE /admin/projects/{id}
```

Admin routes must require authentication and authorization.

## 8. Validation

Use Pydantic on the backend and Zod on the frontend.

Validate:

-   Required fields
-   Email format
-   Phone format
-   Allowed service values
-   Maximum text lengths
-   File type/size if attachments are supported

## 9. Notifications

A future quote submission may trigger:

1.  Database persistence
2.  Business email notification
3.  Optional WhatsApp workflow
4.  User confirmation

The exact provider should be chosen during implementation.

## 10. Security

Implement:

-   CORS restrictions
-   Rate limiting on public forms
-   Input validation
-   File upload restrictions
-   Authentication for admin routes
-   Secure secrets management
-   Logging without sensitive data exposure
