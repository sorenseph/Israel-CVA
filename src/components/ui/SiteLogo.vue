<script setup lang="ts">
import { brand } from '../../data/brand'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
    text?: string
  }>(),
  { size: 'md', showText: false },
)

const markHeights = { sm: 28, md: 36, lg: 44 } as const
</script>

<template>
  <span class="site-logo" :class="[`site-logo--${size}`, { 'site-logo--with-text': showText }]">
    <img
      :src="brand.logo"
      :alt="brand.alt"
      class="site-logo__mark"
      :style="{ height: `${markHeights[size]}px` }"
      decoding="async"
      draggable="false"
    />
    <span v-if="showText && text" class="site-logo__text">{{ text }}</span>
  </span>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: $font-display;
  font-weight: 700;
  line-height: 1;
  min-height: 36px;
}

.site-logo__mark {
  display: block;
  width: auto;
  min-width: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.site-logo--sm {
  min-height: 28px;
}

.site-logo--lg {
  min-height: 44px;
}

.site-logo__text {
  @media (max-width: 480px) {
    display: none;
  }
}
</style>
