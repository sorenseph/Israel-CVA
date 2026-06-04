<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import DemoMetricCounter from '../demos/DemoMetricCounter.vue'
import DemoCheckout from '../demos/DemoCheckout.vue'
import DemoAuthCard from '../demos/DemoAuthCard.vue'
import DemoLiveFeed from '../demos/DemoLiveFeed.vue'
import DemoCart from '../demos/DemoCart.vue'
import SiteLogo from '../ui/SiteLogo.vue'

type Tab = 'dashboard' | 'store' | 'crm'

const activeTab = ref<Tab>('store')
const sidebarCollapsed = ref(false)
const cartItems = ref(2)

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◫' },
  { id: 'store', label: 'Tienda', icon: '◈' },
  { id: 'crm', label: 'CRM Live', icon: '◎' },
]

const chartBars = [42, 68, 55, 82, 71, 94, 78, 88, 65, 91, 76, 85]

const notifications = ref([
  { id: 1, text: 'Nueva versión publicada', time: 'hace 2m' },
  { id: 2, text: 'Nuevo lead desde landing', time: 'hace 5m' },
  { id: 3, text: 'Pago confirmado en checkout', time: 'hace 12m' },
  { id: 4, text: 'Pedido #1842 enviado', time: 'hace 18m' },
])

const pipeline = computed(() => [
  { stage: 'Brief', count: 3, color: '#6366f1' },
  { stage: 'Diseño', count: 5, color: '#22d3ee' },
  { stage: 'Dev', count: 8, color: '#a78bfa' },
  { stage: 'Deploy', count: 4, color: '#22c55e' },
])
</script>

<template>
  <motion.div class="studio" :class="{ 'studio--collapsed': sidebarCollapsed }" layout>
    <aside class="studio__sidebar">
      <div class="studio__brand">
        <SiteLogo class="studio__logo" size="sm" variant="svg" />
        <span v-if="!sidebarCollapsed" class="studio__brand-text">Studio ICVA</span>
      </div>
      <nav class="studio__nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="studio__nav-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="studio__nav-icon">{{ tab.icon }}</span>
          <span v-if="!sidebarCollapsed">{{ tab.label }}</span>
        </button>
      </nav>
      <button type="button" class="studio__collapse" @click="sidebarCollapsed = !sidebarCollapsed">
        {{ sidebarCollapsed ? '→' : '←' }}
      </button>
    </aside>

    <div class="studio__main">
      <header class="studio__topbar">
        <div class="studio__search">
          <span>⌕</span>
          <input type="search" placeholder="Buscar productos, clientes, pedidos…" />
        </div>
        <div class="studio__topbar-actions">
          <button type="button" class="studio__icon-btn" title="Notificaciones">🔔</button>
          <button type="button" class="studio__icon-btn studio__icon-btn--cart" title="Carrito">
            🛒
            <span v-if="cartItems" class="studio__cart-count">{{ cartItems }}</span>
          </button>
          <div class="studio__avatar">
            <SiteLogo size="sm" variant="png" />
          </div>
        </div>
      </header>

      <header class="studio__header">
        <motion.div :key="activeTab" :initial="{ opacity: 0, x: -8 }" :animate="{ opacity: 1, x: 0 }">
          <h3>{{ tabs.find((t) => t.id === activeTab)?.label }}</h3>
          <p>Vista previa de tienda, panel y CRM en un solo producto</p>
        </motion.div>
        <div class="studio__header-actions">
          <span class="studio__pill">Preview</span>
          <span class="studio__pill studio__pill--live">Live</span>
        </div>
      </header>

      <motion.div
        :key="activeTab"
        class="studio__viewport"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <template v-if="activeTab === 'dashboard'">
          <div class="studio__row studio__row--dash">
            <div class="studio__panel studio__panel--metrics">
              <DemoMetricCounter />
            </div>
            <div class="studio__panel studio__panel--chart">
              <p class="studio__panel-label">Ingresos · últimos 12 meses</p>
              <div class="studio__chart">
                <motion.div
                  v-for="(h, i) in chartBars"
                  :key="i"
                  class="studio__bar"
                  :initial="{ height: 0 }"
                  :animate="{ height: `${h}%` }"
                  :transition="{ delay: i * 0.04, duration: 0.5 }"
                />
              </div>
            </div>
            <div class="studio__panel studio__panel--orders">
              <p class="studio__panel-label">Últimos pedidos</p>
              <ul class="studio__orders">
                <li><span>#1842</span><strong>$127</strong><small>Completado</small></li>
                <li><span>#1841</span><strong>$49</strong><small>En tránsito</small></li>
                <li><span>#1840</span><strong>$99</strong><small>Procesando</small></li>
              </ul>
            </div>
          </div>
          <div class="studio__row studio__row--pipeline">
            <div v-for="step in pipeline" :key="step.stage" class="studio__pipeline-step">
              <div class="studio__pipeline-bar">
                <motion.span
                  :style="{ background: step.color }"
                  :initial="{ width: 0 }"
                  :animate="{ width: `${step.count * 10}%` }"
                  :transition="{ duration: 0.8 }"
                />
              </div>
              <span>{{ step.stage }}</span>
              <strong>{{ step.count }}</strong>
            </div>
          </div>
        </template>

        <template v-else-if="activeTab === 'store'">
          <div class="studio__store">
            <div class="studio__panel studio__panel--cart-full">
              <DemoCart />
            </div>
            <div class="studio__store-side">
              <div class="studio__panel studio__panel--checkout">
                <DemoCheckout />
              </div>
              <div class="studio__panel studio__panel--auth">
                <DemoAuthCard />
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="studio__row studio__row--crm">
            <div class="studio__panel studio__panel--feed">
              <DemoLiveFeed />
            </div>
            <div class="studio__panel studio__panel--inbox">
              <p class="studio__panel-label">Actividad del sistema</p>
              <ul class="studio__notifs">
                <motion.li
                  v-for="(n, i) in notifications"
                  :key="n.id"
                  :initial="{ opacity: 0, x: 16 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ delay: i * 0.08 }"
                >
                  <span>{{ n.text }}</span>
                  <small>{{ n.time }}</small>
                </motion.li>
              </ul>
            </div>
          </div>
        </template>
      </motion.div>
    </div>
  </motion.div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.studio {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 720px;
  background: #fafaf8;
  color: $text-primary;
  border-radius: 0 0 $radius-lg $radius-lg;
  overflow: hidden;

  &--collapsed {
    grid-template-columns: 76px 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.studio__sidebar {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: $bg-muted;
  border-right: 1px solid $border-subtle;
}

.studio__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.75rem;
}

.studio__logo {
  flex-shrink: 0;

  :deep(.site-logo__mark) {
    max-height: 36px;
  }
}

.studio__brand-text {
  font-family: $font-display;
  font-weight: 700;
}

.studio__nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.studio__nav-btn {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.85rem;
  border: none;
  border-radius: $radius-sm;
  background: transparent;
  color: $text-muted;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: $transition;

  &.active {
    background: rgba(99, 102, 241, 0.22);
    color: $text-primary;
  }
}

.studio__collapse {
  margin-top: auto;
  padding: 0.5rem;
  background: $bg-muted;
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
  color: $text-dim;
  cursor: pointer;
}

.studio__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.studio__topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid $border-subtle;
  background: rgba(0, 0, 0, 0.2);
}

