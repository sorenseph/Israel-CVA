<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useLocale } from '../i18n'
import SectionTitle from './ui/SectionTitle.vue'
import GradientButton from './ui/GradientButton.vue'
import AnimateIn from './ui/AnimateIn.vue'

const { messages } = useLocale()
</script>

<template>
  <section id="demos" class="demo-teaser section-block">
    <div class="container demo-teaser__wrap">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.showcase.label"
          :title="messages.sections.showcase.title"
          :subtitle="messages.sections.showcase.teaserHint"
        />
        <div class="demo-teaser__cta">
          <GradientButton to="/demo">{{ messages.sections.showcase.enterDemo }}</GradientButton>
          <GradientButton href="#proyectos" variant="outline">
            {{ messages.sections.showcase.ctaSecondary }}
          </GradientButton>
        </div>
      </AnimateIn>

      <AnimateIn :delay="0.08">
        <RouterLink
          to="/demo"
          class="demo-teaser__preview"
          :aria-label="messages.sections.showcase.enterDemo"
        >
          <div class="demo-teaser__chrome">
            <span /><span /><span />
            <p>studio-icva.app — preview</p>
          </div>
          <div class="demo-teaser__mock">
            <aside class="demo-teaser__sidebar">
              <span class="demo-teaser__logo" />
              <span v-for="n in 3" :key="n" class="demo-teaser__nav" />
            </aside>
            <div class="demo-teaser__main">
              <div class="demo-teaser__toolbar" />
              <div class="demo-teaser__grid">
                <span v-for="n in 4" :key="n" class="demo-teaser__card" />
              </div>
            </div>
          </div>
          <span class="demo-teaser__overlay">{{ messages.sections.showcase.enterDemo }} →</span>
        </RouterLink>
      </AnimateIn>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.demo-teaser {
  background: $bg-deep;
}

.demo-teaser__wrap {
  max-width: 1100px;
  margin: 0 auto;
}

.demo-teaser__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

.demo-teaser__preview {
  position: relative;
  display: block;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-soft;
  border: 1px solid $border-subtle;
  text-decoration: none;
  color: inherit;
  transition: transform $transition, box-shadow $transition;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);

    .demo-teaser__overlay {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid $accent-primary;
    outline-offset: 4px;
  }
}

.demo-teaser__chrome {
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

.demo-teaser__mock {
  display: grid;
  grid-template-columns: 72px 1fr;
  min-height: 220px;
  background: #fff;

  @media (min-width: 640px) {
    min-height: 280px;
    grid-template-columns: 92px 1fr;
  }
}

.demo-teaser__sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.85rem 0.65rem;
  background: $bg-muted;
  border-right: 1px solid $border-subtle;
}

.demo-teaser__logo {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, $accent-primary, #6366f1);
  margin-bottom: 0.35rem;
}

.demo-teaser__nav {
  height: 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);

  &:nth-child(3) {
    width: 85%;
    background: rgba(14, 133, 255, 0.2);
  }
}

.demo-teaser__main {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.demo-teaser__toolbar {
  height: 28px;
  border-radius: 999px;
  background: $bg-muted;
  border: 1px solid $border-subtle;
}

.demo-teaser__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
  flex: 1;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.demo-teaser__card {
  min-height: 72px;
  border-radius: $radius-sm;
  background: linear-gradient(180deg, $bg-muted, rgba(14, 133, 255, 0.06));
  border: 1px solid $border-subtle;
}

.demo-teaser__overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(244, 243, 239, 0.72);
  backdrop-filter: blur(2px);
  font-family: $font-display;
  font-weight: 600;
  font-size: 1rem;
  color: $text-primary;
  opacity: 0;
  transition: opacity $transition;
  pointer-events: none;
}
</style>
