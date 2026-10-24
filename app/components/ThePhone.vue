<script setup>
const props = defineProps({
	src: { type: String, required: true },
	rotate: { type: Number, default: 0 },
})

// 圓角邊框疊成多層來做厚度，平面側板接不起圓角
const SLICES = 32
const PLATEAU_SLICES = 6
</script>

<template>
	<div class="phone" :style="{ '--ry': props.rotate }">
		<div class="phone_body">
			<div
				v-for="i in SLICES"
				:key="i"
				class="phone_slice"
				:style="{ '--i': (i - 1) / (SLICES - 1) }"
			></div>

			<span class="phone_btn is-left is-action"></span>
			<span class="phone_btn is-left is-vol-up"></span>
			<span class="phone_btn is-left is-vol-down"></span>
			<span class="phone_btn is-right is-power"></span>
			<span class="phone_btn is-right is-camera"></span>

			<div class="phone_front">
				<div class="phone_screen">
					<video :src="props.src" muted loop playsinline autoplay></video>
					<span class="phone_island"></span>
					<span class="phone_glare"></span>
				</div>
			</div>

			<div class="phone_back">
				<div
					v-for="i in PLATEAU_SLICES"
					:key="i"
					class="phone_plateau"
					:style="{ '--i': i / PLATEAU_SLICES }"
				>
					<template v-if="i === PLATEAU_SLICES">
						<div class="phone_camera">
							<span class="phone_lens"></span>
							<span class="phone_lens"></span>
							<span class="phone_lens"></span>
						</div>
						<span class="phone_flash"></span>
						<span class="phone_lidar"></span>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.phone {
	--w: var(--phone-w, 300px);
	/* iPhone 18 Pro Max：163.4 × 78 × 8.75 mm */
	--h: calc(var(--w) * 163.4 / 78);
	--d: calc(var(--w) * 8.75 / 78);
	--r: calc(var(--w) * 0.16);
	--bezel: calc(var(--w) * 0.02);
	--metal: #c9591f;
	--shell: #e57a3c;

	width: var(--w);
	height: var(--h);
	perspective: 1400px;
}

.phone_body {
	position: relative;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transform: rotateY(calc(var(--ry) * 1deg));
}

.phone_body > * {
	position: absolute;
}

.phone_slice {
	inset: 0;
	border-radius: var(--r);
	/* 中間亮、兩側暗，模擬金屬邊的弧面 */
	background: color-mix(
		in srgb,
		var(--metal),
		#fff calc((0.5 - (var(--i) - 0.5) * (var(--i) - 0.5) * 2) * 50%)
	);
	transform: translateZ(calc(var(--d) * (var(--i) - 0.5)));
}

.phone_btn {
	width: calc(var(--d) * 0.6);
	border-radius: 2px;
	background: linear-gradient(90deg, #a5461a, #f0a06e, #a5461a);
}
.phone_btn.is-left {
	left: 0;
	transform-origin: left;
	transform: translateX(calc(var(--d) * -0.12)) rotateY(90deg)
		translateX(-50%);
}
.phone_btn.is-right {
	right: 0;
	transform-origin: right;
	transform: translateX(calc(var(--d) * 0.12)) rotateY(-90deg)
		translateX(50%);
}
.is-action {
	top: 16%;
	height: 4%;
}
.is-vol-up {
	top: 23%;
	height: 7.5%;
}
.is-vol-down {
	top: 32%;
	height: 7.5%;
}
.is-power {
	top: 24%;
	height: 11%;
}
.is-camera {
	top: 52%;
	height: 7%;
	background: linear-gradient(90deg, #3a3f44, #6b7379, #3a3f44);
}

.phone_front,
.phone_back {
	/* 內縮一點露出金屬邊 */
	inset: calc(var(--w) * 0.006);
	border-radius: calc(var(--r) - var(--w) * 0.006);
	backface-visibility: hidden;
}

.phone_front {
	padding: var(--bezel);
	background: #0b0b0c;
	transform: translateZ(calc(var(--d) / 2 + 0.5px));
}

.phone_screen {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: calc(var(--r) - var(--bezel));
	background: #000;
}

.phone_screen video {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.phone_island {
	position: absolute;
	top: calc(var(--w) * 0.03);
	left: 50%;
	width: 30%;
	height: calc(var(--w) * 0.085);
	border-radius: 999px;
	background: #000;
	translate: -50% 0;
}

.phone_glare {
	position: absolute;
	inset: 0;
	pointer-events: none;
	background: linear-gradient(
		115deg,
		transparent 35%,
		rgb(255 255 255 / 0.14) 48%,
		rgb(255 255 255 / 0.04) 55%,
		transparent 65%
	);
	background-size: 300% 100%;
	/* 轉動時反光跟著滑過去 */
	background-position: calc(var(--ry) / 180 * 100%) 0;
}

.phone_back {
	background:
		radial-gradient(120% 80% at 30% 10%, rgb(255 255 255 / 0.35), transparent 60%),
		var(--shell);
	transform-style: preserve-3d;
	transform: rotateY(180deg) translateZ(calc(var(--d) / 2 + 0.5px));
}

/* 橫跨整個寬度的相機平台，同樣疊層做出凸起 */
.phone_plateau {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: calc(var(--w) * 0.62);
	border-radius: var(--r) var(--r) calc(var(--w) * 0.08)
		calc(var(--w) * 0.08);
	background: color-mix(in srgb, var(--metal), #fff calc(var(--i) * 30%));
	transform: translateZ(calc(var(--d) * 0.16 * var(--i)));
}

.phone_plateau:last-child {
	background:
		radial-gradient(120% 90% at 30% 0%, rgb(255 255 255 / 0.35), transparent 60%),
		var(--shell);
	box-shadow: inset 0 -1px 0 rgb(0 0 0 / 0.08);
}

.phone_camera {
	position: absolute;
	top: calc(var(--w) * 0.05);
	left: calc(var(--w) * 0.05);
	width: 52%;
	aspect-ratio: 1;
	border-radius: 22%;
	background: rgb(255 255 255 / 0.25);
	box-shadow:
		inset 0 0 0 1px rgb(255 255 255 / 0.4),
		0 2px 6px rgb(0 0 0 / 0.15);
}

.phone_lens,
.phone_flash,
.phone_lidar {
	position: absolute;
	border-radius: 50%;
}

.phone_lens {
	width: 44%;
	aspect-ratio: 1;
	background:
		radial-gradient(circle at 35% 35%, #4a5a78 0 8%, transparent 12%),
		radial-gradient(circle, #0c0d10 0 45%, #2a2d33 50% 62%, #9aa3a8 66% 100%);
	box-shadow: 0 1px 3px rgb(0 0 0 / 0.4);
}
.phone_lens:nth-child(1) {
	top: 5%;
	left: 5%;
}
.phone_lens:nth-child(2) {
	bottom: 5%;
	left: 5%;
}
.phone_lens:nth-child(3) {
	top: 28%;
	right: 5%;
}

.phone_flash {
	top: calc(var(--w) * 0.1);
	right: calc(var(--w) * 0.12);
	width: calc(var(--w) * 0.07);
	aspect-ratio: 1;
	background: radial-gradient(circle, #fff6dc, #d8cfb5);
}

.phone_lidar {
	top: calc(var(--w) * 0.36);
	right: calc(var(--w) * 0.125);
	width: calc(var(--w) * 0.06);
	aspect-ratio: 1;
	background: radial-gradient(circle, #1a1c20 40%, #3a3f44);
}
</style>
