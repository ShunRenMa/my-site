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
					content: 'Baird Ma / Frontengineer / Photographyer',
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:locale', content: 'zh_TW' },
				{ name: 'twitter:card', content: 'summary_large_image' },
			],
			link: [{ rel: 'icon', href: '/favicon.ico' }],
		},
	},
})
