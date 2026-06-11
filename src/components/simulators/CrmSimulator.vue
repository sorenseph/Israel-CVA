<script setup lang="ts">
import SimulatorShell from './SimulatorShell.vue'
import DemoCrmBoard from '../demos/DemoCrmBoard.vue'
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
</script>

<template>
  <SimulatorShell
    :deliverable="deliverable"
    active-nav="pipeline"
    :nav-items="[]"
    hide-nav
  >
    <DemoCrmBoard />
  </SimulatorShell>
</template>
