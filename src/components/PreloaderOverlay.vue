<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap, HUYML_DURATION, HUYML_EASE } from '../lib/gsap-setup'

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

  tl.from('.preloader-overlay__taglines p', {
    opacity: 0,
    y: 14,
    duration: HUYML_DURATION.base,
    stagger: 0.12,
  }).to({}, { duration: 1.1 })
})

</script>

<template>
  <div ref="root" class="preloader-overlay" aria-hidden="true">
    <div class="preloader-overlay__taglines">
      <p>Productos digitales de alto impacto.</p>
      <p>Webapps, SaaS y e-commerce.</p>
    </div>
  </div>
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

.preloader-overlay__taglines {
  width: min(92vw, 640px);
  text-align: center;

  p {
    font-family: $font-display;
    font-size: clamp(0.72rem, 2vw, 0.88rem);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-muted;
    margin: 0.2rem 0;
    line-height: 1.35;
  }
}
</style>
