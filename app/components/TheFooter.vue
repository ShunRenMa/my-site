<script setup lang="js">
const itemClass = 'nav_item'
const itemTitleClass = 'nav_item_title'
const itemContentClass = 'nav_item_content'
const siteMap = {
	ABOUT: '/about',
	CONTACT: '/contact',
}
const workObj = {
	GITHUB: 'https://github.com/ShunRenMa',
	LINKEDIN: 'https://www.linkedin.com/in/shun-ren-ma-94b42815a/',
}
const socialObj = {
	INSTAGRAM: 'https://www.instagram.com/paka.ph_024/',
}
const copyRight = '© 2026 ShunRen Ma.'

const navArray = [
	[{ name: 'HOME', url: '/' }],
	[
		{ name: 'WORKS', url: '/works' },
		{ name: 'ABOUT', url: '/about' },
		{ name: 'CONTACT', url: '/contact' },
	],
	[
		{ name: 'GITHUB', url: 'https://github.com/ShunRenMa' },
		{
			name: 'LINKEDIN',
			url: 'https://www.linkedin.com/in/shun-ren-ma-94b42815a/',
		},
	],
	[{ name: 'INSTAGRAM', url: 'https://www.instagram.com/paka.ph_024/' }],
]
</script>
<template>
	<footer>
		<div class="footer_content">
			<div class="nav_area">
				<div v-for="(arrayElement, index) in navArray" :class="itemClass">
					<div :class="itemContentClass">
						<ul>
							<li v-for="(item, i) in arrayElement" :key="i">
								<NuxtLink v-if="item.url.startsWith('/')" :to="item.url">{{
									item.name
								}}</NuxtLink>
								<a v-else :href="item.url" target="_blank" rel="noopener">{{
									item.name
								}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div :class="itemClass">
					<div :class="itemContentClass" class="copyRight">
						<p>{{ copyRight }}</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped>
footer {
	background-color: transparent;
	text-align: left;
	position: relative;
	width: 100vw;
}
.nav_area {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
}
.footer_content {
	width: 92vw;
	margin: 0 auto;
	padding: 4vw 0;
}

li {
	list-style: none;
}

ul {
	padding: 0;
	margin: 0;
}

p {
	margin: 0;
}

a {
	position: relative;
	text-decoration: none;
}
a::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: -2px;
	width: 100%;
	height: 2px;
	background: currentColor;
	transform: scaleX(0);
	transform-origin: right; /* 離開時的起點 */
	transition: transform 0.6s ease;
}
a:hover::after {
	transform: scaleX(1);
	transform-origin: left; /* 進入時的起點 */
}
.nav_item {
	flex: 1;
}
</style>
