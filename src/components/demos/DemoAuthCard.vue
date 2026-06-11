<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { useLocale } from '../../i18n'
import PersonAvatar from '../ui/PersonAvatar.vue'
import { personaImages } from '../../data/simulator-assets'

const { messages } = useLocale()
const t = () => messages.value.demos.auth

const step = ref<'email' | 'password' | 'loading' | 'session'>('email')
const email = ref('cliente@empresa.com')
const password = ref('')

function continueEmail() {
  if (!email.value.trim()) return
  step.value = 'password'
}

async function login() {
  step.value = 'loading'
  await new Promise((r) => setTimeout(r, 1400))
  step.value = 'session'
}

function logout() {
  password.value = ''
  step.value = 'email'
}
</script>

<template>
  <motion.div class="demo-auth" layout>
    <p class="demo-auth__label">{{ t().title }}</p>

    <motion.div v-if="step === 'email'" class="demo-auth__form" key="email">
      <label>
        <span>{{ t().email }}</span>
        <input v-model="email" type="email" :placeholder="t().emailPlaceholder" />
      </label>
      <motion.button
        type="button"
        :while-tap="{ scale: 0.98 }"
        @click="continueEmail"
      >
        {{ t().continue }}
      </motion.button>
    </motion.div>

    <motion.div v-else-if="step === 'password'" class="demo-auth__form" key="password">
      <p class="demo-auth__hint">{{ email }}</p>
      <label>
        <span>{{ t().password }}</span>
        <input v-model="password" type="password" :placeholder="t().passwordPlaceholder" />
      </label>
      <div class="demo-auth__actions">
        <button type="button" class="demo-auth__back" @click="step = 'email'">←</button>
        <motion.button
          type="button"
          class="demo-auth__primary"
          :while-tap="{ scale: 0.98 }"
          @click="login"
        >
          {{ t().login }}
        </motion.button>
      </div>
    </motion.div>

    <motion.div v-else-if="step === 'loading'" class="demo-auth__loading" key="loading">
      <span class="demo-auth__spinner" />
      <p>{{ t().verifying }}</p>
    </motion.div>

    <motion.div
      v-else
      class="demo-auth__session"
      key="session"
      :initial="{ opacity: 0, scale: 0.96 }"
      :animate="{ opacity: 1, scale: 1 }"
    >
      <PersonAvatar :src="personaImages.woman1" alt="" size="md" />
      <div>
        <strong>{{ t().sessionActive }}</strong>
        <p>{{ email }}</p>
      </div>
      <button type="button" @click="logout">{{ t().logout }}</button>
    </motion.div>
  </motion.div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.demo-auth {
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

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    margin-top: auto;

    label {
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
        border-radius: $radius-sm;
        border: 1px solid $border-subtle;
        background: #fff;
        color: $text-primary;
        font-size: 0.85rem;
        outline: none;

        &:focus {
          border-color: $accent-primary;
        }
      }
    }

    > button,
    .demo-auth__primary {
      padding: 0.6rem;
      border: none;
      border-radius: $radius-full;
      background: $stroke-ink;
      color: white;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
    }
  }

  &__hint {
    margin: 0;
    font-size: 0.78rem;
    color: $text-muted;
  }

  &__actions {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
  }

  &__back {
    width: 40px;
    border: 1px solid $border-subtle;
    border-radius: $radius-sm;
    background: #fff;
    cursor: pointer;
    color: $text-muted;
  }

  &__loading {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 140px;

    p {
      margin: 0;
      font-size: 0.85rem;
      color: $text-muted;
    }
  }

  &__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid $bg-muted;
    border-top-color: $accent-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__session {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: auto;
    padding: 0.75rem;
    background: color-mix(in srgb, $accent-primary 8%, white);
    border: 1px solid color-mix(in srgb, $accent-primary 20%, white);
    border-radius: $radius-sm;

    strong {
      display: block;
      font-size: 0.85rem;
    }

    p {
      font-size: 0.75rem;
      color: $text-dim;
      margin: 0;
    }

    button {
      margin-left: auto;
      font-size: 0.7rem;
      background: none;
      border: none;
      color: $text-muted;
      cursor: pointer;
      white-space: nowrap;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
