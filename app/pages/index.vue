<script setup>
const layoutClass = 'layout'
</script>

<template>
	<div :class="layoutClass">
		<section class="hero hero_block">
			<div class="hero_content">
				<span class="hero_title_fst">
					<div>
						<span style="--i: 0">M</span>
						<span style="--i: 1">a</span>
						<span style="--i: 2">d</span>
						<span style="--i: 3">e</span>
					</div>
					<div>
						<span style="--i: 4">I</span>
						<span style="--i: 5">n</span>
					</div>
					<div>
						<span style="--i: 6">T</span>
						<span style="--i: 7">a</span>
						<span style="--i: 8">i</span>
						<span style="--i: 9">w</span>
						<span style="--i: 10">a</span>
						<span style="--i: 11">n</span>
						<span style="--i: 12">.</span>
					</div>
				</span>
				<span class="hero_title_sec">
					<div>
						<span style="--i: 0">B</span>
						<span style="--i: 1">u</span>
						<span style="--i: 2">i</span>
						<span style="--i: 3">l</span>
						<span style="--i: 4">d</span>
						<span style="--i: 5">i</span>
						<span style="--i: 6">n</span>
						<span style="--i: 7">g</span>
					</div>
					<div>
						<span style="--i: 8">F</span>
						<span style="--i: 9">o</span>
						<span style="--i: 10">r</span>
					</div>
					<div>
						<span style="--i: 11">T</span>
						<span style="--i: 12">h</span>
						<span style="--i: 13">e</span>
					</div>
					<div>
						<span style="--i: 14">W</span>
						<span style="--i: 15">o</span>
						<span style="--i: 16">r</span>
						<span style="--i: 17">l</span>
						<span style="--i: 18">d</span>
						<span style="--i: 19">.</span>
					</div>
				</span>
			</div>
			<span class="hero_scrollline" aria-hidden="true"></span>
			<div class="hero_img_wrapper">
				<img
					src="~/assets/images/cover1.jpg"
					alt="hero image"
					class="hero__img"
					fetchpriority="high"
				/>
			</div>
			<!-- <div class="hero_profile">
				<img
					src="~/assets/images/profile1.jpg"
					alt="profile image"
					class="hero_profile_img"
					fetchpriority="high"
				/>
			</div> -->
		</section>

		<TheProfile />
		<ThePortfolio />

		<div class="personal_tagLine">
			<!--
				同一份字串印兩份：自動循環位移 -50%（剛好一份的寬度）就能無縫接回。
				第二份是純視覺的複製品，對輔助技術隱藏。
			-->
			<div class="personal_track">
				<div
					v-for="copy in 2"
					:key="copy"
					class="personal_group"
					:aria-hidden="copy > 1 ? 'true' : undefined"
				>
					<template v-for="i in 6" :key="i">
						<span class="pipe">|</span>
						<span class="word">PERSONAL</span>
					</template>
				</div>
			</div>
		</div>
		<ThePhotography />
	</div>
</template>

<style scoped>
.hero_block {
	/* hero 高度的單一來源，視差的 animation-range 也吃這個值 */
	--hero-h: 120dvh;
	display: block;
	width: 100%;
	height: 120vh; /* 不支援 dvh 時的 fallback */
	height: var(--hero-h);
}
.hero {
	/* 讓 hero 內的 absolute 元素以它為基準，而不是整個視窗 */
	position: relative;
	overflow: hidden;
}

.hero_title_fst div,
.hero_title_fst div span,
.hero_title_sec div,
.hero_title_sec div span {
	display: inline-block;
}

/* 每個單字是一個遮罩，字從它的下緣升上來 */
.hero_title_fst div,
.hero_title_sec div {
	overflow: hidden;
	/*
	 * inline-block 的 overflow 一旦不是 visible，行框會被撐高。改成 top 對齊就不會。
	 */
	vertical-align: top;
}

.hero_title_fst div span,
.hero_title_sec div span {
	/*
	 * 進場（時間驅動）用 translate，收回（捲動驅動）用 transform，
	 * 兩個是不同的 CSS 屬性，所以兩個動畫可以同時掛在同一個元素上不打架。
	 */
	translate: 0 100%;
	animation:
		char-rise 1s cubic-bezier(0.19, 1, 0.22, 1) both,
		char-retract linear both;
	/* 每個字晚一點點出場，就成了由左往右的波浪 */
	animation-delay: calc(var(--i) * 35ms), 0s;
	animation-timeline: auto, scroll(root block);
	animation-range:
		normal,
		0 50vh;
}

/* 進場：從遮罩下方升上來 */
@keyframes char-rise {
	from {
		translate: 0 100%;
	}
	to {
		translate: 0 0;
	}
}

/* 滑走：跟著捲動沉回遮罩下方 */
@keyframes char-retract {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}

/* 字距靠 padding 撐開，第一個字不用（不然整行會往右偏） */
.hero_title_fst div:not(:first-child),
.hero_title_sec div:not(:first-child) {
	padding-left: 0.5em;
}

