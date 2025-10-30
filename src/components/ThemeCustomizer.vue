<template>
  <div class="theme-customizer">
    <div class="customizer-header">
      <h2>🎨 主题定制</h2>
      <p>个性化你的导航外观</p>
    </div>

    <div class="customizer-sections">
      <!-- 预设主题 -->
      <div class="section">
        <h3>预设主题</h3>
        <div class="theme-grid">
          <div
            v-for="theme in presetThemes"
            :key="theme.id"
            class="theme-card"
            :class="{ active: currentTheme === theme.id }"
            @click="applyTheme(theme)"
          >
            <div class="theme-preview" :style="{ background: theme.gradient }">
              <div class="preview-icon">{{ theme.icon }}</div>
            </div>
            <div class="theme-name">{{ theme.name }}</div>
          </div>
        </div>
      </div>

      <!-- 颜色定制 -->
      <div class="section">
        <h3>主题色</h3>
        <div class="color-picker-group">
          <div class="color-item">
            <label>主色调</label>
            <input
              type="color"
              v-model="customColors.primary"
              @change="applyCustomColors"
              class="color-input"
            />
            <span class="color-value">{{ customColors.primary }}</span>
          </div>

          <div class="color-item">
            <label>辅助色</label>
            <input
              type="color"
              v-model="customColors.secondary"
              @change="applyCustomColors"
              class="color-input"
            />
            <span class="color-value">{{ customColors.secondary }}</span>
          </div>
        </div>
      </div>

      <!-- 布局设置 -->
      <div class="section">
        <h3>布局设置</h3>
        <div class="layout-options">
          <div class="option-item">
            <label>卡片大小</label>
            <select v-model="layoutSettings.cardSize" @change="applyLayoutSettings">
              <option value="small">紧凑</option>
              <option value="medium">标准</option>
              <option value="large">宽松</option>
            </select>
          </div>

          <div class="option-item">
            <label>网格列数</label>
            <select v-model="layoutSettings.gridColumns" @change="applyLayoutSettings">
              <option value="2">2 列</option>
              <option value="3">3 列</option>
              <option value="4">4 列</option>
              <option value="5">5 列</option>
              <option value="6">6 列</option>
            </select>
          </div>

          <div class="option-item">
            <label>卡片圆角</label>
            <select v-model="layoutSettings.borderRadius" @change="applyLayoutSettings">
              <option value="0">无圆角</option>
              <option value="4px">小圆角</option>
              <option value="8px">中圆角</option>
              <option value="12px">大圆角</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 字体设置 -->
      <div class="section">
        <h3>字体设置</h3>
        <div class="font-options">
          <div class="option-item">
            <label>字体大小</label>
            <select v-model="fontSettings.fontSize" @change="applyFontSettings">
              <option value="small">小</option>
              <option value="medium">中</option>
              <option value="large">大</option>
            </select>
          </div>

          <div class="option-item">
            <label>字体系列</label>
            <select v-model="fontSettings.fontFamily" @change="applyFontSettings">
              <option value="system">系统默认</option>
              <option value="serif">衬线体</option>
              <option value="sans-serif">无衬线体</option>
              <option value="monospace">等宽字体</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 重置按钮 -->
      <div class="section">
        <button @click="resetToDefault" class="reset-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C9.25022 20 6.82447 18.6122 5.38451 16.5M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          恢复默认设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTheme = ref('default')

const presetThemes = [
  {
    id: 'default',
    name: '默认蓝',
    icon: '🔵',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6'
    }
  },
  {
    id: 'green',
    name: '清新绿',
    icon: '🟢',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    colors: {
      primary: '#10b981',
      secondary: '#14b8a6'
    }
  },
  {
    id: 'purple',
    name: '优雅紫',
    icon: '🟣',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899'
    }
  },
  {
    id: 'orange',
    name: '活力橙',
    icon: '🟠',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c'
    }
  },
  {
    id: 'pink',
    name: '甜美粉',
    icon: '🩷',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6'
    }
  },
  {
    id: 'dark',
    name: '深邃黑',
    icon: '⚫',
    gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    colors: {
      primary: '#1f2937',
      secondary: '#374151'
    }
  }
]

const customColors = ref({
  primary: '#3b82f6',
  secondary: '#8b5cf6'
})

const layoutSettings = ref({
  cardSize: 'medium',
  gridColumns: '4',
  borderRadius: '8px'
})

const fontSettings = ref({
  fontSize: 'medium',
  fontFamily: 'system'
})

