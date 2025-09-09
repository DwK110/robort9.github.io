<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">创新特色</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          突破性技术创新，引领智能农业发展新方向
        </p>
      </div>

      <!-- Innovation Overview -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 class="text-3xl font-bold mb-6 text-center">核心创新亮点</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(highlight, index) in innovationHighlights" :key="index" class="text-center">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <el-icon class="text-2xl" :class="highlight.icon"></el-icon>
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ highlight.title }}</h3>
              <p class="opacity-90">{{ highlight.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Innovations -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-blue-600 mr-3"><Cpu /></el-icon>
            技术创新点
          </h2>
          <div class="space-y-8">
            <div v-for="(innovation, index) in technicalInnovations" :key="index"
                 class="border-l-4 border-blue-600 pl-6 py-4">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ innovation.title }}</h3>
              <p class="text-gray-700 mb-4">{{ innovation.description }}</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">技术特点：</h4>
                  <ul class="space-y-1">
                    <li v-for="feature in innovation.features" :key="feature" 
                        class="flex items-center space-x-2 text-gray-600">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">应用优势：</h4>
                  <ul class="space-y-1">
                    <li v-for="advantage in innovation.advantages" :key="advantage" 
                        class="flex items-center space-x-2 text-gray-600">
                      <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>{{ advantage }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Competitive Advantages -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-green-600 mr-3"><Trophy /></el-icon>
            竞争优势
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">技术领先性</h3>
              <div class="space-y-4">
                <div v-for="advantage in competitiveAdvantages" :key="advantage.title"
                     class="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <h4 class="font-semibold text-gray-900 mb-2">{{ advantage.title }}</h4>
                  <p class="text-gray-600 text-sm">{{ advantage.description }}</p>
                  <div class="mt-2 flex items-center space-x-2">
                    <span class="text-xs text-green-600 font-medium">提升幅度:</span>
                    <span class="text-sm font-semibold text-green-700">{{ advantage.improvement }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">市场对比</h3>
              <div class="space-y-4">
                <div v-for="comparison in marketComparisons" :key="comparison.metric"
                     class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ comparison.metric }}</h4>
                    <p class="text-gray-600 text-sm">{{ comparison.description }}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-blue-600">{{ comparison.ourValue }}</div>
                    <div class="text-sm text-gray-500">vs {{ comparison.marketAverage }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Innovation Timeline -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-purple-600 mr-3"><Clock /></el-icon>
            创新发展历程
          </h2>
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
            <div class="space-y-8">
              <div v-for="(milestone, index) in innovationTimeline" :key="index"
                   class="relative flex items-start space-x-6">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
                </div>
                <div class="flex-1 pb-8">
                  <div class="flex items-center space-x-4 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ milestone.title }}</h3>
                    <span class="text-sm text-blue-600 font-medium">{{ milestone.date }}</span>
                  </div>
                  <p class="text-gray-600 mb-3">{{ milestone.description }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in milestone.tags" :key="tag"
                          class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Future Prospects -->
      <section data-aos="fade-up">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 class="text-3xl font-bold mb-6 flex items-center">
            <el-icon class="mr-3"><Telescope /></el-icon>
            未来展望
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold mb-4">技术发展方向</h3>
              <ul class="space-y-3">
                <li v-for="direction in futureDirections" :key="direction" 
                    class="flex items-center space-x-3">
                  <el-icon class="text-yellow-300"><ArrowRight /></el-icon>
                  <span>{{ direction }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-4">应用拓展领域</h3>
              <ul class="space-y-3">
                <li v-for="application in futureApplications" :key="application" 
                    class="flex items-center space-x-3">
                  <el-icon class="text-yellow-300"><Star /></el-icon>
                  <span>{{ application }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const innovationHighlights = [
  {
    icon: 'View',
    title: '视觉AI融合',
    description: '首创多模态视觉感知与深度学习算法深度融合'
  },
  {
    icon: 'Setting',
    title: '自适应控制',
    description: '智能自适应播种参数调节，适应多种作物和环境'
  },
  {
    icon: 'DataAnalysis',
    title: '预测优化',
    description: '基于历史数据的播种策略预测和优化算法'
  }
]

const technicalInnovations = [
  {
    title: '多光谱视觉感知技术',
    description: '结合可见光、近红外和热红外多光谱图像，实现对土壤状况、作物健康状态的全面感知和分析。',
    features: [
      '多光谱图像融合算法',
      '实时光谱数据处理',
      '环境自适应校准',
      '高精度目标识别'
    ],
    advantages: [
      '提升识别准确率15%',
      '适应复杂光照条件',
      '减少误判率80%',
      '扩展应用场景'
    ]
  },
  {
    title: '智能路径规划算法',
    description: '基于强化学习的动态路径规划算法，能够根据田间实际情况实时调整作业路径，提高作业效率。',
    features: [
      '强化学习优化',
      '动态障碍物避让',
      '能耗最优化',
      '多目标协同规划'
    ],
    advantages: [
      '提升作业效率25%',
      '降低能耗20%',
      '减少重复作业',
      '提高田间利用率'
    ]
  },
  {
    title: '自适应播种控制系统',
    description: '根据种子类型、土壤条件和环境因素，自动调整播种深度、间距和密度，确保最佳播种效果。',
    features: [
      '多参数自适应调节',
      '实时反馈控制',
      '精密机械控制',
      '故障自诊断'
    ],
    advantages: [
      '提升播种精度30%',
      '减少种子浪费',
      '提高出苗率',
      '降低维护成本'
    ]
  }
]

const competitiveAdvantages = [
  {
    title: '播种精度',
    description: '采用机器视觉引导的精密控制系统',
    improvement: '+40%'
  },
  {
    title: '作业效率',
    description: '智能路径规划和并行处理技术',
    improvement: '+60%'
  },
  {
    title: '适应性',
    description: '多环境自适应算法和传感器融合',
    improvement: '+80%'
  },
  {
    title: '智能化程度',
    description: '深度学习和自主决策能力',
    improvement: '+90%'
  }
]

const marketComparisons = [
  {
    metric: '播种精度',
    description: '种子定位精度对比',
    ourValue: '±0.5mm',
    marketAverage: '±2mm'
  },
  {
    metric: '识别准确率',
    description: '种子和土壤识别准确率',
    ourValue: '96%',
    marketAverage: '85%'
  },
  {
    title: '作业效率',
    description: '单位时间播种面积',
    ourValue: '3倍',
    marketAverage: '基准'
  },
  {
    metric: '自主程度',
    description: '无人干预作业时间',
    ourValue: '8小时',
    marketAverage: '2小时'
  }
]

const innovationTimeline = [
  {
    title: '概念设计阶段',
    date: '2023年1月',
    description: '完成项目概念设计和技术路线规划，确定核心技术方案',
    tags: ['概念设计', '技术调研', '方案论证']
  },
  {
    title: '算法开发阶段',
    date: '2023年6月',
    description: '开发机器视觉算法和深度学习模型，完成核心算法验证',
    tags: ['算法开发', '模型训练', '性能测试']
  },
  {
    title: '硬件集成阶段',
    date: '2023年12月',
    description: '完成硬件系统集成和控制系统开发，实现基本功能',
    tags: ['硬件集成', '系统调试', '功能测试']
  },
  {
    title: '系统优化阶段',
    date: '2024年6月',
    description: '系统性能优化和稳定性提升，完成田间试验验证',
    tags: ['性能优化', '田间试验', '数据分析']
  },
  {
    title: '产品化阶段',
    date: '2024年12月',
    description: '产品化设计和批量生产准备，完成商业化部署',
    tags: ['产品化', '批量生产', '市场推广']
  }
]

const futureDirections = [
  '多机器人协同作业技术',
  '5G/6G通信技术集成',
  '边缘计算和云端协同',
  '数字孪生技术应用',
  '区块链溯源技术',
  '量子计算优化算法'
]

const futureApplications = [
  '精准施肥和植保',
  '智能收获和分拣',
  '温室自动化管理',
  '畜牧业智能化',
  '林业和园艺应用',
  '太空农业探索'
]
</script>