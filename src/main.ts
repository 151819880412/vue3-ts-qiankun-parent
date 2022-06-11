import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import store from './store/index'

import { registerMicroApps, start } from 'qiankun'
const apps: any[] = [
  {
    name: 'children', // 应用的名字
    entry: 'http://localhost:8081/', // 默认加载这个html，解析里面的js动态的执行（子应用必须支持跨域，内部使用的是 fetch）
    container: '#children', // 要渲染到的节点id，对应上一步中src/App.vue中的渲染节点
    activeRule: '/children' // 访问子节点路由

  },
  // {
  //   name: 'site2',
  //   entry: 'http://localhost:9002/',
  //   container: '#site2',
  //   activeRule: '/site2'
  // }
]
registerMicroApps(apps) // 注册应用
start() // 开启应用


import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

// import Loading from "@/views/layout/components/Loading/index.js"

import './styles/index.stylus'




const app:any = createApp(App);

 // Configure routing
 setupRouter(app);

 // router-guard
 setupRouterGuard(router);


app.use(store)
// app.use(router)
// app.use(Loading)
app.use(ElementPlus,{locale})
app.mount('#parent');

export default app