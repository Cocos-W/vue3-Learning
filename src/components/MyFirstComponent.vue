<script setup>
import { ref } from 'vue'

// 定义响应式数据
const message = ref('Hello Vue 3')
const clickCount = ref(0)
// 定义方法
function handleClick() {
  clickCount.value++
  message.value = `Clicked ${clickCount.value} times!`
}

function resetCounter() {
  clickCount.value = 0
  message.value = 'Hello Vue 3!'
}
</script>

<template>
  <div class="my-first-component">
    <h2>我的第一个VUE 3组件</h2>

    <!--显示响应式数据 -->
    <p class="message">{{ message }}</p>

    <!-- 绑定点击事件 -->
    <button @click="handleClick" class="btn-primary">点击我{{ clickCount }}</button>

    <button @click="resetCounter" class="btn-secondary">重置</button>
  </div>
</template>

<style>
.my-first-component {
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
}

.message {
  font-size: 1.2em;
  color: #42b983;
  margin: 15px 0;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
