/**
 * 网站访问统计工具
 */

const STATS_KEY = 'site_stats'
const RECENT_VISITS_KEY = 'recent_visits'
const MAX_RECENT_VISITS = 20

/**
 * 记录网站访问
 * @param {Object} site - 网站对象
 */
export function recordVisit(site) {
  if (!site || !site.id) return

  // 更新访问统计
  updateStats(site.id)
  
  // 更新最近访问
  updateRecentVisits(site)
}

/**
 * 更新访问统计
 * @param {string} siteId - 网站ID
 */
function updateStats(siteId) {
  try {
    const stats = getStats()
    stats[siteId] = (stats[siteId] || 0) + 1
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch (error) {
    console.error('更新访问统计失败:', error)
  }
}

/**
 * 获取访问统计
 * @returns {Object} 统计数据
 */
export function getStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
  } catch {
    return {}
  }
}

/**
 * 获取网站访问次数
 * @param {string} siteId - 网站ID
 * @returns {number} 访问次数
 */
export function getVisitCount(siteId) {
  const stats = getStats()
  return stats[siteId] || 0
}

/**
 * 更新最近访问
 * @param {Object} site - 网站对象
 */
function updateRecentVisits(site) {
  try {
    let visits = getRecentVisits()
    
    // 移除已存在的相同网站
    visits = visits.filter(v => v.id !== site.id)
    
    // 添加到开头
    visits.unshift({
      id: site.id,
      name: site.name,
      url: site.url,
      icon: site.icon,
      description: site.description,
      timestamp: Date.now()
    })
    
    // 限制数量
    visits = visits.slice(0, MAX_RECENT_VISITS)
    
    localStorage.setItem(RECENT_VISITS_KEY, JSON.stringify(visits))
  } catch (error) {
    console.error('更新最近访问失败:', error)
  }
}

/**
 * 获取最近访问
 * @returns {Array} 最近访问的网站列表
 */
export function getRecentVisits() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_VISITS_KEY) || '[]')
  } catch {
    return []
  }
}

/**
 * 获取热门网站
 * @param {Array} categories - 分类数据
 * @param {number} limit - 返回数量限制
 * @returns {Array} 热门网站列表
 */
export function getPopularSites(categories, limit = 10) {
  const stats = getStats()
  const sites = []
  
  categories.forEach(category => {
    category.sites?.forEach(site => {
      const visits = stats[site.id] || 0
      if (visits > 0) {
        sites.push({
          ...site,
          visits,
          categoryName: category.name,
          categoryIcon: category.icon
        })
      }
    })
  })
  
  return sites
    .sort((a, b) => b.visits - a.visits)
    .slice(0, limit)
}

/**
 * 获取分类统计
 * @param {Array} categories - 分类数据
 * @returns {Array} 分类统计数据
 */
export function getCategoryStats(categories) {
  const stats = getStats()
  
  return categories.map(category => {
    let totalVisits = 0
    category.sites?.forEach(site => {
      totalVisits += stats[site.id] || 0
    })
    
    return {
      id: category.id,
      name: category.name,
      icon: category.icon,
      visits: totalVisits,
      siteCount: category.sites?.length || 0
    }
  }).sort((a, b) => b.visits - a.visits)
}

/**
 * 清除统计数据
 */
export function clearStats() {
  try {
    localStorage.removeItem(STATS_KEY)
    localStorage.removeItem(RECENT_VISITS_KEY)
  } catch (error) {
    console.error('清除统计数据失败:', error)
  }
}

/**
 * 导出统计数据
 * @returns {Object} 统计数据
 */
export function exportStats() {
  return {
    stats: getStats(),
    recentVisits: getRecentVisits(),
    exportTime: new Date().toISOString()
  }
}

/**
 * 导入统计数据
 * @param {Object} data - 统计数据
 */
export function importStats(data) {
  try {
    if (data.stats) {
      localStorage.setItem(STATS_KEY, JSON.stringify(data.stats))
    }
    if (data.recentVisits) {
      localStorage.setItem(RECENT_VISITS_KEY, JSON.stringify(data.recentVisits))
    }
  } catch (error) {
    console.error('导入统计数据失败:', error)
  }
}

/**
 * 获取访问趋势数据（按天统计）
 * @param {number} days - 天数
 * @returns {Array} 趋势数据
 */
export function getVisitTrend(days = 7) {
  // 这里简化实现，实际需要记录每次访问的时间戳
  // 可以在后续版本中增强
  const visits = getRecentVisits()
  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  
  const trend = []
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = now - i * oneDayMs
    const dayEnd = dayStart + oneDayMs
    
    const count = visits.filter(v => 
      v.timestamp >= dayStart && v.timestamp < dayEnd
    ).length
    
    const date = new Date(dayStart)
    trend.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      count
    })
  }
  
  return trend
}

