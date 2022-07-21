<template>
  <div class="goods-list-page">
    <navigation-bar :page-name="'商品列表'" @onLeftClick="onBackClick">
      <template v-slot:nav-right>
        <img @click="onChangeLayoutTypeClick()" :src="layoutType.icon" alt="">
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options></goods-options>
      <goods :layout-type="layoutType.type"></goods>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@/components/currency/NavigationBarView.vue'
import GoodsOptions from '@/components/goods/GoodsOptionsView.vue'
import Goods from '@c/goods/GoodsView.vue'

export default {
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  data () {
    return {
      // goods 展示形式数据源
      layoutTypeDatas: [
        {
          // 垂直列表
          type: '1',
          icon: require('@img/list-type.svg')
        },
        {
          // 网格列表
          type: '2',
          icon: require('@img/grid-type.svg')
        },
        {
          // 瀑布流
          type: '3',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      // 当前 goods 展示形式
      layoutType: {}
    }
  },
  created () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    /**
     * 后退按钮的点击事件
     */
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 切换 goods 展示形式
     */
    onChangeLayoutTypeClick () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
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
