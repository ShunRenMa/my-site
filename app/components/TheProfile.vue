<script setup>
// profile 照片：捲到位才由下往上展開
const profileImgMask = useTemplateRef('profileImgMask')
const profileImgShown = useInviewOnce(profileImgMask)

// profile 兩段內文：各自捲到位才向上淡入
const profileBio = useTemplateRef('profileBio')
const profileBioShown = useInviewOnce(profileBio)

const profileMe = useTemplateRef('profileMe')
const profileMeShown = useInviewOnce(profileMe)

// About Work 結尾的技能標籤，只是列出，不能點
const skills = [
	'HTML',
	'CSS',
	'JavaScript',
	'TypeScript',
	'Node.js',
	'Vue.js',
	'Nuxt.js',
	'Cloud Run',
	'Cloudflare',
	'Leadership',
	'Jest',
	'Git',
	'UI/UX...?',
	'＋',
]
</script>

<template>
	<div class="profile block">
		<div class="profile_img_wrapper">
			<div
				ref="profileImgMask"
				class="profile_img_mask"
				:class="{ 'is-inview': profileImgShown }"
			>
				<img
					src="~/assets/images/profile2.jpg"
					alt="profile image"
					class="profile_img"
					fetchpriority="high"
				/>
			</div>
		</div>
		<div class="profile_content">
			<TheSplitTitle
				tag="h1"
				class="profile_title"
				:text="'Hi, I Am Baird.\nA Frontend Engineer.'"
			/>

			<div
				ref="profileMe"
				class="profile_me"
				:class="{ 'is-inview': profileMeShown }"
			>
				<span class="content_sm block">
					Born in 1995, based in Taipei. I speak Mandarin, English, and Japanese
					(JLPT N1).
					<br />
					Living with a calico cat. Also photography and floristry.
					<br />
					I like doing things properly.
				</span>
			</div>
			<div
				ref="profileBio"
				class="profile_bio"
				:class="{ 'is-inview': profileBioShown }"
			>
				<span class="smooth_line"></span>
				<span class="work_title">
					<h2>About Work</h2>
				</span>
				<span class="content_sm block">
					7 years into frontend, five of them in digital advertising.
					<br />
					bridge design and engineering with TypeScript to deliver interfaces
					that feel effortless to use.（With plenty of help from AI, of
					course.）
					<br />
					And when something gets repetitive or annoying enough, I usually end
					up make a tool for it.
				</span>
				<span class="content_sm block">
					As a Senior Frontend Engineer and Development Manager（a five-person
					team）, I also care about teams work together.
					<br />
					putting the right people on the right problems. I believe good
					products come from people who are set up to do their best work.
					<br />
				</span>
				<span class="content_sm block">
					<br />
					Lately I've been studying UI/UX.
				</span>
				<span class="content_sm block">
					BTW, I built the website from Vue + Nuxt.
				</span>
				<span class="content_sm block skill_block">
					<span v-for="skill in skills" :key="skill" class="skill">
						{{ skill }}
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.profile {
	display: grid;
	grid-template-columns: repeat(5, 1fr); /* 跟 footer 同欄數 */
	width: 92vw; /* 跟 footer 同容器 */
	margin: 0 auto;
	align-items: start; /* 關鍵，grid 預設 stretch */
	padding: 8vw 0;
	height: auto;
	background-color: transparent;
}

.profile_img_wrapper {
	grid-column: 1 / 3; /* 佔前兩欄，約 36.8vw */
	position: sticky;
	top: 16vh;
	animation: img-drift linear both;
	/* 注意：animation-timeline 必須寫在 animation 簡寫之後，否則會被重設成 auto */
	animation-timeline: --p; /* 用 .profile 的進出視窗進度 */
	/* cover 比 contain 長，區塊完全離開視窗才跑完，尾段才撐得住 */
	animation-range: cover 0% cover 100%;
}

