<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-green-700"></div>
      <div class="relative z-10 text-center text-white px-4">
        <img src="../assets/93b7c8c5e1683dfca82473d4d195d96a_compress.jpg" alt="logo" class="mx-auto mb-6 w-48 h-48 object-contain" />
        <h1 class="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up">
          智能播种机器人
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          基于机器视觉与深度学习的精准农业播种解决方案
        </p>
        <div class="space-x-4" data-aos="fade-up" data-aos-delay="400">
          <el-button type="primary" size="large" @click="$router.push('/overview')">
            了解项目
          </el-button>
          <el-button size="large" @click="$router.push('/technical')">
            技术详情
          </el-button>
        </div>
      </div>
      <!-- Floating particles -->
      <div class="absolute inset-0 overflow-hidden z-0">
        <div v-for="i in 28" :key="i" 
             class="absolute rounded-full animate-float-green"
             :style="getGreenParticleStyle(i)">
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-green-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">核心特色</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            结合先进的机器视觉技术和深度学习算法，实现精准、高效的智能播种
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index"
               class="feature-card p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300"
               data-aos="fade-up" :data-aos-delay="index * 200">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <el-icon class="text-white text-2xl" :class="feature.icon"></el-icon>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div v-for="(stat, index) in stats" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="text-4xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-xl opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Preview -->
    <section class="py-20 bg-green-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-4xl font-bold text-gray-900 mb-6">技术创新</h2>
            <p class="text-xl text-gray-600 mb-8">
              采用最新的机器视觉和深度学习技术，实现种子识别、土壤分析和精准播种的全自动化流程。
            </p>
            <div class="space-y-4">
              <div v-for="tech in technologies" :key="tech.name" class="flex items-center space-x-4">
                <div class="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <span class="text-gray-700">{{ tech.name }}</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                       :style="{ width: tech.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left">
            <div class="relative">
              <div class="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <el-icon class="text-8xl text-blue-600"><Setting /></el-icon>
              </div>
              <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <el-icon class="text-white text-2xl"><Star /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 系统结构可视化 -->
    <section class="py-20 bg-gradient-to-br from-green-100 via-blue-50 to-white rounded-3xl shadow-xl mx-2 md:mx-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">系统结构可视化</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-green-700">功能与传感器层级图</h3>
            <div class="bg-white/80 rounded-xl p-4 shadow flex items-center justify-center min-h-[400px]">
              <div ref="treeChartRef" style="width:100%;height:380px;"></div>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-4 text-green-700">功能占比玫瑰图</h3>
            <div class="bg-white/80 rounded-xl p-4 shadow flex items-center justify-center min-h-[400px]">
              <div ref="pieChartRef" style="width:100%;height:380px;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 机器人演示区块 -->
    <section class="py-20 bg-green-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">机器人演示</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all duration-300">
            <div class="w-64 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
              <el-icon class="text-6xl text-blue-600"><Setting /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-2">智能导航演示</h3>
            <p class="text-gray-600">机器人自主导航系统演示，展示路径规划和障碍物避让能力。</p>
          </div>
          <div class="flex flex-col items-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all duration-300">
            <div class="w-64 h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-4 flex items-center justify-center">
              <el-icon class="text-6xl text-green-600"><View /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-2">视觉识别演示</h3>
            <p class="text-gray-600">机器视觉系统实时识别种子和土壤状态，展示AI分析能力。</p>
          </div>
          <div class="flex flex-col items-center bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all duration-300">
            <div class="w-64 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4 flex items-center justify-center">
              <el-icon class="text-6xl text-purple-600"><DataAnalysis /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-2">精准播种演示</h3>
            <p class="text-gray-600">精密播种机构演示，展示毫米级精度的播种控制技术。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import mermaid from 'mermaid'
import * as echarts from 'echarts'
import 'swiper/css'
import 'swiper/css/pagination'

const features = [
  {
    icon: 'View',
    title: '机器视觉识别',
    description: '高精度图像识别技术，准确识别种子类型和土壤状况'
  },
  {
    icon: 'DataAnalysis',
    title: '深度学习算法',
    description: '智能分析播种环境，优化播种策略和路径规划'
  },
  {
    icon: 'Setting',
    title: '精准播种控制',
    description: '毫米级精度控制，确保播种深度和间距的准确性'
  }
]

const stats = [
  { value: '95%', label: '播种精度' },
  { value: '3倍', label: '效率提升' },
  { value: '85%', label: '成本节约' },
  { value: '24/7', label: '全天候作业' }
]

const technologies = [
  { name: '计算机视觉', progress: 95 },
  { name: '深度学习', progress: 90 },
  { name: '机械控制', progress: 88 },
  { name: '传感器融合', progress: 92 }
]

const treeChartRef = ref()
let treeChartInstance: echarts.ECharts | null = null

const treeData = {
  name: '智能播种机器人',
  children: [
    {
      name: '感知系统',
      children: [
        { name: '视觉传感器' },
        { name: '土壤湿度传感器' },
        { name: '气象传感器' }
      ]
    },
    {
      name: '控制系统',
      children: [
        { name: '运动控制' },
        { name: '播种执行机构' },
        { name: '导航模块' }
      ]
    }
  ]
}

const pieChartRef = ref()
let pieChartInstance: echarts.ECharts | null = null

const pieData = [
  { value: 30, name: '视觉传感器' },
  { value: 15, name: '土壤湿度传感器' },
  { value: 10, name: '气象传感器' },
  { value: 15, name: '运动控制' },
  { value: 10, name: '播种执行机构' },
  { value: 5, name: '导航模块' },
  { value: 10, name: 'AI决策' },
  { value: 5, name: '远程通讯' }
]

// 绿色粒子光效样式生成
const getGreenParticleStyle = (index: number) => {
  const size = Math.random() * 48 + 16;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 10 + 10;
  const greenList = [
    'rgba(34,197,94,0.18)', // emerald-500
    'rgba(16,185,129,0.15)', // emerald-400
    'rgba(52,211,153,0.12)', // green-300
    'rgba(110,231,183,0.10)', // green-200
    'rgba(255,255,255,0.13)' // 白色点缀
  ];
  const bg = greenList[index % greenList.length];
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    background: bg,
    filter: 'blur(2px)',
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };
};

