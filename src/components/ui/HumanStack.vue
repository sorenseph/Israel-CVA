<script setup lang="ts">
import HumanFigure from './HumanFigure.vue'
import type { CharacterKey } from '../../data/characters'

defineProps<{
  layers: {
    name: CharacterKey
    size?: 'sm' | 'md' | 'lg' | 'xl'
    position: 'back' | 'front' | 'side'
    delay?: number
  }[]
}>()
</script>

<template>
  <div class="human-stack">
    <HumanFigure
      v-for="layer in layers"
      :key="layer.name"
      :name="layer.name"
      :size="layer.size ?? 'lg'"
      :delay="layer.delay ?? 0"
      :class="['human-stack__layer', `human-stack__layer--${layer.position}`]"
    />
  </div>
</template>

<style scoped lang="scss">
.human-stack {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 420px;
  margin: 0 auto;

  @media (max-width: 900px) {
    height: 320px;
    max-width: 300px;
  }
}

.human-stack__layer {
  position: absolute;
  bottom: 0;

  &--back {
    z-index: 1;
    left: 8%;
  }

  &--front {
    z-index: 2;
    right: 5%;
    left: auto;
  }

  &--side {
    z-index: 3;
    right: -5%;
    bottom: 10%;
  }
}
</style>
