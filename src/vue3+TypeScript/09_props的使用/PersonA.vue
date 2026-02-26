<template>
  <!-- 务必看懂下面一行代码 -->
  <!-- <div a="1+1" :b="1+1" c="x" :d="x" ref="测试属性不同绑定方式的作用">测试</div> -->
   <!-- 测试1/4 -->
  <!-- <SonA a="haha" /> -->
   <!-- 测试2/3 -->
   <SonA :list="personList"/>


</template>
<script setup lang="ts">
import { reactive} from 'vue'
import { type Persons } from '@/types'
import SonA from './sonA.vue'

let x = 9

//推荐reactive直接传泛型参数来规定具体属性及类型
let personList = reactive<Persons>([
  { id: '1', name: '张三', age: 18 },
  { id: '2', name: '李四', age: 20 },
  { id: '3', name: '王五', age: 10 },
])
// console.log(personList)
</script>

<style scoped>
.app {
  background-color: #ddd;
}
</style>
