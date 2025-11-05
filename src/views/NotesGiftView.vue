<template>
  <div class="notes-gift-container">
    <!-- 返回按钮 -->
    <button class="back-button" @click="goBack" title="返回首页">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="back-text">返回</span>
    </button>

    <!-- 控制面板 -->
    <div v-if="!showModal" class="control-panel">
      <!-- 暂停/继续按钮 -->
      <button class="control-btn" @click="togglePause" :title="isPaused ? '继续' : '暂停'">
        <span v-if="isPaused">▶️</span>
        <span v-else>⏸️</span>
      </button>

      <!-- 随机/顺序按钮 -->
      <button class="control-btn" @click="toggleRandom" :title="isRandom ? '顺序播放' : '随机播放'">
        <span v-if="isRandom">🔀</span>
        <span v-else>📋</span>
      </button>

      <!-- 音乐按钮 -->
      <button class="control-btn" @click="toggleMusic" :title="isMusicPlaying ? '关闭音乐' : '播放音乐'">
        <span v-if="isMusicPlaying">🔊</span>
        <span v-else>🔇</span>
      </button>

      <!-- 设置按钮 -->
      <button class="control-btn" @click="showSettings = true" title="自定义设置">
        <span>⚙️</span>
      </button>

      <!-- 倒计时显示 -->
      <div v-if="countdown > 0" class="countdown">
        ⏱️ {{ formatTime(countdown) }}
      </div>
    </div>

    <!-- 自定义设置弹窗 -->
    <Transition name="modal-fade">
      <div v-if="showSettings" class="modal-overlay" @click="showSettings = false">
        <div class="settings-modal" @click.stop>
          <h2 class="settings-title">⚙️ 自定义设置</h2>

          <div class="settings-content">
            <!-- 速度设置 -->
            <div class="setting-group">
              <label class="setting-label">🚀 飘动速度（秒）</label>
              <input
                type="range"
                v-model.number="customSettings.speed"
                min="2"
                max="10"
                step="0.5"
                class="setting-slider"
              />
              <span class="setting-value">{{ customSettings.speed }}秒</span>
            </div>

            <!-- 生成间隔 -->
            <div class="setting-group">
              <label class="setting-label">⏱️ 生成间隔（毫秒）</label>
              <input
                type="range"
                v-model.number="customSettings.interval"
                min="100"
                max="1000"
                step="50"
                class="setting-slider"
              />
              <span class="setting-value">{{ customSettings.interval }}ms</span>
            </div>

            <!-- 每次数量 -->
            <div class="setting-group">
              <label class="setting-label">🎯 每次生成数量</label>
              <input
                type="range"
                v-model.number="customSettings.count"
                min="1"
                max="5"
                step="1"
                class="setting-slider"
              />
              <span class="setting-value">{{ customSettings.count }}个</span>
            </div>

            <!-- 自定义文字 -->
            <div class="setting-group">
              <label class="setting-label">✏️ 自定义文字（每行一条）</label>
              <textarea
                v-model="customSettings.customTexts"
                class="setting-textarea"
                placeholder="输入自定义文字，每行一条&#10;例如：&#10;我爱你&#10;想你了&#10;保持开心"
                rows="6"
              ></textarea>
              <div class="setting-hint">
                {{ customTextCount }}条自定义文字
              </div>
            </div>

            <!-- 使用自定义文字 -->
            <div class="setting-group">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  v-model="customSettings.useCustomTexts"
                />
                <span>使用自定义文字（否则使用默认80条）</span>
              </label>
            </div>
          </div>

          <div class="settings-buttons">
            <button class="settings-btn settings-btn-reset" @click="resetSettings">
              🔄 恢复默认
            </button>
            <button class="settings-btn settings-btn-apply" @click="applySettings">
              ✅ 应用设置
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 初始弹窗 -->
    <Transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-icon">🎁</div>
          <h2 class="modal-title">你收到一份神秘礼物</h2>

          <!-- 倒计时设置 -->
          <div class="timer-setting">
            <label>⏱️ 定时停止（分钟）：</label>
            <input
              type="number"
              v-model.number="timerMinutes"
              min="0"
              max="60"
              placeholder="0 = 无限"
            />
          </div>

          <button class="modal-button" @click="startAnimation">开始</button>
        </div>
      </div>
    </Transition>

    <!-- 便签容器 -->
    <div class="notes-container">
      <TransitionGroup name="note">
        <div
          v-for="note in activeNotes"
          :key="note.id"
          class="note-card"
          :style="{
            left: note.left,
            backgroundColor: note.color,
            animationDuration: note.duration,
            animationDelay: note.delay
          }"
        >
          <span class="note-emoji">{{ note.emoji }}</span>
          <span class="note-text">{{ note.text }}</span>
        </div>
      </TransitionGroup>
    </div>

    <!-- 背景音乐 -->
    <audio ref="bgMusic" loop>
      <source src="/background-music.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// 路由
