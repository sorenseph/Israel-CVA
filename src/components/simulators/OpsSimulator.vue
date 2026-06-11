<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import SimulatorShell from './SimulatorShell.vue'
import PersonAvatar from '../ui/PersonAvatar.vue'
import { useLocale } from '../../i18n'
import { useDemoData } from '../../composables/useDemoData'
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
const { storeProducts } = useDemoData()
const activeNav = ref('orders')
const navItems = computed(() => messages.value.simulators.operaciones.nav)

const orderAvatars = [personaImages.woman3, personaImages.manBeard, personaImages.woman4]

const orders = computed(() =>
  messages.value.simulators.operaciones.orders.map((o, i) => ({
    ...o,
    avatar: orderAvatars[i],
  })),
)

const inventory = computed(() =>
  storeProducts.value.slice(0, 3).map((p, i) => ({
    sku: `SKU-00${i + 1}`,
    name: p.name,
    stock: [42, 8, 156][i],
    low: i === 1,
    image: p.image,
  })),
)
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
      class="panel panel--full"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
    >
      <template v-if="activeNav === 'orders'">
        <h3>{{ messages.simulators.operaciones.ordersTitle }}</h3>
        <div class="order-cards">
          <article v-for="o in orders" :key="o.id" class="order-card">
            <PersonAvatar :src="o.avatar" :alt="o.client" size="md" />
            <div>
              <strong>{{ o.id }} · {{ o.client }}</strong>
              <span>{{ o.total }}</span>
            </div>
            <span class="badge">{{ o.status }}</span>
          </article>
        </div>
      </template>

      <template v-else-if="activeNav === 'inventory'">
        <h3>{{ messages.simulators.operaciones.inventoryTitle }}</h3>
        <div class="inv-grid">
          <article v-for="item in inventory" :key="item.sku" class="inv-card">
            <img :src="item.image" :alt="item.name" loading="lazy" />
            <small>{{ item.sku }}</small>
            <strong>{{ item.name }}</strong>
            <p>{{ item.stock }} {{ messages.simulators.operaciones.units }}</p>
            <span v-if="item.low" class="low">{{ messages.simulators.operaciones.lowStock }}</span>
          </article>
        </div>
      </template>

      <template v-else>
        <h3>{{ messages.simulators.operaciones.reportsTitle }}</h3>
        <div class="kpi-row">
          <div class="kpi"><em>+18%</em><span>{{ messages.simulators.operaciones.kpiSales }}</span></div>
          <div class="kpi"><em>94%</em><span>{{ messages.simulators.operaciones.kpiFulfillment }}</span></div>
          <div class="kpi"><em>2.4d</em><span>{{ messages.simulators.operaciones.kpiShipping }}</span></div>
        </div>
        <div class="chart-bars">
          <span v-for="n in 12" :key="n" :style="{ height: `${35 + (n % 5) * 12}%` }" />
        </div>
      </template>
    </motion.div>
  </SimulatorShell>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.panel {
  background: #fff;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 1.25rem;

  h3 {
    font-family: $font-display;
    margin: 0 0 1rem;
  }
}

.order-cards {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.order-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.85rem;
  align-items: center;
  padding: 0.85rem;
  background: $bg-muted;
  border-radius: $radius-sm;

  strong {
    display: block;
    font-size: 0.88rem;
  }

  span {
    font-size: 0.8rem;
    color: $text-muted;
  }
}

.badge {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: $radius-full;
  background: color-mix(in srgb, var(--accent) 12%, white);
  color: var(--accent);
}

.inv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}

.inv-card {
  padding: 0.75rem;
  background: $bg-muted;
  border-radius: $radius-sm;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: $radius-sm;
    margin-bottom: 0.5rem;
  }

  small {
    color: $text-dim;
    font-size: 0.72rem;
  }

  strong {
    display: block;
    margin: 0.25rem 0;
    font-size: 0.88rem;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: $text-muted;
  }

  .low {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.68rem;
    color: #e11d48;
    font-weight: 600;
  }
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.kpi {
  padding: 1rem;
  background: $bg-muted;
  border-radius: $radius-sm;

  em {
    display: block;
    font-style: normal;
    font-family: $font-display;
    font-size: 1.5rem;
    color: var(--accent);
  }

  span {
    font-size: 0.8rem;
    color: $text-muted;
  }
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 160px;

  span {
    flex: 1;
    background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 50%, white));
    border-radius: 4px 4px 0 0;
  }
}
</style>
