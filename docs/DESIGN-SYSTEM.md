# Design System

## 1. Design Philosophy

The GRP website should feel like a modern industrial company with a
serious operational presence.

Design keywords:

-   Industrial
-   Precise
-   Confident
-   Clean
-   Premium
-   Human
-   Operational

The design should not resemble a generic startup/SaaS landing page.

## 2. Brand Colors

The business card uses green, burgundy/red, and white. Exact digital
brand values must be confirmed from the original logo artwork before
final production.

Initial working tokens:

``` css
--color-grp-green: #1B9B68;
--color-grp-burgundy: #A64055;
--color-charcoal: #161817;
--color-off-white: #F5F4EF;
--color-light-gray: #E7E7E2;
```

These are design starting points, not verified official brand hex
values.

## 3. Color Usage

### Charcoal

Primary background for:

-   Hero sections
-   Footer
-   High-contrast sections
-   Navigation states where appropriate

### Off-white

Primary page background and large content areas.

### GRP Green

Use for:

-   Primary CTA
-   Links
-   Active states
-   Small highlights
-   Important UI accents

### Burgundy

Use sparingly for:

-   Secondary accents
-   Small decorative details
-   Brand-related emphasis

Do not use green and burgundy equally across every section.

## 4. Typography

Recommended initial system:

### Display

Space Grotesk

Use for:

-   Hero headings
-   Major section headings
-   Large numerical labels

### UI / Body

Manrope

Use for:

-   Navigation
-   Body text
-   Forms
-   Buttons
-   Metadata

Typography should use a clear scale rather than arbitrary font sizes.

## 5. Layout

Use a strong grid.

Desktop:

-   Max content width around 1200--1400px
-   Generous horizontal margins
-   12-column conceptual grid

Mobile:

-   Single-column layouts
-   Reduced but still deliberate whitespace
-   Clear content hierarchy

## 6. Shape Language

Prefer:

-   Square or lightly rounded containers
-   0--12px corner radius depending on component
-   Thin borders
-   Strong alignment

Avoid:

-   Excessive pill shapes
-   Every section inside a rounded card
-   Floating cards with heavy shadows

## 7. Buttons

Primary:

``` text
[ REQUEST A QUOTE ↗ ]
```

Characteristics:

-   Strong contrast
-   Compact height
-   Clear label
-   Subtle hover motion

Secondary:

``` text
[ EXPLORE SERVICES → ]
```

Use outline or text treatment.

## 8. Photography

Photography is a major part of the visual identity.

Preferred imagery:

-   Actual GRP vehicles
-   Actual equipment
-   Actual personnel where approved
-   Musaffah/Abu Dhabi industrial environments
-   Maintenance work
-   Transportation operations

Do not use AI-generated images to represent actual company assets.

If stock imagery is used temporarily, label it internally as placeholder
content and replace it before launch where possible.

## 9. Motion

Motion should reinforce hierarchy.

Recommended:

-   150--300ms micro-interactions
-   Gentle image zoom on hover
-   Underline/border transitions
-   Scroll reveal for major sections
-   Subtle page transitions

Avoid:

-   Constant parallax
-   Excessive bounce
-   Large spinning elements
-   Animating every card independently
-   Motion that delays access to content

## 10. Service Cards

Preferred service presentation:

``` text
01
TRANSPORTATION

Material transportation
solutions for operational needs.

[IMAGE]

Explore →
```

Use editorial panels rather than generic icon cards.

## 11. Responsive Rules

Design mobile intentionally rather than simply shrinking desktop.

Test at minimum:

-   375px
-   390px
-   768px
-   1024px
-   1440px

## 12. Accessibility

Minimum expectations:

-   Semantic HTML
-   Visible keyboard focus
-   Sufficient color contrast
-   Descriptive image alt text
-   Proper labels for form controls
-   Keyboard-accessible menus
-   Reduced-motion support
