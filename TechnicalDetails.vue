<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">技术细节</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          深入了解智能播种机器人的核心技术架构和实现方案
        </p>
      </div>

      <!-- System Architecture -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-blue-600 mr-3"><Connection /></el-icon>
            系统架构
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">整体架构设计</h3>
              <p class="text-gray-700 mb-6">
                系统采用分层模块化架构，包含感知层、决策层、控制层和执行层，确保各模块间的高效协作和系统的可扩展性。
              </p>
              <div class="space-y-4">
                <div v-for="layer in architectureLayers" :key="layer.name" 
                     class="p-4 rounded-lg border-l-4 border-blue-600 bg-blue-50">
                  <h4 class="font-semibold text-gray-900">{{ layer.name }}</h4>
                  <p class="text-gray-600 text-sm">{{ layer.description }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div class="w-full max-w-md">
                <div class="space-y-4">
                  <div v-for="(layer, index) in architectureLayers" :key="index"
                       class="p-4 rounded-lg text-center text-white"
                       :class="getLayerColor(index)">
                    {{ layer.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Computer Vision -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-green-600 mr-3"><View /></el-icon>
            机器视觉技术
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">图像处理流程</h3>
              <div class="space-y-4">
                <div v-for="(step, index) in visionSteps" :key="index" class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ step.title }}</h4>
                    <p class="text-gray-600 text-sm">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">技术特点</h3>
              <div class="space-y-3">
                <div v-for="feature in visionFeatures" :key="feature" 
                     class="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
                  <el-icon class="text-green-600"><Check /></el-icon>
                  <span class="text-gray-700">{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Deep Learning -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-purple-600 mr-3"><DataAnalysis /></el-icon>
            深度学习算法
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div v-for="(model, index) in mlModels" :key="index"
                 class="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <el-icon class="text-white text-xl" :class="model.icon"></el-icon>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ model.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ model.description }}</p>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">准确率</span>
                  <span class="font-semibold">{{ model.accuracy }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000"
                       :style="{ width: model.accuracy + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Control System -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-orange-600 mr-3"><Setting /></el-icon>
            控制系统
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">运动控制</h3>
              <div class="space-y-4">
                <div v-for="control in controlSystems" :key="control.name"
                     class="p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">{{ control.name }}</h4>
                    <span class="text-sm text-orange-600 font-medium">{{ control.precision }}</span>
                  </div>
                  <p class="text-gray-600 text-sm">{{ control.description }}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">传感器融合</h3>
              <div class="space-y-3">
                <div v-for="sensor in sensors" :key="sensor" 
                     class="flex items-center space-x-3 p-3 rounded-lg bg-orange-50">
                  <div class="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span class="text-gray-700">{{ sensor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Performance Metrics -->
      <section data-aos="fade-up">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 class="text-3xl font-bold mb-6 flex items-center">
            <el-icon class="mr-3"><TrendCharts /></el-icon>
            性能指标
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(metric, index) in performanceMetrics" :key="index" class="text-center">
              <div class="text-3xl font-bold mb-2">{{ metric.value }}</div>
              <div class="text-lg opacity-90 mb-1">{{ metric.label }}</div>
              <div class="text-sm opacity-75">{{ metric.unit }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const architectureLayers = [
  {
    name: '感知层',
    description: '摄像头、传感器等硬件设备，负责环境信息采集'
  },
  {
    name: '决策层',
    description: '深度学习算法和AI引擎，进行智能分析和决策'
  },
  {
    name: '控制层',
    description: '运动控制算法，负责路径规划和动作执行'
  },
  {
    name: '执行层',
    description: '机械臂、驱动系统等执行机构，完成播种作业'
  }
]

const visionSteps = [
  {
    title: '图像采集',
    description: '高分辨率摄像头实时采集农田图像'
  },
  {
    title: '预处理',
    description: '图像去噪、增强和标准化处理'
  },
  {
    title: '特征提取',
    description: '提取种子、土壤和杂草的关键特征'
  },
  {
    title: '目标识别',
    description: '基于深度学习模型进行目标分类'
  },
  {
    title: '位置定位',
    description: '精确计算目标物体的空间坐标'
  }
]

const visionFeatures = [
  '实时图像处理能力',
  '多光谱图像分析',
  '恶劣天气适应性',
  '毫米级精度定位',
  '多目标并行识别',
  '自适应光照补偿'
]

const mlModels = [
  {
    name: 'CNN分类器',
    description: '用于种子类型识别和分类',
    accuracy: 96,
    icon: 'View'
  },
  {
    name: 'YOLO检测器',
    description: '实时目标检测和定位',
    accuracy: 94,
    icon: 'Position'
  },
  {
    name: '语义分割',
    description: '土壤区域精确分割',
    accuracy: 92,
    icon: 'DataAnalysis'
  }
]

const controlSystems = [
  {
    name: 'X-Y平台控制',
    precision: '±0.5mm',
    description: '水平面精确定位控制'
  },
  {
    name: 'Z轴深度控制',
    precision: '±0.2mm',
    description: '播种深度精确控制'
  },
  {
    name: '机械臂控制',
    precision: '±1.0mm',
    description: '多自由度机械臂运动控制'
  },
  {
    name: '底盘导航',
    precision: '±2cm',
    description: '自主导航和路径跟踪'
  }
]

const sensors = [
  'GPS高精度定位传感器',
  '激光雷达测距传感器',
  '土壤湿度传感器',
  '环境温湿度传感器',
  '倾角传感器',
  '超声波传感器',
  '编码器位置反馈',
  '力觉传感器'
]

const performanceMetrics = [
  { value: '0.5mm', label: '定位精度', unit: '水平精度' },
  { value: '0.2mm', label: '深度精度', unit: '垂直精度' },
  { value: '30fps', label: '处理速度', unit: '图像帧率' },
  { value: '8小时', label: '续航时间', unit: '连续作业' }
]

const getLayerColor = (index: number) => {
  const colors = [
    'bg-gradient-to-r from-blue-500 to-blue-600',
    'bg-gradient-to-r from-green-500 to-green-600',
    'bg-gradient-to-r from-purple-500 to-purple-600',
    'bg-gradient-to-r from-orange-500 to-orange-600'
  ]
  return colors[index] || colors[0]
}
</script>