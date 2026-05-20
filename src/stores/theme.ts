import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'polarstart-theme'
const WALLPAPER_STORAGE_KEY = 'polarstart-bing-wallpaper'

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme

  return 'light'
}

const getInitialWallpaperEnabled = () => {
  if (typeof window === 'undefined') return true

  const savedValue = window.localStorage.getItem(WALLPAPER_STORAGE_KEY)
  if (savedValue === 'true') return true
  if (savedValue === 'false') return false

  return true
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(getInitialTheme())
  const bingWallpaperEnabled = ref(getInitialWallpaperEnabled())

  const isDark = computed(() => mode.value === 'dark')


  const applyTheme = () => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = mode.value
    document.documentElement.style.colorScheme = mode.value
  }

  const setTheme = (nextMode: ThemeMode) => {
    mode.value = nextMode
  }

  const toggleTheme = () => {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  const toggleBingWallpaper = () => {
    bingWallpaperEnabled.value = !bingWallpaperEnabled.value
  }

  watch(mode, (nextMode) => {
    applyTheme()
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextMode)
    }
  }, { immediate: true })

  watch(bingWallpaperEnabled, (enabled) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WALLPAPER_STORAGE_KEY, String(enabled))
    }
  }, { immediate: true })

  return {
    mode,
    bingWallpaperEnabled,
    isDark,
    setTheme,
    toggleTheme,
    toggleBingWallpaper
  }
})
