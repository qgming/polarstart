<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Local as LocationIcon, Search as SearchIcon, Close as CloseIcon } from '@icon-park/vue-next'

interface Location {
  name: string
  province: string
  city: string
  county: string
}

interface Weather {
  condition: string
  condition_code: string
  temperature: number
  humidity: number
  pressure: number
  precipitation: number
  wind_direction: string
  wind_power: string
  weather_icon: string
  weather_colors: string[]
  updated: string
  updated_at: number
}

interface AirQuality {
  aqi: number
  level: number
  quality: string
  pm25: number
  pm10: number
  co: number
  no2: number
  o3: number
  so2: number
  rank: number
  total_cities: number
  updated: string
  updated_at: number
}

interface Sunrise {
  sunrise: string
  sunrise_at: number
  sunrise_desc: string
  sunset: string
  sunset_at: number
  sunset_desc: string
}

interface LifeIndex {
  key: string
  name: string
  level: string
  description: string
}

interface Alert {
  type: string
  level: string
  level_code: string
  province: string
  city: string
  county: string
  detail: string
  updated: string
  updated_at: number
}

interface WeatherData {
  location: Location
  weather: Weather
  air_quality: AirQuality
  sunrise: Sunrise
  life_indices: LifeIndex[]
  alerts: Alert[]
}

interface WeatherResponse {
  code: number
  message: string
  data: WeatherData
}

const weatherData = ref<WeatherData | null>(null)
const loading = ref(true)
const error = ref('')
const searchQuery = ref('') // 搜索地区
const isLocating = ref(false) // 是否正在定位
const locationError = ref('') // 定位错误信息
const isSearchExpanded = ref(false) // 搜索框是否展开

const CACHE_KEY = 'weather_cache'
const CACHE_TIMESTAMP_KEY = 'weather_timestamp'
const CACHE_QUERY_KEY = 'weather_query'
const CACHE_DURATION = 30 * 60 * 1000 // 30分钟（毫秒）

// 检查缓存是否有效
const isCacheValid = (query: string): boolean => {
  const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
  const cachedQuery = localStorage.getItem(CACHE_QUERY_KEY)
  if (!timestamp || cachedQuery !== query) return false

  const now = Date.now()
  const cacheTime = parseInt(timestamp, 10)
  return now - cacheTime < CACHE_DURATION
}

// 从缓存加载数据
const loadFromCache = (query: string): boolean => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached && isCacheValid(query)) {
      weatherData.value = JSON.parse(cached)
      return true
    }
  } catch (err) {
    console.error('读取缓存失败:', err)
  }
  return false
}

// 保存数据到缓存
const saveToCache = (data: WeatherData, query: string) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
    localStorage.setItem(CACHE_QUERY_KEY, query)
  } catch (err) {
    console.error('保存缓存失败:', err)
  }
}

