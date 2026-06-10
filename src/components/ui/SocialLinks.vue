<script setup lang="ts">
import { socialLinks } from '../../data/cv'

withDefaults(
  defineProps<{
    variant?: 'footer' | 'hero'
  }>(),
  { variant: 'footer' },
)

const icons: Record<(typeof socialLinks)[number]['id'], string> = {
  instagram:
    'M7 2h6a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 1.6A3.4 3.4 0 0 0 3.6 7v6A3.4 3.4 0 0 0 7 16.4h6a3.4 3.4 0 0 0 3.4-3.4V7A3.4 3.4 0 0 0 13 3.6H7zm6.2 1.3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM10 6.4A3.6 3.6 0 1 1 6.4 10 3.6 3.6 0 0 1 10 6.4zm0 1.6A2 2 0 1 0 12 10a2 2 0 0 0-2-2z',
  facebook:
    'M11.2 3.2H9.6c-2 0-3.6 1.6-3.6 3.6v1.6H3.6v2.8h2.4V16h2.8v-5.8h2.4l.4-2.8H8.8V6.8c0-.6.5-1 .8-1h1.6V3.2z',
}
</script>

<template>
  <nav
    class="social-links"
    :class="`social-links--${variant}`"
    aria-label="Redes sociales de Studio ICVA"
  >
    <a
      v-for="link in socialLinks"
      :key="link.id"
      :href="link.url"
      class="social-links__item"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${link.label} — Studio ICVA`"
    >
      <svg class="social-links__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path :d="icons[link.id]" fill="currentColor" />
      </svg>
      <span class="social-links__label">{{ link.label }}</span>
    </a>
  </nav>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.social-links {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem 0.85rem;
}

.social-links__item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: $text-dim;
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

.social-links__icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  opacity: 0.72;
  transition: opacity $transition;

  .social-links__item:hover & {
    opacity: 1;
  }
}

.social-links--footer {
  .social-links__label {
    font-family: $font-display;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

.social-links--hero {
  gap: 0.85rem;

  .social-links__label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .social-links__item {
    color: $text-muted;
    padding: 0.25rem;
    margin: -0.25rem;
  }

  .social-links__icon {
    width: 17px;
    height: 17px;
    opacity: 1;
  }

  .social-links__item:hover {
    color: $text-primary;
  }

  @media (max-width: 768px) {
    gap: 1.05rem;

    .social-links__item {
      padding: 0.5rem;
      margin: -0.5rem;
    }

    .social-links__icon {
      width: 19px;
      height: 19px;
    }
  }
}
</style>
