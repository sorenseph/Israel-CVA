<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import SimulatorShell from './SimulatorShell.vue'
import DemoMetricCounter from '../demos/DemoMetricCounter.vue'
import PersonAvatar from '../ui/PersonAvatar.vue'
import { useLocale } from '../../i18n'
import { useDemoData } from '../../composables/useDemoData'
import { personaImages } from '../../data/simulator-assets'
import type { deliverableMeta } from '../../data/cv'

defineProps<{
  deliverable: {
    title: string
    tag: string
    accent: string
    icon: (typeof deliverableMeta)[number]['icon']
    slug: string
  }
}>()

const { messages } = useLocale()
const { teamMembers } = useDemoData()
const activeNav = ref('dashboard')
const navItems = computed(() => messages.value.simulators.webapp.nav)
const projects = computed(() => messages.value.simulators.webapp.projects)

const feedEvents = [
  { avatar: personaImages.woman1 },
  { avatar: personaImages.manBeard },
  { avatar: personaImages.student },
]
</script>

<template>
  <SimulatorShell
    :deliverable="deliverable"
    :active-nav="activeNav"
    :nav-items="navItems"
    @nav="activeNav = $event"
  >
    <motion.div
      :key="activeNav"
      class="panel-grid"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
    >
      <template v-if="activeNav === 'dashboard'">
        <div class="panel panel--wide">
          <DemoMetricCounter />
        </div>
        <div class="panel">
          <h3>{{ messages.simulators.webapp.revenue }}</h3>
          <div class="bars">
            <span v-for="n in 10" :key="n" :style="{ height: `${30 + n * 6}%` }" />
          </div>
        </div>
        <div class="panel">
          <h3>{{ messages.simulators.webapp.activity }}</h3>
          <ul class="feed">
            <li v-for="(ev, idx) in feedEvents" :key="idx">
              <PersonAvatar :src="ev.avatar" alt="" size="sm" />
              <span>{{ messages.simulators.webapp.events[idx] }}</span>
            </li>
          </ul>
        </div>
      </template>

      <template v-else-if="activeNav === 'projects'">
        <div class="panel panel--full">
          <h3>{{ messages.simulators.webapp.projectsTitle }}</h3>
          <div class="rows">
            <div v-for="p in projects" :key="p.name" class="row">
              <div>
                <strong>{{ p.name }}</strong>
                <small>{{ p.status }}</small>
              </div>
              <div class="progress">
                <span :style="{ width: `${p.progress}%` }" />
              </div>
              <em>{{ p.progress }}%</em>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="panel panel--full">
          <h3>{{ messages.simulators.webapp.usersTitle }}</h3>
          <div class="user-grid">
            <article v-for="u in teamMembers" :key="u.name" class="user-card">
              <PersonAvatar :src="u.avatar" :alt="u.name" size="md" />
              <div>
                <strong>{{ u.name }}</strong>
                <small>{{ u.role }}</small>
              </div>
              <span :class="{ on: u.active }">
                {{ u.active ? messages.simulators.webapp.statusActive : messages.simulators.webapp.statusAway }}
              </span>
            </article>
          </div>
        </div>
      </template>
    </motion.div>
  </SimulatorShell>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: #fff;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 1.1rem;

  &--wide {
    grid-column: span 2;
    @media (max-width: 800px) {
      grid-column: span 1;
    }
  }

  &--full {
    grid-column: 1 / -1;
  }

  h3 {
    font-family: $font-display;
    font-size: 0.95rem;
    margin: 0 0 0.85rem;
  }
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 140px;

  span {
    flex: 1;
    background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 60%, white));
    border-radius: 4px 4px 0 0;
  }
}

.feed {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.65rem;
    align-items: center;
    padding: 0.55rem 0;
    border-bottom: 1px solid $border-subtle;
    font-size: 0.85rem;
    color: $text-muted;
  }
}

.rows .row {
  display: grid;
  grid-template-columns: 1fr 120px 40px;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid $border-subtle;

  small {
    display: block;
    color: $text-dim;
    font-size: 0.75rem;
  }

  em {
    font-style: normal;
    font-size: 0.8rem;
    color: var(--accent);
  }
}

.progress {
  height: 6px;
  background: $bg-muted;
  border-radius: $radius-full;
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    background: var(--accent);
    border-radius: $radius-full;
  }
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.user-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.65rem;
  align-items: center;
  padding: 0.85rem;
  background: $bg-muted;
  border-radius: $radius-sm;

  small {
    display: block;
    color: $text-dim;
    font-size: 0.75rem;
  }

  span {
    font-size: 0.68rem;
    padding: 0.2rem 0.5rem;
    border-radius: $radius-full;
    background: rgba(0, 0, 0, 0.06);
    color: $text-dim;

    &.on {
      background: color-mix(in srgb, var(--accent) 15%, white);
      color: var(--accent);
    }
  }
}
</style>
