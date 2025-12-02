import { defineStore } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import { ref } from 'vue'

export enum BackgroundType {
  Daily = 'daily',
  Random = 'random',
  Custom = 'custom'
}

export interface SearchEngine {
  name: string
  url: string
}

export const useSettingsStore = defineStore('settings', () => {
  const searchEngine = ref<SearchEngine>({
    name: 'Bing',
    url: 'https://www.bing.com/search?q='
  })

  return {
    searchEngine
  }
}, {
  persist: {
    key: 'aisearch-settings',
    storage: localStorage,
    paths: ['searchEngine', 'backgroundType', 'customWallpaper', 'customSearchEngines']
  } as PersistenceOptions
})