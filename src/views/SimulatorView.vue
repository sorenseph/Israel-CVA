<script setup lang="ts">
import { computed, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { deliverableMeta } from '../data/cv'
import { isValidSimulatorSlug, simulatorBySlug } from '../data/simulators'
import { useLocale } from '../i18n'
import type { Component } from 'vue'

const props = defineProps<{ slug: string }>()
const router = useRouter()
const { messages } = useLocale()

const SimulatorComponent = shallowRef<Component | null>(null)

const metaIndex = computed(() =>
  deliverableMeta.findIndex((item) => item.slug === props.slug),
)

const deliverable = computed(() => {
  const i = metaIndex.value
  if (i < 0) return null
  return {
    ...messages.value.projectDeliverables[i],
    ...deliverableMeta[i],
  }
})

async function loadSimulator(slug: string) {
  if (!isValidSimulatorSlug(slug)) {
    SimulatorComponent.value = null
    return
  }

  SimulatorComponent.value = null
  const mod = await simulatorBySlug[slug]()
  SimulatorComponent.value = mod.default
}

watch(
  () => props.slug,
  (slug) => {
    void loadSimulator(slug)
  },
  { immediate: true },
)

onMounted(() => {
  document.body.style.overflow = 'hidden'
  if (!isValidSimulatorSlug(props.slug)) router.replace('/')
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <component
    :is="SimulatorComponent"
    v-if="SimulatorComponent && deliverable"
    :deliverable="deliverable"
  />
</template>
