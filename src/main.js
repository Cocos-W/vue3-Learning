import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App) //创建Vue应用实例

app.use(createPinia()) //状态管理（Pinia）
app.use(router) //使用路由

app.mount('#app') //挂载到DOM.
