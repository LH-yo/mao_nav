<template>
  <div class="demo-container">
    <h1 class="demo-title">📱 移动端联系方式显示方案演示</h1>
    <p class="demo-subtitle">请调整浏览器窗口到手机尺寸（宽度 < 480px）查看效果</p>

    <!-- 方案切换按钮 -->
    <div class="scheme-selector">
      <button
        v-for="scheme in schemes"
        :key="scheme.id"
        @click="currentScheme = scheme.id"
        :class="['scheme-btn', { active: currentScheme === scheme.id }]"
      >
        {{ scheme.name }}
      </button>
    </div>

    <!-- 方案说明 -->
    <div class="scheme-info">
      <h3>{{ schemes.find(s => s.id === currentScheme)?.name }}</h3>
      <p>{{ schemes.find(s => s.id === currentScheme)?.description }}</p>
      <div class="scheme-pros">
        <strong>优点：</strong>
        <ul>
          <li v-for="(pro, index) in schemes.find(s => s.id === currentScheme)?.pros" :key="index">
            {{ pro }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="preview-wrapper">
      <div class="mobile-frame">
        <!-- 方案1：顶部搜索栏下方横条 -->
        <div v-if="currentScheme === 1" class="scheme-preview scheme-1">
          <div class="mock-search-header">
            <div class="mock-search-box">
              <input type="text" placeholder="搜索..." readonly />
            </div>
            <button class="mock-theme-btn">🌙</button>
            <button class="mock-menu-btn">☰</button>
          </div>
          
          <!-- 联系方式横条 -->
          <div class="social-bar">
            <a href="#" class="social-bar-link" title="哔哩哔哩">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
              </svg>
            </a>
            <a href="#" class="social-bar-link" title="QQ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369s7.138.209 7.482-.369c.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
              </svg>
            </a>
            <a href="#" class="social-bar-link" title="邮箱">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="#" class="social-bar-link" title="Linux.do">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.123.805.487 1.544 1.04 2.138l-.88.88c-.39.39-.39 1.024 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l.88-.88c.594.553 1.333.917 2.138 1.04.805.123 1.649-.009 2.489-.287 1.771-.589 3.47-1.831 4.521-2.716 1.067-.75 1.928-.974 3.02-1.05 1.491-.065 5.965 1.056 6.298-3.17.013-.165.021-.325.021-.48 0-6.627-5.373-12-12-12zm-.21 2.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-3.5 1.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm7 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-10.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm14 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-7 1.5c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5zm-8.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm17 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-12.5 3c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm8 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-6.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm5 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858z"/>
              </svg>
            </a>
          </div>

          <div class="mock-content">
            <div class="mock-card">网站卡片 1</div>
            <div class="mock-card">网站卡片 2</div>
            <div class="mock-card">网站卡片 3</div>
            <div class="mock-card">网站卡片 4</div>
          </div>
        </div>

        <!-- 方案2：搜索栏内嵌 -->
        <div v-if="currentScheme === 2" class="scheme-preview scheme-2">
          <div class="mock-search-header compact">
            <div class="mock-search-box small">
              <input type="text" placeholder="搜索..." readonly />
            </div>
            
            <!-- 联系方式内嵌 -->
            <div class="inline-social">
              <a href="#" class="inline-social-link" title="B站">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                </svg>
              </a>
              <a href="#" class="inline-social-link" title="QQ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369s7.138.209 7.482-.369c.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
                </svg>
              </a>
            </div>
            
            <button class="mock-theme-btn">🌙</button>
            <button class="mock-menu-btn">☰</button>
          </div>

          <div class="mock-content">
            <div class="mock-card">网站卡片 1</div>
            <div class="mock-card">网站卡片 2</div>
            <div class="mock-card">网站卡片 3</div>
            <div class="mock-card">网站卡片 4</div>
          </div>
        </div>

        <!-- 方案3：悬浮按钮 -->
        <div v-if="currentScheme === 3" class="scheme-preview scheme-3">
          <div class="mock-search-header">
            <div class="mock-search-box">
              <input type="text" placeholder="搜索..." readonly />
            </div>
            <button class="mock-theme-btn">🌙</button>
            <button class="mock-menu-btn">☰</button>
          </div>

          <div class="mock-content">
            <div class="mock-card">网站卡片 1</div>
            <div class="mock-card">网站卡片 2</div>
            <div class="mock-card">网站卡片 3</div>
            <div class="mock-card">网站卡片 4</div>
          </div>

          <!-- 悬浮按钮 -->
          <div class="floating-social" :class="{ expanded: floatingExpanded }">
            <button class="floating-main-btn" @click="floatingExpanded = !floatingExpanded">
              <span v-if="!floatingExpanded">📞</span>
              <span v-else>✕</span>
            </button>
            <transition name="float">
              <div v-if="floatingExpanded" class="floating-links">
                <a href="#" class="floating-link" title="哔哩哔哩">🎬</a>
                <a href="#" class="floating-link" title="QQ">💬</a>
                <a href="#" class="floating-link" title="邮箱">📧</a>
                <a href="#" class="floating-link" title="Linux.do">🐧</a>
              </div>
            </transition>
          </div>
        </div>

        <!-- 方案4：移动端菜单顶部 -->
        <div v-if="currentScheme === 4" class="scheme-preview scheme-4">
          <div class="mock-search-header">
            <div class="mock-search-box">
              <input type="text" placeholder="搜索..." readonly />
            </div>
            <button class="mock-theme-btn">🌙</button>
            <button class="mock-menu-btn" @click="menuOpen = !menuOpen">☰</button>
          </div>

          <div class="mock-content">
            <div class="mock-card">网站卡片 1</div>
            <div class="mock-card">网站卡片 2</div>
            <div class="mock-card">网站卡片 3</div>
            <div class="mock-card">网站卡片 4</div>
          </div>

          <!-- 侧边菜单 -->
          <div class="side-menu" :class="{ open: menuOpen }">
            <div class="menu-header">
              <h3>分类导航</h3>
              <button class="menu-close" @click="menuOpen = false">✕</button>
            </div>
            
            <!-- 联系方式在顶部 -->
            <div class="menu-social-top">
              <a href="#" class="menu-social-link">🎬</a>
              <a href="#" class="menu-social-link">💬</a>
              <a href="#" class="menu-social-link">📧</a>
              <a href="#" class="menu-social-link">🐧</a>
            </div>

            <div class="menu-categories">
              <div class="menu-item">📚 学习资源</div>
              <div class="menu-item">🛠️ 开发工具</div>
              <div class="menu-item">🎨 设计素材</div>
              <div class="menu-item">📱 社交媒体</div>
            </div>
          </div>
          
          <div v-if="menuOpen" class="menu-overlay" @click="menuOpen = false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentScheme = ref(1)
const floatingExpanded = ref(false)
const menuOpen = ref(false)

const schemes = [
  {
    id: 1,
    name: '方案1：顶部横条',
    description: '在搜索栏正下方显示一条横向的联系方式栏，4个图标横向排列',
    pros: [
      '位置显眼，用户容易找到',
      '不占用太多空间',
      '视觉上与搜索栏形成整体',
      '可以选择固定或随页面滚动'
    ]
  },
  {
    id: 2,
    name: '方案2：搜索栏内嵌',
    description: '将联系方式图标缩小，放在搜索栏右侧，与主题切换、菜单按钮并排',
    pros: [
      '最节省空间',
      '所有功能集中在一行',
      '适合极简设计',
      '不增加页面高度'
    ]
  },
  {
    id: 3,
    name: '方案3：悬浮按钮',
    description: '右下角悬浮一个"联系我"按钮，点击展开显示4个联系方式',
    pros: [
      '不占用固定空间',
      '类似客服悬浮球，用户熟悉',
      '可以随时访问',
      '不干扰主要内容'
    ]
  },
  {
    id: 4,
    name: '方案4：菜单顶部',
    description: '放在移动端侧边菜单的顶部（而不是底部），在"分类导航"标题下方',
    pros: [
      '更容易被看到（顶部优于底部）',
      '不占用主页面空间',
      '与分类导航逻辑分离',
      '适合不常用的联系方式'
    ]
  }
]
</script>

<style scoped>
.demo-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
  min-height: 100vh;
}

