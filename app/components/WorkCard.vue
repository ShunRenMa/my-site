<script setup>
const props = defineProps({
	src: { type: String, required: true },
	title: { type: String, required: true },
	desc: { type: String, default: '' },
	tag: { type: Array, default: () => [] },
	ratio: { type: String, default: '16/9' },
	type: { type: String, default: 'image' },
})

const root = useTemplateRef('root')
const shown = useInviewOnce(root)

const media = useTemplateRef('media')
let observer

// 一頁有六支影片，離開視窗就停，不要同時解碼
onMounted(() => {
	if (props.type !== 'video' || !media.value) return

	observer = new IntersectionObserver(
		([entry]) => {
			if (entry?.isIntersecting) media.value.play().catch(() => {})
			else media.value.pause()
		},
		{ threshold: 0 },
	)
	observer.observe(media.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<article ref="root" class="workCard" :class="{ 'is-inview': shown }">
		<video
			v-if="type === 'video'"
			ref="media"
			:src="src"
			:style="{ aspectRatio: ratio }"
			class="workCard_media"
			muted
			loop
			playsinline
			preload="metadata"
			tabindex="-1"
		></video>
		<img
			v-else
			:src="src"
			:alt="title"
			:style="{ aspectRatio: ratio }"
			class="workCard_media"
			loading="lazy"
		/>

		<ul v-if="tag.length" class="workCard_tags">
			<li v-for="item in tag" :key="item" class="tag">{{ item }}</li>
		</ul>

		<h3 class="workCard_title">{{ title }}</h3>
		<p v-if="desc" class="workCard_desc">{{ desc }}</p>
	</article>
</template>

<style scoped>
.workCard {
	opacity: 0;
	translate: 0 3rem;
	transition:
		opacity 0.9s ease-out,
		translate 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}

.workCard.is-inview {
	opacity: 1;
	translate: 0 0;
}

.workCard_media {
	width: 100%;
	object-fit: cover;
	background-color: var(--blue-50);
}

.workCard_tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.6em;
	margin: 1.4em 0 0;
	padding: 0;
	list-style: none;
}

.workCard_title {
	margin: 0.5em 0 0;
	font-size: 1.15rem;
	font-weight: 600;
	line-height: 1.5;
}

.workCard_desc {
	margin: 0.6em 0 0;
	color: var(--fg-muted);
	font-size: 0.9rem;
	line-height: 1.9;
}

@media (prefers-reduced-motion: reduce) {
	.workCard {
		transition: none;
		opacity: 1;
		translate: none;
	}
}
</style>
