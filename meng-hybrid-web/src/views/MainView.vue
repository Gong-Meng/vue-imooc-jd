<template>
    <!-- 在 vue 这种单页面应用程序中，它只存在一个页面，app.vue ，其他都是组件 -->
    <div class="main">
      <!-- 动态组件 -->
      <component :is="currentComponent"></component>
      <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/currency/ToolBarView.vue'
export default {
  components: {
    'tool-bar': toolBar,
    // 异步组件引入方式，异步组件：只有在需要去展示这个组件的时候才会去渲染组件
    home: () => import('@c/HomeView.vue'),
    shopping: () => import('@c/ShoppingView.vue'),
    my: () => import('@c/MyView.vue')
  },
  data () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    // 组件切换
    onChangeFragment (componentName) {
      this.currentComponent = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
