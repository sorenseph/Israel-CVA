<script setup lang="ts">
import { motion } from 'motion-v'
import { characters, characterLabels, type CharacterKey } from '../../data/characters'

withDefaults(
  defineProps<{
    name: CharacterKey
    alt?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    delay?: number
  }>(),
  { size: 'md', delay: 0 },
)

const sizes = {
  sm: 'human--sm',
  md: 'human--md',
  lg: 'human--lg',
  xl: 'human--xl',
}
</script>

<template>
  <motion.img
    :src="characters[name]"
    :alt="alt ?? characterLabels[name]"
    class="human"
    :class="sizes[size]"
    :initial="{ opacity: 0, y: 28, scale: 0.92 }"
    :while-in-view="{ opacity: 1, y: 0, scale: 1 }"
    :viewport="{ once: true, margin: '-60px' }"
    :transition="{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }"
    loading="lazy"
    draggable="false"
  />
</template>

<style scoped lang="scss">
.human {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.35));
  pointer-events: none;
  user-select: none;
  will-change: transform, opacity;

  &--sm {
    max-height: 120px;
  }

  &--md {
    max-height: 200px;
  }

  &--lg {
    max-height: 320px;
  }

  &--xl {
    max-height: 480px;
  }
}
</style>
