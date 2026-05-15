<script setup lang="ts">
import { motion } from 'motion-v'
import { profile } from '../data/cv'
import GradientButton from './ui/GradientButton.vue'
import HumanFigure from './ui/HumanFigure.vue'
</script>

<template>
  <section id="inicio" class="hero">
    <motion.div
      class="hero__content container"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.6 }"
    >
      <motion.div class="hero__text">
        <motion.span
          class="hero__badge"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.1 }"
        >
          Desarrollador Frontend
        </motion.span>

        <motion.h1
          class="hero__title"
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.2, duration: 0.6 }"
        >
          Hola, soy
          <span class="gradient-text">{{ profile.name.split(' ')[0] }}</span>
        </motion.h1>

        <motion.p
          class="hero__role"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.35 }"
        >
          {{ profile.role }}
        </motion.p>

        <motion.p
          class="hero__pitch"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.45 }"
        >
          {{ profile.heroPitch }}
        </motion.p>

        <motion.div
          class="hero__actions"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.55 }"
        >
          <GradientButton href="#contacto">Contacto</GradientButton>
          <GradientButton href="#demos" variant="outline">Ver demo en vivo</GradientButton>
        </motion.div>

        <motion.div
          class="hero__meta"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.7 }"
        >
          <span>{{ profile.location }}</span>
          <span class="hero__dot" />
          <span>Cédula {{ profile.cedula }}</span>
        </motion.div>
      </motion.div>

      <motion.div
        class="hero__visual"
        :initial="{ opacity: 0, scale: 0.92 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0.3, duration: 0.7, type: 'spring' }"
      >
        <motion.div
          class="hero__orb hero__orb--1"
          :animate="{ y: [0, -12, 0] }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
        />
        <motion.div
          class="hero__orb hero__orb--2"
          :animate="{ y: [0, 10, 0] }"
          :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }"
        />
        <HumanFigure name="hero" size="xl" class="hero__figure" :delay="0.15" />
      </motion.div>
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: $nav-height;

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(34, 211, 238, 0.12);
    border: 1px solid rgba(34, 211, 238, 0.3);
    border-radius: $radius-full;
    font-size: 0.8rem;
    font-weight: 600;
    color: $accent-secondary;
    margin-bottom: 1.25rem;
  }

  &__title {
    font-family: $font-display;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 0.75rem;
  }

  &__role {
    font-family: $font-display;
    font-size: 1.25rem;
    color: $text-muted;
    margin-bottom: 1rem;
  }

  &__pitch {
    color: $text-muted;
    font-size: 1.05rem;
    max-width: 520px;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      justify-content: center;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: $text-dim;

    @media (max-width: 900px) {
      justify-content: center;
    }
  }

  &__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: $text-dim;
  }

  &__visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    min-height: 420px;

    @media (max-width: 900px) {
      min-height: 320px;
    }
  }

  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;

    &--1 {
      width: 280px;
      height: 280px;
      background: rgba(99, 102, 241, 0.35);
      top: 5%;
      right: 0;
    }

    &--2 {
      width: 200px;
      height: 200px;
      background: rgba(34, 211, 238, 0.25);
      bottom: 10%;
      left: 0;
    }
  }

  &__figure {
    position: relative;
    z-index: 1;
  }
}
</style>
