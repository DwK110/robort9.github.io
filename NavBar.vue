<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <img src="../assets/93b7c8c5e1683dfca82473d4d195d96a_compress.jpg" alt="logo" class="w-8 h-8 object-contain" />
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              智能播种机器人
            </span>
          </router-link>
        </div>
        
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="nav-link px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              :class="$route.path === item.path ? 'nav-link-active' : 'nav-link-inactive'"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <div class="md:hidden">
          <el-button @click="mobileMenuOpen = !mobileMenuOpen" type="text">
            <el-icon><Menu /></el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
          :class="$route.path === item.path ? 'nav-link-active' : 'nav-link-inactive'"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '项目概述', path: '/overview' },
  { name: '技术细节', path: '/technical' },
  { name: '创新特色', path: '/innovation' },
  { name: '进度管理', path: '/progress' },
  { name: '预期成果', path: '/results' },
  { name: '规划路径', path: '/path-planning' },
  { name: '功能演示', path: '/feature-demo' }
]
</script>

<style scoped>
.nav-link-active {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white;
}

.nav-link-inactive {
  @apply text-gray-700 hover:bg-gray-100 hover:text-gray-900;
}
</style>