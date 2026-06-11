<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { deliverableMeta } from '../data/cv'
import { isValidSimulatorSlug, simulatorBySlug } from '../data/simulators'
import { useLocale } from '../i18n'

const props = defineProps<{ slug: string }>()
const router = useRouter()
const { messages } = useLocale()

const config = computed(() =>
  isValidSimulatorSlug(props.slug) ? simulatorBySlug[props.slug] : null,
)

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

onMounted(() => {
  document.body.style.overflow = 'hidden'
  if (!config.value) router.replace('/')
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <component
    :is="config?.component"
    v-if="config && deliverable"
    :deliverable="deliverable"
  />
</template>
