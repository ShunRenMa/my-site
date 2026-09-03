export default defineNuxtPlugin((nuxtApp) => {
	const router = useRouter()

	router.beforeResolve((to, from) => {
		if (!document.startViewTransition) return
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await nuxtApp.callHook('page:finish')
			})
		})
	})
})
