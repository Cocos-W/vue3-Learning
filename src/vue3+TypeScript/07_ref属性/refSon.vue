<template>
  <div class="app">
    <h1>中国</h1>
    <h2 ref="title2">
      ref作为html的属性使用获取DOM元素，其作用类似id,且其作用域类似局部变量。其它文件中有重名的ref属性名时互不影响！
      注意：要想获取到某元素，Vue3中不能使用id的原因是：不同文件中的id属性名一旦相同
      会出现冲突问题！【ref属性】
    </h2>
    <h5>
      测试：当在其它.vue(如App.vue)文件中也在属性中使用了相同的ref属性名时，
      如APP.vue文件的标签中使用相同的ref属性名，并不会影响到本文件中 对ref属性使用.
    </h5>
    <button @click="showRef">点我输出ref属性名为title2所在标签！【即点我输出h2这个元素】</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
//创建一个title2，用于存储ref标记的内容！
let title2 = ref()
let a = ref(0)
let b = ref(1)
let c = ref(2)

function showRef() {
  console.log(`ref属性所在标签：`, title2.value)
}

defineExpose({ a: a.value, b: b.value, c }) //本文件中通过defineExpose函数暴漏出响应式变量，才能被其父组件中的ref属性访问到!
</script>
<style scoped>
.app {
  background-color: #ddd;
}
</style>