// 获取天气数据
const fetchWeatherData = async (forceRefresh = false, query = '') => {
  // 如果不是强制刷新，先尝试从缓存加载
  if (!forceRefresh && loadFromCache(query)) {
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''

  try {
    const url = query
      ? `https://60s.viki.moe/v2/weather?query=${encodeURIComponent(query)}&encoding=json`
      : 'https://60s.viki.moe/v2/weather?encoding=json'

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: WeatherResponse = await response.json()

    if (data.code === 200 && data.data) {
      weatherData.value = data.data
      saveToCache(data.data, query)
    } else {
      throw new Error(data.message || '获取数据失败')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '网络错误，请稍后重试'
    console.error('获取天气数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 搜索天气
const searchWeather = () => {
  if (searchQuery.value.trim()) {
    fetchWeatherData(true, searchQuery.value.trim())
    isSearchExpanded.value = false // 搜索后收起
  }
}

// 搜索输入框引用
const searchInput = ref<HTMLInputElement | null>(null)

// 切换搜索框展开状态
const toggleSearch = () => {
  isSearchExpanded.value = !isSearchExpanded.value
  if (isSearchExpanded.value) {
    // 展开时聚焦输入框
    setTimeout(() => {
      searchInput.value?.focus()
    }, 100)
  } else {
    searchQuery.value = '' // 收起时清空搜索内容
  }
}

// 获取用户位置并获取天气
const getLocationWeather = async () => {
  if (!navigator.geolocation) {
    locationError.value = '您的浏览器不支持定位功能'
    return
  }

  isLocating.value = true
  locationError.value = ''

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      })
    })

    const { latitude, longitude } = position.coords
    console.log('获取到的坐标:', { latitude, longitude })

    try {
      // 使用高德地图逆地理编码服务
      const url = `https://restapi.amap.com/v3/geocode/regeo?key=d68760589603001a15d1ecac45c2e035&location=${longitude},${latitude}&extensions=base`
      console.log('请求高德地图 API:', url)

      const response = await fetch(url)

      console.log('高德地图响应状态:', response.status, response.ok)

      if (!response.ok) {
        throw new Error(`高德地图服务请求失败: ${response.status}`)
      }

      const data = await response.json()
      console.log('高德地图返回完整数据:', JSON.stringify(data, null, 2))

      if (data.status === '1' && data.regeocode) {
        const addressComponent = data.regeocode.addressComponent
        console.log('地址组件:', addressComponent)

        // 优先使用城市名，如果没有则使用省份
        let city = addressComponent.city || addressComponent.province

        console.log('原始城市名:', city, '类型:', typeof city)

        // 处理城市为数组的情况
        if (Array.isArray(city) && city.length === 0) {
          city = addressComponent.province
          console.log('城市为空数组，使用省份:', city)
        }

        if (city && city !== '[]' && city !== '') {
          // 去掉"市"和"省"字后缀
          const cityName = city.replace(/[市省]$/, '')
          console.log('处理后的城市名:', cityName)

          // 提示用户定位结果（可能不准确）
          locationError.value = `已定位到: ${cityName}（如不准确请手动搜索）`

          searchQuery.value = cityName
          await fetchWeatherData(true, cityName)
          return
        } else {
          console.error('城市信息无效:', city)
          throw new Error('无法获取有效的城市信息')
        }
      } else {
        console.error('高德地图 API 返回错误:', data)
        throw new Error(data.info || `定位失败: status=${data.status}`)
      }
    } catch (err) {
      console.error('高德地图服务失败详情:', err)
      locationError.value = err instanceof Error ? err.message : '无法获取城市信息，请手动输入城市名称'
      throw err
    }

  } catch (err) {
    if (err instanceof GeolocationPositionError) {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          locationError.value = '定位权限被拒绝，请在浏览器设置中允许定位'
          break
        case err.POSITION_UNAVAILABLE:
          locationError.value = '无法获取位置信息'
          break
        case err.TIMEOUT:
          locationError.value = '定位请求超时'
          break
        default:
          locationError.value = '定位失败'
      }
    } else {
      locationError.value = err instanceof Error ? err.message : '定位失败'
    }
    console.error('定位失败:', err)
  } finally {
    isLocating.value = false
  }
}

// 刷新数据（强制刷新）
const refresh = () => {
  const query = localStorage.getItem(CACHE_QUERY_KEY) || ''
  fetchWeatherData(true, query)
}

// 获取空气质量等级颜色
const getAqiColor = (level: number): string => {
  const colors = ['#00e400', '#ffff00', '#ff7e00', '#ff0000', '#99004c', '#7e0023']
  return colors[level - 1] || '#cccccc'
}

// 获取空气质量等级文字颜色（根据背景色）
const getAqiTextColor = (level: number): string => {
  return level >= 4 ? '#ffffff' : '#000000'
}

// 计算显示信息
const displayInfo = computed(() => {
  if (!weatherData.value) return null

  const { location, weather, air_quality, sunrise } = weatherData.value

  return {
    locationText: `${location.province} ${location.city}`,
    countyText: location.county,
    temperature: weather.temperature,
    condition: weather.condition,
    weatherIcon: weather.weather_icon,
    humidity: weather.humidity,
    windDirection: weather.wind_direction,
    windPower: weather.wind_power,
    aqi: air_quality.aqi,
    aqiQuality: air_quality.quality,
    aqiLevel: air_quality.level,
    aqiColor: getAqiColor(air_quality.level),
    aqiTextColor: getAqiTextColor(air_quality.level),
    sunrise: sunrise.sunrise,
    sunset: sunrise.sunset,
    gradientColors: weather.weather_colors
  }
})

