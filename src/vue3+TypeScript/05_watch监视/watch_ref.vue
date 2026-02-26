<template>
  <div class="app">
    <h2>监视【ref】定义的数据(包括【基础类型】和【对象类型】)</h2>
    <h2>当前求和为： {{ sum }}</h2>
    <button @click="sumBtn">点我 sum +1</button>
    <hr />
    <input type="text" v-bind:value="person.name" />
    <input type="text" :value="person.age" />
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改人</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
//数据
let sum = ref(4)
let person = ref({
  name: 'ZhangSan',
  age: 18,
})
//方法
function sumBtn() {
  sum.value++
}
function changeName() {
  person.value.name = person.value.name + '~'
  console.log('名字变化了', person.value.name)
}
function changeAge() {
  person.value.age += 1
  console.log('年龄变化了', person.value.age)
}
function changePerson() {
  person.value = { name: '李四', age: 20 }
  console.log('Person变化了', person.value)
}

//监视 watch(谁？，回调函数)
//类型一：watch监视【ref】定义的【基础类型】数据
watch(sum, (newValue, oldValue) => {
  console.log(`sum变化了`, newValue, oldValue)
})
//停止监视(若sum的值大于等于10时停止监视)
/*
let stopWatch = watch(sum, (newValue, oldValue) => {
  console.log(`sum变化了`, newValue, oldValue)
  console.log('@@', stopWatch)
  if (sum.value >= 10) {
    stopWatch()
  }
})
*/
/*
类型二：监视【ref】定义的【对象类型】数据,监视的是对象的地址值。若想监视对象内部属性的变化，需要手动添加deep：true属性实现深处监视！
watch的第一个参数是：被监视的数据，
第二个参数是： 监视的回调，
第三个参数是： 配置对象（deep,immediate等等）。
*/
watch(
  person,
  (newValue, oldValue) => {
    console.log('监视person变化', newValue, oldValue)
  },
  { deep: true },
)
</script>
<style>
.app {
  background-color: #ddd;
}
</style>
