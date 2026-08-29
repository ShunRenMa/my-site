import type { ShallowRef } from 'vue'

/**
 * rootMargin 往上縮 30%，觸發線約視窗 70% 高的位置。
 */
export function useInviewOnce(elRef: Readonly<ShallowRef<HTMLElement | null>>) {
	const shown = ref(false)
	let observer: IntersectionObserver | undefined

	onMounted(() => {
		if (!elRef.value) return

		observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return
				shown.value = true
				observer?.disconnect()
			},
			{ rootMargin: '0px 0px -30% 0px' },
		)
		observer.observe(elRef.value)
	})

	onBeforeUnmount(() => observer?.disconnect())

	return shown
}
