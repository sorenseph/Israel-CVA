<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NavHeader from '../components/NavHeader.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import FooterBar from '../components/FooterBar.vue'
import WhatsAppButton from '../components/ui/WhatsAppButton.vue'
import { useLocale } from '../i18n'
import { initLenis } from '../lib/lenis-scroll'

const { messages } = useLocale()

onMounted(() => {
  window.scrollTo(0, 0)
  initLenis()
})
</script>

<template>
  <div class="demo-page" data-scroll-container>
    <NavHeader :visible="true" />

    <div class="demo-page__back container">
      <RouterLink to="/" class="demo-page__back-link">← {{ messages.simulators.back }}</RouterLink>
    </div>

    <main>
      <ShowcaseSection standalone />
    </main>

    <FooterBar />
    <WhatsAppButton />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.demo-page {
  min-height: 100dvh;
  background: $bg-deep;
}

.demo-page__back {
  padding-top: calc($nav-height + 0.75rem);
  padding-bottom: 0.25rem;
}

.demo-page__back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: $font-display;
  font-size: 0.88rem;
  font-weight: 500;
  color: $text-muted;
  text-decoration: none;
  transition: color $transition;

  &:hover {
    color: $text-primary;
  }

  &:focus-visible {
    outline: 2px solid $accent-primary;
    outline-offset: 3px;
    border-radius: 4px;
  }
}
</style>
