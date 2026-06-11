<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useLocale } from '../../i18n'
import { supabase, isSupabaseConfigured, type ContactLead } from '../../lib/supabase'

const { messages } = useLocale()

const items = ref<ContactLead[]>([])
const channelReady = ref(false)

const mockItems = computed<ContactLead[]>(() =>
  messages.value.demos.crm.mockLeads.map((lead, i) => ({
    id: String(i + 1),
    name: lead.name,
    email: `lead${i + 1}@demo.io`,
    message: lead.message,
    created_at: new Date().toISOString(),
  })),
)

let channel: ReturnType<NonNullable<typeof supabase>['channel']> | null = null

onMounted(async () => {
  if (!supabase) {
    items.value = mockItems.value
    return
  }

  const { data } = await supabase
    .from('contact_leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)

  items.value = (data as ContactLead[])?.length ? (data as ContactLead[]) : mockItems.value

  channel = supabase
    .channel('leads-feed')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'contact_leads' },
      (payload) => {
        items.value = [payload.new as ContactLead, ...items.value].slice(0, 4)
      },
    )
    .subscribe((status) => {
      channelReady.value = status === 'SUBSCRIBED'
    })
})

onUnmounted(() => {
  if (supabase && channel) supabase.removeChannel(channel)
})
</script>

<template>
  <div class="demo-feed">
    <div class="demo-feed__head">
      <span class="demo-feed__dot" :class="{ 'demo-feed__dot--live': channelReady || isSupabaseConfigured }" />
      {{ messages.demos.liveFeed.title }}
    </div>
    <ul class="demo-feed__list">
      <AnimatePresence>
        <motion.li
          v-for="item in items"
          :key="item.id"
          :initial="{ opacity: 0, x: -12 }"
          :animate="{ opacity: 1, x: 0 }"
          :exit="{ opacity: 0, height: 0 }"
          layout
        >
          <strong>{{ item.name }}</strong>
          <span>{{ item.message.slice(0, 42) }}{{ item.message.length > 42 ? '…' : '' }}</span>
        </motion.li>
      </AnimatePresence>
    </ul>
    <p v-if="!isSupabaseConfigured" class="demo-feed__hint">{{ messages.demos.liveFeed.hint }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;

.demo-feed {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-dim;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $text-dim;

    &--live {
      background: #22c55e;
    }
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    overflow: hidden;

    li {
      padding: 0.6rem 0.75rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid $border-subtle;
      border-radius: $radius-sm;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;

      strong {
        font-size: 0.8rem;
      }

      span {
        font-size: 0.72rem;
        color: $text-dim;
      }
    }
  }

  &__hint {
    font-size: 0.65rem;
    color: $text-dim;
  }
}
</style>
