<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap, HUYML_EASE } from '../lib/gsap-setup'
import { useLocale } from '../i18n'
import SiteLogo from './ui/SiteLogo.vue'
import LocaleToggle from './ui/LocaleToggle.vue'

const props = defineProps<{
  visible?: boolean
}>()

const { messages } = useLocale()

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

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})

watch(
  () => props.visible,
  (v) => {
    if (!v || !navInner.value) return
    gsap.to(navInner.value, { opacity: 1, y: 0, duration: 1, ease: HUYML_EASE.power1, delay: 0.5 })
  },
)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': menuOpen }">
    <nav ref="navInner" class="nav__inner container">
      <a
        href="#inicio"
        class="nav__logo"
        :aria-label="messages.nav.aria.logoHome"
        @click="closeMenu"
      >
        <SiteLogo size="md" />
      </a>

      <button
        class="nav__toggle"
        :aria-expanded="menuOpen"
        :aria-label="messages.nav.aria.menu"
        @click="menuOpen = !menuOpen"
      >
        <span />
        <span />
      </button>

      <ul class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <li v-for="link in messages.nav.links" :key="link.id" class="nav__link-item">
          <a :href="`#${link.id}`" @click="closeMenu">{{ link.label }}</a>
        </li>
        <li class="nav__end">
          <LocaleToggle class="nav__locale" />
          <a href="#contacto" class="nav__cta" @click="closeMenu">{{ messages.nav.contact }}</a>
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
    background: rgba(244, 243, 239, 0.96);
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
    z-index: 102;
    flex-shrink: 0;
  }

  &__toggle {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 102;
    flex-shrink: 0;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: $stroke-ink;
      border-radius: 2px;
      transition: transform $transition, opacity $transition;
      transform-origin: center;
    }

    @media (max-width: 900px) {
      display: flex;
    }
  }

  &--open &__toggle span:first-child {
    transform: translateY(4px) rotate(45deg);
  }

  &--open &__toggle span:last-child {
    transform: translateY(-4px) rotate(-45deg);
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      font-family: $font-display;
      font-size: 0.88rem;
      font-weight: 500;
      color: $text-muted;
      text-decoration: none;
      transition: color $transition;

      &:hover {
        color: $text-primary;
      }
    }

    @media (max-width: 900px) {
      position: fixed;
      left: 0;
      right: 0;
      top: $nav-height;
      width: 100%;
      min-height: calc(100dvh - $nav-height);
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: 0;
      padding: 1.25rem 1.5rem max(1.5rem, env(safe-area-inset-bottom, 0px));
      background: $bg-deep;
      z-index: 101;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-100%);
      transition:
        transform 0.42s $ease-out,
        opacity 0.32s ease,
        visibility 0.42s;

      .nav__link-item,
      .nav__end {
        opacity: 0;
        transform: translateY(10px);
        transition:
          opacity 0.32s $ease-out,
          transform 0.38s $ease-out;
      }

      @for $i from 1 through 5 {
        .nav__link-item:nth-child(#{$i}) {
          transition-delay: #{0.06 + $i * 0.045}s;
        }
      }

      .nav__end {
        transition-delay: 0.32s;
      }

      .nav__link-item a {
        display: block;
        font-size: 1.1rem;
        color: $text-primary;
        padding: 0.75rem 0;
        border-bottom: 1px solid $border-subtle;
      }

      .nav__end {
        margin-top: auto;
        padding-top: 1.25rem;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .nav__locale {
        align-self: center;
      }

      .nav__cta {
        display: block;
        text-align: center;
        font-size: 1.05rem !important;
        padding: 0.85rem 1.35rem !important;
      }

      &--open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);

        .nav__link-item,
        .nav__end {
          opacity: 1;
          transform: translateY(0);
        }
      }

      &:not(&--open) .nav__link-item,
      &:not(&--open) .nav__end {
        transition-delay: 0s;
      }
    }
  }

  &__end {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    list-style: none;
  }

  &__cta {
    padding: 0.55rem 1.35rem !important;
    background: $stroke-ink !important;
    color: $bg-surface !important;
    border-radius: $radius-full;
    font-weight: 600 !important;
    white-space: nowrap;

    &:hover {
      background: $accent-primary !important;
      color: white !important;
    }
  }
}
</style>
