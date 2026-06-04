<script setup lang="ts">
import { motion } from 'motion-v'
import { projectDeliverables } from '../data/cv'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'
import SectionLottie from './illustrations/SectionLottie.vue'
import type { LottieIconKey } from '../data/lottie-icons'
</script>

<template>
  <section id="proyectos" class="deliverables section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle
          label="Proyectos"
          title="Lo que podemos construir contigo"
          subtitle="Tipos de producto que lanzamos con marcas, startups y equipos corporativos."
        />
      </AnimateIn>

      <div class="deliverables__grid">
        <motion.article
          v-for="(item, i) in projectDeliverables"
          :key="item.title"
          class="deliverables__card glass-panel"
          :class="`deliverables__card--${item.span}`"
          :initial="{ opacity: 0, y: 28 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.05 }"
          :while-hover="{ y: -6 }"
        >
          <div class="deliverables__icon">
            <SectionLottie
              :key="item.lottie"
              :name="item.lottie as LottieIconKey"
              size="lg"
            />
          </div>
          <span class="deliverables__tag">{{ item.tag }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <ul>
            <li v-for="o in item.outcomes" :key="o">{{ o }}</li>
          </ul>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.deliverables {
  background: $bg-surface;
}

.deliverables__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.deliverables__card {
  padding: 1.5rem;
  transition: box-shadow $transition;

  &:hover {
    box-shadow: $shadow-soft;
  }

  &--wide {
    grid-column: span 2;
    @media (max-width: 900px) {
      grid-column: span 1;
    }
  }

  &--tall {
    grid-row: span 2;
    @media (max-width: 900px) {
      grid-row: span 1;
    }
  }

  h3 {
    font-family: $font-display;
    font-size: 1.05rem;
    margin: 0.35rem 0 0.5rem;
  }

  p {
    font-size: 0.88rem;
    color: $text-muted;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;

    li {
      font-size: 0.7rem;
      padding: 0.2rem 0.55rem;
      background: $bg-muted;
      border-radius: $radius-full;
    }
  }
}

.deliverables__icon {
  margin-bottom: 0.5rem;
  min-height: 128px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: visible;
}

.deliverables__icon:has(.section-lottie--boost) {
  min-height: 155px;
}

.deliverables__tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $accent-primary;
}
</style>
