<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initGsap } from './lib/gsap-setup'
import { useSyncPageSeo } from './composables/useSyncPageSeo'

useSyncPageSeo()

onMounted(() => {
  initGsap()
})
</script>

<template>
  <RouterView />
</template>
