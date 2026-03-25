const works = [
  { img: "works_photo/gif/3d_gallery.gif", title: "3D Gallery Ad", desc: "Interactive 3D product showcase", ratio: "9/20" },
  { img: "works_photo/gif/superlike.gif", title: "Superlike Ad", desc: "Animated floating hearts interaction", ratio: "9/20" },
  { img: "works_photo/gif/hit_v.gif", title: "Hit Vertical Ad", desc: "Vertical interstitial with scroll integration", ratio: "9/20" },
  { img: "works_photo/gif/hor.gif", title: "Horizontal Ad", desc: "Horizontal banner with news feed integration", ratio: "9/20" },
  { img: "works_photo/gif/spider_man.gif", title: "Spider-Man Ad", desc: "Character-driven interactive banner", ratio: "9/20" },
  { img: "works_photo/gif/hit.gif", title: "Hit Ad", desc: "Animated interstitial advertisement", ratio: "9/20" },
  { img: "works_photo/jpg/Door.png", title: "Door Ad", desc: "Full-page takeover creative" },
  { img: "works_photo/jpg/bottom.png", title: "Bottom Banner", desc: "Sticky bottom banner layout" },
];

const grid = document.getElementById("works-grid");

works.forEach((work, i) => {
  const card = document.createElement("div");
  card.className = "bg-[#1a1a1a] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 card-hidden";
  card.dataset.index = i;
  card.innerHTML = `
    <img src="${work.img}" alt="${work.title}" class="w-full object-cover" style="${work.ratio ? `aspect-ratio:${work.ratio}` : ''}" loading="lazy">
    <div class="p-4">
      <h3 class="font-bold text-lg">${work.title}</h3>
      <p class="text-gray-400 text-sm mt-1">${work.desc}</p>
    </div>
  `;
  grid.appendChild(card);
});

function getColumns() {
  const gridStyle = getComputedStyle(grid);
  return gridStyle.gridTemplateColumns.split(" ").length;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = Number(card.dataset.index);
        const cols = getColumns();
        const colPosition = index % cols;
        card.style.animationDelay = `${colPosition * 150}ms`;
        card.classList.remove("card-hidden");
        card.classList.add("card-visible");
        observer.unobserve(card);
      }
    });
  },
  { threshold: 0.1 }
);

grid.querySelectorAll(".card-hidden").forEach((card) => observer.observe(card));
