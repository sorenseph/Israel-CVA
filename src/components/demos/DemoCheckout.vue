<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useLocale } from '../../i18n'
import DemoPaymentSimulator from './DemoPaymentSimulator.vue'

const { messages } = useLocale()
const t = () => messages.value.demos.checkout
const payT = () => messages.value.demos.payment

const plan = ref<'pro' | 'team'>('pro')
const showPayment = ref(false)
const paid = ref(false)

const amount = computed(() => (plan.value === 'pro' ? 999 : 1899))

function startPay() {
  showPayment.value = true
  paid.value = false
}

function onPaymentSuccess() {
  paid.value = true
  showPayment.value = false
}
</script>

<template>
  <motion.div class="demo-checkout" layout>
    <template v-if="!showPayment">
      <p class="demo-checkout__label">{{ t().label }}</p>
      <div class="demo-checkout__plans">
        <button
          type="button"
          :class="{ active: plan === 'pro' }"
          @click="plan = 'pro'; paid = false"
        >
          {{ t().planPro }}
        </button>
        <button
          type="button"
          :class="{ active: plan === 'team' }"
          @click="plan = 'team'; paid = false"
        >
          {{ t().planTeam }}
        </button>
      </div>
      <motion.button
        v-if="!paid"
        class="demo-checkout__pay"
        :while-tap="{ scale: 0.98 }"
        @click="startPay"
      >
        {{ payT().pay }}
      </motion.button>
      <motion.p
        v-else
        class="demo-checkout__ok"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
      >
        {{ t().success }}
      </motion.p>
    </template>

    <DemoPaymentSimulator
      v-else
      :amount="amount"
      compact
      @success="onPaymentSuccess"
      @cancel="showPayment = false"
    />
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
    margin: 0;
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
      background: #fff;
      color: $text-muted;
      cursor: pointer;
      transition: $transition;

      &.active {
        border-color: $accent-primary;
        background: color-mix(in srgb, $accent-primary 10%, white);
        color: $text-primary;
        font-weight: 600;
      }
    }
  }

  &__pay {
    margin-top: auto;
    padding: 0.65rem;
    border: none;
    border-radius: $radius-full;
    background: $stroke-ink;
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }

  &__ok {
    margin: auto 0 0;
    font-size: 0.8rem;
    color: #16a34a;
    text-align: center;
  }
}
</style>
