<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { gsap, HUYML_DURATION, HUYML_LOTTIE } from '../../lib/gsap-setup'
import { destroyLottie, mountLottie } from '../../lib/lottie-loader'
import type { AnimationItem } from 'lottie-web'

const DROP_SRC = '/lottie/HomeDrop.json'
const LOOP_SRC = '/lottie/HomeLoop.json'

/** Escala visual compartida al final del drop y en el loop (evita el “fantasma”) */
const HANDOFF_SCALE = 1.12

const dropEl = ref<HTMLElement | null>(null)
const loopEl = ref<HTMLElement | null>(null)

let dropAnim: AnimationItem | null = null
let loopAnim: AnimationItem | null = null
let dropHandler: (() => void) | null = null
let startTimer: ReturnType<typeof setTimeout> | null = null
let holdTimer: ReturnType<typeof setTimeout> | null = null
let fallbackTimer: ReturnType<typeof setTimeout> | null = null
let running = false

function destroyDrop() {
  if (dropAnim && dropHandler) {
    dropAnim.removeEventListener('complete', dropHandler)
    dropHandler = null
  }
  destroyLottie(dropAnim)
  dropAnim = null
  if (dropEl.value) {
    dropEl.value.innerHTML = ''
    gsap.set(dropEl.value, { clearProps: 'all' })
  }
}

function destroyLoop() {
  destroyLottie(loopAnim)
  loopAnim = null
}

function resetTimers() {
  if (startTimer) {
    clearTimeout(startTimer)
    startTimer = null
  }
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = null
  }
}

function stopAll() {
  resetTimers()
  destroyDrop()
  destroyLoop()
  running = false
}

function swapToLoop(resolve: () => void) {
  destroyDrop()

  if (dropEl.value) {
    gsap.set(dropEl.value, { opacity: 0, visibility: 'hidden' })
  }

  loopAnim?.goToAndPlay(0, true)

  if (loopEl.value) {
    gsap.set(loopEl.value, {
      opacity: 1,
      visibility: 'visible',
      scale: HANDOFF_SCALE,
    })
  }

  running = false
  resolve()
}

function scheduleHandoff(resolve: () => void) {
  if (!running) return
  resetTimers()

  if (dropAnim) {
    const last = Math.max(0, dropAnim.totalFrames - 1)
    dropAnim.goToAndStop(last, true)
  }

  if (loopEl.value) {
    gsap.set(loopEl.value, { scale: HANDOFF_SCALE })
  }

  holdTimer = setTimeout(
    () => swapToLoop(resolve),
    HUYML_DURATION.dropHold * 1000,
  )
}

function playEntrance(): Promise<void> {
  return new Promise((resolve) => {
    if (!dropEl.value || !loopEl.value) {
      resolve()
      return
    }

    if (running) {
      resolve()
      return
    }

    running = true
    resetTimers()
    destroyDrop()
    if (loopAnim) {
      destroyLottie(loopAnim)
      loopAnim = null
    }

    gsap.set(dropEl.value, { opacity: 1, visibility: 'visible', scale: HANDOFF_SCALE })
    gsap.set(loopEl.value, { opacity: 0, visibility: 'hidden', scale: HANDOFF_SCALE })

    loopAnim = mountLottie(loopEl.value, LOOP_SRC, { loop: true, autoplay: false })

    const beginDrop = () => {
      if (!running || !dropEl.value) {
        swapToLoop(resolve)
        return
      }

      dropAnim = mountLottie(dropEl.value, DROP_SRC, { loop: false, autoplay: true })

      const onReady = () => dropAnim?.setSpeed(HUYML_LOTTIE.dropSpeed)
      dropAnim.addEventListener('DOMLoaded', onReady)
      if ((dropAnim as AnimationItem & { isLoaded?: boolean }).isLoaded) onReady()

      dropHandler = () => scheduleHandoff(resolve)
      dropAnim.addEventListener('complete', dropHandler)

      fallbackTimer = setTimeout(() => {
        if (running) scheduleHandoff(resolve)
      }, 16000)
    }

    startTimer = setTimeout(beginDrop, HUYML_DURATION.lottieStart * 1000)
  })
}

onUnmounted(() => stopAll())

defineExpose({ playEntrance })
</script>

<template>
  <div class="hero-lottie" aria-hidden="true">
    <div ref="dropEl" class="hero-lottie__layer hero-lottie__layer--drop" />
    <div ref="loopEl" class="hero-lottie__layer hero-lottie__layer--loop" />
  </div>
</template>

<style scoped lang="scss">
.hero-lottie {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
  line-height: 0;
  pointer-events: none;
}

.hero-lottie__layer {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.hero-lottie__layer--drop {
  align-items: flex-end;
}

.hero-lottie__layer--loop {
  align-items: center;
}

.hero-lottie__layer :deep(svg) {
  width: min(600px, 90vw) !important;
  height: auto !important;
  display: block;
  transform: scale(1.12);
  transform-origin: center bottom;
}

.hero-lottie__layer--loop :deep(svg) {
  max-height: min(42dvh, 380px);
  transform-origin: center center;
}

.hero-lottie__layer--drop :deep(svg) {
  min-height: min(48dvh, 440px);
  transform: scale(1.38);
}
</style>
