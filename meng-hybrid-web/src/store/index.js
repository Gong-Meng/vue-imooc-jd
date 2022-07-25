import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * vuex 作用：
 * 1、vuex 就是在 vue 种创建全局变量的一个东西
 * 2、并且我们可以通过一些方法，来改变这些全局变量的值
 */

/**
 * Store:
 * new  Vuex.Store({}) 里面的对象，用到的vuex 所有的核心概念都是在store里面的
 * 在 vue 的组件中，我们可以直接通过 this.$store = Store 对象
 * this.$store.state = "state: {}"
 *
 * State:
 *  vuex 中的数据源，所有通过vuex声明的全局变量都会在state里面 this.$store.state = "state: {}"
 * getter
 *  相当于vue中的计算属性，可以用于监听、计算state中数据的变化
 * mutation
 *  vuex 中去操作数据的方法（vuex中，不推荐直接去state赋值 this.$store.state.xx = 'xx'）
 *  推荐我们使用mutation来去修改state的值，因为这样它是一个有迹可循的操作方式 （只能是同步执行的）
 * action
 *  帮助mutation 进行异步操作
 * module
 *  将store分为了多个模块，每一个模块都是一个module
 */
export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas: []
  },
  getters: {
  },
  mutations: {
    /**
     * 添加商品到购物车数据源
     */
    addShoppingData (state, goods) {
      state.shoppingDatas.push(goods)
    }
  },
  actions: {
  },
  modules: {
  }
})
