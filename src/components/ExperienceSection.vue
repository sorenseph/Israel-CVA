<script setup lang="ts">
import { motion } from 'motion-v'
import { experience } from '../data/cv'
import SectionTitle from './ui/SectionTitle.vue'
import HumanFigure from './ui/HumanFigure.vue'
</script>

<template>
  <section id="experiencia" class="experience">
    <motion.div
      class="container"
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :viewport="{ once: true }"
    >
      <SectionTitle
        label="Trayectoria"
        title="Experiencia laboral"
        subtitle="Trayectoria en empresas, agencias y sector financiero — disponible bajo solicitud en entrevista."
      />

      <div class="experience__layout">
      <div class="timeline">
        <motion.article
          v-for="(job, i) in experience"
          :key="`${job.company}-${job.period}`"
          class="timeline__item"
          :initial="{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="{ duration: 0.5, delay: i * 0.06 }"
        >
          <div class="timeline__marker" />
          <div class="timeline__card">
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
      <HumanFigure name="poseScroll" size="lg" class="experience__figure" :delay="0.15" />
      </div>
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.experience__layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    .experience__figure {
      display: none;
    }
  }
}

.experience__figure {
  position: sticky;
  top: calc(#{$nav-height} + 2rem);
  max-width: 240px;
  opacity: 0.85;
}

.experience {
  background: transparent;
  opacity: 0.92;

  :deep(.section-title__heading) {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }
}

.timeline {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, $accent-primary, $accent-secondary, transparent);
  }

  &__item {
    position: relative;
    padding-bottom: 2rem;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__marker {
    position: absolute;
    left: -2rem;
    top: 1.25rem;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    background: $bg-deep;
    border: 3px solid $accent-primary;
    border-radius: 50%;
    box-shadow: 0 0 12px $accent-glow;
  }

  &__card {
    background: $bg-card;
    border: 1px solid $border-subtle;
    border-radius: $radius-md;
    padding: 1.5rem 1.75rem;
    margin-left: 1rem;
    transition: border-color $transition, background $transition;

    &:hover {
      border-color: rgba(99, 102, 241, 0.35);
      background: $bg-card-hover;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;

    h3 {
      font-family: $font-display;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }
  }

  &__company {
    color: $accent-secondary;
    font-size: 0.9rem;
    font-weight: 500;
  }

  &__period {
    font-size: 0.8rem;
    color: $text-dim;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: $radius-full;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      position: relative;
      padding-left: 1.25rem;
      color: $text-muted;
      font-size: 0.92rem;

      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: $accent-primary;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
