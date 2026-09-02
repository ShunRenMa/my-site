<script setup>
import p2 from '~/assets/images/p2.jpg'
import p3 from '~/assets/images/p3.jpg'
import p4 from '~/assets/images/p4.jpg'
import p5 from '~/assets/images/p5.jpg'

// 之後往下加物件就好，高度和動畫區間會自己算
const photos = [
	{ src: p4, tagline: 'LIGHT THAT ONLY LASTS A MOMENT.', date: '2025.03' },
	{ src: p3, tagline: 'THE CITY KEEPS ITS OWN RHYTHM.', date: '2025.05' },
	{ src: p5, tagline: 'LIGHT THAT ONLY LASTS A MOMENT.', date: '2025.03' },
	{ src: p2, tagline: 'THE CITY KEEPS ITS OWN RHYTHM.', date: '2025.05' },
]

const infos = useTemplateRef('infos')
const shown = ref(photos.map(() => false))

let observer

onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				shown.value[+entry.target.dataset.i] = entry.isIntersecting
			}
		},
		{ threshold: 1 },
	)
	for (const element of infos.value ?? []) {
		observer.observe(element)
	}
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<section class="photography" :style="{ '--count': photos.length }">
		<div class="photo_stage">
			<article
				v-for="(photo, i) in photos"
				:key="i"
				class="photo_card"
				:style="{ '--i': i }"
			>
				<div class="photo_img">
					<img :src="photo.src" alt="" loading="lazy" />
				</div>
				<div
					ref="infos"
					class="photo_info"
					:class="{ 'is-inview': shown[i] }"
					:data-i="i"
				>
					<span class="tagline">{{ photo.tagline }}</span>
					<span class="date">{{ photo.date }}</span>
				</div>
			</article>
		</div>
	</section>
</template>

<style scoped>
.photography {
	--rise: 100dvh;
	--hold: 80dvh;
	/* 翻上來時從幾倍大小開始，1 = 不縮放 */
	--from-scale: 0.5;
	/* 一張卡片從開始翻到停完，佔掉的捲動距離 */
	--step: calc(var(--rise) + var(--hold));

	width: 100%;
	/* 舞台自己一個視窗高，其餘都是釘住期間要走的距離 */
	height: calc(100dvh + var(--hold) + (var(--count) - 1) * var(--step));
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

.photo_card {
	position: absolute;
	inset: 0;
	/* 後面的疊在前面的上面 */
	z-index: var(--i);
	/* 這張卡片在「釘住期間」開始翻、翻完的兩個時間點，單位是捲動距離 */
	--start: calc(var(--hold) + (var(--i) - 1) * var(--step));
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

/* 第一張前面沒有釘住的區間可用，改用整段捲進視窗的那 100dvh 來翻 */
.photo_card:first-child {
	animation-range: entry 0% contain 0%;
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
	left: var(--gutter);
	bottom: var(--gutter);
	z-index: 1;
	display: flex;
	flex-direction: column;
	color: #fff;
	line-height: 1.4;
	user-select: none;
	opacity: 0;
	translate: 0 1rem;
	transition:
		opacity 0.8s ease-out,
		translate 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.photo_info.is-inview {
	opacity: 1;
	translate: 0 0;
}

.photo_info .tagline {
	font-size: clamp(1.25rem, 2.4vw, 2.5rem);
	font-weight: 700;
	letter-spacing: 0.04em;
}

.photo_info .date {
	font-size: clamp(0.75rem, 1vw, 1rem);
	letter-spacing: 0.14em;
	opacity: 0.8;
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
}
</style>
