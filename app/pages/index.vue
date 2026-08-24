<script setup>
const message = 'Hello from the script setup!'
const layoutClass = 'layout'
</script>

<template>
	<div :class="layoutClass">
		<section class="hero">
			<img
				src="~/assets/css/cover1.jpg"
				alt=""
				class="hero__img"
				fetchpriority="high"
			/>
		</section>
	</div>
</template>

<style scoped>
.hero {
	/* 用 % 不用 100vw，vw 會把捲軸寬度算進去而多出橫向捲軸 */
	width: 100%;
	/* 第一行給不支援 dvh 的舊瀏覽器墊底 */
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
}

.hero__img {
	width: 100%;
	height: 100%;
	/* 填滿容器、多的裁掉，所以任何比例的視窗都是滿版 */
	object-fit: cover;
	display: block;
}
</style>
