import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/overview',
    name: '项目概述',
    component: () => import('../views/ProjectOverview.vue')
  },
  {
    path: '/technical',
    name: '技术细节',
    component: () => import('../views/TechnicalDetails.vue')
  },
  {
    path: '/innovation',
    name: '创新特色',
    component: () => import('../views/Innovation.vue')
  },
  {
    path: '/progress',
    name: '进度管理',
    component: () => import('../views/Progress.vue')
  },
  {
    path: '/results',
    name: '预期成果',
    component: () => import('../views/Results.vue')
  },
  {
    path: '/path-planning',
    name: '规划路径',
    component: () => import('../views/PathPlanning.vue')
  },
  {
    path: '/feature-demo',
    name: '功能演示',
    component: () => import('../views/FeatureDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 