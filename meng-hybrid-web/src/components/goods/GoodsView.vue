<template>
  <!--
    如何在同一个组件中去展示不同的样式：
    1、html表示整个布局的结构，具体的展示样式，将又css决定
    2、每种展示样式对应不同的 css， 也就是对应不同的类名
      1、垂直列表 -> goods-list
      2、网格布局 -> goods-grid
      3、瀑布流 -> goods-waterfall
    3、 实现不同的展示形式，本质上就是实现不同的css样式

    瀑布流的布局：
    1、创建商品列表的基本html 和 css, 让 item 相对于 goods (div) 进行排列
    2、生成不同高度的图片，撑起不同高度的item
    3、计算 item 的位置，来达到 从上到下，从左到右依次排列的目的
   -->
   <!--
      如果不允许 goods 单独滑动，那么就不添加 goods-scroll 类
    -->
    <!--
      商品排序：
        1、排序之后的数据源，用来在html中进行展示（替换掉 dataSource）
        2、定义排序规则（可以直接使用 GoodsOptions 中数据源 的id）
        3、定义排序的方法，根据排序规则来修改对应的排序
    -->
  <div class="goods" :class="[layoutClass, {'goods-scroll': isScroll}]" :style="{height: goodsViewHeight}">
    <div class="goods-item" @click="onItemClick(item)" :class="layoutItemClass" ref="goodsItem" v-for="(item,index) in sortGoodsData" :key="index" :style="goodsItemStyles[index]">
      <!-- 图片 -->
      <img :src="item.img" alt="" class="goods-item-img" :style="imgStyles[index]">
      <!-- desc 详情描述 -->
      <div class="goods-item-desc">
          <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint': item.isHave}">
            <!-- 是否为直营 -->
            <direct v-if="item.isDirect"></direct>
            <!-- 是否为缺货 -->
            <no-have v-if="!item.isHave"></no-have>
            {{item.name}}
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
import Direct from '@c/goods/DirectView.vue'
import NoHave from '@c/goods/NoHaveView.vue'
export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    /**
     * 在父元素中指定的展示形式
     * 1：垂直列表
     * 2：网格布局
     * 3：瀑布流布局
     */
    layoutType: {
      type: String,
      default: '1'
    },
    /**
     * 是否允许 goods 单独滑动
     * 默认允许 goods 单独滑动
     */
    isScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 排序规则 （依赖 GoodsOptions 数据源的id）
     * 1：默认
     * 1-2：价格由高到底
     * 1-3：销量由高到底
     * 2：有货优先
     * 3：直营优先
     */
    sort: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      // 数据源
      dataSource: [],
      // 排序数据
      sortGoodsData: [],
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
      goodsViewHeight: '100%',
      // 不同展示形式下的类名
      // 1、垂直列表的展示形式（默认）->goods-list & goods-list-item
      // 2、网格布局的展示形式 -> goods-grid & goods-grid-item
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'
    }
  },
  created () {
    this.initData()
  },
  watch: {
    /**
     * 监听 layoutType
     */
    layoutType () {
      this.initLayout()
    },
    /**
     * 监听 sort 改变
     */
    sort () {
      this.setSortGoodsData()
    }
  },
  methods: {
    onItemClick (item) {
      // 商品无库存不允许跳转
      if (!item.isHave) {
        alert('该商品无库存')
        return
      }
      this.$router.push({
        name: 'goodsDetail',
        params: {
          goods: item
        }
      })
    },
    /**
     * 商品排序
     */
    setSortGoodsData () {
      switch (this.sort) {
        // 默认
        case '1':
          // 深拷贝，不改变原数组
          this.sortGoodsData = this.dataSource.slice(0)
          break
        // 价格又高到底
        case '1-2':
          this.getSortGoodsDataFromKey('price')
          break
        // 销量由高到底
        case '1-3':
          this.getSortGoodsDataFromKey('volume')
          break
        // 有货优先
        case '2':
          this.getSortGoodsDataFromKey('isHave')
          break
        // 直营优先
        case '3':
          this.getSortGoodsDataFromKey('isDirect')
          break
      }
    },
    /**
     * 根据传入的 key 来进行排序
     */
    getSortGoodsDataFromKey (key) {
      /**
       * sort 可以完成数组的数据排序
       * 当接收的值 为负数的时候，表示 goods1 排列在 goods2 之前
       * 当接收的值 为正数的时候，表示 goods1 排列在 goods2 之后
       * 接收的值为0的时候，表示排序不变
       */
      this.sortGoodsData.sort((goods1, goods2) => {
        // 根据传入的key 获取对应的 value
        const v1 = goods1[key]
        const v2 = goods2[key]
        // 对value进行对比
        // boolean 类型值（有货优先和直营优先）
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        // float 类型值得处理（价格，销量）
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    /**
     * 设置布局，为不同的layoutType设定不同的展示形式
     * 1、初始化影响到布局的数据
     *    1、goodsViewHeight -> 垂直布局、网格布局（100%）瀑布流布局（实际高度）
     *    2、goodsItemStyles
     *    3、imgStyles
     * 2、为不同的 layoutType 设置不同的展示类
     */
    initLayout () {
      // 初始化数据
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      // 为不同的 layoutType 设置不同的展示类
      switch (this.layoutType) {
        // 垂直列表
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        // 网格列表
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        // 瀑布流布局
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'

          this.initItemStyles()
          // 调用创建瀑布流的方法 等到dom 创建完成之后
          this.$nextTick(() => {
            this.initWaterFall()
          })
          break
      }
    },
    /**
     * 获取数据
     */
    initData () {
      this.$http.get('/goods').then(data => {
        this.dataSource = data.list
        // 数据排序
        this.setSortGoodsData()
        // 设置布局
        this.initLayout()
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

      // 在不允许 Goods 单独滑动的时候
      if (!this.isScroll) {
        // 对比左右两侧最大的高度，最大的高度为goods 组件的高度
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.goods{
  background-color: $bgColor;

  &-scroll{
    overflow: hidden;
    overflow-y: auto;
  }

  &-item{
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;

    &-desc{
      width: 100%;

      &-name{
        font-size: $infoSize;
        line-height: px2rem(18);

        &-hint {
          color: $hintColor;
        }
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

// 垂直列表
.goods-list {
  &-item{
    display: flex;
    border-bottom: 1px solid $lineColor;

    .goods-item-img{
      width: px2rem(120);
      height: px2rem(120);
    }

    .goods-item-desc{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}

// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &-item{
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;

    .goods-item-img{
      width: 100%;
    }
  }
}

// 瀑布流
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
