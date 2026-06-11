<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { useLocale } from '../../i18n'

const props = withDefaults(
  defineProps<{
    amount: number
    compact?: boolean
    showCancel?: boolean
  }>(),
  { compact: false, showCancel: true },
)

const emit = defineEmits<{ success: []; cancel: [] }>()

const { messages } = useLocale()
const t = () => messages.value.demos.payment

const step = ref<'form' | 'processing' | 'success'>('form')
const card = ref('4242 4242 4242 4242')
const expiry = ref('12/28')
const cvv = ref('123')

async function submit() {
  step.value = 'processing'
  await new Promise((r) => setTimeout(r, 1600))
  step.value = 'success'
  await new Promise((r) => setTimeout(r, 1200))
  emit('success')
}

function cancel() {
  if (step.value === 'form') emit('cancel')
}
</script>

<template>
  <motion.div class="pay-sim" :class="{ 'pay-sim--compact': compact }" layout>
    <template v-if="step === 'form'">
      <p class="pay-sim__label">{{ t().title }}</p>
      <p class="pay-sim__total">
        {{ t().total }}: <strong>${{ amount.toLocaleString() }} MXN</strong>
      </p>

      <label class="pay-sim__field">
        <span>{{ t().cardNumber }}</span>
        <input v-model="card" type="text" inputmode="numeric" autocomplete="off" />
      </label>

      <div class="pay-sim__row">
        <label class="pay-sim__field">
          <span>{{ t().expiry }}</span>
          <input v-model="expiry" type="text" autocomplete="off" />
        </label>
        <label class="pay-sim__field">
          <span>{{ t().cvv }}</span>
          <input v-model="cvv" type="password" maxlength="4" autocomplete="off" />
        </label>
      </div>

      <div class="pay-sim__card-preview" aria-hidden="true">
        <span>•••• •••• •••• 4242</span>
        <small>{{ expiry }}</small>
      </div>

      <div class="pay-sim__actions">
        <motion.button
          type="button"
          class="pay-sim__submit"
          :while-tap="{ scale: 0.98 }"
          @click="submit"
        >
          {{ t().pay }}
        </motion.button>
        <button v-if="showCancel" type="button" class="pay-sim__cancel" @click="cancel">
          {{ t().cancel }}
        </button>
      </div>
    </template>

    <template v-else-if="step === 'processing'">
      <div class="pay-sim__status">
        <span class="pay-sim__spinner" />
        <p>{{ t().processing }}</p>
      </div>
    </template>

    <template v-else>
      <motion.div
        class="pay-sim__success"
        :initial="{ opacity: 0, scale: 0.92 }"
        :animate="{ opacity: 1, scale: 1 }"
      >
        <span class="pay-sim__check">✓</span>
        <strong>{{ t().success }}</strong>
        <p>{{ t().successDetail }}</p>
      </motion.div>
    </template>
  </motion.div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.pay-sim {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;

  &__label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-dim;
    margin: 0;
  }

  &__total {
    margin: 0;
    font-size: 0.88rem;
    color: $text-muted;

    strong {
      color: $text-primary;
      font-family: $font-display;
      font-size: 1.1rem;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    span {
      font-size: 0.68rem;
      font-weight: 600;
      color: $text-dim;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    input {
      padding: 0.55rem 0.7rem;
      border: 1px solid $border-subtle;
      border-radius: $radius-sm;
      background: #fff;
      font-size: 0.85rem;
      color: $text-primary;
      outline: none;

      &:focus {
        border-color: $accent-primary;
      }
    }
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
  }

  &__card-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: $radius-sm;
    background: linear-gradient(135deg, #1a1a1a, #333);
    color: #fff;
    font-size: 0.8rem;
    letter-spacing: 0.08em;

    small {
      opacity: 0.75;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-top: auto;
  }

  &__submit {
    padding: 0.7rem;
    border: none;
    border-radius: $radius-full;
    background: $stroke-ink;
    color: #fff;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
  }

  &__cancel {
    padding: 0.5rem;
    border: none;
    background: none;
    color: $text-muted;
    font-size: 0.8rem;
    cursor: pointer;
  }

  &__status {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    text-align: center;
    min-height: 180px;

    p {
      margin: 0;
      font-size: 0.88rem;
      color: $text-muted;
    }
  }

  &__spinner {
    width: 36px;
    height: 36px;
    border: 3px solid $bg-muted;
    border-top-color: $accent-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__success {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.35rem;
    min-height: 180px;

    strong {
      font-family: $font-display;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.8rem;
      color: $text-muted;
    }
  }

  &__check {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.15);
    color: #16a34a;
    display: grid;
    place-items: center;
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  &--compact {
    .pay-sim__total strong {
      font-size: 1rem;
    }

    .pay-sim__card-preview {
      display: none;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