.hero__img {
	width: 100%;
	/* 比可視框高 25%，多出來的就是視差可以位移的餘裕 */
	height: 125%;
	/* 填滿容器、多的裁掉，所以任何比例的視窗都是滿版 */
	object-fit: cover;
	display: block;
	animation: hero-scroll linear both;
	/* 注意：animation-timeline 必須寫在 animation 簡寫之後，否則會被重設成 auto */
	animation-timeline: scroll(root block);
	/* 對應 .hero_block 的高度：hero 完全捲出畫面時剛好跑完 */
	animation-range: 0 var(--hero-h);
}

@keyframes hero-scroll {
	from {
		transform: translateY(-20%) scale(1);
	}
	to {
		transform: translateY(0) scale(1.1);
	}
}

.hero_img_wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	z-index: 1000;
}

.hero_scrollline {
	position: absolute;
	left: var(--gutter);
	bottom: 0;
	z-index: 1001;
	width: 1px;
	height: 60vh;
	background-color: var(--cursor-color);
	animation: scroll-line 2.4s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes scroll-line {
	0% {
		transform: scaleY(0);
		transform-origin: 0 0;
	}
	50% {
		transform: scaleY(1);
		transform-origin: 0 0;
	}
	50.1% {
		transform: scaleY(1);
		transform-origin: 0 100%;
	}
	100% {
		transform: scaleY(0);
		transform-origin: 0 100%;
	}
}

.hero_content {
	position: absolute;
	font-size: 4vw;
	left: var(--gutter);
	top: var(--gutter);
	z-index: 1001;
	text-align: left;
	color: white;
	user-select: none;
	letter-spacing: 0.2rem;
}

.hero_content span {
	display: block;
}

.hero_profile {
	position: absolute;
	right: 6vw;
	bottom: 12vh;
	z-index: 1002;
	width: clamp(140px, 16vw, 240px);
	/* both：動畫開始前就套用起始狀態，避免第一幀閃一下 */
	animation: profile-rise 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both;
}

.hero_profile_img {
	width: 100%;
	aspect-ratio: 3 / 4;
	object-fit: cover;
	/* 非正方形 + 50% = 直立橢圓 */
	border-radius: 50%;
	display: block;
}

@keyframes profile-rise {
	from {
		opacity: 0;
		transform: translateY(48px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/*
 * 只留 scroll-driven 的動畫。animation-timeline 一旦不是 auto，
 * main.css 那組全域的 duration 歸零就管不到，得在這裡個別關掉。
 * 其餘時間驅動的過渡與動畫都由 main.css 統一處理。
 */
@media (prefers-reduced-motion: reduce) {
	.hero_title_fst div span,
	.hero_title_sec div span {
		animation: none;
		translate: none;
	}
	.hero__img {
		animation: none;
		/* 125% 是留給視差位移的餘裕，不動了就要收回來，否則下緣會被裁掉 */
		height: 100%;
	}
}

/*
 * 自動跑馬燈：跟捲動無關，所以刻意不掛 animation-timeline，純時間驅動。
 * 速度只由 --duration 決定，不要靠加減字數來調。
 */
.personal_tagLine {
	--duration: 80s;
	/* 字之間的間距，同時也是接縫處的間距（見 .personal_group 的 padding-right） */
	--word-gap: 0.4em;

	/* 跑道要靠 top 定位，這裡當它的基準 */
	position: relative;
	width: 100%;
	height: 100dvh;
	/* 超出的部分要裁掉，循環才看不出接縫 */
	overflow: hidden;
	font-size: clamp(2.5rem, 7vw, 8rem);
	/* 全域的 line-height: 2 會把這麼大的字撐出一堆空白，這裡收掉 */
	line-height: 1;
	user-select: none;
}

.personal_track {
	position: absolute;
	left: 0;
	top: 80%;
	display: flex;
	width: max-content;
	/*
	 * 把自己拉高半個身高，讓 80% 對到的是這一行的中線而不是上緣。
	 * 動畫吃的是 translate，這裡用 transform，兩個是不同的 CSS 屬性，
	 * 所以定位和循環位移可以同時掛在同一個元素上不打架。
	 */
	transform: translateY(-50%);
	animation: personal-run var(--duration) linear infinite;
	will-change: translate;
}

/*
 * 一份 = 四組「| PERSONAL」。右邊補上跟內部相同的間距，
 * 接回起點時第一根 pipe 才不會貼上前一份的最後一個字。
 */
.personal_group {
	display: flex;
	align-items: center;
	gap: var(--word-gap);
	padding-right: var(--word-gap);
	white-space: nowrap;
}

.personal_group .pipe {
	font-weight: 300;
	color: var(--fg-muted);
}

.personal_group .word {
	font-weight: 700;
	letter-spacing: 0.04em;
}

/*
 * 位移剛好一份的寬度（兩份中的 1/2），接回起點時看不出來。
 * prefers-reduced-motion 不用另外寫：main.css 的全域規則會讓它一格跳到 -50%，
 * 而 -50% 跟 0% 的畫面長得一樣，等同於直接停住。
 */
@keyframes personal-run {
	from {
		translate: 0 0;
	}
	to {
		translate: -50% 0;
	}
}
</style>
