<script setup>
const layoutClass = 'layout'
</script>

<template>
	<div :class="layoutClass">
		<section class="hero block">
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
			<div class="hero_profile">
				<img
					src="~/assets/images/profile1.jpg"
					alt="profile image"
					class="hero_profile_img"
					fetchpriority="high"
				/>
			</div>
		</section>

		<div class="profile block">
			<div class="profile_img_wrapper">
				<img
					src="~/assets/images/profile2.jpg"
					alt="profile image"
					class="profile_img"
					fetchpriority="high"
				/>
			</div>
			<div class="profile_content"></div>
		</div>
	</div>
</template>

<style scoped>
.layout {
	/* 這頁的左右留白。定在頁面根節點，底下的區塊都繼承得到 */
	--gutter: 4vw;
}

.block {
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
	width: 100%;
	height: 100vh;
	background-color: transparent;
}

.profile_img_wrapper {
	width: 30vw;
	left: var(--gutter);
	overflow: hidden;
	position: sticky;
	z-index: 1000;
}
</style>