const router = useRouter()

// 状态管理
const showModal = ref(true)
const activeNotes = ref([])
const isPaused = ref(false)
const isRandom = ref(false)
const isMusicPlaying = ref(false)
const timerMinutes = ref(0)
const countdown = ref(0)
const bgMusic = ref(null)
const showSettings = ref(false)

// 自定义设置
const customSettings = ref({
  speed: 6,           // 飘动速度（秒）
  interval: 250,      // 生成间隔（毫秒）
  count: 2,           // 每次生成数量
  customTexts: '',    // 自定义文字
  useCustomTexts: false  // 是否使用自定义文字
})

// 默认设置（用于恢复）
const defaultSettings = {
  speed: 6,
  interval: 250,
  count: 2,
  customTexts: '',
  useCustomTexts: false
}

let noteIdCounter = 0
let uniqueIdCounter = 0
let intervalId = null
let countdownId = null
let usedPositions = [] // 记录已使用的位置

// 计算自定义文字数量
const customTextCount = computed(() => {
  if (!customSettings.value.customTexts) return 0
  return customSettings.value.customTexts.split('\n').filter(line => line.trim()).length
})

// 获取当前使用的便签数据
const getCurrentNotesData = () => {
  if (customSettings.value.useCustomTexts && customTextCount.value > 0) {
    // 使用自定义文字
    const lines = customSettings.value.customTexts.split('\n').filter(line => line.trim())
    return lines.map(text => ({
      emoji: getRandomEmoji(),
      text: text.trim()
    }))
  }
  // 使用默认数据
  return notesData
}

// 随机获取emoji
const getRandomEmoji = () => {
  const emojis = ['❤️', '😊', '💕', '🥰', '✨', '💖', '🌟', '😘', '💝', '🌈', '🎈', '💗', '🌸', '🎀', '💐', '🌺', '🦋', '🌻', '🎁', '🍀']
  return emojis[Math.floor(Math.random() * emojis.length)]
}

// 返回首页
const goBack = () => {
  router.push('/')
}

// 恢复默认设置
const resetSettings = () => {
  customSettings.value = { ...defaultSettings }
}

// 应用设置
const applySettings = () => {
  showSettings.value = false
  // 重启动画以应用新设置
  if (intervalId) {
    stopAnimation()
    setTimeout(() => {
      startAnimation()
    }, 100)
  }
}

