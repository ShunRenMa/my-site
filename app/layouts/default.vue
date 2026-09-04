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

::view-transition-image-pair(root) {
	isolation: auto;
}
::view-transition-old(root),
::view-transition-new(root) {
	mix-blend-mode: normal;
	display: block;
}
::view-transition-old(root) {
	z-index: 0;
	animation: page-slide-out 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}
::view-transition-new(root) {
	z-index: 1;
	animation: page-slide-in 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}

@keyframes page-slide-in {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes page-slide-out {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-25%);
	}
}

@keyframes page-wipe {
	from {
		clip-path: inset(0 0 0 100%);
	}
	to {
		clip-path: inset(0);
	}
}

@media (prefers-reduced-motion: reduce) {
	::view-transition-old(root),
	::view-transition-new(root) {
		animation: none;
	}
}
</style>
