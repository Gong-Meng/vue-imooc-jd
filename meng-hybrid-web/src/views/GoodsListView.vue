<template>
  <div class="goods-list-page">
    <navigation-bar :page-name="'商品列表'" @onLeftClick="onBackClick">
      <template v-slot:nav-right>
        <img @click="onChangeLayoutTypeClick()" :src="layoutType.icon" alt="">
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options @optionsChange="onGoodsOptionsChange"></goods-options>
      <goods :layout-type="layoutType.type" :sort="sortType"></goods>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@/components/currency/NavigationBarView.vue'
import GoodsOptions from '@/components/goods/GoodsOptionsView.vue'
import Goods from '@c/goods/GoodsView.vue'

export default {
  name: 'goods-list-view',
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
      layoutType: {},
      // goods 排序规则
      sortType: '1'
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
    },
    /**
     * 当筛选项改变时被调用
     */
    onGoodsOptionsChange (sortType) {
      this.sortType = sortType
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';

.goods-list-page{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;

  &-content {
    height: 0;
    display: flex;
    flex-direction: column;
    flex: 1; //自适应剩余高度
  }
}
</style>
