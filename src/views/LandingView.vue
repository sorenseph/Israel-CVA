<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavHeader from '../components/NavHeader.vue'
import PreloaderOverlay from '../components/PreloaderOverlay.vue'
import HeroSection from '../components/HeroSection.vue'
import DemoTeaserSection from '../components/DemoTeaserSection.vue'
import DeliverablesSection from '../components/DeliverablesSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import StatsSection from '../components/StatsSection.vue'
import AboutSection from '../components/AboutSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import FaqSection from '../components/FaqSection.vue'
import CtaSection from '../components/CtaSection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterBar from '../components/FooterBar.vue'
import WhatsAppButton from '../components/ui/WhatsAppButton.vue'
import { initLenis } from '../lib/lenis-scroll'

const skipPreloader =
  typeof sessionStorage !== 'undefined' && !!sessionStorage.getItem('icva-preloader-done')

const preloaderDone = ref(skipPreloader)

function onPreloaderReady() {
  preloaderDone.value = true
}

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  initLenis()

  if (skipPreloader) {
    preloaderDone.value = true
  }
})
</script>

<template>
  <div class="landing" data-scroll-container>
    <PreloaderOverlay v-if="!preloaderDone" @ready="onPreloaderReady" />

    <NavHeader :visible="preloaderDone" />

    <main>
      <HeroSection :intro-ready="true" />
      <DeliverablesSection />
      <DemoTeaserSection />
      <ProcessSection />
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
      <ExperienceSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </main>

    <FooterBar />
    <WhatsAppButton />
  </div>
</template>

<style scoped lang="scss">
.landing {
  position: relative;
  overflow-x: hidden;
}
</style>
