<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <img src="../assets/93b7c8c5e1683dfca82473d4d195d96a_compress.jpg" alt="logo" class="w-8 h-8 object-contain" />
            </div>
            <span class="text-xl font-bold">智能播种机器人</span>
          </div>
          <p class="text-gray-400 mb-4">
            基于机器视觉与深度学习的智能农业播种解决方案，致力于推动农业现代化发展。
          </p>
          <div class="flex space-x-4">
            <el-button circle type="primary" size="small">
              <el-icon><Message /></el-icon>
            </el-button>
            <el-button circle type="primary" size="small">
              <el-icon><Phone /></el-icon>
            </el-button>
            <el-button circle type="primary" size="small">
              <el-icon><Location /></el-icon>
            </el-button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><router-link to="/overview" class="text-gray-400 hover:text-white transition-colors">项目概述</router-link></li>
            <li><router-link to="/technical" class="text-gray-400 hover:text-white transition-colors">技术细节</router-link></li>
            <li><router-link to="/innovation" class="text-gray-400 hover:text-white transition-colors">创新特色</router-link></li>
            <li><router-link to="/progress" class="text-gray-400 hover:text-white transition-colors">进度管理</router-link></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">联系信息</h3>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center space-x-2">
              <el-icon><Message /></el-icon>
              <span>contact@smartseeding.com</span>
            </li>
            <li class="flex items-center space-x-2">
              <el-icon><Phone /></el-icon>
              <span>+86 138-0000-0000</span>
            </li>
            <li class="flex items-center space-x-2">
              <el-icon><Location /></el-icon>
              <span>北京市海淀区</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 智能播种机器人项目. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>