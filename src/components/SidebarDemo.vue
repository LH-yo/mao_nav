<template>
  <div class="sidebar-demo">
    <!-- 方案切换器 -->
    <div class="demo-controls">
      <h1>🚀 侧边栏升级方案演示</h1>
      <div class="scheme-buttons">
        <button
          v-for="scheme in schemes"
          :key="scheme.id"
          @click="currentScheme = scheme.id"
          :class="{ active: currentScheme === scheme.id }"
          class="scheme-btn"
        >
          <span class="scheme-icon">{{ scheme.icon }}</span>
          <span class="scheme-name">{{ scheme.name }}</span>
        </button>
      </div>
      <div class="scheme-description">
        <h3>{{ schemes.find(s => s.id === currentScheme)?.name }}</h3>
        <p>{{ schemes.find(s => s.id === currentScheme)?.description }}</p>
      </div>
    </div>

    <!-- 演示区域 -->
    <div class="demo-preview">
      <div class="preview-container">
        <!-- 方案1：现代卡片式 -->
        <div v-if="currentScheme === 1" class="sidebar sidebar-scheme-1">
          <div class="logo-section">
            <img src="/logo.png" alt="logo" class="logo" />
            <h1 class="site-title">Eckes导航</h1>
          </div>

          <div class="category-search">
            <input type="text" placeholder="🔍 搜索分类..." v-model="searchText" />
          </div>

          <div class="category-cards">
            <div
              v-for="cat in filteredCategories"
              :key="cat.id"
              class="category-card"
              :style="{ background: cat.gradient }"
              @click="selectCategory(cat.id)"
            >
              <div class="card-icon">{{ cat.icon }}</div>
              <div class="card-info">
                <div class="card-name">{{ cat.name }}</div>
                <div class="card-count">{{ cat.count }} 个网站</div>
              </div>
              <div class="card-arrow">→</div>
            </div>
          </div>

          <div class="sidebar-footer-demo">
            <div class="social-links-demo">
              <a href="#" class="social-link">📺</a>
              <a href="#" class="social-link">💬</a>
              <a href="#" class="social-link">📧</a>
              <a href="#" class="social-link">🌐</a>
            </div>
          </div>
        </div>

        <!-- 方案2：侧边抽屉式 -->
        <div v-if="currentScheme === 2" class="sidebar sidebar-scheme-2">
          <div class="logo-section">
            <img src="/logo.png" alt="logo" class="logo" />
            <h1 class="site-title">Eckes导航</h1>
          </div>

          <nav class="drawer-nav">
            <div
              v-for="cat in demoCategories"
              :key="cat.id"
              class="drawer-item"
              :class="{ expanded: expandedCat === cat.id }"
            >
              <div class="drawer-header" @click="toggleCategory(cat.id)">
                <span class="drawer-icon" :class="{ rotate: expandedCat === cat.id }">{{ cat.icon }}</span>
                <span class="drawer-name">{{ cat.name }}</span>
                <span class="drawer-badge" v-if="cat.badge">{{ cat.badge }}</span>
                <span class="drawer-arrow" :class="{ rotate: expandedCat === cat.id }">▼</span>
              </div>
              <Transition name="drawer-expand">
                <div v-if="expandedCat === cat.id" class="drawer-content">
                  <div class="drawer-subitem">子分类 1</div>
                  <div class="drawer-subitem">子分类 2</div>
                  <div class="drawer-subitem">子分类 3</div>
                </div>
              </Transition>
            </div>
          </nav>

          <div class="sidebar-footer-demo">
            <div class="social-links-demo">
              <a href="#" class="social-link">📺</a>
              <a href="#" class="social-link">💬</a>
              <a href="#" class="social-link">📧</a>
              <a href="#" class="social-link">🌐</a>
            </div>
          </div>
        </div>

        <!-- 方案3：极简悬浮式 -->
        <div
          v-if="currentScheme === 3"
          class="sidebar sidebar-scheme-3"
          :class="{ expanded: isHovered }"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <div class="minimal-logo">
            <img src="/logo.png" alt="logo" class="logo-mini" />
          </div>

          <nav class="minimal-nav">
            <div
              v-for="cat in demoCategories"
              :key="cat.id"
              class="minimal-item"
              :title="cat.name"
            >
              <span class="minimal-icon" :style="{ color: cat.color }">{{ cat.icon }}</span>
              <Transition name="fade-slide">
                <span v-if="isHovered" class="minimal-name">{{ cat.name }}</span>
              </Transition>
            </div>
          </nav>

          <div class="minimal-footer">
            <div class="minimal-social">
              <a href="#" class="minimal-link" title="哔哩哔哩">📺</a>
              <a href="#" class="minimal-link" title="QQ">💬</a>
              <a href="#" class="minimal-link" title="邮箱">📧</a>
              <a href="#" class="minimal-link" title="Linux.do">🌐</a>
            </div>
          </div>
        </div>

        <!-- 方案4：双栏式 -->
        <div v-if="currentScheme === 4" class="sidebar sidebar-scheme-4">
          <div class="dual-main">
            <div class="dual-logo">
              <img src="/logo.png" alt="logo" class="logo-small" />
            </div>
            <div
              v-for="cat in demoCategories"
              :key="cat.id"
              class="dual-main-item"
              :class="{ active: selectedCat === cat.id }"
              @click="selectedCat = cat.id"
              :title="cat.name"
            >
              <span class="dual-icon">{{ cat.icon }}</span>
            </div>
            <div class="dual-social">
              <a href="#" class="dual-social-link">📺</a>
              <a href="#" class="dual-social-link">💬</a>
              <a href="#" class="dual-social-link">📧</a>
              <a href="#" class="dual-social-link">🌐</a>
            </div>
          </div>

          <Transition name="slide-left">
            <div v-if="selectedCat" class="dual-sub" :key="selectedCat">
              <div class="dual-sub-header">
                <h3>{{ demoCategories.find(c => c.id === selectedCat)?.name }}</h3>
                <button class="dual-close" @click="selectedCat = null">×</button>
              </div>
              <div class="dual-sub-content">
                <div class="dual-sub-item">
                  <span class="sub-icon">🔥</span>
                  <span class="sub-name">热门网站 1</span>
                  <span class="sub-count">1.2k</span>
                </div>
                <div class="dual-sub-item">
                  <span class="sub-icon">⭐</span>
                  <span class="sub-name">推荐网站 2</span>
                  <span class="sub-count">856</span>
                </div>
                <div class="dual-sub-item">
                  <span class="sub-icon">✨</span>
                  <span class="sub-name">精选网站 3</span>
                  <span class="sub-count">642</span>
                </div>
                <div class="dual-sub-item">
                  <span class="sub-icon">💎</span>
                  <span class="sub-name">优质网站 4</span>
                  <span class="sub-count">523</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- 右侧内容区域（模拟） -->
        <div class="demo-content">
          <div class="demo-content-header">
            <h2>主内容区域</h2>
            <p>这里是网站内容展示区域</p>
          </div>
          <div class="demo-cards">
            <div class="demo-card" v-for="i in 6" :key="i">
              <div class="demo-card-icon">🌐</div>
              <div class="demo-card-title">示例网站 {{ i }}</div>
              <div class="demo-card-desc">这是一个示例网站卡片</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentScheme = ref(1)
