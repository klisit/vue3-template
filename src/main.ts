/*
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-11 15:58:23
 * @LastEditTime: 2021-04-18 01:34:26
 * @LastEditors: klisit
 */
import { createApp } from 'vue'
import 'lib-flexible/flexible'
import router from './router/index'
import App from './App.vue'
import 'normalize.css/normalize.css'

createApp(App).use(router).mount('#app')
