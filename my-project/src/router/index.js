import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('../components/index')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../components/index')
  },
  {
    path: '/RecommendCom',
    name: 'RecommendCom',
    component: () => import('../components/RecommendCom')
  },
  {
    path:'/MarketCom',
    name:'MarketCom',
    component: () => import ('../components/MarketCom'),
    // children:[
    //   {
    //     path:'/YuanR',
    //     name:'YuanR',
    //     component:()=>import('../components/sale/YuanR')
    //   }
    // ]

  },
  {
    path: '/MyInfoCom',
    name: 'MyInfoCom',
    component: () => import('../components/MyInfoCom'),
    // children:[
    //   {
    //     path:'/MyGoods',
    //     name:'MyGoods',
    //     component:()=>import('../components/MyGoods')
    //   }
    // ]
  },
  {
    path: '/LoginCom',
    name: 'LoginCom',
    component: () => import('../components/LoginCom'),
    // children:[
    //   {
    //     name:'MyInfoCom',
    //     component:()=>import('../components/MyInfoCom')
    //   }
    // ]
  },
  {
    path: '/RegisterCom',
    name: 'RegisterCom',
    component: () => import('../components/RegisterCom')
  },
  {
    path: '/ManagerCom',
    name: 'ManagerCom',
    component: () => import('../components/ManagerCom'),
    children:[
      {
        path:'/ManIndex',
        name:'ManIndex',
        component:()=>import('../components/ManagerCom/ManagerView/ManIndex')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