// 便签内容数据（80条不重复的温馨话语）
const notesData = [
  { emoji: '❤️', text: '记得吃饭' },
  { emoji: '😊', text: '天气冷了想你' },
  { emoji: '💕', text: '保持好心情' },
  { emoji: '🥰', text: '按时休息哦' },
  { emoji: '✨', text: '你最棒了' },
  { emoji: '💖', text: '多喝热水' },
  { emoji: '🌟', text: '注意保暖' },
  { emoji: '😘', text: '想见你了' },
  { emoji: '💝', text: '早点睡觉' },
  { emoji: '🌈', text: '每天都开心' },
  { emoji: '🎈', text: '别熬夜了' },
  { emoji: '💗', text: '想抱抱你' },
  { emoji: '🌸', text: '照顾好自己' },
  { emoji: '🎀', text: '你很重要' },
  { emoji: '💐', text: '今天也爱你' },
  { emoji: '🌺', text: '别太累了' },
  { emoji: '🦋', text: '要开心呀' },
  { emoji: '🌻', text: '想你啦' },
  { emoji: '🎁', text: '给你小惊喜' },
  { emoji: '🍀', text: '好运常伴' },
  { emoji: '⭐', text: '你是最好的' },
  { emoji: '💫', text: '加油鸭' },
  { emoji: '🌙', text: '晚安好梦' },
  { emoji: '☀️', text: '早安呀' },
  { emoji: '🌤️', text: '心情美美哒' },
  { emoji: '🎵', text: '听首歌放松' },
  { emoji: '🎶', text: '哼个小曲儿' },
  { emoji: '🎨', text: '生活多彩' },
  { emoji: '🎭', text: '笑一个' },
  { emoji: '🎪', text: '开心最重要' },
  { emoji: '🎯', text: '你能行的' },
  { emoji: '🎲', text: '好事会发生' },
  { emoji: '🎰', text: '幸运满满' },
  { emoji: '🧸', text: '抱抱你' },
  { emoji: '🎀', text: '你很特别' },
  { emoji: '💌', text: '想对你说' },
  { emoji: '💘', text: '心动时刻' },
  { emoji: '💞', text: '永远喜欢你' },
  { emoji: '💓', text: '心跳加速' },
  { emoji: '💟', text: '爱你呦' },
  { emoji: '❣️', text: '超级爱你' },
  { emoji: '💔', text: '别难过啦' },
  { emoji: '❤️‍🔥', text: '热情满满' },
  { emoji: '❤️‍🩹', text: '治愈你' },
  { emoji: '🧡', text: '温暖相伴' },
  { emoji: '💛', text: '阳光灿烂' },
  { emoji: '💚', text: '保持好心情' },
  { emoji: '💙', text: '海阔天空' },
  { emoji: '💜', text: '梦想成真' },
  { emoji: '🤎', text: '温柔时光' },
  { emoji: '🖤', text: '酷酷的你' },
  { emoji: '🤍', text: '纯净美好' },
  { emoji: '🌹', text: '送你玫瑰' },
  { emoji: '🌷', text: '天天开心' },
  { emoji: '🌼', text: '笑容灿烂' },
  { emoji: '🌾', text: '岁月静好' },
  { emoji: '🍃', text: '清风徐来' },
  { emoji: '🍂', text: '别太辛苦' },
  { emoji: '🍁', text: '想念你了' },
  { emoji: '🌿', text: '充满活力' },
  { emoji: '☘️', text: '好运连连' },
  { emoji: '🍄', text: '可爱如你' },
  { emoji: '🌰', text: '甜甜的你' },
  { emoji: '🎃', text: '给你惊喜' },
  { emoji: '🌽', text: '元气满满' },
  { emoji: '🍇', text: '甜蜜时光' },
  { emoji: '🍉', text: '清爽一夏' },
  { emoji: '🍊', text: '活力满满' },
  { emoji: '🍋', text: '清新可爱' },
  { emoji: '🍌', text: '开心每天' },
  { emoji: '🍍', text: '甜蜜蜜' },
  { emoji: '🥭', text: '香甜如你' },
  { emoji: '🍎', text: '平安喜乐' },
  { emoji: '🍏', text: '青春洋溢' },
  { emoji: '🍐', text: '好事成双' },
  { emoji: '🍑', text: '桃花运来' },
  { emoji: '🍒', text: '小可爱' },
  { emoji: '🍓', text: '甜心宝贝' },
  { emoji: '🥝', text: '独一无二' },
  { emoji: '🍅', text: '红红火火' }
]

