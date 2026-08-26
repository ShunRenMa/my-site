import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin((nuxtApp) => {
	if (isDesktopDevice()) {
		const lenis = new Lenis({
			autoRaf: true,
		})

		lenis.on('scroll', (e) => {
			// console.log(e.scroll) // 目前捲動的 px
			// console.log(e.limit) // 可捲動的最大值（極限值，等同 scrollHeight - innerHeight）
			// console.log(e.progress) // 0~1，已經是 clamp 好的整頁進度
			// console.log(e.velocity) // 捲動速度
			// console.log(e.direction) // 1 或 -1，方向
		})
	}
})
