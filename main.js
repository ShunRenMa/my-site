const works = [
  { img: "works_photo/gif/spider_man.gif", title: "Spider-Man Ad", desc: "第一個與設計共同配合發想的格式，使用 WebGL 渲染技術加上特殊格式影片做出在網頁上呈現的 透明影片效果。", ratio: "9/20" },
  { img: "works_photo/gif/3d_gallery.gif", title: "3D Gallery Ad", desc: "第一個獨立學習使用 WebGL 開發出來的格式，根本上的展演與 CSS 視覺上略有不同。", ratio: "9/20" },
  { img: "works_photo/gif/superlike.gif", title: "Superlike Ad", desc: "以短影片為主題所做出的文中滿版產品，搭配可互動特效以及展演達到吸睛效果。", ratio: "9/20" },
  { img: "works_photo/gif/hit.gif", title: "Interactive Ad", desc: "三秒蓋板動畫加上可互動式 Banner，主打滑主頁面時能一邊瀏覽又能一邊與廣告互動。", ratio: "9/20" },
  { img: "works_photo/gif/hit_v.gif", title: "Interactive Video Ad", desc: "與前者相同，但差別在此處的 Banner 內包含了 Video，如何對齊是數學的奧妙。", ratio: "9/20" },
  { img: "works_photo/gif/hor.gif", title: "Bottom Cover Ad", desc: "手機置底半蓋板，按了下之後還有較小的 Banner 出現，大幅提升點擊率的戰略產品。", ratio: "9/20" },
  { img: "works_photo/jpg/Door.png", title: "Desktop Door Ad", desc: "桌機格式做過最滿意的作品，這個產品讓設計可以完全發揮把視覺全部連接起來，實際呈現非常有氣勢。" },
  { img: "works_photo/jpg/bottom.png", title: "Desktop Bottom Banner", desc: "桌機置底格式，保留了幾乎不干擾閱讀又能展現漂亮廣告的彈性。" },
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
