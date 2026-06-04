<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap, HUYML_EASE } from '../lib/gsap-setup'
import { navLinks } from '../data/cv'
import SiteLogo from './ui/SiteLogo.vue'

const props = defineProps<{
  visible?: boolean
}>()

const scrolled = ref(false)
const menuOpen = ref(false)
const navInner = ref<HTMLElement | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (navInner.value) gsap.set(navInner.value, { opacity: props.visible ? 1 : 0, y: props.visible ? 0 : -16 })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(
  () => props.visible,
  (v) => {
    if (!v || !navInner.value) return
    gsap.to(navInner.value, { opacity: 1, y: 0, duration: 1, ease: HUYML_EASE.power1, delay: 0.5 })
  },
)
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': menuOpen }">
    <nav ref="navInner" class="nav__inner container">
      <a href="#inicio" class="nav__logo" @click="closeMenu">
        <SiteLogo size="md" />
      </a>

      <button
        class="nav__toggle"
        :aria-expanded="menuOpen"
        aria-label="Menú"
        @click="menuOpen = !menuOpen"
      >
        <span />
        <span />
      </button>

      <ul class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <li v-for="link in navLinks" :key="link.id">
          <a :href="`#${link.id}`" @click="closeMenu">{{ link.label }}</a>
        </li>
        <li>
          <a href="#contacto" class="nav__cta" @click="closeMenu">Contacto</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: $nav-height;
  transition: background $transition, box-shadow $transition;

  &--scrolled,
  &--open {
    background: rgba(244, 243, 239, 0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid $border-subtle;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-inline: max(1.25rem, env(safe-area-inset-left, 0px))
      max(1.25rem, env(safe-area-inset-right, 0px));

    @media (min-width: 769px) {
      padding-inline: 1.5rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    z-index: 2;
  }

  &__toggle {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 2;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: $stroke-ink;
      border-radius: 2px;
      transition: $transition;
    }

    @media (max-width: 900px) {
      display: flex;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;

    a {
      font-family: $font-display;
      font-size: 0.88rem;
      font-weight: 500;
      color: $text-muted;
      transition: color $transition;

      &:hover {
        color: $text-primary;
      }
    }

    @media (max-width: 900px) {
      position: fixed;
      inset: 0;
      top: $nav-height;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      background: $bg-deep;
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: transform $transition, opacity $transition;

      a {
        font-size: 1.25rem;
      }

      &--open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  &__cta {
    padding: 0.55rem 1.35rem !important;
    background: $stroke-ink !important;
    color: $bg-surface !important;
    border-radius: $radius-full;
    font-weight: 600 !important;

    &:hover {
      background: $accent-primary !important;
      color: white !important;
    }
  }
}
</style>
