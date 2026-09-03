<script setup>
defineProps({
	text: { type: String, required: true },
	repeat: { type: Number, default: 6 },
	height: { type: String, default: '120dvh' },
	// 文字那行的中線落在區塊頂端往下多少，給 % 就會跟著 height 縮放
	top: { type: String, default: '80vh' },
})
</script>

<template>
	<div class="tagLine" :style="{ '--height': height, '--top': top }">
		<!--
			同一份字串印兩份：自動循環位移 -50%（剛好一份的寬度）就能無縫接回。
			第二份是純視覺的複製品，對輔助技術隱藏。
		-->
		<div class="tagLine_track">
			<div
				v-for="copy in 2"
				:key="copy"
				class="tagLine_group"
				:aria-hidden="copy > 1 ? 'true' : undefined"
			>
				<template v-for="i in repeat" :key="i">
					<span class="pipe">|</span>
					<span class="word">{{ text }}</span>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
.tagLine {
	/* 速度由 duration 決定*/
	--duration: 80s;
	/* 字之間的間距，同時也是接縫處的間距（見 .tagLine_group 的 padding-right） */
	--word-gap: 0.4em;
	position: relative;
	width: 100%;
	height: var(--height);
	overflow: hidden;
	font-size: clamp(2.5rem, 7vw, 8rem);
	line-height: 1;
	user-select: none;
}

.tagLine_track {
	position: absolute;
	left: 0;
	top: var(--top);
	display: flex;
	width: max-content;
	/*
	 * 把自己拉高半個身高，讓 80% 對到的是這一行的中線而不是上緣。
	 * 動畫吃的是 translate，這裡用 transform，兩個是不同的 CSS 屬性，
	 * 所以定位和循環位移可以同時掛在同一個元素上不打架。
	 */
	transform: translateY(-50%);
	animation: tagLine-run var(--duration) linear infinite;
	will-change: translate;
}

.tagLine_group {
	display: flex;
	align-items: center;
	gap: var(--word-gap);
	padding-right: var(--word-gap);
	white-space: nowrap;
}

.tagLine_group .pipe {
	font-weight: 700;
	color: black;
	transform: scaleX(0.4);
}

.tagLine_group .word {
	font-weight: 700;
	letter-spacing: 0.04em;
}

/*
 * 位移剛好一份的寬度（兩份中的 1/2），接回起點時看不出來。
 * prefers-reduced-motion 不用另外寫：main.css 的全域規則會讓它一格跳到 -50%，
 * 而 -50% 跟 0% 的畫面長得一樣，等同於直接停住。
 */
@keyframes tagLine-run {
	from {
		translate: 0 0;
	}
	to {
		translate: -50% 0;
	}
}
</style>
