<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import SimulatorShell from './SimulatorShell.vue'
import DemoCheckout from '../demos/DemoCheckout.vue'
import { useLocale } from '../../i18n'
import { storeProductMeta } from '../../data/simulator-assets'
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
const activeNav = ref('plans')
const navItems = computed(() => messages.value.simulators.pagos.nav)
const selectedPlan = ref('pro')

const planImageById: Record<string, number> = {
  starter: 2,
  pro: 0,
  team: 1,
}

const plans = computed(() =>
  messages.value.simulators.pagos.plans.map((plan) => ({
    ...plan,
    image: storeProductMeta[planImageById[plan.id] ?? 0].image,
  })),
)

const invoices = computed(() => messages.value.simulators.pagos.invoices)
const invoiceColumns = computed(() => messages.value.simulators.pagos.invoiceColumns)
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
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
    >
      <template v-if="activeNav === 'plans'">
        <div class="plans">
          <article
            v-for="plan in plans"
            :key="plan.id"
            class="plan-card"
            :class="{ featured: plan.featured, selected: selectedPlan === plan.id }"
            @click="selectedPlan = plan.id"
          >
            <img :src="plan.image" :alt="plan.name" class="plan-card__img" loading="lazy" />
            <h3>{{ plan.name }}</h3>
            <p class="plan-card__price">{{ plan.price }}<small>{{ plan.period }}</small></p>
            <ul>
              <li>{{ messages.simulators.pagos.featureCheckout }}</li>
              <li>{{ messages.simulators.pagos.featureBilling }}</li>
            </ul>
          </article>
        </div>
      </template>

      <template v-else-if="activeNav === 'checkout'">
        <div class="panel">
          <DemoCheckout />
        </div>
      </template>

      <template v-else>
        <div class="panel">
          <h3>{{ messages.simulators.pagos.invoicesTitle }}</h3>
          <table class="table">
            <thead>
              <tr>
                <th>{{ invoiceColumns.invoice }}</th>
                <th>{{ invoiceColumns.amount }}</th>
                <th>{{ invoiceColumns.date }}</th>
                <th>{{ invoiceColumns.status }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inv in invoices" :key="inv.id">
                <td>{{ inv.id }}</td>
                <td>{{ inv.amount }}</td>
                <td>{{ inv.date }}</td>
                <td><span class="paid">{{ inv.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </motion.div>
  </SimulatorShell>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.plan-card {
  padding: 0;
  border-radius: $radius-md;
  border: 2px solid $border-subtle;
  background: #fff;
  cursor: pointer;
  transition: $transition;
  overflow: hidden;

  &.featured {
    border-color: color-mix(in srgb, var(--accent) 40%, white);
  }

  &.selected {
    border-color: var(--accent);
    box-shadow: 0 12px 32px color-mix(in srgb, var(--accent) 20%, transparent);
  }

  &__img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  h3 {
    font-family: $font-display;
    margin: 0.75rem 1rem 0.35rem;
  }

  &__price {
    font-family: $font-display;
    font-size: 1.75rem;
    margin: 0 1rem 0.75rem;

    small {
      font-size: 0.85rem;
      color: $text-dim;
    }
  }

  ul {
    margin: 0;
    padding: 0 1rem 1rem 2rem;
    font-size: 0.85rem;
    color: $text-muted;

    li {
      margin-bottom: 0.35rem;
    }
  }
}

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

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;

  th,
  td {
    text-align: left;
    padding: 0.65rem 0.5rem;
    border-bottom: 1px solid $border-subtle;
  }

  th {
    font-size: 0.72rem;
    text-transform: uppercase;
    color: $text-dim;
  }
}

.paid {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: $radius-full;
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}
</style>
