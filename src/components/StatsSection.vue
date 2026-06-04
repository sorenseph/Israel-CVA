<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { useIntersectionObserver } from '@vueuse/core'
import { stats } from '../data/landing'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'

const root = ref<HTMLElement | null>(null)
const started = ref(false)
const display = ref(stats.map(() => 0))

useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry?.isIntersecting && !started.value) {
      started.value = true
      stats.forEach((s, i) => animateTo(s.value, i))
    }
  },
  { threshold: 0.3 },
)

function animateTo(target: number, index: number) {
  const start = performance.now()
  const duration = 1400
  const from = display.value[index] ?? 0

  function tick(now: number) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    display.value[index] = Math.round(from + (target - from) * eased)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
</script>

<template>
  <section ref="root" class="stats section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle label="Impacto" title="Números que respaldan el trabajo" />
      </AnimateIn>

      <div class="stats__grid">
        <motion.div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stats__item glass-panel"
          :initial="{ opacity: 0, scale: 0.92 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.08 }"
        >
          <p class="stats__value">
            {{ display[i] }}{{ stat.suffix }}
          </p>
          <p class="stats__label">{{ stat.label }}</p>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.stats {
  background: $stroke-ink;
  color: $bg-surface;

  :deep(.section-title__label),
  :deep(.section-title__heading),
  :deep(.section-title__sub) {
    color: $bg-surface;
  }

  :deep(.section-title__sub) {
    opacity: 0.7;
  }

  :deep(.section-title__label) {
    color: #6eb6ff;
  }
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stats__item {
  padding: 2rem 1.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.stats__value {
  font-family: $font-display;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stats__label {
  font-size: 0.88rem;
  opacity: 0.75;
}
</style>
