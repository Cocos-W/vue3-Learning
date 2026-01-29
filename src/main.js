import './assets/main.css'

import { createApp } from 'vue' //1.引入createApp 用于创建应用（类似花盆）
import { createPinia } from 'pinia'

import App from './App.vue' //2.引入App根组件（类似根）
import router from './router'

const app = createApp(App) //3.创建Vue应用实例（类似把根放进花盆里）

app.use(createPinia()) //状态管理（Pinia）
app.use(router) //使用路由

app.mount('#app') //4.挂载到DOM，页面才能显示出来.（类似把带有根的花盆放进‘app’这个位置）
