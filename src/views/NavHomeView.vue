<template>
  <!-- 锁定界面 -->
  <div v-if="isLocked && !isUnlocked" class="lock-container">
    <div class="lock-box">
      <h1>🔐 访问验证</h1>
      <p class="lock-description">此导航站已启用访问保护</p>
      <form @submit.prevent="handleUnlock">
        <div class="form-group">
          <label for="unlock-password">请输入访问密钥:</label>
          <input
            id="unlock-password"
            type="password"
            v-model="unlockPassword"
            placeholder="请输入访问密钥"
            required
            class="form-input"
          />
        </div>
        <button type="submit" class="unlock-btn" :disabled="unlocking">
          {{ unlocking ? '验证中...' : '进入导航' }}
        </button>
      </form>
      <div v-if="unlockError" class="error-message">
        {{ unlockError }}
      </div>
    </div>
  </div>

  <!-- 正常导航界面 -->
  <div v-else class="nav-home">
    <!-- 左侧边栏 -->
    <aside class="sidebar">
      <!-- Logo区域 -->
      <div class="logo-section">
        <img src="/logo.png" alt="logo" class="logo" />
        <h1 class="site-title">{{ title || 'Eckes导航' }}</h1>
      </div>

      <!-- 分类导航 -->
      <nav class="category-nav">
        <h2 class="nav-title">分类导航</h2>
                <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            @click="scrollToCategory(category.id)"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
          </li>
        </ul>
      </nav>

      <!-- 左侧边栏底部信息 -->
      <div class="sidebar-footer">
        <div class="social-links">
          <a
            href="https://space.bilibili.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            title="哔哩哔哩"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
            </svg>
          </a>
          <a
            @click.prevent="showQQModal = true"
            href="#"
            class="social-link"
            title="QQ"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369s7.138.209 7.482-.369c.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
            </svg>
          </a>
          <a
            href="mailto:2490918758@qq.com"
            class="social-link"
            title="QQ邮箱"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a
            href="https://linux.do/u/Eckes"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            title="Linux.do"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.123.805.487 1.544 1.04 2.138l-.88.88c-.39.39-.39 1.024 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l.88-.88c.594.553 1.333.917 2.138 1.04.805.123 1.649-.009 2.489-.287 1.771-.589 3.47-1.831 4.521-2.716 1.067-.75 1.928-.974 3.02-1.05 1.491-.065 5.965 1.056 6.298-3.17.013-.165.021-.325.021-.48 0-6.627-5.373-12-12-12zm-.21 2.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-3.5 1.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm7 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-10.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm14 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-7 1.5c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5zm-8.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm17 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-12.5 3c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm8 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-6.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm5 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858z"/>
            </svg>
          </a>
        </div>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
                  <!-- 顶部搜索栏 -->
      <header class="search-header">
        <div class="search-container">
          <div class="search-engine-selector">
            <img :src="searchEngines[selectedEngine].icon" :alt="selectedEngine" class="engine-logo" />
            <select v-model="selectedEngine" class="engine-select">
              <option value="google">Google</option>
              <option value="baidu">Baidu</option>
              <option value="bing">Bing</option>
              <option value="duckduckgo">DuckDuckGo</option>
            </select>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="searchEngines[selectedEngine].placeholder"
            class="search-input"
            @keyup.enter="handleSearch"
          />
        </div>

        <!-- 顶部工具栏 -->
        <div class="header-toolbar">
          <!-- 联系我按钮 -->
          <button class="contact-btn" @click="showContactPopup = true" title="联系我">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </button>

          <!-- 礼物按钮 -->
          <router-link to="/gift" class="gift-btn" title="神秘礼物 🎁">
            <span class="gift-icon">🎁</span>
          </router-link>

          <!-- 主题切换按钮 -->
          <button class="theme-toggle-btn" @click="themeStore.toggleTheme" :title="themeStore.isDarkMode ? '切换到日间模式' : '切换到夜间模式'">
            <svg v-if="!themeStore.isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"/>
            </svg>
          </button>

          <!-- 移动端社交媒体图标（方案2：内嵌式） -->
          <div class="inline-social">
            <a href="https://space.bilibili.com/3546752019236383" target="_blank" rel="noopener noreferrer" class="inline-social-link" title="哔哩哔哩">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
              </svg>
            </a>
            <a @click.prevent="showQQModal = true" href="#" class="inline-social-link" title="QQ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369s7.138.209 7.482-.369c.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
              </svg>
            </a>
            <a href="https://linux.do/u/Eckes" target="_blank" rel="noopener noreferrer" class="inline-social-link" title="LinuxDo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.103 0C18.666 0 24 5.485 24 12.232c0 6.747-5.334 12.232-11.897 12.232-.338 0-.674-.015-1.006-.044C9.357 24.29 7.76 24 6.14 24c-.827 0-1.64-.084-2.417-.251-.316-.068-.618-.151-.91-.25-.528-.179-1.022-.41-1.474-.686-.083-.051-.164-.104-.243-.159-.511-.356-.97-.77-1.36-1.232-.134-.159-.26-.324-.378-.495C.149 19.688.013 18.11.013 16.456c0-1.654.136-3.232.405-4.471.39-1.796 1.004-3.318 1.832-4.533C3.078 6.238 4.114 5.332 5.26 4.64c.575-.347 1.184-.64 1.822-.876.638-.236 1.304-.42 1.992-.55C9.76.07 10.916 0 12.103 0zm-.002 1.652c-1.038 0-2.036.063-2.985.188-.633.083-1.24.198-1.817.344-.577.146-1.124.323-1.637.53-.513.207-.99.444-1.427.71-.437.266-.835.562-1.19.888-.355.326-.667.682-.933 1.068-.266.386-.486.802-.66 1.248-.174.446-.302.922-.384 1.428-.082.506-.123 1.042-.123 1.608 0 1.283.099 2.438.297 3.465.198 1.027.486 1.926.864 2.697.378.771.836 1.414 1.374 1.929.538.515 1.156.902 1.854 1.161.698.259 1.476.388 2.334.388 1.283 0 2.438-.198 3.465-.594 1.027-.396 1.926-.951 2.697-1.665.771-.714 1.414-1.566 1.929-2.556.515-1.09.902-2.289 1.161-3.597.259-1.308.388-2.724.388-4.248 0-1.524-.129-2.94-.388-4.248-.259-1.308-.646-2.507-1.161-3.597-.515-.99-1.158-1.842-1.929-2.556-.771-.714-1.67-1.269-2.697-1.665-1.027-.396-2.182-.594-3.465-.594z"/>
              </svg>
            </a>
          </div>

          <!-- 移动端菜单按钮 -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- 移动端分类菜单 -->
        <div class="mobile-menu" :class="{ active: showMobileMenu }">
          <div class="mobile-menu-header">
            <h3>分类导航</h3>
            <button class="close-btn" @click="closeMobileMenu">×</button>
          </div>
                    <ul class="mobile-category-list">
            <li
              v-for="category in categories"
              :key="category.id"
              class="mobile-category-item"
              @click="scrollToCategoryMobile(category.id)"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
            </li>
          </ul>

          <!-- 移动端礼物按钮 -->
          <div class="mobile-gift-section">
            <router-link to="/gift" class="mobile-gift-btn" @click="closeMobileMenu">
              <span class="gift-icon">🎁</span>
              <span class="gift-text">神秘礼物</span>
            </router-link>
          </div>

          <!-- 移动端社交媒体图标 -->
          <div class="mobile-social-footer">
            <div class="mobile-social-links">
              <a
                href="https://space.bilibili.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="mobile-social-link"
                title="哔哩哔哩"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                </svg>
              </a>
              <a
                @click.prevent="showQQModal = true"
                href="#"
                class="mobile-social-link"
                title="QQ"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369s7.138.209 7.482-.369c.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
                </svg>
              </a>
              <a
                href="mailto:2490918758@qq.com"
                class="mobile-social-link"
                title="QQ邮箱"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a
                href="https://linux.do/u/Eckes"
                target="_blank"
                rel="noopener noreferrer"
                class="mobile-social-link"
                title="Linux.do"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.123.805.487 1.544 1.04 2.138l-.88.88c-.39.39-.39 1.024 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l.88-.88c.594.553 1.333.917 2.138 1.04.805.123 1.649-.009 2.489-.287 1.771-.589 3.47-1.831 4.521-2.716 1.067-.75 1.928-.974 3.02-1.05 1.491-.065 5.965 1.056 6.298-3.17.013-.165.021-.325.021-.48 0-6.627-5.373-12-12-12zm-.21 2.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-3.5 1.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm7 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-10.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm14 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-7 1.5c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5zm-8.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm17 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-12.5 3c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm8 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-6.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm5 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- 移动端菜单遮罩 -->
        <div class="mobile-menu-overlay" :class="{ active: showMobileMenu }" @click="closeMobileMenu"></div>
      </header>

      <!-- 导航内容区 -->
      <div class="content-area">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <button @click="fetchCategories" class="retry-btn">重试</button>
        </div>

                <!-- 分类内容 -->
        <div v-else class="categories-container">
          <section
            v-for="category in categories"
            :key="category.id"
            class="category-section"
            :id="`category-${category.id}`"
          >
            <h2 class="category-title">
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
            </h2>

            <div class="sites-grid">
              <a
                v-for="site in category.sites"
                :key="site.id"
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="site-card"
              >
                <div class="site-icon">
                  <img :src="site.icon" :alt="site.name" @error="handleImageError" />
                </div>
                <div class="site-info">
                  <h3 class="site-name">{{ site.name }}</h3>
                  <p class="site-description">{{ site.description }}</p>
                </div>
              </a>
            </div>
          </section>

          <!-- 页面底部信息 -->
          <footer class="page-footer" hidden="true">
            <div class="footer-content">
              <div class="footer-info">
                <h3>{{ title || 'Eckes导航' }}</h3>
                <p>一个简洁、美观的导航网站，收录优质网站资源</p>
              </div>

              <div class="footer-links">
                <a
                  href="https://github.com/your-username/eckes_nav"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  开源项目
                </a>
              </div>
            </div>

            <div class="footer-bottom">
              <p>&copy; {{ new Date().getFullYear() }} Eckes导航 - 由 <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">Your Name</a> 用 ❤️ 制作</p>
              <p class="footer-tech">基于 Vue.js 构建 | <a href="https://github.com/your-username/eckes_nav" target="_blank" rel="noopener noreferrer">查看源代码</a></p>
            </div>
          </footer>
        </div>
      </div>
    </main>

    <!-- QQ二维码模态框 - 方案4：标签页切换式 -->
    <Teleport to="body">
      <!-- 联系方式弹出层 -->
      <Transition name="modal">
        <div v-if="showContactPopup" class="contact-popup-overlay" @click="showContactPopup = false">
          <div class="contact-popup" @click.stop>
            <button class="contact-popup-close" @click="showContactPopup = false">×</button>
            <h3 class="contact-popup-title">联系我</h3>
            <div class="contact-links-grid">
              <a
                href="https://space.bilibili.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link-item"
              >
                <div class="contact-link-icon bilibili">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                  </svg>
                </div>
                <span class="contact-link-text">哔哩哔哩</span>
              </a>
              <a
                @click.prevent="showContactPopup = false; showQQModal = true"
                href="#"
                class="contact-link-item"
              >
                <div class="contact-link-icon qq">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a38.97 38.97 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.369s7.138.209 7.482-.369c.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.835 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673z"/>
                  </svg>
                </div>
                <span class="contact-link-text">QQ</span>
              </a>
              <a
                href="mailto:2490918758@qq.com"
                class="contact-link-item"
              >
                <div class="contact-link-icon email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span class="contact-link-text">QQ邮箱</span>
              </a>
              <a
                href="https://linux.do/u/Eckes"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link-item"
              >
                <div class="contact-link-icon linux">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.123.805.487 1.544 1.04 2.138l-.88.88c-.39.39-.39 1.024 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l.88-.88c.594.553 1.333.917 2.138 1.04.805.123 1.649-.009 2.489-.287 1.771-.589 3.47-1.831 4.521-2.716 1.067-.75 1.928-.974 3.02-1.05 1.491-.065 5.965 1.056 6.298-3.17.013-.165.021-.325.021-.48 0-6.627-5.373-12-12-12zm-.21 2.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-3.5 1.5c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm7 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-10.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm14 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-7 1.5c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5zm-8.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm17 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-12.5 3c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm8 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm-6.5 2c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858zm5 0c.474 0 .858.384.858.858s-.384.858-.858.858-.858-.384-.858-.858.384-.858.858-.858z"/>
                  </svg>
                </div>
                <span class="contact-link-text">Linux.do</span>
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- QQ二维码弹窗 -->
      <Transition name="modal">
        <div v-if="showQQModal" class="qq-modal-overlay" @click="showQQModal = false">
          <div class="qq-modal" @click.stop>
            <button class="qq-modal-close" @click="showQQModal = false">×</button>
            <div class="qq-tabs">
              <button
                @click="activeQQTab = 'group'"
                :class="{ active: activeQQTab === 'group' }"
                class="qq-tab-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                QQ群
              </button>
              <button
                @click="activeQQTab = 'personal'"
                :class="{ active: activeQQTab === 'personal' }"
                class="qq-tab-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                个人QQ
              </button>
            </div>
            <div class="qq-content">
              <Transition name="slide" mode="out-in">
                <div :key="activeQQTab" class="qq-qr-wrapper">
                  <img
                    :src="activeQQTab === 'group' ? '/qq-group-qr.jpg' : '/qq-persona1-qr.jpg'"
                    alt="QR Code"
                    class="qq-qr-image"
                  />
                  <p class="qq-qr-desc">{{ activeQQTab === 'group' ? '扫码加入QQ群' : '扫码添加个人QQ' }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavigation } from '@/apis/useNavigation.js'
