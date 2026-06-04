<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

defineProps<{
  show: boolean
  variant: 'success' | 'error'
  title: string
  message?: string
}>()
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="show"
      class="form-notice"
      :class="`form-notice--${variant}`"
      role="alert"
      :initial="{ opacity: 0, y: 10, scale: 0.98 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :exit="{ opacity: 0, y: -6, scale: 0.98 }"
      :transition="{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }"
    >
      <span class="form-notice__icon" aria-hidden="true">
        {{ variant === 'success' ? '✓' : '!' }}
      </span>
      <div class="form-notice__body">
        <strong>{{ title }}</strong>
        <p v-if="message">{{ message }}</p>
      </div>
    </motion.div>
  </AnimatePresence>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.form-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: $radius-md;
  border: 1px solid transparent;
  box-shadow: $shadow-soft;
}

.form-notice--success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.35);
  color: #166534;

  .form-notice__icon {
    background: #22c55e;
    color: #fff;
  }
}

.form-notice--error {
  background: rgba(248, 113, 113, 0.1);
  border-color: rgba(248, 113, 113, 0.4);
  color: #991b1b;

  .form-notice__icon {
    background: #ef4444;
    color: #fff;
  }
}

.form-notice__icon {
  flex-shrink: 0;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 0.1rem;
}

.form-notice__body {
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-family: $font-display;
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }

  p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
    opacity: 0.9;
  }
}
</style>
