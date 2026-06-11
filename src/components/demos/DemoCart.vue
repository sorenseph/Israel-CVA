<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import { useLocale } from '../../i18n'
import { useDemoData } from '../../composables/useDemoData'
import DemoPaymentSimulator from './DemoPaymentSimulator.vue'

const { messages } = useLocale()
const { storeProducts } = useDemoData()
const t = () => messages.value.demos.cart

const cart = ref<Record<string, number>>({})
const checkoutStep = ref<'cart' | 'payment' | 'done'>('cart')

const cartLines = computed(() =>
  storeProducts.value
    .filter((p) => (cart.value[p.id] ?? 0) > 0)
    .map((p) => ({ ...p, qty: cart.value[p.id] })),
)

const subtotal = computed(() =>
  cartLines.value.reduce((sum, line) => sum + line.price * line.qty, 0),
)

const cartCount = computed(() =>
  Object.values(cart.value).reduce((a, b) => a + b, 0),
)

const orderTotal = computed(() => {
  const ship = subtotal.value > 500 ? 0 : subtotal.value ? 99 : 0
  return subtotal.value + ship
})

function add(id: string) {
  cart.value[id] = (cart.value[id] ?? 0) + 1
}

function remove(id: string) {
  if (!cart.value[id]) return
  cart.value[id]--
  if (cart.value[id] <= 0) delete cart.value[id]
}

function startPayment() {
  checkoutStep.value = 'payment'
}

function onPaymentSuccess() {
  checkoutStep.value = 'done'
}

function resetCart() {
  cart.value = {}
  checkoutStep.value = 'cart'
}
</script>

