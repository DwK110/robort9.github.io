<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">预期成果</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          项目预期产出的成果与社会经济价值
        </p>
      </div>

      <!-- Expected Outcomes -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-blue-600 mr-3"><Trophy /></el-icon>
            主要成果
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(outcome, index) in expectedOutcomes" :key="index"
                 class="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <el-icon class="text-white text-2xl" :class="outcome.icon"></el-icon>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ outcome.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ outcome.description }}</p>
              <div class="space-y-2">
                <div v-for="metric in outcome.metrics" :key="metric.label"
                     class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">{{ metric.label }}</span>
                  <span class="font-semibold text-blue-600">{{ metric.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Intellectual Property -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-green-600 mr-3"><Document /></el-icon>
            知识产权成果
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">专利申请</h3>
              <div class="space-y-4">
                <div v-for="patent in patents" :key="patent.title"
                     class="p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <div class="flex items-start justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">{{ patent.title }}</h4>
                    <span class="text-sm px-2 py-1 rounded-full"
                          :class="getPatentStatusClass(patent.status)">
                      {{ patent.status }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">{{ patent.description }}</p>
                  <div class="flex items-center space-x-4 text-xs text-gray-500">
                    <span>类型: {{ patent.type }}</span>
                    <span>申请日期: {{ patent.date }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">学术成果</h3>
              <div class="space-y-4">
                <div v-for="paper in academicPapers" :key="paper.title"
                     class="p-4 rounded-lg bg-green-50">
                  <h4 class="font-semibold text-gray-900 mb-2">{{ paper.title }}</h4>
                  <p class="text-gray-600 text-sm mb-2">{{ paper.journal }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{{ paper.date }}</span>
                    <span class="text-sm font-medium text-green-600">{{ paper.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Market Impact -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-purple-600 mr-3"><TrendCharts /></el-icon>
            市场影响
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">经济效益</h3>
              <div class="space-y-4">
                <div v-for="benefit in economicBenefits" :key="benefit.category"
                     class="p-4 rounded-lg bg-purple-50">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-900">{{ benefit.category }}</h4>
                    <span class="text-lg font-bold text-purple-600">{{ benefit.value }}</span>
                  </div>
                  <p class="text-gray-600 text-sm">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">社会效益</h3>
              <div class="space-y-3">
                <div v-for="benefit in socialBenefits" :key="benefit"
                     class="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
                  <el-icon class="text-blue-600"><Check /></el-icon>
                  <span class="text-gray-700">{{ benefit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pilot Applications -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-orange-600 mr-3"><Location /></el-icon>
            试点应用
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(pilot, index) in pilotApplications" :key="index"
                 class="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-all duration-300">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ pilot.location }}</h3>
                <span class="text-sm px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                  {{ pilot.status }}
                </span>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">应用面积</span>
                  <span class="font-semibold">{{ pilot.area }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">作物类型</span>
                  <span class="font-semibold">{{ pilot.crop }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">效率提升</span>
                  <span class="font-semibold text-green-600">{{ pilot.improvement }}</span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-gray-600 text-sm">{{ pilot.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Future Roadmap -->
      <section data-aos="fade-up">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 class="text-3xl font-bold mb-8 flex items-center">
            <el-icon class="mr-3"><Compass /></el-icon>
            未来规划
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold mb-4">短期目标 (1-2年)</h3>
              <ul class="space-y-3">
                <li v-for="goal in shortTermGoals" :key="goal"
                    class="flex items-center space-x-3">
                  <el-icon class="text-yellow-300"><ArrowRight /></el-icon>
                  <span>{{ goal }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-4">长期愿景 (3-5年)</h3>
              <ul class="space-y-3">
                <li v-for="vision in longTermVision" :key="vision"
                    class="flex items-center space-x-3">
                  <el-icon class="text-yellow-300"><Star /></el-icon>
                  <span>{{ vision }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-8 p-6 bg-white/10 rounded-xl">
            <h3 class="text-xl font-semibold mb-4">产业化目标</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div class="text-3xl font-bold mb-2">1000+</div>
                <div class="opacity-90">设备部署量</div>
              </div>
              <div>
                <div class="text-3xl font-bold mb-2">50万亩</div>
                <div class="opacity-90">覆盖农田面积</div>
              </div>
              <div>
                <div class="text-3xl font-bold mb-2">10亿元</div>
                <div class="opacity-90">预期市场规模</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const expectedOutcomes = [
  {
    icon: 'Setting',
    title: '产品原型',
    description: '完整的智能播种机器人原型系统',
    metrics: [
      { label: '播种精度', value: '±0.5mm' },
      { label: '作业效率', value: '3倍提升' },
      { label: '自主程度', value: '95%' }
    ]
  },
  {
    icon: 'Document',
    title: '技术文档',
    description: '完整的技术文档和操作手册',
    metrics: [
      { label: '技术报告', value: '15份' },
      { label: '操作手册', value: '3套' },
      { label: '培训材料', value: '完整' }
    ]
  },
  {
    icon: 'DataAnalysis',
    title: '测试数据',
    description: '全面的性能测试和验证数据',
    metrics: [
      { label: '测试场景', value: '20+' },
      { label: '数据样本', value: '10000+' },
      { label: '准确率', value: '96%' }
    ]
  }
]

const patents = [
  {
    title: '基于机器视觉的智能播种控制方法',
    description: '一种结合深度学习和机器视觉的精准播种控制技术',
    type: '发明专利',
    status: '申请中',
    date: '2024-03-15'
  },
  {
    title: '多传感器融合的农田导航系统',
    description: '集成GPS、激光雷达等多传感器的自主导航技术',
    type: '发明专利',
    status: '准备申请',
    date: '2024-06-01'
  },
  {
    title: '自适应播种深度控制装置',
    description: '根据土壤条件自动调节播种深度的机械装置',
    type: '实用新型',
    status: '已授权',
    date: '2024-01-20'
  }
]

const academicPapers = [
  {
    title: '基于深度学习的农作物种子识别算法研究',
    journal: '农业工程学报',
    status: '已发表',
    date: '2024-02'
  },
  {
    title: '智能农业机器人路径规划优化算法',
    journal: '机器人学报',
    status: '审稿中',
    date: '2024-04'
  },
  {
    title: '多模态传感器融合在精准农业中的应用',
    journal: 'IEEE Transactions on Agriculture',
    status: '准备投稿',
    date: '2024-07'
  }
]

const economicBenefits = [
  {
    category: '成本节约',
    value: '60%',
    description: '相比传统播种方式，大幅降低人工和运营成本'
  },
  {
    category: '效率提升',
    value: '3倍',
    description: '播种效率显著提高，缩短农忙季节作业时间'
  },
  {
    category: '产量增加',
    value: '15%',
    description: '精准播种提高作物出苗率和最终产量'
  },
  {
    category: '市场规模',
    value: '100亿',
    description: '预计未来5年智能农机市场规模'
  }
]

const socialBenefits = [
  '缓解农业劳动力短缺问题',
  '提高农业生产现代化水平',
  '促进农业可持续发展',
  '推动乡村振兴战略实施',
  '增加农民收入和生活质量',
  '减少农业生产环境污染',
  '培养农业科技人才队伍',
  '提升国家农业竞争力'
]

const pilotApplications = [
  {
    location: '山东寿光',
    status: '进行中',
    area: '500亩',
    crop: '玉米',
    improvement: '+25%',
    description: '在大型农业合作社进行玉米播种试验，效果显著'
  },
  {
    location: '河南商丘',
    status: '计划中',
    area: '800亩',
    crop: '小麦',
    improvement: '+30%',
    description: '与当地农业部门合作，开展小麦精准播种示范'
  },
  {
    location: '江苏盐城',
    status: '准备中',
    area: '300亩',
    crop: '水稻',
    improvement: '+20%',
    description: '在水稻种植基地测试适应性播种技术'
  }
]

const shortTermGoals = [
  '完成产品原型开发和测试',
  '申请核心技术专利保护',
  '建立3个试点应用基地',
  '完成技术标准制定',
  '组建产业化团队',
  '获得天使轮融资'
]

const longTermVision = [
  '实现产品规模化生产',
  '建立全国销售服务网络',
  '拓展国际市场合作',
  '开发系列化产品线',
  '成为行业技术标准制定者',
  '推动智能农业生态建设'
]

const getPatentStatusClass = (status: string) => {
  switch (status) {
    case '已授权': return 'bg-green-100 text-green-700'
    case '申请中': return 'bg-yellow-100 text-yellow-700'
    case '准备申请': return 'bg-blue-100 text-blue-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
</script>