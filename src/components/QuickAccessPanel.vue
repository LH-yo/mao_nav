<template>
  <div class="quick-access-panel">
    <!-- 最近访问 -->
    <div v-if="recentVisits.length > 0" class="quick-section">
      <div class="section-header">
        <div class="header-left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <h3>最近访问</h3>
          <span class="count">{{ recentVisits.length }}</span>
        </div>
        <button v-if="recentVisits.length > 0" @click="clearRecent" class="clear-btn" title="清除历史">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="quick-grid">
        <a
          v-for="site in recentVisits.slice(0, 8)"
          :key="site.id"
          :href="site.url"
          target="_blank"
          rel="noopener noreferrer"
          class="quick-card"
          @click="handleClick(site)"
        >
          <img :src="site.icon" :alt="site.name" @error="handleImageError" />
          <span class="site-name">{{ site.name }}</span>
        </a>
      </div>
    </div>

    <!-- 热门网站 -->
    <div v-if="popularSites.length > 0" class="quick-section">
      <div class="section-header">
        <div class="header-left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <h3>热门网站</h3>
          <span class="count">{{ popularSites.length }}</span>
        </div>
      </div>
      <div class="popular-list">
        <a
          v-for="(site, index) in popularSites.slice(0, 5)"
          :key="site.id"
          :href="site.url"
          target="_blank"
          rel="noopener noreferrer"
          class="popular-item"
          @click="handleClick(site)"
        >
          <div class="rank" :class="`rank-${index + 1}`">{{ index + 1 }}</div>
          <img :src="site.icon" :alt="site.name" @error="handleImageError" />
          <div class="popular-info">
            <div class="popular-name">{{ site.name }}</div>
            <div class="popular-meta">
              <span class="category-tag">{{ site.categoryName }}</span>
              <span class="visit-count">{{ site.visits }} 次访问</span>
            </div>
          </div>
          <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- 分类统计 -->
    <div v-if="categoryStats.length > 0" class="quick-section">
      <div class="section-header">
        <div class="header-left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          <h3>分类统计</h3>
        </div>
      </div>
      <div class="category-stats">
        <div
          v-for="cat in categoryStats.slice(0, 6)"
          :key="cat.id"
          class="stat-item"
        >
          <div class="stat-icon">{{ cat.icon }}</div>
          <div class="stat-info">
            <div class="stat-name">{{ cat.name }}</div>
            <div class="stat-meta">
              <span>{{ cat.siteCount }} 个网站</span>
              <span v-if="cat.visits > 0">{{ cat.visits }} 次访问</span>
            </div>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-fill" :style="{ width: getPercentage(cat.visits) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getRecentVisits, getPopularSites, getCategoryStats, recordVisit, clearStats } from '../utils/statistics'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['record-visit'])

// 最近访问
const recentVisits = computed(() => {
  return getRecentVisits()
})

// 热门网站
const popularSites = computed(() => {
  return getPopularSites(props.categories, 5)
})

// 分类统计
const categoryStats = computed(() => {
  return getCategoryStats(props.categories)
})

// 计算百分比
const getPercentage = (visits) => {
  const maxVisits = Math.max(...categoryStats.value.map(c => c.visits), 1)
  return (visits / maxVisits) * 100
}

// 处理点击
const handleClick = (site) => {
  recordVisit(site)
  emit('record-visit', site)
}

// 清除最近访问
const clearRecent = () => {
  if (confirm('确定要清除所有访问历史吗？')) {
    clearStats()
    window.location.reload()
  }
}

// 图片错误处理
const handleImageError = (event) => {
  event.target.src = '/favicon.ico'
}
</script>

<style scoped>
.quick-access-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 30px;
}

.quick-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-left svg {
  color: #3b82f6;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.count {
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.clear-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #f3f4f6;
  color: #ef4444;
}

/* 快速访问网格 */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.quick-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  background: #f9fafb;
  transition: all 0.2s;
}

.quick-card:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quick-card img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.site-name {
  font-size: 13px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

/* 热门网站列表 */
.popular-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popular-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  background: #f9fafb;
  transition: all 0.2s;
}

.popular-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.rank {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.rank-1 {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
}

.rank-2 {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  color: white;
}

.rank-3 {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  color: white;
}

.rank-4,
.rank-5 {
  background: #e5e7eb;
  color: #6b7280;
}

.popular-item img {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.popular-info {
  flex: 1;
  min-width: 0;
}

.popular-name {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popular-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.category-tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 2px 6px;
  border-radius: 4px;
}

.visit-count {
  color: #6b7280;
}

.arrow-icon {
  color: #9ca3af;
  flex-shrink: 0;
}

/* 分类统计 */
.category-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
  min-width: 0;
}

.stat-name {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
}

.stat-bar {
  width: 80px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
}

.stat-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 暗色模式 */
:deep(.dark) .quick-section {
  background: #1e293b;
}

:deep(.dark) .section-header h3 {
  color: #e2e8f0;
}

:deep(.dark) .quick-card {
  background: #334155;
  color: #e2e8f0;
}

:deep(.dark) .quick-card:hover {
  background: #475569;
}

:deep(.dark) .popular-item {
  background: #334155;
  color: #e2e8f0;
}

:deep(.dark) .popular-item:hover {
  background: #475569;
}

:deep(.dark) .popular-name {
  color: #e2e8f0;
}

:deep(.dark) .stat-icon {
  background: #334155;
}

:deep(.dark) .stat-name {
  color: #e2e8f0;
}

:deep(.dark) .stat-bar {
  background: #334155;
}

@media (max-width: 768px) {
  .quick-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .quick-card {
    padding: 12px 8px;
  }
  
  .quick-card img {
    width: 32px;
    height: 32px;
  }
  
  .site-name {
    font-size: 12px;
  }
}
</style>

