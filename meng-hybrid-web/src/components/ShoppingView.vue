<template>
  <!--
    业务逻辑：
      1、在商品详情中点击加入购物车，系统会通过alert弹出添加成功的提示，然后页面跳转到购物车
      2、跳转到购物车页面之后，购物车会展示我们添加的商品，此时在默认状态下，商品处于未选中的状态，商品数量为1
      3、可以在购物车中，通过+, - 按钮来增加或减少该商品的购买数量，当商品为1的时候不可减少
      4、加入购物车时，如果该商品已经存在于购物车中，那么购物车中的该商品数量自动 +_1
      5、购物车中会展示已选的商品总价格和已选商品的总数量，当选中商品或选中商品的数量发生变化的时候，展示的总价格和总数量也会发生对应的变化
   -->
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