.studio__search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  background: $bg-surface;
  border: 1px solid $border-subtle;
  border-radius: $radius-full;
  color: $text-dim;

  input {
    flex: 1;
    background: none;
    border: none;
    color: $text-primary;
    font-size: 0.85rem;
    outline: none;

    &::placeholder {
      color: $text-dim;
    }
  }
}

.studio__topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.studio__icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
  background: $bg-surface;
  cursor: pointer;
  font-size: 1rem;

  &--cart .studio__cart-count {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    background: $accent-primary;
    border-radius: $radius-full;
    font-size: 0.65rem;
    font-weight: 700;
    color: white;
  }
}

.studio__avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: $bg-muted;
  border: 1px solid $border-subtle;

  :deep(.site-logo) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  :deep(.site-logo__mark) {
    width: 100%;
    height: 100%;
    max-height: none;
    object-fit: contain;
    padding: 4px;
  }
}

.studio__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 1.5rem 0;
  gap: 1rem;

  h3 {
    font-family: $font-display;
    font-size: 1.35rem;
  }

  p {
    font-size: 0.85rem;
    color: $text-dim;
  }
}

.studio__header-actions {
  display: flex;
  gap: 0.5rem;
}

.studio__pill {
  font-size: 0.72rem;
  padding: 0.3rem 0.7rem;
  border-radius: $radius-full;
  background: $bg-muted;
  color: $text-muted;

  &--live {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
  }
}

.studio__viewport {
  flex: 1;
  padding: 1rem 1.5rem 1.5rem;
}

.studio__row {
  display: grid;
  gap: 1rem;

  &--dash {
    grid-template-columns: 1fr 1.5fr 0.9fr;
    margin-bottom: 1rem;

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
    }
  }

  &--pipeline {
    grid-template-columns: repeat(4, 1fr);
  }

  &--crm {
    grid-template-columns: 1.3fr 1fr;
    min-height: 400px;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
}

.studio__store {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.25rem;
  min-height: 480px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.studio__store-side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.studio__panel {
  background: $bg-surface;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 1.1rem;

  &--cart-full {
    padding: 1.25rem;
    min-height: 420px;
  }

  &--chart {
    min-height: 220px;
  }

  &--feed {
    min-height: 380px;
  }

  &--checkout,
  &--auth {
    min-height: 200px;
  }

  &-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-dim;
    margin-bottom: 0.75rem;
  }
}

.studio__chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 160px;
}

.studio__bar {
  flex: 1;
  background: linear-gradient(180deg, $accent-secondary, $accent-primary);
  border-radius: 4px 4px 0 0;
  min-height: 4px;
}

.studio__orders {
  list-style: none;

  li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid $border-subtle;
    font-size: 0.8rem;

    small {
      color: #22c55e;
      font-size: 0.7rem;
    }
  }
}

.studio__pipeline-step {
  text-align: center;
  font-size: 0.78rem;
  color: $text-muted;

  strong {
    display: block;
    font-family: $font-display;
    font-size: 1.35rem;
    color: $text-primary;
  }
}

.studio__pipeline-bar {
  height: 8px;
  background: $bg-muted;
  border-radius: $radius-full;
  margin-bottom: 0.5rem;
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: $radius-full;
  }
}

.studio__notifs {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    justify-content: space-between;
    padding: 0.65rem;
    background: $bg-surface;
    border-radius: $radius-sm;
    font-size: 0.85rem;

    small {
      color: $text-dim;
    }
  }
}
</style>