// 组件挂载时获取数据
onMounted(async () => {
  const cachedQuery = localStorage.getItem(CACHE_QUERY_KEY)

  // 如果有缓存的查询城市，使用缓存
  if (cachedQuery && cachedQuery.trim()) {
    searchQuery.value = cachedQuery
    fetchWeatherData(false, cachedQuery)
  } else {
    // 没有缓存，自动使用定位获取天气
    await getLocationWeather()
  }
})
</script>

<template>
  <div class="w-[280px] h-[280px] rounded-xl font-sans flex flex-col overflow-hidden weather-card" :style="{
    padding: '12px',
    background: displayInfo ? `linear-gradient(135deg, ${displayInfo.gradientColors[0]} 0%, ${displayInfo.gradientColors[1]} 100%)` : 'linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%)'
  }">
    <!-- 头部区域 -->
    <div class="flex-shrink-0" style="margin-bottom: 12px">
      <!-- 搜索展开状态 -->
      <div v-if="isSearchExpanded" class="flex items-center" style="gap: 6px">
        <input v-model="searchQuery" @keyup.enter="searchWeather" type="text" placeholder="搜索地区..." ref="searchInput"
          class="flex-1 text-[12px] rounded-md weather-input"
          style="padding: 6px 8px; background: rgba(255, 255, 255, 0.3); color: white; border: 1px solid rgba(255, 255, 255, 0.3); outline: none;" />

        <button @click="searchWeather" :disabled="!searchQuery.trim()" title="搜索"
          class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center select-none hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed weather-btn"
          style="background: rgba(255, 255, 255, 0.3); color: white; border: none; backdrop-filter: blur(10px);">
          <SearchIcon theme="outline" size="18" fill="white" />
        </button>

        <button @click="toggleSearch" title="关闭搜索"
          class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center select-none hover:scale-110 active:scale-95 weather-btn"
          style="background: rgba(255, 255, 255, 0.3); color: white; border: none; backdrop-filter: blur(10px);">
          <CloseIcon theme="outline" size="18" fill="white" />
        </button>
      </div>

      <!-- 正常状态 -->
      <div v-else class="flex items-center justify-between">
        <div class="flex items-center" style="gap: 8px">
          <span class="text-sm font-bold" style="color: white;">
            {{ displayInfo ? `${displayInfo.locationText} ${displayInfo.countyText}` : '🌤️ 实时天气' }}
          </span>
        </div>

        <div class="flex items-center" style="gap: 6px">
          <!-- 搜索按钮 -->
          <button @click="toggleSearch" title="搜索"
            class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center select-none hover:scale-110 active:scale-95 weather-btn"
            style="background: rgba(255, 255, 255, 0.3); color: white; border: none; backdrop-filter: blur(10px);">
            <SearchIcon theme="outline" size="18" fill="white" />
          </button>

          <!-- 定位按钮 -->
          <button @click="getLocationWeather" :disabled="isLocating || loading" title="重新定位"
            class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center select-none hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed weather-btn"
            style="background: rgba(255, 255, 255, 0.3); color: white; border: none; backdrop-filter: blur(10px);">
            <LocationIcon theme="outline" size="18" :class="{ 'animate-pulse': isLocating }" fill="white" />
          </button>

          <!-- 刷新按钮 -->
          <button @click="refresh" :disabled="loading" title="刷新"
            class="w-7 h-7 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center select-none hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed weather-btn"
            style="background: rgba(255, 255, 255, 0.3); color: white; border: none; backdrop-filter: blur(10px);">
            <span :class="{ 'animate-spin': loading }" class="text-base">↻</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden min-h-0 weather-scrollbar"
      style="margin: 0 -4px; padding: 0 4px">
      <!-- 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center h-full text-xs">
        <div class="w-8 h-8 border-3 rounded-full animate-spin"
          style="margin-bottom: 10px; border: 3px solid rgba(255, 255, 255, 0.2); border-top-color: white;"></div>
        <p class="font-medium" style="color: white;">加载中...</p>
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="flex flex-col items-center justify-center h-full text-xs text-center"
        style="padding: 0 10px; color: white;">
        <p class="font-medium" style="margin-bottom: 10px;">{{ error }}</p>
        <button @click="refresh"
          class="text-xs font-medium rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          style="padding: 8px 16px; background: rgba(255, 255, 255, 0.3); color: white; border: none; backdrop-filter: blur(10px);">
          重试
        </button>
      </div>

      <!-- 未加载状态 - 提示用户操作 -->
      <div v-else-if="!weatherData" class="flex flex-col" style="gap: 10px; color: white;">
        <div class="flex flex-col items-center justify-center text-center" style="padding: 20px 10px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🌤️</div>
          <p class="font-medium" style="margin-bottom: 8px; font-size: 13px;">欢迎使用天气小部件</p>
          <p style="opacity: 0.8; margin-bottom: 4px; line-height: 1.5; font-size: 11px;">请搜索城市或使用定位</p>
          <p style="opacity: 0.8; line-height: 1.5; font-size: 11px;">获取实时天气信息</p>
        </div>

        <!-- 定位错误提示 -->
        <div v-if="locationError" class="weather-section"
          style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);">
          <div class="text-[10px]" style="color: rgba(255, 255, 255, 0.9); text-align: center;">
            {{ locationError }}
          </div>
        </div>
      </div>

      <!-- 天气信息 -->
      <div v-else-if="displayInfo" class="flex flex-col" style="gap: 10px; color: white;">
        <!-- 定位错误提示 -->
        <div v-if="locationError" class="weather-section"
          style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);">
          <div class="text-[10px]" style="color: rgba(255, 255, 255, 0.9); text-align: center;">
            {{ locationError }}
          </div>
        </div>

        <!-- 主要天气信息 -->
        <div class="weather-section"
          style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); text-align: center;">
          <div style="margin-bottom: 8px; display: flex; justify-content: center; align-items: center;">
            <img :src="displayInfo.weatherIcon" :alt="displayInfo.condition"
              style="width: 60px; height: 60px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));"
              @error="(e) => (e.target as HTMLImageElement).style.display = 'none'" />
          </div>
          <div class="text-[36px] font-bold leading-none" style="margin-bottom: 6px;">
            {{ displayInfo.temperature }}°C
          </div>
          <div class="text-[14px]" style="opacity: 0.9;">{{ displayInfo.condition }}</div>
        </div>

        <!-- 详细信息 -->
        <div class="grid grid-cols-2" style="gap: 8px;">
          <!-- 湿度 -->
          <div class="weather-info-item">
            <div class="text-[11px]" style="opacity: 0.8; margin-bottom: 4px;">💧 湿度</div>
            <div class="text-[14px] font-bold">{{ displayInfo.humidity }}%</div>
          </div>

          <!-- 风力 -->
          <div class="weather-info-item">
            <div class="text-[11px]" style="opacity: 0.8; margin-bottom: 4px;">💨 风力</div>
            <div class="text-[14px] font-bold">{{ displayInfo.windPower }}</div>
          </div>

          <!-- 日出 -->
          <div class="weather-info-item">
            <div class="text-[11px]" style="opacity: 0.8; margin-bottom: 4px;">🌅 日出</div>
            <div class="text-[14px] font-bold">{{ displayInfo.sunrise }}</div>
          </div>

          <!-- 日落 -->
          <div class="weather-info-item">
            <div class="text-[11px]" style="opacity: 0.8; margin-bottom: 4px;">🌇 日落</div>
            <div class="text-[14px] font-bold">{{ displayInfo.sunset }}</div>
          </div>
        </div>

        <!-- 空气质量 -->
        <div class="weather-section" style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);">
          <div class="text-[13px] font-semibold" style="margin-bottom: 6px;">🌫️ 空气质量</div>
          <div class="flex items-center justify-between">
            <div class="text-[12px]">AQI: {{ displayInfo.aqi }}</div>
            <div class="text-[11px] font-bold rounded-md" :style="{
              padding: '4px 10px',
              background: displayInfo.aqiColor,
              color: displayInfo.aqiTextColor
            }">
              {{ displayInfo.aqiQuality }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 天气卡片样式 */
.weather-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* 天气区块 */
.weather-section {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 天气信息项 */
.weather-info-item {
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.weather-info-item:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 天气按钮悬停效果 */
.weather-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 输入框样式 */
input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus {
  background: rgba(255, 255, 255, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

/* 滚动条样式 */
.weather-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.weather-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
  border-radius: 10px;
}

.weather-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  transition: background 0.2s ease;
}

.weather-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* Firefox 滚动条样式 */
.weather-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
}
</style>