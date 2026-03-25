# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio site for Baird MA showcasing 8 ad-tech work samples.

**Architecture:** Single `index.html` file using Tailwind CSS v4 CDN and vanilla JS. Works data is stored as a JS array and rendered dynamically. Intersection Observer handles scroll-triggered staggered fade-in animations.

**Tech Stack:** HTML, Tailwind CSS v3 Play CDN (`cdn.tailwindcss.com`), vanilla JavaScript, Google Fonts (Inter)

**Spec:** `docs/superpowers/specs/2026-03-25-portfolio-site-design.md`

---

## File Structure

- **Create:** `index.html` — the entire site (HTML structure, Tailwind classes, JS data array, JS rendering logic, scroll animation logic)

All other files already exist:
- `works_photo/gif/3d_gallery.gif`
- `works_photo/gif/superlike.gif`
- `works_photo/gif/hit_v.gif`
- `works_photo/gif/hor.gif`
- `works_photo/gif/spider_man.gif`
- `works_photo/gif/hit.gif`
- `works_photo/jpg/Door.png`
- `works_photo/jpg/bottom.png`

---

### Task 1: HTML Shell + Tailwind + Font

Create the base HTML file with Tailwind CDN, Inter font, and dark background.

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with boilerplate**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baird MA — Frontend Engineer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'Noto Sans TC', 'sans-serif'],
          },
        },
      },
    };
  </script>
  <style>
    body { background-color: #0a0a0a; }
  </style>
</head>
<body class="font-sans text-white min-h-screen">
</body>
</html>
```

Note: Using Tailwind v3 Play CDN for simplicity. Stable and well-documented for single-file prototypes.

- [ ] **Step 2: Open in browser to verify**

Run: `open index.html`
Expected: Dark page, no errors in console.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add HTML shell with Tailwind CDN and Inter font"
```

---

### Task 2: Hero Section

Add the centered hero with name, title, and social links.

**Files:**
- Modify: `index.html` — add hero markup inside `<body>`

- [ ] **Step 1: Add hero HTML inside `<body>`**

```html
<!-- Hero -->
<header class="flex flex-col items-center justify-center py-24 px-4">
  <h1 class="text-5xl font-bold tracking-tight">Baird MA</h1>
  <p class="mt-4 text-xl text-gray-400">Frontend Engineer</p>
  <div class="mt-6 flex gap-6">
    <a href="https://github.com/ShunRenMa" target="_blank" rel="noopener"
       class="text-gray-400 hover:text-white transition-colors">GitHub</a>
    <a href="https://www.linkedin.com/in/shun-ren-ma-94b42815a/" target="_blank" rel="noopener"
       class="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
  </div>
</header>
```

- [ ] **Step 2: Open in browser to verify**

Run: `open index.html`
Expected: Centered name "Baird MA", subtitle "Frontend Engineer", two gray links that turn white on hover.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add hero section with name, title, and social links"
```

---

### Task 3: Works Data Array + Card Rendering

Add the JS data array and rendering logic that generates cards into a grid.

**Files:**
- Modify: `index.html` — add works section HTML container, `<script>` with data and render logic

- [ ] **Step 1: Add works section container after hero**

```html
<!-- Works -->
<main class="max-w-6xl mx-auto px-4 pb-24">
  <h2 class="text-3xl font-bold mb-12 text-center">Works</h2>
  <div id="works-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  </div>
</main>
```

- [ ] **Step 2: Add `<script>` before closing `</body>` with data and render**

```html
<script>
  const works = [
    { img: "works_photo/gif/3d_gallery.gif", title: "3D Gallery Ad", desc: "Interactive 3D product showcase" },
    { img: "works_photo/gif/superlike.gif", title: "Superlike Ad", desc: "Animated floating hearts interaction" },
    { img: "works_photo/gif/hit_v.gif", title: "Hit Vertical Ad", desc: "Vertical interstitial with scroll integration" },
    { img: "works_photo/gif/hor.gif", title: "Horizontal Ad", desc: "Horizontal banner with news feed integration" },
    { img: "works_photo/gif/spider_man.gif", title: "Spider-Man Ad", desc: "Character-driven interactive banner" },
    { img: "works_photo/gif/hit.gif", title: "Hit Ad", desc: "Animated interstitial advertisement" },
    { img: "works_photo/jpg/Door.png", title: "Door Ad", desc: "Full-page takeover creative" },
    { img: "works_photo/jpg/bottom.png", title: "Bottom Banner", desc: "Sticky bottom banner layout" },
  ];

  const grid = document.getElementById("works-grid");

  works.forEach((work, i) => {
    const card = document.createElement("div");
    card.className = "bg-[#1a1a1a] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300";
    card.innerHTML = `
      <img src="${work.img}" alt="${work.title}" class="w-full" loading="lazy">
      <div class="p-4">
        <h3 class="font-bold text-lg">${work.title}</h3>
        <p class="text-gray-400 text-sm mt-1">${work.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
</script>
```

- [ ] **Step 3: Open in browser to verify**

Run: `open index.html`
Expected: 8 cards in a 3-column grid (desktop), each showing image/GIF, title, and description. Cards scale up on hover.

- [ ] **Step 4: Resize browser to verify responsive**

Expected: 2 columns at tablet width, 1 column on mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add data-driven works grid with 8 project cards"
```

---

### Task 4: Scroll Animation

Add Intersection Observer-based staggered fade-in animation for cards.

**Files:**
- Modify: `index.html` — add CSS for animation states, update JS to set initial hidden state and observe

- [ ] **Step 1: Add animation CSS inside `<style>` block**

Replace the existing `<style>` block:

```html
<style>
  body { background-color: #0a0a0a; }

  .card-hidden {
    opacity: 0;
    transform: translateY(20px);
  }
  .card-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
</style>
```

- [ ] **Step 2: Update card creation to add hidden class**

In the `works.forEach` loop, after creating the card element, add the hidden class and a data attribute for index:

```js
card.className = "bg-[#1a1a1a] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 card-hidden";
card.dataset.index = i;
```

- [ ] **Step 3: Add Intersection Observer after the forEach loop**

```js
function getColumns() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = parseInt(card.dataset.index);
        const cols = getColumns();
        const colPosition = index % cols;
        card.style.transitionDelay = `${colPosition * 150}ms`;
        card.classList.remove("card-hidden");
        card.classList.add("card-visible");
        observer.unobserve(card);
      }
    });
  },
  { threshold: 0.1 }
);