<template>
  <motion.div class="cart-demo" layout>
    <div class="cart-demo__catalog">
      <p class="cart-demo__label">{{ t().catalog }}</p>
      <div class="cart-demo__products">
        <motion.article
          v-for="(product, i) in storeProducts"
          :key="product.id"
          class="cart-demo__product"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: i * 0.05 }"
        >
          <div class="cart-demo__thumb">
            <img :src="product.image" :alt="product.name" loading="lazy" />
          </div>
          <div>
            <span class="cart-demo__tag">{{ product.tag }}</span>
            <h4>{{ product.name }}</h4>
            <p>${{ product.price }} MXN</p>
          </div>
          <motion.button type="button" :while-tap="{ scale: 0.95 }" @click="add(product.id)">
            {{ t().add }}
          </motion.button>
        </motion.article>
      </div>
    </div>

    <aside class="cart-demo__sidebar">
      <template v-if="checkoutStep === 'payment'">
        <DemoPaymentSimulator
          :amount="orderTotal"
          compact
          @success="onPaymentSuccess"
          @cancel="checkoutStep = 'cart'"
        />
      </template>

      <template v-else-if="checkoutStep === 'done'">
        <div class="cart-demo__done">
          <span class="cart-demo__done-icon">✓</span>
          <strong>{{ t().orderConfirmed }}</strong>
          <p>{{ t().orderConfirmedDetail }}</p>
          <button type="button" @click="resetCart">{{ t().newPurchase }}</button>
        </div>
      </template>

      <template v-else>
        <div class="cart-demo__sidebar-head">
          <h4>{{ t().cart }}</h4>
          <span class="cart-demo__badge">{{ cartCount }}</span>
        </div>

        <ul v-if="cartLines.length" class="cart-demo__lines">
          <li v-for="line in cartLines" :key="line.id">
            <img :src="line.image" :alt="line.name" class="cart-demo__line-img" />
            <div class="cart-demo__line-info">
              <strong>{{ line.name }}</strong>
              <span>{{ line.qty }} × ${{ line.price }}</span>
            </div>
            <div class="cart-demo__qty">
              <button type="button" @click="remove(line.id)">−</button>
              <span>{{ line.qty }}</span>
              <button type="button" @click="add(line.id)">+</button>
            </div>
          </li>
        </ul>
        <p v-else class="cart-demo__empty">{{ t().empty }}</p>

        <div v-if="cartLines.length" class="cart-demo__summary">
          <div class="cart-demo__row">
            <span>{{ t().subtotal }}</span>
            <strong>${{ subtotal }}</strong>
          </div>
          <div class="cart-demo__row">
            <span>{{ t().shipping }}</span>
            <span>{{ subtotal > 500 ? t().freeShipping : '$99' }}</span>
          </div>
          <div class="cart-demo__row cart-demo__row--total">
            <span>{{ t().total }}</span>
            <strong>${{ orderTotal }}</strong>
          </div>
        </div>

        <motion.button
          class="cart-demo__checkout"
          type="button"
          :disabled="!cartCount"
          :while-hover="{ scale: cartCount ? 1.02 : 1 }"
          @click="startPayment"
        >
          {{ t().checkout }}
        </motion.button>
      </template>
    </aside>
  </motion.div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.cart-demo {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.25rem;
  min-height: 360px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  &__label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-dim;
    margin-bottom: 0.75rem;
  }

  &__products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  &__product {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #fff;
    border: 1px solid $border-subtle;
    border-radius: $radius-sm;

    h4 {
      font-size: 0.85rem;
      line-height: 1.3;
    }

    p {
      font-size: 0.8rem;
      color: $text-primary;
      font-weight: 600;
    }

    button {
      margin-top: auto;
      padding: 0.45rem;
      border: none;
      border-radius: $radius-full;
      background: $stroke-ink;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }
  }

  &__thumb {
    height: 100px;
    border-radius: $radius-sm;
    overflow: hidden;
    background: $bg-muted;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__tag {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: $accent-primary;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: $bg-muted;
    border: 1px solid $border-subtle;
    border-radius: $radius-md;
  }

  &__sidebar-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    h4 {
      font-family: $font-display;
    }
  }

  &__badge {
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    display: grid;
    place-items: center;
    background: $accent-primary;
    border-radius: $radius-full;
    font-size: 0.75rem;
    font-weight: 700;
    color: #fff;
  }

  &__lines {
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    max-height: 220px;
    overflow-y: auto;

    li {
      display: grid;
      grid-template-columns: 44px 1fr auto;
      gap: 0.5rem;
      align-items: center;
      padding: 0.5rem;
      background: #fff;
      border-radius: $radius-sm;
      font-size: 0.8rem;

      span {
        display: block;
        color: $text-dim;
        font-size: 0.7rem;
      }
    }
  }

  &__line-img {
    width: 44px;
    height: 44px;
    border-radius: 6px;
    object-fit: cover;
  }

  &__qty {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    button {
      width: 24px;
      height: 24px;
      border: 1px solid $border-subtle;
      background: #fff;
      color: $text-primary;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  &__empty {
    flex: 1;
    font-size: 0.8rem;
    color: $text-dim;
    text-align: center;
    padding: 2rem 0;
  }

  &__summary {
    border-top: 1px solid $border-subtle;
    padding-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: $text-muted;
    margin-bottom: 0.35rem;

    &--total {
      color: $text-primary;
      font-size: 0.95rem;
      margin-top: 0.5rem;
    }
  }

  &__checkout {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: $radius-full;
    background: $stroke-ink;
    color: white;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  &__done {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
    min-height: 280px;

    strong {
      font-family: $font-display;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.82rem;
      color: $text-muted;
    }

    button {
      margin-top: 0.5rem;
      padding: 0.55rem 1rem;
      border: 1px solid $border-subtle;
      border-radius: $radius-full;
      background: #fff;
      cursor: pointer;
      font-size: 0.8rem;
    }
  }

  &__done-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.15);
    color: #16a34a;
    display: grid;
    place-items: center;
    font-size: 1.35rem;
    font-weight: 700;
  }
}
</style>
