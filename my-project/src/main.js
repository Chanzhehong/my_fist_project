import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
// import echarts from 'echarts'
import 'element-plus/dist/index.css'
import './mock/api/index'
createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
