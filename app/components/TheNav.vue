<script setup lang="js">
const pages = [
	{ name: 'WORKS', url: '/works' },
	{ name: 'CONTACT', url: '/contact' },
]

const socials = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/shun-ren-ma-94b42815a/',
		path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/paka.ph_024/',
		path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.439.645 1.439 1.439z',
	},
]
</script>

<template>
	<nav class="nav">
		<!-- <NuxtLink to="/" class="nav_brand">
			<span class="nav_name">SHUNREN MA</span>
			<span class="nav_role">Frontend Developer</span>
		</NuxtLink> -->

		<div class="nav_menu">
			<ul class="nav_pages">
				<li v-for="page in pages" :key="page.name">
					<NuxtLink :to="page.url" class="nav_link">{{ page.name }}</NuxtLink>
				</li>
			</ul>

			<ul class="nav_socials">
				<li v-for="social in socials" :key="social.name">
					<a
						:href="social.url"
						target="_blank"
						rel="noopener"
						:aria-label="social.name"
						class="nav_icon"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path :d="social.path" />
						</svg>
					</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<style scoped>
.nav {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2147483647;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
	/* 垂直只吃這個值，水平仍對齊 hero 的 --gutter */
	padding: 1.25rem var(--gutter);
	line-height: 1.3;
	flex-direction: row-reverse;
	color: #fff;
	mix-blend-mode: difference;
	pointer-events: none;
}

.nav a {
	pointer-events: auto;
}

.nav_brand {
	display: flex;
	flex-direction: column;
}

.nav_name {
	font-size: 0.9rem;
	letter-spacing: 0.08em;
}

.nav_role {
	font-size: 0.7rem;
	letter-spacing: 0.04em;
	opacity: 0.7;
}

.nav_menu {
	display: flex;
	align-items: center;
	gap: 20px;
}

.nav_pages,
.nav_socials {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.nav_link {
	position: relative;
	font-size: 0.8rem;
	letter-spacing: 0.08em;
}

/* 看不見的感應區，把 hover 熱區上下各撐 25%，總高變 150% */
.nav_link::before {
	content: '';
	position: absolute;
	left: 0;
	top: -25%;
	width: 100%;
	height: 150%;
}

.nav_link::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -2px;
	width: 100%;
	height: 1px;
	background: currentColor;
	transform: scaleX(0);
	transform-origin: right;
	transition: transform 0.6s ease;
}

.nav_link:hover::after {
	transform: scaleX(1);
	transform-origin: left;
}

.nav_icon {
	display: block;
	opacity: 0.85;
	transition: opacity 0.4s ease;
}

.nav_icon:hover {
	opacity: 1;
}

.nav_icon svg {
	display: block;
	width: 16px;
	height: 16px;
	fill: currentColor;
}

@media (max-width: 640px) {
	.nav_menu {
		gap: 1.25rem;
	}
	.nav_pages,
	.nav_socials {
		gap: 1rem;
	}
	.nav_role {
		display: none;
	}
	.nav {
		padding-block: 1rem;
	}
}
</style>