// 便签颜色数组（鲜艳的颜色）
const colors = [
  '#FF6B9D', // 粉色
  '#FFD93D', // 黄色
  '#6BCB77', // 绿色
  '#4D96FF', // 蓝色
  '#C77DFF', // 紫色
  '#FF8C42', // 橙色
  '#FF5E78', // 红色
  '#00D9FF', // 青色
  '#FFB6C1', // 浅粉色
  '#98D8C8', // 薄荷绿
  '#F7B5CA', // 樱花粉
  '#A8E6CF', // 薄荷色
]

// 生成随机位置（智能避免堆叠）
const getRandomPosition = () => {
  const screenWidth = window.innerWidth
  const noteWidth = screenWidth <= 480 ? 160 : 220 // 便签宽度（px）

  // 计算可用范围
  let maxPosition
  if (screenWidth <= 480) {
    maxPosition = 70 // 0-70%
  } else if (screenWidth <= 768) {
    maxPosition = 75 // 0-75%
  } else {
    maxPosition = 80 // 0-80%
  }

  // 尝试找到不重叠的位置
  let attempts = 0
  let position

  while (attempts < 20) {
    position = Math.random() * maxPosition

    // 检查是否与现有位置重叠
    const tooClose = usedPositions.some(used => {
      const distance = Math.abs(position - used.position)
      const timeGap = Date.now() - used.time
      // 如果位置相近且时间相近，则认为会重叠
      return distance < 15 && timeGap < 2000
    })

    if (!tooClose) {
      break
    }
    attempts++
  }

  // 记录使用的位置
  usedPositions.push({ position, time: Date.now() })

  // 清理旧的位置记录（超过5秒的）
  usedPositions = usedPositions.filter(p => Date.now() - p.time < 5000)

  return `${position}%`
}

// 生成随机颜色
const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

// 创建新便签
const createNote = () => {
  if (isPaused.value) return // 暂停时不生成

  // 获取当前使用的数据源
  const currentData = getCurrentNotesData()

  // 获取便签数据（随机或顺序）
  let noteData
  if (isRandom.value) {
    // 随机模式
    const randomIndex = Math.floor(Math.random() * currentData.length)
    noteData = currentData[randomIndex]
  } else {
    // 顺序模式（循环）
    noteData = currentData[noteIdCounter % currentData.length]
    noteIdCounter++
  }

  // 使用自定义速度设置
  const duration = customSettings.value.speed

  const note = {
    id: uniqueIdCounter++,
    emoji: noteData.emoji,
    text: noteData.text,
    left: getRandomPosition(),
    color: getRandomColor(),
    duration: `${duration}s`,
    delay: '0s'
  }

  activeNotes.value.push(note)

  // 动画结束后移除便签
  setTimeout(() => {
    const index = activeNotes.value.findIndex(n => n.id === note.id)
    if (index !== -1) {
      activeNotes.value.splice(index, 1)
    }
  }, duration * 1000)
}

// 关闭弹窗
const closeModal = () => {
  showModal.value = false
}

// 开始动画
const startAnimation = () => {
  showModal.value = false

  // 使用自定义设置
  const interval = customSettings.value.interval
  const maxCount = customSettings.value.count

  // 生成便签
  intervalId = setInterval(() => {
    if (!isPaused.value) {
      const count = Math.floor(Math.random() * maxCount) + 1
      for (let i = 0; i < count; i++) {
        createNote()
      }
    }
  }, interval)

  // 设置倒计时
  if (timerMinutes.value > 0) {
    countdown.value = timerMinutes.value * 60
    countdownId = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        stopAnimation()
      }
    }, 1000)
  }
}

// 停止动画
const stopAnimation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  if (countdownId) {
    clearInterval(countdownId)
    countdownId = null
  }
  countdown.value = 0
  activeNotes.value = []
  showModal.value = true
}

