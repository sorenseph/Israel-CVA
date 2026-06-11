<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { destroyLottie, mountLottie } from '../../lib/lottie-loader'
import type { AnimationItem } from 'lottie-web'

const props = defineProps<{ visible: boolean }>()

const root = ref<HTMLElement | null>(null)
let anim: AnimationItem | null = null

watch(
  () => props.visible,
  (show) => {
    if (!show) {
      destroyLottie(anim)
      anim = null
      if (root.value) root.value.innerHTML = ''
      return
    }
    if (!root.value) return
    destroyLottie(anim)
    root.value.innerHTML = ''
    anim = mountLottie(root.value, '/lottie/pointer.json', { loop: true, autoplay: true })
  },
  { immediate: true },
)

onUnmounted(() => destroyLottie(anim))
</script>

<template>
  <div v-show="visible" class="pointer-lottie" aria-hidden="true">
    <div ref="root" class="pointer-lottie__anim" />
  </div>
</template>

<style scoped lang="scss">
.pointer-lottie {
  position: absolute;
  right: 0.5rem;
  bottom: 0.25rem;
  width: 72px;
  height: 72px;
  pointer-events: none;
  z-index: 4;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12));

  &__anim {
    width: 100%;
    height: 100%;
  }
}
</style>
