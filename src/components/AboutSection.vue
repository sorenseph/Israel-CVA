<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useLocale } from '../i18n'
import { pillarLotties } from '../data/landing'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'
import SectionLottie from './illustrations/SectionLottie.vue'

const { messages } = useLocale()

const pillars = computed(() =>
  messages.value.studioPillars.map((pillar, i) => ({
    ...pillar,
    lottie: pillarLotties[i],
  })),
)
</script>

<template>
  <section id="sobre-mi" class="about section-block">
    <div class="container">
      <AnimateIn>
        <div class="about__head">
          <SectionTitle
            :label="messages.sections.about.label"
            :title="messages.sections.about.title"
            :subtitle="messages.profile.title"
          />
          <div class="about__head-lottie">
            <SectionLottie name="create-web" />
          </div>
        </div>
      </AnimateIn>

      <div class="about__layout">
        <AnimateIn :delay="0.1">
          <div class="about__card glass-panel">
            <p>{{ messages.profile.summary }}</p>
            <ul class="about__benefits">
              <motion.li
                v-for="(b, i) in messages.benefits"
                :key="b"
                :initial="{ opacity: 0, x: -12 }"
                :while-in-view="{ opacity: 1, x: 0 }"
                :viewport="{ once: true }"
                :transition="{ delay: 0.1 + i * 0.06 }"
              >
                {{ b }}
              </motion.li>
            </ul>
          </div>
        </AnimateIn>

        <AnimateIn :delay="0.2">
          <div class="about__pillars">
            <motion.article
              v-for="(pillar, i) in pillars"
              :key="pillar.title"
              class="about__pillar glass-panel"
              :initial="{ opacity: 0, y: 20 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true }"
              :transition="{ delay: i * 0.08 }"
            >
              <SectionLottie :key="pillarLotties[i]" :name="pillarLotties[i]" size="sm" />
              <h3>{{ pillar.title }}</h3>
              <p>{{ pillar.text }}</p>
            </motion.article>
          </div>
        </AnimateIn>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.about {
  background: $bg-deep;
}

.about__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2.5rem;
  gap: 1.25rem;
}

.about__head-lottie {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(600px, 88vw);
  height: 336px;
  margin: 0 auto;
  overflow: visible;
}

.about__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.about__card {
  padding: 2rem;
}

.about__card p {
  color: $text-muted;
  font-size: 1.05rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.about__benefits {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  li {
    position: relative;
    padding-left: 1.25rem;
    font-size: 0.92rem;
    color: $text-primary;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $accent-primary;
    }
  }
}

.about__pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
}

.about__pillar {
  padding: 1.25rem;

  h3 {
    font-family: $font-display;
    font-size: 0.95rem;
    margin: 0.65rem 0 0.35rem;
  }

  p {
    font-size: 0.82rem;
    color: $text-muted;
    line-height: 1.55;
    margin: 0;
  }
}
</style>
