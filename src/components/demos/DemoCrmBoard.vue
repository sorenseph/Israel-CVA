<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import DemoLiveFeed from './DemoLiveFeed.vue'
import PersonAvatar from '../ui/PersonAvatar.vue'
import { useLocale } from '../../i18n'
import { useDemoData } from '../../composables/useDemoData'
import { personaImages } from '../../data/simulator-assets'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })

const { messages } = useLocale()
const { crmLeads } = useDemoData()
const activeNav = ref('pipeline')
const navItems = computed(() => messages.value.simulators.crm.nav)

const crm = computed(() => messages.value.demos.crm)

const stages = computed(() =>
  crm.value.stages.map((stage, i) => ({
    ...stage,
    leads: i === 0 ? crmLeads.value : i === 1 ? crmLeads.value.slice(0, 2) : i === 2 ? crmLeads.value.slice(1) : [crmLeads.value[0]],
  })),
)

const calendar = computed(() =>
  crm.value.calendar.map((day, i) => ({
    ...day,
    avatar: [personaImages.woman1, personaImages.youngMan, personaImages.manBeard][i],
  })),
)

const notifications = computed(() =>
  crm.value.notifications.map((n, i) => ({
    ...n,
    avatar: [personaImages.woman3, personaImages.manBeard, personaImages.student][i],
  })),
)
</script>

<template>
  <div class="crm-board" :class="{ 'crm-board--compact': compact }">
    <nav class="crm-board__nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        :class="{ active: activeNav === item.id }"
        @click="activeNav = item.id"
      >
        {{ item.label }}
      </button>
    </nav>

    <motion.div
      :key="activeNav"
      class="crm-board__body"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.28 }"
    >
      <template v-if="activeNav === 'pipeline'">
        <div class="pipeline">
          <div v-for="(stage, i) in stages" :key="stage.name" class="stage">
            <header>
              <strong>{{ stage.name }}</strong>
              <span>{{ stage.count }}</span>
            </header>
            <p>{{ stage.value }}</p>
            <div class="stage__avatars">
              <PersonAvatar
                v-for="lead in stage.leads"
                :key="lead.name"
                :src="lead.avatar"
                :alt="lead.name"
                size="sm"
              />
            </div>
            <div class="stage__bar">
              <motion.span
                :initial="{ width: 0 }"
                :animate="{ width: `${(stage.count / 12) * 100}%` }"
                :transition="{ delay: i * 0.06, duration: 0.5 }"
              />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="activeNav === 'leads'">
        <div class="leads-grid">
          <div class="leads-grid__cards">
            <article v-for="lead in crmLeads" :key="lead.name" class="lead-card">
              <PersonAvatar :src="lead.avatar" :alt="lead.name" size="md" />
              <div>
                <strong>{{ lead.name }}</strong>
                <small>{{ lead.company }}</small>
                <em>{{ lead.value }}</em>
              </div>
            </article>
          </div>
          <div class="leads-grid__feed">
            <DemoLiveFeed />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="calendar-wrap">
          <div class="cal-grid">
            <article v-for="day in calendar" :key="day.day" class="cal-day">
              <div class="cal-day__head">
                <h4>{{ day.day }}</h4>
                <PersonAvatar :src="day.avatar" alt="" size="sm" />
              </div>
              <ul>
                <li v-for="slot in day.slots" :key="slot">{{ slot }}</li>
              </ul>
            </article>
          </div>
          <div class="activity-panel">
            <p class="activity-panel__label">{{ crm.activity }}</p>
            <ul>
              <li v-for="n in notifications" :key="n.text">
                <PersonAvatar :src="n.avatar" alt="" size="sm" />
                <div>
                  <span>{{ n.text }}</span>
                  <small>{{ n.time }}</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </motion.div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.crm-board {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  min-height: 380px;

  &--compact {
    min-height: 420px;

    .pipeline {
      grid-template-columns: repeat(2, 1fr);
    }

    .leads-grid {
      grid-template-columns: 1fr;
    }

    .calendar-wrap {
      grid-template-columns: 1fr;
    }
  }

  &__nav {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;

    button {
      padding: 0.45rem 0.85rem;
      border: 1px solid $border-subtle;
      border-radius: $radius-full;
      background: #fff;
      color: $text-muted;
      font-family: $font-display;
      font-size: 0.78rem;
      cursor: pointer;
      transition: $transition;

      &.active {
        background: $stroke-ink;
        color: #fff;
        border-color: $stroke-ink;
      }
    }
  }

  &__body {
    flex: 1;
    min-height: 0;
  }
}

.pipeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stage {
  padding: 0.85rem;
  background: #fff;
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
  border-top: 3px solid $accent-primary;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;

    strong {
      font-family: $font-display;
      font-size: 0.82rem;
    }

    span {
      font-size: 0.72rem;
      color: $accent-primary;
      font-weight: 700;
    }
  }

  p {
    margin: 0 0 0.45rem;
    font-size: 0.78rem;
    color: $text-muted;
  }

  &__avatars {
    display: flex;
    gap: 3px;
    margin-bottom: 0.5rem;
  }

  &__bar {
    height: 5px;
    background: $bg-muted;
    border-radius: $radius-full;
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $accent-primary;
      border-radius: $radius-full;
    }
  }
}

.leads-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 100%;

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__feed {
    min-height: 200px;
  }
}

.lead-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem;
  align-items: center;
  padding: 0.65rem;
  background: $bg-muted;
  border-radius: $radius-sm;

  strong {
    display: block;
    font-size: 0.85rem;
  }

  small {
    display: block;
    color: $text-dim;
    font-size: 0.72rem;
  }

  em {
    font-style: normal;
    font-size: 0.78rem;
    color: $accent-primary;
    font-weight: 600;
  }
}

.calendar-wrap {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.cal-day {
  padding: 0.75rem;
  background: $bg-muted;
  border-radius: $radius-sm;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  h4 {
    margin: 0;
    font-family: $font-display;
    font-size: 0.85rem;
    color: $accent-primary;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      font-size: 0.75rem;
      padding: 0.35rem 0;
      border-bottom: 1px solid $border-subtle;
      color: $text-muted;
    }
  }
}

.activity-panel {
  padding: 0.85rem;
  background: #fff;
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;

  &__label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-dim;
    margin: 0 0 0.65rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;

    li {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5rem;
      align-items: center;
      padding: 0.45rem;
      background: $bg-muted;
      border-radius: $radius-sm;
      font-size: 0.8rem;

      small {
        display: block;
        color: $text-dim;
        font-size: 0.68rem;
      }
    }
  }
}
</style>
