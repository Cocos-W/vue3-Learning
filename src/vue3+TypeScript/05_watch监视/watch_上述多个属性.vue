<template>
  <div class="app">
    <h2>监视响应式对象中上述的多个属性数组</h2>
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

// 有关响应式对象中person.car的写法一： 类似于监听reactive定义的对象中的写法（默认深度监听）
// function changeCar() {
//   Object.assign(person.car, { c1: '雅迪', c2: '爱玛' })
// }

//监视 watch(谁？，回调函数)
// 监视：上述的多个数据
/**若在watch监听中 以person.name直接书写的形式，
 * 且在函数changeCar中是使用person.car = { c1: '雅迪', c2: '爱玛' } 修改 person.car的---相当于改变了该对象的地址，
 * 那么，只有changeC1和changeC2事件会引起监听成功，点击changeCar时，监听失败。
 * 若想在单独修改person.car中属性都能监听成功（即单独修改c1,c2或者整体修改person.car），则需要在函数changeCar中是使用 Object.assign(person.car, { c1: '雅迪', c2: '爱玛' })来修改person.son内属性变化而不会改变对象地址。
 */

// watch([() => person.name, person.car], (newValue, oldValue) => {
//   console.log('监视person的汽车变化', newValue, oldValue)
// })

/*有关响应式对象中person.car的写法二：把person.car 作为【响应式对象】的【某个属性】对待，
changeCar函数中对其进行修改的写法和watch监听函数中对其函数式的写法 可参考如下：
// 可达到的效果：单独修改c1,c2或者整体修改person.car都能监听成功（此时，注意要手动添加深度监听）
*/
function changeCar() {
  // Object.assign(person.car, { c1: '雅迪', c2: '爱玛' })
  person.car = { c1: '雅迪', c2: '爱玛' } //reactive不支持更换整个响应式对象！但是此处该对象是作为响应式对象的属性出现的，所以此处也可以直接替换。！
}
watch(
  [() => person.name, () => person.car],
  (newValue, oldValue) => {
    console.log('监视person的汽车变化', newValue, oldValue)
  },
  { deep: true },
)
// watch([() => person.name, () => person.car.c1], (newValue, oldValue) => {
//   console.log('监视person的C1汽车变化', newValue, oldValue)
// })
</script>
<style>
.app {
  background-color: #ddd;
}
</style>
