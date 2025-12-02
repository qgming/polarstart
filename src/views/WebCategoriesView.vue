<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 网页分类数据 - 小部件风格
const categories = ref([
  {
    id: 1,
    name: '工作',
    icon: '💼',
    color: 'from-blue-500 to-cyan-500',
    websites: [
      { name: 'Google Workspace', url: 'https://workspace.google.com', icon: '📧' },
      { name: 'Microsoft 365', url: 'https://www.office.com', icon: '📊' },
      { name: 'Notion', url: 'https://www.notion.so', icon: '📝' },
      { name: 'Trello', url: 'https://trello.com', icon: '📋' }
    ]
  },
  {
    id: 2,
    name: '学习',
    icon: '📚',
    color: 'from-purple-500 to-pink-500',
    websites: [
      { name: 'Coursera', url: 'https://www.coursera.org', icon: '🎓' },
      { name: 'edX', url: 'https://www.edx.org', icon: '📖' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org', icon: '✏️' },
      { name: 'Wikipedia', url: 'https://www.wikipedia.org', icon: '🌐' }
    ]
  },
  {
    id: 3,
    name: '娱乐',
    icon: '🎮',
    color: 'from-red-500 to-orange-500',
    websites: [
      { name: 'Netflix', url: 'https://www.netflix.com', icon: '🎬' },
      { name: 'YouTube', url: 'https://www.youtube.com', icon: '📺' },
      { name: 'Spotify', url: 'https://www.spotify.com', icon: '🎵' },
      { name: 'Twitch', url: 'https://www.twitch.tv', icon: '🎮' }
    ]
  },
  {
    id: 4,
    name: '工具',
    icon: '🔧',
    color: 'from-green-500 to-emerald-500',
    websites: [
      { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
      { name: 'Figma', url: 'https://www.figma.com', icon: '🎨' },
      { name: 'Canva', url: 'https://www.canva.com', icon: '🖼️' },
      { name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' }
    ]
  },
  {
    id: 5,
    name: '社交',
    icon: '💬',
    color: 'from-indigo-500 to-purple-500',
    websites: [
      { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼' },
      { name: 'Instagram', url: 'https://www.instagram.com', icon: '📷' },
      { name: 'Discord', url: 'https://discord.com', icon: '💬' }
    ]
  },
  {
    id: 6,
    name: '购物',
    icon: '🛍️',
    color: 'from-yellow-500 to-orange-500',
    websites: [
      { name: 'Amazon', url: 'https://www.amazon.com', icon: '📦' },
      { name: 'eBay', url: 'https://www.ebay.com', icon: '🏷️' },
      { name: 'Taobao', url: 'https://www.taobao.com', icon: '🛒' },
      { name: 'JD', url: 'https://www.jd.com', icon: '🛍️' }
    ]
  }
])

const router = useRouter()

// 返回主页
const goBackHome = () => {
  router.push('/')
}

// 打开网站
const openWebsite = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black p-6 md:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- 顶部导航栏 -->
      <div class="flex items-center justify-between mb-8 animate-fade-in">
        <button @click="goBackHome" class="back-button group">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <h1 class="text-2xl font-bold text-white">网页分类</h1>

        <button class="add-button">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <!-- 分类小部件网格 -->
      <div class="categories-grid">
        <div v-for="(category, index) in categories" :key="category.id" class="category-widget"
          :style="{ animationDelay: `${index * 0.08}s` }">

          <!-- 分类头部 -->
          <div class="category-header">
            <div class="category-icon-wrapper" :class="`bg-gradient-to-br ${category.color}`">
              <span class="category-icon">{{ category.icon }}</span>
            </div>
            <h3 class="category-name">{{ category.name }}</h3>
          </div>

          <!-- 网站链接列表 -->
          <div class="websites-list">
            <button v-for="(website, wIndex) in category.websites" :key="wIndex" class="website-item"
              @click="openWebsite(website.url)">
              <span class="website-icon">{{ website.icon }}</span>
              <span class="website-name">{{ website.name }}</span>
              <svg class="website-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 顶部按钮样式 */
.back-button,
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover,
.add-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(0, 240, 255, 0.5);
  transform: scale(1.05);
}

.back-button:active,
.add-button:active {
  transform: scale(0.95);
}

/* 分类网格布局 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* 分类小部件 */
.category-widget {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: fadeIn 0.5s ease-out backwards;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.category-widget::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(176, 0, 255, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-widget:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(0, 240, 255, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 240, 255, 0.2),
    0 0 0 1px rgba(0, 240, 255, 0.1) inset;
}

.category-widget:hover::before {
  opacity: 1;
}

/* 分类头部 */
.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.category-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.category-widget:hover .category-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.category-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.category-name {
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
}

/* 网站列表 */
.websites-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 1;
}

/* 网站项 */
.website-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.website-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.website-item:hover::before {
  transform: translateX(100%);
}

.website-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 240, 255, 0.15);
}

.website-item:active {
  transform: translateX(2px) scale(0.98);
}

.website-icon {
  font-size: 20px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.website-name {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.2s ease;
}

.website-item:hover .website-name {
  color: rgba(0, 240, 255, 0.95);
}

.website-arrow {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.website-item:hover .website-arrow {
  color: rgba(0, 240, 255, 0.9);
  transform: translateX(4px);
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .category-widget {
    padding: 20px;
    border-radius: 20px;
  }

  .category-icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .category-icon {
    font-size: 22px;
  }

  .category-name {
    font-size: 18px;
  }

  .website-item {
    padding: 10px 12px;
    border-radius: 12px;
  }

  .website-icon {
    font-size: 18px;
  }

  .website-name {
    font-size: 14px;
  }
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>