onMounted(() => {
  nextTick(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' })
    mermaid.init(undefined, '.mermaid')
    // ECharts树图初始化
    if (treeChartRef.value) {
      treeChartInstance = echarts.init(treeChartRef.value)
      treeChartInstance.setOption({
        tooltip: { trigger: 'item', triggerOn: 'mousemove' },
        series: [
          {
            type: 'tree',
            data: [treeData],
            top: '5%',
            left: '10%',
            bottom: '5%',
            right: '20%',
            symbolSize: 24,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 16,
              color: '#065f46',
              fontWeight: 600
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
                color: '#0ea5e9',
                fontWeight: 500
              }
            },
            lineStyle: {
              color: '#22d3ee',
              width: 3
            },
            itemStyle: {
              color: '#bbf7d0',
              borderColor: '#22d3ee',
              borderWidth: 2,
              shadowColor: '#0ea5e9',
              shadowBlur: 10
            },
            expandAndCollapse: true,
            animationDuration: 600,
            animationDurationUpdate: 300
          }
        ]
      })
    }
    // ECharts玫瑰图初始化
    if (pieChartRef.value) {
      pieChartInstance = echarts.init(pieChartRef.value)
      pieChartInstance.setOption({
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { bottom: 0, textStyle: { color: '#166534', fontWeight: 500 } },
        series: [
          {
            name: '功能占比',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '45%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              color: '#0f766e',
              fontWeight: 600,
              fontSize: 14
            },
            data: pieData,
            color: [
              '#22d3ee', '#a7f3d0', '#fbbf24', '#38bdf8', '#0ea5e9', '#bbf7d0', '#f472b6', '#818cf8'
            ]
          }
        ]
      })
    }
  })
})
</script>

<style scoped>
@keyframes float-green {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.1); }
}
.animate-float-green {
  animation: float-green linear infinite;
}

.feature-card {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.particle-glow {
  /* 额外发光效果 */
  mix-blend-mode: lighten;
}

section[ref="vantaRef"] {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  /* 让内容更聚焦 */
  box-shadow: 0 8px 32px 0 rgba(10,37,64,0.12);
}
</style>