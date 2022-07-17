<template>
    <!-- 在 vue 这种单页面应用程序中，它只存在一个页面，app.vue ，其他都是组件 -->
    <div>
        <tool-bar></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/ToolBar.vue'
export default {
  components: {
    'tool-bar': toolBar
  }
}
</script>

<style>

</style>
