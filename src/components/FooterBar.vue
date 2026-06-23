<script setup lang="ts">
import { useLocale } from '../i18n'
import { profile } from '../data/cv'
import SiteLogo from './ui/SiteLogo.vue'
import SocialLinks from './ui/SocialLinks.vue'

const { messages } = useLocale()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <SiteLogo size="sm" />
      <p>
        © {{ year }} <strong>{{ profile.name }}</strong> — {{ messages.footer.tagline }}
      </p>
      <a class="footer__email" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      <SocialLinks variant="footer" />
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

.footer__email {
  color: $text-muted;
  text-decoration: none;
  font-family: $font-display;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  transition: color $transition;

  &:hover {
    color: $text-primary;
  }

  &:focus-visible {
    outline: 2px solid $accent-primary;
    outline-offset: 3px;
    border-radius: 4px;
  }
}
</style>
