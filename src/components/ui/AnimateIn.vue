<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, ScrollTrigger, HUYML_DURATION, HUYML_EASE } from '../../lib/gsap-setup'

const props = withDefaults(
  defineProps<{
    delay?: number
    y?: number
    once?: boolean
  }>(),
  { delay: 0, y: 48, once: true },
)

const root = ref<HTMLElement | null>(null)
let trigger: ScrollTrigger | null = null

onMounted(() => {
  if (!root.value) return
  gsap.set(root.value, { opacity: 0, y: props.y })

  trigger = ScrollTrigger.create({
    trigger: root.value,
    start: 'top 88%',
    once: props.once,
    onEnter: () => {
      gsap.to(root.value, {
        opacity: 1,
        y: 0,
        duration: HUYML_DURATION.text,
        delay: props.delay,
        ease: HUYML_EASE.power1,
      })
    },
  })
})

onUnmounted(() => {
  trigger?.kill()
})
</script>

<template>
  <div ref="root" class="animate-in">
    <slot />
  </div>
</template>