.demo-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 28px;
}

.demo-subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 30px;
  font-size: 14px;
}

.scheme-selector {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.scheme-btn {
  padding: 12px 24px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
}

.scheme-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.scheme-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.scheme-info {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.scheme-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 20px;
}

.scheme-info p {
  margin: 0 0 15px 0;
  color: #64748b;
  line-height: 1.6;
}

.scheme-pros {
  margin-top: 15px;
}

.scheme-pros strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 8px;
}

.scheme-pros ul {
  margin: 0;
  padding-left: 20px;
  color: #64748b;
}

.scheme-pros li {
  margin-bottom: 5px;
  line-height: 1.5;
}

.preview-wrapper {
  display: flex;
  justify-content: center;
}

.mobile-frame {
  width: 375px;
  height: 667px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  border: 8px solid #2c3e50;
}

.scheme-preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f8f9fa;
}

/* 模拟搜索栏 */
.mock-search-header {
  background: white;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.mock-search-header.compact {
  gap: 6px;
}

.mock-search-box {
  flex: 1;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.mock-search-box.small {
  flex: 0 1 auto;
  min-width: 120px;
}

.mock-search-box input {
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: 14px;
}

.mock-theme-btn,
.mock-menu-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 方案1：横条样式 */
.social-bar {
  background: white;
  padding: 12px 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.social-bar-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #f8f9fa;
  border-radius: 12px;
  color: #64748b;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-bar-link:active {
  background: #e9ecef;
  transform: scale(0.95);
}

/* 方案2：内嵌样式 */
.inline-social {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.inline-social-link {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 6px;
  color: #64748b;
  text-decoration: none;
}

/* 方案3：悬浮按钮 */
.floating-social {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.floating-main-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
}

.floating-main-btn:active {
  transform: scale(0.95);
}

.floating-links {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.floating-link {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.float-enter-active,
.float-leave-active {
  transition: all 0.3s ease;
}

.float-enter-from,
.float-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 方案4：侧边菜单 */
.side-menu {
  position: fixed;
  top: 0;
  right: -280px;
  width: 280px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.side-menu.open {
  right: 0;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #2c3e50;
  color: white;
}

.menu-header h3 {
  margin: 0;
  font-size: 18px;
}

.menu-close {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
}

.menu-social-top {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  border-bottom: 1px solid #e9ecef;
}

.menu-social-link {
  width: 48px;
  height: 48px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.menu-social-link:active {
  background: #e9ecef;
  transform: scale(0.95);
}

.menu-categories {
  flex: 1;
  overflow-y: auto;
}

.menu-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-item:active {
  background: #f8f9fa;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* 模拟内容 */
.mock-content {
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mock-card {
  background: white;
  padding: 30px 20px;
  border-radius: 12px;
  text-align: center;
  color: #64748b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .mobile-frame {
    width: 100%;
    max-width: 375px;
    border-radius: 20px;
    border-width: 4px;
  }
}
</style>