// 暂停/继续
const togglePause = () => {
  isPaused.value = !isPaused.value
}

// 切换随机/顺序
const toggleRandom = () => {
  isRandom.value = !isRandom.value
}

// 切换音乐
const toggleMusic = () => {
  if (!bgMusic.value) return

  if (isMusicPlaying.value) {
    bgMusic.value.pause()
    isMusicPlaying.value = false
  } else {
    bgMusic.value.play().catch(err => {
      console.log('音乐播放失败:', err)
      alert('音乐播放失败，请检查浏览器是否允许自动播放音频')
    })
    isMusicPlaying.value = true
  }
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 组件卸载时清理
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  if (countdownId) {
    clearInterval(countdownId)
    countdownId = null
  }
  if (bgMusic.value) {
    bgMusic.value.pause()
    bgMusic.value = null
  }
})
</script>

<style scoped>
/* 容器样式 */
.notes-gift-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/【哲风壁纸】LABUBU-光影.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

/* 添加深色遮罩层，让便签更清晰 */
.notes-gift-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

/* 确保所有内容在遮罩层之上 */
.notes-gift-container > * {
  position: relative;
  z-index: 1;
}

/* 控制面板 */
.control-panel {
  position: fixed;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  z-index: 100;
}

.control-btn {
  width: 45px;
  height: 45px;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.control-btn:active {
  transform: scale(0.95);
}

.countdown {
  padding: 8px 16px;
  background: rgba(255, 107, 157, 0.3);
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.4);
  min-width: 80px;
  text-align: center;
}

/* 返回按钮 */
.back-button {
  position: fixed;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateX(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
}

.back-button:active {
  transform: translateX(-3px) scale(0.98);
}

.back-button svg {
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.back-text {
  white-space: nowrap;
}

/* 弹窗遮罩 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* 弹窗内容 */
.modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px 30px;
  border-radius: 25px;
  text-align: center;
  max-width: 90%;
  width: 350px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalBounce 0.5s ease-out;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

@keyframes modalBounce {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-icon {
  font-size: 80px;
  margin-bottom: 20px;
  animation: giftShake 1s infinite;
}

@keyframes giftShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

/* 设置弹窗 */
.settings-modal {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 35px 30px;
  border-radius: 25px;
  max-width: 90%;
  width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalBounce 0.4s ease-out;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.settings-title {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 25px;
  text-align: center;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.setting-slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: linear-gradient(to right, #ff6b9d, #ffa06b);
  outline: none;
  -webkit-appearance: none;
}

.setting-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid #ff6b9d;
}

.setting-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid #ff6b9d;
}

.setting-value {
  font-size: 14px;
  font-weight: bold;
  color: #ff6b9d;
  text-align: right;
}

.setting-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.setting-textarea:focus {
  outline: none;
  border-color: #ff6b9d;
}

.setting-hint {
  font-size: 13px;
  color: #666;
  font-style: italic;
}

.setting-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 15px;
  color: #333;
}

.setting-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #ff6b9d;
}

.settings-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.settings-btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.settings-btn-reset {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  color: white;
}

.settings-btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.settings-btn-apply {
  background: linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%);
  color: white;
}

.settings-btn-apply:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
}

.settings-btn:active {
  transform: translateY(0);
}

.modal-title {
  background: linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* 定时器设置 */
.timer-setting {
  margin-bottom: 25px;
  padding: 20px;
  background: rgba(255, 107, 157, 0.1);
  border-radius: 15px;
  border: 2px solid rgba(255, 107, 157, 0.2);
}

.timer-setting label {
  display: block;
  margin-bottom: 10px;
  color: #ff6b9d;
  font-weight: 600;
  font-size: 15px;
}

.timer-setting input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid rgba(255, 107, 157, 0.3);
  border-radius: 25px;
  font-size: 16px;
  text-align: center;
  background: white;
  color: #333;
  font-weight: 600;
  transition: all 0.3s ease;
}

