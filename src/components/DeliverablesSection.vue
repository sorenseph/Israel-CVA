<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import { useLocale } from '../i18n'
import { deliverableMeta } from '../data/cv'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'
import SectionLottie from './illustrations/SectionLottie.vue'
import PointerLottie from './ui/PointerLottie.vue'
import type { LottieIconKey } from '../data/lottie-icons'

const { messages } = useLocale()

const sectionRef = ref<HTMLElement | null>(null)
const showPointer = ref(false)
let pointerTimer: ReturnType<typeof setTimeout> | null = null
let observer: IntersectionObserver | null = null
let pointerPlayed = false

const deliverables = computed(() =>
  messages.value.projectDeliverables.map((item, i) => ({
    ...item,
    ...deliverableMeta[i],
  })),
)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting || pointerPlayed) return
      pointerPlayed = true
      showPointer.value = true
      pointerTimer = setTimeout(() => {
        showPointer.value = false
      }, 3000)
    },
    { threshold: 0.3, rootMargin: '0px 0px -8% 0px' },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  if (pointerTimer) clearTimeout(pointerTimer)
})
</script>

<template>
  <section id="proyectos" ref="sectionRef" class="deliverables section-block">
    <div class="container">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.deliverables.label"
          :title="messages.sections.deliverables.title"
          :subtitle="messages.sections.deliverables.subtitle"
        />
      </AnimateIn>

      <div class="deliverables__grid">
        <motion.article
          v-for="(item, i) in deliverables"
          :key="item.title"
          class="deliverables__card glass-panel"
          :class="`deliverables__card--${item.span}`"
          :style="{ '--card-accent': item.accent }"
          :initial="{ opacity: 0, y: 28 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.05 }"
          :while-hover="{ y: -6 }"
        >
          <RouterLink :to="`/explorar/${item.slug}`" class="deliverables__link">
            <div class="deliverables__icon">
              <SectionLottie
                :key="item.lottie"
                :name="item.lottie as LottieIconKey"
                size="lg"
              />
              <PointerLottie v-if="i === 0" :visible="showPointer" />
            </div>
            <span class="deliverables__tag">{{ item.tag }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <ul>
              <li v-for="o in item.outcomes" :key="o">{{ o }}</li>
            </ul>
            <span class="deliverables__cta">
              {{ messages.sections.deliverables.exploreCta }} →
            </span>
          </RouterLink>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.deliverables {
  background: $bg-surface;
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
  padding: 0;
  transition: box-shadow $transition;
  overflow: hidden;

  &:hover {
    box-shadow: $shadow-soft;

    .deliverables__cta {
      color: var(--card-accent);
    }
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
}

.deliverables__link {
  display: block;
  position: relative;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  height: 100%;

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
      background: $bg-muted;
      border-radius: $radius-full;
    }
  }
}

.deliverables__icon {
  position: relative;
  margin-bottom: 0.5rem;
  min-height: 128px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: visible;

  &:has(.section-lottie--boost) {
    min-height: 155px;
  }
}

.deliverables__tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--card-accent, $accent-primary);
}

.deliverables__cta {
  display: inline-block;
  margin-top: 0.85rem;
  font-family: $font-display;
  font-size: 0.82rem;
  font-weight: 600;
  color: $text-muted;
  transition: color $transition;
}
</style>
