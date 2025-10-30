<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="settings-modal-overlay" @click="close">
        <div class="settings-modal" @click.stop>
          <!-- 头部 -->
          <div class="modal-header">
            <h2>⚙️ 设置</h2>
            <button @click="close" class="close-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- 标签页 -->
          <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-btn"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <span class="tab-icon">{{ tab.icon }}</span>
              <span>{{ tab.name }}</span>
            </button>
          </div>

          <!-- 内容区域 -->
          <div class="modal-content">
            <div v-show="activeTab === 'theme'" class="tab-content">
              <ThemeCustomizer />
            </div>
            
            <div v-show="activeTab === 'bookmark'" class="tab-content">
              <BookmarkManager :categories="categories" @import-data="handleImportData" />
            </div>
            
            <div v-show="activeTab === 'pwa'" class="tab-content">
              <PWASettings />
            </div>
            
            <div v-show="activeTab === 'about'" class="tab-content">
              <AboutSection />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import ThemeCustomizer from './ThemeCustomizer.vue'
import BookmarkManager from './BookmarkManager.vue'
import PWASettings from './PWASettings.vue'
import AboutSection from './AboutSection.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'import-data'])

const activeTab = ref('theme')

const tabs = [
  { id: 'theme', name: '主题定制', icon: '🎨' },
  { id: 'bookmark', name: '书签管理', icon: '📚' },
  { id: 'pwa', name: 'PWA设置', icon: '📱' },
  { id: 'about', name: '关于', icon: 'ℹ️' }
]

const close = () => {
  emit('close')
}

const handleImportData = (data) => {
  emit('import-data', data)
}
</script>

<style scoped>
.settings-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.settings-modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 24px;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 16px 24px 0;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #6b7280;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #3b82f6;
  background: #f9fafb;
  border-radius: 8px 8px 0 0;
}

.tab-btn.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-icon {
  font-size: 18px;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 模态框过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .settings-modal,
.modal-leave-active .settings-modal {
  transition: transform 0.3s ease;
}

.modal-enter-from .settings-modal,
.modal-leave-to .settings-modal {
  transform: scale(0.9);
}

/* 暗色模式 */
:deep(.dark) .settings-modal {
  background: #0f172a;
}

:deep(.dark) .modal-header {
  border-bottom-color: #334155;
}

:deep(.dark) .modal-header h2 {
  color: #e2e8f0;
}

:deep(.dark) .close-btn {
  color: #94a3b8;
}

:deep(.dark) .close-btn:hover {
  background: #1e293b;
  color: #e2e8f0;
}

:deep(.dark) .tabs {
  border-bottom-color: #334155;
}

:deep(.dark) .tab-btn {
  color: #94a3b8;
}

:deep(.dark) .tab-btn:hover {
  color: #3b82f6;
  background: #1e293b;
}

:deep(.dark) .tab-btn.active {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .settings-modal {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .tabs {
    padding: 12px 16px 0;
  }
  
  .tab-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .modal-content {
    padding: 16px;
  }
}
</style>

