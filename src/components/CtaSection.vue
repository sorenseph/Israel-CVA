<script setup lang="ts">
import { motion } from 'motion-v'
import { profile } from '../data/cv'
import GradientButton from './ui/GradientButton.vue'
import AnimateIn from './ui/AnimateIn.vue'
</script>

<template>
  <section class="cta section-block">
    <div class="container">
      <AnimateIn>
        <motion.div
          class="cta__panel glass-panel"
          :while-in-view="{ scale: [0.98, 1] }"
          :viewport="{ once: true }"
        >
          <h2>¿Listo para lanzar tu producto digital?</h2>
          <p>Cuéntanos tu idea y te respondemos en menos de 24 horas con los siguientes pasos.</p>
          <div class="cta__actions">
            <GradientButton href="#contacto">Hablemos</GradientButton>
            <GradientButton :href="`mailto:${profile.email}`" variant="outline">Email directo</GradientButton>
          </div>
        </motion.div>
      </AnimateIn>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.cta {
  background: $bg-deep;
  padding-bottom: 2rem;
}

.cta__panel {
  text-align: center;
  padding: clamp(3rem, 8vw, 4.5rem) 2rem;
  background: linear-gradient(135deg, rgba(14, 133, 255, 0.08), rgba(255, 255, 255, 0.9));

  h2 {
    font-family: $font-display;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  p {
    color: $text-muted;
    margin-bottom: 2rem;
    font-size: 1.05rem;
  }
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