const searchText = ref('')
const expandedCat = ref(null)
const isHovered = ref(false)
const selectedCat = ref(null)

const schemes = [
  {
    id: 1,
    name: '方案1：现代卡片式',
    icon: '🎨',
    description: '卡片式设计，带搜索功能，显示网站数量统计，渐变色彩，悬停动画效果'
  },
  {
    id: 2,
    name: '方案2：侧边抽屉式',
    icon: '📂',
    description: '可折叠展开的抽屉式菜单，支持子分类，带标签系统，图标旋转动画'
  },
  {
    id: 3,
    name: '方案3：极简悬浮式',
    icon: '✨',
    description: '超窄侧边栏，默认只显示图标，鼠标悬停展开，毛玻璃效果，彩色图标'
  },
  {
    id: 4,
    name: '方案4：双栏式导航',
    icon: '📊',
    description: '左侧主分类图标，点击后右侧展开详细列表，显示热度统计，动态背景'
  }
]

const demoCategories = [
  { id: 1, name: 'AI智能', icon: '🤖', count: 12, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#667eea', badge: '热门' },
  { id: 2, name: '云服务', icon: '☁️', count: 8, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#f093fb' },
  { id: 3, name: '开发工具', icon: '🛠️', count: 15, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#4facfe', badge: '新增' },
  { id: 4, name: '设计工具', icon: '🎨', count: 10, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: '#43e97b' },
  { id: 5, name: '学习资源', icon: '📚', count: 20, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: '#fa709a' },
  { id: 6, name: '娱乐休闲', icon: '🎮', count: 6, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', color: '#30cfd0' },
  { id: 7, name: '社区论坛', icon: '💬', count: 9, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#a8edea' },
  { id: 8, name: '办公协作', icon: '📋', count: 11, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#ffecd2' }
]

const filteredCategories = computed(() => {
  if (!searchText.value) return demoCategories
  return demoCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const toggleCategory = (id) => {
  expandedCat.value = expandedCat.value === id ? null : id
}

const selectCategory = (id) => {
  console.log('选中分类:', id)
}
</script>

<style scoped>
/* 演示页面基础样式 */
.sidebar-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.demo-controls {
  max-width: 1200px;
  margin: 0 auto 40px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.demo-controls h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.scheme-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.scheme-btn {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
}

.scheme-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
}

.scheme-btn.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.scheme-icon {
  font-size: 24px;
}

.scheme-description {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.scheme-description h3 {
  margin: 0 0 10px 0;
  color: #667eea;
}

.scheme-description p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

/* 预览容器 */
.demo-preview {
  max-width: 1400px;
  margin: 0 auto;
}

.preview-container {
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  min-height: 700px;
}

/* 通用侧边栏样式 */
.sidebar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.logo-section {
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.site-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 方案1：现代卡片式 */
.sidebar-scheme-1 {
  width: 320px;
}

.category-search {
  padding: 20px;
}

.category-search input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.category-search input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.category-cards {
  flex: 1;
  padding: 0 15px 20px;
  overflow-y: auto;
}

.category-card {
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateX(5px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
}

.card-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-count {
  font-size: 12px;
  opacity: 0.9;
}

.card-arrow {
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover .card-arrow {
  opacity: 1;
}

/* 方案2：侧边抽屉式 */
.sidebar-scheme-2 {
  width: 280px;
}

.drawer-nav {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.drawer-item {
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.drawer-header {
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.drawer-header:hover {
  background: #f0f0f0;
}

.drawer-icon {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.drawer-icon.rotate {
  transform: rotate(90deg);
}

.drawer-name {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.drawer-badge {
  padding: 3px 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.drawer-arrow {
  font-size: 12px;
  color: #999;
  transition: transform 0.3s ease;
}

.drawer-arrow.rotate {
  transform: rotate(180deg);
}

.drawer-content {
  padding: 0 15px 15px 50px;
}

.drawer-subitem {
  padding: 8px 12px;
  margin-bottom: 5px;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.drawer-subitem:hover {
  background: #f0f0f0;
  color: #667eea;
  transform: translateX(3px);
}

.drawer-expand-enter-active,
.drawer-expand-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
}

.drawer-expand-enter-from,
.drawer-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* 方案3：极简悬浮式 */
.sidebar-scheme-3 {
  width: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: width 0.3s ease;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.sidebar-scheme-3.expanded {
  width: 240px;
}

.minimal-logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.logo-mini {
  width: 35px;
  height: 35px;
  border-radius: 8px;
}

.minimal-nav {
  flex: 1;
  padding: 15px 0;
  overflow-y: auto;
}

.minimal-item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.minimal-item:hover {
  background: rgba(102, 126, 234, 0.1);
}

.minimal-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: height 0.3s ease;
}

.minimal-item:hover::before {
  height: 60%;
}

.minimal-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.minimal-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.minimal-footer {
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.minimal-social {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.minimal-link {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.minimal-link:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.1);
}

/* 方案4：双栏式 */
.sidebar-scheme-4 {
  width: auto;
  flex-direction: row;
  background: transparent;
}

.dual-main {
  width: 80px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 15px;
}

.dual-logo {
  margin-bottom: 10px;
}

.logo-small {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.dual-main-item {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}

.dual-main-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.dual-main-item.active {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.dual-main-item.active::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid white;
}

.dual-icon {
  font-size: 24px;
}

.dual-main-item.active .dual-icon {
  filter: grayscale(0);
}

.dual-social {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dual-social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.1);
}

.dual-social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.dual-sub {
  width: 280px;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.dual-sub-header {
  padding: 25px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dual-sub-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.dual-close {
  width: 30px;
  height: 30px;
  border: none;
  background: #f0f0f0;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dual-close:hover {
  background: #e0e0e0;
  transform: rotate(90deg);
}

.dual-sub-content {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.dual-sub-item {
  padding: 15px;
  margin-bottom: 10px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dual-sub-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.sub-icon {
  font-size: 20px;
}

.sub-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.sub-count {
  padding: 4px 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 底部社交链接 */
.sidebar-footer-demo {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.social-links-demo {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: white;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 右侧演示内容 */
.demo-content {
  flex: 1;
  padding: 40px;
  background: #f8f9fa;
  overflow-y: auto;
}

.demo-content-header {
  margin-bottom: 30px;
}

.demo-content-header h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
  color: #333;
}

.demo-content-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.demo-card {
  padding: 25px;
  background: white;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.demo-card-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.demo-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.demo-card-desc {
  font-size: 13px;
  color: #999;
}

/* 响应式 */
@media (max-width: 768px) {
  .sidebar-demo {
    padding: 20px 10px;
  }

  .demo-controls {
    padding: 20px;
  }

  .demo-controls h1 {
    font-size: 24px;
  }

  .scheme-buttons {
    grid-template-columns: 1fr;
  }

  .preview-container {
    flex-direction: column;
    min-height: 600px;
  }

  .sidebar {
    width: 100% !important;
    max-height: 400px;
  }

  .sidebar-scheme-3 {
    width: 100% !important;
  }

  .sidebar-scheme-4 {
    flex-direction: column;
  }

  .dual-main {
    width: 100%;
    flex-direction: row;
    padding: 15px;
  }

  .dual-sub {
    width: 100%;
  }

  .demo-content {
    padding: 20px;
  }

  .demo-cards {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}
</style>

