<template>
  <div class="app">
    <h2>需求：当水温达到60度，或水位达到80cm时， 给服务器发请求</h2>
    <h5>当前水温：{{ temp }} `C</h5>
    <h5>当前水位：{{ height }} cm</h5>

    <button @click="changeTemp">水温+10</button>
    <button @click="changeHeight">水位+10</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
//数据
let temp = ref(10)
let height = ref(0)

//方法
function changeTemp() {
  temp.value += 10
}
function changeHeight() {
  height.value += 10
}

//监视 watch(谁？，回调函数)--watch实现：要明确指出监视的数据
/*
watch([temp, height], (value) => {
  //解构赋值
  let [newTemp, newHeight] = value
  console.log(`新水温，新水位`, [newTemp, newHeight])
  if (newTemp > 60 || newHeight > 80) {
    console.log('给服务器发请求')
  }
})
*/
/**
 * 监视---watchEffected实现
 * 特点一：立即执行
 * 特点二： 不用明确指出监视的数据（函数中用到哪些属性，就自动监视哪些属性）
 */
watchEffect(() => {
  // console.log('数据未变化时可立即执行')
  if (temp.value > 60 || height.value > 80) {
    console.log('给服务器发请求')
  }
})
</script>
<style>
.app {
  background-color: #ddd;
}
</style>
