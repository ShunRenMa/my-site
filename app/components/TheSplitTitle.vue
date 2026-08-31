<script setup>
/**
 * 逐字浮起 + 底線掃過的標題。捲到位才播，只播一次。
 * 用 \n 分行，空白分字，字元再各自拆成一個 span。
 */
const props = defineProps({
	text: { type: String, required: true },
	// 一頁只該有一個 h1，其他地方用 h2
	tag: { type: String, default: 'h2' },
	/**
	 * 底線的樣式：
	 *   sweep  由左往右畫出來、停一下、再往右收掉，寬度貼齊文字
	 *   static 一條滿框的線，畫出來之後就一直留著
	 */
	line: { type: String, default: 'sweep' },
	// 字級。底線的粗細和位置都用 em，所以會跟著一起縮放
	size: { type: String, default: null },
})

// index 每行各自從 0 算，所以多行會同時展開而不是接力
const lines = computed(() =>
	props.text.split('\n').map((line) => {
		let index = 0
		return line.split(' ').map((word) => ({
			word,
			chars: [...word].map((char) => ({ char, index: index++ })),
		}))
	}),
)

const label = computed(() => props.text.replace(/\n/g, ' '))

const root = useTemplateRef('root')
const shown = useInviewOnce(root)
</script>

<template>
	<!-- 拆成一堆 span 後讀螢幕軟體會逐字念，整段交給 aria-label -->
	<component
		:is="tag"
		ref="root"
		class="splitTitle"
		:class="[`is-line-${line}`, { 'is-inview': shown }]"
		:style="size ? { fontSize: size } : null"
		:aria-label="label"
	>
		<span
			v-for="(line, lineIndex) in lines"
			:key="lineIndex"
			class="splitTitle_line"
			aria-hidden="true"
		>
			<div v-for="(item, wordIndex) in line" :key="wordIndex">
				<span
					v-for="char in item.chars"
					:key="char.index"
					:style="{ '--i': char.index }"
					>{{ char.char }}</span
				>
			</div>
		</span>
	</component>
</template>

<style scoped>
/* 結構跟 hero 一樣，行 > 單字（遮罩）> 字元 */
.splitTitle_line {
	display: block;
	/* 縮到文字寬，底線才不會拉到整個欄位那麼長 */
	width: fit-content;
	position: relative;
}

/*
 * 底線：整段動畫分三拍
 *   0 ~ 19%   由左往右長出來（0.5s）
 *   19 ~ 81%  停著，這段時間讓文字浮上來
 *   81 ~ 100% 往右收掉（0.5s）
 */
.splitTitle_line::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0.35em;
	width: 100%;
	height: 0.045em;
	background-color: var(--cursor-color);
	transform: scaleX(0);
	transform-origin: left center;
}

.splitTitle.is-line-sweep.is-inview .splitTitle_line::after {
	animation: line-sweep 2.6s linear both;
}

/* static：滿框、畫出來就留著，只有出現的那一下有動 */
.splitTitle.is-line-static .splitTitle_line {
	width: auto;
}

.splitTitle.is-line-static .splitTitle_line::after {
	background-color: var(--fg);
	transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
}

.splitTitle.is-line-static.is-inview .splitTitle_line::after {
	transform: scaleX(1);
}

@keyframes line-sweep {
	0% {
		transform: scaleX(0);
		transform-origin: left center;
		animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	}
	19% {
		transform: scaleX(1);
		transform-origin: left center;
	}
	/* 這段 scaleX 都是 1，origin 怎麼插值畫面都一樣，剛好拿來偷換邊 */
	81% {
		transform: scaleX(1);
		transform-origin: right center;
		animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
	}
	100% {
		transform: scaleX(0);
		transform-origin: right center;
	}
}

.splitTitle_line div,
.splitTitle_line div span {
	display: inline-block;
}

.splitTitle_line div {
	overflow: hidden;
	/* 同 hero：overflow 不是 visible 時基線會跑掉，改成 top 對齊 */
	vertical-align: top;
}

.splitTitle_line div:not(:first-child) {
	padding-left: 0.25em;
}

.splitTitle_line div span {
	translate: 0 100%;
}

/* 捲到位才開始跑，每行的 --i 各自從 0 算，所以多行會同時展開 */
.splitTitle.is-inview .splitTitle_line div span {
	animation: char-rise 1s cubic-bezier(0.19, 1, 0.22, 1) both;
	/* 0.5s = 底線畫完的時間，等它到位字才開始浮 */
	animation-delay: calc(0.5s + var(--i) * 35ms);
}

@keyframes char-rise {
	from {
		translate: 0 100%;
	}
	to {
		translate: 0 0;
	}
}

@media (prefers-reduced-motion: reduce) {
	.splitTitle_line div span {
		translate: none;
	}
	.splitTitle.is-inview .splitTitle_line div span,
	.splitTitle.is-inview .splitTitle_line::after {
		animation: none;
	}
	.splitTitle.is-line-static .splitTitle_line::after {
		transition: none;
		transform: scaleX(1);
	}
}
</style>
