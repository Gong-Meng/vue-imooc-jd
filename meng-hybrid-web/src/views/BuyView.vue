<template>
  <div class="buy-page">
    <navigation-bar :page-name="'立即购买'" @onLeftClick="onBackClick">
    </navigation-bar>

    <!-- 内容区 -->
    <div class="buy-page-content">
      <!-- 购买的商品 -->
      <div class="buy-page-content-goods" v-if="goodsData">
        <!-- 商品图片 -->
        <img class="buy-page-content-goods-img" :src="goodsData.img" alt="">
        <!-- 商品描述 -->
        <div class="buy-page-content-goods-desc">
          <!-- 商品名称 -->
          <p class="buy-page-content-goods-desc-name">{{goodsData.name}}</p>
          <!-- 商品价格 -->
          <p class="buy-page-content-goods-desc-price">￥{{goodsData.price | priceValue}}</p>
        </div>
      </div>
      <!-- 支付方式 -->
      <ul class="buy-page-content-list">
        <li class="buy-page-content-list-item"
          v-for="(item, index) in paymentDatas" :key="index"
          @click="onPaymentItemClick(item)"
        >
          <!-- 支付方式的图标 -->
          <img class="buy-page-content-list-item-icon" :src="item.icon" alt="">
          <!-- 描述 -->
          <div class="buy-page-content-list-item-desc">
            <!-- 支付方式名称 -->
            <p class="buy-page-content-list-item-desc-name">{{item.name}}</p>
            <!-- 支付方式描述 -->
            <p class="buy-page-content-list-item-desc-desc">{{item.desc}}</p>
          </div>
          <!-- 选中支付的标记 -->
          <img class="buy-page-content-list-item-check" :src="getCheckIcon(selectPayment.id === item.id)" alt="">
        </li>
      </ul>
    </div>

    <!-- 立即购买 -->
    <div class="pay page-commit">
      立即购买
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBarView.vue'
export default {
  name: 'buy-view',
  components: {
    NavigationBar
  },
  data () {
    return {
      /**
       * 商品数据
       */
      goodsData: {},
      /**
       * 支付方式数据源
       */
      paymentDatas: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可信托',
          icon: require('@img/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择，更快更安全',
          icon: require('@img/weichat.png')
        }
      ],
      /**
       * 用户选中的支付方式
       */
      selectPayment: {}
    }
  },
  created () {
    this.selectPayment = this.paymentDatas[0]
    this.goodsData = this.loadGoodsData()
  },
  methods: {
    /**
     * 根据id，获取到商品数据
     */
    loadGoodsData () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    /**
     * 后退页面
     */
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 支付方式切换
     */
    onPaymentItemClick (item) {
      this.selectPayment = item
    },
    /**
     * 返回支付方式标记的图片
     */
    getCheckIcon (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.buy-page{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;

  &-content{
    overflow: hidden;
    height: 100%;

    // 商品
    &-goods{
      background-color: white;
      padding: $marginSize;
      display: flex;
      border-bottom: px2rem(1) solid $lineColor;
      border-top: px2rem(1) solid $lineColor;
      margin-top: $marginSize;

      &-img{
        width: px2rem(100);
        height: px2rem(100);
      }

      &-desc{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 $marginSize;

        &-name{
          font-size: $infoSize;
          line-height: px2rem(18);
        }

        &-price{
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }

    // 支付方式
    &-list{
      margin-top: $marginSize;

      &-item{
        display: flex;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;
        padding: $marginSize;
        align-items: center;

        &-icon{
          height: px2rem(30);
        }

        &-desc{
          margin-left: px2rem(12);
          flex-grow: 1;

          &-name{
            font-size: $infoSize;
          }

          &-desc{
            font-size: $minInfoSize;
            margin-top: px2rem(6);
            color: $hintColor;
          }

          &-check{
            width: px2rem(16);
            height: px2rem(16);
          }
        }
      }
    }

  }
  // 立即支付按钮
  .pay{
    position: absolute;
    bottom: px2rem(52);
  }
}
</style>
