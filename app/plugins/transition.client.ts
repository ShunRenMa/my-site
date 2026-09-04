export default defineNuxtPlugin((nuxtApp) => {
	const router = useRouter()

	router.beforeResolve((to, from) => {
		if (!document.startViewTransition) return
		// Nuxt 第一次載入會導到自己
		if (to.fullPath === from.fullPath) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await nuxtApp.callHook('page:finish')
			})
		})
	})
})
