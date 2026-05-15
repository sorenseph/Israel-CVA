<script setup lang="ts">
import { brand } from '../../data/brand'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
    text?: string
    /** SVG para iconos pequeños; PNG para el nav y pie */
    variant?: 'png' | 'svg'
  }>(),
  { size: 'md', showText: false, variant: 'png' },
)
</script>

<template>
  <span class="site-logo" :class="[`site-logo--${size}`, { 'site-logo--with-text': showText }]">
    <img
      :src="variant === 'svg' ? brand.logoSvg : brand.logoPng"
      :alt="brand.alt"
      class="site-logo__mark"
      width="36"
      height="36"
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
}

.site-logo__mark {
  display: block;
  width: auto;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.site-logo--sm .site-logo__mark {
  max-height: 28px;
}

.site-logo--md .site-logo__mark {
  max-height: 36px;
}

.site-logo--lg .site-logo__mark {
  max-height: 44px;
}

.site-logo__text {
  @media (max-width: 480px) {
    display: none;
  }
}
</style>
