<script setup lang="ts">
const DURATION = 2000
const TIMEOUT = 4000
// 揭幕動畫長度
const OUT = 1700
const BACKSTOP = OUT + 400
const KNEE = 0.65
const R = 54
const C = 2 * Math.PI * R

const progress = ref(0)
const leaving = ref(false)
const gone = ref(false)

const dashoffset = computed(() => C * (1 - progress.value / 100))
const label = computed(() => String(progress.value).padStart(3, '0'))
const wipeEnd = useState('wipeEnd', () => false)

function ready() {
	const jobs = Array.from(document.images)
		.filter((img) => img.currentSrc || img.src)
		.filter((img) => img.getBoundingClientRect().top < window.innerHeight)
		.map((img) =>
			img.complete
				? img.decode().catch(() => {})
				: new Promise<void>((done) => {
						img.addEventListener('load', () => done(), { once: true })
						img.addEventListener('error', () => done(), { once: true })
					}),
		)

	return Promise.race([
		Promise.allSettled(jobs),
		new Promise((done) => setTimeout(done, TIMEOUT)),
	])
}

let raf = 0
let backstop = 0

function finish() {
	cancelAnimationFrame(raf)
	progress.value = 100
	leaving.value = true
	document.documentElement.style.overflow = ''
	// 背景分頁不會派送 animationend，補一道保險
	backstop = window.setTimeout(() => (gone.value = true), BACKSTOP)

	window.setTimeout(() => {
		wipeEnd.value = true
	}, OUT * 0.8)
}

onMounted(() => {
	document.documentElement.style.overflow = 'hidden'

	const start = performance.now()
	const tick = (now: number) => {
		const t = Math.min((now - start) / DURATION, 1)
		// KNEE 之前衝到 90%，之後慢慢磨完剩下的
		const u = t / KNEE
		const eased =
			t < KNEE
				? 0.9 * (u < 0.5 ? 4 * u ** 3 : 1 - Math.pow(-2 * u + 2, 3) / 2)
				: 0.9 + (0.1 * (t - KNEE)) / (1 - KNEE)
		progress.value = Math.min(Math.round(eased * 100), 99)
		raf = requestAnimationFrame(tick)
	}
	raf = requestAnimationFrame(tick)

	Promise.all([
		ready(),
		new Promise((done) => setTimeout(done, DURATION)),
	]).then(finish)
})

onBeforeUnmount(() => {
	cancelAnimationFrame(raf)
	clearTimeout(backstop)
	document.documentElement.style.overflow = ''
})
</script>

<template>
	<div
		v-if="!gone"
		class="loading"
		:class="{ leaving }"
		:style="{ '--out': `${OUT}ms` }"
		@animationend.self="gone = true"
	>
		<div class="inner">
			<svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
				<circle class="track" cx="60" cy="60" :r="R" />
				<circle
					class="bar"
					cx="60"
					cy="60"
					:r="R"
					:stroke-dasharray="C"
					:stroke-dashoffset="dashoffset"
				/>
			</svg>
			<span class="num">{{ label }}</span>
		</div>
	</div>
</template>

<style scoped>
.loading {
	position: fixed;
	inset: 0;
	z-index: 2147483647;
	display: grid;
	place-items: center;
	background: var(--blue-900);
	clip-path: polygon(
		0 0,
		100% 0,
		100% 100%,
		87.5% 100%,
		75% 100%,
		62.5% 100%,
		50% 100%,
		37.5% 100%,
		25% 100%,
		12.5% 100%,
		0 100%
	);
	font-family: 'Yanone Kaffeesatz', sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
}
.loading.leaving {
	animation: loading-out var(--out) cubic-bezier(0.785, 0.135, 0.15, 0.86)
		forwards;
}
.loading.leaving .inner {
	animation: loading-fade 0.35s ease-out forwards;
}

.inner {
	position: relative;
	display: grid;
	place-items: center;
	width: 120px;
	height: 120px;
}
.ring {
	width: 100%;
	height: 100%;
	transform: rotate(-90deg);
	overflow: visible;
}
.ring circle {
	fill: none;
	stroke-width: 1;
}
.track {
	stroke: var(--blue-100);
	opacity: 0.2;
}
.bar {
	stroke: var(--blue-100);
	stroke-linecap: round;
}
.num {
	position: absolute;
	font-size: 18px;
	line-height: 1;
	font-variant-numeric: tabular-nums;
	letter-spacing: 0.08em;
	color: var(--blue-50);
}

@keyframes loading-fade {
	to {
		opacity: 0;
	}
}

@keyframes loading-out {
	0% {
		transform: translateY(0);
		clip-path: polygon(
			0 0,
			100% 0,
			100% 100%,
			87.5% 100%,
			75% 100%,
			62.5% 100%,
			50% 100%,
			37.5% 100%,
			25% 100%,
			12.5% 100%,
			0 100%
		);
	}
	20% {
		clip-path: polygon(
			0 0,
			100% 0,
			100% 100%,
			87.5% 98%,
			75% 100%,
			62.5% 98%,
			50% 100%,
			37.5% 98%,
			25% 100%,
			12.5% 98%,
			0 100%
		);
	}
	55% {
		clip-path: polygon(
			0 0,
			100% 0,
			100% 98%,
			87.5% 100%,
			75% 98%,
			62.5% 100%,
			50% 98%,
			37.5% 100%,
			25% 98%,
			12.5% 100%,
			0 98%
		);
	}
	85% {
		clip-path: polygon(
			0 0,
			100% 0,
			100% 100%,
			87.5% 98%,
			75% 100%,
			62.5% 98%,
			50% 100%,
			37.5% 98%,
			25% 100%,
			12.5% 98%,
			0 100%
		);
	}
	100% {
		transform: translateY(-100%);
		clip-path: polygon(
			0 0,
			100% 0,
			100% 100%,
			87.5% 100%,
			75% 100%,
			62.5% 100%,
			50% 100%,
			37.5% 100%,
			25% 100%,
			12.5% 100%,
			0 100%
		);
	}
}

@media (prefers-reduced-motion: reduce) {
	.loading.leaving {
		animation: loading-fade 0.2s ease-out forwards;
	}
	.loading.leaving .inner {
		animation: none;
	}
}
</style>
