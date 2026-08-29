<script setup>
const layoutClass = 'layout'

/**
 * 元素捲到位就把旗標翻成 true，之後不再理它（等同 reverse: false）。
 * rootMargin 往上縮 30%，觸發線約視窗 70% 高的位置。
 */
function useInviewOnce(elRef) {
	const shown = ref(false)
	let observer

	onMounted(() => {
		observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return
				shown.value = true
				observer.disconnect()
			},
			{ rootMargin: '0px 0px -30% 0px' },
		)
		observer.observe(elRef.value)
	})

	onBeforeUnmount(() => observer?.disconnect())

	return shown
}

// profile 照片：捲到位才由下往上展開
const profileImgMask = useTemplateRef('profileImgMask')
const profileImgShown = useInviewOnce(profileImgMask)

// profile 標題：捲到位才逐字浮上來
const profileTitle = useTemplateRef('profileTitle')
const profileTitleShown = useInviewOnce(profileTitle)
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

		<div class="profile block">
			<div class="profile_img_wrapper">
				<div
					ref="profileImgMask"
					class="profile_img_mask"
					:class="{ 'is-inview': profileImgShown }"
				>
					<img
						src="~/assets/images/profile2.jpg"
						alt="profile image"
						class="profile_img"
						fetchpriority="high"
					/>
				</div>
			</div>
			<div class="profile_content">
				<!-- 拆成一堆 span 後讀螢幕軟體會逐字念，整段交給 aria-label -->
				<h1
					ref="profileTitle"
					class="profile_title"
					:class="{ 'is-inview': profileTitleShown }"
					aria-label="Hi, I Am Baird. A Frontend Engineer."
				>
					<span class="profile_title_line" aria-hidden="true">
						<div>
							<span style="--i: 0">H</span>
							<span style="--i: 1">i</span>
							<span style="--i: 2">,</span>
						</div>
						<div>
							<span style="--i: 3">I</span>
						</div>
						<div>
							<span style="--i: 4">A</span>
							<span style="--i: 5">m</span>
						</div>
						<div>
							<span style="--i: 6">B</span>
							<span style="--i: 7">a</span>
							<span style="--i: 8">i</span>
							<span style="--i: 9">r</span>
							<span style="--i: 10">d</span>
							<span style="--i: 11">.</span>
						</div>
					</span>
					<span class="profile_title_line" aria-hidden="true">
						<div>
							<span style="--i: 0">A</span>
						</div>
						<div>
							<span style="--i: 1">F</span>
							<span style="--i: 2">r</span>
							<span style="--i: 3">o</span>
							<span style="--i: 4">n</span>
							<span style="--i: 5">t</span>
							<span style="--i: 6">e</span>
							<span style="--i: 7">n</span>
							<span style="--i: 8">d</span>
						</div>
						<div>
							<span style="--i: 9">E</span>
							<span style="--i: 10">n</span>
							<span style="--i: 11">g</span>
							<span style="--i: 12">i</span>
							<span style="--i: 13">n</span>
							<span style="--i: 14">e</span>
							<span style="--i: 15">e</span>
							<span style="--i: 16">r</span>
							<span style="--i: 17">.</span>
						</div>
					</span>
				</h1>
				<span class="content_sm block">
					Born in 1995, based in Taipei. I speak Mandarin, English, and Japanese
					(JLPT N1).
					<br />
					7 years into frontend, five of them in digital advertising.
					<br />
					bridge design and engineering with TypeScript to deliver interfaces
					that feel effortless to use.（With plenty of help from AI, of
					course.）
					<br />
					And when something gets repetitive or annoying enough, I usually end
					up make a tool for it.
				</span>
				<span class="content_sm block">
					A reliable partner in bringing ideas to life.
				</span>
				<span class="content_sm block">
					As a Senior Frontend Engineer and Development Manager（a five-person
					team）, I also care about teams work together.
					<br />
					putting the right people on the right problems. I believe Good
					products come from people who are set up to do their best work.
				</span>
				<span class="content_sm block">
					BTW. I built the website from Vue + Nuxt.
				</span>
				<span class="smooth_line"></span>
				<span class="skill_title">
					<h2>My Skill</h2>
				</span>
				<span class="content_sm block skill"> </span>
				<span class="content_sm block"> </span>
			</div>
		</div>
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
	 * inline-block 的 overflow 一旦不是 visible，基線就從「文字基線」
	 * 變成「盒子下緣」，行框會被撐高。改成 top 對齊就不吃基線那套。
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

@media (prefers-reduced-motion: reduce) {
	.profile_img_mask {
		transition: none;
		clip-path: inset(0);
	}
	.profile_title_line div span {
		translate: none;
	}
	.profile_title.is-inview .profile_title_line div span {
		animation: none;
	}
	.hero_title_fst div span,
	.hero_title_sec div span {
		animation: none;
		translate: none;
	}
	.hero_profile {
		animation: none;
	}
	.hero__img {
		animation: none;
		height: 100%;
	}
	.hero_scrollline {
		animation: none;
	}
}

.profile {
	display: grid;
	grid-template-columns: repeat(5, 1fr); /* 跟 footer 同欄數 */
	width: 92vw; /* 跟 footer 同容器 */
	margin: 0 auto;
	align-items: start; /* 關鍵，grid 預設 stretch */
	padding: 8vw 0;
	height: auto;
	background-color: transparent;
}

.profile_img_wrapper {
	grid-column: 1 / 3; /* 佔前兩欄，約 36.8vw */
	position: sticky;
	top: 4vw;
}

.profile_content {
	grid-column: 3 / -1; /* 從 GITHUB 那欄起算 */
	min-height: 150vh;
}
.profile_content h1 {
	font-size: 3em;
}
.profile_img {
	width: 26vw;
}

/* 進場前整個裁掉，觸發後由下往上展開 */
/* 標題：結構跟 hero 一樣，行 > 單字（遮罩）> 字元 */
.profile_title_line {
	display: block;
}

.profile_title_line div,
.profile_title_line div span {
	display: inline-block;
}

.profile_title_line div {
	overflow: hidden;
	/* 同 hero：overflow 不是 visible 時基線會跑掉，改成 top 對齊 */
	vertical-align: top;
}

.profile_title_line div:not(:first-child) {
	padding-left: 0.25em;
}

.profile_title_line div span {
	translate: 0 100%;
}

/* 捲到位才開始跑，兩行的 --i 各自從 0 算，所以會同時展開 */
.profile_title.is-inview .profile_title_line div span {
	animation: char-rise 1s cubic-bezier(0.19, 1, 0.22, 1) both;
	animation-delay: calc(var(--i) * 35ms);
}

.profile_img_mask {
	clip-path: inset(100% 0 0 0);
	transition: clip-path 1.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.profile_img_mask.is-inview {
	clip-path: inset(0);
}

.content_sm {
	font-size: 1.2em;
	color: #0000009c;
}

.smooth_line {
	display: block;
	width: 100%;
	height: 1px;
	margin-top: 1em;
	background-color: var(--line);
}

.profile {
	view-timeline: --p block;
}

.profile_img_wrapper {
	position: sticky;
	top: 4vw;
	animation: img-drift linear both;
	animation-timeline: --p; /* 用 .profile 的進出視窗進度 */
	animation-range: contain 0% contain 100%;
}

.skill h1 {
	margin: 0;
}
@keyframes img-drift {
	to {
		transform: translateY(80px);
	}
}
</style>
