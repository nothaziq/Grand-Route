# Development Plan

## Phase 0 --- Discovery

### Goals

Confirm all business information before implementation.

Checklist:

-   [ ] Confirm official public email
-   [ ] Confirm official public phone
-   [ ] Confirm exact public address
-   [ ] Obtain original logo files
-   [ ] Confirm brand colors
-   [ ] Obtain actual vehicle/equipment photos
-   [ ] Obtain approved company description
-   [ ] Confirm service descriptions
-   [ ] Confirm whether projects can be published
-   [ ] Confirm whether testimonials exist
-   [ ] Confirm WhatsApp number
-   [ ] Confirm Google Maps location
-   [ ] Confirm Arabic/English requirement

## Phase 1 --- UX

Create:

-   [ ] Sitemap
-   [ ] User journeys
-   [ ] Homepage wireframe
-   [ ] Service page wireframe
-   [ ] Quote flow
-   [ ] Contact flow
-   [ ] Mobile navigation

Primary user journeys:

``` text
Visitor
  ↓
Homepage
  ↓
Services
  ↓
Service Detail
  ↓
Request Quote
  ↓
Confirmation
```

Alternative:

``` text
Visitor
  ↓
WhatsApp / Contact
```

## Phase 2 --- Design System

Create:

-   [ ] Color tokens
-   [ ] Typography scale
-   [ ] Spacing tokens
-   [ ] Buttons
-   [ ] Inputs
-   [ ] Navigation
-   [ ] Service panels
-   [ ] Fleet cards
-   [ ] CTA
-   [ ] Footer
-   [ ] Motion rules

## Phase 3 --- Figma UI

Design desktop and mobile versions of:

-   [ ] Home
-   [ ] About
-   [ ] Services
-   [ ] Service detail
-   [ ] Fleet
-   [ ] Industries
-   [ ] Projects
-   [ ] Contact
-   [ ] Request Quote

Do not begin page-by-page coding before the core design system is
stable.

## Phase 4 --- Frontend Setup

-   [ ] Initialize React + Vite
-   [ ] Configure TypeScript
-   [ ] Configure Tailwind
-   [ ] Configure routing
-   [ ] Configure linting/formatting
-   [ ] Create design tokens
-   [ ] Create base layout
-   [ ] Create navigation
-   [ ] Create footer

## Phase 5 --- Frontend Implementation

Order:

1.  [ ] Global layout
2.  [ ] Navbar
3.  [ ] Hero
4.  [ ] Capabilities
5.  [ ] Services
6.  [ ] About
7.  [ ] Fleet
8.  [ ] Industries
9.  [ ] Projects
10. [ ] Quote form
11. [ ] Contact
12. [ ] Footer
13. [ ] Mobile optimization
14. [ ] Motion polish

## Phase 6 --- Backend

Only after the frontend experience is validated:

-   [ ] Initialize FastAPI
-   [ ] Configure PostgreSQL
-   [ ] Create quote model
-   [ ] Create quote endpoint
-   [ ] Add validation
-   [ ] Add notifications
-   [ ] Add admin authentication
-   [ ] Add fleet CRUD
-   [ ] Add project CRUD

## Phase 7 --- QA

### Functional

-   [ ] Navigation works
-   [ ] Forms validate correctly
-   [ ] Quote submission works
-   [ ] Error states work
-   [ ] Mobile menu works
-   [ ] WhatsApp link works
-   [ ] Map works

### Visual

-   [ ] 375px
-   [ ] 390px
-   [ ] 768px
-   [ ] 1024px
-   [ ] 1440px

### Accessibility

-   [ ] Keyboard navigation
-   [ ] Focus states
-   [ ] Alt text
-   [ ] Form labels
-   [ ] Color contrast
-   [ ] Reduced motion

### Performance

-   [ ] Compress images
-   [ ] Lazy-load non-critical images
-   [ ] Avoid unnecessary JavaScript
-   [ ] Check Lighthouse
-   [ ] Check Core Web Vitals

## Phase 8 --- Launch

-   [ ] Production environment
-   [ ] Domain
-   [ ] HTTPS
-   [ ] Analytics
-   [ ] Sitemap
-   [ ] Robots
-   [ ] SEO metadata
-   [ ] Social sharing metadata
-   [ ] Final content approval
-   [ ] Final contact verification
-   [ ] Backup strategy
