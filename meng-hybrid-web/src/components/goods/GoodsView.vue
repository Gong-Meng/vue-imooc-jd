<template>
  <!--
    瀑布流的布局：
    1、创建商品列表的基本html 和 css, 让 item 相对于 goods (div) 进行排列
    2、生成不同高度的图片，撑起不同高度的item
    3、计算 item 的位置，来达到 从上到下，从左到右依次排列的目的
   -->
  <div class="goods goods-waterfall">
    <div class="goods-item goods-waterfall-item" v-for="(item,index) in dataSource" :key="index">
      <!-- 图片 -->
      <img :src="item.img" alt="" class="goods-item-img">
      <!-- desc 详情描述 -->
      <div class="goods-item-desc">
          <p class="goods-item-desc-name">
            <!-- 是否为直营 -->
            <!-- 是否为库存 -->
            <span class="text-line-2">{{item.name}}</span>
          </p>
          <div class="goods-item-desc-data">
            <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
            <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 数据源
      dataSource: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    /**
     * 获取数据
     */
    initData () {
      this.$http.get('/goods').then(data => {
        this.dataSource = data.list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods{
  background-color: $bgColor;

  &-item{
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;

    &-desc{
      width: 100%;

      &-name{
        font-size: $infoSize;
        line-height: px2rem(18);
      }

      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;

        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500; // 加粗
        }

        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}
.goods-waterfall{
  position: relative;
  margin: $marginSize;

  &-item{
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;

    .goods-item-img{
      width: 100%;
    }
  }
}
</style>
