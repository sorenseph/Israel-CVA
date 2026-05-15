<script setup lang="ts">
import NavHeader from './components/NavHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ShowcaseSection from './components/ShowcaseSection.vue'
import DeliverablesSection from './components/DeliverablesSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="app">
    <div class="bg-mesh" aria-hidden="true" />
    <NavHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ShowcaseSection />
      <DeliverablesSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<style scoped lang="scss">
.app {
  position: relative;
}
</style>
