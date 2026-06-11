<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { alt: '', size: 'md' },
)
</script>

<template>
  <img :src="src" :alt="alt" class="person-avatar" :class="`person-avatar--${size}`" loading="lazy" />
</template>

<style scoped lang="scss">
.person-avatar {
  object-fit: cover;
  border-radius: 50%;
  flex-shrink: 0;
  background: #ebebeb;

  &--sm {
    width: 32px;
    height: 32px;
  }

  &--md {
    width: 40px;
    height: 40px;
  }

  &--lg {
    width: 56px;
    height: 56px;
  }
}
</style>
