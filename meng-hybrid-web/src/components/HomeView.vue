<template>
  <div class="home" @scroll="onScrollChange">
    <navigation-bar :is-show-back="false" :nav-bar-style="navBarStyle">
        <!-- 左侧插槽 -->
        <template v-slot:nav-left>
            <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
        </template>
        <!-- 中间插槽 -->
        <template v-slot:nav-center>
          <search
            :icon="navBarCurrentSlotStyle.search.icon"
            :hint-color="navBarCurrentSlotStyle.search.hintColor"
            :bgColor="navBarCurrentSlotStyle.search.bgColor"
          >
          </search>
        </template>
        <!-- 右侧插槽 -->
        <template v-slot:nav-right>
          <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
        </template>
    </navigation-bar>
    <div class="home-content">
      <!-- swiper -->
      <my-swiper :swiper-imgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
      <!-- activity 520活动 -->
      <activity>
          <div class="activity-520">
            <img v-for="(item, index) in activityDatas" :key="index" :src="item.icon" alt="">
          </div>
      </activity>
      <!-- mode-options 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀模块 -->
      <seconds :data-source="secondsDatas"></seconds>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@img/haoHuoQiang.gif" alt="">
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiperView.vue'
import Activity from '@c/currency/ActivityView.vue'
import ModeOptions from '@c/currency/ModeOptionsView.vue'
import Seconds from '@c/seconds/SecondsView.vue'
import Goods from '@c/goods/GoodsView.vue'
import NavigationBar from '@c/currency/NavigationBarView.vue'
import Search from './currency/SearchView.vue'

export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data () {
    return {
      swiperData: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: [],
      // navBar 插槽样式数据，包含页面未开始滑动的时候插槽的样式 (默认样式)
      // 和 页面滑动到锚定点之后的插槽的样式 （高亮样式）
      navBarSlotStyle: {
        // 默认样式
        normal: {
          // 左侧插槽
          leftIcon: require('@img/more-white.svg'),
          // 中间插槽
          search: {
            bgColor: '#fff',
            hintColor: '#999',
            icon: require('@img/search.svg')
          },
          // 右侧插槽
          rightIcon: require('@img/message-white.svg')
        },
        // 高亮样式
        highlight: {
          // 左侧插槽
          leftIcon: require('@img/more.svg'),
          // 中间插槽
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#fff',
            icon: require('@img/search-white.svg')
          },
          // 右侧插槽
          rightIcon: require('@img/message.svg')
        }
      },
      // navBar 当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      // navBar 的定制样式
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  created () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  methods: {
    // 获取数据
    initData () {
      // // 获取顶部轮播图片
      // this.$http.get('/swiper').then(data => {
      //   this.swiperData = data.list
      // }).catch(err => {
      //   console.log(err)
      // })

      // // 获取活动信息
      // this.$http.get('/activitys').then(data => {
      //   this.activityDatas = data.list
      // }).catch(err => {
      //   console.log(err)
      // })

      // axios 同事发送多个请求（并行）
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityData, secondsData) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityData.list
        this.secondsDatas = secondsData.list
      }))
    },
    /**
     * 监听页面滚动
     * 1、获取当前页面滚动的距离
     * 2、计算navBar 背景颜色（背景透明度）
     *    当前滚动的距离 / 锚点值 = navBar 背景透明度 opacity
     * 3、opacity >= 1 当前滚动的距离 已经等于或超过锚点值，当前navBar插槽的样式变为高亮状态的样式
     *    否则的话 opacity < 1, 当前navBar插槽的样式为默认样式
     */
    onScrollChange ($event) {
      // 当前页面滚动的距离
      this.scrollTopValue = $event.target.scrollTop
      // 计算navBar 背景颜色（背景透明度）
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      // 指定 navBar 插槽样式
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }

      // 根据透明比例来设置navbar 的背景颜色
      this.navBarStyle.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')'
    }
  }
}

</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.home{
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto; //垂直方向滚动

  &-content {
    height: 100%;

    .activity-520{
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);

      img{
        display: inline-block;
        width: 33.33%;
      }
    }

    .activity-pin-gou-jie{
      background-color: white;
      margin-top: $marginSize;

      img{
        width: 100%;
      }
    }
  }
}
</style>
