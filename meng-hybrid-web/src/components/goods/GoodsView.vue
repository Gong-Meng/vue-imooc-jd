<template>
  <!--
    瀑布流的布局：
    1、创建商品列表的基本html 和 css, 让 item 相对于 goods (div) 进行排列
    2、生成不同高度的图片，撑起不同高度的item
    3、计算 item 的位置，来达到 从上到下，从左到右依次排列的目的
   -->
  <div class="goods goods-waterfall" :style="{height: goodsViewHeight}">
    <div class="goods-item goods-waterfall-item" ref="goodsItem" v-for="(item,index) in dataSource" :key="index" :style="goodsItemStyles[index]">
      <!-- 图片 -->
      <img :src="item.img" alt="" class="goods-item-img" :style="imgStyles[index]">
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
      dataSource: [],
      // 最大高度
      MAX_IMG_HEIGHT: 230,
      // 最小高度
      MIN_IMG_HEIGHT: 178,
      // 图片样式集合
      imgStyles: [],
      // item margin
      ITEM_MARGIN_SIZE: 8,
      // item 样式集合
      goodsItemStyles: [],
      // goods 组件高度
      goodsViewHeight: 0
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
        this.initItemStyles()
        // 调用创建瀑布流的方法 等到dom 创建完成之后
        this.$nextTick(() => {
          this.initWaterFall()
        })
      })
    },
    /**
     * 返回随机的图片高度
     */
    imgHeight () {
      // Math.random() -> 0 - 1 随机数 * (高度区间) + 最低的图片高度
      return Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
    },
    /**
     * 根据随机的图片高度，生成对应的图片样式数据
     */
    initItemStyles () {
      this.dataSource.forEach(item => {
        // 随机生成的图片高度
        const imgHeight = this.imgHeight() + 'px'
        // Push 图片高度到img样式集合
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    /**
     * 瀑布流布局
     * 1、获取到所有的 item 元素
     * 2、遍历 item 元素，得到每一个item的高度，加上一个 margin 的高度
     * 3、创建两个变量：leftHeightTotal, rightHeightTotal 分别表示左右两侧目前距离顶部的高度
     *  通过对比左右两侧距离顶部的高度，来确定 item 的放置位置
     *  如果左侧小于右侧高度的话，那么item就应该放置于左侧，此时item距离左侧为0，距离顶部为leftHeightTotal
     *  否则，item 应该放置到右侧，此时 item 距离右侧为 0 , 距离顶部为当前的rightHeightTotal
     * 4、保存计算出的item的所有样式，配置到item上
     * 5、item配置完成之后，对比左右两侧最大的高度，最大的高度为goods 组件的高度
     */
    initWaterFall () {
      // 1、获取到所有的 item 元素
      const $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return

      // 左右两侧距离顶部的高度
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItems.forEach(($el, index) => {
        // item样式
        let goodsItemStyle = {}
        // 2、遍历 item 元素，得到每一个item的高度，加上一个 margin 的高度
        const elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        // 对比左右两侧距离顶部的高度
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          // 更新左侧距离顶部的高度
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }

        // 4、保存计算出的item的所有样式，配置到item上
        this.goodsItemStyles.push(goodsItemStyle)
      })

      // 对比左右两侧最大的高度，最大的高度为goods 组件的高度
      this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
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
