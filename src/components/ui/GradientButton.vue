<script setup lang="ts">
defineProps<{
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  tag?: 'a' | 'button'
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="tag ?? (href ? 'a' : 'button')"
    :href="href"
    :disabled="disabled"
    class="btn"
    :class="[`btn--${variant ?? 'primary'}`]"
  >
    <span class="btn__shine" />
    <span class="btn__content"><slot /></span>
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: $radius-full;
  font-family: $font-display;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform $transition, box-shadow $transition;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &--primary {
    background: linear-gradient(135deg, $accent-primary, #818cf8);
    color: white;
    box-shadow: 0 4px 24px rgba(99, 102, 241, 0.4);

    &:hover {
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.55);
    }
  }

  &--outline {
    background: transparent;
    color: $text-primary;
    border: 1px solid $border-subtle;
    backdrop-filter: blur(8px);

    &:hover {
      border-color: $accent-primary;
      background: rgba(99, 102, 241, 0.1);
    }
  }

  &--ghost {
    background: rgba(255, 255, 255, 0.06);
    color: $text-primary;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover &__shine {
    transform: translateX(100%);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
