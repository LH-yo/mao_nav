<template>
  <div class="pwa-settings">
    <div class="settings-header">
      <h2>📱 PWA 设置</h2>
      <p>将网站安装到桌面，像原生应用一样使用</p>
    </div>

    <div class="settings-sections">
      <!-- 安装状态 -->
      <div class="section">
        <h3>安装状态</h3>
        <div class="status-card" :class="installStatus.class">
          <div class="status-icon">{{ installStatus.icon }}</div>
          <div class="status-info">
            <div class="status-title">{{ installStatus.title }}</div>
            <div class="status-desc">{{ installStatus.description }}</div>
          </div>
          <button
            v-if="canInstall"
            @click="installPWA"
            class="install-btn"
          >
            立即安装
          </button>
        </div>
      </div>

      <!-- 离线功能 -->
      <div class="section">
        <h3>离线功能</h3>
        <div class="feature-list">
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <div>
              <div class="feature-title">离线访问</div>
              <div class="feature-desc">无网络时也能浏览已缓存的内容</div>
            </div>
          </div>
          
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <div>
              <div class="feature-title">快速加载</div>
              <div class="feature-desc">缓存资源，提升加载速度</div>
            </div>
          </div>
          
          <div class="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <div>
              <div class="feature-title">独立窗口</div>
              <div class="feature-desc">在独立窗口中运行，无浏览器界面</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 缓存管理 -->
      <div class="section">
        <h3>缓存管理</h3>
        <div class="cache-info">
          <div class="cache-item">
            <span>缓存状态</span>
            <span class="cache-value">{{ cacheStatus }}</span>
          </div>
          <div class="cache-item">
            <span>Service Worker</span>
            <span class="cache-value">{{ swStatus }}</span>
          </div>
        </div>
        <button @click="clearCache" class="clear-cache-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          清除缓存
        </button>
      </div>

      <!-- 安装指南 -->
      <div class="section">
        <h3>安装指南</h3>
        <div class="guide-tabs">
          <button
            v-for="platform in platforms"
            :key="platform.id"
            class="guide-tab"
            :class="{ active: activePlatform === platform.id }"
            @click="activePlatform = platform.id"
          >
            {{ platform.name }}
          </button>
        </div>
        <div class="guide-content">
          <ol>
            <li v-for="(step, index) in currentGuide" :key="index">
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const canInstall = ref(false)
const deferredPrompt = ref(null)
const isInstalled = ref(false)
const cacheStatus = ref('检查中...')
const swStatus = ref('检查中...')
const activePlatform = ref('chrome')

const platforms = [
  { id: 'chrome', name: 'Chrome' },
  { id: 'edge', name: 'Edge' },
  { id: 'safari', name: 'Safari' },
  { id: 'android', name: 'Android' },
  { id: 'ios', name: 'iOS' }
]

const guides = {
  chrome: [
    '点击地址栏右侧的"安装"图标',
    '或点击浏览器菜单 → 更多工具 → 创建快捷方式',
    '勾选"在窗口中打开"',
    '点击"创建"完成安装'
  ],
  edge: [
    '点击地址栏右侧的"应用可用"图标',
    '或点击浏览器菜单 → 应用 → 安装此站点为应用',
    '点击"安装"完成'
  ],
  safari: [
    '点击分享按钮（方框带向上箭头）',
    '向下滚动找到"添加到主屏幕"',
    '点击"添加"完成安装'
  ],
  android: [
    '点击浏览器菜单（三个点）',
    '选择"添加到主屏幕"或"安装应用"',
    '点击"安装"或"添加"',
    '应用图标将出现在主屏幕上'
  ],
  ios: [
    '使用 Safari 浏览器打开网站',
    '点击底部分享按钮',
    '向下滚动找到"添加到主屏幕"',
    '点击"添加"完成安装'
  ]
}

const currentGuide = computed(() => guides[activePlatform.value])

