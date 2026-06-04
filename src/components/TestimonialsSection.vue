<script setup lang="ts">
import { motion } from 'motion-v'
import { testimonials } from '../data/landing'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'
</script>

<template>
  <section id="testimonios" class="testimonials section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle label="Confianza" title="Lo que dicen los equipos" />
      </AnimateIn>

      <div class="testimonials__grid">
        <motion.blockquote
          v-for="(t, i) in testimonials"
          :key="t.author"
          class="testimonials__card glass-panel"
          :initial="{ opacity: 0, y: 32 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.12 }"
        >
          <p>“{{ t.quote }}”</p>
          <footer>
            <strong>{{ t.author }}</strong>
            <span>{{ t.role }}</span>
          </footer>
        </motion.blockquote>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.testimonials {
  background: $bg-deep;
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.testimonials__card {
  padding: 2rem;
  margin: 0;

  p {
    font-size: 1.1rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
    color: $text-primary;
  }

  footer {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    strong {
      font-family: $font-display;
      font-size: 0.9rem;
    }

    span {
      font-size: 0.8rem;
      color: $text-muted;
    }
  }
}
</style>
