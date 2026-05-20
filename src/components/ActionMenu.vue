<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Check, ChevronDown } from '@lucide/vue'

export type ActionMenuOption = {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: ActionMenuOption[]
  ariaLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue) ?? props.options[0]
})

const close = () => {
  open.value = false
}

const toggle = () => {
  open.value = !open.value
}

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  close()
}

const handlePointerDown = (event: PointerEvent) => {
  if (!open.value || !root.value) return
  if (event.target instanceof Node && !root.value.contains(event.target)) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('pointerdown', handlePointerDown)
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div ref="root" class="action-menu" :class="{ open }">
    <button
      class="action-menu-trigger"
      type="button"
      :aria-label="ariaLabel ?? '打开菜单'"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
    >
      <span class="action-menu-label">{{ selectedOption.label }}</span>
      <ChevronDown class="action-menu-chevron" :size="15" :stroke-width="2.4" aria-hidden="true" />
    </button>

    <transition name="menu-fade">
      <div v-if="open" class="action-menu-content" role="menu">
        <button
          v-for="option in options"
          :key="option.value"
          class="action-menu-item"
          :class="{ selected: option.value === modelValue }"
          type="button"
          role="menuitemradio"
          :aria-checked="option.value === modelValue"
          @click="selectOption(option.value)"
        >
          <span>{{ option.label }}</span>
          <Check v-if="option.value === modelValue" :size="16" :stroke-width="2.5" />
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.action-menu {
  position: relative;
  width: max-content;
}

.action-menu-trigger,
.action-menu-item {
  border: 0;
  font: inherit;
}

.action-menu-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: auto;
  min-width: 0;
  height: 46px;
  padding: 0 12px 0 14px;
  border-radius: 14px;
  color: rgba(246, 250, 255, 0.92);
  background: rgba(255, 255, 255, 0.09);
  border: 0;
  cursor: pointer;
  transition: background 180ms ease, transform 180ms ease;
}

.action-menu-trigger:hover,
.action-menu.open .action-menu-trigger {
  background: rgba(255, 255, 255, 0.13);
}

.action-menu-trigger:active {
  transform: scale(0.98);
}

.action-menu-label {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 750;
}

.action-menu-chevron {
  flex: none;
  color: rgba(232, 242, 255, 0.58);
  transition: transform 180ms ease;
}

.action-menu.open .action-menu-chevron {
  transform: rotate(180deg);
}

.action-menu-content {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 20;
  min-width: 176px;
  padding: 8px;
  border-radius: 16px;
  background: rgba(8, 14, 24, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 22px 64px rgba(4, 9, 18, 0.46);
  backdrop-filter: blur(22px);
}

.action-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  height: 38px;
  padding: 0 10px;
  border-radius: 10px;
  color: rgba(234, 243, 255, 0.84);
  background: transparent;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}

.action-menu-item:hover,
.action-menu-item.selected {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 640px) {
  .action-menu-trigger {
    height: 44px;
    padding: 0 12px;
    border-radius: 12px;
  }

  .action-menu-label {
    font-size: 13px;
  }

  .action-menu-content {
    min-width: 156px;
    border-radius: 14px;
  }
}
</style>
