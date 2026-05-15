<script setup lang="ts">
import { motion } from 'motion-v'
import { projectDeliverables } from '../data/cv'
import SectionTitle from './ui/SectionTitle.vue'
import HumanFigure from './ui/HumanFigure.vue'
</script>

<template>
  <section id="proyectos" class="deliverables">
    <motion.div
      class="container"
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :viewport="{ once: true }"
    >
      <SectionTitle
        label="Entregables"
        title="Proyectos que construyo para clientes"
        subtitle="Desde startups hasta empresas: web apps, tiendas, SaaS, portales corporativos y productos digitales a medida."
      />

      <div class="deliverables__layout">
        <div class="deliverables__grid">
        <motion.article
          v-for="(item, i) in projectDeliverables"
          :key="item.title"
          class="deliverables__card"
          :class="`deliverables__card--${item.span}`"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.06 }"
          :while-hover="{ y: -6 }"
        >
          <span class="deliverables__tag">{{ item.tag }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <ul>
            <li v-for="f in item.features" :key="f">{{ f }}</li>
          </ul>
        </motion.article>
        </div>
        <HumanFigure name="posePower" size="lg" class="deliverables__figure" :delay="0.2" />
      </div>
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.deliverables__layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: end;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    .deliverables__figure {
      display: none;
    }
  }
}

.deliverables__figure {
  align-self: center;
  max-width: 280px;
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
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 1.5rem;
  transition: border-color $transition, box-shadow $transition;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
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
      background: rgba(255, 255, 255, 0.06);
      border-radius: $radius-full;
      color: $text-dim;
    }
  }
}

.deliverables__tag {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $accent-secondary;
}
</style>
