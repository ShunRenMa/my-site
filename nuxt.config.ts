// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	app: {
		head: {
			htmlAttrs: { lang: 'zh-Hant' },
			titleTemplate: '%s | Baird Ma',
			meta: [
				{
					property: 'og:site_name',
					content: 'Baird Ma / Frontend Engineer / Photographer',
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:locale', content: 'zh_TW' },
				{ name: 'twitter:card', content: 'summary_large_image' },
			],
			link: [
				{ rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32' },
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon-32.png',
					sizes: '32x32',
				},
				{
					rel: 'apple-touch-icon',
					href: '/apple-touch-icon.png',
					sizes: '180x180',
				},
			],
		},
	},
})
