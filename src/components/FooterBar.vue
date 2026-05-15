<script setup lang="ts">
import { profile } from '../data/cv'
import SiteLogo from './ui/SiteLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <SiteLogo size="sm" variant="png" />
      <p>
        © {{ year }} <strong>{{ profile.name }}</strong> — Ingeniero en Sistemas Computacionales
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.footer {
  padding: 2rem 1.5rem;
  border-top: 1px solid $border-subtle;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
    font-size: 0.85rem;
    color: $text-dim;
  }
}
</style>
