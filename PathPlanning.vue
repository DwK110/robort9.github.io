<template>
  <div class="amap-planner min-h-screen w-full bg-gradient-to-br from-blue-100 via-green-50 to-white flex flex-col">
    <!-- 顶部工具栏 -->
    <header class="w-full bg-gradient-to-r from-blue-600 via-green-500 to-blue-400 py-6 px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg z-10">
      <div class="flex items-center gap-4">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">智能路径规划（高德地图）</h1>
        <span class="text-white/80 text-sm hidden md:inline">Powered by AMap JS API</span>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="mapType" @change="changeMapType" class="rounded px-3 py-1 text-sm">
          <option value="normal">道路</option>
          <option value="satellite">卫星</option>
          <option value="terrain">地形</option>
        </select>
        <input v-model="searchQuery" @keyup.enter="searchPlace" placeholder="搜索地点/农田" class="rounded px-3 py-1 text-sm w-40" />
        <button @click="locateMe" class="bg-white/80 hover:bg-white text-blue-700 px-3 py-1 rounded text-sm font-bold flex items-center gap-1"><span class="material-icons">my_location</span>定位</button>
      </div>
    </header>

    <!-- 地图主视图 -->
    <div class="flex-1 w-full flex flex-col md:flex-row">
      <div class="flex-1 relative min-h-[600px]">
        <div ref="mapRef" class="w-full h-[600px] md:h-full rounded-2xl shadow-lg mt-4 md:mt-8 mx-auto"></div>
        <!-- 实时坐标显示 -->
        <div class="absolute bottom-4 left-4 bg-white/90 rounded px-4 py-2 text-xs text-gray-700 shadow">
          坐标：{{ currentLng.toFixed(6) }}, {{ currentLat.toFixed(6) }}
        </div>
        <!-- 绘制/模式切换 -->
        <div class="absolute top-4 right-4 flex flex-col gap-2">
          <button v-for="mode in drawModes" :key="mode.value" @click="setDrawMode(mode.value)" :class="['px-4 py-2 rounded shadow text-sm font-bold', drawMode===mode.value ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 hover:bg-blue-100']">{{ mode.label }}</button>
        </div>
        <!-- 路径规划一键插件按钮 -->
        <div class="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button @click="startPathPlanning"
            :class="['px-6 py-2 rounded font-bold shadow-lg transition', planningActive ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white scale-105' : 'bg-white text-blue-700 hover:bg-blue-100']">
            路径规划
          </button>
        </div>
      </div>
      <!-- 侧边参数与分析区 -->
      <aside class="w-full md:w-96 bg-white/90 rounded-2xl shadow-lg p-6 mt-4 md:mt-8 mx-auto md:ml-8 flex flex-col gap-6">
        <!-- 规划模式 -->
        <div>
          <label class="block font-bold mb-2 text-blue-700">规划模式</label>
          <select v-model="planningMode" class="w-full rounded px-3 py-2">
            <option value="manual">手动</option>
            <option value="auto">自动</option>
            <option value="optimize">优化</option>
          </select>
        </div>
        <!-- 播种参数调节 -->
        <div>
          <label class="block font-bold mb-2 text-green-700">播种参数</label>
          <div class="flex items-center gap-2 mb-2">
            <span>间距(m)</span>
            <input type="number" v-model.number="spacing" min="0.1" step="0.1" class="w-20 rounded px-2 py-1 border" />
            <span>作业宽度(m)</span>
            <input type="number" v-model.number="width" min="0.1" step="0.1" class="w-20 rounded px-2 py-1 border" />
          </div>
        </div>
        <!-- 区域/路径统计 -->
        <div>
          <label class="block font-bold mb-2 text-purple-700">统计分析</label>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>区域面积：{{ area ? area.toFixed(2) : '--' }} ㎡</li>
            <li>路径长度：{{ pathLength ? pathLength.toFixed(2) : '--' }} m</li>
            <li>预计作业时间：{{ workTime ? workTime.toFixed(1) : '--' }} min</li>
            <li>燃料消耗：{{ fuel ? fuel.toFixed(2) : '--' }} L</li>
            <li class="text-green-600 font-semibold" v-if="suggestion">{{ suggestion }}</li>
          </ul>
        </div>
        <!-- 数据导出 -->
        <div>
          <label class="block font-bold mb-2 text-blue-700">数据导出</label>
          <div class="flex gap-2">
            <button @click="exportData('geojson')" class="px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">GeoJSON</button>
            <button @click="exportData('kml')" class="px-3 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700">KML</button>
            <button @click="exportData('gpx')" class="px-3 py-1 rounded bg-purple-600 text-white text-xs font-bold hover:bg-purple-700">GPX</button>
          </div>
        </div>
        <!-- 使用说明 -->
        <div class="text-xs text-gray-500 mt-4">
          <div class="font-bold text-gray-700 mb-1">使用说明</div>
          <ol class="list-decimal pl-5 space-y-1">
            <li>搜索或定位到目标农田</li>
            <li>开启绘制模式选择作业区域</li>
            <li>调整播种参数</li>
            <li>生成并优化路径</li>
            <li>导出路径数据到机器人系统</li>
          </ol>
        </div>
        <!-- 机器人连接功能区 -->
        <div class="mt-6 p-4 rounded-xl border border-blue-200 bg-blue-50 flex flex-col gap-2">
          <div class="font-bold text-blue-700 mb-1">机器人连接（WiFi）</div>
          <div class="flex gap-2 items-center">
            <input v-model="robotIp" placeholder="机器人IP" class="rounded px-2 py-1 border w-28" />
            <input v-model="robotPort" placeholder="端口" class="rounded px-2 py-1 border w-20" />
            <button @click="connectRobot" :disabled="wsConnected" class="px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:bg-gray-400">{{ wsConnected ? '已连接' : '连接' }}</button>
            <span v-if="wsConnected" class="text-green-600 text-xs ml-2">● 已连接</span>
            <span v-else-if="wsConnecting" class="text-yellow-600 text-xs ml-2">● 连接中...</span>
            <span v-else-if="wsError" class="text-red-600 text-xs ml-2">● 连接失败</span>
          </div>
          <div class="flex gap-2 mt-2">
            <input v-model="robotCmd" @keyup.enter="sendRobotCmd" placeholder="输入终端指令" class="rounded px-2 py-1 border flex-1" :disabled="!wsConnected" />
            <button @click="sendRobotCmd" :disabled="!wsConnected || !robotCmd" class="px-3 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700 disabled:bg-gray-400">发送</button>
          </div>
          <div class="mt-2 bg-white rounded p-2 h-32 overflow-y-auto text-xs font-mono border border-gray-200" style="white-space: pre-line;">
            <div v-if="robotMsgs.length === 0" class="text-gray-400">等待机器人消息...</div>
            <div v-for="(msg, idx) in robotMsgs" :key="idx" :class="msg.type === 'recv' ? 'text-blue-800' : 'text-gray-700'">{{ msg.text }}</div>
          </div>
        </div>
      </aside>
    </div>
    <!-- tip弹窗 -->
    <div v-if="tipMsg" class="fixed top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded shadow-lg z-50">
      {{ tipMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const mapRef = ref<HTMLDivElement | null>(null)
let map: any = null
let mouseTool: any = null
let polygon: any = null
let polyline: any = null
let marker: any = null
let infoWindow: any = null
let autoComplete: any = null
let geolocation: any = null
const geolocationReady = ref(false)
const locating = ref(false)
let polygonEditor: any = null
const planningActive = ref(false)

const mapType = ref('normal')
const searchQuery = ref('')
const currentLng = ref(116.397428)
const currentLat = ref(39.90923)
const drawMode = ref('polygon')
const drawModes = [
  { value: 'polygon', label: '区域绘制' },
  { value: 'polyline', label: '路径绘制' },
  { value: 'marker', label: '点标记' }
]
const planningMode = ref('manual')
const spacing = ref(1.0)
const width = ref(2.0)
const area = ref(0)
const pathLength = ref(0)
const workTime = ref(0)
const fuel = ref(0)
const suggestion = ref('')
const tipMsg = ref('')

// 机器人连接相关
const robotIp = ref('')
const robotPort = ref('8080')
const wsConnected = ref(false)
const wsConnecting = ref(false)
const wsError = ref(false)
const robotCmd = ref('')
const robotMsgs = ref<{type: 'send'|'recv', text: string}[]>([])
let ws: WebSocket | null = null

function connectRobot() {
  if (wsConnected.value || wsConnecting.value) return
  wsError.value = false
  wsConnecting.value = true
  const url = `ws://${robotIp.value}:${robotPort.value}`
  try {
    ws = new window.WebSocket(url)
    ws.onopen = () => {
      wsConnected.value = true
      wsConnecting.value = false
      wsError.value = false
      robotMsgs.value.push({type: 'recv', text: '[已连接到机器人] ' + url})
    }
    ws.onclose = () => {
      wsConnected.value = false
      wsConnecting.value = false
      wsError.value = true
      robotMsgs.value.push({type: 'recv', text: '[连接已断开] '})
    }
    ws.onerror = () => {
      wsConnected.value = false
      wsConnecting.value = false
      wsError.value = true
      robotMsgs.value.push({type: 'recv', text: '[连接出错] '})
    }
    ws.onmessage = (e) => {
      robotMsgs.value.push({type: 'recv', text: e.data})
    }
  } catch (e) {
    wsConnected.value = false
    wsConnecting.value = false
    wsError.value = true
    robotMsgs.value.push({type: 'recv', text: '[连接异常] ' + (e as any).message})
  }
}

function sendRobotCmd() {
  if (!wsConnected.value || !ws || !robotCmd.value) return
  ws.send(robotCmd.value)
  robotMsgs.value.push({type: 'send', text: '> ' + robotCmd.value})
  robotCmd.value = ''
}

// 地图类型切换
function changeMapType() {
  if (!map) return
  if (mapType.value === 'normal') map.setMapStyle('amap://styles/normal')
  if (mapType.value === 'satellite') map.setMapStyle('amap://styles/satellite')
  if (mapType.value === 'terrain') map.setMapStyle('amap://styles/whitesmoke')
}

// 地点搜索
function searchPlace() {
  if (!searchQuery.value) return;
  // 使用PlaceSearch服务
  const placeSearch = new window.AMap.PlaceSearch({
    map: map,
    pageSize: 5
  });
  placeSearch.search(searchQuery.value, function(status: any, result: any) {
    if (status === 'complete' && result.poiList && result.poiList.pois.length > 0) {
      const poi = result.poiList.pois[0];
      map.setCenter(poi.location);
      map.setZoom(17);
      // 高亮显示marker
      new window.AMap.Marker({
        map: map,
        position: poi.location
      });
    } else {
      alert('未搜索到相关地点，请尝试更换关键词，如"农田""农场""地块"或具体地名');
    }
  });
}

// 当前位置获取
function locateMe() {
  if (!geolocationReady.value) {
    alert('定位功能正在初始化，请稍后再试');
    return;
  }
  if (!geolocation) {
    alert('定位功能未初始化，请稍后重试');
    return;
  }
  if (locating.value) {
    alert('正在定位中，请稍候...');
    return;
  }
  locating.value = true;
  try {
    geolocation.getCurrentPosition((status: any, result: any) => {
      locating.value = false;
      console.log('getCurrentPosition status:', status, result)
      if (status === 'complete' && result.position) {
        map.setCenter([result.position.lng, result.position.lat]);
        map.setZoom(17);
        alert('定位成功！')
      } else {
        alert('定位失败，请检查浏览器定位权限（建议使用HTTPS）或网络环境');
        console.error('定位失败详细信息:', status, result)
      }
    });
  } catch (e) {
    locating.value = false;
    alert('定位调用异常，请查看控制台日志');
    console.error('定位调用异常:', e)
  }
}

// 绘制模式切换（仅保留PolygonEditor）
function setDrawMode(mode: string) {
  drawMode.value = mode;
  if (mode === 'polygon') {
    startPolygonEdit();
  }
}

// 数据导出（示例：GeoJSON/KML/GPX）
function exportData(type: string) {
  let data = ''
  if (polygon) {
    const path = polygon.getPath().map((p: any) => [p.lng, p.lat])
    if (type === 'geojson') {
      data = JSON.stringify({ type: 'Polygon', coordinates: [path] }, null, 2)
    } else if (type === 'kml') {
      data = `<?xml version="1.0"?><kml><Placemark><Polygon><outerBoundaryIs><LinearRing><coordinates>${path.map((p: any) => p.join(',')).join(' ')}</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark></kml>`
    } else if (type === 'gpx') {
      data = `<?xml version="1.0"?><gpx><trk><trkseg>${path.map((p: any) => `<trkpt lat="${p[1]}" lon="${p[0]}"/>`).join('')}</trkseg></trk></gpx>`
    }
    const blob = new Blob([data], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `export.${type}`
    a.click()
    URL.revokeObjectURL(url)
  }
}

// 统计与分析（面积、长度、时间、燃料等）
function updateStats() {
  if (polygon) {
    const path = polygon.getPath()
    area.value = window.AMap.GeometryUtil.ringArea(path)
    pathLength.value = window.AMap.GeometryUtil.distanceOfLine(path)
    workTime.value = pathLength.value / 30 // 假设30m/min
    fuel.value = pathLength.value * 0.02 // 假设0.02L/m
    suggestion.value = pathLength.value > 1000 ? '建议分段作业，提升效率' : ''
  }
}

// S型路径生成算法（简化版，适合规则地块）
function generateSPath(polygonPath: any[], spacing: number) {
  if (!polygonPath || polygonPath.length < 3) return []
  // 1. 计算多边形外接矩形
  let minX = Math.min(...polygonPath.map((p:any) => p.lng))
  let maxX = Math.max(...polygonPath.map((p:any) => p.lng))
  let minY = Math.min(...polygonPath.map((p:any) => p.lat))
  let maxY = Math.max(...polygonPath.map((p:any) => p.lat))
  // 2. 按spacing分割为多条平行线（假设东西向S型）
  let lines = []
  for (let y = minY + spacing/2; y < maxY; y += spacing) {
    lines.push(y)
  }
  // 3. 计算每条线与多边形的交点
  let pathPoints: any[] = []
  lines.forEach((y, i) => {
    // 找到与y平行的所有多边形边的交点
    let crossPoints: any[] = []
    for (let j = 0; j < polygonPath.length; j++) {
      let p1 = polygonPath[j]
      let p2 = polygonPath[(j+1)%polygonPath.length]
      if ((p1.lat <= y && p2.lat >= y) || (p2.lat <= y && p1.lat >= y)) {
        if (p1.lat === p2.lat) continue // 跳过水平边
        let x = p1.lng + (y - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat)
        crossPoints.push({lng: x, lat: y})
      }
    }
    crossPoints.sort((a,b)=>a.lng-b.lng)
    if (crossPoints.length >= 2) {
      if (i%2===0) {
        pathPoints.push(crossPoints[0], crossPoints[1])
      } else {
        pathPoints.push(crossPoints[1], crossPoints[0])
      }
    }
  })
  return pathPoints
}

// 路径可视化与联动
function updateSPath() {
  if (!polygon) return
  const polyPath = polygon.getPath()
  const sPath = generateSPath(polyPath, spacing.value)
  if (polyline) map.remove(polyline)
  if (sPath.length > 1) {
    polyline = new window.AMap.Polyline({
      path: sPath,
      strokeColor: '#ff4d4f',
      strokeWeight: 5,
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 100
    })
    map.add(polyline)
    // 路径长度统计
    pathLength.value = window.AMap.GeometryUtil.distanceOfLine(sPath)
  }
}

// 区域绘制（PolygonEditor方式）
function startPolygonEdit() {
  if (polygon) { map.remove(polygon); polygon = null; }
  if (polyline) { map.remove(polyline); polyline = null; }
  polygon = new window.AMap.Polygon({
    path: [],
    strokeColor: '#00b0ff',
    strokeWeight: 3,
    fillColor: '#80d8ff',
    fillOpacity: 0.3
  });
  map.add(polygon);
  if (polygonEditor) { polygonEditor.close(); polygonEditor = null; }
  polygonEditor = new window.AMap.PolygonEditor(map, polygon);
  polygonEditor.open();
  // 先解绑所有事件
  if (polygonEditor.off) polygonEditor.off('end');
  polygonEditor.on('end', () => {
    updateStats();
    updateSPath();
    planningActive.value = false;
    showTip('区域已选定，可拖动顶点微调。如需重新绘制，请再次点击"路径规划"按钮。');
  });
}

// 参数区调整后联动
watch(spacing, () => { updateSPath() })

function startPathPlanning() {
  planningActive.value = true
  setDrawMode('polygon')
}

function showTip(msg: string) {
  tipMsg.value = msg
  setTimeout(() => { tipMsg.value = '' }, 2500)
}

onMounted(() => {
  // 动态加载高德地图JS API
  const script = document.createElement('script')
  script.src = 'https://webapi.amap.com/maps?v=2.0&key=90628362d1f8a7e6445eaa61a0ba327f&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geolocation,AMap.MouseTool,AMap.PolygonEditor,AMap.PolyEditor,AMap.GeometryUtil'
  script.onload = () => {
    console.log('AMap:', window.AMap);
    console.log('AMap.PolygonEditor:', window.AMap.PolygonEditor);
    map = new window.AMap.Map(mapRef.value, {
      center: [currentLng.value, currentLat.value],
      zoom: 15,
      mapStyle: 'amap://styles/normal',
      viewMode: '2D',
    })
    changeMapType()
    autoComplete = new window.AMap.Autocomplete({ input: '' })
    try {
      map.plugin(['AMap.Geolocation'], function() {
        try {
          geolocation = new window.AMap.Geolocation({ enableHighAccuracy: true })
          map.addControl(geolocation)
          geolocationReady.value = true
          console.log('Geolocation ready', geolocation)
        } catch (e) {
          console.error('Geolocation plugin error (inner)', e)
        }
      })
    } catch (e) {
      console.error('Geolocation plugin error (outer)', e)
    }
    // 区域绘制（PolygonEditor）
    map.plugin(['AMap.PolygonEditor'], function() {
      setDrawMode('polygon'); // 默认自动进入区域绘制
    });
    map.on('mousemove', function(e: any) {
      currentLng.value = e.lnglat.lng
      currentLat.value = e.lnglat.lat
    })
  }
  document.head.appendChild(script)
})
</script>

<!-- 引入Google Material Icons（高德也可用） -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<style scoped>
.amap-planner {
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
.material-icons {
  font-size: 1.4em;
  vertical-align: middle;
}
</style> 