import { useThemeStore } from '@/stores/counter.js'
// 导入搜索引擎logo图片
import googleLogo from '@/assets/goolge.png'
import baiduLogo from '@/assets/baidu.png'
import bingLogo from '@/assets/bing.png'
import duckLogo from '@/assets/duck.png'

// 使用导航API
const { categories, title, defaultSearchEngine, loading, error, fetchCategories } = useNavigation()

// 使用主题store
const themeStore = useThemeStore()

// 响应式数据
const searchQuery = ref('') // 搜索查询
const selectedEngine = ref('bing') // 选中的搜索引擎，初始值会在组件挂载后更新
const showMobileMenu = ref(false) // 移动端菜单显示状态
const showContactPopup = ref(false) // 联系方式弹出层显示状态
const showQQModal = ref(false) // QQ二维码模态框显示状态
const activeQQTab = ref('group') // QQ二维码当前标签页（group 或 personal）

// 锁定功能相关
const isLocked = ref(false) // 是否启用锁定功能
const isUnlocked = ref(false) // 是否已解锁
const unlockPassword = ref('') // 解锁密码输入
const unlocking = ref(false) // 解锁中状态
const unlockError = ref('') // 解锁错误信息

// 搜索引擎配置
const searchEngines = {
  google: {
    url: 'https://www.google.com/search?q=',
    icon: googleLogo,
    placeholder: 'Google (点logo切换搜索引擎'
  },
  baidu: {
    url: 'https://www.baidu.com/s?wd=',
    icon: baiduLogo,
    placeholder: '百度一下(点logo切换搜索引擎'
  },
  bing: {
    url: 'https://www.bing.com/search?q=',
    icon: bingLogo,
    placeholder: 'Bing (点logo切换搜索引擎)'
  },
  duckduckgo: {
    url: 'https://duckduckgo.com/?q=',
    icon: duckLogo,
    placeholder: 'DuckDuckGo (点logo切换搜索引擎)'
  }
}

