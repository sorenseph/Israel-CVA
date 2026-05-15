<script setup lang="ts">
defineProps<{
  label: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="section-title">
    <span class="section-title__label">{{ label }}</span>
    <h2 class="section-title__heading">{{ title }}</h2>
    <p v-if="subtitle" class="section-title__sub">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.section-title {
  margin-bottom: 3rem;
  text-align: center;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;

  &__label {
    display: inline-block;
    font-family: $font-display;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $accent-secondary;
    margin-bottom: 0.75rem;
  }

  &__heading {
    font-family: $font-display;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  &__sub {
    color: $text-muted;
    font-size: 1.05rem;
  }
}
</style>
