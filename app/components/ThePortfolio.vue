<script setup>
import gallery3d from '~/assets/videos/3d_gallery.mp4'
import hit from '~/assets/videos/hit.mp4'
import hitV from '~/assets/videos/hit_v.mp4'
import hor from '~/assets/videos/hor.mp4'
import spiderMan from '~/assets/videos/spider_man.mp4'
import superlike from '~/assets/videos/superlike.mp4'

const columns = [
	{
		travel: '-30%',
		duration: '38s',
		start: '0vh',
		items: [
			{ src: hor, offset: '4%', ratio: '384 / 864' },
			{ src: superlike, offset: '44%', ratio: '384 / 864' },
			{ src: gallery3d, offset: '18%', ratio: '384 / 864' },
		],
	},
	{
		travel: '-34%',
		duration: '52s',
		start: '-27vh',
		items: [
			{ src: spiderMan, offset: '22%', ratio: '384 / 864' },
			{ src: gallery3d, offset: '58%', ratio: '384 / 864' },
			{ src: hitV, offset: '8%', ratio: '384 / 864' },
		],
	},
	{
		travel: '-26%',
		duration: '44s',
		start: '-11vh',
		items: [
			{ src: hit, offset: '36%', ratio: '768 / 1222' },
			{ src: hor, offset: '62%', ratio: '384 / 864' },
			{ src: superlike, offset: '30%', ratio: '384 / 864' },
		],
	},
	{
		travel: '-30%',
		duration: '46s',
		start: '-38vh',
		items: [
			{ src: superlike, offset: '12%', ratio: '384 / 864' },
			{ src: spiderMan, offset: '48%', ratio: '384 / 864' },
			{ src: hitV, offset: '26%', ratio: '384 / 864' },
		],
	},
]

const stage = useTemplateRef('stage')

// 捲到位才讓影片區浮出來
const marqueeShown = useInviewOnce(stage)

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
		<div ref="stage" class="portfolio_stage">
			<TheSplitTitle
				class="portfolio_title"
				text="Portfolio."
				line="static"
				size="4em"
			/>

			<div class="portfolio_marquee" :class="{ 'is-inview': marqueeShown }">
				<div
					v-for="(column, columnIndex) in columns"
					:key="columnIndex"
					class="portfolio_col"
					:style="{
						'--travel': column.travel,
						'--start': column.start,
						'--duration': column.duration,
					}"
				>
					<!--
						同一份清單印三份：自動循環位移 -1/3（剛好一份的高度）就能無縫接回，
						剩下的 2/3 留給捲動位移。後兩份是純視覺的複製品，對輔助技術隱藏。
					-->
					<div class="portfolio_track">
						<div
							v-for="(item, itemIndex) in [
								...column.items,
								...column.items,
								...column.items,
							]"
							:key="itemIndex"
							class="portfolio_item"
							:style="{ '--offset': item.offset, '--ratio': item.ratio }"
							:aria-hidden="
								itemIndex >= column.items.length ? 'true' : undefined
							"
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
		</div>
	</section>
</template>

<style scoped>
.portfolio {
	/*
	 * 上面留一段空白，讓 profile 那張探出來的照片有地方落下，不會壓到標題。
	 * 用 margin 不用 padding：padding 會被算進 view-timeline 的量測範圍，
	 * contain 就對不上 sticky 釘住的期間，跑馬燈的進度會歪掉。
	 */
	margin-top: 30dvh;
	height: 300dvh;
	/* 這一段的進出視窗進度，就是下面每欄位移的依據 */
	view-timeline: --portfolio block;
}

.portfolio_stage {
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	/* 標題在上、影片區靠下 */
	justify-content: space-between;
	width: 100%;
	height: 100dvh;
	padding: 0 var(--gutter);
}

/* 影片只佔下面 80%，上面留給標題 */
.portfolio_marquee {
	display: flex;
	gap: 2vw;
	align-items: flex-start;
	width: 100%;
	height: 80%;
	/* 超出的部分要裁掉，循環才看不出接縫 */
	overflow: hidden;
	opacity: 0;
	translate: 0 4vh;
	transition:
		opacity 1s ease-out,
		translate 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.portfolio_marquee.is-inview {
	opacity: 1;
	translate: 0 0;
}

.portfolio_col {
	flex: 1;
	min-width: 0;
}

.portfolio_track {
	display: flex;
	flex-direction: column;
	/* 每欄往上推不同距離，起跑點才不會切齊 */
	margin-top: var(--start);
	/*
	 * 兩個動畫同時跑：一個看時間、一個看捲動。
	 * 一個 animation 只能綁一條 timeline，所以必須拆成兩條，
	 * 而且各動各的屬性（translate / transform）才不會互相覆蓋。
	 */
	animation:
		marquee-auto var(--duration) linear infinite,
		marquee-scroll linear both;
	/* 注意：animation-timeline 必須寫在 animation 簡寫之後，否則會被重設成 auto */
	animation-timeline: auto, --portfolio;
	/*
	 * contain = 這一段完全蓋滿視窗的期間，剛好等於 sticky 釘住的那段。
	 * 所以捲動位移的進度跟使用者捲動的進度是一比一對上的。
	 */
	animation-range:
		normal,
		contain 0% contain 100%;
	will-change: translate, transform;
}

.portfolio_item {
	margin-bottom: 12vh;
	margin-left: var(--offset);
	width: 40%;
}

.portfolio_item video {
	display: block;
	width: 100%;
	aspect-ratio: var(--ratio);
	object-fit: cover;
}

/*
 * 偶數欄反著跑：寫一個值會同時套用到兩個動畫，
 * 所以自動循環和捲動位移會一起顛倒，整欄一致往下。
 */
.portfolio_col:nth-child(even) .portfolio_track {
	animation-direction: reverse;
}

/* 自動循環：位移剛好一份清單的高度（三份中的 1/3），接回起點時看不出來 */
@keyframes marquee-auto {
	from {
		translate: 0 0;
	}
	to {
		translate: 0 -33.3333%;
	}
}

/* 捲動位移：量由各欄的 --travel 決定，跟上面那條相加 */
@keyframes marquee-scroll {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(var(--travel));
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
	.portfolio_marquee {
		transition: none;
		opacity: 1;
		translate: none;
	}

	.portfolio_track {
		animation: none;
	}
}

.portfolio_title {
	margin: 0;
	font-weight: bold;
	/*
	 * 用 text-transform 而不是直接把 text 寫成大寫，
	 * 這樣 aria-label 還是 "Portfolio."，讀螢幕軟體不會把它逐字拼出來。
	 */
	text-transform: uppercase;
}
</style>
