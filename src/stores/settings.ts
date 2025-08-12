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
  const backgroundType = ref<BackgroundType>(BackgroundType.Daily)
  const customWallpaper = ref<string>('')
  const searchEngine = ref<SearchEngine>({
    name: 'Bing',
    url: 'https://www.bing.com/search?q='
  })
  
  const availableSearchEngines = ref<SearchEngine[]>([
    {
      name: 'Bing',
      url: 'https://www.bing.com/search?q='
    },
    {
      name: 'Google',
      url: 'https://www.google.com/search?q='
    },
    {
      name: 'Baidu',
      url: 'https://www.baidu.com/s?wd='
    },
    {
      name: 'DuckDuckGo',
      url: 'https://duckduckgo.com/?q='
    }
  ])
  
  const customSearchEngines = ref<SearchEngine[]>([])
  
  const setSearchEngine = (engine: SearchEngine) => {
    searchEngine.value = engine
  }
  
  const setBackgroundType = (type: BackgroundType) => {
    backgroundType.value = type
  }
  
  const setCustomWallpaper = (wallpaperPath: string) => {
    customWallpaper.value = wallpaperPath
    backgroundType.value = BackgroundType.Custom
  }
  
  const addCustomSearchEngine = (engine: SearchEngine) => {
    if (!customSearchEngines.value.find(e => e.name === engine.name || e.url === engine.url)) {
      customSearchEngines.value.push(engine)
      return true
    }
    return false
  }
  
  const removeCustomSearchEngine = (engineName: string) => {
    const index = customSearchEngines.value.findIndex(e => e.name === engineName)
    if (index > -1) {
      customSearchEngines.value.splice(index, 1)
      // 如果当前选中的搜索引擎被删除，则重置为默认Bing
      if (searchEngine.value.name === engineName) {
        searchEngine.value = availableSearchEngines.value[0]
      }
      return true
    }
    return false
  }
  
  const updateCustomSearchEngine = (oldName: string, newEngine: SearchEngine) => {
    const index = customSearchEngines.value.findIndex(e => e.name === oldName)
    if (index > -1) {
      // 检查新名称是否已存在（排除自己）
      const nameExists = customSearchEngines.value.some(
        (e, i) => i !== index && e.name === newEngine.name
      )
      if (nameExists) {
        return false
      }
      
      customSearchEngines.value[index] = newEngine
      
      // 如果当前选中的搜索引擎被更新，则同步更新
      if (searchEngine.value.name === oldName) {
        searchEngine.value = newEngine
      }
      return true
    }
    return false
  }
  
  const getAllSearchEngines = () => {
    return [...availableSearchEngines.value, ...customSearchEngines.value]
  }
  
  return {
    backgroundType,
    customWallpaper,
    searchEngine,
    availableSearchEngines,
    customSearchEngines,
    setSearchEngine,
    setBackgroundType,
    setCustomWallpaper,
    addCustomSearchEngine,
    removeCustomSearchEngine,
    updateCustomSearchEngine,
    getAllSearchEngines
  }
}, {
  persist: {
    key: 'aisearch-settings',
    storage: localStorage,
    paths: ['searchEngine', 'backgroundType', 'customWallpaper', 'customSearchEngines']
  } as PersistenceOptions
})