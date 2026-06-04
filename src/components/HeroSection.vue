<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { profile } from '../data/cv'
import { gsap, HUYML_DURATION, HUYML_EASE, HUYML_STAGGER } from '../lib/gsap-setup'
import { splitChars } from '../lib/split-chars'
import GradientButton from './ui/GradientButton.vue'
import HeroLottie from './illustrations/HeroLottie.vue'

const props = defineProps<{
  introReady?: boolean
}>()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const lottieRef = ref<InstanceType<typeof HeroLottie> | null>(null)
const lottiePhase = ref(false)

const nameParts = profile.name.split(' ')
const firstName = nameParts[0] ?? profile.name
const lastName = nameParts.slice(1).join(' ') || 'ICVA'

let introTimeline: gsap.core.Timeline | null = null
let splitDone = false
let introStarted = false
let scheduleId: ReturnType<typeof setTimeout> | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getTargets() {
  const chars = titleRef.value?.querySelectorAll('.char')
  const copy = sectionRef.value?.querySelectorAll('.hero-intro, .hero-pitch')
  const actions = sectionRef.value?.querySelector('.hero__actions')
  return { chars, copy, actions }
}

function showFinalState() {
  const { chars, copy, actions } = getTargets()
  if (chars?.length) gsap.set(chars, { yPercent: 0, opacity: 1 })
  if (copy?.length) gsap.set(copy, { opacity: 1, y: 0 })
  if (actions) gsap.set(actions, { opacity: 1, y: 0 })
}

async function waitForLottieRef() {
  for (let i = 0; i < 40; i += 1) {
    if (lottieRef.value) return lottieRef.value
    await nextTick()
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
  }
  return null
}

function runTextIntro() {
  const { chars, copy, actions } = getTargets()

  if (prefersReducedMotion() || !chars?.length) {
    showFinalState()
    return
  }

  gsap.set(chars, { yPercent: 110, opacity: 1 })
  if (copy?.length) gsap.set(copy, { opacity: 0, y: 16 })
  if (actions) gsap.set(actions, { opacity: 0, y: 20 })

  introTimeline?.kill()
  introTimeline = gsap.timeline({
    defaults: { ease: HUYML_EASE.power1 },
    delay: 0.25,
  })

  introTimeline.to(chars, {
    yPercent: 0,
    duration: HUYML_DURATION.text,
    stagger: HUYML_STAGGER.title,
  })

  if (copy?.length) {
    introTimeline.to(
      copy,
      { opacity: 1, y: 0, duration: HUYML_DURATION.reveal, stagger: 0.06 },
      '-=0.42',
    )
  }

  if (actions) {
    introTimeline.to(actions, { opacity: 1, y: 0, duration: HUYML_DURATION.reveal }, '-=0.32')
  }
}

async function runHeroIntro() {
  if (!props.introReady || introStarted) return
  introStarted = true

  const lottie = await waitForLottieRef()
  if (!titleRef.value) {
    introStarted = false
    return
  }

  if (!splitDone) {
    splitChars(titleRef.value)
    splitDone = true
    await nextTick()
  }

  lottiePhase.value = true
  await (lottie?.playEntrance() ?? Promise.resolve())
  lottiePhase.value = false
  runTextIntro()
}

function scheduleIntro() {
  if (!props.introReady || introStarted) return
  if (scheduleId) clearTimeout(scheduleId)
  scheduleId = setTimeout(() => {
    scheduleId = null
    void runHeroIntro()
  }, 200)
}

watch(
  () => props.introReady,
  (ready) => {
    if (ready) scheduleIntro()
  },
)

onMounted(() => {
  if (props.introReady) scheduleIntro()
})

onUnmounted(() => {
  if (scheduleId) clearTimeout(scheduleId)
  introTimeline?.kill()
  introTimeline = null
  showFinalState()
})
</script>

<template>
  <section
    id="inicio"
    ref="sectionRef"
    class="hero-home"
    :class="{ 'hero-home--lottie': lottiePhase }"
  >
    <div class="hero-home__stack container">
      <header class="hello">
        <p class="hero-intro">{{ profile.heroLead }}</p>
        <h1 ref="titleRef" class="hello-title">
          <span class="hello-title__first">{{ firstName }}</span>
          <span class="hello-title__last">{{ lastName }}</span>
        </h1>
        <p class="hero-pitch">{{ profile.heroPitch }}</p>
      </header>

      <div class="person-lottie">
        <HeroLottie ref="lottieRef" />
      </div>

      <div class="hero__actions">
        <GradientButton href="#contacto">Iniciar proyecto</GradientButton>
        <GradientButton href="#demos" variant="outline">Ver demos</GradientButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.hero-home {
  position: relative;
  padding: 0 !important;
  padding-top: $nav-height !important;
  background: $bg-deep;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100dvh;
  height: 100dvh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.hero-home__stack {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  align-items: center;
  justify-items: center;
  gap: clamp(0.85rem, 2.5vh, 1.75rem);
  padding: clamp(0.35rem, 1.5vh, 0.85rem) 0 clamp(1.25rem, 4vh, 2.25rem);
}

/* Durante HomeDrop el JSON ya trae "Studio" — ocultamos el título HTML */
.hero-home--lottie {
  overflow: visible;
}

.hero-home--lottie .hero-home__stack {
  grid-template-rows: 1fr;
  padding-top: clamp(2.5rem, 11vh, 5.5rem);
  padding-bottom: clamp(2rem, 8vh, 4rem);
  align-content: center;
}

.hero-home--lottie .hello,
.hero-home--lottie .hero__actions {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.hero-home--lottie .person-lottie {
  grid-row: 1;
  width: min(560px, 92vw);
  height: min(50dvh, 440px);
  align-self: center;
  margin-top: clamp(1rem, 4vh, 2.5rem);
  overflow: visible;
}

.hello {
  width: 100%;
  max-width: 920px;
  text-align: center;
  padding: 0;
  position: relative;
  z-index: 2;
}

.hero-intro {
  font-family: $font-display;
  font-size: clamp(0.72rem, 2.8vw, 0.9rem);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: $accent-primary;
  font-weight: 600;
  margin: 0 0 0.5rem;
  opacity: 0;
}

.hello-title {
  font-family: $font-display;
  font-size: clamp(2.75rem, 14vw, 8.5rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
  overflow: hidden;
  font-weight: 700;
  margin: 0;

  @media (min-width: 48em) {
    font-size: clamp(4.5rem, 11vw, 10rem);
  }

  :deep(.char) {
    display: inline-block;
    will-change: transform;
  }
}

.hello-title__first {
  display: block;
  font-weight: 500;
}

.hello-title__last {
  display: block;
}

.hero-pitch {
  font-family: $font-display;
  font-size: clamp(0.9rem, 2.2vw, 1.2rem);
  line-height: 1.35;
  color: $text-muted;
  font-weight: 500;
  max-width: 34em;
  margin: clamp(0.5rem, 1.5vh, 1rem) auto 0;
  letter-spacing: -0.02em;
  opacity: 0;
}

.person-lottie {
  width: min(520px, 88vw);
  height: min(32dvh, 280px);
  max-height: 100%;
  margin: 0 auto clamp(0.25rem, 1vh, 0.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-shrink: 1;
  overflow: visible;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-top: clamp(0.35rem, 1.2vh, 0.85rem);
  padding-bottom: clamp(0.25rem, 1vh, 0.5rem);
  opacity: 0;
  z-index: 2;
  position: relative;
  flex-shrink: 0;
}
</style>
