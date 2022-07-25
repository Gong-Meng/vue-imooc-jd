import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-view',
    component: MainView
  },
  {
    path: '/goodsList',
    name: 'goods-list-view',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // vue-router 懒加载 -> 只有在使用的时候才会去加载 GoodsList
    // chunkName -> GoodsList.[hash].js
    component: () => import(/* webpackChunkName: "GoodsList" */ '../views/GoodsListView.vue')
  },
  {
    path: '/goodsDetail',
    name: 'goods-detail-view',
    component: () => import(/* webpackChunkName: "GoodsDetail" */ '../views/GoodsDetailView.vue')
  },
  {
    path: '/buy',
    name: 'buy-view',
    component: () => import(/* webpackChunkName: "Buy" */ '../views/BuyView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
