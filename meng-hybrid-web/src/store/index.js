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
      // 为商品新增属性
      // isCheck: 表示商品是否选中
      // number: 表示商品的数量
      // 通过 Vue.set 的方法可以把新添加的属性变为响应式的数据。
      // 如果直接通过 goods.isCheck = false; 那么 isCheck 就不是响应式的数据

      Vue.set(goods, 'isCheck', false)
      Vue.set(goods, 'number', 1)
      state.shoppingDatas.push(goods)
    },
    /**
     * 更改指定的商品数量
     */
    changeShoppingDataNumber (state, data) {
      /**
       * data:{
       *  index: 指定的商品
       *  number: 商品数量
       * }
       */
      state.shoppingDatas[data.index].number = data.number
    }
  },
  actions: {
  },
  modules: {
  }
})
