<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useLocale } from '../i18n'
import SectionTitle from './ui/SectionTitle.vue'
import ShowcaseApp from './showcase/ShowcaseApp.vue'
import GradientButton from './ui/GradientButton.vue'
import AnimateIn from './ui/AnimateIn.vue'

const props = withDefaults(
  defineProps<{
    standalone?: boolean
  }>(),
  { standalone: false },
)

const { messages } = useLocale()

const contactHref = computed(() => (props.standalone ? '/#contacto' : '#contacto'))
const projectsHref = computed(() => (props.standalone ? '/#proyectos' : '#proyectos'))
</script>

<template>
  <section id="demos" class="showcase section-block">
    <div class="container showcase__wrap">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.showcase.label"
          :title="messages.sections.showcase.title"
          :subtitle="messages.sections.showcase.subtitle"
        />
        <div class="showcase__cta">
          <GradientButton :href="contactHref">{{ messages.sections.showcase.ctaPrimary }}</GradientButton>
          <GradientButton :href="projectsHref" variant="outline">{{ messages.sections.showcase.ctaSecondary }}</GradientButton>
        </div>
      </AnimateIn>

      <motion.div
        class="showcase__stage"
        :initial="{ opacity: 0, y: 48 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-60px' }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
      >
        <div class="showcase__browser-chrome">
          <span /><span /><span />
          <p>studio-icva.app — preview</p>
        </div>
        <ShowcaseApp />
      </motion.div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.showcase {
  background: $bg-deep;
}

.showcase__wrap {
  max-width: 1400px;
  margin: 0 auto;
}

.showcase__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
}

.showcase__stage {
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-soft;
  border: 1px solid $border-subtle;
}

.showcase__browser-chrome {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background: $bg-muted;
  border-bottom: 1px solid $border-subtle;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    &:nth-child(1) {
      background: #ff5f57;
    }
    &:nth-child(2) {
      background: #febc2e;
    }
    &:nth-child(3) {
      background: #28c840;
    }
  }

  p {
    margin-left: auto;
    font-size: 0.75rem;
    color: $text-dim;
  }
}
</style>
