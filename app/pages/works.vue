<script setup lang="ts">
import spiderMan from '../assets/videos/spider_man.mp4'
import gallery from '../assets/videos/3d_gallery.mp4'
import superlike from '../assets/videos/superlike.mp4'
import hor from '../assets/videos/hor.mp4'
import hit from '../assets/videos/hit.mp4'
import hit_v from '../assets/videos/hit_v.mp4'
import door from '../assets/images/Door.webp'
import bottom from '../assets/images/bottom.webp'
import autoSolve from '../assets/images/autoSolve.webp'
import fullway from '../assets/images/fullway.webp'

useSeo({
	title: 'Baird MA / Frontend Engineer/Photographer - Works',
	description: 'Frontend engineer and photographer in Taiwan.',
})

const works = {
	ad: [
		{
			type: 'video',
			tag: ['AD'],
			src: spiderMan,
			title: 'Spider-Man Ad',
			desc: '與設計共同配合發想的格式，使用 WebGL 渲染技術加上特殊格式影片做出在網頁上呈現的 透明影片效果。',
			ratio: '9/20',
		},
		{
			type: 'video',
			tag: ['AD'],
			src: gallery,
			title: '3D Gallery Ad',
			desc: '第一個獨立學習使用 WebGL 開發出來的格式，根本上的展演與 CSS 視覺上略有不同。',
			ratio: '9/20',
		},
		{
			type: 'video',
			src: superlike,
			title: 'Superlike Ad',
			desc: '以短影片為主題所做出的文中滿版產品，搭配可互動特效以及展演達到吸睛效果。',
			ratio: '9/20',
			tag: ['AD'],
		},
		{
			type: 'video',
			src: hit,
			title: 'Interactive Ad',
			desc: '三秒蓋板動畫加上可互動式 Banner，主打滑主頁面時能一邊瀏覽又能一邊與廣告互動。',
			ratio: '9/20',
			tag: ['AD'],
		},
		{
			type: 'video',
			src: hit_v,
			title: 'Interactive Video Ad',
			desc: '與前者相同，但差別在此處的 Banner 內包含了 Video，如何對齊是數學的奧妙。',
			ratio: '9/20',
			tag: ['AD'],
		},
		{
			type: 'video',
			src: hor,
			title: 'Bottom Cover Ad',
			desc: '手機置底半蓋板，按了下之後還有較小的 Banner 出現，大幅提升點擊率的戰略產品。',
			ratio: '9/20',
			tag: ['AD'],
		},
		{
			src: door,
			title: 'Desktop Door Ad',
			desc: '桌機格式，這個產品讓設計可以完全發揮把視覺全部連接起來，實際呈現非常有氣勢。',
			ratio: '1920/1080',
			tag: ['AD'],
		},
		{
			src: bottom,
			title: 'Desktop Bottom Banner',
			desc: '桌機置底格式，保留了幾乎不干擾閱讀又能展現漂亮廣告的彈性。',
			ratio: '1920/1080',
			tag: ['AD'],
		},
	],
	tools: [
		{
			src: autoSolve,
			title: 'Autosolve',
			desc: '串接 AI 自動寫程式解決小型 issue 工具。',
			ratio: '1920/1080',
			tag: ['AI Tools', 'Codex', 'Claude'],
		},
	],
	soho: [
		{
			src: fullway,
			title: 'Fullway',
			desc: 'https://www.fullwaymarine.com.tw/ 因業主只需要一頁所以只用了簡單的 github page + Cloudflare  架起。',
			ratio: '1920/1080',
			tag: ['Website', 'CloudFlare'],
		},
	],
}
const sections = [
	{ title: 'Advertising', items: works.ad },
	{ title: 'Tools', items: works.tools },
	{ title: 'SOHO Works', items: works.soho },
]

const root = useTemplateRef('root')
let observer: IntersectionObserver | undefined

onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue
				entry.target.classList.add('is-inview')
				observer?.unobserve(entry.target)
			}
		},
		{ rootMargin: '0px 0px -30% 0px' },
	)
	root.value
		?.querySelectorAll('.fadeUp')
		.forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<section ref="root" class="works">
		<h1 class="works_pageTitle fadeUp">> Portfolio</h1>

		<section
			v-for="section in sections"
			:key="section.title"
			class="works_group"
		>
			<h2 class="works_heading fadeUp">{{ section.title }}</h2>

			<div class="works_list">
				<WorkCard
					v-for="item in section.items"
					v-bind="item"
					:key="item.title"
				/>
			</div>
		</section>
	</section>
</template>

<style scoped>
.works {
	width: 92vw;
	margin: 0 auto;
	padding: 16vh 0 12vh;
}

.works_group + .works_group {
	margin-top: 16vh;
}

.fadeUp {
	opacity: 0;
	translate: 0 1.5rem;
	transition:
		opacity 0.9s cubic-bezier(0.19, 1, 0.22, 1),
		translate 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}

.fadeUp.is-inview {
	opacity: 1;
	translate: 0 0;
}

.works_pageTitle {
	margin: 0 0 14vh;
	/* 跟 nav 同一套：白字靠 difference 反轉，背景深淺都讀得到 */
	color: #0000009c;
	font-size: 2vw;
	font-weight: bold;
	line-height: 1.1;
	text-transform: uppercase;
	font-family: 'Yanone Kaffeesatz', sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
}

.works_heading {
	margin: 0 0 6vh;
	font-size: clamp(1.5rem, 3.2vw, 2.25rem);
	font-weight: bold;
	line-height: 1.2;
	text-align: center;
	text-transform: uppercase;
}

.works_list {
	/* 兩個旋鈕：一排幾個、卡片多寬。欄距是省下來的寬度平分的結果 */
	--cols: 3;
	--card-w: 20%;

	display: flex;
	flex-wrap: wrap;
	gap: 90px calc((100% - var(--card-w) * var(--cols)) / (var(--cols) - 1));
	align-items: flex-start;
}

.works_list > * {
	width: var(--card-w);
}

@media (prefers-reduced-motion: reduce) {
	.fadeUp {
		opacity: 1;
		translate: none;
		transition: none;
	}
}

@media (max-width: 768px) {
	.works {
		padding-top: 16vh;
	}

	.works_list {
		--cols: 1;
		--card-w: 100%;
		gap: 60px;
	}

	.works_pageTitle {
		font-size: 1em;
	}
}
</style>
