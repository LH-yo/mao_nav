import { createRouter, createWebHistory } from 'vue-router'
import NavHomeView from '../views/NavHomeView.vue'
import TestView from '../views/TestView.vue'
import MobileSocialDemo from '../components/MobileSocialDemo.vue'
import SidebarDemo from '../components/SidebarDemo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NavHomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: {
        title: '管理后台 - Eckes导航',
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
      meta: {
        title: '环境变量测试 - Eckes导航'
      }
    },
    {
      path: '/mobile-social-demo',
      name: 'mobile-social-demo',
      component: MobileSocialDemo,
      meta: {
        title: '移动端联系方式方案演示 - Eckes导航'
      }
    },
    {
      path: '/sidebar-demo',
      name: 'sidebar-demo',
      component: SidebarDemo,
      meta: {
        title: '侧边栏升级方案演示 - Eckes导航'
      }
    },
  ],
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Eckes导航'
  }

  next()
})

export default router
