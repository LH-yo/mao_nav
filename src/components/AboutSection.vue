<template>
  <div class="about-section">
    <div class="about-header">
      <img src="/logo.png" alt="Eckes Nav" class="about-logo" />
      <h2>Eckes导航</h2>
      <p class="version">版本 2.0.0</p>
    </div>

    <div class="about-content">
      <!-- 项目介绍 -->
      <div class="info-card">
        <h3>📖 项目介绍</h3>
        <p>
          Eckes导航是一个简洁美观的个人导航网站，支持分类管理、自定义收藏夹、
          智能搜索、数据统计等功能。采用现代化的设计理念，提供流畅的用户体验。
        </p>
      </div>

      <!-- 功能特性 -->
      <div class="info-card">
        <h3>✨ 功能特性</h3>
        <ul class="feature-list">
          <li>🔍 智能全局搜索（支持快捷键 Ctrl+K）</li>
          <li>📊 访问统计与数据分析</li>
          <li>📱 PWA 支持，可安装到桌面</li>
          <li>🎨 多主题定制，个性化外观</li>
          <li>📚 书签导入导出（支持浏览器书签格式）</li>
          <li>🌙 深色模式支持</li>
          <li>📲 完美适配移动端</li>
          <li>⚡ 离线访问支持</li>
          <li>🔐 数据本地存储，保护隐私</li>
        </ul>
      </div>

      <!-- 技术栈 -->
      <div class="info-card">
        <h3>🛠️ 技术栈</h3>
        <div class="tech-stack">
          <span class="tech-tag">Vue 3</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">Pinia</span>
          <span class="tech-tag">Vue Router</span>
          <span class="tech-tag">PWA</span>
          <span class="tech-tag">Service Worker</span>
          <span class="tech-tag">LocalStorage</span>
        </div>
      </div>

      <!-- 更新日志 -->
      <div class="info-card">
        <h3>📝 更新日志</h3>
        <div class="changelog">
          <div class="changelog-item">
            <div class="changelog-version">v2.0.0</div>
            <div class="changelog-date">2024-01-XX</div>
            <ul>
              <li>✨ 新增全局智能搜索功能</li>
              <li>📊 新增访问统计与数据分析</li>
              <li>📱 新增 PWA 支持</li>
              <li>🎨 新增主题定制功能</li>
              <li>📚 新增书签导入导出</li>
              <li>⚡ 优化性能和用户体验</li>
            </ul>
          </div>
          
          <div class="changelog-item">
            <div class="changelog-version">v1.0.0</div>
            <div class="changelog-date">2023-XX-XX</div>
            <ul>
              <li>🎉 项目初始版本发布</li>
              <li>📁 基础分类管理功能</li>
              <li>🔗 网站收藏与管理</li>
              <li>🌙 深色模式支持</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="info-card">
        <h3>📬 联系方式</h3>
        <div class="contact-links">
          <a href="https://github.com/LH-yo/mao_nav" target="_blank" class="contact-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          
          <a href="https://space.bilibili.com/" target="_blank" class="contact-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
            </svg>
            哔哩哔哩
          </a>
          
          <a href="mailto:your-email@example.com" class="contact-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            邮箱
          </a>
        </div>
      </div>

      <!-- 许可证 -->
      <div class="info-card">
        <h3>📄 开源许可</h3>
        <p>本项目采用 MIT 许可证开源，欢迎使用和贡献代码。</p>
        <p class="copyright">© 2024 Eckes Nav. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.about-section {
  padding: 20px;
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
}

.about-logo {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-header h2 {
  font-size: 28px;
  color: #1f2937;
  margin-bottom: 8px;
}

.version {
  color: #6b7280;
  font-size: 14px;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 12px;
}

.info-card p {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 8px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 8px 0;
  color: #374151;
  font-size: 14px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  padding: 6px 12px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}

.changelog {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.changelog-item {
  border-left: 3px solid #3b82f6;
  padding-left: 16px;
}

.changelog-version {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.changelog-date {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
}

.changelog-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.changelog-item li {
  padding: 4px 0;
  color: #374151;
  font-size: 14px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.contact-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}

.copyright {
  margin-top: 12px;
  font-size: 13px;
  color: #9ca3af;
  text-align: center;
}

/* 暗色模式 */
:deep(.dark) .about-header h2 {
  color: #e2e8f0;
}

:deep(.dark) .info-card {
  background: #1e293b;
}

:deep(.dark) .info-card h3 {
  color: #e2e8f0;
}

:deep(.dark) .info-card p,
:deep(.dark) .feature-list li,
:deep(.dark) .changelog-item li {
  color: #cbd5e1;
}

:deep(.dark) .tech-tag {
  background: #1e3a8a;
  color: #93c5fd;
}

:deep(.dark) .changelog-version {
  color: #e2e8f0;
}

:deep(.dark) .contact-link {
  background: #334155;
  color: #e2e8f0;
}

:deep(.dark) .contact-link:hover {
  background: #3b82f6;
  color: white;
}
</style>

