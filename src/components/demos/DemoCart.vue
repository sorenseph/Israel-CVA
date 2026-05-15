<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'

type Product = { id: string; name: string; price: number; tag: string; color: string }

const catalog: Product[] = [
  { id: '1', name: 'Plan Starter', price: 19, tag: 'Popular', color: '#6366f1' },
  { id: '2', name: 'Plan Pro', price: 49, tag: 'Recomendado', color: '#22d3ee' },
  { id: '3', name: 'Plan Team', price: 99, tag: 'Equipos', color: '#a78bfa' },
  { id: '4', name: 'Add-on Storage', price: 9, tag: 'Extra', color: '#f472b6' },
]

const cart = ref<Record<string, number>>({})
const checkoutStep = ref<'cart' | 'pay' | 'done'>('cart')

const cartLines = computed(() =>
  catalog
    .filter((p) => (cart.value[p.id] ?? 0) > 0)
    .map((p) => ({ ...p, qty: cart.value[p.id] })),
)

const subtotal = computed(() =>
  cartLines.value.reduce((sum, line) => sum + line.price * line.qty, 0),
)

const cartCount = computed(() =>
  Object.values(cart.value).reduce((a, b) => a + b, 0),
)

function add(id: string) {
  cart.value[id] = (cart.value[id] ?? 0) + 1
}

function remove(id: string) {
  if (!cart.value[id]) return
  cart.value[id]--
  if (cart.value[id] <= 0) delete cart.value[id]
}

function pay() {
  checkoutStep.value = 'pay'
  setTimeout(() => {
    checkoutStep.value = 'done'
    cart.value = {}
  }, 1400)
}
</script>

<template>
  <motion.div class="cart-demo" layout>
    <div class="cart-demo__catalog">
      <p class="cart-demo__label">Catálogo</p>
      <div class="cart-demo__products">
        <motion.article
          v-for="(product, i) in catalog"
          :key="product.id"
          class="cart-demo__product"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: i * 0.05 }"
        >
          <motion.div class="cart-demo__thumb" :style="{ background: product.color }" />
          <div>
            <span class="cart-demo__tag">{{ product.tag }}</span>
            <h4>{{ product.name }}</h4>
            <p>${{ product.price }} / mes</p>
          </div>
          <motion.button type="button" :while-tap="{ scale: 0.95 }" @click="add(product.id)">
            + Agregar
          </motion.button>
        </motion.article>
      </div>
    </div>

    <aside class="cart-demo__sidebar">
      <div class="cart-demo__sidebar-head">
        <h4>Carrito</h4>
        <span class="cart-demo__badge">{{ cartCount }}</span>
      </div>

      <ul v-if="cartLines.length" class="cart-demo__lines">
        <li v-for="line in cartLines" :key="line.id">
          <div>
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
      <p v-else class="cart-demo__empty">Tu carrito está vacío — agrega un plan</p>

      <div class="cart-demo__summary">
        <div class="cart-demo__row">
          <span>Subtotal</span>
          <strong>${{ subtotal }}</strong>
        </div>
        <div class="cart-demo__row">
          <span>IVA (16%)</span>
          <span>${{ Math.round(subtotal * 0.16) }}</span>
        </div>
        <div class="cart-demo__row cart-demo__row--total">
          <span>Total</span>
          <strong>${{ Math.round(subtotal * 1.16) }}</strong>
        </div>
      </div>

      <motion.button
        class="cart-demo__checkout"
        type="button"
        :disabled="!cartCount || checkoutStep !== 'cart'"
        :while-hover="{ scale: cartCount ? 1.02 : 1 }"
        @click="pay"
      >
        <span v-if="checkoutStep === 'cart'">Ir a pagar</span>
        <span v-else-if="checkoutStep === 'pay'">Procesando…</span>
        <span v-else>¡Pedido confirmado!</span>
      </motion.button>
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
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid $border-subtle;
    border-radius: $radius-sm;

    h4 {
      font-size: 0.85rem;
    }

    p {
      font-size: 0.75rem;
      color: $accent-secondary;
    }

    button {
      margin-top: auto;
      padding: 0.4rem;
      border: none;
      border-radius: $radius-sm;
      background: rgba(99, 102, 241, 0.25);
      color: $text-primary;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }
  }

  &__thumb {
    height: 56px;
    border-radius: 6px;
    opacity: 0.85;
  }

  &__tag {
    font-size: 0.65rem;
    color: $text-dim;
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
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
  }

  &__lines {
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    max-height: 200px;
    overflow-y: auto;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: $radius-sm;
      font-size: 0.8rem;

      span {
        display: block;
        color: $text-dim;
        font-size: 0.7rem;
      }
    }
  }

  &__qty {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    button {
      width: 24px;
      height: 24px;
      border: 1px solid $border-subtle;
      background: transparent;
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
    border-radius: $radius-sm;
    background: linear-gradient(135deg, #635bff, #818cf8);
    color: white;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>
