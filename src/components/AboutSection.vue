<script setup lang="ts">
import { motion } from 'motion-v'
import { profile, skills } from '../data/cv'
import SectionTitle from './ui/SectionTitle.vue'
import HumanFigure from './ui/HumanFigure.vue'
</script>

<template>
  <section id="sobre-mi" class="about">
    <motion.div
      class="container"
      :initial="{ opacity: 0, y: 40 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, margin: '-80px' }"
      :transition="{ duration: 0.6 }"
    >
      <SectionTitle
        label="Sobre mí"
        title="Desarrollo web con visión de producto"
        :subtitle="profile.title"
      />

      <div class="about__layout">
      <motion.div
        class="about__grid"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :viewport="{ once: true }"
        :transition="{ delay: 0.2 }"
      >
        <div class="about__card about__card--main">
          <p>{{ profile.summary }}</p>
          <ul class="about__contact">
            <li>
              <span>Email</span>
              <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            </li>
            <li>
              <span>Teléfono</span>
              <a :href="`tel:${profile.phone.replace(/\s/g, '')}`">{{ profile.phone }}</a>
            </li>
            <li>
              <span>Ubicación</span>
              <span>{{ profile.location }}</span>
            </li>
          </ul>
        </div>

        <div class="about__skills">
          <h3>Habilidades técnicas</h3>
          <ul class="skills-list">
            <motion.li
              v-for="(skill, i) in skills"
              :key="skill.name"
              class="skill-item"
              :initial="{ opacity: 0, x: -16 }"
              :while-in-view="{ opacity: 1, x: 0 }"
              :viewport="{ once: true }"
              :transition="{ delay: i * 0.04 }"
            >
              <motion.div class="skill-item__header">
                <span>{{ skill.name }}</span>
                <span>{{ skill.level }}%</span>
              </motion.div>
              <div class="skill-item__track">
                <motion.div
                  class="skill-item__fill"
                  :initial="{ width: 0 }"
                  :while-in-view="{ width: `${skill.level}%` }"
                  :viewport="{ once: true }"
                  :transition="{ duration: 0.8, delay: 0.1 + i * 0.04 }"
                />
              </div>
            </motion.li>
          </ul>
        </div>
      </motion.div>
      <HumanFigure name="partner" size="lg" class="about__figure" :delay="0.2" />
      </div>
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.about__layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: end;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    .about__figure {
      display: none;
    }
  }
}

.about__figure {
  align-self: center;
  max-width: 260px;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.about__card {
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 2rem;
  backdrop-filter: blur(8px);

  &--main p {
    color: $text-muted;
    margin-bottom: 2rem;
    font-size: 1.05rem;
    line-height: 1.75;
  }
}

.about__contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    span:first-child {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: $text-dim;
    }

    a {
      color: $accent-secondary;
      transition: opacity $transition;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.about__skills {
  background: $bg-card;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 2rem;

  h3 {
    font-family: $font-display;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
}

.skills-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
    color: $text-muted;
  }

  &__track {
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: $radius-full;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, $accent-primary, $accent-secondary);
    border-radius: $radius-full;
  }
}
</style>
