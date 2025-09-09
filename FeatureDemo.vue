<template>
  <div class="feature-demo-bg min-h-screen w-full flex flex-col items-center px-0 py-0 relative overflow-hidden">
    <header class="w-full flex flex-col items-center py-12 bg-gradient-to-r from-blue-500 via-purple-600 to-green-400 shadow-2xl">
      <h1 class="text-6xl font-extrabold text-white drop-shadow-glow tracking-tight">智能机器人功能演示</h1>
      <div class="text-2xl text-white/80 mt-2">实时交互 · 智能农业 · 科技赋能</div>
    </header>
    <main class="w-full max-w-[1600px] mx-auto flex flex-col gap-16 py-16 px-8">
      <!-- 智能播种实时演示 -->
      <section class="glass-card card-3d flex flex-col p-10 min-h-[480px] relative shadow-xl mb-8">
        <h2 class="text-4xl font-bold text-blue-700 mb-6 flex items-center gap-2">智能播种</h2>
        <div class="flex flex-col md:flex-row gap-8 flex-1">
          <!-- 参数调节区（内容丰富） -->
          <div class="flex flex-col gap-6 w-full md:w-1/4">
            <div class="text-lg font-semibold mb-2">播种参数</div>
            <div class="flex items-center gap-2">
              <label class="w-24">播种深度</label>
              <input type="range" min="1" max="10" v-model="seedingDepth" class="w-32 accent-blue-500" />
              <span class="text-blue-600 font-bold text-lg">{{ seedingDepth }} 厘米</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">播种间距</label>
              <input type="range" min="10" max="40" step="2" v-model="seedingSpacing" class="w-32 accent-green-500" />
              <span class="text-green-600 font-bold text-lg">{{ seedingSpacing }} 厘米</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">播种速度</label>
              <input type="range" min="0.5" max="3" step="0.1" v-model="animationSpeed" class="w-32 accent-purple-500" />
              <span class="text-purple-600 font-bold text-lg">{{ animationSpeed }} 秒/格</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">行数</label>
              <input type="number" min="1" max="8" v-model="rows" class="rounded px-2 py-1 text-lg w-20" />
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">作业模式</label>
              <select v-model="seedingMode" class="rounded px-2 py-1 text-lg">
                <option value="auto">自动</option>
                <option value="manual">手动</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">作物类型</label>
              <select v-model="seedType" class="rounded px-2 py-1 text-lg">
                <option value="corn">玉米</option>
                <option value="wheat">小麦</option>
                <option value="soy">大豆</option>
              </select>
            </div>
            <button @click="resetSeeding" class="mt-2 px-4 py-1 rounded-xl bg-gradient-to-r from-blue-200 to-green-200 text-blue-900 font-bold shadow hover:scale-105 transition">重置播种</button>
          </div>
          <!-- 实时可视化区（交互升级） -->
          <div class="flex-1 flex flex-col items-center justify-center relative">
            <svg :width="400" :height="180" class="bg-gradient-to-br from-green-200 to-green-50 rounded-2xl shadow border-2 border-green-200"
              @click="onFieldClick($event)"
              @touchstart="onFieldTouchStart($event)"
              @touchmove="onFieldTouchMove($event)"
              @touchend="onFieldTouchEnd($event)">
              <rect x="20" y="40" width="360" height="100" rx="24" fill="url(#soil)" stroke="#22c55e" stroke-width="3" />
              <defs>
                <linearGradient id="soil" x1="0" y1="40" x2="0" y2="140" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#bbf7d0"/>
                  <stop offset="1" stop-color="#fef9c3"/>
                </linearGradient>
              </defs>
              <!-- 已播种点阵 -->
              <g>
                <circle v-for="dot in planted" :key="dot.x+'-'+dot.row" :cx="dot.x" :cy="60+dot.row*20" :r="seedingDepth*2" :fill="seedColor" opacity="0.9" />
              </g>
              <!-- 下落中的种子 -->
              <g v-if="droppingSeed">
                <circle :cx="droppingSeed.x" :cy="carY+carHeight+(60+droppingSeed.row*20-carY-carHeight)*droppingSeed.progress" :r="seedingDepth*2" :fill="seedColor" opacity="0.8" />
              </g>
              <!-- 小车（可拖拽） -->
              <g :transform="`translate(${carX},${carY})`" @mousedown="startDragCar" @touchstart="startDragCarTouch">
                <rect x="-carWidth/2" y="0" :width="carWidth" :height="carHeight" rx="8" fill="#38bdf8" stroke="#2563eb" stroke-width="3"/>
                <rect x="-carWidth/4" y="carHeight-8" :width="carWidth/2" height="8" rx="4" fill="#a7f3d0"/>
                <circle :cx="-carWidth/4" :cy="carHeight+6" r="6" fill="#2563eb"/>
                <circle :cx="carWidth/4" :cy="carHeight+6" r="6" fill="#2563eb"/>
                <rect x="-4" :y="carHeight-2" width="8" height="6" rx="2" fill="#fbbf24"/>
              </g>
            </svg>
          </div>
          <!-- 数据统计区（内容丰富） -->
          <div class="flex flex-col gap-4 w-full md:w-1/4 justify-center">
            <div class="text-lg font-semibold mb-2">播种统计</div>
            <div class="text-2xl font-bold text-blue-800">当前播种总数：{{ totalSeeds }}</div>
            <div class="text-2xl font-bold text-green-800">单行播种数：{{ seedsPerRow }}</div>
            <div class="text-2xl font-bold text-purple-800">总行数：{{ rows }}</div>
            <div class="text-2xl font-bold text-yellow-800">覆盖面积：{{ coverageArea }} ㎡</div>
            <div class="text-2xl font-bold text-rose-700">预计能耗：{{ (totalSeeds * seedingDepth * 0.05).toFixed(1) }} kJ</div>
            <div class="text-2xl font-bold text-cyan-800">预计完成时间：{{ estTime }} 分钟</div>
          </div>
        </div>
        <!-- 说明区（内容丰富） -->
        <div class="text-base text-gray-700 mt-4 space-y-2">
          <div><b>智能播种原理：</b> 通过高精度定位与作业参数自适应，自动完成多行多作物高效播种。</div>
          <div><b>优势：</b> 精准控制播种深度与间距，提升作物出苗率，降低人工成本。</div>
          <div><b>适用作物：</b> 玉米、小麦、大豆等多种农作物。</div>
          <div><b>技术亮点：</b> 自动/手动切换、实时参数调节、交互式播种、能耗估算。</div>
        </div>
      </section>
      <!-- 智能路径规划与避障演示 -->
      <section class="glass-card card-3d flex flex-col p-10 min-h-[520px] relative shadow-xl mb-8">
        <h2 class="text-4xl font-bold text-purple-900 mb-6">智能路径规划与避障演示</h2>
        <div class="flex flex-col md:flex-row gap-8 flex-1">
          <!-- 参数调节区（内容丰富） -->
          <div class="flex flex-col gap-6 w-full md:w-1/4">
            <div class="text-lg font-semibold mb-2">路径与避障参数</div>
            <div class="flex items-center gap-2">
              <label class="w-28">起点</label>
              <input v-model="navStart" class="rounded px-2 py-1 text-lg w-32" placeholder="如A" />
            </div>
            <div class="flex items-center gap-2">
              <label class="w-28">终点</label>
              <input v-model="navEnd" class="rounded px-2 py-1 text-lg w-32" placeholder="如B" />
            </div>
            <div class="flex items-center gap-2">
              <label class="w-28">路径规划算法</label>
              <select v-model="navAlgo" class="rounded px-2 py-1 text-lg">
                <option value="A*">A*算法</option>
                <option value="Dijkstra">Dijkstra</option>
                <option value="RRT">RRT</option>
                <option value="DWA">DWA</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-28">避障策略</label>
              <select v-model="navStrategy" class="rounded px-2 py-1 text-lg">
                <option value="静态避障">静态避障</option>
                <option value="动态避障">动态避障</option>
                <option value="多传感器融合">多传感器融合</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-28">导航模式</label>
              <select v-model="navMode" class="rounded px-2 py-1 text-lg">
                <option value="shortest">最短路径</option>
                <option value="safe">最安全</option>
                <option value="eco">节能</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-28">速度调节</label>
              <input type="range" min="1" max="5" v-model="navSpeed" class="w-32 accent-blue-500" />
              <span class="text-blue-600 font-bold text-lg">{{ navSpeed }} m/s</span>
            </div>
            <button @click="addObstacle" class="mt-2 px-4 py-1 rounded-xl bg-gradient-to-r from-rose-200 to-purple-200 text-purple-900 font-bold shadow hover:scale-105 transition">添加障碍物</button>
          </div>
          <!-- 路径规划可视化区（简洁+基础交互） -->
          <div class="flex-1 flex flex-col items-center justify-center relative">
            <svg :width="400" :height="180" class="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow border-2 border-blue-200">
              <g>
                <rect v-for="i in 8" :key="i" :x="20+i*40" y="40" width="36" height="100" rx="8" fill="#e0e7ef" opacity="0.3" />
                <rect v-for="j in 2" :key="'r'+j" x="20" :y="40+j*40" width="360" height="36" rx="8" fill="#e0e7ef" opacity="0.3" />
              </g>
              <g>
                <circle :cx="navPath[0].x" :cy="navPath[0].y" r="12" fill="#22d3ee" stroke="#2563eb" stroke-width="3"/>
                <text :x="navPath[0].x" :y="navPath[0].y+5" text-anchor="middle" font-size="16" fill="#fff">起</text>
                <circle :cx="navPath[navPath.length-1].x" :cy="navPath[navPath.length-1].y" r="12" fill="#fbbf24" stroke="#a16207" stroke-width="3"/>
                <text :x="navPath[navPath.length-1].x" :y="navPath[navPath.length-1].y+5" text-anchor="middle" font-size="16" fill="#fff">终</text>
              </g>
              <polyline :points="navPathPoints" fill="none" stroke="#a21caf" stroke-width="5" stroke-linecap="round" />
              <g :transform="`translate(${robotPos.x},${robotPos.y})`">
                <rect x="-14" y="-10" width="28" height="20" rx="6" fill="#38bdf8" stroke="#2563eb" stroke-width="2"/>
                <rect x="-8" y="6" width="16" height="6" rx="3" fill="#a7f3d0"/>
                <circle cx="-8" cy="14" r="4" fill="#2563eb"/>
                <circle cx="8" cy="14" r="4" fill="#2563eb"/>
              </g>
              <g>
                <rect v-for="(obs,idx) in obstacles" :key="'obs'+idx" :x="obs.x" :y="obs.y" width="24" height="24" rx="6" fill="#f87171" stroke="#b91c1c" stroke-width="2" @mousedown="startDragObstacle(idx)" style="cursor:pointer" />
              </g>
            </svg>
          </div>
          <!-- 统计区（内容丰富） -->
          <div class="flex flex-col gap-4 w-full md:w-1/4 justify-center">
            <div class="text-lg font-semibold mb-2">路径与避障统计</div>
            <div class="text-2xl font-bold text-purple-800">路径长度：{{ navPathLength }} 米</div>
            <div class="text-2xl font-bold text-green-800">避障次数：{{ navAvoidCount }}</div>
            <div class="text-2xl font-bold text-blue-800">预计耗时：{{ navEstTime }} 秒</div>
            <div class="text-2xl font-bold text-cyan-800">路径节点数：{{ navPath.length }}</div>
            <div class="text-2xl font-bold text-yellow-800">总拐点数：{{ navPath.length-2 }}</div>
            <div class="text-2xl font-bold text-rose-700">能耗估算：{{ (navPathLength*navSpeed*0.2).toFixed(1) }} kJ</div>
          </div>
          <!-- 说明区（内容丰富） -->
          <div class="text-base text-gray-700 mt-4 space-y-2">
            <div><b>路径规划原理：</b> 支持A*、Dijkstra、RRT、DWA等多种主流路径规划算法，结合实际场景灵活切换。</div>
            <div><b>避障策略：</b> 可选静态避障、动态避障、多传感器融合，适应复杂环境。</div>
            <div><b>应用场景：</b> 适用于农田作业、仓储物流、园区巡检等多种智能机器人场景。</div>
            <div><b>技术亮点：</b> 实时路径重算、智能避障、能耗优化、参数可调、动态可视化。</div>
          </div>
        </div>
      </section>
      <!-- 土壤环境智能检测演示 -->
      <section class="glass-card card-3d flex flex-col p-10 min-h-[480px] relative shadow-xl mb-8">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">土壤传感器检测演示</h2>
        <div class="flex flex-col md:flex-row gap-8 flex-1">
          <!-- 参数调节区（内容丰富） -->
          <div class="flex flex-col gap-6 w-full md:w-1/4">
            <div class="text-lg font-semibold mb-2">检测参数</div>
            <div class="flex items-center gap-2">
              <label class="w-24">传感器类型</label>
              <select v-model="sensorType" class="rounded px-2 py-1 text-lg">
                <option value="moisture">土壤湿度</option>
                <option value="temp">温度</option>
                <option value="ph">PH值</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">采样点数量</label>
              <input type="range" min="5" max="30" v-model="sensorCount" class="w-32 accent-green-500" />
              <span class="text-green-600 font-bold text-lg">{{ sensorCount }}</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">检测频率</label>
              <input type="range" min="1" max="10" v-model="sensorFreq" class="w-32 accent-blue-500" />
              <span class="text-blue-600 font-bold text-lg">{{ sensorFreq }} 秒</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">检测深度</label>
              <input type="range" min="10" max="60" v-model="sensorDepth" class="w-32 accent-purple-500" />
              <span class="text-purple-600 font-bold text-lg">{{ sensorDepth }} 厘米</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">异常阈值</label>
              <input type="number" v-model="sensorThresholds[sensorType].min" class="rounded px-2 py-1 text-lg w-20" />
            </div>
            <div class="flex items-center gap-2">
              <label class="w-24">采样模式</label>
              <select v-model="sensorMode" class="rounded px-2 py-1 text-lg">
                <option value="auto">自动</option>
                <option value="manual">手动</option>
              </select>
            </div>
          </div>
          <!-- 检测过程可视化区（交互升级） -->
          <div class="flex-1 flex flex-col items-center justify-center relative">
            <svg :width="400" :height="180" class="bg-gradient-to-br from-yellow-100 to-green-50 rounded-2xl shadow border-2 border-yellow-200">
              <rect x="30" y="100" width="340" height="60" rx="18" fill="#bbf7d0" stroke="#22c55e" stroke-width="2" />
              <rect x="30" y="140" width="340" height="20" rx="8" fill="#fef9c3" stroke="#eab308" stroke-width="1" />
              <!-- 传感器探头动画（可拖拽/触摸） -->
              <g v-for="(s,i) in sensors" :key="i">
                <rect :x="s.x-4" y="80" width="8" height="30" rx="3" fill="#2563eb" stroke="#1e40af" stroke-width="1"
                  @mousedown="startDragSensor(i)" @touchstart="startDragSensorTouch(i)" />
                <circle :cx="s.x" cy="110" r="8" fill="#38bdf8" stroke="#2563eb" stroke-width="2" />
                <rect :x="s.x-2" :y="110" width="4" height="Math.max(0, s.y-110)" rx="2" fill="#a7f3d0"/>
                <circle :cx="s.x" :cy="s.y" r="10" :fill="sensorColor(s.value)" :stroke="(s.value<sensorThresholds[sensorType].min||s.value>sensorThresholds[sensorType].max)?'#f87171':'#22d3ee'" :stroke-width="(s.value<sensorThresholds[sensorType].min||s.value>sensorThresholds[sensorType].max)?4:2" @click="tipIndex=i" />
              </g>
              <!-- tip浮层 -->
              <g v-if="tipIndex!==null">
                <rect :x="sensors[tipIndex].x-40" :y="sensors[tipIndex].y-38" width="80" height="32" rx="8" fill="#fff" opacity="0.95" stroke="#22d3ee" />
                <text :x="sensors[tipIndex].x" :y="sensors[tipIndex].y-18" text-anchor="middle" font-size="15" fill="#2563eb">
                  {{ sensorType==='moisture'?'湿度':sensorType==='temp'?'温度':'PH值' }}：{{ sensors[tipIndex].value }}
                </text>
              </g>
            </svg>
            <button @click="refreshSensors" class="mt-2 px-4 py-1 rounded-xl bg-gradient-to-r from-blue-200 to-green-200 text-blue-900 font-bold shadow hover:scale-105 transition">手动刷新</button>
            <!-- 历史趋势小折线图 -->
            <svg width="300" height="60" class="mt-4">
              <polyline :points="trendPoints" fill="none" stroke="#16a34a" stroke-width="3"/>
              <circle v-for="(p,i) in trendPoints.split(' ')" :key="i" :cx="p.split(',')[0]" :cy="p.split(',')[1]" r="3" fill="#16a34a"/>
            </svg>
          </div>
          <!-- 统计区（内容丰富） -->
          <div class="flex flex-col gap-4 w-full md:w-1/4 justify-center">
            <div class="text-lg font-semibold mb-2">检测统计</div>
            <div class="text-2xl font-bold text-green-800">平均值：{{ avgSensorValue }}</div>
            <div class="text-2xl font-bold text-blue-800">最大值：{{ maxSensorValue }}</div>
            <div class="text-2xl font-bold text-yellow-800">最小值：{{ minSensorValue }}</div>
            <div class="text-2xl font-bold text-rose-700">异常点数：{{ abnormalCount }}</div>
            <div class="text-2xl font-bold text-cyan-700">正常点数：{{ normalCount }}</div>
            <div class="text-2xl font-bold text-purple-800">历史异常次数：{{ historyAbnormalCount }}</div>
            <div class="text-2xl font-bold text-fuchsia-800">采样总数：{{ totalSampleCount }}</div>
            <div class="text-2xl font-bold text-emerald-800">实时波动幅度：{{ sensorFluctuation }}</div>
          </div>
        </div>
        <!-- 说明区（内容丰富） -->
        <div class="text-base text-gray-700 mt-4 space-y-2">
          <div><b>智能检测原理：</b> 通过多类型传感器融合，实时采集土壤环境多维数据，智能识别异常。</div>
          <div><b>预警机制：</b> 支持自定义阈值，自动高亮异常点，历史异常统计，辅助科学决策。</div>
          <div><b>数据利用场景：</b> 农田水肥管理、作物健康监测、精准农业等。</div>
          <div><b>技术亮点：</b> 交互式探头拖拽、采样点高亮、实时趋势分析、异常预警。</div>
        </div>
      </section>
    </main>

    <!-- 3. 系统架构树状图（内容丰富升级） -->
    <section class="glass-card card-3d p-10 shadow-2xl rounded-3xl bg-gradient-to-br from-white/80 to-cyan-100/60 backdrop-blur-2xl mb-12 max-w-[1200px] mx-auto animate-fadein">
      <h2 class="text-4xl font-bold text-gray-900 mb-6">系统架构树状图</h2>
      <div class="flex flex-col md:flex-row gap-8 flex-1">
        <div class="flex-1 flex flex-col items-center justify-center">
          <svg width="600" height="320" class="drop-shadow-2xl">
            <defs>
              <linearGradient id="mainGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#a21caf"/>
              </linearGradient>
              <linearGradient id="subGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#a7f3d0"/>
                <stop offset="100%" stop-color="#fef08a"/>
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <!-- 感知层主节点 -->
            <g @click="selectArchNode('感知层')" style="cursor:pointer">
              <rect x="260" y="20" width="80" height="48" rx="18" fill="url(#mainGrad)" filter="url(#glow)" />
              <text x="300" y="50" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">感知层</text>
            </g>
            <g @click="selectArchNode('传感器管理')" style="cursor:pointer">
              <rect x="120" y="90" width="100" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="170" y="116" text-anchor="middle" font-size="17" fill="#2563eb">传感器管理</text>
            </g>
            <g @click="selectArchNode('数据采集')" style="cursor:pointer">
              <rect x="260" y="90" width="80" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="300" y="116" text-anchor="middle" font-size="17" fill="#2563eb">数据采集</text>
            </g>
            <g @click="selectArchNode('环境监测')" style="cursor:pointer">
              <rect x="380" y="90" width="100" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="430" y="116" text-anchor="middle" font-size="17" fill="#2563eb">环境监测</text>
            </g>
            <!-- 决策层主节点 -->
            <g @click="selectArchNode('决策层')" style="cursor:pointer">
              <rect x="260" y="170" width="80" height="48" rx="18" fill="url(#mainGrad)" filter="url(#glow)" />
              <text x="300" y="200" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">决策层</text>
            </g>
            <g @click="selectArchNode('路径规划')" style="cursor:pointer">
              <rect x="120" y="240" width="100" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="170" y="266" text-anchor="middle" font-size="17" fill="#a21caf">路径规划</text>
            </g>
            <g @click="selectArchNode('任务分配')" style="cursor:pointer">
              <rect x="260" y="240" width="80" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="300" y="266" text-anchor="middle" font-size="17" fill="#a21caf">任务分配</text>
            </g>
            <g @click="selectArchNode('智能决策')" style="cursor:pointer">
              <rect x="380" y="240" width="100" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="430" y="266" text-anchor="middle" font-size="17" fill="#a21caf">智能决策</text>
            </g>
            <!-- 执行层主节点 -->
            <g @click="selectArchNode('执行层')" style="cursor:pointer">
              <rect x="260" y="320" width="80" height="48" rx="18" fill="url(#mainGrad)" filter="url(#glow)" />
              <text x="300" y="350" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">执行层</text>
            </g>
            <g @click="selectArchNode('运动控制')" style="cursor:pointer">
              <rect x="120" y="390" width="100" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="170" y="416" text-anchor="middle" font-size="17" fill="#2563eb">运动控制</text>
            </g>
            <g @click="selectArchNode('作业执行')" style="cursor:pointer">
              <rect x="260" y="390" width="80" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="300" y="416" text-anchor="middle" font-size="17" fill="#2563eb">作业执行</text>
            </g>
            <g @click="selectArchNode('状态反馈')" style="cursor:pointer">
              <rect x="380" y="390" width="100" height="40" rx="14" fill="#fff" fill-opacity="0.7" filter="url(#glow)" />
              <text x="430" y="416" text-anchor="middle" font-size="17" fill="#2563eb">状态反馈</text>
            </g>
            <!-- 层间数据流动箭头和说明 -->
            <g stroke="#06b6d4" stroke-width="2" marker-end="url(#arrow)">
              <line x1="300" y1="68" x2="300" y2="90" />
              <text x="310" y="80" font-size="13" fill="#06b6d4">数据上传</text>
              <line x1="300" y1="130" x2="300" y2="170" />
              <text x="310" y="150" font-size="13" fill="#06b6d4">决策下发</text>
              <line x1="300" y1="218" x2="300" y2="240" />
              <text x="310" y="230" font-size="13" fill="#06b6d4">作业指令</text>
            </g>
          </svg>
          <!-- 系统协同流程时序简图 -->
          <div class="w-full flex justify-center mt-4">
            <svg width="420" height="40">
              <g font-size="16" font-weight="bold">
                <text x="20" y="28">感知</text>
                <text x="120" y="28">决策</text>
                <text x="220" y="28">执行</text>
                <text x="320" y="28">反馈</text>
              </g>
              <g stroke="#06b6d4" stroke-width="3" marker-end="url(#arrow)">
                <line x1="55" y1="20" x2="115" y2="20" />
                <line x1="155" y1="20" x2="215" y2="20" />
                <line x1="255" y1="20" x2="315" y2="20" />
              </g>
            </svg>
          </div>
        </div>
        <!-- 右侧说明区 -->
        <div class="flex-1 flex flex-col justify-center">
          <div class="text-lg font-bold mb-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-50 text-cyan-900 shadow-lg">层次化展示系统架构</div>
          <ul class="text-base text-gray-700 mb-2 list-disc pl-6">
            <li>感知层、决策层、执行层的模块化设计</li>
            <li>清晰的组件关系和数据流向</li>
            <li>各层之间通过数据流实现高效协同</li>
          </ul>
          <div class="mt-4 p-4 bg-white/80 rounded-xl shadow text-gray-800 min-h-[120px]">
            <b>【{{ archNodeTitle }}】</b>
            <div>{{ archNodeDesc }}</div>
          </div>
          <div class="mt-4 text-base text-gray-700">
            <b>典型应用场景：</b> 智能农机、自动化仓储、园区巡检、无人配送等。
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 性能分析井状图（内容丰富升级） -->
    <section class="glass-card card-3d p-10 shadow-2xl rounded-3xl bg-gradient-to-br from-white/80 to-fuchsia-100/60 backdrop-blur-2xl mb-12 max-w-[1200px] mx-auto animate-fadein">
      <h2 class="text-4xl font-bold text-gray-900 mb-6">性能分析井状图</h2>
      <div class="flex flex-col md:flex-row gap-8 flex-1">
        <div class="flex-1 flex flex-col items-center justify-center">
          <svg width="520" height="260" class="drop-shadow-2xl">
            <defs>
              <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#a21caf"/>
              </linearGradient>
              <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#a21caf"/>
                <stop offset="100%" stop-color="#fbbf24"/>
              </linearGradient>
              <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#22d3ee"/>
                <stop offset="100%" stop-color="#38bdf8"/>
              </linearGradient>
              <linearGradient id="barGrad4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fbbf24"/>
                <stop offset="100%" stop-color="#a21caf"/>
              </linearGradient>
              <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g v-for="(bar, idx) in performanceData" :key="bar.label" @click="selectPerfBar(idx)" style="cursor:pointer">
              <rect :x="60+idx*100" :y="220-bar.value*2" width="60" :height="bar.value*2" rx="24" :fill="bar.gradient" filter="url(#barGlow)" />
              <rect :x="60+idx*100" y="180" width="60" height="40" fill="#d1d5db" rx="24" opacity="0.6" />
              <text :x="90+idx*100" y="175" text-anchor="middle" font-size="18" fill="#888">传统方式</text>
              <text :x="90+idx*100" y="250" text-anchor="middle" font-size="20" fill="#333" font-weight="bold">{{ bar.label }}</text>
              <text :x="90+idx*100" :y="210-bar.value*2" text-anchor="middle" font-size="22" fill="#a21caf" font-weight="bold">{{ bar.value }}</text>
              <text :x="90+idx*100" y="265" text-anchor="middle" font-size="14" fill="#666">{{ bar.desc }}</text>
            </g>
          </svg>
          <!-- 性能提升流程简图 -->
          <div class="w-full flex justify-center mt-4">
            <svg width="420" height="40">
              <g font-size="16" font-weight="bold">
                <text x="20" y="28">传统</text>
                <text x="120" y="28">智能升级</text>
                <text x="320" y="28">高效智能</text>
              </g>
              <g stroke="#a21caf" stroke-width="3" marker-end="url(#arrow)">
                <line x1="55" y1="20" x2="115" y2="20" />
                <line x1="155" y1="20" x2="315" y2="20" />
              </g>
            </svg>
          </div>
        </div>
        <!-- 右侧详细对比与说明区 -->
        <div class="flex-1 flex flex-col justify-center">
          <div class="text-lg font-bold mb-4 p-4 rounded-2xl bg-gradient-to-r from-fuchsia-100 to-yellow-50 text-fuchsia-900 shadow-lg">创新的井状图可视化设计</div>
          <table class="w-full text-base text-gray-800 mb-4 border rounded-xl overflow-hidden">
            <thead class="bg-fuchsia-50">
              <tr><th class="p-2">指标</th><th class="p-2">智能方式</th><th class="p-2">传统方式</th><th class="p-2">提升率</th></tr>
            </thead>
            <tbody>
              <tr v-for="row in perfTable" :key="row.label">
                <td class="p-2">{{ row.label }}</td>
                <td class="p-2">{{ row.smart }}</td>
                <td class="p-2">{{ row.trad }}</td>
                <td class="p-2">{{ row.rate }}</td>
              </tr>
            </tbody>
          </table>
          <div class="mb-2 text-base text-gray-700">平均提升率：<b>{{ avgPerfRate }}</b>，最大提升项：<b>{{ maxPerfLabel }}</b></div>
          <div class="mb-2 text-base text-gray-700">分析结论：{{ perfConclusion }}</div>
          <div class="mt-4 p-4 bg-white/80 rounded-xl shadow text-gray-800 min-h-[80px]">
            <b>【{{ perfBarTitle }}】</b>
            <div>{{ perfBarDesc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 传感器数据可视化（内容丰富升级） -->
    <section class="glass-card card-3d p-10 shadow-2xl rounded-3xl bg-gradient-to-br from-white/80 to-emerald-100/60 backdrop-blur-2xl mb-12 max-w-[1200px] mx-auto animate-fadein">
      <h2 class="text-4xl font-bold text-gray-900 mb-6">传感器数据可视化</h2>
      <div class="flex flex-col md:flex-row gap-8 flex-1">
        <div class="flex-1 flex flex-col items-center justify-center">
          <div class="flex gap-4 mb-2">
            <button v-for="type in sensorTypes" :key="type.value" @click="selectSensorType(type.value)" :class="['px-4 py-1 rounded-xl font-bold', sensorType===type.value ? 'bg-emerald-300 text-emerald-900' : 'bg-emerald-50 text-emerald-700']">{{ type.label }}</button>
            <button @click="exportSensorHistory" class="px-4 py-1 rounded-xl bg-gradient-to-r from-blue-200 to-green-200 text-blue-900 font-bold shadow hover:scale-105 transition">导出数据</button>
          </div>
          <svg width="320" height="180" class="drop-shadow-xl">
            <circle cx="160" cy="160" r="80" fill="#e0f2fe" stroke="url(#gaugeGrad)" stroke-width="12" filter="url(#gaugeGlow)" @click="selectSensorGauge" style="cursor:pointer"/>
            <path :d="sensorArcPath" fill="none" stroke="url(#gaugeGrad)" stroke-width="22" stroke-linecap="round" filter="url(#gaugeGlow)">
              <animate attributeName="d" :to="sensorArcPath" dur="1s" fill="freeze"/>
            </path>
            <text x="160" y="120" text-anchor="middle" font-size="48" fill="#16a34a" font-weight="bold">{{ sensorLiveValue }}</text>
            <text x="160" y="150" text-anchor="middle" font-size="22" fill="#2563eb">实时数值</text>
          </svg>
          <svg width="320" height="80" class="mt-4">
            <polyline :points="sensorLinePoints" fill="none" stroke="url(#lineGrad)" stroke-width="5" filter="url(#dotGlow)"/>
            <circle v-for="(v,i) in sensorHistory" :key="i" :cx="i*32" :cy="80-v*0.7" r="6" fill="#16a34a" filter="url(#dotGlow)" @click="selectSensorHistory(i)" style="cursor:pointer"/>
          </svg>
          <!-- 当前状态说明 -->
          <div class="mt-2 text-lg font-bold" :class="sensorStatusColor">当前状态：{{ sensorStatusText }}</div>
          <!-- 历史数据统计区 -->
          <div class="mt-2 text-base text-gray-700">
            最大值：<b>{{ maxSensorValue }}</b>，最小值：<b>{{ minSensorValue }}</b>，平均值：<b>{{ avgSensorValue }}</b>，异常次数：<b>{{ abnormalCount }}</b>，波动幅度：<b>{{ sensorFluctuation }}</b>
          </div>
        </div>
        <!-- 右侧说明区 -->
        <div class="flex-1 flex flex-col justify-center">
          <div class="text-lg font-bold mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-cyan-50 text-emerald-900 shadow-lg">实时传感器数据监控</div>
          <div class="mb-2 text-base text-gray-700">数据采集流程：多类型传感器实时采集土壤环境数据，自动上传至云端。</div>
          <div class="mb-2 text-base text-gray-700">异常检测机制：系统自动识别异常数据并高亮预警，支持历史异常统计。</div>
          <div class="mb-2 text-base text-gray-700">数据应用场景：农田水肥管理、作物健康监测、精准农业等。</div>
          <div class="mb-2 text-base text-gray-700">技术亮点：多类型切换、交互式数据点、历史数据导出、实时状态指示。</div>
          <div class="mt-4 p-4 bg-white/80 rounded-xl shadow text-gray-800 min-h-[80px]">
            <b>【{{ sensorDetailTitle }}】</b>
            <div>{{ sensorDetailDesc }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
// 播种动画相关
const seedingDepth = ref(5)
const seedingSpacing = ref(20)
const seedType = ref('corn')
const fieldWidth = 360
const fieldHeight = 100
const rows = ref(4)
const carWidth = 40
const carHeight = 28
const carY = ref(30)
const animationSpeed = ref(1.2) // 秒/格
const seedsPerRow = computed(() => Math.floor(fieldWidth / seedingSpacing.value))
const totalSeeds = computed(() => rows.value * seedsPerRow.value)
const coverageArea = computed(() => (totalSeeds.value * seedingSpacing.value * seedingDepth.value / 1000).toFixed(1))
const estTime = computed(() => (totalSeeds.value/30).toFixed(1))
const seedColor = computed(() => seedType.value==='corn' ? '#fbbf24' : seedType.value==='wheat' ? '#a3e635' : '#60a5fa')
const seedSvg = computed(() => seedType.value==='corn' ? '#cornSeed' : seedType.value==='wheat' ? '#wheatSeed' : '#soySeed')

// 动画状态
const carX = ref(36)
const currentRow = ref(0)
const planted = ref<Array<{x:number,y:number,row:number}>>([])
const droppingSeed = ref<{x:number,y:number,row:number,progress:number}|null>(null)
let animating = false
let animationFrame: number

function resetSeeding() {
  planted.value = []
  carX.value = 36
  currentRow.value = 0
  droppingSeed.value = null
}

function startSeeding() {
  resetSeeding()
  animating = true
  animateCar()
}

function animateCar() {
  if (!animating) return
  const row = currentRow.value
  if (row >= rows.value) {
    animating = false
    return
  }
  let col = Math.floor((carX.value-36)/seedingSpacing.value)
  if (col >= seedsPerRow.value) {
    // 下一行
    currentRow.value++
    if (currentRow.value < rows.value) {
      carX.value = 36
      setTimeout(() => animateCar(), 400)
    }
    return
  }
  // 下种动画
  droppingSeed.value = {
    x: carX.value,
    y: carY.value+carHeight,
    row,
    progress: 0
  }
  let dropStart = performance.now()
  function dropAnim(now:number) {
    if (!animating) return
    let t = Math.min(1, (now-dropStart)/400)
    droppingSeed.value!.progress = t
    if (t < 1) {
      animationFrame = requestAnimationFrame(dropAnim)
    } else {
      planted.value.push({x: carX.value, y: 60+row*20, row})
      droppingSeed.value = null
      // 小车移动到下一个点
      carX.value += seedingSpacing.value
      setTimeout(() => animateCar(), animationSpeed.value*400)
    }
  }
  animationFrame = requestAnimationFrame(dropAnim)
}

function stopSeeding() {
  animating = false
  cancelAnimationFrame(animationFrame)
}

onMounted(() => {
  startSeeding()
})
watch([seedingDepth, seedingSpacing, seedType], () => {
  stopSeeding()
  setTimeout(() => startSeeding(), 300)
})

// 路径规划与避障演示参数与内容丰富
const navStart = ref('A')
const navEnd = ref('B')
const navMode = ref('shortest')
const navAlgo = ref('A*')
const navStrategy = ref('静态避障')
const navSpeed = ref(3)
const navPath = ref([
  {x: 70, y: 80}, {x: 180, y: 100}, {x: 300, y: 120}, {x: 370, y: 140}
])
const navPathPoints = computed(() => navPath.value.map(p=>`${p.x},${p.y}`).join(' '))
const robotPos = computed(() => navPath.value[navPath.value.length-1])
const obstacles = ref([{x: 160, y: 110}, {x: 260, y: 120}])
const navPathLength = computed(() => 120)
const navAvoidCount = computed(() => obstacles.value.length)
const navEstTime = computed(() => (navPathLength.value/navSpeed.value).toFixed(1))
function addObstacle() {
  const x = 60+Math.random()*280
  const y = 60+Math.random()*80
  obstacles.value.push({x,y})
}
let draggingObstacleIdx: number|null = null
function startDragObstacle(idx:number) {
  draggingObstacleIdx = idx
  window.addEventListener('mousemove', onDragObstacle)
  window.addEventListener('mouseup', stopDragObstacle)
}
function onDragObstacle(e:MouseEvent) {
  if (draggingObstacleIdx===null) return
  const svg = document.querySelector('svg')
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  const x = Math.max(40, Math.min(380, e.clientX-rect.left))
  const y = Math.max(60, Math.min(160, e.clientY-rect.top))
  obstacles.value[draggingObstacleIdx] = {x,y}
}
function stopDragObstacle() {
  draggingObstacleIdx = null
  window.removeEventListener('mousemove', onDragObstacle)
  window.removeEventListener('mouseup', stopDragObstacle)
}

// 土壤环境检测演示参数与动画升级
const sensorType = ref('moisture')
const sensorFreq = ref(3)
const sensorCount = ref(12)
const sensorThresholds: Record<string, {min:number,max:number}> = {
  moisture: { min: 30, max: 80 },
  temp: { min: 10, max: 35 },
  ph: { min: 5.5, max: 8 }
}
const sensors = ref(Array.from({length: sensorCount.value}, (_,i)=>({x:40+Math.random()*320, y:60+Math.random()*80, value:Math.random()*100, history:[Math.random()*100]})))
const tipIndex = ref<number|null>(null)
const historyData = ref<number[][]>([])

function randomValue(type:string) {
  if(type==='moisture') return Math.round(30+Math.random()*60)
  if(type==='temp') return Math.round(10+Math.random()*25)
  if(type==='ph') return +(5.5+Math.random()*2.5).toFixed(2)
  return 0
}
function refreshSensors() {
  sensors.value.forEach(s => {
    s.value = randomValue(sensorType.value)
    s.history = (s.history||[]).concat([s.value]).slice(-10)
  })
  historyData.value.push(sensors.value.map(s=>s.value))
  if(historyData.value.length>10) historyData.value.shift()
}
function autoRefresh() {
  refreshSensors()
  setTimeout(autoRefresh, sensorFreq.value*1000)
}
onMounted(() => {
  autoRefresh()
})
watch([sensorType, sensorCount], () => {
  sensors.value = Array.from({length: sensorCount.value}, (_,i)=>({x:40+Math.random()*320, y:60+Math.random()*80, value:randomValue(sensorType.value), history:[randomValue(sensorType.value)]}))
  historyData.value = []
})
const sensorColor = (v:number) => {
  if(sensorType.value==='moisture') return `url(#moistGrad)`
  if(sensorType.value==='temp') return `url(#tempGrad)`
  if(sensorType.value==='ph') return `url(#phGrad)`
  return '#ddd'
}
const avgSensorValue = computed(() => (sensors.value.reduce((a,s)=>a+s.value,0)/sensors.value.length).toFixed(1))
const maxSensorValue = computed(() => Math.max(...sensors.value.map(s=>s.value)).toFixed(1))
const minSensorValue = computed(() => Math.min(...sensors.value.map(s=>s.value)).toFixed(1))
const abnormalCount = computed(() => sensors.value.filter(s => s.value<sensorThresholds[sensorType.value].min || s.value>sensorThresholds[sensorType.value].max).length)
const normalCount = computed(() => sensors.value.length-abnormalCount.value)
const trendPoints = computed(() => {
  if(historyData.value.length===0) return ''
  const arr = historyData.value.map(arr=>arr.reduce((a,b)=>a+b,0)/arr.length)
  return arr.map((v,i)=>`${i*30},${60-(v-10)*0.5}`).join(' ')
})
// 传感器数据可视化
const sensorLiveValue = ref(68)
const sensorHistory = ref([60, 62, 65, 67, 68, 70, 69, 68, 68, 68])
const sensorArcPath = computed(() => {
  // 仪表盘弧形
  const v = Math.max(0, Math.min(100, sensorLiveValue.value))
  const start = { x: 160 - 80 * Math.cos(Math.PI * 0.75), y: 160 - 80 * Math.sin(Math.PI * 0.75) }
  const end = {
    x: 160 - 80 * Math.cos(Math.PI * (0.75 - 1.5 * v / 100)),
    y: 160 - 80 * Math.sin(Math.PI * (0.75 - 1.5 * v / 100))
  }
  const largeArc = v > 50 ? 1 : 0
  return `M${start.x},${start.y} A80,80 0 ${largeArc} 1 ${end.x},${end.y}`
})
const sensorLinePoints = computed(() => sensorHistory.value.map((v, i) => `${i * 32},${80 - v * 0.7}`).join(' '))
setInterval(() => {
  const next = Math.max(50, Math.min(100, sensorLiveValue.value + (Math.random() - 0.5) * 6))
  sensorLiveValue.value = Math.round(next)
  sensorHistory.value.push(sensorLiveValue.value)
  if (sensorHistory.value.length > 10) sensorHistory.value.shift()
}, 2000)

// 性能分析井状图内容丰富升级
const performanceData = ref([
  { label: '作业效率', value: 80, gradient: 'url(#barGrad1)', desc: '单位时间内完成的作业量' },
  { label: '能耗降低', value: 65, gradient: 'url(#barGrad2)', desc: '单位面积作业能耗降低幅度' },
  { label: '作物产量', value: 90, gradient: 'url(#barGrad3)', desc: '单位面积作物产量提升' },
  { label: '智能化', value: 95, gradient: 'url(#barGrad4)', desc: '系统自动化与智能水平' }
])
const perfTable = ref([
  { label: '作业效率', smart: '80', trad: '50', rate: '60%' },
  { label: '能耗降低', smart: '65', trad: '40', rate: '62.5%' },
  { label: '作物产量', smart: '90', trad: '60', rate: '50%' },
  { label: '智能化', smart: '95', trad: '55', rate: '72.7%' }
])
const avgPerfRate = ref('61.3%')
const maxPerfLabel = ref('智能化')
const perfConclusion = ref('智能机器人系统在各项性能指标上均大幅优于传统方式，尤其在智能化水平和作业效率方面提升显著。')
const perfBarTitle = ref('性能指标说明')
const perfBarDesc = ref('点击左侧任意柱体可查看详细说明。')
function selectPerfBar(idx:number) {
  perfBarTitle.value = performanceData.value[idx].label
  perfBarDesc.value = performanceData.value[idx].desc
}

// 系统架构树状图内容丰富升级
const archNodeTitle = ref('系统架构总览')
const archNodeDesc = ref('点击左侧任意节点可查看详细说明。')
function selectArchNode(node:string) {
  archNodeTitle.value = node
  archNodeDesc.value = archNodeDescMap[node] || '暂无详细说明。'
}
const archNodeDescMap:Record<string,string> = {
  '感知层':'负责环境感知与数据采集，包括多类型传感器的接入、状态监控与数据上传。',
  '传感器管理':'统一管理各类传感器，实现设备接入、状态监控与故障预警。',
  '数据采集':'实时采集环境、作业等多维数据，为决策层提供数据支撑。',
  '环境监测':'对土壤、气候等环境参数进行监测，保障作业安全与精准。',
  '决策层':'负责路径规划、任务分配、智能决策，实现作业最优与智能协同。',
  '路径规划':'根据作业目标与环境数据，智能生成最优作业路径。',
  '任务分配':'将作业任务合理分配至各执行单元，实现高效协同。',
  '智能决策':'融合多源数据，动态调整作业策略，实现智能化作业。',
  '执行层':'负责具体作业执行与状态反馈，包括运动控制、作业执行等。',
  '运动控制':'精准控制机器人运动，实现路径跟踪与避障。',
  '作业执行':'完成播种、施肥、采收等具体作业任务。',
  '状态反馈':'实时反馈作业状态与异常，保障系统闭环。',
  '系统架构总览':'三层架构协同，实现智能感知、科学决策与高效执行。',
}

// 传感器数据可视化内容丰富升级
const sensorTypes = ref([
  { label: '土壤湿度', value: 'moisture' },
  { label: '温度', value: 'temp' },
  { label: 'PH值', value: 'ph' }
])
function selectSensorType(type:string) {
  sensorType.value = type
  sensorDetailTitle.value = '传感器数据详情'
  sensorDetailDesc.value = '点击仪表盘或折线图节点可查看详细数据。'
}
function exportSensorHistory() {
  const data = JSON.stringify(sensorHistory.value)
  const blob = new Blob([data], {type:'application/json'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sensor_history.json'
  a.click()
  URL.revokeObjectURL(url)
}
const sensorDetailTitle = ref('传感器数据详情')
const sensorDetailDesc = ref('点击仪表盘或折线图节点可查看详细数据。')
function selectSensorGauge() {
  sensorDetailTitle.value = '实时数值'
  sensorDetailDesc.value = `当前${sensorTypes.value.find(t=>t.value===sensorType.value)?.label}为${sensorLiveValue.value}`
}
function selectSensorHistory(idx:number) {
  sensorDetailTitle.value = '历史数据点'
  sensorDetailDesc.value = `${sensorTypes.value.find(t=>t.value===sensorType.value)?.label}历史第${idx+1}个采样值为${sensorHistory.value[idx]}`
}
const sensorStatusText = computed(() => {
  if(sensorLiveValue.value<60) return '正常'
  if(sensorLiveValue.value<80) return '预警'
  return '异常'
})
const sensorStatusColor = computed(() => {
  if(sensorLiveValue.value<60) return 'text-emerald-700'
  if(sensorLiveValue.value<80) return 'text-yellow-600'
  return 'text-rose-700'
})

// 播种交互与内容丰富升级
const seedingMode = ref('auto')
function onFieldClick(e: MouseEvent) {
  if (seedingMode.value !== 'manual') return
  const svg = e.currentTarget as SVGSVGElement
  const rect = svg.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const row = Math.floor((y - 60) / 20)
  if (row >= 0 && row < rows.value) {
    planted.value.push({ x, y: 60 + row * 20, row })
  }
}
// 小车拖拽（鼠标+触摸）
let draggingCar = false
let dragOffsetX = 0
function startDragCar(e: MouseEvent) {
  draggingCar = true
  dragOffsetX = e.offsetX - carX.value
  window.addEventListener('mousemove', onDragCar)
  window.addEventListener('mouseup', stopDragCar)
}
function onDragCar(e: MouseEvent) {
  if (!draggingCar) return
  const svg = document.querySelector('svg')
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  carX.value = Math.max(36, Math.min(364, e.clientX - rect.left - dragOffsetX))
}
function stopDragCar() {
  draggingCar = false
  window.removeEventListener('mousemove', onDragCar)
  window.removeEventListener('mouseup', stopDragCar)
}
function startDragCarTouch(e: TouchEvent) {
  draggingCar = true
  dragOffsetX = e.touches[0].clientX - carX.value
  window.addEventListener('touchmove', onDragCarTouch)
  window.addEventListener('touchend', stopDragCarTouch)
}
function onDragCarTouch(e:TouchEvent) {
  if (!draggingCar) return
  const svg = document.querySelector('svg')
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  carX.value = Math.max(36, Math.min(364, e.touches[0].clientX - rect.left - dragOffsetX))
}
function stopDragCarTouch() {
  draggingCar = false
  window.removeEventListener('touchmove', onDragCarTouch)
  window.removeEventListener('touchend', stopDragCarTouch)
}
// 田块触摸播种
function onFieldTouchStart(e: TouchEvent) {
  if (seedingMode.value !== 'manual') return
  const svg = e.currentTarget as SVGSVGElement
  const rect = svg.getBoundingClientRect()
  const x = e.touches[0].clientX - rect.left
  const y = e.touches[0].clientY - rect.top
  const row = Math.floor((y - 60) / 20)
  if (row >= 0 && row < rows.value) {
    planted.value.push({ x, y: 60 + row * 20, row })
  }
}
function onFieldTouchMove(e: TouchEvent) {}
function onFieldTouchEnd(e: TouchEvent) {}

// 传感器统计相关补充
const sensorFluctuation = computed(() => {
  // 计算实时波动幅度（最大-最小）
  return (Math.max(...sensors.value.map(s=>s.value)) - Math.min(...sensors.value.map(s=>s.value))).toFixed(1)
})
const historyAbnormalCount = computed(() => {
  // 历史异常次数统计
  return historyData.value.reduce((sum, arr) => sum + arr.filter((v,i) => v<sensorThresholds[sensorType.value].min || v>sensorThresholds[sensorType.value].max).length, 0)
})
const totalSampleCount = computed(() => {
  // 采样总数
  return historyData.value.reduce((sum, arr) => sum + arr.length, 0)
})

// 补充土壤检测相关缺失变量和方法
const sensorDepth = ref(30) // 检测深度
const sensorMode = ref('auto') // 采样模式
function startDragSensor(idx:number) {
  // 传感器探头拖拽（鼠标）
  // 可根据idx实现拖拽逻辑
}
function startDragSensorTouch(idx:number) {
  // 传感器探头拖拽（触摸）
  // 可根据idx实现拖拽逻辑
}
</script>

<style scoped>
.feature-demo-bg {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ef 100%);
  min-height: 100vh;
}
.glass-card {
  background: rgba(255,255,255,0.7);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255,255,255,0.18);
}
.card-3d {
  box-shadow: 0 8px 32px 0 rgba(56,189,248,0.18), 0 1.5px 8px 0 rgba(67,56,202,0.08);
  transition: transform 0.2s;
}
.card-3d:hover {
  transform: translateY(-8px) scale(1.03);
}
.drop-shadow-glow {
  text-shadow: 0 0 16px #38bdf8, 0 2px 8px #a21caf;
}
</style> 