<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import MyFirstComponent from '@/components/MyFirstComponent.vue'

// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <HelloWorld msg="Welcome to Vue 3!" />
    <!--使用你的组件-->
    <MyFirstComponent></MyFirstComponent>
    <!--添加一些说明-->
    <div class="tips">
      <h3>今日学习总结：</h3>
      <ul>
        <li>√ 成功搭建Vue3 开发环境</li>
        <li>√ 创建了第一个Vue 3项目</li>
        <li>√ 理解了项目结构</li>
        <li>√ 创建了第一个自定义组件</li>
      </ul>
    </div>
  </main>
</template>
<style scoped>
.tips {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tips ul {
  text-align: left;
  display: inline-block;
}

.tips li {
  margin: 8px 0;
  color: #666;
}
</style>
