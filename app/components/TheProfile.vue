<script setup>
// profile 照片：捲到位才由下往上展開
const profileImgMask = useTemplateRef('profileImgMask')
const profileImgShown = useInviewOnce(profileImgMask)

// profile 標題：捲到位才逐字浮上來
const profileTitle = useTemplateRef('profileTitle')
const profileTitleShown = useInviewOnce(profileTitle)

// profile 兩段內文：各自捲到位才向上淡入
const profileBio = useTemplateRef('profileBio')
const profileBioShown = useInviewOnce(profileBio)

const profileMe = useTemplateRef('profileMe')
const profileMeShown = useInviewOnce(profileMe)

// About Work 結尾的技能標籤，只是列出，不能點
const skills = [
	'JavaScript',
	'TypeScript',
	'NodeJS',
	'Vue',
	'Nuxt',
	'Cloud Run',
	'Cloudflare',
	'Leadership',
	'Jest',
	'Git',
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
			<!-- aria-label 給讀螢幕軟體-->
			<h1
				ref="profileTitle"
				class="profile_title"
				:class="{ 'is-inview': profileTitleShown }"
				aria-label="Hi, I Am Baird. A Frontend Engineer."
			>
				<span class="profile_title_line" aria-hidden="true">
					<div>
						<span style="--i: 0">H</span>
						<span style="--i: 1">i</span>
						<span style="--i: 2">,</span>
					</div>
					<div>
						<span style="--i: 3">I</span>
					</div>
					<div>
						<span style="--i: 4">A</span>
						<span style="--i: 5">m</span>
					</div>
					<div>
						<span style="--i: 6">B</span>
						<span style="--i: 7">a</span>
						<span style="--i: 8">i</span>
						<span style="--i: 9">r</span>
						<span style="--i: 10">d</span>
						<span style="--i: 11">.</span>
					</div>
				</span>
				<span class="profile_title_line" aria-hidden="true">
					<div>
						<span style="--i: 0">A</span>
					</div>
					<div>
						<span style="--i: 1">F</span>
						<span style="--i: 2">r</span>
						<span style="--i: 3">o</span>
						<span style="--i: 4">n</span>
						<span style="--i: 5">t</span>
						<span style="--i: 6">e</span>
						<span style="--i: 7">n</span>
						<span style="--i: 8">d</span>
					</div>
					<div>
						<span style="--i: 9">E</span>
						<span style="--i: 10">n</span>
						<span style="--i: 11">g</span>
						<span style="--i: 12">i</span>
						<span style="--i: 13">n</span>
						<span style="--i: 14">e</span>
						<span style="--i: 15">e</span>
						<span style="--i: 16">r</span>
						<span style="--i: 17">.</span>
					</div>
				</span>
			</h1>

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
					A reliable partner in bringing ideas to life.
				</span>
				<span class="content_sm block">
					As a Senior Frontend Engineer and Development Manager（a five-person
					team）, I also care about teams work together.
					<br />
					putting the right people on the right problems. I believe Good
					products come from people who are set up to do their best work.
					<br />
				</span>
				<span class="content_sm block">
					BTW. I built the website from Vue + Nuxt.
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
/* 標題：結構跟 hero 一樣，行 > 單字（遮罩）> 字元 */
.profile_title_line {
	display: block;
	/* 縮到文字寬，底線才不會拉到整個欄位那麼長 */
	width: fit-content;
	position: relative;
}

/*
 * 底線：整段動畫分三拍
 *   0 ~ 19%   由左往右長出來（0.5s）
 *   19 ~ 81%  停著，這段時間讓文字浮上來
 *   81 ~ 100% 往右收掉（0.5s）
 */
.profile_title_line::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0.35em;
	width: 100%;
	height: 2px;
	background-color: var(--cursor-color);
	transform: scaleX(0);
	transform-origin: left center;
}

.profile_title.is-inview .profile_title_line::after {
	animation: line-sweep 2.6s linear both;
}

@keyframes line-sweep {
	0% {
		transform: scaleX(0);
		transform-origin: left center;
		animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	}
	19% {
		transform: scaleX(1);
		transform-origin: left center;
	}
	/* 這段 scaleX 都是 1，origin 怎麼插值畫面都一樣，剛好拿來偷換邊 */
	81% {
		transform: scaleX(1);
		transform-origin: right center;
		animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
	}
	100% {
		transform: scaleX(0);
		transform-origin: right center;
	}
}

.profile_title_line div,
.profile_title_line div span {
	display: inline-block;
}

.profile_title_line div {
	overflow: hidden;
	/* 同 hero：overflow 不是 visible 時基線會跑掉，改成 top 對齊 */
	vertical-align: top;
}

.profile_title_line div:not(:first-child) {
	padding-left: 0.25em;
}

.profile_title_line div span {
	translate: 0 100%;
}

/* 捲到位才開始跑，兩行的 --i 各自從 0 算，所以會同時展開 */
.profile_title.is-inview .profile_title_line div span {
	animation: char-rise 1s cubic-bezier(0.19, 1, 0.22, 1) both;
	/* 0.5s = 底線畫完的時間，等它到位字才開始浮 */
	animation-delay: calc(0.5s + var(--i) * 35ms);
}

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
		transform: translateY(300px);
	}
}

/* 標題逐字浮上來，跟 hero 同一套動作（scoped 會各自加後綴，不會互相干擾） */
@keyframes char-rise {
	from {
		translate: 0 100%;
	}
	to {
		translate: 0 0;
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
