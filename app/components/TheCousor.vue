<template>
  <div class="cursor" :class="classObj" aria-hidden="true">
    <div ref="ringEl" class="cursor__ring">
      <div ref="frameEl" class="cursor__frame">
        <span class="cursor__label">{{ label }}</span>
      </div>
    </div>
    <div ref="dotEl" class="cursor__dot">
      <i />
    </div>
  </div>
</template>

<script setup lang="ts">
type CursorMode = 'default' | 'fit' | 'text'

/** 圈圈追上滑鼠的速度，越小越黏（0.15 ≈ GSAP duration:1 + power2.out） */
const LERP = 0.10

const ringEl = ref<HTMLElement>()
const frameEl = ref<HTMLElement>()
const dotEl = ref<HTMLElement>()

const visible = ref(false)
const hovered = ref(false)
const rounded = ref(false)
const mode = ref<CursorMode>('default')
const label = ref('View')

const classObj = computed(() => ({
  'is-visible': visible.value,
  'is-hovered': hovered.value,
  'is-rounded': rounded.value,
  [`is-${mode.value}Mode`]: true,
}))

// 高頻更新的位置不進 reactivity，直接寫 style，避免每幀觸發 re-render
let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let raf = 0
let target: HTMLElement | null = null
let magnet = 0

/** 把位移鎖在半徑 max 的圓內，所以不會有方形邊角感 */
function magnetOffset(dx: number, dy: number, max: number) {
  if (max <= 0) return { x: 0, y: 0 }
  const r = Math.min(Math.hypot(dx, dy), max)
  const a = Math.atan2(dy, dx)
  return { x: r * Math.cos(a), y: r * Math.sin(a) }
}

function setTarget(el: Element | null) {
  const next = (el?.closest?.('[data-cursor]') ?? null) as HTMLElement | null
  if (next === target) return
  target = next

  if (!next) {
    hovered.value = false
    rounded.value = false
    mode.value = 'default'
    magnet = 0
    // 清掉 inline 尺寸，讓 frame 帶著 transition 回到 CSS 預設的 50px
    frameEl.value?.style.removeProperty('width')
    frameEl.value?.style.removeProperty('height')
    return
  }

  hovered.value = true
  mode.value = (next.dataset.cursor || 'default') as CursorMode
  rounded.value = next.dataset.cursorRounded !== undefined
  magnet = Number(next.dataset.cursorMagnet ?? 0)
  label.value = next.dataset.cursorLabel ?? 'View'
}

function onPointerMove(e: PointerEvent) {
  mouseX = e.clientX
  mouseY = e.clientY

  // 第一次移動：圈圈直接就位，不要從 (0,0) 飛過來
  if (!visible.value) {
    ringX = mouseX
    ringY = mouseY
    visible.value = true
  }

  if (dotEl.value) {
    dotEl.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  }
  setTarget(e.target as Element)
}

function onPointerLeave() {
  visible.value = false
  setTarget(null)
}

function tick() {
  let targetX = mouseX
  let targetY = mouseY

  if (target && mode.value === 'fit') {
    // 每幀重讀 rect，捲動時吸附才不會脫鉤
    const r = target.getBoundingClientRect()
    const cx = r.x + r.width * 0.5
    const cy = r.y + r.height * 0.5
    const offset = magnetOffset(mouseX - cx, mouseY - cy, magnet)
    targetX = cx + offset.x
    targetY = cy + offset.y

    if (frameEl.value) {
      // 值沒變時瀏覽器不會重啟 transition，可以放心每幀寫
      frameEl.value.style.width = `${r.width}px`
      frameEl.value.style.height = `${r.height}px`
    }
  }

  ringX += (targetX - ringX) * LERP
  ringY += (targetY - ringY) * LERP
  if (ringEl.value) {
    ringEl.value.style.transform = `translate(${ringX}px, ${ringY}px)`
  }

  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!canHover || reduced) return

  // 只有真的啟用時才藏掉系統游標，觸控裝置不受影響
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerleave', onPointerLeave)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerleave', onPointerLeave)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.cursor {
  --cursor-color: #7d97b8;
  --cursor-size: 50px;
  --cursor-size-hover: 80px;
  --cursor-dot-size: 14px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 200; /* 比一般 UI 高，但要低於 loading / modal 遮罩 */
  color: var(--cursor-color);
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.4s linear;
}

.cursor.is-visible {
  opacity: 1;
}

.cursor__ring,
.cursor__dot {
  position: absolute;
  will-change: transform;
}

/* 內層負責置中，外層只管 translate，兩者不互相干擾 */
.cursor__frame,
.cursor__dot > i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.cursor__frame {
  display: grid;
  place-items: center;
  width: var(--cursor-size);
  height: var(--cursor-size);
  border: 2px solid currentColor;
  transition:
    width 0.8s cubic-bezier(0.19, 1, 0.22, 1),
    height 0.8s cubic-bezier(0.19, 1, 0.22, 1),
    border-radius 0.8s cubic-bezier(0.19, 1, 0.22, 1),
    background-color 0.4s linear;
}

.cursor__dot > i {
  display: block;
  width: var(--cursor-dot-size);
  height: var(--cursor-dot-size);
  background: currentColor;
  transition:
    width 0.4s cubic-bezier(0.19, 1, 0.22, 1),
    height 0.4s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.2s linear;
}

.cursor__label {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  opacity: 0;
  transition: opacity 0.4s linear;
}

/* hover 狀態 */
.cursor.is-hovered .cursor__frame {
  width: var(--cursor-size-hover);
  height: var(--cursor-size-hover);
}

.cursor.is-hovered .cursor__dot > i {
  opacity: 0;
}

/* fit：尺寸由 JS 寫入，這裡只負責把圓角拿掉 */
.cursor.is-fitMode.is-hovered:not(.is-rounded) .cursor__frame {
  border-radius: 0;
}

/* text：圈圈填色並顯示文字 */
.cursor.is-textMode.is-hovered .cursor__frame {
  background-color: currentColor;
  border-color: transparent;
}

.cursor.is-textMode.is-hovered .cursor__label {
  opacity: 1;
}
</style>

<style>
/* 非 scoped：藏掉系統游標。class 由元件在支援 hover 的裝置上才加 */
.has-custom-cursor,
.has-custom-cursor a,
.has-custom-cursor button {
  cursor: none;
}

/* 輸入框還是要看得到原本的游標，不然沒辦法用 */
.has-custom-cursor input,
.has-custom-cursor textarea,
.has-custom-cursor select {
  cursor: auto;
}
</style>
