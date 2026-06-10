<script setup lang="ts">
import { motion } from 'motion-v'
import { useLocale } from '../i18n'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'

const { messages } = useLocale()
</script>

<template>
  <section id="experiencia" class="experience section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.experience.label"
          :title="messages.sections.experience.title"
          :subtitle="messages.sections.experience.subtitle"
        />
      </AnimateIn>

      <div class="timeline">
        <motion.article
          v-for="(job, i) in messages.experience"
          :key="`${job.company}-${job.period}`"
          class="timeline__item"
          :initial="{ opacity: 0, x: -20 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="{ duration: 0.5, delay: i * 0.05 }"
        >
          <div class="timeline__marker" />
          <div class="timeline__card glass-panel">
            <div class="timeline__header">
              <div>
                <h3>{{ job.role }}</h3>
                <p class="timeline__company">{{ job.company }}</p>
              </div>
              <span class="timeline__period">{{ job.period }}</span>
            </div>
            <ul>
              <li v-for="point in job.highlights" :key="point">{{ point }}</li>
            </ul>
          </div>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.experience {
  background: $bg-surface;
}

.timeline {
  position: relative;
  padding-left: 2rem;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: $border-subtle;
  }
}

.timeline__item {
  position: relative;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline__marker {
  position: absolute;
  left: -2rem;
  top: 1.25rem;
  width: 14px;
  height: 14px;
  background: $bg-surface;
  border: 3px solid $accent-primary;
  border-radius: 50%;
}

.timeline__card {
  margin-left: 1rem;
  padding: 1.5rem;
}

.timeline__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  h3 {
    font-family: $font-display;
    font-size: 1.05rem;
  }
}

.timeline__company {
  color: $accent-primary;
  font-size: 0.9rem;
  font-weight: 500;
}

.timeline__period {
  font-size: 0.78rem;
  color: $text-dim;
  padding: 0.25rem 0.65rem;
  background: $bg-muted;
  border-radius: $radius-full;
}

.timeline__card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  li {
    padding-left: 1rem;
    position: relative;
    color: $text-muted;
    font-size: 0.9rem;

    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: $accent-primary;
    }
  }
}
</style>
