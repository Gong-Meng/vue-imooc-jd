<template>
  <!--
    业务逻辑：
      1、在商品详情中点击加入购物车，系统会通过alert弹出添加成功的提示，然后页面跳转到购物车
      2、跳转到购物车页面之后，购物车会展示我们添加的商品，此时在默认状态下，商品处于未选中的状态，商品数量为1
      3、可以在购物车中，通过+, - 按钮来增加或减少该商品的购买数量，当商品为1的时候不可减少
      4、加入购物车时，如果该商品已经存在于购物车中，那么购物车中的该商品数量自动 +_1
      5、购物车中会展示已选的商品总价格和已选商品的总数量，当选中商品或选中商品的数量发生变化的时候，展示的总价格和总数量也会发生对应的变化
   -->

  <!--
    从商品详情中进入购物车页面：
      1、首先进入到main.vue
      2、通过 main.vue 跳转到购物车 （可以通过传递自定义标记的方式）
      问题：
        当我们从商品详情进入到购物车之后，再返回到商品详情页面，我们会发现无论我们点击那个商品，他都会进入到我们最初进入的商品详情
      原因：
        虚拟任务栈缓存了商品详情页面
      解决方案：
        在跳转到 main 之后，通过自定义指令，来初始化虚拟任务栈
   -->
  <div class="shopping">
    <navigation-bar :page-name="'购物车'" :is-show-back="false"></navigation-bar>

    <div class="shopping-content">
      <div class="shopping-content-list">
          <!-- 商品 -->
          <div class="shopping-content-list-item"
            v-for="(item, index) in shoppingDatas" :key="index"
          >
            <!-- check -->
            <img class="shopping-content-list-item-check" src="@img/no-check.svg" alt="">
            <!-- 图片 -->
            <img class="shopping-content-list-item-img" :src="item.img" alt="">
            <!-- 描述 -->
            <div class="shopping-content-list-item-desc">
              <!-- 名称 -->
              <p class="shopping-content-list-item-desc-name text-line-2">
                <!-- 直营 -->
                <direct v-if="item.isDirect"></direct>
                {{item.name}}
              </p>

              <div class="shopping-content-list-item-desc-data">
                <!-- 价格 -->
                <p class="shopping-content-list-item-desc-data-price">￥{{item.price | priceValue}}</p>
                <!-- 商品数量控制组件 -->
                <number-manager :default-number="item.number" @onChangeNumber="onNumberChange(arguments, item, index)"></number-manager>
              </div>
            </div>
          </div>
      </div>
      <!-- 统计 -->
      <div class="shopping-content-total">
        <!-- 全选的check -->
        <div class="shopping-content-total-check">
          <img src="@img/no-check.svg" alt="">
          <p>全选</p>
        </div>

        <!-- 总价格 -->
        <div class="shopping-content-total-price">
          <p class="shopping-content-total-price-total">合计：<span>￥{{totalData.totalPrice | priceValue}}</span></p>
          <p class="shopping-content-total-price-all">总额：
            <span>￥{{totalData.totalPrice | priceValue}}</span>
            &nbsp;&nbsp;
            立减<span>￥0.00</span>
          </p>
        </div>

        <!-- 结算 -->
        <div class="shopping-content-total-commit">
          去结算{{totalData.goodsNumber}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBarView.vue'
import Direct from '@c/goods/DirectView.vue'
import NumberManager from '@c/goods/NumberManagerView.vue'

export default {
  components: {
    NavigationBar,
    Direct,
    NumberManager
  },
  data () {
    return {
      // 购物车商品
      shoppingDatas: this.$store.state.shoppingDatas,
      // 总计
      totalData: {
        // 是否全选
        isAll: false,
        // 总价格
        totalPrice: 0,
        // 总数量
        goodsNumber: 0
      }
    }
  },
  methods: {
    /**
     * @param $arguments JS 中提供的类数组对象。如果想要获取到传递的第一个参数，那么就拿 $arguments 0 下标的数据
     */
    onNumberChange ($arguments, item, index) {
      // 最新商品数量
      const number = $arguments[0]

      // 修改对应的商品数量
      this.$store.commit('changeShoppingDataNumber', {
        index: index,
        number: number
      })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.shopping{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column; // flex-direction flex-wrap 复合属性

  &-content{
    background-color: $bgColor;
    border-top: px2rem(1) solid $lineColor;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    // 商品列表
    &-list{
      height: 100%;
      overflow: hidden;
      overflow-y: auto;

      &-item{
        background-color: white;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;

        &-check{
          width: $checkSize;
          // height: $checkSize;
          align-self: center;
          padding: px2rem(6);
        }

        &-img{
          width: $listGoodsImgSize;
          height: $listGoodsImgSize;
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

          &-data{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: $marginSize;

            &-price{
              font-size: $titleSize;
              color: $mainColor;
              font-weight: 500;
            }
          }
        }
      }
    }

    // 总计
    &-total {
      height: px2rem(56);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: white;
      border-top: px2rem(1) solid $lineColor;

      &-check{
        display: flex;
        align-items: center;
        margin: 0 $marginSize;

        img{
          width: $checkSize;
          height: $checkSize;
          padding: px2rem(6);
        }

        p{
          font-size: $infoSize;
        }
      }

      &-price{
        flex-grow: 2;
        display: flex;
        flex-direction: column;

        &-total{
          font-size: $titleSize;
          margin-bottom: px2rem(6);

          span{
            font-weight: bold;
          }
        }

        &-all{
          font-size: $minInfoSize;
          span{
            font-weight: bold;
          }
        }
      }

      &-commit{
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: $mainColor;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
