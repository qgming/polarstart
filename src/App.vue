<script setup lang="ts">
import { onMounted } from 'vue'
import TopNav from '@/components/TopNav.vue'
import { useAihotStore, useHotStore, useItNewsStore } from '@/stores/content'

const hotStore = useHotStore()
const aihotStore = useAihotStore()
const itNewsStore = useItNewsStore()

onMounted(() => {
  void hotStore.preloadSources()
  void aihotStore.preloadAihot()
  void itNewsStore.loadItems()
})
</script>

<template>
  <TopNav />
  <RouterView />
</template>
