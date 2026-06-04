<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap, HUYML_EASE } from '../lib/gsap-setup'

const emit = defineEmits<{ ready: [] }>()

const root = ref<HTMLElement | null>(null)
const SKIP_KEY = 'icva-preloader-done'

onMounted(() => {
  if (sessionStorage.getItem(SKIP_KEY)) {
    emit('ready')
    return
  }

  if (!root.value) {
    emit('ready')
    return
  }

  sessionStorage.setItem(SKIP_KEY, '1')

  gsap.set(root.value, { autoAlpha: 1, visibility: 'visible' })

  const tl = gsap.timeline({
    defaults: { ease: HUYML_EASE.expo },
    onComplete: () => {
      gsap.to(root.value, {
        autoAlpha: 0,
        duration: 0.45,
        onComplete: () => emit('ready'),
      })
    },
  })

  tl.to({}, { duration: 0.12 }).to(root.value, {
    autoAlpha: 0,
    duration: 0.45,
    delay: 0.08,
  })
})

</script>

<template>
  <div ref="root" class="preloader-overlay" aria-hidden="true" />
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.preloader-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $fill-soft;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}

</style>
