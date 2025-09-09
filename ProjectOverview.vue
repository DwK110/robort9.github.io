<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">项目概述</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          基于机器视觉与深度学习的智能农业播种机器人项目
        </p>
      </div>

      <!-- Project Background -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-blue-600 mr-3"><Document /></el-icon>
            项目背景
          </h2>
          <div class="prose prose-lg max-w-none text-gray-700">
            <p class="mb-4">
              随着全球人口增长和农业劳动力短缺问题日益严重，传统农业播种方式面临着效率低下、精度不足、成本高昂等挑战。
              现代农业迫切需要智能化、自动化的解决方案来提高生产效率和作物产量。
            </p>
            <p class="mb-4">
              本项目旨在开发一款基于机器视觉与深度学习技术的智能播种机器人，通过先进的图像识别算法和精准控制系统，
              实现种子的自动识别、分类和精准播种，为现代农业提供高效、智能的播种解决方案。
            </p>
          </div>
        </div>
      </section>

      <!-- Project Goals -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-green-600 mr-3"><Flag /></el-icon>
            项目目标
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(goal, index) in projectGoals" :key="index" 
                 class="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">{{ goal.title }}</h3>
                <p class="text-gray-600">{{ goal.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Features -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-purple-600 mr-3"><Star /></el-icon>
            核心功能
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(feature, index) in keyFeatures" :key="index"
                 class="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <el-icon class="text-white text-2xl" :class="feature.icon"></el-icon>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Specifications -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-orange-600 mr-3"><Setting /></el-icon>
            技术规格
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">硬件配置</h3>
              <ul class="space-y-3">
                <li v-for="spec in hardwareSpecs" :key="spec" class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span class="text-gray-700">{{ spec }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">软件系统</h3>
              <ul class="space-y-3">
                <li v-for="spec in softwareSpecs" :key="spec" class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span class="text-gray-700">{{ spec }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Expected Impact -->
      <section data-aos="fade-up">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 class="text-3xl font-bold mb-6 flex items-center">
            <el-icon class="mr-3"><TrendCharts /></el-icon>
            预期影响
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(impact, index) in expectedImpacts" :key="index" class="text-center">
              <div class="text-4xl font-bold mb-2">{{ impact.value }}</div>
              <div class="text-xl opacity-90 mb-2">{{ impact.metric }}</div>
              <div class="text-sm opacity-75">{{ impact.description }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const projectGoals = [
  {
    title: '提高播种精度',
    description: '通过机器视觉技术实现毫米级播种精度，确保种子间距和深度的准确性'
  },
  {
    title: '降低人工成本',
    description: '实现全自动化播种作业，减少对人工劳动力的依赖，降低农业生产成本'
  },
  {
    title: '提升作业效率',
    description: '24小时不间断作业能力，大幅提升播种效率和农田利用率'
  },
  {
    title: '智能决策支持',
    description: '基于深度学习算法提供智能播种策略，优化种植方案和资源配置'
  }
]

const keyFeatures = [
  {
    icon: 'View',
    title: '视觉识别系统',
    description: '高精度摄像头配合深度学习算法，实现种子和土壤状况的智能识别'
  },
  {
    icon: 'Position',
    title: '精准定位控制',
    description: 'GPS导航结合激光雷达，实现厘米级精度的路径规划和位置控制'
  },
  {
    icon: 'DataAnalysis',
    title: '智能决策引擎',
    description: '基于环境数据和历史经验，自动优化播种参数和作业策略'
  },
  {
    icon: 'Monitor',
    title: '实时监控系统',
    description: '远程监控作业状态，实时反馈播种进度和设备运行情况'
  },
  {
    icon: 'Setting',
    title: '自适应调节',
    description: '根据不同作物和土壤条件，自动调整播种深度和间距参数'
  },
  {
    icon: 'Connection',
    title: '物联网集成',
    description: '支持与农场管理系统集成，实现数据共享和协同作业'
  }
]

const hardwareSpecs = [
  '高分辨率工业摄像头 (4K)',
  '激光雷达测距系统',
  'GPS高精度定位模块',
  '多轴机械臂控制系统',
  '大容量锂电池组',
  '全地形履带底盘',
  '环境传感器阵列',
  '工业级控制计算机'
]

const softwareSpecs = [
  'TensorFlow深度学习框架',
  'OpenCV计算机视觉库',
  'ROS机器人操作系统',
  '自主导航算法',
  '图像识别神经网络',
  '路径规划优化算法',
  '远程监控管理平台',
  '数据分析与可视化系统'
]

const expectedImpacts = [
  {
    value: '95%',
    metric: '播种精度',
    description: '相比传统方式提升精度'
  },
  {
    value: '3倍',
    metric: '效率提升',
    description: '作业效率显著提高'
  },
  {
    value: '60%',
    metric: '成本降低',
    description: '人工和运营成本节约'
  }
]
</script>