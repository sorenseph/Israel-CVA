<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { motion } from 'motion-v'
import { supabase, isSupabaseConfigured, type DemoStats } from '../../lib/supabase'

const fallback: DemoStats = {
  id: 1,
  projects_count: 24,
  clients_count: 12,
  uptime_percent: 99.9,
  updated_at: new Date().toISOString(),
}

const stats = ref<DemoStats>(fallback)
const live = ref(isSupabaseConfigured)

onMounted(async () => {
  if (!supabase) return
  const { data } = await supabase.from('demo_stats').select('*').eq('id', 1).maybeSingle()
  if (data) stats.value = data as DemoStats
})
</script>

<template>
  <div class="demo-metrics">
    <div class="demo-metrics__head">
      <span class="demo-metrics__dot" :class="{ 'demo-metrics__dot--live': live }" />
      <span>{{ live ? 'Datos en vivo' : 'Vista de demostración' }}</span>
    </div>
    <div class="demo-metrics__grid">
      <motion.div
        v-for="(item, i) in [
          { label: 'Proyectos', value: stats.projects_count, suffix: '' },
          { label: 'Clientes', value: stats.clients_count, suffix: '' },
          { label: 'Uptime', value: stats.uptime_percent, suffix: '%' },
        ]"
        :key="item.label"
        class="demo-metrics__item"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: i * 0.1 }"
      >
        <motion.span
          class="demo-metrics__value"
          :initial="{ scale: 0.8 }"
          :animate="{ scale: 1 }"
          :transition="{ type: 'spring', delay: 0.2 + i * 0.1 }"
        >
          {{ item.value }}{{ item.suffix }}
        </motion.span>
        <span class="demo-metrics__label">{{ item.label }}</span>
      </motion.div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.demo-metrics {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: $text-dim;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $text-dim;

    &--live {
      background: #22c55e;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
      animation: pulse 2s infinite;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    flex: 1;
    align-content: center;
  }

  &__item {
    text-align: center;
    padding: 0.75rem 0.5rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: $radius-sm;
    border: 1px solid $border-subtle;
  }

  &__value {
    display: block;
    font-family: $font-display;
    font-size: 1.5rem;
    font-weight: 700;
    color: $accent-secondary;
  }

  &__label {
    font-size: 0.7rem;
    color: $text-dim;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