const installStatus = computed(() => {
  if (isInstalled.value) {
    return {
      icon: '✅',
      title: '已安装',
      description: '应用已成功安装到您的设备',
      class: 'installed'
    }
  } else if (canInstall.value) {
    return {
      icon: '📥',
      title: '可以安装',
      description: '点击按钮将应用安装到桌面',
      class: 'can-install'
    }
  } else {
    return {
      icon: 'ℹ️',
      title: '暂不可安装',
      description: '请使用支持 PWA 的浏览器访问',
      class: 'not-available'
    }
  }
})

// 检查是否已安装
const checkInstalled = () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isInstalled.value = true
  }
}

// 监听安装提示
const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    canInstall.value = true
  })

  window.addEventListener('appinstalled', () => {
    isInstalled.value = true
    canInstall.value = false
    deferredPrompt.value = null
  })
}

// 安装 PWA
const installPWA = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  
  if (outcome === 'accepted') {
    console.log('用户接受了安装')
  }
  
  deferredPrompt.value = null
  canInstall.value = false
}

// 检查缓存状态
const checkCacheStatus = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    cacheStatus.value = cacheNames.length > 0 ? '已启用' : '未启用'
  } else {
    cacheStatus.value = '不支持'
  }
}

// 检查 Service Worker 状态
const checkSWStatus = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        swStatus.value = registration.active ? '运行中' : '未激活'
      } else {
        swStatus.value = '未注册'
      }
    })
  } else {
    swStatus.value = '不支持'
  }
}

// 清除缓存
const clearCache = async () => {
  if (!confirm('确定要清除所有缓存吗？这将删除离线数据。')) {
    return
  }

  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
    }
    
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        registration.active?.postMessage({ type: 'CLEAR_CACHE' })
      }
    }
    
    alert('缓存已清除！页面将刷新。')
    window.location.reload()
  } catch (error) {
    alert('清除缓存失败：' + error.message)
  }
}

onMounted(() => {
  checkInstalled()
  setupInstallPrompt()
  checkCacheStatus()
  checkSWStatus()
})
</script>

<style scoped>
.pwa-settings {
  padding: 20px;
}

.settings-header {
  text-align: center;
  margin-bottom: 30px;
}

.settings-header h2 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 8px;
}

.settings-header p {
  color: #6b7280;
  font-size: 14px;
}

.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section h3 {
  font-size: 16px;
  color: #1f2937;
  margin-bottom: 16px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.status-card.installed {
  background: #d1fae5;
  border-color: #10b981;
}

.status-card.can-install {
  background: #dbeafe;
  border-color: #3b82f6;
}

.status-card.not-available {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.status-icon {
  font-size: 32px;
}

.status-info {
  flex: 1;
}

.status-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.status-desc {
  font-size: 14px;
  color: #6b7280;
}

.install-btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.install-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  gap: 12px;
  color: #10b981;
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 13px;
  color: #6b7280;
}

.cache-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.cache-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  font-size: 14px;
}

.cache-value {
  font-weight: 600;
  color: #3b82f6;
}

.clear-cache-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-cache-btn:hover {
  background: #dc2626;
}

.guide-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.guide-tab {
  padding: 8px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.guide-tab:hover {
  background: #e5e7eb;
}

.guide-tab.active {
  background: #3b82f6;
  color: white;
}

.guide-content ol {
  margin: 0;
  padding-left: 20px;
}

.guide-content li {
  margin-bottom: 12px;
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
}

/* 暗色模式 */
:deep(.dark) .settings-header h2 {
  color: #e2e8f0;
}

:deep(.dark) .section {
  background: #1e293b;
}

:deep(.dark) .section h3 {
  color: #e2e8f0;
}

:deep(.dark) .status-title,
:deep(.dark) .feature-title {
  color: #e2e8f0;
}

:deep(.dark) .cache-item {
  background: #334155;
}

:deep(.dark) .guide-tab {
  background: #334155;
  color: #e2e8f0;
}

:deep(.dark) .guide-tab:hover {
  background: #475569;
}

:deep(.dark) .guide-content li {
  color: #cbd5e1;
}
</style>

