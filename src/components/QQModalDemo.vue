<template>
  <div class="demo-container">
    <h1>QQ二维码弹窗方案预览</h1>
    <p class="demo-desc">点击下方按钮查看不同的设计方案</p>
    
    <div class="demo-buttons">
      <button @click="currentDemo = 1" :class="{ active: currentDemo === 1 }">
        方案1：紧凑卡片式 ⭐推荐
      </button>
      <button @click="currentDemo = 2" :class="{ active: currentDemo === 2 }">
        方案2：底部抽屉式
      </button>
      <button @click="currentDemo = 3" :class="{ active: currentDemo === 3 }">
        方案3：悬浮气泡式
      </button>
      <button @click="currentDemo = 4" :class="{ active: currentDemo === 4 }">
        方案4：标签页切换式
      </button>
    </div>

    <div class="demo-preview">
      <button class="preview-trigger" @click="showModal = true">
        点击预览当前方案
      </button>
    </div>

    <!-- 方案1：紧凑卡片式 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal && currentDemo === 1" class="modal-overlay-1" @click="showModal = false">
          <div class="modal-1" @click.stop>
            <button class="modal-close" @click="showModal = false">×</button>
            <h3>扫码添加QQ</h3>
            <div class="qr-grid-1">
              <div class="qr-card" @click="enlargeQR = 'group'">
                <img src="/qq-group-qr.jpg" alt="QQ群" />
                <span>QQ群</span>
                <div class="enlarge-hint">点击放大</div>
              </div>
              <div class="qr-card" @click="enlargeQR = 'personal'">
                <img src="/qq-persona1-qr.jpg" alt="个人QQ" />
                <span>个人QQ</span>
                <div class="enlarge-hint">点击放大</div>
              </div>
            </div>
          </div>
          <!-- 放大查看 -->
          <Transition name="enlarge">
            <div v-if="enlargeQR" class="enlarge-overlay" @click="enlargeQR = null">
              <img 
                :src="enlargeQR === 'group' ? '/qq-group-qr.jpg' : '/qq-persona1-qr.jpg'" 
                class="enlarge-img"
                @click.stop
              />
              <p class="enlarge-tip">点击空白处关闭</p>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- 方案2：底部抽屉式 -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="showModal && currentDemo === 2" class="modal-overlay-2" @click="showModal = false">
          <div class="drawer-2" @click.stop>
            <div class="drawer-handle"></div>
            <h3>扫码添加QQ</h3>
            <div class="qr-grid-2">
              <div class="qr-item-2">
                <img src="/qq-group-qr.jpg" alt="QQ群" />
                <span>QQ群</span>
              </div>
              <div class="qr-item-2">
                <img src="/qq-persona1-qr.jpg" alt="个人QQ" />
                <span>个人QQ</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 方案3：悬浮气泡式 -->
    <Teleport to="body">
      <Transition name="bubble">
        <div v-if="showModal && currentDemo === 3" class="bubble-3">
          <button class="modal-close" @click="showModal = false">×</button>
          <h3>扫码添加</h3>
          <div class="qr-tabs-3">
            <button 
              @click="activeTab = 'group'" 
              :class="{ active: activeTab === 'group' }"
            >
              QQ群
            </button>
            <button 
              @click="activeTab = 'personal'" 
              :class="{ active: activeTab === 'personal' }"
            >
              个人QQ
            </button>
          </div>
          <div class="qr-display-3">
            <img 
              :src="activeTab === 'group' ? '/qq-group-qr.jpg' : '/qq-persona1-qr.jpg'" 
              alt="QR Code"
            />
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 方案4：标签页切换式 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal && currentDemo === 4" class="modal-overlay-4" @click="showModal = false">
          <div class="modal-4" @click.stop>
            <button class="modal-close" @click="showModal = false">×</button>
            <div class="tabs-4">
              <button 
                @click="activeTab = 'group'" 
                :class="{ active: activeTab === 'group' }"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                QQ群
              </button>
              <button 
                @click="activeTab = 'personal'" 
                :class="{ active: activeTab === 'personal' }"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                个人QQ
              </button>
            </div>
            <div class="qr-content-4">
              <Transition name="slide" mode="out-in">
                <div :key="activeTab" class="qr-wrapper-4">
                  <img 
                    :src="activeTab === 'group' ? '/qq-group-qr.jpg' : '/qq-persona1-qr.jpg'" 
                    alt="QR Code"
                  />
                  <p>{{ activeTab === 'group' ? '扫码加入QQ群' : '扫码添加个人QQ' }}</p>
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
import { ref } from 'vue'

