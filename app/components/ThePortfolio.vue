<script setup>
import gallery3d from '~/assets/videos/3d_gallery.mp4'
import hit from '~/assets/videos/hit.mp4'
import hitV from '~/assets/videos/hit_v.mp4'
import hor from '~/assets/videos/hor.mp4'
import spiderMan from '~/assets/videos/spider_man.mp4'
import superlike from '~/assets/videos/superlike.mp4'

const columns = [
	{
		duration: '50s',
		items: [
			{ src: hor, offset: '4%', ratio: '384 / 864' },
			{ src: superlike, offset: '44%', ratio: '384 / 864' },
		],
	},
	{
		duration: '65s',
		items: [
			{ src: spiderMan, offset: '22%', ratio: '384 / 864' },
			{ src: gallery3d, offset: '58%', ratio: '384 / 864' },
			{ src: hitV, offset: '8%', ratio: '384 / 864' },
		],
	},
	{
		duration: '45s',
		items: [
			{ src: hit, offset: '36%', ratio: '768 / 1222' },
			{ src: hor, offset: '62%', ratio: '384 / 864' },
		],
	},
	{
		duration: '48s',
		items: [
			{ src: superlike, offset: '12%', ratio: '384 / 864' },
			{ src: spiderMan, offset: '48%', ratio: '384 / 864' },
		],
	},
]

const stage = useTemplateRef('stage')
let observer

onMounted(() => {
	if (!stage.value) return

	const videos = Array.from(stage.value.querySelectorAll('video'))

	observer = new IntersectionObserver(
		([entry]) => {
			for (const video of videos) {
				if (entry?.isIntersecting) video.play().catch(() => {})
				else video.pause()
			}
		},
		{ threshold: 0 },
	)
	observer.observe(stage.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<section class="portfolio">
		<!-- 外層 400vh，內層釘住 100vh，等於使用者要滑 300vh 才推得走 -->
		<div ref="stage" class="portfolio_stage">
			<div
				v-for="(column, columnIndex) in columns"
				:key="columnIndex"
				class="portfolio_col"
				:style="{ '--duration': column.duration }"
			>
				<!--
					同一份清單印兩次，第二份是為了讓 -50% 位移接得起來。
					它是純視覺的複製品，對輔助技術隱藏。
				-->
				<div class="portfolio_track">
					<div
						v-for="(item, itemIndex) in [...column.items, ...column.items]"
						:key="itemIndex"
						class="portfolio_item"
						:style="{ '--offset': item.offset, '--ratio': item.ratio }"
						:aria-hidden="itemIndex >= column.items.length ? 'true' : undefined"
					>
						<video
							:src="item.src"
							muted
							loop
							playsinline
							preload="metadata"
							tabindex="-1"
						></video>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.portfolio {
	height: 400dvh;
}

.portfolio_stage {
	position: sticky;
	top: 0;
	display: flex;
	gap: 2vw;
	align-items: flex-start;
	width: 100%;
	height: 100dvh;
	padding: 0 var(--gutter);
	overflow: hidden;
}

.portfolio_col {
	flex: 1;
	min-width: 0;
}

.portfolio_track {
	display: flex;
	flex-direction: column;
	animation: marquee var(--duration) linear infinite;
	will-change: transform;
}

.portfolio_item {
	margin-bottom: 12vh;
	margin-left: var(--offset);
	width: 35%;
}

/*
 * aspect-ratio 是必要的：影片在 metadata 載入前沒有內在尺寸，
 * 只寫 width 的話高度會退回瀏覽器對 video 的預設值（固定 150px，跟寬度無關），
 * track 會比欄位還短，循環就露餡，載入後又會跳一次版。
 */
.portfolio_item video {
	display: block;
	width: 100%;
	aspect-ratio: var(--ratio);
	object-fit: cover;
}

@keyframes marquee {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(-50%);
	}
}

@media (max-width: 768px) {
	.portfolio_stage {
		gap: 4vw;
	}
	/* 手機放不下四欄，只留前兩欄 */
	.portfolio_col:nth-child(n + 3) {
		display: none;
	}
}

@media (prefers-reduced-motion: reduce) {
	.portfolio_track {
		animation: none;
	}
}
</style>
