<script setup lang="ts">
import { ref, computed } from 'vue'
import { motion } from 'motion-v'
import SimulatorShell from './SimulatorShell.vue'
import HandPhoneFrame from './HandPhoneFrame.vue'
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
const { storeProducts, teamMembers, crmLeads } = useDemoData()
const activeNav = ref('home')
const navItems = computed(() => messages.value.simulators.movil.nav)
const movil = computed(() => messages.value.simulators.movil)

const featuredProducts = computed(() => storeProducts.value.slice(0, 4))

const bookingAvatars = [personaImages.youngMan, personaImages.woman3, personaImages.manBeard]
const activityAvatars = [personaImages.woman1, personaImages.student, personaImages.youngMan]

const bookings = computed(() =>
  movil.value.bookings.map((b, i) => ({
    ...b,
    avatar: bookingAvatars[i],
  })),
)

const activity = computed(() =>
  movil.value.activity.map((a, i) => ({
    ...a,
    avatar: activityAvatars[i],
  })),
)

const profileFirstName = computed(() => movil.value.profileName.split(' ')[0] ?? '')
</script>

<template>
  <SimulatorShell
    :deliverable="deliverable"
    :active-nav="activeNav"
    :nav-items="navItems"
    @nav="activeNav = $event"
  >
    <div class="mobile-stage">
      <HandPhoneFrame variant="side">
        <div class="app">
          <div class="app__status">
            <span>9:41</span>
            <span class="app__status-icons">▮▮▮ WiFi 🔋</span>
          </div>

          <motion.div
            :key="activeNav"
            class="app__body"
            :initial="{ opacity: 0, x: 8 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.28 }"
          >
            <template v-if="activeNav === 'home'">
              <header class="app__hero">
                <PersonAvatar :src="personaImages.woman2" alt="" size="lg" />
                <div>
                  <p class="app__greet">{{ movil.greeting }}, {{ profileFirstName }}</p>
                  <h2>{{ movil.homeTitle }}</h2>
                </div>
                <span class="app__notif">3</span>
              </header>

              <div class="app__search">
                <span>⌕</span>
                <input type="search" :placeholder="movil.searchPlaceholder" readonly />
              </div>

              <div class="app__stats">
                <div class="stat-pill">
                  <strong>24</strong>
                  <span>{{ movil.statBookings }}</span>
                </div>
                <div class="stat-pill stat-pill--green">
                  <strong>98%</strong>
                  <span>{{ movil.statSatisfaction }}</span>
                </div>
              </div>

              <p class="app__section-label">{{ movil.featuredTitle }}</p>
              <div class="app__scroll-x">
                <article v-for="p in featuredProducts" :key="p.id" class="product-chip">
                  <img :src="p.image" :alt="p.name" loading="lazy" />
                  <strong>${{ p.price }}</strong>
                  <small>{{ p.name }}</small>
                </article>
              </div>

              <p class="app__section-label">{{ movil.activityTitle }}</p>
              <ul class="app__activity">
                <li v-for="a in activity" :key="a.text">
                  <PersonAvatar :src="a.avatar" alt="" size="sm" />
                  <div>
                    <strong>{{ a.text }}</strong>
                    <small>{{ a.time }}</small>
                  </div>
                </li>
              </ul>
            </template>

            <template v-else-if="activeNav === 'shop'">
              <h2 class="app__title">{{ movil.shopTitle }}</h2>
              <div class="app__shop-grid">
                <article v-for="p in storeProducts" :key="p.id" class="shop-card">
                  <img :src="p.image" :alt="p.name" loading="lazy" />
                  <span class="shop-card__tag">{{ p.tag }}</span>
                  <strong>{{ p.name }}</strong>
                  <em>${{ p.price }}</em>
                  <button type="button">+</button>
                </article>
              </div>
            </template>

            <template v-else-if="activeNav === 'bookings'">
              <h2 class="app__title">{{ movil.bookingsTitle }}</h2>
              <ul class="booking-list">
                <li v-for="b in bookings" :key="b.time">
                  <time>{{ b.time }}</time>
                  <PersonAvatar :src="b.avatar" alt="" size="sm" />
                  <div>
                    <strong>{{ b.title }}</strong>
                    <small>{{ b.client }}</small>
                  </div>
                </li>
              </ul>
              <button type="button" class="app__cta">{{ movil.ctaBook }}</button>
            </template>

            <template v-else>
              <div class="profile">
                <PersonAvatar :src="personaImages.portrait" alt="" size="lg" />
                <h2>{{ movil.profileName }}</h2>
                <p>{{ movil.profileRole }}</p>
              </div>
              <ul class="profile-menu">
                <li>{{ movil.notifOn }}</li>
                <li>{{ movil.membership }}</li>
                <li>{{ movil.offline }}</li>
                <li>{{ movil.paymentMethod }}</li>
              </ul>
              <div class="profile-team">
                <p>{{ movil.teamTitle }}</p>
                <div class="profile-team__avatars">
                  <PersonAvatar
                    v-for="m in teamMembers"
                    :key="m.name"
                    :src="m.avatar"
                    :alt="m.name"
                    size="sm"
                  />
                </div>
              </div>
            </template>
          </motion.div>

          <nav class="app__tabs">
            <button
              v-for="item in navItems"
              :key="item.id"
              type="button"
              :class="{ active: activeNav === item.id }"
              @click="activeNav = item.id"
            >
              <span class="app__tab-icon">{{ item.icon }}</span>
              {{ item.label }}
            </button>
          </nav>
        </div>
      </HandPhoneFrame>

      <aside class="mobile-side">
        <h3>{{ movil.sideTitle }}</h3>
        <p>{{ movil.sideText }}</p>
        <ul>
          <li v-for="lead in crmLeads" :key="lead.name">
            <PersonAvatar :src="lead.avatar" alt="" size="md" />
            <div>
              <strong>{{ lead.name }}</strong>
              <small>{{ lead.company }}</small>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </SimulatorShell>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.mobile-stage {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafafa;
  font-size: 10px;
  line-height: 1.35;

  &__status {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px 2px;
    font-size: 9px;
    font-weight: 600;
    color: $text-primary;
    flex-shrink: 0;
  }

  &__status-icons {
    font-size: 7px;
    letter-spacing: -0.5px;
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 6px 8px 4px;
    -webkit-overflow-scrolling: touch;
  }

  &__hero {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 6px;
    align-items: center;
    margin-bottom: 8px;
  }

  &__greet {
    margin: 0;
    font-size: 8px;
    color: $text-dim;
  }

  &__hero h2 {
    margin: 0;
    font-family: $font-display;
    font-size: 11px;
    line-height: 1.2;
  }

  &__notif {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ef4444;
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    display: grid;
    place-items: center;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 8px;
    background: #fff;
    border-radius: 999px;
    border: 1px solid $border-subtle;
    margin-bottom: 8px;
    font-size: 8px;
    color: $text-dim;

    input {
      border: none;
      background: none;
      width: 100%;
      font-size: 8px;
      outline: none;
    }
  }

  &__stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    margin-bottom: 8px;
  }

  &__section-label {
    font-size: 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: $text-dim;
    margin: 0 0 4px;
  }

  &__scroll-x {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 6px;
    margin-bottom: 8px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__activity {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 6px;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid $border-subtle;

      strong {
        display: block;
        font-size: 8px;
      }

      small {
        color: $text-dim;
        font-size: 7px;
      }
    }
  }

  &__title {
    font-family: $font-display;
    font-size: 12px;
    margin: 0 0 8px;
  }

  &__shop-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  &__cta {
    width: 100%;
    margin-top: 8px;
    padding: 6px;
    border: none;
    border-radius: 999px;
    background: var(--accent);
    color: #fff;
    font-size: 9px;
    font-weight: 600;
    cursor: pointer;
  }

  &__tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    padding: 4px 4px 6px;
    background: #fff;
    border-top: 1px solid $border-subtle;
    flex-shrink: 0;

    button {
      border: none;
      background: transparent;
      color: $text-dim;
      font-size: 6.5px;
      padding: 3px 1px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;

      &.active {
        color: var(--accent);
        background: color-mix(in srgb, var(--accent) 10%, white);
      }
    }
  }

  &__tab-icon {
    font-size: 10px;
    line-height: 1;
  }
}

