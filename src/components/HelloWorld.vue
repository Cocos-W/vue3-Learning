<script setup>
import { ref } from 'vue'

//响应式数据
const count = ref(0)
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <!--事件处理-->
    <button @click="count++">count is {{ count }}</button>
  </div>
</template>

<!-- 组件属性定义 -->
<script>
export default {
  props: {
    msg: String,
  },
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
