<script lang="ts" setup>
import {type Persons, type PersonInter } from '@/types'
/*
// 先不赋值，只声明类型
// import { PersonInter } from '@/types'

// 测试1：只声明类型
let person1: PersonInter

// 测试2：完整赋值
let person2: PersonInter = {
  id: '01',
  name: '张三',
  age: 60
}

// 测试3：使用类型断言
let person3 = {
  id: '01',
  name: '张三',
  age: 60
} as PersonInter

console.log(person1, person2, person3)
*/

let person: PersonInter = { id: '01', name: '张三', age: 60 }

/**写法一：泛型写法Array<PersonInter>
let personList:Array<PersonInter> = [
  {id: '01', name: '张三', age:18},
  {id: '02', name: '李四', age:20},
  {id: '03', name: '王五', age:60},
]
*/
// 写法二：
let personList: Persons = [
  {id: '01', name: '张三', age:18},
  {id: '02', name: '李四', age:20},
  {id: '03', name: '王五', age:60},
]
</script>
<template>
  <div>This is a learn page{{ person }}</div>
  <ul v-for="item in personList" :key="item.id">
    <li>{{ item }}</li>
  </ul>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
