<script setup lang="ts">
import { handPhoneImages } from '../../data/simulator-assets'

defineProps<{
  variant?: 'side' | 'front'
}>()
</script>

<template>
  <div class="hand-phone" :class="`hand-phone--${variant ?? 'side'}`">
    <img
      :src="variant === 'front' ? handPhoneImages.front : handPhoneImages.side"
      alt=""
      class="hand-phone__photo"
      loading="lazy"
    />
    <div class="hand-phone__screen">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hand-phone {
  position: relative;
  width: min(380px, 100%);
  margin: 0 auto;
  user-select: none;

  &__photo {
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
  }

  &__screen {
    position: absolute;
    overflow: hidden;
    background: #f8f8f8;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  }

  &--side {
    .hand-phone__screen {
      top: 7.5%;
      left: 22.5%;
      width: 54.5%;
      height: 79%;
      border-radius: 6% / 4%;
    }
  }

  &--front {
    max-width: 340px;

    .hand-phone__screen {
      top: 11%;
      left: 50%;
      transform: translateX(-50%);
      width: 44%;
      height: 72%;
      border-radius: 5% / 3%;
    }
  }
}
</style>
