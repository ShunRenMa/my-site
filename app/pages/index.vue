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
					src="~/assets/css/cover1.jpg"
					alt="hero image"
					class="hero__img"
					fetchpriority="high"
				/>
			</div>
		</section>

		<div class="profile block"></div>
	</div>
</template>

<style scoped>
.block {
	display: block;
	width: 100%;
	height: 105vh;
	height: 105dvh;
}
.hero {
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
	left: 4vw;
	top: 4vw;
	z-index: 1001;
	text-align: left;
	color: white;
	user-select: none;
	letter-spacing: 0.2rem;
}

.hero_content span {
	display: block;
}

.profile {
	width: 100%;
	height: 100vh;
	background-color: transparent;
}
</style>
