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
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.settings-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.add-button:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

.plus-icon {
  font-size: 16px;
  font-weight: bold;
}

.add-engine-form {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-sizing: border-box;
  max-width: 100%;
}

.add-engine-form h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
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
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.btn-cancel:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.btn-confirm {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}

.btn-confirm:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-confirm:disabled {
  background-color: rgba(59, 130, 246, 0.5);
  cursor: not-allowed;
}

.engine-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.engine-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.engine-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.5);
}

.engine-item:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.engine-item.active {
  background-color: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.engine-info {
  flex: 1;
}

.engine-name {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2px;
  color: #333;
}

.engine-url {
  display: block;
  font-size: 12px;
  color: #666;
  word-break: break-all;
}

.engine-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.btn-edit {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.btn-edit:hover {
  background-color: rgba(245, 158, 11, 0.2);
}

.btn-delete {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-delete:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.empty-custom {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.empty-custom p {
  margin: 0 0 16px 0;
  font-size: 14px;
}

.add-first-button {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.add-first-button:hover {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>