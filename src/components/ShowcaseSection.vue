<script setup lang="ts">
import { motion } from 'motion-v'
import SectionTitle from './ui/SectionTitle.vue'
import ShowcaseApp from './showcase/ShowcaseApp.vue'
import GradientButton from './ui/GradientButton.vue'
import HumanFigure from './ui/HumanFigure.vue'
</script>

<template>
  <section id="demos" class="showcase">
    <motion.div
      class="container showcase__wrap"
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :viewport="{ once: true }"
    >
      <div class="showcase__intro">
        <SectionTitle
          label="Demo interactiva"
          title="Así se ve un producto real que puedo entregarte"
          subtitle="Tienda con carrito, checkout Stripe, dashboard y CRM en vivo con Supabase. Explora las pestañas del estudio."
        />
        <motion.div
          class="showcase__cta"
          :initial="{ opacity: 0, y: 12 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
        >
          <GradientButton href="#contacto">Quiero algo así</GradientButton>
          <GradientButton href="#proyectos" variant="outline">Ver entregables</GradientButton>
        </motion.div>
      </div>

      <motion.div
        class="showcase__stage-wrap"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-60px' }"
        :transition="{ duration: 0.7 }"
      >
        <HumanFigure name="poseCoffee" size="md" class="showcase__figure" :delay="0.15" />
        <div class="showcase__stage">
          <div class="showcase__browser-chrome">
            <span /><span /><span />
            <p>israel-studio.app — preview</p>
          </div>
          <ShowcaseApp />
        </div>
      </motion.div>

    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.showcase {
  padding: 6rem 1rem;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99, 102, 241, 0.12), transparent),
    linear-gradient(180deg, rgba(34, 211, 238, 0.04), transparent);
  overflow: hidden;
}

.showcase__wrap {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}

.showcase__intro {
  margin-bottom: 2.5rem;
}

.showcase__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.showcase__stage-wrap {
  position: relative;
}

.showcase__figure {
  position: absolute;
  right: -2%;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.9;

  @media (max-width: 1100px) {
    display: none;
  }
}

.showcase__stage {
  position: relative;
  z-index: 1;
}

.showcase__browser-chrome {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $border-subtle;
  border-bottom: none;
  border-radius: $radius-md $radius-md 0 0;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);

    &:nth-child(1) {
      background: #ff5f57;
    }
    &:nth-child(2) {
      background: #febc2e;
    }
    &:nth-child(3) {
      background: #28c840;
    }
  }

  p {
    margin-left: auto;
    font-size: 0.75rem;
    color: $text-dim;
  }
}

</style>
