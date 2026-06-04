<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'

const email = ref('cliente@empresa.com')
const loggedIn = ref(false)

function login() {
  loggedIn.value = true
}

function logout() {
  loggedIn.value = false
}
</script>

<template>
  <motion.div class="demo-auth" layout>
    <p class="demo-auth__label">Demo · Acceso de clientes</p>
    <motion.div v-if="!loggedIn" class="demo-auth__form">
      <input v-model="email" type="email" readonly />
      <motion.button
        :while-hover="{ scale: 1.02 }"
        :while-tap="{ scale: 0.98 }"
        @click="login"
      >
        Iniciar sesión mágica
      </motion.button>
    </motion.div>
    <motion.div
      v-else
      class="demo-auth__session"
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
    >
      <div class="demo-auth__avatar">IC</div>
      <div>
        <strong>Sesión activa</strong>
        <p>{{ email }}</p>
      </div>
      <button type="button" @click="logout">Salir</button>
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
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: auto;

    input {
      padding: 0.5rem 0.75rem;
      border-radius: $radius-sm;
      border: 1px solid $border-subtle;
      background: rgba(255, 255, 255, 0.04);
      color: $text-muted;
      font-size: 0.8rem;
    }

    button {
      padding: 0.55rem;
      border: none;
      border-radius: $radius-sm;
      background: $accent-primary;
      color: white;
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }

  &__session {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: auto;
    padding: 0.75rem;
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.25);
    border-radius: $radius-sm;

    strong {
      display: block;
      font-size: 0.85rem;
    }

    p {
      font-size: 0.75rem;
      color: $text-dim;
    }

    button {
      margin-left: auto;
      font-size: 0.7rem;
      background: none;
      border: none;
      color: $accent-secondary;
      cursor: pointer;
    }
  }

  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, $accent-primary, $accent-secondary);
    display: grid;
    place-items: center;
    font-size: 0.75rem;
    font-weight: 700;
  }
}
</style>
