# Portfolio Site Design Spec

## Overview

A single-page portfolio site for Baird MA, a frontend engineer. The goal is to ship fast — a clean, minimal page that showcases ad-tech work samples and links to GitHub/LinkedIn. Designed to be viewed by both ad-tech and general frontend hiring managers.

## Structure

Single HTML file, top to bottom:

### 1. Hero Section
- Name: "Baird MA"
- Title: "Frontend Engineer"
- Links: GitHub (https://github.com/ShunRenMa), LinkedIn (URL TBD from user)
- Centered, large typography, minimal

### 2. Works Section
- Section heading: "Works"
- 3-column grid (desktop) → 2-column (tablet) → 1-column (mobile)
- 8 project cards total, displayed in this order (left to right, top to bottom):
  1. 3d_gallery.gif
  2. superlike.gif
  3. hit_v.gif
  4. hor.gif
  5. spider_man.gif
  6. hit.gif
  7. Door.png
  8. bottom.png

#### Card Design
- Image/GIF on top (full width of card)
- Title below image (bold, white)
- Short description below title (gray, smaller text)
- Hover: subtle scale up (`scale-105`) with transition

#### Scroll Animation
- Cards fade in when scrolling into viewport
- Staggered left-to-right: within each row, cards appear sequentially (not all at once)
- Implementation: Intersection Observer API + CSS transitions with incremental delay

### 3. Footer
- "© 2026 Baird MA"
- Minimal, centered

## Technical Decisions

### Stack
- **Pure HTML + Tailwind CSS v4 (CDN)** — no build tools, no framework
- **Single file**: `index.html`
- **Google Fonts**: Inter (sans-serif) for English, system fallback for Chinese

### Color Scheme
- Dark background (`#0a0a0a` or similar near-black)
- White text for headings
- Gray text (`#9ca3af`) for descriptions
- Cards: slightly lighter dark surface (`#1a1a1a`) for subtle contrast

### Responsive Breakpoints
- Desktop (≥1024px): 3 columns
- Tablet (≥640px): 2 columns
- Mobile (<640px): 1 column

### Animation
- Intersection Observer watches each card
- When card enters viewport, add class that triggers:
  - `opacity: 0 → 1`
  - `translateY: 20px → 0`
  - `transition-delay`: 0ms, 150ms, 300ms for 1st, 2nd, 3rd card in each row
- No external animation library needed

### Assets
- Images served from local `works_photo/` directory
- GIF paths: `works_photo/gif/*.gif`
- PNG paths: `works_photo/jpg/*.png`

## Content TBD (from user)

- LinkedIn URL
- Title and description for each of the 8 works
- Each card needs:
  - `title`: short project name (e.g., "3D Gallery Ad")
  - `description`: one line about tech/purpose (e.g., "Interactive 3D product showcase using CSS transforms")

## Out of Scope (for now)

- Photography section (user will add later)
- Multi-page routing
- Lightbox / modal
- Build tooling / framework
- Contact form
- Analytics