grid.querySelectorAll(".card-hidden").forEach((card) => observer.observe(card));
```

- [ ] **Step 4: Open in browser and scroll to verify**

Run: `open index.html`
Expected: Cards are invisible initially. On scroll, cards in each row fade in left-to-right with staggered delay (150ms between each).

- [ ] **Step 5: Resize and re-test**

Expected: At 2-column width, only 2 stagger delays (0ms, 150ms). At 1-column, no stagger (0ms only).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add staggered scroll-triggered fade-in animation"
```

---

### Task 5: Footer

Add minimal footer.

**Files:**
- Modify: `index.html` — add footer after `</main>`

- [ ] **Step 1: Add footer HTML after `</main>`**

```html
<!-- Footer -->
<footer class="text-center text-gray-500 text-sm py-8">
  &copy; 2026 Baird MA
</footer>
```

- [ ] **Step 2: Open in browser to verify**

Run: `open index.html`
Expected: Small gray copyright text centered at the bottom.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add footer"
```

---

### Task 6: Final Review

Full visual and functional review.

- [ ] **Step 1: Open in browser, full walkthrough**

Run: `open index.html`

Check:
- Hero: name, title, links all display correctly
- Links: GitHub and LinkedIn open in new tabs
- Grid: 8 cards display with correct images
- Hover: cards scale up smoothly
- Scroll animation: cards fade in left-to-right, staggered per row
- Responsive: test at desktop (3-col), tablet (2-col), mobile (1-col)
- Dark theme: background is near-black, cards are slightly lighter

- [ ] **Step 2: Check console for errors**

Open DevTools → Console. Expected: no errors or warnings.

- [ ] **Step 3: Commit any final adjustments if needed**