.stat-pill {
  padding: 6px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent) 10%, white);

  strong {
    display: block;
    font-family: $font-display;
    font-size: 12px;
    color: var(--accent);
  }

  span {
    font-size: 7px;
    color: $text-muted;
  }

  &--green strong {
    color: #16a34a;
  }

  &--green {
    background: rgba(34, 197, 94, 0.1);
  }
}

.product-chip {
  flex: 0 0 72px;

  img {
    width: 72px;
    height: 52px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 3px;
  }

  strong {
    display: block;
    font-size: 9px;
  }

  small {
    font-size: 6.5px;
    color: $text-dim;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.shop-card {
  position: relative;
  padding: 4px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid $border-subtle;

  img {
    width: 100%;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 3px;
  }

  &__tag {
    position: absolute;
    top: 6px;
    left: 6px;
    font-size: 5px;
    font-weight: 700;
    padding: 2px 4px;
    border-radius: 999px;
    background: var(--accent);
    color: #fff;
  }

  strong {
    display: block;
    font-size: 7px;
    line-height: 1.2;
  }

  em {
    font-style: normal;
    font-size: 8px;
    font-weight: 700;
    color: var(--accent);
  }

  button {
    position: absolute;
    right: 6px;
    bottom: 6px;
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background: $stroke-ink;
    color: #fff;
    font-size: 10px;
    cursor: pointer;
  }
}

.booking-list {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: grid;
    grid-template-columns: 28px auto 1fr;
    gap: 5px;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid $border-subtle;

    time {
      font-size: 7px;
      font-weight: 700;
      color: var(--accent);
    }

    small {
      display: block;
      color: $text-dim;
      font-size: 7px;
    }

    strong {
      font-size: 8px;
    }
  }
}

.profile {
  text-align: center;
  margin-bottom: 8px;

  h2 {
    font-family: $font-display;
    font-size: 12px;
    margin: 4px 0 2px;
  }

  p {
    margin: 0;
    font-size: 8px;
    color: $text-muted;
  }
}

.profile-menu {
  list-style: none;
  margin: 0 0 8px;
  padding: 0;

  li {
    padding: 5px 0;
    border-bottom: 1px solid $border-subtle;
    font-size: 8px;
  }
}

.profile-team {
  p {
    font-size: 7px;
    font-weight: 700;
    text-transform: uppercase;
    color: $text-dim;
    margin: 0 0 4px;
  }

  &__avatars {
    display: flex;
    gap: 4px;
  }
}

.mobile-side {
  padding: 1.25rem;
  background: #fff;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;

  h3 {
    font-family: $font-display;
    font-size: 1rem;
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 0.85rem;
    color: $text-muted;
    margin: 0 0 1rem;
    line-height: 1.5;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;

    li {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.65rem;
      align-items: center;

      strong {
        font-size: 0.85rem;
      }

      small {
        display: block;
        color: $text-dim;
        font-size: 0.75rem;
      }
    }
  }
}
</style>
