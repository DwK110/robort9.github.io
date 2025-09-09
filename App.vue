<template>
  <div class="app-bg min-h-screen w-full relative overflow-hidden">
    <!-- 动态光斑动画层 -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div v-for="i in 18" :key="i"
           class="absolute rounded-full opacity-30 animate-float-green"
           :style="getGreenParticleStyle(i)"></div>
    </div>
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

// 绿色动态光斑动画样式生成
const getGreenParticleStyle = (index: number) => {
  const size = Math.random() * 80 + 40;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 10 + 10;
  const greenList = [
    'rgba(34,197,94,0.5)', // emerald-500
    'rgba(16,185,129,0.5)', // emerald-400
    'rgba(52,211,153,0.4)', // green-300
    'rgba(110,231,183,0.3)', // green-200
    'rgba(5,150,105,0.4)' // teal-700
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
</script>

<style>
.app-bg {
  /* 全局绿色渐变背景 */
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
}

/* 动态绿色光斑动画 */
@keyframes float-green {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.1); }
}
.animate-float-green {
  animation: float-green linear infinite;
}

/* 内容区卡片感 */
.app-bg > *:not(.absolute) {
  background: rgba(255,255,255,0.85);
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  margin: 24px auto;
  max-width: 1400px;
  padding: 24px 0;
  position: relative;
  z-index: 1;
}
</style>