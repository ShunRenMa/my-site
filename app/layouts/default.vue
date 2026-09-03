<script setup lang="ts">
const route = useRoute()
const entered = ref(false)
onMounted(() => {
	entered.value = true
})
</script>

<template>
	<div class="layout page-fade" :class="{ entered }">
		<!-- <Transition name="page" appear mode="out-in"> -->
		<div :key="route.fullPath">
			<TheNav />
			<slot />
			<TheFooter />
		</div>
		<!-- </Transition> -->
		<TheCousor />
	</div>
</template>

<style scoped>
.page-fade {
	opacity: 0;
	transition: opacity 1s ease-out;
}
.page-fade.entered {
	opacity: 1;
}
</style>
<style>
@view-transition {
	navigation: auto;
}
::view-transition-old(root),
::view-transition-new(root) {
	animation-duration: 1s;
	animation-timing-function: ease-out;
}
</style>
