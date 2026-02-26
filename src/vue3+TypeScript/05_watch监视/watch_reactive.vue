<template>
  <div class="app">
    <h2>监视【reactive】定义的【对象类型】数据</h2>
    <input type="text" v-bind:value="person.name" />
    <input type="text" :value="person.age" />
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改人</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
//数据
let person = reactive({
  name: 'ZhangSan',
  age: 18,
})
//方法
function changeName() {
  person.name = person.name + '~'
}
function changeAge() {
  person.age += 1
}

function changePerson() {
  // person = { name: '李四', age: 20 }  //reactive不支持更换整个对象！
  Object.assign(person, { name: '张三', age: 20 }) //此语句对象的地址未发生变化，仅修改了原对象中的属性。
}

//监视 watch(谁？，回调函数)

/*
监视【reactive】定义的【对象类型】数据,监视的是对象的地址值。默认是深度监视。
*/
watch(person, (newValue, oldValue) => {
  console.log('监视person变化', newValue, oldValue)
})
</script>
<style>
.app {
  background-color: #ddd;
}
</style>
