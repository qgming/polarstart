<template>
  <div class="search-engine-settings">
    <div class="settings-header">
      <h3>搜索引擎设置</h3>
      <button class="add-button" @click="showAddForm = true">
        <span class="plus-icon">+</span>
        添加
      </button>
    </div>

    <!-- 添加/编辑表单 -->
    <div v-if="showAddForm || editingEngine" class="add-engine-form">
      <h4>{{ editingEngine ? '编辑搜索引擎' : '添加搜索引擎' }}</h4>
      <div class="form-group">
        <label>名称</label>
        <input v-model="formData.name" type="text" placeholder="例如：百度" maxlength="20" />
      </div>
      <div class="form-group">
        <label>搜索URL</label>
        <input v-model="formData.url" type="text" placeholder="例如：https://www.baidu.com/s?wd=" />
        <small class="help-text">在搜索词位置使用 %s 或直接在末尾添加参数</small>
      </div>
      <div class="form-actions">
        <button class="btn-cancel" @click="cancelForm">取消</button>
        <button class="btn-confirm" @click="saveEngine" :disabled="!isFormValid">
          {{ editingEngine ? '更新' : '添加' }}
        </button>
      </div>
    </div>
    <!-- 搜索引擎列表 -->
    <div class="engine-list">
      <div class="engine-section">
        <h4>预设搜索引擎</h4>
        <div v-for="engine in settingsStore.availableSearchEngines" :key="engine.name" class="engine-item"
          :class="{ active: engine.name === settingsStore.searchEngine.name }" @click="selectEngine(engine)">
          <div class="engine-info">
            <span class="engine-name">{{ engine.name }}</span>
            <span class="engine-url">{{ engine.url }}</span>
          </div>
        </div>
      </div>

      <div class="engine-section" v-if="settingsStore.customSearchEngines.length > 0">
        <h4>自定义搜索引擎</h4>
        <div v-for="engine in settingsStore.customSearchEngines" :key="engine.name" class="engine-item"
          :class="{ active: engine.name === settingsStore.searchEngine.name }">
          <div class="engine-info" @click="selectEngine(engine)">
            <span class="engine-name">{{ engine.name }}</span>
            <span class="engine-url">{{ engine.url }}</span>
          </div>
          <div class="engine-actions">
            <button class="btn-edit" @click.stop="editEngine(engine)">编辑</button>
            <button class="btn-delete" @click.stop="deleteEngine(engine.name)">删除</button>
          </div>
        </div>
      </div>

      <div v-if="settingsStore.customSearchEngines.length === 0 && !showAddForm && !editingEngine" class="empty-custom">
        <p>暂无自定义搜索引擎</p>
        <button class="add-first-button" @click="showAddForm = true">
          添加第一个自定义搜索引擎
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingsStore, type SearchEngine } from '@/stores/settings'

const settingsStore = useSettingsStore()
const emit = defineEmits<{
  close: []
}>()

const showAddForm = ref(false)
const editingEngine = ref<SearchEngine | null>(null)
const formData = ref({
  name: '',
  url: ''
})

const isFormValid = computed(() => {
  return formData.value.name.trim() &&
    formData.value.url.trim() &&
    isValidUrl(formData.value.url)
})

const isValidUrl = (url: string): boolean => {
  try {
    const testUrl = url.replace('%s', 'test')
    new URL(testUrl)
    return true
  } catch {
    return false
  }
}

const selectEngine = (engine: SearchEngine) => {
  settingsStore.setSearchEngine(engine)
  emit('close')
}

const saveEngine = () => {
  const engine: SearchEngine = {
    name: formData.value.name.trim(),
    url: formData.value.url.trim()
  }

  if (editingEngine.value) {
    settingsStore.updateCustomSearchEngine(editingEngine.value.name, engine)
  } else {
    const success = settingsStore.addCustomSearchEngine(engine)
    if (!success) {
      alert('搜索引擎名称或URL已存在！')
      return
    }
  }

  cancelForm()
}

const editEngine = (engine: SearchEngine) => {
  editingEngine.value = engine
  formData.value = { ...engine }
  showAddForm.value = false
}

const deleteEngine = (engineName: string) => {
  if (confirm(`确定要删除搜索引擎 "${engineName}" 吗？`)) {
    settingsStore.removeCustomSearchEngine(engineName)
  }
}

const cancelForm = () => {
  showAddForm.value = false
  editingEngine.value = null
  formData.value = { name: '', url: '' }
}
</script>

<style scoped>
.search-engine-settings {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.settings-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.add-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.15) 0%,
      rgba(139, 92, 246, 0.15) 100%);
  backdrop-filter: blur(10px);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.add-button:hover {
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.25) 0%,
      rgba(139, 92, 246, 0.25) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.plus-icon {
  font-size: 16px;
  font-weight: bold;
}

.add-engine-form {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-sizing: border-box;
  max-width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05),
    0 0 1px rgba(255, 255, 255, 0.5) inset;
}

.add-engine-form h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  color: #1a1a1a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.help-text {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.form-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
}

.btn-cancel,
.btn-confirm,
.btn-edit,
.btn-delete {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.5);
  color: #666;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-confirm {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-confirm:disabled {
  background: rgba(59, 130, 246, 0.4);
  cursor: not-allowed;
  opacity: 0.6;
}

.engine-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.engine-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.engine-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.engine-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-radius: 14px;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.3) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.engine-item:hover {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.4) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.engine-item.active {
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.25) 0%,
      rgba(139, 92, 246, 0.25) 100%);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2),
    0 0 1px rgba(255, 255, 255, 0.5) inset;
}

.engine-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.engine-name {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.engine-url {
  display: block;
  font-size: 13px;
  color: #666;
  word-break: break-all;
  line-height: 1.4;
}

.engine-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.btn-edit {
  background: rgba(245, 158, 11, 0.15);
  backdrop-filter: blur(10px);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.1);
}

.btn-edit:hover {
  background: rgba(245, 158, 11, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.btn-delete {
  background: rgba(239, 68, 68, 0.15);
  backdrop-filter: blur(10px);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.1);
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.empty-custom {
  text-align: center;
  padding: 48px 20px;
  color: #666;
}

.empty-custom p {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #888;
}

.add-first-button {
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.15) 0%,
      rgba(139, 92, 246, 0.15) 100%);
  backdrop-filter: blur(10px);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.add-first-button:hover {
  background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.25) 0%,
      rgba(139, 92, 246, 0.25) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}
</style>