<script setup lang="ts">
const route = useRoute()
</script>

<template>
	<div>
		<Transition name="page" appear>
			<div :key="route.fullPath">
				<TheNav />
				<slot />
				<TheFooter />
			</div>
		</Transition>
		<TheCousor />
	</div>
</template>

<style></style>
