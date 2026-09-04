const SITE_URL = 'https://alupaka.tw'
const SITE_NAME = 'Baird Ma'

type SeoOptions = {
	title: string
	description: string
	/** 相對於網站根目錄，例如 '/og.jpg' */
	image?: string
}

export const useSeo = ({
	title,
	description,
	image = '/og.jpg',
}: SeoOptions) => {
	const url = SITE_URL + useRoute().path
	const imageUrl = SITE_URL + image

	useSeoMeta({
		title,
		description,
		// 社群平台不吃 titleTemplate，og 這邊得自己把站名補回去
		ogTitle: `${title} | ${SITE_NAME}`,
		ogDescription: description,
		ogUrl: url,
		ogImage: imageUrl,
		twitterImage: imageUrl,
	})

	useHead({ link: [{ rel: 'canonical', href: url }] })
}
