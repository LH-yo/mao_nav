<template>
  <Teleport to="body">
    <Transition name="search-modal">
      <div v-if="isOpen" class="search-modal-overlay" @click="close">
        <div class="search-modal" @click.stop>
          <div class="search-header">
            <div class="search-input-wrapper">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="搜索网站... (支持名称、描述、URL)"
                class="search-input"
                @keydown.down.prevent="navigateDown"
                @keydown.up.prevent="navigateUp"
                @keydown.enter.prevent="openSelected"
                @keydown.esc="close"
              />
              <kbd class="search-shortcut">ESC</kbd>
            </div>
          </div>

          <div class="search-body">
            <!-- 搜索结果 -->
            <div v-if="searchQuery && filteredSites.length > 0" class="search-results">
              <div class="results-header">
                <span class="results-count">找到 {{ filteredSites.length }} 个结果</span>
              </div>
              <div class="results-list">
                <a
                  v-for="(item, index) in filteredSites"
                  :key="item.site.id"
                  :href="item.site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="result-item"
                  :class="{ active: selectedIndex === index }"
                  @mouseenter="selectedIndex = index"
                  @click="recordClick(item.site)"
                >
                  <img :src="item.site.icon" :alt="item.site.name" class="result-icon" @error="handleImageError" />
                  <div class="result-content">
                    <div class="result-title" v-html="highlightText(item.site.name)"></div>
                    <div class="result-description">
                      <span class="result-category">{{ item.categoryName }}</span>
                      <span v-if="item.site.description" class="result-desc" v-html="highlightText(item.site.description)"></span>
                    </div>
                  </div>
                  <svg class="result-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- 无结果 -->
            <div v-else-if="searchQuery && filteredSites.length === 0" class="no-results">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p>未找到相关网站</p>
              <span>试试其他关键词</span>
            </div>

            <!-- 默认显示：最近访问 + 热门网站 -->
            <div v-else class="search-default">
              <!-- 最近访问 -->
              <div v-if="recentVisits.length > 0" class="search-section">
                <div class="section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span>最近访问</span>
                </div>
                <div class="quick-links">
                  <a
                    v-for="visit in recentVisits.slice(0, 6)"
                    :key="visit.id"
                    :href="visit.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="quick-link"
                    @click="recordClick(visit)"
                  >
                    <img :src="visit.icon" :alt="visit.name" @error="handleImageError" />
                    <span>{{ visit.name }}</span>
                  </a>
                </div>
              </div>

              <!-- 热门网站 -->
              <div v-if="popularSites.length > 0" class="search-section">
                <div class="section-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <span>热门网站</span>
                </div>
                <div class="quick-links">
                  <a
                    v-for="site in popularSites.slice(0, 6)"
                    :key="site.id"
                    :href="site.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="quick-link"
                    @click="recordClick(site)"
                  >
                    <img :src="site.icon" :alt="site.name" @error="handleImageError" />
                    <span>{{ site.name }}</span>
                    <span class="visit-count">{{ site.visits }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="search-footer">
            <div class="search-tips">
              <kbd>↑</kbd><kbd>↓</kbd> 导航
              <kbd>Enter</kbd> 打开
              <kbd>ESC</kbd> 关闭
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

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

const emit = defineEmits(['close', 'record-visit'])

const searchInput = ref(null)
const searchQuery = ref('')
const selectedIndex = ref(0)

// 搜索过滤
const filteredSites = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase()
  const results = []
  
  props.categories.forEach(category => {
    category.sites?.forEach(site => {
      const matchName = site.name?.toLowerCase().includes(query)
      const matchDesc = site.description?.toLowerCase().includes(query)
      const matchUrl = site.url?.toLowerCase().includes(query)
      
      if (matchName || matchDesc || matchUrl) {
        results.push({
          site,
          categoryName: category.name,
          categoryIcon: category.icon
        })
      }
    })
  })
  
  return results
})

// 最近访问（从 localStorage 读取）
const recentVisits = computed(() => {
  try {
    const visits = JSON.parse(localStorage.getItem('recent_visits') || '[]')
    return visits.slice(0, 6)
  } catch {
    return []
  }
})

// 热门网站（从统计数据读取）
const popularSites = computed(() => {
  try {
    const stats = JSON.parse(localStorage.getItem('site_stats') || '{}')
    const sites = []
    
    props.categories.forEach(category => {
      category.sites?.forEach(site => {
        const visits = stats[site.id] || 0
        if (visits > 0) {
          sites.push({ ...site, visits })
        }
      })
    })
    
    return sites.sort((a, b) => b.visits - a.visits).slice(0, 6)
  } catch {
    return []
  }
})

