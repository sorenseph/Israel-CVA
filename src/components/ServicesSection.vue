<script setup lang="ts">
import { motion } from 'motion-v'
import { services } from '../data/landing'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'
import SectionLottie from './illustrations/SectionLottie.vue'
import type { LottieIconKey } from '../data/lottie-icons'
</script>

<template>
  <section id="servicios" class="services section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle
          label="Servicios"
          title="Productos digitales a tu medida"
          subtitle="Sitios, webapps, SaaS, e-commerce, CRM y apps móviles — desde la idea hasta el lanzamiento."
        />
      </AnimateIn>

      <div class="services__grid">
        <motion.article
          v-for="(item, i) in services"
          :key="item.title"
          class="services__card glass-panel"
          :initial="{ opacity: 0, y: 40 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="{ delay: i * 0.08, duration: 0.6 }"
          :while-hover="{ y: -8, transition: { duration: 0.25 } }"
        >
          <div class="services__icon">
            <SectionLottie
              :key="item.lottie"
              :name="item.lottie as LottieIconKey"
            />
          </div>
          <span class="services__num">{{ item.num }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <ul>
            <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
          </ul>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.services {
  background: $bg-surface;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.services__card {
  padding: 2rem;
  transition: box-shadow $transition, border-color $transition;

  &:hover {
    border-color: $border-strong;
    box-shadow: $shadow-soft;
  }

  h3 {
    font-family: $font-display;
    font-size: 1.25rem;
    margin: 0.5rem 0 0.75rem;
  }

  p {
    color: $text-muted;
    font-size: 0.95rem;
    line-height: 1.65;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;

    li {
      font-size: 0.72rem;
      padding: 0.25rem 0.65rem;
      background: $bg-muted;
      border-radius: $radius-full;
      font-weight: 500;
    }
  }
}

.services__icon {
  margin-bottom: 0.5rem;
  min-height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: visible;
}

.services__icon:has(.section-lottie--boost),
.services__icon:has(.section-lottie--scene) {
  min-height: 130px;
}

.services__num {
  font-family: $font-display;
  font-size: 0.75rem;
  font-weight: 700;
  color: $accent-primary;
  letter-spacing: 0.1em;
}
</style>
