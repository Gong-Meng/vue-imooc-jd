<template>
    <!-- 在 vue 这种单页面应用程序中，它只存在一个页面，app.vue ，其他都是组件 -->
    <div class="main">
      <keep-alive>
        <!-- 动态组件 -->
        <component :is="currentComponent"></component>
      </keep-alive>
      <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/currency/ToolBarView.vue'
export default {
  name: 'main-view',
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
  activated () {
    // 在keepalive 被激活的时候，调用指定加载页面组件的方法
    this.pushFragment()
  },
  methods: {
    // 组件切换
    onChangeFragment (componentName) {
      this.currentComponent = componentName
    },
    /**
     * 指定加载的页面组件
     */
    pushFragment () {
      // 获取到组件加载的下标
      const componentIndex = this.$route.params.componentIndex
      // 如果没有下标的话，直接让方法return
      if (componentIndex === undefined) return
      // 通过 toolbar 来切换对应的组件
      this.$refs.toolBar.pushFragment(componentIndex)
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