const currentDemo = ref(1)
const showModal = ref(false)
const enlargeQR = ref(null)
const activeTab = ref('group')
</script>

<style scoped>
.demo-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

h1 {
  color: white;
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
}

.demo-desc {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 40px;
}

.demo-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 40px;
}

.demo-buttons button {
  padding: 15px 20px;
  background: white;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #667eea;
}

.demo-buttons button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.demo-buttons button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: white;
}

.demo-preview {
  text-align: center;
}

.preview-trigger {
  padding: 20px 50px;
  background: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  color: #667eea;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.preview-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* 方案1：紧凑卡片式 */
.modal-overlay-1 {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-1 {
  background: white;
  border-radius: 16px;
  padding: 25px;
  max-width: 380px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-1 h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  text-align: center;
  color: #1f2937;
}

.qr-grid-1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.qr-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.qr-card:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.qr-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
}

.qr-card span {
  display: block;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.enlarge-hint {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 11px;
  padding: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.qr-card:hover .enlarge-hint {
  opacity: 1;
}

.enlarge-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  padding: 20px;
}

.enlarge-img {
  max-width: 90%;
  max-height: 80vh;
  border-radius: 12px;
}

.enlarge-tip {
  color: white;
  margin-top: 20px;
  font-size: 14px;
}

/* 方案2：底部抽屉式 */
.modal-overlay-2 {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  align-items: flex-end;
}

.drawer-2 {
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 20px 20px 30px;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
}

.drawer-handle {
  width: 40px;
  height: 4px;
  background: #d1d5db;
  border-radius: 2px;
  margin: 0 auto 20px;
}

.drawer-2 h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  text-align: center;
  color: #1f2937;
}

.qr-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
}

.qr-item-2 {
  text-align: center;
}

.qr-item-2 img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 8px;
}

.qr-item-2 span {
  display: block;
  font-size: 14px;
  color: #6b7280;
}

/* 方案3：悬浮气泡式 */
.bubble-3 {
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 10000;
}

.bubble-3 h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #1f2937;
}

.qr-tabs-3 {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.qr-tabs-3 button {
  flex: 1;
  padding: 8px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.qr-tabs-3 button.active {
  background: #667eea;
  color: white;
}

.qr-display-3 img {
  width: 100%;
  border-radius: 12px;
}

/* 方案4：标签页切换式 */
.modal-overlay-4 {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-4 {
  background: white;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.tabs-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #f9fafb;
}

.tabs-4 button {
  padding: 15px;
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
}

.tabs-4 button.active {
  background: white;
  border-bottom-color: #667eea;
  color: #667eea;
}

.qr-content-4 {
  padding: 30px;
}

.qr-wrapper-4 {
  text-align: center;
}

.qr-wrapper-4 img {
  width: 100%;
  max-width: 280px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.qr-wrapper-4 p {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* 动画 */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.drawer-enter-active, .drawer-leave-active {
  transition: transform 0.3s ease;
}

.drawer-enter-from, .drawer-leave-to {
  transform: translateY(100%);
}

.bubble-enter-active, .bubble-leave-active {
  transition: all 0.3s ease;
}

.bubble-enter-from, .bubble-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.enlarge-enter-active, .enlarge-leave-active {
  transition: opacity 0.3s ease;
}

.enlarge-enter-from, .enlarge-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
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

@media (max-width: 640px) {
  .qr-grid-1 {
    grid-template-columns: 1fr;
  }
  
  .bubble-3 {
    left: 20px;
    right: 20px;
    width: auto;
  }
}
</style>

