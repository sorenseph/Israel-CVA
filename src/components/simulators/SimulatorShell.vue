<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useLocale } from '../../i18n'
import ProductIcon from '../ui/ProductIcon.vue'
import { deliverableMeta } from '../../data/cv'

type ProductIconName = (typeof deliverableMeta)[number]['icon']

type Deliverable = {
  title: string
  tag: string
  accent: string
  icon: ProductIconName
  slug: string
}

withDefaults(
  defineProps<{
    deliverable: Deliverable
    activeNav: string
    navItems: { id: string; label: string }[]
    hideNav?: boolean
  }>(),
  { hideNav: false },
)

const emit = defineEmits<{ nav: [id: string] }>()
const { messages } = useLocale()
</script>

<template>
  <div class="sim" :style="{ '--accent': deliverable.accent }">
    <aside class="sim__sidebar">
      <RouterLink to="/#proyectos" class="sim__back">
        ← {{ messages.simulators.back }}
      </RouterLink>

      <div class="sim__brand">
        <span class="sim__brand-icon">
          <ProductIcon :name="deliverable.icon" :size="22" />
        </span>
        <div>
          <span class="sim__tag">{{ deliverable.tag }}</span>
          <h1>{{ deliverable.title }}</h1>
        </div>
      </div>

      <nav v-if="!hideNav" class="sim__nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="sim__nav-btn"
          :class="{ active: activeNav === item.id }"
          @click="emit('nav', item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <RouterLink to="/#contacto" class="sim__cta">
        {{ messages.simulators.contactCta }}
      </RouterLink>
    </aside>

    <main class="sim__main">
      <header class="sim__header">
        <div>
          <span class="sim__pill">{{ messages.simulators.preview }}</span>
          <p class="sim__hint">{{ messages.simulators.hint }}</p>
        </div>
      </header>
      <div class="sim__viewport">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.sim {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100dvh;
  background: #f8f7f4;
  color: $text-primary;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}

.sim__sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  background: #fff;
  border-right: 1px solid $border-subtle;

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid $border-subtle;
    padding: 1rem 1.25rem;
  }
}

.sim__back {
  font-size: 0.8rem;
  color: $text-muted;
  text-decoration: none;
  transition: color $transition;

  &:hover {
    color: $text-primary;
  }
}

.sim__brand {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.sim__brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: $radius-sm;
  background: color-mix(in srgb, var(--accent) 14%, white);
  color: var(--accent);
  flex-shrink: 0;
}

.sim__tag {
  display: block;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 0.2rem;
}

.sim__brand h1 {
  font-family: $font-display;
  font-size: 1.05rem;
  line-height: 1.2;
  margin: 0;
}

.sim__nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.sim__nav-btn {
  padding: 0.65rem 0.85rem;
  border: none;
  border-radius: $radius-sm;
  background: transparent;
  color: $text-muted;
  font-family: $font-display;
  font-size: 0.88rem;
  text-align: left;
  cursor: pointer;
  transition: $transition;

  &.active {
    background: color-mix(in srgb, var(--accent) 12%, white);
    color: var(--accent);
    font-weight: 600;
  }

  &:hover:not(.active) {
    background: $bg-muted;
    color: $text-primary;
  }
}

.sim__cta {
  display: block;
  text-align: center;
  padding: 0.7rem 1rem;
  border-radius: $radius-full;
  background: var(--accent);
  color: #fff;
  font-family: $font-display;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: filter $transition;

  &:hover {
    filter: brightness(1.08);
  }
}

.sim__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.sim__header {
  padding: 1rem 1.5rem 0;
}

.sim__pill {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.sim__hint {
  font-size: 0.8rem;
  color: $text-dim;
  margin: 0.35rem 0 0;
}

.sim__viewport {
  flex: 1;
  padding: 1rem 1.5rem 1.5rem;
  overflow: auto;
}
</style>
