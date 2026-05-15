<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { motion } from 'motion-v'
import { navLinks } from '../data/cv'
import SiteLogo from './ui/SiteLogo.vue'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <motion.nav
      class="nav__inner container"
      :initial="{ y: -20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.5 }"
    >
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
        <span />
      </button>

      <ul class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <li v-for="link in navLinks" :key="link.id">
          <a :href="`#${link.id}`" @click="closeMenu">{{ link.label }}</a>
        </li>
        <li>
          <a href="#contacto" class="nav__cta" @click="closeMenu">Hablemos</a>
        </li>
      </ul>
    </motion.nav>
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
  transition: background $transition, backdrop-filter $transition;

  &--scrolled {
    background: rgba(10, 11, 16, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid $border-subtle;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: $font-display;
    font-weight: 700;
  }

  &__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: $text-primary;
      border-radius: 2px;
      transition: $transition;
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;

    a {
      font-size: 0.9rem;
      color: $text-muted;
      transition: color $transition;

      &:hover {
        color: $text-primary;
      }
    }

    @media (max-width: 768px) {
      position: fixed;
      top: $nav-height;
      left: 0;
      right: 0;
      flex-direction: column;
      padding: 2rem;
      gap: 1.5rem;
      background: rgba(10, 11, 16, 0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid $border-subtle;
      transform: translateY(-120%);
      opacity: 0;
      pointer-events: none;
      transition: transform $transition, opacity $transition;

      &--open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  &__cta {
    padding: 0.5rem 1.25rem !important;
    background: linear-gradient(135deg, $accent-primary, #818cf8);
    color: white !important;
    border-radius: $radius-full;
    font-weight: 600;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