// 自定义固定时间滚动函数
const smoothScrollTo = (container, targetTop, duration = 600) => {
  const startTop = container.scrollTop
  const distance = targetTop - startTop
  let startTime = null

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    // 使用缓动函数 (easeInOutCubic)
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2

    container.scrollTop = startTop + distance * ease

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

// 滚动到指定分类
const scrollToCategory = (categoryId) => {
  const element = document.getElementById(`category-${categoryId}`)
  const container = document.querySelector('.content-area')

  if (element && container) {
    // 检查是否为移动端
    const isMobile = window.innerWidth <= 768

    let targetTop = 0

    if (isMobile) {
      // 移动端：在 content-area 容器内滚动
      const elementOffsetTop = element.offsetTop
      const searchHeaderHeight = 80 // 固定高度，因为搜索框是fixed定位
      targetTop = elementOffsetTop - searchHeaderHeight
    } else {
      // 桌面端：在容器内滚动
      const searchHeader = document.querySelector('.search-header')
      const elementOffsetTop = element.offsetTop
      const searchHeaderHeight = searchHeader ? searchHeader.offsetHeight + 20 : 100
      targetTop = elementOffsetTop - searchHeaderHeight
    }

    // 使用固定时间滚动（600毫秒）
    smoothScrollTo(container, Math.max(0, targetTop), 600)
  }
}

// 检查是否启用锁定功能
const checkLockStatus = () => {
  const openLock = import.meta.env.VITE_OPEN_LOCK
  if (openLock && openLock.trim() !== '') {
    isLocked.value = true
    // 检查是否已经解锁过
    const savedUnlock = localStorage.getItem('nav_unlocked')
    if (savedUnlock === 'true') {
      isUnlocked.value = true
    }
  } else {
    isLocked.value = false
    isUnlocked.value = true // 如果没有启用锁定，默认为解锁状态
  }
}

// 处理解锁
const handleUnlock = async () => {
  unlocking.value = true
  unlockError.value = ''

    try {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

    if (!adminPassword) {
      throw new Error('访问密钥未配置')
    }

    if (unlockPassword.value === adminPassword) {
      isUnlocked.value = true
      localStorage.setItem('nav_unlocked', 'true')
      unlockPassword.value = ''
      console.log('导航站解锁成功')
    } else {
      throw new Error('访问密钥错误，请重新输入')
    }
  } catch (error) {
    unlockError.value = error.message
  } finally {
    unlocking.value = false
  }
}

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return

  const engine = searchEngines[selectedEngine.value]
  const url = engine.url + encodeURIComponent(searchQuery.value)
  window.open(url, '_blank')
}