// 高亮匹配文本
const highlightText = (text) => {
  if (!searchQuery.value || !text) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// 键盘导航
const navigateDown = () => {
  if (selectedIndex.value < filteredSites.value.length - 1) {
    selectedIndex.value++
  }
}

const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const openSelected = () => {
  if (filteredSites.value[selectedIndex.value]) {
    const item = filteredSites.value[selectedIndex.value]
    recordClick(item.site)
    window.open(item.site.url, '_blank')
    close()
  }
}

// 记录点击
const recordClick = (site) => {
  emit('record-visit', site)
}

// 图片错误处理
const handleImageError = (event) => {
  event.target.src = '/favicon.ico'
}

// 关闭搜索
const close = () => {
  emit('close')
  searchQuery.value = ''
  selectedIndex.value = 0
}

// 监听打开状态
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// 快捷键监听
const handleKeydown = (e) => {
  // Ctrl/Cmd + K 打开搜索
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    if (!props.isOpen) {
      emit('close') // 实际上是触发打开
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* 模态框动画 */
.search-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  overflow-y: auto;
}

.search-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 640px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 搜索头部 */
.search-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.search-icon {
  color: #9ca3af;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1f2937;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-shortcut {
  padding: 4px 8px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 12px;
  color: #6b7280;
  font-family: monospace;
}

/* 搜索主体 */
.search-body {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
}

/* 搜索结果 */
.search-results {
  padding: 12px;
}

.results-header {
  padding: 8px 12px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.result-item:hover,
.result-item.active {
  background: #f3f4f6;
}

.result-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.result-title :deep(mark) {
  background: #fef3c7;
  color: #92400e;
  padding: 0 2px;
  border-radius: 2px;
}

.result-description {
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-category {
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  flex-shrink: 0;
}

.result-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-desc :deep(mark) {
  background: #fef3c7;
  color: #92400e;
}

.result-arrow {
  color: #9ca3af;
  flex-shrink: 0;
}

/* 无结果 */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9ca3af;
}

.no-results svg {
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-results p {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #6b7280;
}

.no-results span {
  font-size: 14px;
}

/* 默认显示 */
.search-default {
  padding: 12px;
}

.search-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.section-header svg {
  color: #6b7280;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  background: #f9fafb;
  transition: all 0.2s;
  font-size: 14px;
}

.quick-link:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.quick-link img {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.quick-link span:first-of-type {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visit-count {
  font-size: 11px;
  color: #9ca3af;
  background: white;
  padding: 2px 6px;
  border-radius: 4px;
}

/* 搜索底部 */
.search-footer {
  padding: 12px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.search-tips {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #6b7280;
}

.search-tips kbd {
  padding: 4px 6px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 动画 */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}

.search-modal-enter-active .search-modal,
.search-modal-leave-active .search-modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

.search-modal-enter-from .search-modal,
.search-modal-leave-to .search-modal {
  transform: scale(0.95);
  opacity: 0;
}

/* 暗色模式 */
:deep(.dark) .search-modal {
  background: #1e293b;
  color: #e2e8f0;
}

:deep(.dark) .search-header {
  border-bottom-color: #334155;
}

:deep(.dark) .search-input {
  color: #e2e8f0;
}

:deep(.dark) .search-input::placeholder {
  color: #64748b;
}

:deep(.dark) .search-shortcut {
  background: #334155;
  border-color: #475569;
  color: #94a3b8;
}

:deep(.dark) .result-item:hover,
:deep(.dark) .result-item.active {
  background: #334155;
}

:deep(.dark) .result-title {
  color: #e2e8f0;
}

:deep(.dark) .result-description {
  color: #94a3b8;
}

:deep(.dark) .quick-link {
  background: #334155;
  color: #e2e8f0;
}

:deep(.dark) .quick-link:hover {
  background: #475569;
}

:deep(.dark) .search-footer {
  background: #0f172a;
  border-top-color: #334155;
}

:deep(.dark) .search-tips {
  color: #94a3b8;
}

:deep(.dark) .search-tips kbd {
  background: #334155;
  border-color: #475569;
}

@media (max-width: 768px) {
  .search-modal-overlay {
    padding-top: 5vh;
  }
  
  .search-modal {
    width: 95%;
    max-height: 85vh;
  }
  
  .quick-links {
    grid-template-columns: 1fr;
  }
}
</style>

