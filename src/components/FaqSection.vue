<script setup lang="ts">
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useLocale } from '../i18n'
import SectionTitle from './ui/SectionTitle.vue'
import AnimateIn from './ui/AnimateIn.vue'

const { messages } = useLocale()

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="faq section-block">
    <div class="container faq__inner">
      <AnimateIn>
        <SectionTitle
          :label="messages.sections.faq.label"
          :title="messages.sections.faq.title"
        />
      </AnimateIn>

      <div class="faq__list">
        <motion.div
          v-for="(item, i) in messages.faqItems"
          :key="item.q"
          class="faq__item"
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ delay: i * 0.06 }"
        >
          <button type="button" class="faq__trigger" @click="toggle(i)">
            <span>{{ item.q }}</span>
            <span class="faq__icon" :class="{ 'faq__icon--open': openIndex === i }">+</span>
          </button>
          <AnimatePresence>
            <motion.div
              v-if="openIndex === i"
              class="faq__answer"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.3 }"
            >
              <p>{{ item.a }}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.faq {
  background: $bg-surface;
}

.faq__inner {
  max-width: 720px;
}

.faq__item {
  border-bottom: 1px solid $border-subtle;

  &:first-child {
    border-top: 1px solid $border-subtle;
  }
}

.faq__trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: $font-display;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  color: $text-primary;
}

.faq__icon {
  font-size: 1.5rem;
  font-weight: 300;
  transition: transform $transition;
  flex-shrink: 0;

  &--open {
    transform: rotate(45deg);
  }
}

.faq__answer {
  overflow: hidden;

  p {
    padding-bottom: 1.25rem;
    color: $text-muted;
    line-height: 1.65;
    font-size: 0.95rem;
  }
}
</style>
