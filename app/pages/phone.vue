<script setup>
import hor from '~/assets/videos/hor.mp4'

const rotate = ref(-20)
</script>

<template>
	<section class="phonePreview">
		<ThePhone :src="hor" :rotate="rotate" />
		<label class="phonePreview_ctrl">
			<input v-model.number="rotate" type="range" min="-180" max="180" />
			{{ rotate }}°
		</label>
	</section>
</template>

<style scoped>
.phonePreview {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4vh;
	min-height: 100dvh;
	--phone-w: min(300px, 60vw);
}

.phonePreview_ctrl {
	display: flex;
	gap: 1em;
	align-items: center;
	font-variant-numeric: tabular-nums;
}

.phonePreview_ctrl input {
	width: min(400px, 70vw);
}
</style>
