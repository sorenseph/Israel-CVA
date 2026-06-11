<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import SimulatorShell from './SimulatorShell.vue'
import DemoCart from '../demos/DemoCart.vue'
import DemoCheckout from '../demos/DemoCheckout.vue'
import PersonAvatar from '../ui/PersonAvatar.vue'
import { useLocale } from '../../i18n'
import { personaImages } from '../../data/simulator-assets'
import type { deliverableMeta } from '../../data/cv'

defineProps<{
  deliverable: {
    title: string
    tag: string
    accent: string
    icon: (typeof deliverableMeta)[number]['icon']
    slug: string
  }
}>()

const { messages } = useLocale()
const activeNav = ref('catalog')
const navItems = computed(() => messages.value.simulators.tienda.nav)

const promos = computed(() => messages.value.simulators.tienda.promos)
</script>

<template>
  <SimulatorShell
    :deliverable="deliverable"
    :active-nav="activeNav"
    :nav-items="navItems"
    @nav="activeNav = $event"
  >
    <motion.div
      :key="activeNav"
      class="store-layout"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
    >
      <template v-if="activeNav === 'catalog'">
        <div class="store-hero">
          <PersonAvatar :src="personaImages.student" alt="" size="lg" />
          <div>
            <strong>{{ messages.simulators.tienda.heroTitle }}</strong>
            <p>{{ messages.simulators.tienda.heroText }}</p>
          </div>
        </div>
        <div class="panel panel--main">
          <DemoCart />
        </div>
      </template>

      <template v-else-if="activeNav === 'checkout'">
        <div class="panel panel--main">
          <DemoCheckout />
        </div>
      </template>

      <template v-else>
        <div class="panel panel--full">
          <h3>{{ messages.simulators.tienda.promosTitle }}</h3>
          <div class="promo-grid">
            <article v-for="p in promos" :key="p.code" class="promo-card">
              <span class="promo-card__code">{{ p.code }}</span>
              <strong>{{ p.discount }}</strong>
              <button type="button" :disabled="!p.active">
                {{ p.active ? messages.simulators.tienda.apply : messages.simulators.tienda.inactive }}
              </button>
            </article>
          </div>
        </div>
      </template>
    </motion.div>
  </SimulatorShell>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.store-layout {
  min-height: 420px;
}

.store-hero {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  background: color-mix(in srgb, var(--accent) 8%, white);
  border-radius: $radius-md;
  border: 1px solid color-mix(in srgb, var(--accent) 20%, white);

  strong {
    display: block;
    font-family: $font-display;
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: $text-muted;
  }
}

.panel {
  background: #fff;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 1.25rem;

  &--main {
    min-height: 460px;
  }

  &--full h3 {
    font-family: $font-display;
    margin: 0 0 1rem;
  }
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.promo-card {
  padding: 1rem;
  border-radius: $radius-sm;
  background: color-mix(in srgb, var(--accent) 8%, white);
  border: 1px dashed color-mix(in srgb, var(--accent) 35%, white);

  &__code {
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: var(--accent);
    font-weight: 700;
  }

  strong {
    display: block;
    font-family: $font-display;
    font-size: 1.35rem;
    margin: 0.35rem 0 0.75rem;
  }

  button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: $radius-full;
    background: var(--accent);
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
}
</style>
