<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { destroyLottie, mountLottie } from '../../lib/lottie-loader'
import {
  lottieIcons,
  lottieIconLayout,
  type LottieIconKey,
} from '../../data/lottie-icons'
import type { AnimationItem } from 'lottie-web'

const props = withDefaults(
  defineProps<{
    name: LottieIconKey
    size?: 'sm' | 'md' | 'lg' | 'boost'
  }>(),
  { size: undefined },
)

const root = ref<HTMLElement | null>(null)
let anim: AnimationItem | null = null

const layout = computed(() => lottieIconLayout[props.name])

const resolvedSize = computed(() => props.size ?? layout.value?.size ?? 'md')

const rootClass = computed(() => {
  const classes = [`section-lottie--${resolvedSize.value}`]
  const variant = layout.value?.variant
  if (variant) classes.push(`section-lottie--${variant}`)
  return classes
})

async function loadAnimation() {
  if (!root.value) return
  destroyLottie(anim)
  anim = null
  root.value.innerHTML = ''
  anim = await mountLottie(root.value, lottieIcons[props.name], {
    loop: true,
    autoplay: true,
  })
}

onMounted(loadAnimation)

watch(() => props.name, loadAnimation)
watch(resolvedSize, loadAnimation)

onUnmounted(() => destroyLottie(anim))
</script>

<template>
  <div
    :key="`${name}-${resolvedSize}`"
    ref="root"
    class="section-lottie"
    :class="rootClass"
    aria-hidden="true"
  />
</template>

<style scoped lang="scss">
.section-lottie {
  line-height: 0;
  pointer-events: none;
  filter: grayscale(1) contrast(1.05) brightness(0.95);
  opacity: 0.92;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: visible;

  :deep(svg) {
    width: auto !important;
    height: 100% !important;
    max-width: none;
    display: block;
  }
}

.section-lottie--sm {
  width: 88px;
  height: 72px;
}

.section-lottie--md {
  width: 140px;
  height: 108px;
}

.section-lottie--lg {
  width: 168px;
  height: 128px;
}

.section-lottie--boost {
  width: 180px;
  height: 140px;
  min-width: 180px;

  :deep(svg) {
    transform: scale(3.35);
    transform-origin: bottom left;
  }
}

/* Barra de búsqueda — proporción horizontal */
.section-lottie--wide {
  width: 200px;
  height: 56px;
  min-width: 200px;

  :deep(svg) {
    transform: scale(1.35);
    transform-origin: bottom left;
  }
}

/* Ilustración de creación web — lienzo grande en el JSON */
.section-lottie--scene {
  width: 220px;
  height: 130px;

  :deep(svg) {
    transform: scale(0.42);
    transform-origin: bottom left;
  }
}

.section-lottie--scene-center {
  width: min(600px, 88vw);
  height: 336px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  :deep(svg) {
    width: 100% !important;
    height: 100% !important;
    max-height: 336px;
    transform: none;
    transform-origin: center center;
  }
}
</style>
