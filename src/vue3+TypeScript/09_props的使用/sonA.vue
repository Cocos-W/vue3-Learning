<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import {type Persons} from '@/types'
//测试1.defineProps接收父组件传来的值
//  defineProps(['a','list'])

//测试 2.接受父组件传来的list,同时将props保存起来
// let props = defineProps(['list'])
// console.log('List',props)

//测试3.接受list + 限制类型
// defineProps<{list:Persons}>()

//测试4. 接受list + 限制类型 + 限制必要性 + 指定默认值
/**当父元素未向子元素传递list时，子元素可引用withDefaults声明可选 prop 并指定默认值指定默认值，
 * 且指定默认值必须以函数形式接收！类同vue2.
 * **/
/** withDefaults 函数接收两个参数：
第一个：defineProps 的调用结果。
第二个：一个对象，定义每个可选 prop 的默认值（默认值必须用函数返回，以确保每个组件实例都有独立的副本）
**/

let props = withDefaults(defineProps<{
  list?:Persons   // 声明可选 prop 'list'，类型为 Persons
}>(),
{
  // 为 'list' 提供默认值（必须用函数返回）
  list:()=> [{id:'wmz',name:"王麻子",age:8}] // 默认值函数返回默认数组. 假设 Persons 是数组类型.
}
)

// 现在可以通过 props.list 访问（值要么来自父组件，要么是默认空数组）

console.log(props.list)

</script>
<template>
  <!-- //测试1. -->
  <!-- <div>{{a}}</div> -->
   <!-- //测试 2. -->
  <div>{{props.list}}</div>
  <hr/>
   <!-- //测试 3. -->
   <ul>
    <li v-for="p in list" :key="p.id">{{ p.id}} -- {{p.name}}--{{p.age}} </li>
   </ul>

   <!-- 测试4 -->
     <!-- 直接渲染 list，Vue 会自动解构 props，所以可以省略 'props.' -->
    <div>{{ list }}</div>


</template>

<style scoped></style>
