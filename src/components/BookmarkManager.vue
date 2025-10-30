<template>
  <div class="bookmark-manager">
    <div class="manager-header">
      <h2>📚 书签管理</h2>
      <p>导入导出你的导航数据</p>
    </div>

    <div class="manager-actions">
      <!-- 导入区域 -->
      <div class="action-card">
        <div class="card-icon">📥</div>
        <h3>导入书签</h3>
        <p>从浏览器或文件导入书签</p>
        
        <div class="import-options">
          <button @click="triggerFileImport('json')" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 18C5.17107 18.4117 4 19.0443 4 19.7537C4 20.9943 7.58172 22 12 22C16.4183 22 20 20.9943 20 19.7537C20 19.0443 18.8289 18.4117 17 18M12 15V3M12 15L8 11M12 15L16 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            导入 JSON
          </button>
          
          <button @click="triggerFileImport('html')" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 18C5.17107 18.4117 4 19.0443 4 19.7537C4 20.9943 7.58172 22 12 22C16.4183 22 20 20.9943 20 19.7537C20 19.0443 18.8289 18.4117 17 18M12 15V3M12 15L8 11M12 15L16 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            导入浏览器书签
          </button>
        </div>
        
        <input
          ref="fileInput"
          type="file"
          :accept="importFileType === 'json' ? '.json' : '.html'"
          @change="handleFileImport"
          style="display: none"
        />
      </div>

      <!-- 导出区域 -->
      <div class="action-card">
        <div class="card-icon">📤</div>
        <h3>导出书签</h3>
        <p>备份你的导航数据</p>
        
        <div class="export-options">
          <button @click="exportAsJSON" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 6C5.17107 5.58835 4 4.95563 4 4.24626C4 3.00574 7.58172 2 12 2C16.4183 2 20 3.00574 20 4.24626C20 4.95563 18.8289 5.58835 17 6M12 9V21M12 9L8 13M12 9L16 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            导出为 JSON
          </button>
          
          <button @click="exportAsHTML" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 6C5.17107 5.58835 4 4.95563 4 4.24626C4 3.00574 7.58172 2 12 2C16.4183 2 20 3.00574 20 4.24626C20 4.95563 18.8289 5.58835 17 6M12 9V21M12 9L8 13M12 9L16 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            导出为浏览器书签
          </button>
          
          <button @click="exportAsMarkdown" class="action-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 6C5.17107 5.58835 4 4.95563 4 4.24626C4 3.00574 7.58172 2 12 2C16.4183 2 20 3.00574 20 4.24626C20 4.95563 18.8289 5.58835 17 6M12 9V21M12 9L8 13M12 9L16 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            导出为 Markdown
          </button>
        </div>
      </div>
    </div>

    <!-- 导入结果提示 -->
    <div v-if="importResult" class="result-message" :class="importResult.type">
      <svg v-if="importResult.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span>{{ importResult.message }}</span>
      <button @click="importResult = null" class="close-btn">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['import-data'])

const fileInput = ref(null)
const importFileType = ref('json')
const importResult = ref(null)

// 触发文件选择
const triggerFileImport = (type) => {
  importFileType.value = type
  fileInput.value?.click()
}

// 处理文件导入
const handleFileImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    
    if (importFileType.value === 'json') {
      const data = JSON.parse(text)
      emit('import-data', data)
      importResult.value = {
        type: 'success',
        message: `成功导入 ${data.categories?.length || 0} 个分类`
      }
    } else if (importFileType.value === 'html') {
      const data = parseHTMLBookmarks(text)
      emit('import-data', data)
      importResult.value = {
        type: 'success',
        message: `成功导入 ${data.categories?.length || 0} 个分类`
      }
    }
  } catch (error) {
    importResult.value = {
      type: 'error',
      message: '导入失败：' + error.message
    }
  }
  
  // 清空文件输入
  event.target.value = ''
}

// 解析 HTML 书签文件
const parseHTMLBookmarks = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const categories = []
  
  // 查找所有 DT 元素（书签文件夹）
  const folders = doc.querySelectorAll('DL > DT')
  
  folders.forEach((folder, index) => {
    const h3 = folder.querySelector('H3')
    if (!h3) return
    
    const categoryName = h3.textContent.trim()
    const sites = []
    
    // 查找该文件夹下的所有链接
    const dl = folder.querySelector('DL')
    if (dl) {
      const links = dl.querySelectorAll('DT > A')
      links.forEach((link) => {
        sites.push({
          id: `imported-${Date.now()}-${Math.random()}`,
          name: link.textContent.trim(),
          url: link.getAttribute('HREF') || '',
          description: '',
          icon: `${new URL(link.getAttribute('HREF') || '').origin}/favicon.ico`
        })
      })
    }
    
    if (sites.length > 0) {
      categories.push({
        id: `category-${Date.now()}-${index}`,
        name: categoryName,
        icon: '📁',
        order: index,
        sites
      })
    }
  })
  
  return { categories, title: 'Eckes导航' }
}

// 导出为 JSON
const exportAsJSON = () => {
  const data = {
    title: 'Eckes导航',
    categories: props.categories,
    exportTime: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  downloadFile(blob, `eckes-nav-${Date.now()}.json`)
}

// 导出为 HTML（浏览器书签格式）
const exportAsHTML = () => {
  let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Eckes导航</TITLE>
<H1>Eckes导航</H1>
<DL><p>
`

  props.categories.forEach(category => {
    html += `    <DT><H3>${category.name}</H3>\n`
    html += `    <DL><p>\n`
    
    category.sites?.forEach(site => {
      html += `        <DT><A HREF="${site.url}">${site.name}</A>\n`
    })
    
    html += `    </DL><p>\n`
  })

  html += `</DL><p>`
  
  const blob = new Blob([html], { type: 'text/html' })
  downloadFile(blob, `eckes-nav-bookmarks-${Date.now()}.html`)
}

// 导出为 Markdown
const exportAsMarkdown = () => {
  let markdown = `# Eckes导航\n\n`
  markdown += `> 导出时间：${new Date().toLocaleString('zh-CN')}\n\n`
  
  props.categories.forEach(category => {
    markdown += `## ${category.icon} ${category.name}\n\n`
    
    category.sites?.forEach(site => {
      markdown += `- [${site.name}](${site.url})`
      if (site.description) {
        markdown += ` - ${site.description}`
      }
      markdown += `\n`
    })
    
    markdown += `\n`
  })
  
  const blob = new Blob([markdown], { type: 'text/markdown' })
  downloadFile(blob, `eckes-nav-${Date.now()}.md`)
}

// 下载文件
const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.bookmark-manager {
  padding: 20px;
}

.manager-header {
  text-align: center;
  margin-bottom: 30px;
}

.manager-header h2 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 8px;
}

.manager-header p {
  color: #6b7280;
  font-size: 14px;
}

.manager-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.action-card h3 {
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 8px;
}

.action-card p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 20px;
}

.import-options,
.export-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}

.result-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
}

.result-message.success {
  background: #d1fae5;
  color: #065f46;
}

.result-message.error {
  background: #fee2e2;
  color: #991b1b;
}

.result-message svg {
  flex-shrink: 0;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

/* 暗色模式 */
:deep(.dark) .manager-header h2 {
  color: #e2e8f0;
}

:deep(.dark) .action-card {
  background: #1e293b;
}

:deep(.dark) .action-card h3 {
  color: #e2e8f0;
}

@media (max-width: 768px) {
  .manager-actions {
    grid-template-columns: 1fr;
  }
}
</style>