.timer-setting input:focus {
  outline: none;
  border-color: #ff6b9d;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
}

.modal-button {
  background: linear-gradient(135deg, #ff6b9d 0%, #ffa06b 100%);
  color: white;
  border: none;
  padding: 15px 50px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
}

.modal-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 25px rgba(255, 107, 157, 0.5);
}

.modal-button:active {
  transform: translateY(0);
}

/* 弹窗过渡动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* 便签容器 */
.notes-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 便签卡片 */
.note-card {
  position: absolute;
  bottom: -100px;
  padding: 15px 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  animation: floatUp 6s linear forwards;
  min-width: 160px;
  max-width: 220px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
}

@keyframes floatUp {
  0% {
    bottom: -100px;
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    bottom: calc(100vh + 100px);
    opacity: 0;
  }
}

.note-emoji {
  font-size: 28px;
  flex-shrink: 0;
}

.note-text {
  color: rgba(255, 255, 255, 0.98);
  font-size: 16px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  letter-spacing: 0.5px;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 768px) {
  .control-panel {
    top: 15px;
    left: 15px;
    padding: 8px 12px;
    gap: 8px;
  }

  .control-btn {
    width: 38px;
    height: 38px;
    font-size: 18px;
  }

  .countdown {
    padding: 6px 12px;
    font-size: 14px;
    min-width: 70px;
  }

  .back-button {
    top: 15px;
    right: 15px;
    padding: 10px 20px;
    font-size: 15px;
  }

  .back-button svg {
    width: 20px;
    height: 20px;
  }

  .modal-content {
    padding: 35px 25px;
    width: 85%;
    max-width: 320px;
  }

  .modal-icon {
    font-size: 70px;
  }

  .modal-title {
    font-size: 22px;
    margin-bottom: 18px;
  }

  .timer-setting {
    padding: 15px;
    margin-bottom: 20px;
  }

  .timer-setting label {
    font-size: 14px;
  }

  .timer-setting input {
    padding: 10px 15px;
    font-size: 15px;
  }

  .modal-button {
    padding: 14px 45px;
    font-size: 17px;
  }

  .note-card {
    padding: 12px 18px;
    min-width: 140px;
    max-width: 180px;
    border-radius: 12px;
  }

  .note-emoji {
    font-size: 22px;
  }

  .note-text {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .control-panel {
    top: 10px;
    left: 10px;
    padding: 6px 10px;
    gap: 6px;
  }

  .control-btn {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .countdown {
    padding: 5px 10px;
    font-size: 13px;
    min-width: 65px;
  }

  .back-button {
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    font-size: 14px;
    gap: 6px;
  }

  .back-button svg {
    width: 18px;
    height: 18px;
  }

  .back-text {
    display: none; /* 小屏幕只显示图标 */
  }

  .modal-content {
    padding: 30px 20px;
    width: 90%;
    max-width: 300px;
  }

  .modal-icon {
    font-size: 65px;
    margin-bottom: 15px;
  }

  .modal-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .modal-button {
    padding: 12px 35px;
    font-size: 16px;
  }

  .note-card {
    padding: 10px 15px;
    min-width: 120px;
    max-width: 160px;
    border-radius: 10px;
  }

  .note-emoji {
    font-size: 20px;
  }

  .note-text {
    font-size: 14px;
  }
}

@media (max-width: 375px) {
  .modal-content {
    padding: 25px 18px;
    width: 92%;
  }

  .modal-icon {
    font-size: 60px;
  }

  .modal-title {
    font-size: 18px;
  }

  .modal-button {
    padding: 10px 30px;
    font-size: 15px;
  }

  .note-card {
    padding: 8px 12px;
    min-width: 110px;
    max-width: 140px;
  }

  .note-emoji {
    font-size: 18px;
  }

  .note-text {
    font-size: 13px;
  }
}
</style>

