<template>
  <div class="pt-16 min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">进度管理</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          项目开发进度跟踪与里程碑管理
        </p>
      </div>

      <!-- Overall Progress -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <el-icon class="text-blue-600 mr-3"><TrendCharts /></el-icon>
            总体进度
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-lg font-semibold text-gray-900">项目完成度</span>
                  <span class="text-2xl font-bold text-blue-600">{{ overallProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4">
                  <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-2000"
                       :style="{ width: overallProgress + '%' }"></div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 rounded-lg bg-blue-50">
                  <div class="text-2xl font-bold text-blue-600">{{ completedTasks }}</div>
                  <div class="text-sm text-gray-600">已完成任务</div>
                </div>
                <div class="text-center p-4 rounded-lg bg-green-50">
                  <div class="text-2xl font-bold text-green-600">{{ remainingDays }}</div>
                  <div class="text-sm text-gray-600">剩余天数</div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">阶段进度</h3>
              <div class="space-y-4">
                <div v-for="phase in projectPhases" :key="phase.name"
                     class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full"
                         :class="getPhaseStatusColor(phase.status)"></div>
                    <span class="font-medium text-gray-900">{{ phase.name }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-semibold">{{ phase.progress }}%</span>
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                           :style="{ width: phase.progress + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-green-600 mr-3"><Clock /></el-icon>
            项目时间线
          </h2>
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-blue-600"></div>
            <div class="space-y-8">
              <div v-for="(milestone, index) in milestones" :key="index"
                   class="relative flex items-start space-x-6">
                <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                     :class="getMilestoneStatusClass(milestone.status)">
                  <el-icon v-if="milestone.status === 'completed'" class="text-white"><Check /></el-icon>
                  <el-icon v-else-if="milestone.status === 'current'" class="text-white"><Clock /></el-icon>
                  <span v-else class="text-white font-bold text-sm">{{ index + 1 }}</span>
                </div>
                <div class="flex-1 pb-8">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ milestone.title }}</h3>
                    <span class="text-sm font-medium"
                          :class="getMilestoneStatusTextClass(milestone.status)">
                      {{ milestone.date }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-3">{{ milestone.description }}</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">主要任务：</h4>
                      <ul class="space-y-1">
                        <li v-for="task in milestone.tasks" :key="task" 
                            class="flex items-center space-x-2 text-gray-600 text-sm">
                          <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span>{{ task }}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900 mb-2">交付成果：</h4>
                      <ul class="space-y-1">
                        <li v-for="deliverable in milestone.deliverables" :key="deliverable" 
                            class="flex items-center space-x-2 text-gray-600 text-sm">
                          <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{{ deliverable }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Task Management -->
      <section class="mb-16" data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-purple-600 mr-3"><List /></el-icon>
            任务管理
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div v-for="(column, status) in taskColumns" :key="status"
                 class="bg-gray-50 rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                {{ column.title }}
                <span class="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {{ column.tasks.length }}
                </span>
              </h3>
              <div class="space-y-3">
                <div v-for="task in column.tasks" :key="task.id"
                     class="bg-white p-4 rounded-lg shadow-sm border-l-4"
                     :class="getTaskBorderColor(status)">
                  <h4 class="font-medium text-gray-900 mb-2">{{ task.title }}</h4>
                  <p class="text-gray-600 text-sm mb-3">{{ task.description }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{{ task.assignee }}</span>
                    <span class="text-xs font-medium"
                          :class="getPriorityColor(task.priority)">
                      {{ task.priority }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Resource Allocation -->
      <section data-aos="fade-up">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <el-icon class="text-orange-600 mr-3"><PieChart /></el-icon>
            资源分配
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">团队分工</h3>
              <div class="space-y-4">
                <div v-for="team in teamAllocation" :key="team.name"
                     class="flex items-center justify-between p-4 rounded-lg bg-orange-50">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold text-sm">{{ team.members }}</span>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ team.name }}</h4>
                      <p class="text-gray-600 text-sm">{{ team.responsibility }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-orange-600">{{ team.allocation }}%</div>
                    <div class="text-xs text-gray-500">工作量占比</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">预算使用</h3>
              <div class="space-y-4">
                <div v-for="budget in budgetAllocation" :key="budget.category"
                     class="p-4 rounded-lg bg-blue-50">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="font-semibold text-gray-900">{{ budget.category }}</h4>
                    <span class="text-sm font-medium text-blue-600">{{ budget.percentage }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                         :style="{ width: budget.percentage + '%' }"></div>
                  </div>
                  <div class="flex justify-between text-sm text-gray-600">
                    <span>已使用: ¥{{ budget.used.toLocaleString() }}</span>
                    <span>总预算: ¥{{ budget.total.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const overallProgress = ref(75)
const completedTasks = ref(28)
const remainingDays = ref(45)

const projectPhases = [
  { name: '需求分析', progress: 100, status: 'completed' },
  { name: '系统设计', progress: 100, status: 'completed' },
  { name: '开发实现', progress: 80, status: 'current' },
  { name: '测试验证', progress: 30, status: 'current' },
  { name: '部署上线', progress: 0, status: 'pending' }
]

const milestones = [
  {
    title: '项目启动',
    date: '2024年1月',
    status: 'completed',
    description: '完成项目立项、团队组建和需求调研',
    tasks: [
      '项目立项申请',
      '团队成员招募',
      '需求调研分析',
      '技术方案论证'
    ],
    deliverables: [
      '项目计划书',
      '需求规格说明',
      '技术方案文档'
    ]
  },
  {
    title: '系统设计',
    date: '2024年3月',
    status: 'completed',
    description: '完成系统架构设计和详细设计',
    tasks: [
      '系统架构设计',
      '数据库设计',
      '接口设计',
      '算法设计'
    ],
    deliverables: [
      '系统设计文档',
      '数据库设计文档',
      'API接口文档'
    ]
  },
  {
    title: '核心开发',
    date: '2024年6月',
    status: 'current',
    description: '开发核心算法和系统功能',
    tasks: [
      '机器视觉算法开发',
      '深度学习模型训练',
      '控制系统开发',
      '硬件集成'
    ],
    deliverables: [
      '算法模块',
      '控制系统',
      '硬件原型'
    ]
  },
  {
    title: '系统测试',
    date: '2024年9月',
    status: 'pending',
    description: '进行系统测试和性能优化',
    tasks: [
      '单元测试',
      '集成测试',
      '性能测试',
      '田间试验'
    ],
    deliverables: [
      '测试报告',
      '性能分析报告',
      '试验数据'
    ]
  },
  {
    title: '项目交付',
    date: '2024年12月',
    status: 'pending',
    description: '完成项目交付和验收',
    tasks: [
      '系统部署',
      '用户培训',
      '文档整理',
      '项目验收'
    ],
    deliverables: [
      '最终产品',
      '用户手册',
      '项目总结报告'
    ]
  }
]

const taskColumns = {
  todo: {
    title: '待办任务',
    tasks: [
      {
        id: 1,
        title: '深度学习模型优化',
        description: '优化种子识别模型的准确率',
        assignee: '张工程师',
        priority: '高'
      },
      {
        id: 2,
        title: '控制算法调试',
        description: '调试机械臂控制算法',
        assignee: '李工程师',
        priority: '中'
      }
    ]
  },
  inProgress: {
    title: '进行中',
    tasks: [
      {
        id: 3,
        title: '硬件集成测试',
        description: '进行硬件系统集成测试',
        assignee: '王工程师',
        priority: '高'
      },
      {
        id: 4,
        title: '用户界面开发',
        description: '开发操作界面和监控系统',
        assignee: '赵工程师',
        priority: '中'
      }
    ]
  },
  done: {
    title: '已完成',
    tasks: [
      {
        id: 5,
        title: '需求分析',
        description: '完成用户需求调研和分析',
        assignee: '项目组',
        priority: '高'
      },
      {
        id: 6,
        title: '系统架构设计',
        description: '完成整体系统架构设计',
        assignee: '架构师',
        priority: '高'
      }
    ]
  }
}

const teamAllocation = [
  {
    name: '算法团队',
    members: 4,
    responsibility: '机器视觉和深度学习算法开发',
    allocation: 35
  },
  {
    name: '硬件团队',
    members: 3,
    responsibility: '硬件系统设计和集成',
    allocation: 25
  },
  {
    name: '软件团队',
    members: 3,
    responsibility: '控制软件和用户界面开发',
    allocation: 25
  },
  {
    name: '测试团队',
    members: 2,
    responsibility: '系统测试和质量保证',
    allocation: 15
  }
]

const budgetAllocation = [
  {
    category: '硬件设备',
    percentage: 45,
    used: 180000,
    total: 200000
  },
  {
    category: '软件开发',
    percentage: 30,
    used: 90000,
    total: 120000
  },
  {
    category: '人员成本',
    percentage: 60,
    used: 240000,
    total: 300000
  },
  {
    category: '测试验证',
    percentage: 25,
    used: 25000,
    total: 80000
  }
]

const getPhaseStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'current': return 'bg-blue-500'
    default: return 'bg-gray-300'
  }
}

const getMilestoneStatusClass = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-500'
    case 'current': return 'bg-blue-500'
    default: return 'bg-gray-300'
  }
}

const getMilestoneStatusTextClass = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-600'
    case 'current': return 'text-blue-600'
    default: return 'text-gray-500'
  }
}

const getTaskBorderColor = (status: string) => {
  switch (status) {
    case 'todo': return 'border-gray-400'
    case 'inProgress': return 'border-blue-500'
    case 'done': return 'border-green-500'
    default: return 'border-gray-300'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case '高': return 'text-red-600'
    case '中': return 'text-yellow-600'
    case '低': return 'text-green-600'
    default: return 'text-gray-600'
  }
}
</script>