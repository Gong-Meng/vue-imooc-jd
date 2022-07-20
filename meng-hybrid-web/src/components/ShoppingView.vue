<template>
  <div class="shopping">
    <navigation-bar :page-name="'购物车'" :is-show-back="false"></navigation-bar>
    <h1>Shipping</h1>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBarView.vue'

export default {
  components: {
    NavigationBar
  },
  data () {
    return {}
  }
}

</script>
<style lang="scss" scoped>
.shopping{
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