// 处理图片加载错误
const handleImageError = (event) => {
  // 设置默认的 favicon.ico 作为 fallback 图片
  event.target.src = '/favicon.ico'
  event.target.onerror = null // 防止无限循环
}

// 移动端菜单控制
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  // 控制body滚动
  if (showMobileMenu.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  // 恢复body滚动
  document.body.style.overflow = ''
}

// 移动端分类滚动
const scrollToCategoryMobile = (categoryId) => {
  closeMobileMenu() // 先关闭菜单

  // 稍微延迟一下再滚动，确保菜单关闭动画完成
  setTimeout(() => {
    scrollToCategory(categoryId)
  }, 200)
}



// 组件挂载时获取数据
onMounted(async () => {
  checkLockStatus() // 检查锁定状态
  await fetchCategories()
  // 设置默认搜索引擎
  selectedEngine.value = defaultSearchEngine.value
})

// 组件卸载时清理样式
onUnmounted(() => {
  // 确保卸载时恢复body滚动
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* 锁定界面样式 */
.lock-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c3e50;
  padding: 20px;
  z-index: 9999;
}

.lock-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.lock-box h1 {
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.lock-description {
  color: #718096;
  margin-bottom: 30px;
  font-size: 16px;
}

.lock-box .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.lock-box .form-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
  font-size: 14px;
}

.lock-box .form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #fff;
}

.lock-box .form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.unlock-btn {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.unlock-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.unlock-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.lock-box .error-message {
  margin-top: 15px;
  padding: 12px;
  background: #fed7d7;
  color: #c53030;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #feb2b2;
}

.nav-home {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 左侧边栏样式 */
.sidebar {
  width: 280px;
  background-color: #2c3e50;
  color: white;
  padding: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow: hidden;
  flex-shrink: 0;
}

.logo-section {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-top: 13px;
  padding-bottom: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 55px;
  height: 55px;
  border-radius: 12px;
  margin-right: 15px;
}

.site-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.category-nav {
  padding: 20px 0;
  height: calc(100vh - 180px); /* 为底部留出空间 */
  overflow-y: auto;
}

.nav-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 20px 15px;
  color: #bdc3c7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.category-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: inset 4px 0 0 #3498db;
}

.category-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.category-name {
  font-size: 15px;
  font-weight: 500;
}

/* 左侧边栏底部 */
.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  justify-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #bdc3c7;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateY(-3px) scale(1.05);
}

