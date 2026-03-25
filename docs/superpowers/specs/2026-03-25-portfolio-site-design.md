# Portfolio Site Design Spec

## Overview

A single-page portfolio site for Baird MA, a frontend engineer. The goal is to ship fast — a clean, minimal page that showcases ad-tech work samples and links to GitHub/LinkedIn. Designed to be viewed by both ad-tech and general frontend hiring managers.

## Structure

Single HTML file, top to bottom:

### 1. Hero Section
- Name: "Baird MA"
- Title: "Frontend Engineer"
- Links: GitHub (https://github.com/ShunRenMa), LinkedIn (https://www.linkedin.com/in/shun-ren-ma-94b42815a/)
- Centered, large typography, minimal

### 2. Works Section
- Section heading: "Works"
- 3-column grid (desktop) → 2-column (tablet) → 1-column (mobile), max-width container (`max-w-6xl`) to prevent over-stretching on wide screens
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
  - `transition-delay`: based on card's visual column position (`index % columns * 150ms`), adapts per breakpoint (3-col: 0/150/300ms, 2-col: 0/150ms, 1-col: 0ms)
- No external animation library needed

### Assets
- Images served from local `works_photo/` directory
- GIF paths: `works_photo/gif/*.gif`
- PNG paths: `works_photo/jpg/*.png` (note: `jpg/` directory name is a misnomer; it contains PNG files)

### Data-Driven Cards
- Works data stored as a JS array in `index.html`, separate from the rendering logic
- Each entry: `{ img, title, desc }`
- JS loop generates card HTML from this array at page load
- To update content, only the data array needs to change — no HTML editing required

```js
const works = [
  { img: "works_photo/gif/3d_gallery.gif", title: "...", desc: "..." },
  { img: "works_photo/gif/superlike.gif", title: "...", desc: "..." },
  { img: "works_photo/gif/hit_v.gif", title: "...", desc: "..." },
  { img: "works_photo/gif/hor.gif", title: "...", desc: "..." },
  { img: "works_photo/gif/spider_man.gif", title: "...", desc: "..." },
  { img: "works_photo/gif/hit.gif", title: "...", desc: "..." },
  { img: "works_photo/jpg/Door.png", title: "...", desc: "..." },
  { img: "works_photo/jpg/bottom.png", title: "...", desc: "..." },
];
```

## Content TBD (from user)

- Title and description for each of the 8 works (placeholder text will be used initially)

## Out of Scope (for now)

- Photography section (user will add later)
- Multi-page routing
- Lightbox / modal
- Build tooling / framework
- Contact form
- Analytics