// 应用主题
const applyTheme = (theme) => {
  currentTheme.value = theme.id
  customColors.value = { ...theme.colors }
  applyCustomColors()
  saveSettings()
}

// 应用自定义颜色
const applyCustomColors = () => {
  document.documentElement.style.setProperty('--primary-color', customColors.value.primary)
  document.documentElement.style.setProperty('--secondary-color', customColors.value.secondary)
  saveSettings()
}

// 应用布局设置
const applyLayoutSettings = () => {
  const root = document.documentElement

  // 卡片大小
  const cardSizes = {
    small: { padding: '12px', gap: '12px' },
    medium: { padding: '16px', gap: '16px' },
    large: { padding: '20px', gap: '20px' }
  }
  const size = cardSizes[layoutSettings.value.cardSize]
  root.style.setProperty('--card-padding', size.padding)
  root.style.setProperty('--grid-gap', size.gap)

  // 网格列数
  root.style.setProperty('--grid-columns', layoutSettings.value.gridColumns)

  // 圆角
  root.style.setProperty('--border-radius', layoutSettings.value.borderRadius)

  saveSettings()
}

// 应用字体设置
const applyFontSettings = () => {
  const root = document.documentElement

  // 字体大小
  const fontSizes = {
    small: '14px',
    medium: '16px',
    large: '18px'
  }
  root.style.setProperty('--base-font-size', fontSizes[fontSettings.value.fontSize])

  // 字体系列
  const fontFamilies = {
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    'sans-serif': 'Arial, Helvetica, sans-serif',
    monospace: '"Courier New", Courier, monospace'
  }
  root.style.setProperty('--font-family', fontFamilies[fontSettings.value.fontFamily])

  saveSettings()
}

// 保存设置
const saveSettings = () => {
  const settings = {
    theme: currentTheme.value,
    colors: customColors.value,
    layout: layoutSettings.value,
    font: fontSettings.value
  }
  localStorage.setItem('theme_settings', JSON.stringify(settings))
}

// 加载设置
const loadSettings = () => {
  try {
    const saved = localStorage.getItem('theme_settings')
    if (saved) {
      const settings = JSON.parse(saved)
      currentTheme.value = settings.theme || 'default'
      customColors.value = settings.colors || customColors.value
      layoutSettings.value = settings.layout || layoutSettings.value
      fontSettings.value = settings.font || fontSettings.value

      applyCustomColors()
      applyLayoutSettings()
      applyFontSettings()
    }
  } catch (error) {
    console.error('加载主题设置失败:', error)
  }
}

// 重置为默认
const resetToDefault = () => {
  if (confirm('确定要恢复默认设置吗？')) {
    localStorage.removeItem('theme_settings')
    currentTheme.value = 'default'
    customColors.value = { primary: '#3b82f6', secondary: '#8b5cf6' }
    layoutSettings.value = { cardSize: 'medium', gridColumns: '4', borderRadius: '8px' }
    fontSettings.value = { fontSize: 'medium', fontFamily: 'system' }

    applyCustomColors()
    applyLayoutSettings()
    applyFontSettings()
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.theme-customizer {
  padding: 20px;
}

.customizer-header {
  text-align: center;
  margin-bottom: 30px;
}

.customizer-header h2 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 8px;
}

.customizer-header p {
  color: #6b7280;
  font-size: 14px;
}

.customizer-sections {
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

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.theme-card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.theme-card.active {
  border-color: #3b82f6;
}

.theme-preview {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-icon {
  font-size: 32px;
}

.theme-name {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  background: #f9fafb;
  color: #374151;
}

.color-picker-group,
.layout-options,
.font-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.color-item,
.option-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-item label,
.option-item label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.color-input {
  width: 100%;
  height: 50px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
}

.color-value {
  font-size: 12px;
  color: #6b7280;
  font-family: monospace;
}

.option-item select {
  padding: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.reset-btn {
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
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
}

/* 暗色模式 */
:deep(.dark) .customizer-header h2 {
  color: #e2e8f0;
}

:deep(.dark) .section {
  background: #1e293b;
}

:deep(.dark) .section h3 {
  color: #e2e8f0;
}

:deep(.dark) .theme-name {
  background: #334155;
  color: #e2e8f0;
}

:deep(.dark) .option-item select {
  background: #334155;
  border-color: #475569;
  color: #e2e8f0;
}

@media (max-width: 768px) {
  .theme-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .color-picker-group,
  .layout-options,
  .font-options {
    grid-template-columns: 1fr;
  }
}
</style>

