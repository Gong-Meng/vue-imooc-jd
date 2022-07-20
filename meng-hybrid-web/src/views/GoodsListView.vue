<template>
  <div class="goods-list-page">
    <navigation-bar :page-name="'商品列表'" @onLeftClick="onBackClick"></navigation-bar>
    <div class="goods-list-page-content">
      <p style="font-size:32px">goodsList</p>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@/components/currency/NavigationBarView.vue'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {

    }
  },
  methods: {
    /**
     * 后退按钮的点击事件
     */
    onBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';

.goods-list-page{
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;

  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
