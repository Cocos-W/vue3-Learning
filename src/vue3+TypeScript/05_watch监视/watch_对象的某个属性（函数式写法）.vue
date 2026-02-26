<template>
  <div class="app">
    <h2>
      监视响应式对象中的某个属性（watch的第一个参数：最好写函数式，即使用getter函数的形式获取被监视对象的值。）
      注意：若对象监视的是地址值，但需要关注地址内部变化的话，需要手动开启深度监视！
    </h2>
    <h5>姓名：{{ person.name }}</h5>
    <h5>年龄：{{ person.age }}</h5>
    <h5>汽车：{{ person.car }}</h5>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一辆车</button>
    <button @click="changeC2">修改第二辆车</button>
    <button @click="changeCar">修改整辆车</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
//数据
let person = reactive({
  name: 'ZhangSan',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马',
  },
})
//方法
function changeName() {
  person.name += '~'
}
function changeAge() {
  person.age += 1
}
function changeC1() {
  person.car.c1 = '奥迪'
}
function changeC2() {
  person.car.c2 = '大众'
}
function changeCar() {
  person.car = { c1: '雅迪', c2: '爱玛' } //reactive不支持更换整个响应式对象！但是此处该对象是作为响应式对象的属性出现的，所以可以直接替换。！
}

//监视 watch(谁？，回调函数)

/*
监视【reactive】定义的【对象类型】数据,监视的是对象的地址值。默认是深度监视。*/

// 监视：情况一：【响应式对象】中的【某个属性】！且该属性是【基础类型】的，要写成【函数式】！如监视person的name属性！
watch(
  () => person.name,
  (newValue, oldValue) => {
    console.log('监视person.name变化', newValue, oldValue)
  },
)
// watch(
//   () => {
//     return person.car.c1
//   },
//   (newValue, oldValue) => {
//     console.log('监视person的C1汽车变化', newValue, oldValue)
//   },
// )
//下面写法可以监视person.car的C1和C2属性(但不能监视person.car的变化)，所以不推荐此写法，建议使用getter()函数返回一个值的写法来作为第一个参数！
// watch(person.car, (newValue, oldValue) => {
//   console.log('监视person.car变化', newValue, oldValue)
// })

/* 监视： 情况二：监视响应式对象中的【某个属性】，且该属性是【对象类型】的，推荐【函数式】
注意：若对象监视的是地址值，但需要关注地址内部变化的话，需要手动开启深度监视！*/
watch(
  () => person.car,
  (newValue, oldValue) => {
    console.log('监视person.car变化', newValue, oldValue)
  },
  { deep: true },
)
</script>
<style>
.app {
  background-color: #ddd;
}
</style>
