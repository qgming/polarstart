import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type ResolvedThemeMode = 'light' | 'dark'
export type ThemeMode = ResolvedThemeMode | 'system'

const STORAGE_KEY = 'polarstart-theme'
const WALLPAPER_STORAGE_KEY = 'polarstart-bing-wallpaper'

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') return savedTheme

  return 'system'
}

const getSystemTheme = (): ResolvedThemeMode => {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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
  const systemMode = ref<ResolvedThemeMode>(getSystemTheme())
  const bingWallpaperEnabled = ref(getInitialWallpaperEnabled())

  const resolvedMode = computed<ResolvedThemeMode>(() => (mode.value === 'system' ? systemMode.value : mode.value))
  const isDark = computed(() => resolvedMode.value === 'dark')


  const applyTheme = () => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = resolvedMode.value
    document.documentElement.style.colorScheme = resolvedMode.value
  }

  const setTheme = (nextMode: ThemeMode) => {
    mode.value = nextMode
  }

  const toggleTheme = () => {
    if (mode.value === 'light') {
      mode.value = 'dark'
      return
    }

    if (mode.value === 'dark') {
      mode.value = 'system'
      return
    }

    mode.value = 'light'
  }

  const toggleBingWallpaper = () => {
    bingWallpaperEnabled.value = !bingWallpaperEnabled.value
  }

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemTheme = () => {
      systemMode.value = mediaQuery.matches ? 'dark' : 'light'
    }

    updateSystemTheme()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateSystemTheme)
    } else {
      mediaQuery.addListener(updateSystemTheme)
    }
  }

  watch(resolvedMode, () => {
    applyTheme()
  }, { immediate: true })

  watch(mode, (nextMode) => {
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
    systemMode,
    resolvedMode,
    bingWallpaperEnabled,
    isDark,
    setTheme,
    toggleTheme,
    toggleBingWallpaper
  }
})
