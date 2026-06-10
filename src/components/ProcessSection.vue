<script setup lang="ts">
import { motion } from 'motion-v'
import { useLocale } from '../i18n'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'

const { messages } = useLocale()
</script>

<template>
  <section id="proceso" class="process section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.process.label"
          :title="messages.sections.process.title"
          :subtitle="messages.sections.process.subtitle"
        />
      </AnimateIn>

      <div class="process__track">
        <motion.div
          v-for="(step, i) in messages.processSteps"
          :key="step.step"
          class="process__step"
          :initial="{ opacity: 0, x: -24 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.1, duration: 0.5 }"
        >
          <span class="process__index">{{ step.step }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.process {
  background: $bg-deep;
}

.process__track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.process__step {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  backdrop-filter: blur(12px);

  h3 {
    font-family: $font-display;
    font-size: 1.05rem;
    margin-bottom: 0.35rem;
  }

  p {
    font-size: 0.9rem;
    color: $text-muted;
    line-height: 1.6;
  }
}

.process__index {
  font-family: $font-display;
  font-size: 2rem;
  font-weight: 800;
  color: $accent-primary;
  opacity: 0.85;
  line-height: 1;
}
</style>
