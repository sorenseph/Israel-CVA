<script setup lang="ts">
import { computed } from 'vue'
import { useLocale, type Locale } from '../../i18n'

const { locale, setLocale } = useLocale()

const options: { id: Locale; label: string }[] = [
  { id: 'es', label: 'ES' },
  { id: 'en', label: 'EN' },
]

const ariaLabel = computed(() =>
  locale.value === 'es' ? 'Switch to English' : 'Cambiar a español',
)
</script>

<template>
  <div
    class="locale-toggle"
    role="group"
    :aria-label="ariaLabel"
    :style="{ '--active': locale === 'es' ? 0 : 1 }"
  >
    <span class="locale-toggle__indicator" aria-hidden="true" />
    <button
      v-for="opt in options"
      :key="opt.id"
      type="button"
      class="locale-toggle__btn"
      :class="{ 'locale-toggle__btn--active': locale === opt.id }"
      :aria-pressed="locale === opt.id"
      @click="setLocale(opt.id)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.locale-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0;
  padding: 3px;
  border-radius: $radius-full;
  border: 1px solid $border-subtle;
  background: rgba(255, 255, 255, 0.55);
  isolation: isolate;
}

.locale-toggle__indicator {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / 2);
  border-radius: $radius-full;
  background: $stroke-ink;
  transform: translateX(calc(var(--active, 0) * 100%));
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
  will-change: transform;
}

.locale-toggle__btn {
  position: relative;
  z-index: 1;
  font-family: $font-display;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  padding: 0.38rem 0.55rem;
  border: none;
  border-radius: $radius-full;
  background: transparent;
  color: $text-dim;
  cursor: pointer;
  transition: color 0.32s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover:not(.locale-toggle__btn--active) {
    color: $text-muted;
  }

  &--active {
    color: $bg-surface;
  }

  &:focus-visible {
    outline: 2px solid $accent-primary;
    outline-offset: 2px;
  }
}
</style>