.social-link svg {
  flex-shrink: 0;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.search-header {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
}

/* 顶部工具栏 */
.header-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 联系我按钮 */
.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  color: #64748b;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-btn:hover {
  background: #e9ecef;
  color: #2c3e50;
  transform: translateY(-2px);
}

.contact-btn:active {
  transform: translateY(0);
}

/* 联系方式弹出层 */
.contact-popup-overlay {
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
  backdrop-filter: blur(4px);
}

.contact-popup {
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: popupSlideIn 0.3s ease-out;
}

@keyframes popupSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.contact-popup-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  color: #94a3b8;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.contact-popup-close:hover {
  background: #f1f5f9;
  color: #475569;
}

.contact-popup-title {
  margin: 0 0 25px 0;
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
}

.contact-links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.contact-link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 15px;
  background: #f8fafc;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-link-item:hover {
  background: #e2e8f0;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-link-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.contact-link-icon.bilibili {
  background: linear-gradient(135deg, #00a1d6 0%, #00b5e5 100%);
}

.contact-link-icon.qq {
  background: linear-gradient(135deg, #12b7f5 0%, #1296db 100%);
}

.contact-link-icon.email {
  background: linear-gradient(135deg, #ea4335 0%, #d33b2c 100%);
}

.contact-link-icon.linux {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.contact-link-item:hover .contact-link-icon {
  transform: scale(1.1) rotate(5deg);
}

.contact-link-text {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  text-align: center;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

/* 搜索框响应式已在下方统一处理 */

.search-engine-selector {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.search-engine-selector:hover {
  background: #e9ecef;
}

.engine-logo {
  width: 24px;
  height: 24px;
  margin: 8px;
  object-fit: contain;
  pointer-events: none;
  border-radius: 4px;
}

.engine-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
}

.search-input {
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  background: white;
}

.search-input::placeholder {
  color: #95a5a6;
}

/* 移动端内嵌社交媒体图标（方案2） */
.inline-social {
  display: none; /* 默认隐藏，仅在移动端显示 */
  gap: 4px;
  flex-shrink: 0;
}

.inline-social-link {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.inline-social-link:hover {
  background: #e2e8f0;
  color: #3b82f6;
  transform: translateY(-2px);
}

.inline-social-link:active {
  transform: scale(0.95);
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.mobile-menu-btn:hover {
  background: #f8f9fa;
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 240px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: right 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: #2c3e50;
  color: white;
  flex-shrink: 0;
}

.mobile-menu-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 160px; /* 增加底部内边距确保最后一项完全可见 */
}

.mobile-category-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f8f9fa;
}

.mobile-category-item:hover {
  background: #f8f9fa;
}

.mobile-category-item .category-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.mobile-category-item .category-name {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}

/* 移动端礼物按钮区域 */
.mobile-gift-section {
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
}

.mobile-gift-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
}

.mobile-gift-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.mobile-gift-btn .gift-icon {
  font-size: 24px;
  animation: giftShake 2s infinite;
}

.mobile-gift-btn .gift-text {
  letter-spacing: 1px;
}

/* 移动端社交媒体底部 */
.mobile-social-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.mobile-social-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  justify-items: center;
}

.mobile-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: #64748b;
  text-decoration: none;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.mobile-social-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.mobile-social-link svg {
  flex-shrink: 0;
}

/* 移动端菜单遮罩 */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 内容区域样式 */
.content-area {
  flex: 1;
  padding: 30px;
  padding-bottom: 400px;
  overflow-y: auto;
}

.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #7f8c8d;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ecf0f1;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.categories-container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.category-title .category-icon {
  font-size: 32px;
  margin-right: 16px;
}

.category-title .category-name {
  margin-left: 10px;
  font-size: 26px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.site-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.site-card:hover::before {
  opacity: 1;
}

.site-icon {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.site-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.site-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.site-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.site-description {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 页面底部 */
.page-footer {
  margin-top: 60px;
  padding: 40px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border-top: 3px solid #3498db;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 30px;
}

.footer-info h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.footer-info p {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-link {
  display: flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  background: white;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.footer-link:hover {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.footer-link svg {
  margin-right: 6px;
  transition: transform 0.3s ease;
}

.footer-link:hover svg {
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  color: #7f8c8d;
  font-size: 13px;
  margin: 5px 0;
  line-height: 1.4;
}

.footer-bottom a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-bottom a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.footer-tech {
  font-size: 12px !important;
  opacity: 0.8;
}

/* ========================================
   响应式设计 - 多断点适配
   ======================================== */

/* 超大屏幕 (1920px+) */
@media (min-width: 1920px) {
  .main-content {
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }

  .sites-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
  }

  .site-card {
    padding: 20px;
  }

  .category-title {
    font-size: 36px;
  }
}

/* 大屏幕 (1440px - 1919px) */
@media (min-width: 1440px) and (max-width: 1919px) {
  .sites-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .content-area {
    padding: 40px 60px;
  }
}

/* 中等屏幕 (1024px - 1439px) */
@media (min-width: 1024px) and (max-width: 1439px) {
  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .content-area {
    padding: 35px 40px;
  }

  .sidebar {
    width: 220px;
  }

  .main-content {
    margin-left: 220px;
  }

  .contact-btn {
    width: 34px;
    height: 34px;
  }

  .contact-btn svg {
    width: 16px;
    height: 16px;
  }
}

/* 平板横屏 (769px - 1023px) */
@media (min-width: 769px) and (max-width: 1023px) {
  .sidebar {
    width: 200px;
  }

  .main-content {
    margin-left: 200px;
  }

  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .content-area {
    padding: 30px 25px;
  }

  .site-card {
    padding: 14px;
  }

  .category-title {
    font-size: 26px;
  }

  .search-container {
    max-width: 650px;
  }
}

/* 平板竖屏和小屏幕 (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .nav-home {
    flex-direction: column;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    flex: 1;
    height: 100vh;
    height: 100svh;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .search-header {
    padding: 15px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* 平板联系按钮样式 */
  .contact-btn {
    width: 34px;
    height: 34px;
  }

  .contact-btn svg {
    width: 16px;
    height: 16px;
  }

  .content-area {
    flex: 1;
    padding: 20px 20px;
    padding-top: 100px;
    padding-bottom: 300px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .inline-social {
    display: none; /* 平板上隐藏内嵌社交图标，使用顶部的 */
  }

  .mobile-menu-btn {
    display: block;
    flex-shrink: 0;
  }

  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .site-card {
    padding: 14px;
  }

  .site-card .site-name {
    font-size: 15px;
  }

  .site-card .site-description {
    font-size: 12px;
  }

  .category-title {
    font-size: 26px;
    margin-bottom: 20px;
  }

  .search-container {
    max-width: 100%;
  }
}

/* 手机屏幕 (320px - 480px) */
@media (max-width: 480px) {
  .nav-home {
    flex-direction: column;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    flex: 1;
    height: 100vh;
    height: 100svh;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .search-header {
    padding: 12px 15px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    gap: 10px;
  }

  /* 移动端联系按钮样式 */
  .contact-btn {
    width: 32px;
    height: 32px;
  }

  .contact-btn svg {
    width: 15px;
    height: 15px;
  }

  .header-toolbar {
    gap: 6px;
  }

  /* 移动端弹出层优化 */
  .contact-popup {
    padding: 25px 20px;
    max-width: 340px;
  }

  .contact-popup-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .contact-links-grid {
    gap: 12px;
  }

  .contact-link-item {
    padding: 18px 12px;
  }

  .contact-link-icon {
    width: 44px;
    height: 44px;
  }

  .contact-link-text {
    font-size: 13px;
  }

  .content-area {
    flex: 1;
    padding: 15px 12px;
    padding-top: 95px;
    padding-bottom: 300px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .inline-social {
    display: none; /* 移动端隐藏内嵌社交图标，使用顶部的 */
  }

  .mobile-menu-btn {
    display: block;
    flex-shrink: 0;
  }

  .sites-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .site-card {
    padding: 10px;
    flex-direction: column;
    text-align: center;
  }

  .site-card .site-icon {
    margin-right: 0;
    margin-bottom: 6px;
    width: 36px;
    height: 36px;
  }

  .site-card .site-name {
    font-size: 14px;
  }

  .site-card .site-description {
    font-size: 11px;
    display: none; /* 小屏幕隐藏描述 */
  }

  .category-title {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .category-title .category-icon {
    font-size: 24px;
    margin-right: 8px;
  }

  .category-title .category-name {
    font-size: 18px;
  }

  /* 移动端页面底部 */
  .page-footer {
    margin-top: 30px;
    padding: 25px 15px;
  }

  .footer-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }

  .footer-bottom {
    padding-top: 12px;
  }

  .footer-bottom p {
    font-size: 11px;
  }

  /* 搜索框优化 */
  .search-container {
    margin: 0;
    max-width: none;
  }

  .search-engines {
    gap: 8px;
  }

  .engine-btn {
    padding: 6px 10px;
    font-size: 13px;
  }

  .engine-btn img {
    width: 16px;
    height: 16px;
  }

  .search-input-wrapper input {
    font-size: 14px;
    padding: 12px 45px 12px 15px;
  }

  .search-btn {
    width: 36px;
    height: 36px;
  }
}

/* 超小屏幕 (< 360px) */
@media (max-width: 359px) {
  .sites-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .site-card {
    padding: 12px;
    flex-direction: row;
    text-align: left;
  }

  .site-card .site-icon {
    margin-right: 10px;
    margin-bottom: 0;
  }

  .category-title {
    font-size: 18px;
  }

  .search-engines {
    flex-wrap: wrap;
    gap: 6px;
  }

  .engine-btn {
    padding: 5px 8px;
    font-size: 12px;
  }

  .mobile-menu {
    width: 100%;
  }

  .mobile-social-links {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .mobile-social-link {
    width: 40px;
    height: 40px;
  }
}

/* 平板和小屏幕的移动端菜单优化 */
@media (min-width: 481px) and (max-width: 768px) {
  .mobile-menu {
    width: 280px;
  }

  .mobile-category-item {
    padding: 18px 24px;
  }

  .mobile-category-item .category-icon {
    font-size: 22px;
  }

  .mobile-category-item .category-name {
    font-size: 17px;
  }
}

/* 横屏模式优化 */
@media (max-height: 600px) and (orientation: landscape) {
  .content-area {
    padding-top: 85px;
  }

  .search-header {
    padding: 10px 15px;
  }

  .category-title {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .sites-grid {
    gap: 10px;
  }

  .site-card {
    padding: 10px;
  }

  .mobile-menu-header {
    padding: 12px 20px;
  }

  .mobile-category-item {
    padding: 12px 20px;
  }
}

/* ========================================
   触摸设备优化
   ======================================== */
@media (hover: none) and (pointer: coarse) {
  /* 增大可点击区域 */
  .site-card {
    min-height: 80px;
  }

  .mobile-category-item {
    min-height: 56px;
  }

  .engine-btn {
    min-height: 40px;
    min-width: 60px;
  }

  /* 移除 hover 效果，使用 active 状态 */
  .site-card:hover {
    transform: none;
  }

  .site-card:active {
    transform: scale(0.98);
    background: #f8f9fa;
  }

  .mobile-category-item:hover {
    background: transparent;
  }

  .mobile-category-item:active {
    background: #f0f0f0;
  }

  /* 优化按钮触摸反馈 */
  .search-btn:active,
  .theme-toggle-btn:active,
  .mobile-menu-btn:active {
    transform: scale(0.95);
  }
}

/* ========================================
   打印样式
   ======================================== */
@media print {
  .sidebar,
  .search-header,
  .mobile-menu,
  .mobile-menu-btn,
  .theme-toggle-btn,
  .page-footer {
    display: none !important;
  }

  .main-content {
    margin-left: 0;
  }

  .content-area {
    padding: 20px;
  }

  .site-card {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .category-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

/* ========================================
   高对比度模式支持
   ======================================== */
@media (prefers-contrast: high) {
  .site-card {
    border: 2px solid currentColor;
  }

  .engine-btn {
    border: 2px solid currentColor;
  }

  .search-input-wrapper {
    border: 2px solid currentColor;
  }
}

/* ========================================
   减少动画模式（无障碍支持）
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .mobile-menu {
    transition: none;
  }

  .site-card:hover {
    transform: none;
  }
}

/* 礼物按钮样式 - 玻璃透明效果 */
.gift-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.gift-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.gift-btn:hover::before {
  width: 100px;
  height: 100px;
}

.gift-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.gift-icon {
  font-size: 20px;
  animation: giftShake 2s infinite;
  display: block;
}

@keyframes giftShake {
  0%, 100% { transform: rotate(0deg); }
  10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
  20%, 40%, 60%, 80% { transform: rotate(10deg); }
}

/* 主题切换按钮样式 */
.theme-toggle-btn {
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.theme-toggle-btn:hover {
  background: #f8f9fa;
  transform: scale(1.1);
}

/* 暗色模式样式 */
.dark .nav-home {
  background-color: #1a1a1a;
}

.dark .sidebar {
  background-color: #1e293b;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

.dark .search-header {
  background: #1e293b;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dark .contact-btn {
  background: #334155;
  color: #94a3b8;
}

.dark .contact-btn:hover {
  background: #475569;
  color: #e2e8f0;
}

.dark .contact-popup {
  background: #1e293b;
}

.dark .contact-popup-title {
  color: #f1f5f9;
}

.dark .contact-popup-close {
  color: #94a3b8;
}

.dark .contact-popup-close:hover {
  background: #334155;
  color: #e2e8f0;
}

.dark .contact-link-item {
  background: #0f172a;
}

.dark .contact-link-item:hover {
  background: #1e293b;
}

.dark .contact-link-text {
  color: #cbd5e1;
}

.dark .gift-btn {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.4);
}

.dark .gift-btn:hover {
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.6);
}

.dark .theme-toggle-btn {
  color: #e2e8f0;
}

.dark .theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark .inline-social-link {
  background: #334155;
  color: #94a3b8;
}

.dark .inline-social-link:hover {
  background: #475569;
  color: #60a5fa;
}

.dark .mobile-menu-btn {
  color: #e2e8f0;
}

.dark .mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark .search-container {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dark .search-engine-selector {
  background: #374151;
  border-right: 1px solid #4b5563;
}

.dark .search-engine-selector:hover {
  background: #4b5563;
}

.dark .search-input {
  background: #374151;
  color: #e2e8f0;
  border: none;
}

.dark .search-input::placeholder {
  color: #9ca3af;
}

.dark .engine-select {
  background: #374151;
  color: #e2e8f0;
}

.dark .engine-select option {
  background: #374151;
  color: #e2e8f0;
}

.dark .content-area {
  background: #1a1a1a;
}

.dark .site-card {
  background: #374151;
  border: 1px solid #4b5563;
  color: #e2e8f0;
}

.dark .site-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.dark .site-card::before {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
}

.dark .site-name {
  color: #e2e8f0;
}

.dark .site-description {
  color: #9ca3af;
}

.dark .site-icon {
  background: #4b5563;
}

.dark .category-title {
  color: #e2e8f0;
}

.dark .mobile-menu {
  background: #1e293b;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
}

.dark .mobile-category-item {
  border-bottom: 1px solid #374151;
}

.dark .mobile-category-item:hover {
  background: #374151;
}

.dark .mobile-category-item .category-name {
  color: #e2e8f0;
}

.dark .mobile-gift-section {
  border-bottom: 1px solid #334155;
}

.dark .mobile-gift-btn {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
}

.dark .mobile-social-footer {
  background: #0f172a;
  border-top: 1px solid #334155;
}

.dark .mobile-social-link {
  background: #1e293b;
  color: #94a3b8;
}

.dark .mobile-social-link:hover {
  background: #3b82f6;
  color: white;
}

.dark .page-footer {
  background: linear-gradient(135deg, #1e293b 0%, #374151 100%);
  border-top: 3px solid #3b82f6;
}

.dark .footer-info h3 {
  color: #e2e8f0;
}

.dark .footer-info p {
  color: #9ca3af;
}

.dark .footer-link {
  background: #374151;
  border: 1px solid #4b5563;
  color: #3b82f6;
}

.dark .footer-link:hover {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.dark .footer-bottom p {
  color: #9ca3af;
}

.dark .footer-bottom a {
  color: #3b82f6;
}

.dark .footer-bottom a:hover {
  color: #60a5fa;
}

.dark .loading,
.dark .error {
  color: #9ca3af;
}

.dark .retry-btn {
  background: #3b82f6;
  color: white;
}

.dark .retry-btn:hover {
  background: #2563eb;
}

/* 锁定界面暗色模式 */
.dark .lock-container {
  background: #0f172a;
}

.dark .lock-box {
  background: #1e293b;
  color: #e2e8f0;
}

.dark .lock-box h1 {
  color: #e2e8f0;
}

.dark .lock-description {
  color: #94a3b8;
}

.dark .lock-box .form-group label {
  color: #cbd5e1;
}

.dark .lock-box .form-input {
  background: #374151;
  border: 2px solid #4b5563;
  color: #e2e8f0;
}

.dark .lock-box .form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .unlock-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.dark .unlock-btn:hover:not(:disabled) {
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

/* QQ二维码模态框样式 - 方案4：标签页切换式 */
.qq-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.qq-modal {
  background: white;
  border-radius: 16px;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.qq-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s ease;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qq-modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1f2937;
  transform: rotate(90deg);
}

.qq-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.qq-tab-btn {
  padding: 16px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #6b7280;
  font-weight: 500;
  font-size: 15px;
}

.qq-tab-btn:hover {
  background: rgba(102, 126, 234, 0.05);
  color: #667eea;
}

.qq-tab-btn.active {
  background: white;
  border-bottom-color: #667eea;
  color: #667eea;
}

.qq-content {
  padding: 35px 30px;
}

.qq-qr-wrapper {
  text-align: center;
}

.qq-qr-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 12px;
  margin: 0 auto 20px;
  display: block;
  background: white;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.qq-qr-desc {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
  font-weight: 500;
}

/* 标签页切换动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
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

.modal-enter-active .qq-modal,
.modal-leave-active .qq-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .qq-modal,
.modal-leave-to .qq-modal {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

/* 暗色模式 */
.dark .qq-modal {
  background: #1e293b;
}

.dark .qq-tabs {
  background: #0f172a;
  border-bottom-color: #334155;
}

.dark .qq-tab-btn {
  color: #94a3b8;
}

.dark .qq-tab-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #a5b4fc;
}

.dark .qq-tab-btn.active {
  background: #1e293b;
  border-bottom-color: #667eea;
  color: #a5b4fc;
}

.dark .qq-modal-close {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.dark .qq-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.dark .qq-qr-desc {
  color: #cbd5e1;
}

.dark .qq-qr-image {
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

/* QQ模态框响应式 - 平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  .qq-modal {
    max-width: 480px;
  }

  .qq-content {
    padding: 30px 25px;
  }
}

/* QQ模态框响应式 - 手机 */
@media (max-width: 640px) {
  .qq-modal {
    max-width: 100%;
    width: calc(100% - 30px);
    margin: 0 15px;
  }

  .qq-content {
    padding: 25px 20px;
  }

  .qq-qr-image {
    max-width: 100%;
  }

  .qq-tab-btn {
    padding: 14px 12px;
    font-size: 14px;
    gap: 6px;
  }

  .qq-tab-btn svg {
    width: 14px;
    height: 14px;
  }

  .qq-modal-close {
    width: 28px;
    height: 28px;
    top: 10px;
    right: 10px;
    font-size: 18px;
  }

  .qq-qr-desc {
    font-size: 14px;
  }
}

/* QQ模态框响应式 - 超小屏幕 */
@media (max-width: 380px) {
  .qq-modal {
    width: calc(100% - 20px);
    margin: 0 10px;
  }

  .qq-content {
    padding: 20px 15px;
  }

  .qq-tab-btn {
    padding: 12px 10px;
    font-size: 13px;
    gap: 4px;
  }

  .qq-tab-btn svg {
    width: 12px;
    height: 12px;
  }

  .qq-qr-desc {
    font-size: 13px;
  }
}
</style>
