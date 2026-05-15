<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'

const plan = ref<'pro' | 'team'>('pro')
const processing = ref(false)
const done = ref(false)

async function pay() {
  processing.value = true
  await new Promise((r) => setTimeout(r, 1200))
  processing.value = false
  done.value = true
}
</script>

<template>
  <motion.div class="demo-checkout" layout>
    <p class="demo-checkout__label">Demo · Pasarela</p>
    <div class="demo-checkout__plans">
      <button
        type="button"
        :class="{ active: plan === 'pro' }"
        @click="plan = 'pro'; done = false"
      >
        Pro · $29/mes
      </button>
      <button
        type="button"
        :class="{ active: plan === 'team' }"
        @click="plan = 'team'; done = false"
      >
        Team · $79/mes
      </button>
    </div>
    <motion.button
      class="demo-checkout__pay"
      :disabled="processing || done"
      :while-hover="{ scale: 1.02 }"
      :while-tap="{ scale: 0.98 }"
      @click="pay"
    >
      <span v-if="processing">Procesando…</span>
      <span v-else-if="done">Pago simulado</span>
      <span v-else>Pagar con Stripe</span>
    </motion.button>
    <motion.p
      v-if="done"
      class="demo-checkout__ok"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
    >
      Webhook recibido · suscripción activa
    </motion.p>
  </motion.div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.demo-checkout {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-dim;
  }

  &__plans {
    display: flex;
    gap: 0.5rem;

    button {
      flex: 1;
      padding: 0.5rem;
      font-size: 0.75rem;
      border-radius: $radius-sm;
      border: 1px solid $border-subtle;
      background: transparent;
      color: $text-muted;
      cursor: pointer;
      transition: $transition;

      &.active {
        border-color: $accent-primary;
        background: rgba(99, 102, 241, 0.15);
        color: $text-primary;
      }
    }
  }

  &__pay {
    margin-top: auto;
    padding: 0.65rem;
    border: none;
    border-radius: $radius-sm;
    background: linear-gradient(135deg, #635bff, #8b5cf6);
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }
  }

  &__ok {
    font-size: 0.75rem;
    color: #22c55e;
    text-align: center;
  }
}
</style>
