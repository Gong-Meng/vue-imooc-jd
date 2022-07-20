<template>
  <div class="home">
    <navigation-bar :is-show-back="false">
        <!-- 左侧插槽 -->
        <template v-slot:nav-left>
            <img src="@img/more-white.svg" alt="">
        </template>
        <!-- 中间插槽 -->
        <template v-slot:nav-center>
          <search :icon="require('@img/search.svg')" :hint-color="'#999'" :bg-color="'#fff'"></search>
        </template>
        <!-- 右侧插槽 -->
        <template v-slot:nav-right>
          <img src="@img/message-white.svg" alt="">
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
      secondsDatas: []
    }
  },
  created () {
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
