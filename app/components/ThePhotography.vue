<script setup>
import p2 from '~/assets/images/p2.jpg'
import p3 from '~/assets/images/p3.jpg'
import p4 from '~/assets/images/p4.jpg'
import p5 from '~/assets/images/p5.jpg'

// taglinePos / datePos：tl 左上、tr 右上、bl 左下、br 右下，預設左下
const photos = [
	{
		src: p4,
		tagline: 'KAOHSIUNG',
		taglinePos: 'tr',
		date: '2025.03',
		datePos: 'bl',
	},
	{
		src: p3,
		tagline: 'TAINAN',
		taglinePos: 'bl',
		date: '2025.05',
		datePos: 'bl',
	},
	{
		src: p5,
		tagline: 'SETOUCHI',
		taglinePos: 'bl',
		date: '2024.10',
		datePos: 'bl',
	},
	{
		src: p2,
		tagline: 'TAINAN',
		taglinePos: 'bl',
		date: '2026.07',
		datePos: 'br',
	},
]

const title = 'PHOTOGRAPHY'
const subtitle = 'world as I see it'

const infos = useTemplateRef('infos')
const heading = useTemplateRef('heading')
// tagline 和 date 可能被放在不同角落，露出的時機不同，各自記
const shown = reactive({})
const titleShown = ref(false)

let observer

onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.target === heading.value) {
					titleShown.value = entry.isIntersecting
				} else {
					shown[entry.target.dataset.key] = entry.isIntersecting
				}
			}
		},
		{ threshold: 1 },
	)
	for (const element of infos.value ?? []) {
		observer.observe(element)
	}
	if (heading.value) observer.observe(heading.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<section class="photography" :style="{ '--count': photos.length }">
		<div class="photo_stage">
			<div class="photo_tagline">
				<span
					ref="heading"
					class="photo_tagline_text"
					:class="{ 'is-inview': titleShown }"
				>
					<span
						v-for="(char, i) in title"
						:key="i"
						class="char"
						:style="{ '--i': i }"
					>
						<span>{{ char }}</span>
					</span>
				</span>
				<span class="photo_tagline_sub" :class="{ 'is-inview': titleShown }">
					<span class="char" :style="{ '--i': title.length }">
						<span>{{ subtitle }}</span>
					</span>
				</span>
				<span class="photo_scrollline" aria-hidden="true"></span>
			</div>
			<article
				v-for="(photo, i) in photos"
				:key="i"
				class="photo_card"
				:style="{ '--i': i }"
			>
				<div class="photo_img">
					<img :src="photo.src" alt="" loading="lazy" />
				</div>
				<span
					ref="infos"
					class="photo_info tagline"
					:class="[photo.taglinePos ?? 'bl', { 'is-inview': shown[`${i}-t`] }]"
					:data-key="`${i}-t`"
				>
					{{ photo.tagline }}
				</span>
				<span
					ref="infos"
					class="photo_info date"
					:class="[photo.datePos ?? 'bl', { 'is-inview': shown[`${i}-d`] }]"
					:data-key="`${i}-d`"
				>
					{{ photo.date }}
				</span>
			</article>
		</div>
	</section>
</template>

<style scoped>
.photography {
	--rise: 100dvh;
	--hold: 80dvh;
	--from-scale: 0.5;
	/* 卡片開始到結束 */
	--step: calc(var(--rise) + var(--hold));
	/* 第一 cut 字停留的距離 */
	--lead: 80dvh;

	width: 100%;
	/* 舞台自己一個視窗高，其餘都是釘住期間要走的距離 */
	height: calc(100dvh + var(--lead) + var(--count) * var(--step));
	/* 這一段的進出視窗進度，就是下面每張卡片翻上來的依據 */
	view-timeline: --photos block;
}

.photo_stage {
	position: sticky;
	top: 0;
	width: 100%;
	height: 100dvh;
	/* 還沒翻上來的卡片藏在下緣外 */
	overflow: hidden;
}

/* 卡片的 z-index 從 0 起跳，同層而排在前面，所以一律被蓋住 */
.photo_tagline {
	position: absolute;
	inset: 0;
	z-index: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* 線佔了下半部，整組往下推才會回到視覺中間 */
	padding-top: 20dvh;
	gap: 0.35em;
	font-size: clamp(2.5rem, 7vw, 8rem);
	font-weight: 700;
	letter-spacing: 0.04em;
	line-height: 1;
	user-select: none;
}

.photo_tagline_sub {
	font-size: clamp(1.125rem, 1.9vw, 2.125rem);
	font-weight: 400;
	letter-spacing: 0.2em;
	opacity: 0.7;
}

/* 跟 hero 同一條：先由上往下畫滿，再由上往下收掉 */
.photo_scrollline {
	width: 1px;
	height: 50vh;
	margin-top: 2rem;
	background-color: var(--cursor-color);
	animation: scroll-line 2.4s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes scroll-line {
	0% {
		transform: scaleY(0);
		transform-origin: 50% 0;
	}
	50% {
		transform: scaleY(1);
		transform-origin: 50% 0;
	}
	50.1% {
		transform: scaleY(1);
		transform-origin: 50% 100%;
	}
	100% {
		transform: scaleY(0);
		transform-origin: 50% 100%;
	}
}

/* 每個字一個遮罩，字從它的下緣升上來 */
.photo_tagline .char {
	display: inline-block;
	overflow: hidden;
	/* inline-block 的 overflow 一旦不是 visible，行框會被撐高，改成 top 對齊就不會 */
	vertical-align: top;
}

.photo_tagline .char > span {
	display: inline-block;
	translate: 0 100%;
}

/* 整行露出來才播，每個字晚一點點出場就成了由左往右的波浪 */
.photo_tagline .is-inview .char > span {
	animation: char-rise 1s cubic-bezier(0.19, 1, 0.22, 1) both;
	animation-delay: calc(var(--i) * 35ms);
}

@keyframes char-rise {
	from {
		translate: 0 100%;
	}
	to {
		translate: 0 0;
	}
}

.photo_card {
	position: absolute;
	inset: 0;
	/* 後面的疊在前面的上面 */
	z-index: var(--i);
	/* 這張卡片在「釘住期間」開始翻、翻完的兩個時間點，單位是捲動距離 */
	--start: calc(var(--lead) + var(--i) * var(--step));
	--end: calc(var(--start) + var(--rise));

	translate: 0 100%;
	scale: var(--from-scale);
	animation: card-rise linear both;
	/* 注意：animation-timeline 必須寫在 animation 簡寫之後，否則會被重設成 auto */
	animation-timeline: --photos;
	/*
	 * contain = 這一段完全蓋滿視窗的期間，剛好等於 sticky 釘住的那段，
	 * 所以翻頁的進度跟使用者捲動的進度是一比一對上的。
	 */
	animation-range: contain var(--start) contain var(--end);
}

@keyframes card-rise {
	from {
		translate: 0 100%;
		scale: var(--from-scale);
	}
	50% {
		scale: calc(var(--from-scale) + (1 - var(--from-scale)) * 0.8) 1;
	}
	to {
		translate: 0 0;
		scale: 1;
	}
}

.photo_img,
.photo_img img {
	width: 100%;
	height: 100%;
}

.photo_img img {
	object-fit: cover;
}

.photo_card::after {
	content: '';
	position: absolute;
	inset: auto 0 0 0;
	height: 40%;
	background: linear-gradient(to top, #0009, transparent);
	pointer-events: none;
}

/* 文字整塊露出來就自己播完，不跟捲動綁在一起 */
.photo_info {
	position: absolute;
	z-index: 1;
	max-width: calc(100% - var(--gutter) * 2);
	color: #fff;
	line-height: 1.4;
	user-select: none;
	opacity: 0;
	translate: 0 1rem;
	transition:
		opacity 0.8s ease-out,
		translate 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.photo_info.tl,
.photo_info.tr {
	top: var(--gutter);
}

.photo_info.bl,
.photo_info.br {
	bottom: var(--gutter);
}

.photo_info.tl,
.photo_info.bl {
	left: var(--gutter);
}

.photo_info.tr,
.photo_info.br {
	right: var(--gutter);
	text-align: right;
}

.photo_info.is-inview {
	opacity: 1;
	translate: 0 0;
}

.photo_info.tagline {
	font-size: 6vw;
	font-weight: 700;
	letter-spacing: 0.04em;
	top: 4%;
}

.photo_info.date {
	font-size: clamp(0.75rem, 1vw, 1rem);
	letter-spacing: 0.14em;
	/* 用顏色壓淡就好，改 opacity 會蓋掉進場用的那個 */
	color: #ffffffcc;
}

@media (prefers-reduced-motion: reduce) {
	.photo_card {
		animation: none;
		translate: none;
		scale: none;
	}
	.photo_info {
		opacity: 1;
		translate: none;
	}
	.photo_tagline .char > span {
		translate: none;
	}
}
</style>
