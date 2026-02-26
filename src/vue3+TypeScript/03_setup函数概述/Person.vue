<template>
  <div class="app">
    <h2>姓名： {{ name }}</h2>
    <h2>年龄： {{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Person',
  setup() {
    console.log('@@', this) //setup函数中的this是undefined,vue3中已经开始弱化this.
    //数据,普通js中定义的变量不是响应式的，即修改变量，页面并不会随着数据的变化而做对应的更新！！！
    //数据   在vue2中是写在data中的。
    let name = '张三'
    let age = 18

    //方法
    function changeName() {
      // this.name = '???'   无效修改！
      name = 'zhang-san' //注意：这样修改name,页面时没有变化
      console.log(name) //name确实改了，但name不是响应式。
    }

    function changeAge() {
      age += 1 //注意：这样修改age,页面时没有变化
      console.log(age) //age确实改了，但age不是响应式。
    }

    function showTel() {
      alert('18888888888')
    }

    //将数据，方法交出去，模板中才可以使用。
    return { name, age, changeName, changeAge, showTel }

    // return () => { return '哈哈'}   setup函数中的return也可以使用箭头函数返回内容直接渲染页面。很少使用。
  },
}
</script>
<style>
.app {
  background-color: #ddd;
}
</style>
