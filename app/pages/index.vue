<script setup>
const layoutClass = 'layout'
</script>

<template>
	<div :class="layoutClass">
		<section class="hero hero_block">
			<div class="hero_content">
				<span class="hero_title_fst">Made In Taiwan.</span>
				<span class="hero_title_sec">Building For The World.</span>
			</div>
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
				<div>
					<img
						src="~/assets/images/profile2.jpg"
						alt="profile image"
						class="profile_img"
						fetchpriority="high"
					/>
				</div>
			</div>
			<div class="profile_content">
				<h1>
					Hi, I Am Baird. <br />
					A Frontend Engineer.
				</h1>
				<span class="content_sm block">
					Born in 1995,based in Taipei. I speak Mandarin, English, and Japanese
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
	display: block;
	width: 100%;
	height: 105vh;
	height: 105dvh;
}
.hero {
	/* 讓 hero 內的 absolute 元素以它為基準，而不是整個視窗 */
	position: relative;
	overflow: hidden;
}

.hero__img {
	width: 100%;
	height: 100%;
	/* 填滿容器、多的裁掉，所以任何比例的視窗都是滿版 */
	object-fit: cover;
	display: block;
}
.hero_img_wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	z-index: 1000;
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
	.hero_profile {
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