.profile_content {
	grid-column: 3 / -1; /* 從 GITHUB 那欄起算 */
	min-height: 180vh;
}
.profile_content h1 {
	font-size: 3em;
}
.profile_img {
	width: 26vw;
	/* 去掉 inline 基線留下的縫，放大時邊緣才貼齊遮罩 */
	display: block;
	/* 跟 hero 同一套：往下捲時微微放大。scale 不影響版面寬度，
	 * 溢出的部分由 .profile_img_mask 裁掉，所以欄寬不會被撐開 */
	animation: img-zoom linear both;
	/* 注意：animation-timeline 必須寫在 animation 簡寫之後，否則會被重設成 auto */
	animation-timeline: --p; /* 跟 wrapper 的漂移同一個時間軸 */
	animation-range: cover 0% cover 100%;
}

@keyframes img-zoom {
	from {
		transform: scale(1);
	}
	to {
		transform: scale(1.1);
	}
}

/* 進場前整個裁掉，觸發後由下往上展開 */
.profile_img_mask {
	/* 放大時的溢出裁在這裡，跟進場遮罩共用同一個框 */
	overflow: hidden;
	clip-path: inset(100% 0 0 0);
	transition: clip-path 1.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.profile_img_mask.is-inview {
	clip-path: inset(0);
}

/* 兩段內文：整塊向上淡入，兩塊各自觸發 */
.profile_bio,
.profile_me {
	opacity: 0;
	translate: 0 2rem;
	transition:
		opacity 0.9s ease-out,
		translate 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}

.profile_bio.is-inview,
.profile_me.is-inview {
	opacity: 1;
	translate: 0 0;
}

.content_sm {
	font-size: 1.2em;
	letter-spacing: 0.01em;
	color: #0000009c;
}

/*
 * 分隔線在 About Work 的頂部，上下都接著文字，所以兩邊都要留白。
 * 進場跟標題底線同一套語言：由左往右畫出來，只是不收回。
 */
.smooth_line {
	display: block;
	width: 100%;
	height: 1px;
	margin: 2em 0;
	background-color: var(--line);
	transform: scaleX(0);
	transform-origin: left center;
	/* 慢 0.25s 起跑，讓整塊先浮到定位再畫線 */
	transition: transform 1.1s cubic-bezier(0.19, 1, 0.22, 1) 0.25s;
}

.profile_bio.is-inview .smooth_line {
	transform: scaleX(1);
}

.profile {
	view-timeline: --p block;
}

/* span 是 inline，裡面卻包 h2，撐不出區塊也吃不到 margin，改成 block */
.work_title {
	display: block;
}

.work_title h2 {
	margin: 0 0 0.5em;
}

/* 技能標籤：淺灰實心色塊 + 白字 */
.skill_block {
	display: flex;
	flex-wrap: wrap;
	gap: 0.6em;
	margin-top: 1.5em;
}

.skill {
	padding: 0.15em 0.8em;
	border-radius: 6px;
	background-color: #b3b3b3;
	font-size: 0.85em;
	letter-spacing: 0.02em;
	line-height: 1.9;
	color: #fff;
	white-space: nowrap;
	/* 整排一起浮上來，比整塊內文慢 0.35s 起跑 */
	opacity: 0;
	translate: 0 0.5rem;
	transition:
		opacity 0.6s ease-out 0.35s,
		translate 0.6s cubic-bezier(0.19, 1, 0.22, 1) 0.35s;
}

.profile_bio.is-inview .skill {
	opacity: 1;
	translate: 0 0;
}
/* 往下捲時微微往上浮。終點設 0 而不是負值，才不會浮過 sticky 的 top */
/*
 * 先往上浮、最後再沉下去撐一段才走。
 * 65~100% 那段是轉折，留長一點才不會像彈跳；
 * easing 寫在 keyframe 上，上浮用 ease-out、下沉用 ease-in，接點才順。
 */
@keyframes img-drift {
	0% {
		transform: translateY(80px);
		animation-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
	}
	65% {
		transform: translateY(-60px);
		animation-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
	}
	100% {
		transform: translateY(200px);
	}
}

/*
 * 只留 scroll-driven 的動畫。animation-timeline 一旦不是 auto，
 * main.css 那組全域的 duration 歸零就管不到，得在這裡個別關掉。
 */
@media (prefers-reduced-motion: reduce) {
	.profile_img_wrapper,
	.profile_img {
		animation: none;
	}
}
</style>
